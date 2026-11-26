import { Checkbox } from "@a/ui/components/checkbox"
import { Label } from "@a/ui/components/label"

export function LabelDemo() {
  return (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
