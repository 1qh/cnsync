/* oxlint-disable-next-line eslint-plugin-import/no-unassigned-import -- CSS side-effect import */
import '@a/ui/globals.css'
import type { ReactNode } from 'react'
const Layout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <body>{children}</body>
  </html>
)
export default Layout
