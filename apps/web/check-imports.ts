import { Glob, Transpiler } from 'bun'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
const uiDir = join(import.meta.dirname, '../../readonly/ui/components')
const examplesDir = join(import.meta.dirname, '../../readonly/examples')
const sourceExtension = /\.[jt]sx?$/u
const transpiler = new Transpiler({ loader: 'tsx' })
const compareNames = (left: string, right: string) => left.localeCompare(right)
const scanImports = async (relativePath: string) => {
  const source = await readFile(join(examplesDir, relativePath), 'utf8')
  return transpiler.scanImports(source).map(entry => entry.path.replace(sourceExtension, ''))
}
const demoFiles = async (directory: string) => {
  const entries = await readdir(join(examplesDir, directory), { withFileTypes: true })
  return entries.filter(entry => entry.isFile()).map(entry => `${directory}/${entry.name}`)
}
const [components, componentDemos, patternDemos, indexImports, exampleFiles] = await Promise.all([
  readdir(uiDir, { withFileTypes: true }),
  demoFiles('components'),
  demoFiles('patterns'),
  scanImports('index.ts'),
  Array.fromAsync(new Glob('**/*.{ts,tsx,js,jsx}').scan(examplesDir))
])
const exampleImports = new Set((await Promise.all(exampleFiles.map(scanImports))).flat())
const indexModules = new Set(indexImports)
const componentDemoFiles = new Set(componentDemos)
const violations: string[] = []
const withoutDemo: string[] = []
const componentFiles = components.filter(entry => entry.isFile() && entry.name.endsWith('.tsx'))
for (const component of componentFiles) {
  const name = component.name.slice(0, -4)
  const importPath = `@a/ui/components/${name}`
  if (!componentDemoFiles.has(`components/${component.name}`)) withoutDemo.push(name)
  else if (!exampleImports.has(importPath)) violations.push(`No example imports ${importPath}`)
}
for (const path of [...componentDemos, ...patternDemos])
  if (!indexModules.has(`./${path.replace(sourceExtension, '')}`))
    violations.push(`readonly/examples/index.ts does not import ${path}`)
if (withoutDemo.length > 0)
  process.stdout.write(`Components without a dedicated upstream demo: ${withoutDemo.toSorted(compareNames).join(', ')}\n`)
if (violations.length > 0) {
  process.stderr.write(`${violations.toSorted(compareNames).join('\n')}\n`)
  process.exitCode = 1
}
