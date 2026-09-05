import { Glob } from 'bun'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const uiDir = join(import.meta.dirname, '../../readonly/ui/src/components')
// oxlint-disable-next-line node/no-sync -- build-time check script: synchronous fs by design
const pageContent = readFileSync(join(import.meta.dirname, 'src/app/showcase.tsx'), 'utf8')
const pageWords = new Set(pageContent.split(/[\s,;{}()<>|&=!+\-*/[\]'"`:@#.]+/u))
const reExport = /export\s+(?:(?:const|function|class|type|interface)\s+(?<single>\w+)|\{(?<block>[^}]+)\})/gu
const typePrefixRe = /^type\s+/u
// eslint-disable-next-line sonarjs/super-linear-regex -- linear: literal `as` anchors the two \s+, no overlap
const asSplitRe = /\s+as\s+/u
const missing: string[] = []
const missingExports: string[] = []
const collectBlockExports = (block: string, importPath: string): void => {
  for (const n of block.split(',')) {
    const name = n.trim().replace(typePrefixRe, '').split(asSplitRe).at(-1)?.trim()
    if (name && !pageWords.has(name)) missingExports.push(`${importPath}: ${name}`)
  }
}
// oxlint-disable-next-line node/no-sync -- build-time check script: synchronous directory scan by design
for (const rel of new Glob('**/*.tsx').scanSync(uiDir)) {
  const importPath = `@a/ui/components/${rel.replace('.tsx', '')}`
  // oxlint-disable-next-line node/no-sync -- build-time check script: synchronous fs by design
  const content = readFileSync(join(uiDir, rel), 'utf8')
  if (!pageContent.includes(importPath)) missing.push(importPath)
  for (const m of content.matchAll(reExport)) {
    // biome-ignore lint/nursery/noUnsafeTypeAssertion: regex named-capture groups are typed as a loose record; these names are defined by the pattern
    const { single, block } = m.groups as Record<string, string | undefined>
    if (single && !pageWords.has(single)) missingExports.push(`${importPath}: ${single}`)
    if (block) collectBlockExports(block, importPath)
  }
}
if (missing.length > 0) {
  for (const m of missing) process.stderr.write(`  ${m}\n`)
  throw new Error(`Missing ${missing.length} component imports`)
}
if (missingExports.length > 0) {
  for (const m of missingExports) process.stderr.write(`  ${m}\n`)
  throw new Error(`Missing ${missingExports.length} export references`)
}
process.stdout.write(
  `All ${pageContent.split('\n').filter(l => l.includes("from '@a/ui")).length} component files imported\nAll exports verified\n`
)
