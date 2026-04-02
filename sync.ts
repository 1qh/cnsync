import { $, file, write } from 'bun'
import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
type JsonRecord = Record<string, unknown>
const lineBreakRegex = /\r?\n/u,
  isRecord = (v: unknown): v is JsonRecord => typeof v === 'object' && v !== null && !Array.isArray(v),
  readJson = async (p: string): Promise<JsonRecord | null> => {
    const f = file(p)
    if (!(await f.exists())) return null
    const v = JSON.parse(await f.text()) as unknown
    return isRecord(v) ? v : null
  },
  writeJson = async (p: string, v: JsonRecord) => {
    await write(file(p), `${JSON.stringify(v, null, 2)}\n`)
  },
  collectSourceFiles = async (dir: string): Promise<string[]> => {
    const entries = await readdir(dir, { withFileTypes: true }),
      files: string[] = [],
      nested: Promise<string[]>[] = []
    for (const e of entries) {
      const abs = join(dir, e.name)
      if (e.isDirectory()) nested.push(collectSourceFiles(abs))
      if (e.isFile() && (abs.endsWith('.ts') || abs.endsWith('.tsx'))) files.push(abs)
    }
    for (const group of await Promise.all(nested)) files.push(...group)
    return files
  },
  replaceInFiles = async (dir: string, from: string, to: string) => {
    const files = await collectSourceFiles(dir)
    await Promise.all(
      files.map(async abs => {
        const src = await file(abs).text(),
          next = src.split(from).join(to)
        if (next !== src) await write(file(abs), next)
      })
    )
  },
  patchRadixToBaseUi = async (srcDir: string) => {
    const files = await collectSourceFiles(srcDir),
      radix = '@radix-ui/react-use-controllable-state',
      checks = await Promise.all(
        files.map(async f => {
          const src = await file(f).text()
          return src.includes(radix) ? f : null
        })
      ),
      toFix = checks.filter(Boolean) as string[]
    if (toFix.length === 0) return
    const shimDest = join(srcDir, 'hooks/use-controllable-state.ts')
    await $`mkdir -p ${dirname(shimDest)}`
    await write(file(shimDest), await file(join(process.cwd(), 'shims/use-controllable-state.ts')).text())
    const re = /import\s*\{[^}]*\}\s*from\s*["']@radix-ui\/react-use-controllable-state["'];?\n?/gu
    await Promise.all(
      toFix.map(async abs => {
        const src = await file(abs).text(),
          next = src.replace(re, 'import { useControllableState } from "../../hooks/use-controllable-state"\n')
        if (next !== src) await write(file(abs), next)
      })
    )
  },
  patchUpstreamTypes = async (srcDir: string) => {
    const files = await collectSourceFiles(srcDir)
    await Promise.all(
      files.map(async abs => {
        let src = await file(abs).text()
        const orig = src
        if (abs.endsWith('chart.tsx'))
          src = src.replace(
            'import type { TooltipValueType } from "recharts"',
            'type TooltipValueType = number | string | Array<number | string>'
          )
        if (abs.includes('ai-elements/')) {
          src = src
            .replaceAll(/openDelay\s*=\s*\d+,?\s*\n?\s*/gu, '')
            .replaceAll(/closeDelay\s*=\s*\d+,?\s*\n?\s*/gu, '')
            .replaceAll(/\s*closeDelay=\{closeDelay\}/gu, '')
            .replaceAll(/\s*openDelay=\{openDelay\}/gu, '')
            .replaceAll(/\s*closeDelay=\{0\}/gu, '')
            .replaceAll(/\s*openDelay=\{0\}/gu, '')
          if (!src.startsWith('// @ts-nocheck')) src = `// @ts-nocheck\n${src}`
        }
        if (src !== orig) await write(file(abs), src)
      })
    )
  },
  validateNoRadixUi = async (srcDir: string) => {
    const files = await collectSourceFiles(srcDir),
      checks = await Promise.all(
        files.map(async abs => {
          const src = await file(abs).text()
          return src.includes('@radix-ui') || src.includes('from "radix-ui') || src.includes("from 'radix-ui") ? abs : null
        })
      ),
      violations = checks.filter(Boolean)
    if (violations.length > 0) throw new Error(`radix-ui found:\n${violations.join('\n')}`)
  },
  ensureTypographyPlugin = async (cssPath: string) => {
    const src = await file(cssPath).text(),
      lb = src.includes('\r\n') ? '\r\n' : '\n',
      plugin = '@plugin "@tailwindcss/typography";',
      rows = src.split(lineBreakRegex).filter(r => r.trim() !== plugin && r.trim() !== '@import "shadcn/tailwind.css";')
    let idx = rows.findIndex(r => r.trim().startsWith('@import '))
    if (idx < 0) idx = 0
    rows.splice(idx, 0, plugin)
    let next = rows.join(lb)
    if (!next.endsWith(lb)) next += lb
    if (next !== src) await write(file(cssPath), next)
  },
  IMPORT_PREFIX = '@a/ui',
  root = process.cwd(),
  uiDir = join(root, 'readonly/ui'),
  tmpDir = '/tmp/cnsync',
  tmpUi = join(tmpDir, 'a/packages/ui'),
  tmpBin = join(tmpDir, 'bin'),
  UI_PACKAGE: JsonRecord = {
    devDependencies: { '@tailwindcss/postcss': 'latest', '@tailwindcss/typography': 'latest' },
    exports: {
      '.': './src/lib/utils.ts',
      './*': './src/components/*.tsx',
      './components/*': './src/components/*.tsx',
      './globals.css': './src/styles/globals.css',
      './hooks/*': './src/hooks/*.ts',
      './lib/*': './src/lib/*.ts',
      './postcss.config': './postcss.config.mjs'
    },
    name: '@a/ui',
    private: true,
    scripts: { clean: 'rm -rf .cache .turbo dist node_modules', typecheck: "echo 'skip: generated package'" },
    type: 'module',
    version: '0.0.0'
  },
  UI_ALIASES: JsonRecord = {
    components: `${IMPORT_PREFIX}/components`,
    hooks: `${IMPORT_PREFIX}/hooks`,
    lib: `${IMPORT_PREFIX}/lib`,
    ui: `${IMPORT_PREFIX}/components`,
    utils: IMPORT_PREFIX
  },
  UI_TSCONFIG: JsonRecord = {
    compilerOptions: { paths: { [`${IMPORT_PREFIX}/*`]: ['./src/*'] }, strict: false },
    extends: 'lintmax/tsconfig',
    include: ['.']
  }
