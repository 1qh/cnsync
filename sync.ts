import type { Node, StringLiteralLike } from 'typescript'
import { file, Glob, spawn, write } from 'bun'
import { access, mkdir, mkdtemp, readdir, rename, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, dirname, join, posix, resolve } from 'node:path'
import {
  createSourceFile,
  forEachChild,
  isCallExpression,
  isExportDeclaration,
  isExternalModuleReference,
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isImportTypeNode,
  isLiteralTypeNode,
  isStringLiteralLike,
  ScriptTarget,
  SyntaxKind
} from 'typescript'
interface Demo {
  kind: DemoKind
  name: string
  symbol: string
}
type DemoKind = 'component' | 'pattern'
interface ExampleCheck {
  cwd: string
  demos: readonly Demo[]
  env: NodeJS.ProcessEnv
  tsc: string
}
interface ExampleImports {
  helpers: Set<string>
  packages: Set<string>
}
interface ExampleSource {
  imports: ExampleImports
  output: string
  path: string
  src: string
}
interface HelperVendor {
  dir: string
  imports: ExampleImports
  outputs: Map<string, string>
  pending: ReturnType<Set<string>['values']>
}
type JsonRecord = Record<string, unknown>
const IMPORT_PREFIX = '@a/ui'
const DOCS_ROOT = 'https://ui.shadcn.com/docs'
const RAW_ROOT = 'https://raw.githubusercontent.com/shadcn-ui/ui/main'
const WEB_PUBLIC_DIR = 'apps/web/public'
const EXAMPLE_IMPORTS = new Map([
  ['@/lib/utils', `${IMPORT_PREFIX}/lib/utils`],
  ['cn', `${IMPORT_PREFIX}/lib/utils`]
])
const UI_DEV_DEPENDENCIES = { '@tailwindcss/postcss': 'latest', '@tailwindcss/typography': 'latest' }
const UI_PACKAGE = {
  devDependencies: UI_DEV_DEPENDENCIES,
  exports: {
    '.': './lib/utils.ts',
    './*': './components/*.tsx',
    './components/*': './components/*.tsx',
    './globals.css': './styles/globals.css',
    './hooks/*': './hooks/*.ts',
    './lib/*': './lib/*.ts'
  },
  name: IMPORT_PREFIX,
  private: true,
  type: 'module',
  version: '0.0.0'
}
const UI_TSCONFIG = {
  compilerOptions: { paths: { [`${IMPORT_PREFIX}/*`]: ['./*'] }, strict: false },
  extends: 'lintmax/tsconfig',
  include: ['.']
}
const EXAMPLES_TSCONFIG = {
  ...UI_TSCONFIG,
  compilerOptions: {
    incremental: false,
    noUncheckedIndexedAccess: false,
    paths: { [`${IMPORT_PREFIX}/*`]: ['../ui/*'] },
    strict: true
  }
}
const EXAMPLES_DECLARATION = `import type { ReactNode } from 'react'
export interface Example {
  kind: 'component' | 'pattern'
  name: string
  Demo: () => ReactNode
}
export declare const examples: readonly Example[]
`
const MAX_EXAMPLE_CHECK_PASSES = 3
const componentAliasSuffix = '/components'
const assetExtensionRe = /\.(?:avif|gif|ico|jpe?g|json|mp[34]|png|svg|webp)$/iu
const darkBlockRe = /\.dark\s*\{[^}]*/gu
const backgroundStartRe = /--background:\s*oklch\(/gu
const diagnosticPathRe = /^(?<path>.+)\(\d+,\d+\): error TS\d+:/u
const lineBreakRe = /\r?\n/u
const v9CalendarKeyRe = /^[^\S\r\n\u2028\u2029]*table:\s/mu
const majorRe = /\d+/u
const markdownExtensionRe = /\.md$/u
const patternLinkRe = /\(\/docs\/ai-elements\/base\/(?<name>[a-z0-9-]+)\)/gu
const tsxFenceRe = /^ {0,3}(?<fence>`{3,})tsx[^\S\r\n]*\r?\n(?<code>[\s\S]*?)^ {0,3}\k<fence>`*[^\S\r\n]*$/gmu
const styleUiImportRe = /^@\/(?:styles\/[^/]+|registry\/(?:bases\/)?[^/]+)\/ui\//u
const registryCodeRe = /^@\/registry\/(?:bases\/)?[^/]+\/(?<dir>hooks|lib)\//u
const helperImportRe = /^@\/(?:components|lib)\/(?<path>[\w-][\w.-]*(?:\/[\w-][\w.-]*)*)$/u
const packageImportRe = /^(?<name>(?:@[\w~-][\w.~-]*\/)?[\w~-][\w.~-]*)(?:\/[\w.~-]+)*$/iu
const compareText = (left: string, right: string) => left.localeCompare(right)
const isRecord = (v: unknown): v is JsonRecord => typeof v === 'object' && v !== null && !Array.isArray(v)
const parseJson = (text: string, source: string): JsonRecord => {
  const value: unknown = JSON.parse(text)
  if (isRecord(value)) return value
  throw new Error(`Expected a JSON object in ${source}`)
}
const readJson = async (path: string) => {
  const text = await file(path).text()
  return parseJson(text, path)
}
const writeJson = async (path: string, value: JsonRecord) => {
  await write(path, `${JSON.stringify(value, undefined, 2)}\n`)
}
const fetchOptionalText = async (url: string) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) })
    if (response.status === 404) return
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.text()
  } catch (fetchError) {
    throw new Error(`Failed to fetch ${url}: ${String(fetchError)}`, { cause: fetchError })
  }
}
const fetchText = async (url: string) => {
  const text = await fetchOptionalText(url)
  if (text === undefined) throw new Error(`Failed to fetch ${url}: HTTP 404`)
  return text
}
const tsFiles = async (dir: string): Promise<string[]> => {
  const out: string[] = []
  const matches = new Glob('**/*.{ts,tsx}').scan(dir)
  for await (const name of matches) out.push(join(dir, name))
  return out.toSorted(compareText)
}
const rewriteUiImports = async (dir: string, generatedPrefix: string) => {
  await Promise.all(
    (await tsFiles(dir)).map(async path => {
      const src = await file(path).text()
      const next = src.replaceAll(generatedPrefix, IMPORT_PREFIX)
      if (next !== src) await write(path, next)
    })
  )
}
const validateNoRadixUi = async (dir: string) => {
  const checks = await Promise.all(
    (await tsFiles(dir)).map(async path => {
      const src = await file(path).text()
      return src.includes('@radix-ui') || src.includes('from "radix-ui') || src.includes("from 'radix-ui")
        ? path
        : undefined
    })
  )
  const violations = checks.filter(path => path !== undefined)
  if (violations.length > 0) throw new Error(`radix-ui found:\n${violations.join('\n')}`)
}
const typographyRows = (src: string) => {
  const plugin = '@plugin "@tailwindcss/typography";'
  const shadcnImport = '@import "shadcn/tailwind.css";'
  const rows = src.split(lineBreakRe).filter(row => row.trim() !== plugin && row.trim() !== shadcnImport)
  const idx = rows.findIndex(row => row.trim().startsWith('@import '))
  rows.splice(Math.max(idx, 0), 0, plugin)
  const twIdx = rows.findIndex(row => row.trim() === '@import "tailwindcss";')
  if (twIdx !== -1) rows.splice(twIdx + 1, 0, shadcnImport)
  return rows
}
const ensureTypographyPlugin = async (cssPath: string) => {
  const src = await file(cssPath).text()
  const lb = src.includes('\r\n') ? '\r\n' : '\n'
  let next = typographyRows(src).join(lb)
  if (!next.endsWith(lb)) next += lb
  if (next !== src) await write(cssPath, next)
}
const darkBackgroundStart = (src: string) => {
  for (const block of src.matchAll(darkBlockRe)) {
    const properties = block[0].matchAll(backgroundStartRe)
    for (const property of properties) {
      const start = block.index + property.index
      const valueStart = start + property[0].length
      const end = src.indexOf(')', valueStart)
      if (end === -1) return
      if (end > valueStart) return { end, start }
    }
  }
}
const patchDarkBackground = async (cssPath: string) => {
  const src = await file(cssPath).text()
  const background = darkBackgroundStart(src)
  if (background === undefined) return
  const next = `${src.slice(0, background.start)}--background: oklch(0 0 0)${src.slice(background.end + 1)}`
  if (next !== src) await write(cssPath, next)
}
const rewriteImport = (specifier: string) => {
  if (specifier.startsWith('@/components/ui/'))
    return specifier.replace('@/components/ui/', `${IMPORT_PREFIX}/components/`)
  if (styleUiImportRe.test(specifier)) return specifier.replace(styleUiImportRe, `${IMPORT_PREFIX}/components/`)
  if (specifier.startsWith('@/hooks/')) return specifier.replace('@/hooks/', `${IMPORT_PREFIX}/hooks/`)
  if (specifier.startsWith('@/components/hooks/'))
    return specifier.replace('@/components/hooks/', `${IMPORT_PREFIX}/hooks/`)
  const registryCode = registryCodeRe.exec(specifier)
  if (registryCode?.groups?.dir !== undefined)
    return specifier.replace(registryCodeRe, `${IMPORT_PREFIX}/${registryCode.groups.dir}/`)
  return EXAMPLE_IMPORTS.get(specifier)
}
const moduleSpecifier = (node: Node) => {
  if (isImportDeclaration(node) || isExportDeclaration(node)) return node.moduleSpecifier
  if (isImportEqualsDeclaration(node) && isExternalModuleReference(node.moduleReference))
    return node.moduleReference.expression
  if (isImportTypeNode(node) && isLiteralTypeNode(node.argument)) return node.argument.literal
  if (isCallExpression(node)) {
    const target = node.expression
    if (target.kind === SyntaxKind.ImportKeyword || (isIdentifier(target) && target.text === 'require'))
      return node.arguments[0]
  }
}
const relativeHelperImport = (helper: string, output: string) => {
  const target = `lib/${helper}`
  const directory = posix.relative(posix.dirname(output), posix.dirname(target))
  const relative = posix.join(directory, posix.basename(target))
  return relative.startsWith('../') ? relative : `./${relative}`
}
const exampleSpecifier = (specifier: string, context: ExampleSource) => {
  const rewritten = rewriteImport(specifier)
  if (rewritten !== undefined) return rewritten
  const helper = helperImportRe.exec(specifier)?.groups?.path
  if (helper !== undefined) {
    context.imports.helpers.add(specifier)
    return relativeHelperImport(helper, context.output)
  }
  const name = packageImportRe.exec(specifier)?.groups?.name
  if (name === undefined) throw new Error(`Unexpected import "${specifier}" in ${context.path}`)
  context.imports.packages.add(name)
}
const collectExampleEdits = (source: Node, context: ExampleSource) => {
  const edits: { literal: StringLiteralLike; specifier: string }[] = []
  const visit = (node: Node) => {
    const literal = moduleSpecifier(node)
    if (literal !== undefined) {
      if (!isStringLiteralLike(literal)) throw new Error(`Expected a literal import in ${context.path}`)
      const specifier = exampleSpecifier(literal.text, context)
      if (specifier !== undefined) edits.push({ literal, specifier })
    }
    forEachChild(node, visit)
  }
  visit(source)
  return edits
}
const rewriteExampleImports = (context: ExampleSource) => {
  const { path, src } = context
  const source = createSourceFile(path, src, ScriptTarget.Latest, true)
  const edits = collectExampleEdits(source, context)
  let rewritten = src
  for (const { literal, specifier } of edits.toReversed()) {
    const start = literal.getStart(source)
    const quote = src.charAt(start)
    rewritten = rewritten.slice(0, start) + quote + specifier + quote + rewritten.slice(literal.end)
  }
  return rewritten
}
const demoSymbol = (code: string, path: string, shouldAllowDefault: boolean) => {
  const source = createSourceFile(path, code, ScriptTarget.Latest)
  const declarations = source.statements.filter(isFunctionDeclaration).filter(statement => statement.body !== undefined)
  for (const statement of declarations) {
    const name = statement.name?.text
    const isExported = statement.modifiers?.some(modifier => modifier.kind === SyntaxKind.ExportKeyword)
    const isDefault = statement.modifiers?.some(modifier => modifier.kind === SyntaxKind.DefaultKeyword)
    if (isExported && name?.endsWith('Demo')) return isDefault ? 'default' : name
    if (shouldAllowDefault && isDefault) return 'default'
  }
}
const demoPath = ({ kind, name }: Pick<Demo, 'kind' | 'name'>) => `${kind}s/${name}.tsx`
const markdownDemo = (markdown: string, url: string) => {
  const path = url.replace(markdownExtensionRe, '.tsx')
  for (const match of markdown.matchAll(tsxFenceRe)) {
    const code = match.groups?.code
    if (code === undefined) throw new Error(`Missing TSX block content in ${url}`)
    const symbol = demoSymbol(code, path, false)
    if (symbol !== undefined) return { path, src: code, symbol }
  }
}
const loadDocumentedDemo = async ({ kind, name }: Pick<Demo, 'kind' | 'name'>) => {
  const section = kind === 'component' ? 'components' : 'ai-elements'
  const url = `${DOCS_ROOT}/${section}/base/${name}.md`
  const markdown = await fetchOptionalText(url)
  return markdown === undefined ? undefined : markdownDemo(markdown, url)
}
const loadDemoSource = async (demo: Pick<Demo, 'kind' | 'name'>) => {
  const documented = await loadDocumentedDemo(demo)
  if (documented !== undefined) return documented
  const path = `${RAW_ROOT}/apps/v4/examples/base/${demo.name}-demo.tsx`
  const src = await fetchOptionalText(path)
  if (src === undefined) return
  const symbol = demoSymbol(src, path, true)
  if (symbol === undefined) throw new Error(`Missing demo export in ${path}`)
  return { path, src, symbol }
}
const loadDemo = async (
  kind: DemoKind,
  name: string,
  imports: ExampleImports
): Promise<(Demo & { text: string }) | string> => {
  const source = await loadDemoSource({ kind, name })
  if (source === undefined) return name
  const { path, src, symbol } = source
  const text = rewriteExampleImports({ imports, output: demoPath({ kind, name }), path, src })
  return { kind, name, symbol, text: `${text.trimEnd()}\n` }
}
const loadHelper = async (specifier: string) => {
  const url = `${RAW_ROOT}/apps/v4/${specifier.slice(2)}`
  const tsx = await fetchOptionalText(`${url}.tsx`)
  if (tsx !== undefined) return { extension: '.tsx', path: `${url}.tsx`, src: tsx }
  const ts = await fetchOptionalText(`${url}.ts`)
  if (ts !== undefined) return { extension: '.ts', path: `${url}.ts`, src: ts }
  throw new Error(`Helper ${specifier} not found at ${url}.tsx or ${url}.ts`)
}
const writeHelper = async (specifier: string, stem: string, { dir, imports }: HelperVendor) => {
  const { extension, path, src } = await loadHelper(specifier)
  if (src.trim().length === 0) throw new Error(`Empty helper source at ${path}`)
  const output = `${stem}${extension}`
  const text = rewriteExampleImports({ imports, output, path, src })
  const destination = join(dir, output)
  await mkdir(dirname(destination), { recursive: true })
  await write(destination, text)
}
const vendorHelpers = async (vendor: HelperVendor): Promise<undefined> => {
  const { done, value: specifier } = vendor.pending.next()
  if (done === true) return
  const stem = `lib/${specifier.slice(specifier.indexOf('/', 2) + 1)}`
  const existing = vendor.outputs.get(stem)
  if (existing !== undefined) throw new Error(`Helpers ${existing} and ${specifier} both map to ${stem}`)
  vendor.outputs.set(stem, specifier)
  await writeHelper(specifier, stem, vendor)
  await vendorHelpers(vendor)
}
const examplesIndex = (demos: readonly Demo[]) => {
  const imports = demos.map((demo, index) => {
    const { symbol } = demo
    const binding = symbol === 'default' ? `Demo${index}` : `{ ${symbol} as Demo${index} }`
    return `import ${binding} from './${demoPath(demo).slice(0, -4)}'`
  })
  const entries = demos.map(({ kind, name }, index) => `  { kind: '${kind}', name: '${name}', Demo: Demo${index} }`)
  return `${imports.join('\n')}\nconst examples = [\n${entries.join(',\n')}\n] as const\nexport { examples }\n`
}
const installedComponents = async (uiDir: string) => {
  const componentPaths = await readdir(join(uiDir, 'components'))
  const components = componentPaths
    .filter(name => name.endsWith('.tsx') && name !== 'form.tsx')
    .map(name => basename(name, '.tsx'))
    .toSorted(compareText)
  if (components.length === 0) throw new Error('No installed Base UI components found')
  return components
}
const documentedPatterns = async () => {
  const overviewUrl = `${DOCS_ROOT}/ai-elements.md`
  const overview = await fetchText(overviewUrl)
  const patternNames = new Set<string>()
  for (const match of overview.matchAll(patternLinkRe)) {
    const name = match.groups?.name
    if (name !== undefined) patternNames.add(name)
  }
  const patterns = [...patternNames].toSorted(compareText)
  if (patterns.length === 0) throw new Error(`No Base UI pattern links found in ${overviewUrl}`)
  return patterns
}
const writeExamples = async (
  dir: string,
  demos: readonly (Demo & { text: string })[],
  dependencies: Record<string, string>
) => {
  await Promise.all(['components', 'lib', 'patterns'].map(async folder => mkdir(join(dir, folder), { recursive: true })))
  await Promise.all([
    ...demos.map(async demo => write(join(dir, demoPath(demo)), demo.text)),
    write(join(dir, 'index.d.ts'), EXAMPLES_DECLARATION),
    writeJson(join(dir, 'package.json'), {
      dependencies,
      exports: {
        '.': Object.fromEntries([
          ['types', './index.d.ts'],
          ['default', './index.ts']
        ])
      },
      name: '@a/examples',
      private: true,
      type: 'module',
      types: './index.d.ts'
    }),
    writeJson(join(dir, 'tsconfig.json'), EXAMPLES_TSCONFIG)
  ])
}
const exampleDependencies = (packages: Set<string>, dependencyVersions: Record<string, string>) =>
  Object.fromEntries(
    [...packages]
      .toSorted(compareText)
      .map(name => [name, name === IMPORT_PREFIX ? 'workspace:*' : (dependencyVersions[name] ?? 'latest')])
  )
