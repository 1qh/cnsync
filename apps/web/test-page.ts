import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const port = 3377
// eslint-disable-next-line sonarjs/no-os-command-from-path -- smoke script: launches the app's own server via a known bin
const server = spawn('bunx', ['next', 'start', '-p', String(port)], { stdio: 'ignore' })
await new Promise<void>(resolve => {
  setTimeout(resolve, 3000)
})
const browser = await chromium.launch()
const page = await browser.newPage()
const errors: string[] = []
page.on('pageerror', e => errors.push(e.message))
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text())
})
await page.goto(`http://localhost:${String(port)}`, { waitUntil: 'load' })
// biome-ignore lint/nursery/noPlaywrightWaitForTimeout: intentional settle window to capture late client-side console errors; no deterministic page signal for "done rendering" in this smoke check
await page.waitForTimeout(5000)
await browser.close()
server.kill()
if (errors.length > 0) {
  for (const e of errors) process.stderr.write(`${e}\n\n`)
  process.exitCode = 1
} else process.stdout.write('No client-side errors\n')
