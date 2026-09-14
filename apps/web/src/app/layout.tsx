import '@a/ui/globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { cn } from '@a/ui'
import { mono, sans } from './fonts'
const metadata: Metadata = {
  title: 'cnsync'
}
const Layout = ({ children }: { children: ReactNode }) => (
  <html className={cn('font-sans tracking-[-0.02em]', sans.variable, mono.variable)} lang='en' suppressHydrationWarning>
    <body className='min-h-screen antialiased'>{children}</body>
  </html>
)
export { metadata }
export default Layout
