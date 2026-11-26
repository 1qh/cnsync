/** biome-ignore-all lint/nursery/noUnsafeTypeAssertion: sync script manipulates loosely-typed shadcn config + npm-registry JSON; each assertion narrows a value already shape-guarded (isRecord/typeof) or is a documented JSON boundary */
/* eslint-disable sonarjs/super-linear-regex -- the whitespace/literal prop-strip and key-match regexes here are single-quantifier or negated-class patterns over bounded generated component source; none can backtrack super-linearly */
import { file, Glob, spawn, write } from 'bun'
import { mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
type JsonRecord = Record<string, unknown>
const darkBgRe = /(?<=\.dark\s*\{[^}]*)--background:\s*oklch\([^)]+\)/u
const isRecord = (v: unknown): v is JsonRecord => typeof v === 'object' && Boolean(v) && !Array.isArray(v)
const readJson = async (p: string): Promise<JsonRecord | undefined> => {
  try {
    const v = JSON.parse(await file(p).text()) as unknown
    return isRecord(v) ? v : undefined
  } catch {
    return undefined
  }
}
const writeJson = async (p: string, v: JsonRecord) => {
  await write(file(p), `${JSON.stringify(v, undefined, 2)}\n`)
}
const tsFiles = async (dir: string): Promise<string[]> => {
  const out: string[] = []
  const matches = new Glob('**/*.{ts,tsx}').scan(dir)
  for await (const f of matches) out.push(join(dir, f))
  return out
}
const patchFiles = async (dir: string, fn: (src: string, abs: string) => string) => {
  await Promise.all(
    (await tsFiles(dir)).map(async abs => {
      const src = await file(abs).text()
      const next = fn(src, abs)
      if (next !== src) await write(file(abs), next)
    })
  )
}
const delayPatterns = [
  /openDelay\s*=\s*\d+,?\s*/gu,
  /closeDelay\s*=\s*\d+,?\s*/gu,
  /\s*closeDelay=\{closeDelay\}/gu,
  /\s*openDelay=\{openDelay\}/gu,
  /\s*closeDelay=\{0\}/gu,
  /\s*openDelay=\{0\}/gu
]
const radixImportRe = /import\s*\{[^}]*\}\s*from\s*["']@radix-ui\/react-use-controllable-state["'];?\n?/gu
const patchRadixToBaseUi = async (srcDir: string) => {
  const radix = '@radix-ui/react-use-controllable-state'
  const checks = await Promise.all(
    (await tsFiles(srcDir)).map(async f => {
      const src = await file(f).text()
      return src.includes(radix) ? f : undefined
    })
  )
  const toFix = checks.filter(abs => abs !== undefined)
  if (toFix.length === 0) return
  const shimDest = join(srcDir, 'hooks/use-controllable-state.ts')
  await mkdir(dirname(shimDest), { recursive: true })
  const shimSrc = await file(join(process.cwd(), 'shims/use-controllable-state.ts')).text()
  await write(file(shimDest), shimSrc)
  await Promise.all(
    toFix.map(async abs => {
      const src = await file(abs).text()
      const next = src.replaceAll(
        radixImportRe,
        'import { useControllableState } from "../../hooks/use-controllable-state"\n'
      )
      if (next !== src) await write(file(abs), next)
    })
  )
}
const patchUpstreamTypes = async (srcDir: string) => {
  await patchFiles(srcDir, (src, abs) => {
    let out = src
    if (abs.endsWith('chart.tsx'))
      out = out.replace(
        'import type { TooltipValueType } from "recharts"',
        'type TooltipValueType = number | string | Array<number | string>'
      )
    if (abs.endsWith('use-controllable-state.ts'))
      out = out.replace('onChangeRef.current?.(value)', 'if (value !== undefined) onChangeRef.current?.(value)')
    if (abs.includes('ai-elements/')) {
      for (const re of delayPatterns) out = out.replaceAll(re, '')
      if (!out.startsWith('// @ts-nocheck')) out = `// @ts-nocheck\n${out}`
    }
    return out
  })
}
const validateNoRadixUi = async (srcDir: string) => {
  const checks = await Promise.all(
    (await tsFiles(srcDir)).map(async abs => {
      const src = await file(abs).text()
      return src.includes('@radix-ui') || src.includes('from "radix-ui') || src.includes("from 'radix-ui")
        ? abs
        : undefined
    })
  )
  const violations = checks.filter(abs => abs !== undefined)
  if (violations.length > 0) throw new Error(`radix-ui found:\n${violations.join('\n')}`)
}
const lineBreakRe = /\r?\n/u
const typographyRows = (src: string) => {
  const plugin = '@plugin "@tailwindcss/typography";'
  const shadcnImport = '@import "shadcn/tailwind.css";'
  const rows = src.split(lineBreakRe).filter(r => r.trim() !== plugin && r.trim() !== shadcnImport)
  const idx = rows.findIndex(r => r.trim().startsWith('@import '))
  rows.splice(Math.max(idx, 0), 0, plugin)
  const twIdx = rows.findIndex(r => r.trim() === '@import "tailwindcss";')
  if (twIdx !== -1) rows.splice(twIdx + 1, 0, shadcnImport)
  return rows
}
const ensureTypographyPlugin = async (cssPath: string) => {
  const src = await file(cssPath).text()
  const lb = src.includes('\r\n') ? '\r\n' : '\n'
  let next = typographyRows(src).join(lb)
  if (!next.endsWith(lb)) next += lb
  if (next !== src) await write(file(cssPath), next)
}
const patchDarkBackground = async (cssPath: string) => {
  const src = await file(cssPath).text()
  const patched = src.replace(darkBgRe, '--background: oklch(0 0 0)')
  if (patched !== src) await write(file(cssPath), patched)
}
const IMPORT_PREFIX = '@a/ui'
const root = process.cwd()
const uiDir = join(root, 'readonly/ui')
const tmpDir = join(tmpdir(), 'cnsync')
const tmpUi = join(tmpDir, 'a/packages/ui')
const tmpBin = join(tmpDir, 'bin')
const UI_PACKAGE: JsonRecord = {
  devDependencies: { '@tailwindcss/postcss': 'latest', '@tailwindcss/typography': 'latest' },
  exports: {
    '.': './src/lib/utils.ts',
    './*': './src/components/*.tsx',
    './components/*': './src/components/*.tsx',
    './globals.css': './src/styles/globals.css',
    './hooks/*': './src/hooks/*.ts',
    './lib/*': './src/lib/*.ts'
  },
  name: '@a/ui',
  private: true,
  type: 'module',
  version: '0.0.0'
}
const UI_ALIASES: JsonRecord = {
  components: `${IMPORT_PREFIX}/components`,
  hooks: `${IMPORT_PREFIX}/hooks`,
  lib: `${IMPORT_PREFIX}/lib`,
  ui: `${IMPORT_PREFIX}/components`,
  utils: IMPORT_PREFIX
}
const UI_TSCONFIG: JsonRecord = {
  compilerOptions: { paths: { [`${IMPORT_PREFIX}/*`]: ['./src/*'] }, strict: false },
  extends: 'lintmax/tsconfig',
  include: ['.']
}
const { env: processEnv } = process
const env = { ...processEnv, PATH: `${tmpBin}:${processEnv.PATH}` }
const runCommand = async (cmd: string[], cwd?: string) => {
  const subprocess = spawn({
    cmd,
    ...(cwd === undefined ? {} : { cwd, env }),
    killSignal: 'SIGKILL',
    stderr: 'inherit',
    stdout: 'inherit',
    timeout: 600_000
  })
  const exitCode = await subprocess.exited
  if (exitCode !== 0) throw new Error(`Command failed with exit code ${exitCode}: ${cmd.join(' ')}`)
}
await runCommand(['rm', '-rf', tmpDir])
await mkdir(tmpBin, { recursive: true })
await write(file(join(tmpBin, 'pnpm')), '#!/usr/bin/env sh\nexec bun "$@"\n')
await runCommand(['chmod', '+x', join(tmpBin, 'pnpm')])
await runCommand(
  ['bunx', '--bun', 'shadcn@latest', 'init', '-t', 'next', '-b', 'base', '--monorepo', '-p', 'vega', '-n', 'a'],
  tmpDir
)
await runCommand(['bunx', '--bun', 'shadcn@latest', 'add', '@ai-elements/all', '-ayo'], tmpUi)
await runCommand(['bunx', '--bun', 'shadcn@latest', 'add', '-ayo'], tmpUi)
await runCommand(['bunx', '--bun', 'shadcn@latest', 'add', 'sonner', '-ayo'], tmpUi)
const pkg = await readJson(join(tmpUi, 'package.json'))
const components = await readJson(join(tmpUi, 'components.json'))
const componentAlias = components && (components.aliases as JsonRecord).components
const generatedPrefix = typeof componentAlias === 'string' ? componentAlias.replace(/\/components$/u, '') : undefined
const FORCE_LATEST = new Set(['zod'])
const v9CalendarKeyRe = /^\s*table:\s/mu
const probePin = async (): Promise<Record<string, string>> => {
  const out: Record<string, string> = {}
  const calendar = await file(join(tmpUi, 'src/components/calendar.tsx'))
    .text()
    .catch(() => '')
  if (v9CalendarKeyRe.test(calendar)) out['react-day-picker'] = '9'
  return out
}
const FORCE_PIN = await probePin()
const majorRe = /(?<major>\d+)/u
const majorOf = (v: string): number | undefined => {
  const major = majorRe.exec(v)?.groups?.major
  return major === undefined ? undefined : Number(major)
}
const npmLatest = async (name: string): Promise<string | undefined> => {
  try {
    const res = await fetch(`https://registry.npmjs.org/${name}/latest`, { signal: AbortSignal.timeout(30_000) })
    const data = (await res.json()) as { version?: string }
    return data.version ?? undefined
  } catch {
    return undefined
  }
}
const normalizeDeps = async (deps: unknown): Promise<JsonRecord> => {
  if (!isRecord(deps)) return {}
  const out: JsonRecord = {}
  const entries = Object.entries(deps).filter(([, v]) => typeof v === 'string' && !v.includes('workspace:'))
  const results = await Promise.all(
    entries.map(async ([k, v]) => {
      if (FORCE_LATEST.has(k)) return [k, 'latest'] as const
      if (FORCE_PIN[k]) return [k, FORCE_PIN[k]] as const
      const pinned = v as string
      const pinnedMajor = majorOf(pinned)
      if (pinnedMajor === undefined) return [k, pinned] as const
      const latest = await npmLatest(k)
      if (!latest) return [k, pinned] as const
      const latestMajor = majorOf(latest)
      return [k, pinnedMajor === latestMajor ? 'latest' : pinned] as const
    })
  )
  for (const [k, v] of results) out[k] = v
  return out
}
if (pkg)
  await writeJson(join(tmpUi, 'package.json'), {
    ...UI_PACKAGE,
    dependencies: await normalizeDeps(pkg.dependencies),
    devDependencies: {
      ...(isRecord(UI_PACKAGE.devDependencies) ? UI_PACKAGE.devDependencies : {}),
      ...(await normalizeDeps(pkg.devDependencies))
    }
  })
if (components) {
  components.aliases = UI_ALIASES
  await writeJson(join(tmpUi, 'components.json'), components)
}
await writeJson(join(tmpUi, 'tsconfig.json'), UI_TSCONFIG)
if (generatedPrefix) await patchFiles(join(tmpUi, 'src'), src => src.split(generatedPrefix).join(IMPORT_PREFIX))
await patchRadixToBaseUi(join(tmpUi, 'src'))
await ensureTypographyPlugin(join(tmpUi, 'src/styles/globals.css'))
await patchDarkBackground(join(tmpUi, 'src/styles/globals.css'))
await runCommand(['rm', '-rf', join(tmpUi, 'node_modules'), uiDir])
await runCommand(['mv', tmpUi, uiDir])
await write(join(uiDir, 'global.d.ts'), "declare module '*.css' {}\n")
await runCommand([
  'rm',
  '-f',
  join(uiDir, 'components.json'),
  join(uiDir, 'eslint.config.js'),
  join(uiDir, 'tsconfig.lint.json'),
  join(uiDir, 'postcss.config.mjs'),
  join(uiDir, 'postcss.config.ts')
])
await runCommand(['find', uiDir, '-name', '.gitkeep', '-delete'])
await patchUpstreamTypes(join(uiDir, 'src'))
await validateNoRadixUi(join(uiDir, 'src'))
await runCommand(['rm', '-rf', tmpDir])
