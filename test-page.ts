/** biome-ignore-all lint/nursery/noPlaywrightNetworkidle: needed for full page load */
/** biome-ignore-all lint/nursery/noPlaywrightWaitForTimeout: waiting for async rendering */
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
const port = 3377,
  server = spawn('bunx', ['next', 'start', '-p', String(port)], { cwd: 'apps/web',
    stdio: 'ignore'
  })
await new Promise(resolve => setTimeout(resolve, 3000))
const browser = await chromium.launch(),
  page = await browser.newPage(),
  errors: string[] = []
page.on('pageerror', e => errors.push(e.message))
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text())
})
await page.goto(`http://localhost:${String(port)}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(5000)
await browser.close()
server.kill()
if (errors.length > 0) {
  for (const e of errors) process.stderr.write(`${e}\n\n`)
  process.exit(1)
}
process.stdout.write('No client-side errors\n')
