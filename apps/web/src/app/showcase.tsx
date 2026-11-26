'use client'
import type { HTMLAttributes } from 'react'
import { examples } from '@a/examples'
import { Button } from '@a/ui/components/button'
import { Card, CardContent, CardHeader } from '@a/ui/components/card'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger
} from '@a/ui/components/sidebar'
import { BoxesIcon, WorkflowIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Providers from './providers'
const ComponentsLink = (props: HTMLAttributes<HTMLElement>) => <Link {...props} href='#components' />
const PatternsLink = (props: HTMLAttributes<HTMLElement>) => <Link {...props} href='#patterns' />
const sections = [
  { Icon: BoxesIcon, kind: 'component', title: 'Components' },
  { Icon: WorkflowIcon, kind: 'pattern', title: 'Patterns' }
] as const
const sectionLinks = {
  component: ComponentsLink,
  pattern: PatternsLink
}
const renderSectionMenuItem = ({ Icon, kind, title }: (typeof sections)[number]) => (
  <SidebarMenuItem key={kind}>
    <SidebarMenuButton aria-label={title} render={sectionLinks[kind]} title={title}>
      <Icon />
      <span>{title}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
)
const renderSection = ({ kind, title }: (typeof sections)[number]) => (
  <section aria-labelledby={`${kind}s`} className='grid min-w-0 gap-4' key={kind}>
    <h2 className='text-lg font-semibold' id={`${kind}s`}>
      {title}
    </h2>
    {examples
      .filter(demo => demo.kind === kind)
      .map(({ Demo, name }) => {
        const id = `${kind}-${name}`
        return (
          <Card data-demo={id} id={id} key={id}>
            <CardHeader>
              <h3 className='font-medium'>{name}</h3>
            </CardHeader>
            <CardContent>
              <Demo />
            </CardContent>
          </Card>
        )
      })}
  </section>
)
const Showcase = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggleTheme = () => {
    setIsDark(document.documentElement.classList.toggle('dark'))
  }
  return (
    <Providers>
      <Sidebar collapsible='icon'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Showcase</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{sections.map(renderSectionMenuItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-8 p-8'>
          <header className='flex items-center gap-3'>
            <SidebarTrigger />
            <h1 className='grow text-xl font-semibold'>Showcase</h1>
            <Button aria-pressed={isDark} onClick={toggleTheme} variant='outline'>
              Dark mode
            </Button>
          </header>
          {sections.map(renderSection)}
        </div>
      </SidebarInset>
    </Providers>
  )
}
export default Showcase
