import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const uiComponents = join(import.meta.dirname, 'ui/src/components'),
  pageContent = readFileSync(join(import.meta.dirname, 'next/src/app/page.tsx'), 'utf8'),
  missing: string[] = [],
  check = (dir: string, prefix: string) => {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) check(join(dir, entry.name), `${prefix}/${entry.name}`)
      if (entry.isFile() && entry.name.endsWith('.tsx')) {
        const file = entry.name.replace('.tsx', ''),
          importPath = `${prefix}/${file}`
        if (!pageContent.includes(importPath)) missing.push(importPath)
      }
    }
  }
check(uiComponents, '@a/ui/components')
if (missing.length > 0) {
  process.stderr.write(`Missing ${String(missing.length)} component imports in page.tsx:\n`)
  for (const m of missing) process.stderr.write(`  ${m}\n`)
  throw new Error('page.tsx is missing component imports')
}
process.stdout.write(
  `All ${String(pageContent.split('\n').filter(l => l.includes("from '@a/ui")).length)} component files imported\n`
)
