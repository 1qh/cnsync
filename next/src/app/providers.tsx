'use client'
import type { ReactNode } from 'react'
import { DirectionProvider } from '@a/ui/components/direction'
import { TooltipProvider } from '@a/ui/components/tooltip'
import { ReactFlowProvider } from '@xyflow/react'
const Providers = ({ children }: { children: ReactNode }) => (
  <ReactFlowProvider>
    <TooltipProvider>
      <DirectionProvider>{children}</DirectionProvider>
    </TooltipProvider>
  </ReactFlowProvider>
)
export default Providers