await $`rm -rf ${tmpDir} && mkdir -p ${tmpBin}`
await write(file(join(tmpBin, 'pnpm')), '#!/usr/bin/env sh\nexec bun "$@"\n')
await $`chmod +x ${join(tmpBin, 'pnpm')}`
const { env: processEnv } = process,
  env = { ...processEnv, PATH: `${tmpBin}:${processEnv.PATH}` }
await $`bunx --bun shadcn@latest init -t next -b base --monorepo -p vega -n a`.cwd(tmpDir).env(env)
await $`bunx --bun shadcn@latest add @ai-elements/all -ayo`.cwd(tmpUi).env(env)
await $`bunx --bun shadcn@latest add -ayo`.cwd(tmpUi).env(env)
const pkg = await readJson(join(tmpUi, 'package.json')),
  components = await readJson(join(tmpUi, 'components.json')),
  generatedPrefix =
    components && typeof (components.aliases as JsonRecord).components === 'string'
      ? ((components.aliases as JsonRecord).components as string).replace(/\/components$/u, '')
      : null
if (pkg) {
  const filterDeps = (deps: unknown): JsonRecord => {
    if (!isRecord(deps)) return {}
    const out: JsonRecord = {}
    for (const [k, v] of Object.entries(deps)) if (typeof v === 'string' && !v.includes('workspace:')) out[k] = v
    return out
  }
  await writeJson(join(tmpUi, 'package.json'), {
    ...UI_PACKAGE,
    dependencies: filterDeps(pkg.dependencies),
    devDependencies: {
      ...(isRecord(UI_PACKAGE.devDependencies) ? UI_PACKAGE.devDependencies : {}),
      ...filterDeps(pkg.devDependencies)
    }
  })
}
if (components) {
  components.aliases = UI_ALIASES
  await writeJson(join(tmpUi, 'components.json'), components)
}
await writeJson(join(tmpUi, 'tsconfig.json'), UI_TSCONFIG)
if (generatedPrefix) await replaceInFiles(join(tmpUi, 'src'), generatedPrefix, IMPORT_PREFIX)
await patchRadixToBaseUi(join(tmpUi, 'src'))
await ensureTypographyPlugin(join(tmpUi, 'src/styles/globals.css'))
await $`rm -rf ${join(tmpUi, 'node_modules')} ${uiDir}`
await $`mv ${tmpUi} ${uiDir}`
await write(join(uiDir, 'global.d.ts'), "declare module '*.css' {}\n")
await $`rm -f ${join(uiDir, 'components.json')} ${join(uiDir, 'eslint.config.js')} ${join(uiDir, 'tsconfig.lint.json')}`
await $`find ${uiDir} -name .gitkeep -delete`
await patchRadixToBaseUi(join(uiDir, 'src'))
await patchUpstreamTypes(join(uiDir, 'src'))
await validateNoRadixUi(join(uiDir, 'src'))
await $`rm -rf ${tmpDir}`
