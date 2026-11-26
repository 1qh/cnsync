import type { NextConfig } from 'next'
import { join } from 'node:path'
const config: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  transpilePackages: ['@a/examples', '@a/ui'],
  turbopack: {
    root: join(import.meta.dirname, '../..')
  }
}
export default config
