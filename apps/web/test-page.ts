import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { setTimeout } from 'node:timers/promises'
import { chromium } from 'playwright'
const listener = createServer()
listener.listen(0)
const address = await (async () => {
  try {
    await once(listener, 'listening', { signal: AbortSignal.timeout(2000) })
    return listener.address()
  } finally {
    const closed = once(listener, 'close', { signal: AbortSignal.timeout(2000) })
    listener.close()
    await closed
  }
})()
if (address === null || typeof address === 'string') throw new Error('Could not allocate a test server port')
const { port } = address
const url = `http://localhost:${String(port)}`
// eslint-disable-next-line sonarjs/no-os-command-from-path -- smoke script: launches the app's own server via a known bin
const server = spawn('bunx', ['next', 'start', '-p', String(port)], { stdio: 'ignore' })
const serverStopped = new AbortController()
server.once('error', error => {
  serverStopped.abort(new Error(`Could not start test server on port ${String(port)}`, { cause: error }))
})
server.once('exit', (code, signal) => {
  serverStopped.abort(new Error(`Test server on port ${String(port)} exited before readiness (${String(signal ?? code)})`))
})
const readinessSeconds = 60
const isAnswering = async (signal: AbortSignal): Promise<boolean> => {
  const response = await fetch(url, { redirect: 'manual', signal }).catch(() => undefined)
  return response !== undefined
}
const attemptUntil = async (deadline: number): Promise<undefined> => {
  serverStopped.signal.throwIfAborted()
  if (Date.now() >= deadline)
    throw new Error(`Test server on port ${String(port)} did not answer within ${String(readinessSeconds)} seconds`)
  const signal = AbortSignal.any([AbortSignal.timeout(2000), serverStopped.signal])
  const isUp = await isAnswering(signal)
  serverStopped.signal.throwIfAborted()
  if (isUp) return undefined
  const pauseMs = Math.min(250, deadline - Date.now())
  await setTimeout(Math.max(0, pauseMs))
  return attemptUntil(deadline)
}
const waitForServer = async () => attemptUntil(Date.now() + readinessSeconds * 1000)
const withBrowserTimeout = async <T>(operation: Promise<T>, description: string) => {
  const signal = AbortSignal.timeout(30_000)
  const timeout = new Promise<never>((_resolve, reject) => {
    signal.addEventListener(
      'abort',
      () => {
        reject(new Error(`Timed out after 30 seconds while ${description}`))
      },
      { once: true }
    )
  })
  const result = await Promise.race([operation, timeout])
  return result
}
const errors: string[] = []
try {
  await waitForServer()
  const browser = await chromium.launch({ timeout: 30_000 })
  try {
    const page = await withBrowserTimeout(browser.newPage(), 'opening the browser page')
    page.on('pageerror', e => {
      errors.push(e.message)
    })
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto(url, { timeout: 30_000, waitUntil: 'load' })
    await page.getByRole('button', { exact: true, name: 'Voice' }).waitFor({ state: 'visible', timeout: 5000 })
  } finally {
    await withBrowserTimeout(browser.close(), 'closing the browser')
  }
} finally {
  server.kill()
}
if (errors.length > 0) {
  for (const e of errors) process.stderr.write(`${e}\n\n`)
  process.exitCode = 1
} else process.stdout.write('No client-side errors\n')