const generateExamples = async (uiDir: string, dir: string, dependencyVersions: Record<string, string>) => {
  const components = await installedComponents(uiDir)
  const patterns = await documentedPatterns()
  const imports = { helpers: new Set<string>(), packages: new Set<string>([IMPORT_PREFIX]) }
  const results = await Promise.all([
    ...components.map(async name => loadDemo('component', name, imports)),
    ...patterns.map(async name => loadDemo('pattern', name, imports))
  ])
  await vendorHelpers({ dir, imports, outputs: new Map(), pending: imports.helpers.values() })
  const demos = results.filter(result => typeof result !== 'string')
  await writeExamples(dir, demos, exampleDependencies(imports.packages, dependencyVersions))
  return { demos, missingDemos: results.filter(result => typeof result === 'string').toSorted(compareText) }
}
const runExampleCheck = async ({ cwd, env, tsc }: ExampleCheck) => {
  const subprocess = spawn({
    cmd: [tsc, '--noEmit', '-p', 'readonly/examples/tsconfig.json', '--pretty', 'false'],
    cwd,
    env,
    killSignal: 'SIGKILL',
    stderr: 'pipe',
    stdout: 'pipe',
    timeout: 60_000
  })
  const [exitCode, stdout, stderr] = await Promise.all([
    subprocess.exited,
    new Response(subprocess.stdout).text(),
    new Response(subprocess.stderr).text()
  ])
  return { diagnostics: `${stdout}\n${stderr}`.trim(), exitCode, signalCode: subprocess.signalCode }
}
const failedExamplePaths = (cwd: string, diagnostics: string) => {
  const paths = new Set<string>()
  for (const line of diagnostics.split(lineBreakRe)) {
    const path = diagnosticPathRe.exec(line)?.groups?.path
    if (path !== undefined) paths.add(resolve(cwd, path))
  }
  return paths
}
const pruneFailedExamples = async (check: ExampleCheck, dir: string, pass: number) => {
  const { diagnostics, exitCode, signalCode } = await runExampleCheck(check)
  if (exitCode === 0) return
  const failedPaths = failedExamplePaths(check.cwd, diagnostics)
  const failed = check.demos.filter(demo => failedPaths.has(join(dir, demoPath(demo))))
  if (signalCode !== null || failed.length === 0 || pass === MAX_EXAMPLE_CHECK_PASSES)
    throw new Error(`Examples type check failed on pass ${pass} (exit ${exitCode}):\n${diagnostics}`)
  await Promise.all(failed.map(async demo => rm(join(dir, demoPath(demo)))))
  return { failed, remaining: check.demos.filter(demo => !failedPaths.has(join(dir, demoPath(demo)))) }
}
const checkExamples = async (check: ExampleCheck, pass = 1, incompatible = new Set<string>()): Promise<string[]> => {
  const { cwd, demos } = check
  const dir = join(cwd, 'readonly/examples')
  await write(join(dir, 'index.ts'), examplesIndex(demos))
  const result = await pruneFailedExamples(check, dir, pass)
  if (result === undefined) return [...incompatible].toSorted(compareText)
  for (const demo of result.failed) incompatible.add(demo.name)
  const remainingIncompatible = await checkExamples({ ...check, demos: result.remaining }, pass + 1, incompatible)
  return remainingIncompatible
}
const byCodePoint = (left: string, right: string) => {
  if (left < right) return -1
  if (left > right) return 1
  return 0
}
const collectAssetPaths = async (examplesDir: string) => {
  const assets = new Set<string>()
  const visit = (node: Node) => {
    if (isStringLiteralLike(node) && node.text.startsWith('/') && assetExtensionRe.test(node.text)) assets.add(node.text)
    forEachChild(node, visit)
  }
  const paths = await tsFiles(examplesDir)
  const sources = await Promise.all(
    paths.map(async path => createSourceFile(path, await file(path).text(), ScriptTarget.Latest))
  )
  for (const source of sources) visit(source)
  return [...assets].toSorted(byCodePoint)
}
const fetchAsset = async (path: string) => {
  if (posix.normalize(path) !== path || path.includes('\\') || path.includes('\0'))
    throw new Error(`Invalid public asset path: ${path}`)
  const encodedPath = path.split('/').map(encodeURIComponent).join('/')
  const url = `${RAW_ROOT}/apps/v4/public${encodedPath}`
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.arrayBuffer()
  } catch (assetError) {
    throw new Error(`Failed to fetch ${url}: ${String(assetError)}`, { cause: assetError })
  }
}
const stagePublicAssets = async (stagingDir: string) => {
  const paths = await collectAssetPaths(join(stagingDir, 'readonly/examples'))
  const publicDir = join(stagingDir, WEB_PUBLIC_DIR)
  await mkdir(publicDir, { recursive: true })
  const assets = await Promise.all(paths.map(async path => ({ bytes: await fetchAsset(path), path })))
  const writes = await Promise.allSettled(
    assets.map(async ({ bytes, path }) => {
      const destination = join(publicDir, path)
      await mkdir(dirname(destination), { recursive: true })
      await write(destination, bytes)
    })
  )
  const failed = writes.find(result => result.status === 'rejected')
  if (failed !== undefined) throw new Error('Failed to stage public assets', { cause: failed.reason })
}
const majorOf = (version: string) => majorRe.exec(version)?.[0]
const normalizeVersion = async (name: string, specifier: string) => {
  const pinnedMajor = majorOf(specifier)
  if (pinnedMajor === undefined) return specifier
  const url = `https://registry.npmjs.org/${name}/latest`
  const latest = parseJson(await fetchText(url), url).version
  const latestMajor = typeof latest === 'string' ? majorOf(latest) : undefined
  if (latestMajor === undefined) throw new Error(`Missing version in ${url}`)
  return pinnedMajor === latestMajor ? 'latest' : specifier
}
const normalizeDeps = async (deps: unknown, isCalendarV9: boolean): Promise<Record<string, string>> => {
  if (deps === undefined) return {}
  if (!isRecord(deps)) throw new Error('Expected a dependency object in the generated UI package')
  const names = Object.keys(deps).toSorted(compareText)
  const results = await Promise.all(
    names.map(async name => {
      const specifier = deps[name]
      if (typeof specifier !== 'string') throw new TypeError(`Invalid version for ${name} in the generated UI package`)
      if (specifier.startsWith('workspace:')) return
      if (name === 'zod') return [name, 'latest'] as const
      if (name === 'react-day-picker' && isCalendarV9) return [name, '9'] as const
      return [name, await normalizeVersion(name, specifier)] as const
    })
  )
  return Object.fromEntries(results.filter(entry => entry !== undefined))
}
const prepareUi = async (dir: string) => {
  const [pkg, config, calendar] = await Promise.all([
    readJson(join(dir, 'package.json')),
    readJson(join(dir, 'components.json')),
    file(join(dir, 'src/components/calendar.tsx')).text()
  ])
  const alias = isRecord(config.aliases) ? config.aliases.components : undefined
  if (typeof alias !== 'string' || !alias.endsWith(componentAliasSuffix) || alias === componentAliasSuffix)
    throw new Error('Missing package component alias in generated components.json')
  const generatedPrefix = alias.slice(0, -componentAliasSuffix.length)
  const isCalendarV9 = v9CalendarKeyRe.test(calendar)
  const [dependencies, devDependencies] = await Promise.all([
    normalizeDeps(pkg.dependencies, isCalendarV9),
    normalizeDeps(pkg.devDependencies, isCalendarV9)
  ])
  await writeJson(join(dir, 'package.json'), {
    ...UI_PACKAGE,
    dependencies,
    devDependencies: { ...UI_PACKAGE.devDependencies, ...devDependencies }
  })
  return { dependencies, generatedPrefix }
}
const runCommand = async (cmd: string[], cwd: string, env: NodeJS.ProcessEnv) => {
  const subprocess = spawn({
    cmd,
    cwd,
    env,
    killSignal: 'SIGKILL',
    stderr: 'inherit',
    stdout: 'inherit',
    timeout: 600_000
  })
  const exitCode = await subprocess.exited
  if (exitCode !== 0) throw new Error(`Command failed with exit code ${exitCode}: ${cmd.join(' ')}`)
}
const flattenUi = async (dir: string) => {
  const srcDir = join(dir, 'src')
  const entries = (await readdir(srcDir)).toSorted(compareText)
  await Promise.all(entries.map(async name => rename(join(srcDir, name), join(dir, name))))
  await rm(srcDir, { recursive: true })
}
const finalizeUi = async ({
  dir,
  env,
  generatedPrefix,
  tempDir
}: {
  dir: string
  env: NodeJS.ProcessEnv
  generatedPrefix: string
  tempDir: string
}) => {
  const cssPath = join(dir, 'styles/globals.css')
  await Promise.all([
    rewriteUiImports(dir, generatedPrefix),
    writeJson(join(dir, 'tsconfig.json'), UI_TSCONFIG),
    write(join(dir, 'global.d.ts'), "declare module '*.css' {}\n"),
    runCommand(['find', dir, '-name', '.gitkeep', '-delete'], tempDir, env)
  ])
  await ensureTypographyPlugin(cssPath)
  await patchDarkBackground(cssPath)
  await validateNoRadixUi(dir)
}
const prepareScaffoldEnv = async (tempDir: string, tsc: string) => {
  const tmpBin = join(tempDir, 'bin')
  const packageManager = join(tmpBin, 'pnpm')
  const { env: processEnv } = process
  if (processEnv.PATH === undefined) throw new Error('PATH is required to run shadcn')
  const env = { ...processEnv, PATH: `${tmpBin}:${processEnv.PATH}` }
  await access(tsc)
  await mkdir(tmpBin)
  await write(packageManager, '#!/usr/bin/env sh\nexec bun "$@"\n')
  await runCommand(['chmod', '+x', packageManager], tempDir, env)
  return env
}
const scaffoldUi = async (tempDir: string, tsc: string) => {
  const tmpUi = join(tempDir, 'a/packages/ui')
  const env = await prepareScaffoldEnv(tempDir, tsc)
  await runCommand(
    ['bunx', '--bun', 'shadcn@latest', 'init', '-t', 'next', '-b', 'base', '--monorepo', '-p', 'vega', '-n', 'a'],
    tempDir,
    env
  )
  await runCommand(['bunx', '--bun', 'shadcn@latest', 'add', '-ayo'], tmpUi, env)
  return { env, tmpUi }
}
const removeScaffoldFiles = async (dir: string) => {
  const scaffoldFiles = [
    'components.json',
    'eslint.config.js',
    'node_modules',
    'postcss.config.mjs',
    'postcss.config.ts',
    'tsconfig.lint.json'
  ]
  await Promise.all(scaffoldFiles.map(async name => rm(join(dir, name), { force: true, recursive: true })))
}
const publishPackages = async (root: string, stagingDir: string) => {
  const uiDir = join(root, 'readonly/ui')
  const examplesDir = join(root, 'readonly/examples')
  await mkdir(join(root, 'readonly'), { recursive: true })
  await rm(uiDir, { force: true, recursive: true })
  await rename(join(stagingDir, 'readonly/ui'), uiDir)
  await rm(examplesDir, { force: true, recursive: true })
  await rename(join(stagingDir, 'readonly/examples'), examplesDir)
}
const stagePackages = async (tempDir: string, stagingDir: string, tsc: string) => {
  const stagedUi = join(stagingDir, 'readonly/ui')
  const { env, tmpUi } = await scaffoldUi(tempDir, tsc)
  const { dependencies, generatedPrefix } = await prepareUi(tmpUi)
  const { demos, missingDemos } = await generateExamples(
    join(tmpUi, 'src'),
    join(stagingDir, 'readonly/examples'),
    dependencies
  )
  await removeScaffoldFiles(tmpUi)
  await runCommand(['mv', tmpUi, stagedUi], tempDir, env)
  await flattenUi(stagedUi)
  await finalizeUi({ dir: stagedUi, env, generatedPrefix, tempDir })
  const incompatibleDemos = await checkExamples({ cwd: stagingDir, demos, env, tsc })
  return { incompatibleDemos, missingDemos }
}
const sync = async (tempDir: string, stagingDir: string) => {
  const root = process.cwd()
  const result = await stagePackages(tempDir, stagingDir, join(root, 'node_modules/.bin/tsc'))
  await stagePublicAssets(stagingDir)
  await publishPackages(root, stagingDir)
  const publicDir = join(root, WEB_PUBLIC_DIR)
  await rm(publicDir, { force: true, recursive: true })
  await rename(join(stagingDir, WEB_PUBLIC_DIR), publicDir)
  return result
}
const workspace = await mkdtemp(join(tmpdir(), 'cnsync-'))
try {
  const stagingDir = await mkdtemp(join(process.cwd(), '.cnsync-'))
  try {
    const { incompatibleDemos, missingDemos } = await sync(workspace, stagingDir)
    if (missingDemos.length > 0) process.stdout.write(`no upstream demo: ${missingDemos.join(', ')}\n`)
    if (incompatibleDemos.length > 0)
      process.stdout.write(`incompatible with latest dependencies: ${incompatibleDemos.join(', ')}\n`)
  } finally {
    await rm(stagingDir, { force: true, recursive: true })
  }
} finally {
  await rm(workspace, { force: true, recursive: true })
}
