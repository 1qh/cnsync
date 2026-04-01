import type { NextConfig } from 'next'
import { join } from 'node:path'
const config: NextConfig = {
  transpilePackages: ['@a/ui'],
  turbopack: {
    root: join(import.meta.dirname, '..')
  }
}
export default config
