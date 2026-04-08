/* oxlint-disable-next-line eslint-plugin-import/no-unassigned-import -- CSS side-effect import */
import '@a/ui/globals.css'
import { cn } from '@a/ui'
import type { ReactNode } from 'react'
import { mono, sans } from './fonts'
const Layout = ({ children }: { children: ReactNode }) => (
  <html className={cn('font-sans', sans.variable, mono.variable)} lang='en'>
    <body>{children}</body>
  </html>
)
export default Layout
