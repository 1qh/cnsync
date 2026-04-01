import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const reExportDecl = /export\s+(?:const|function|class)\s+(?<name>\w+)/gu,
  reExportBlock = /export\s*\{(?<names>[^}]+)\}/gu,
  reExportType = /export\s+type\s+(?<name>\w+)/gu,
  reExportInterface = /export\s+interface\s+(?<name>\w+)/gu,
  reTypePrefix = /^type\s+/u,
  reAsAlias = /\s+as\s+/u,
  uiComponents = join(import.meta.dirname, 'ui/src/components'),
  pageContent = readFileSync(join(import.meta.dirname, 'next/src/app/showcase.tsx'), 'utf8'),
  missing: string[] = [],
  missingExports: string[] = [],
  check = (dir: string, prefix: string) => {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) check(join(dir, entry.name), `${prefix}/${entry.name}`)
      if (entry.isFile() && entry.name.endsWith('.tsx')) {
        const file = entry.name.replace('.tsx', ''),
          importPath = `${prefix}/${file}`
        if (!pageContent.includes(importPath)) missing.push(importPath)
        const content = readFileSync(join(dir, entry.name), 'utf8'),
          exportedNames: string[] = []
        for (const m of content.matchAll(reExportDecl)) {
          const g = m.groups as Record<string, string>
          exportedNames.push(g.name)
        }
        for (const m of content.matchAll(reExportBlock)) {
          const g = m.groups as Record<string, string>,
            names = g.names
              .split(',')
              .map(n => {
                const cleaned = n.trim().replace(reTypePrefix, ''),
                  parts = cleaned.split(reAsAlias)
                return parts.at(-1).trim()
              })
              .filter(n => n.length > 0)
          exportedNames.push(...names)
        }
        for (const m of content.matchAll(reExportType)) {
          const g = m.groups as Record<string, string>
          exportedNames.push(g.name)
        }
        for (const m of content.matchAll(reExportInterface)) {
          const g = m.groups as Record<string, string>
          exportedNames.push(g.name)
        }
        for (const name of exportedNames) if (!pageContent.includes(name)) missingExports.push(`${importPath}: ${name}`)
      }
    }
  }
check(uiComponents, '@a/ui/components')
if (missing.length > 0) {
  process.stderr.write(`Missing ${String(missing.length)} component imports in page.tsx:\n`)
  for (const m of missing) process.stderr.write(`  ${m}\n`)
  throw new Error('page.tsx is missing component imports')
}
if (missingExports.length > 0) {
  process.stderr.write(`Missing ${String(missingExports.length)} export references in page.tsx:\n`)
  for (const m of missingExports) process.stderr.write(`  ${m}\n`)
  throw new Error('page.tsx is missing export references')
}
process.stdout.write(
  `All ${String(pageContent.split('\n').filter(l => l.includes("from '@a/ui")).length)} component files imported\n`
)
process.stdout.write('All exports verified\n')
