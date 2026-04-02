import { $, file, Glob, write } from 'bun'
import { dirname, join } from 'node:path'
type JsonRecord = Record<string, unknown>
const isRecord = (v: unknown): v is JsonRecord => typeof v === 'object' && v !== null && !Array.isArray(v),
  readJson = async (p: string): Promise<JsonRecord | null> => {
    try {
      const v = JSON.parse(await file(p).text()) as unknown
      return isRecord(v) ? v : null
    } catch {
      return null
    }
  },
  writeJson = async (p: string, v: JsonRecord) => {
    await write(file(p), `${JSON.stringify(v, null, 2)}\n`)
  },
  tsFiles = (dir: string) => [...new Glob('**/*.{ts,tsx}').scanSync(dir)].map(f => join(dir, f)),
  patchFiles = async (dir: string, fn: (src: string, abs: string) => string) => {
    await Promise.all(
      tsFiles(dir).map(async abs => {
        const src = await file(abs).text(),
          next = fn(src, abs)
        if (next !== src) await write(file(abs), next)
      })
    )
  },
  delayPatterns = [
    /openDelay\s*=\s*\d+,?\s*\n?\s*/gu,
    /closeDelay\s*=\s*\d+,?\s*\n?\s*/gu,
    /\s*closeDelay=\{closeDelay\}/gu,
    /\s*openDelay=\{openDelay\}/gu,
    /\s*closeDelay=\{0\}/gu,
    /\s*openDelay=\{0\}/gu
  ],
  radixImportRe = /import\s*\{[^}]*\}\s*from\s*["']@radix-ui\/react-use-controllable-state["'];?\n?/gu,
  patchRadixToBaseUi = async (srcDir: string) => {
    const radix = '@radix-ui/react-use-controllable-state',
      checks = await Promise.all(
        tsFiles(srcDir).map(async f => {
          const src = await file(f).text()
          return src.includes(radix) ? f : null
        })
      ),
      toFix = checks.filter(Boolean) as string[]
    if (toFix.length === 0) return
    const shimDest = join(srcDir, 'hooks/use-controllable-state.ts')
    await $`mkdir -p ${dirname(shimDest)}`
    await write(file(shimDest), await file(join(process.cwd(), 'shims/use-controllable-state.ts')).text())
    await Promise.all(
      toFix.map(async abs => {
        const src = await file(abs).text(),
          next = src.replace(radixImportRe, 'import { useControllableState } from "../../hooks/use-controllable-state"\n')
        if (next !== src) await write(file(abs), next)
      })
    )
  },
  patchUpstreamTypes = async (srcDir: string) => {
    await patchFiles(srcDir, (src, abs) => {
      let out = src
      if (abs.endsWith('chart.tsx'))
        out = out.replace(
          'import type { TooltipValueType } from "recharts"',
          'type TooltipValueType = number | string | Array<number | string>'
        )
      if (abs.includes('ai-elements/')) {
        for (const re of delayPatterns) out = out.replaceAll(re, '')
        if (!out.startsWith('// @ts-nocheck')) out = `// @ts-nocheck\n${out}`
      }
      return out
    })
  },
  validateNoRadixUi = async (srcDir: string) => {
    const checks = await Promise.all(
        tsFiles(srcDir).map(async abs => {
          const src = await file(abs).text()
          return src.includes('@radix-ui') || src.includes('from "radix-ui') || src.includes("from 'radix-ui") ? abs : null
        })
      ),
      violations = checks.filter(Boolean)
    if (violations.length > 0) throw new Error(`radix-ui found:\n${violations.join('\n')}`)
  },
  lineBreakRe = /\r?\n/u,
  ensureTypographyPlugin = async (cssPath: string) => {
    const src = await file(cssPath).text(),
      lb = src.includes('\r\n') ? '\r\n' : '\n',
      plugin = '@plugin "@tailwindcss/typography";',
      rows = src.split(lineBreakRe).filter(r => r.trim() !== plugin && r.trim() !== '@import "shadcn/tailwind.css";')
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
if (generatedPrefix) await patchFiles(join(tmpUi, 'src'), src => src.split(generatedPrefix).join(IMPORT_PREFIX))
await patchRadixToBaseUi(join(tmpUi, 'src'))
await ensureTypographyPlugin(join(tmpUi, 'src/styles/globals.css'))
await $`rm -rf ${join(tmpUi, 'node_modules')} ${uiDir}`
await $`mv ${tmpUi} ${uiDir}`
await write(join(uiDir, 'global.d.ts'), "declare module '*.css' {}\n")
await $`rm -f ${join(uiDir, 'components.json')} ${join(uiDir, 'eslint.config.js')} ${join(uiDir, 'tsconfig.lint.json')}`
await $`find ${uiDir} -name .gitkeep -delete`
await patchUpstreamTypes(join(uiDir, 'src'))
await validateNoRadixUi(join(uiDir, 'src'))
await $`rm -rf ${tmpDir}`
