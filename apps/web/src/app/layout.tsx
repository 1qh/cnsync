/** biome-ignore-all lint/nursery/noUndeclaredClasses: these are Tailwind v4 utilities that @tailwindcss/postcss generates, which this rule cannot read */
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
const metadata: Metadata = {
  title: 'cnsync'
}
const Layout = ({ children }: { children: ReactNode }) => (
  <html className='font-sans tracking-[-0.02em]' lang='en' suppressHydrationWarning>
    <body className='min-h-screen antialiased'>{children}</body>
  </html>
)
export { metadata }
export default Layout
