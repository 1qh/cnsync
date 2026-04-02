import { Glob } from 'bun'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
const uiDir = join(import.meta.dirname, '../../readonly/ui/src/components'),
  pageContent = readFileSync(join(import.meta.dirname, 'src/app/showcase.tsx'), 'utf8'),
  pageWords = new Set(pageContent.split(/[\s,;{}()<>|&=!+\-*/[\]'"`:@#.]+/u)),
  reExport = /export\s+(?:(?:const|function|class|type|interface)\s+(?<single>\w+)|\{(?<block>[^}]+)\})/gu,
  missing: string[] = [],
  missingExports: string[] = []
for (const rel of new Glob('**/*.tsx').scanSync(uiDir)) {
  const importPath = `@a/ui/components/${rel.replace('.tsx', '')}`,
    content = readFileSync(join(uiDir, rel), 'utf8')
  if (!pageContent.includes(importPath)) missing.push(importPath)
  for (const m of content.matchAll(reExport)) {
    const { single, block } = m.groups as Record<string, string | undefined>
    if (single) {
      if (!pageWords.has(single)) missingExports.push(`${importPath}: ${single}`)
    }
    if (block)
      for (const n of block.split(',')) {
        const name = n.trim().replace(/^type\s+/u, '').split(/\s+as\s+/u).at(-1)?.trim()
        if (name && !pageWords.has(name)) missingExports.push(`${importPath}: ${name}`)
      }
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
