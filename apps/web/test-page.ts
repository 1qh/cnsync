import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
const port = 3377
// eslint-disable-next-line sonarjs/no-os-command-from-path -- smoke script: launches the app's own server via a known bin
const server = spawn('bunx', ['next', 'start', '-p', String(port)], { stdio: 'ignore' })
await new Promise<undefined>(resolve => {
  setTimeout(() => {
    resolve(undefined)
  }, 3000)
})
const browser = await chromium.launch()
const page = await browser.newPage()
const errors: string[] = []
page.on('pageerror', e => {
  errors.push(e.message)
})
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text())
})
try {
  await page.goto(`http://localhost:${String(port)}`, { timeout: 30_000, waitUntil: 'load' })
  await page.getByRole('button', { exact: true, name: 'Voice' }).waitFor({ state: 'visible', timeout: 5000 })
} finally {
  await browser.close()
  server.kill()
}
if (errors.length > 0) {
  for (const e of errors) process.stderr.write(`${e}\n\n`)
  process.exitCode = 1
} else process.stdout.write('No client-side errors\n')
