import { Button } from "@a/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@a/ui/components/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
