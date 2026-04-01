/** biome-ignore-all lint/nursery/useNamedCaptureGroup: regex for parsing exports */
/** biome-ignore-all lint/nursery/noShadow: parameter naming */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const uiSrc = join(import.meta.dirname, 'ui/src'),
  outPath = join(import.meta.dirname, 'next/src/app/page.tsx'),
  tsxExtRegex = /\.tsx?$/u,
  getAllExports = (fileContent: string): { name: string; type: boolean }[] => {
    const results: { name: string; type: boolean }[] = [],
      seen = new Set<string>()
    for (const m of fileContent.matchAll(/export (?:const|function) (?<name>\w+)/gu))
      if (!seen.has(m[1])) {
        seen.add(m[1])
        results.push({ name: m[1], type: false })
      }
    for (const m of fileContent.matchAll(/export \{(?<body>[^}]+)\}/gu))
      for (const raw of m[1].split(',')) {
        const name = raw.trim().split(' as ')[0].trim()
        if (name && name !== 'default' && !seen.has(name)) {
          seen.add(name)
          results.push({ name, type: false })
        }
      }
    for (const m of fileContent.matchAll(/export type \{(?<tbody>[^}]+)\}/gu))
      for (const raw of m[1].split(',')) {
        const name = raw.trim().split(' as ')[0].trim()
        if (name && !seen.has(name)) {
          seen.add(name)
          results.push({ name, type: true })
        }
      }
    return results
  },
  collectAll = (dir: string, prefix: string): { exports: { name: string; type: boolean }[]; path: string }[] => {
    const result: { exports: { name: string; type: boolean }[]; path: string }[] = [],
      entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const sub = collectAll(join(dir, entry.name), `${prefix}/${entry.name}`)
        for (const s of sub) result.push(s)
      }
      if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        const fc = readFileSync(join(dir, entry.name), 'utf8'),
          file = entry.name.replace(tsxExtRegex, ''),
          exports = getAllExports(fc)
        if (exports.length > 0) result.push({ exports, path: `${prefix}/${file}` })
      }
    }
    return result
  },
  allFiles = [
    ...collectAll(join(uiSrc, 'components'), '@a/ui/components'),
    ...collectAll(join(uiSrc, 'hooks'), '@a/ui/hooks'),
    ...collectAll(join(uiSrc, 'lib'), '@a/ui/lib')
  ],
  lines = [
    '/** biome-ignore-all lint/correctness/noUnusedImports: build verification */',
    '/* oxlint-disable eslint/no-unused-vars */',
    "'use client'"
  ],
  seen = new Set<string>()
let totalExports = 0
for (const f of allFiles) {
  const types = f.exports.filter(e => e.type),
    values = f.exports.filter(e => !e.type)
  if (values.length > 0) {
    const names: string[] = []
    for (const v of values) {
      const alias = seen.has(v.name) ? `${v.name}_` : v.name
      seen.add(alias)
      names.push(v.name === alias ? v.name : `${v.name} as ${alias}`)
    }
    lines.push(`import { ${names.join(', ')} } from '${f.path}'`)
    totalExports += values.length
  }
  if (types.length > 0) {
    lines.push(`import type { ${types.map(t => t.name).join(', ')} } from '${f.path}'`)
    totalExports += types.length
  }
}
lines.push('const Page = () => <p>ok</p>')
lines.push('export default Page')
lines.push('')
const output = lines.join('\n')
if (process.argv.includes('--check')) {
  const existing = readFileSync(outPath, 'utf8')
  if (existing !== output) {
    process.stderr.write('page.tsx is out of date. Run: bun gen-test-page.ts\n')
    throw new Error('page.tsx out of date')
  }
  process.stdout.write(`page.tsx up to date (${String(totalExports)} exports from ${String(allFiles.length)} files)\n`)
} else {
  writeFileSync(outPath, output)
  process.stdout.write(`Generated page.tsx: ${String(totalExports)} exports from ${String(allFiles.length)} files\n`)
}
