import type { NextConfig } from 'next'
import { join } from 'node:path'
const config: NextConfig = {
  turbopack: {
    root: join(import.meta.dirname, '..')
  },
  transpilePackages: ['@a/ui']
}
export default config
