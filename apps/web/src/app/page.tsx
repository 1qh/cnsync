'use client'
import dynamic from 'next/dynamic'

const Showcase = dynamic(async () => import('./showcase'), { ssr: false })
const Page = () => <Showcase />
export default Page
