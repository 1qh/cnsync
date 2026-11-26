import type { ReactNode } from 'react'
export interface Example {
  kind: 'component' | 'pattern'
  name: string
  Demo: () => ReactNode
}
export declare const examples: readonly Example[]
