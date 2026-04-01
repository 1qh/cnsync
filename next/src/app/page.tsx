/** biome-ignore-all lint/correctness/noUnusedImports: build verification */
/* oxlint-disable eslint/no-unused-vars */
'use client'
import { Accordion } from '@a/ui/components/accordion'
import { Alert } from '@a/ui/components/alert'
import { AspectRatio } from '@a/ui/components/aspect-ratio'
import { Badge } from '@a/ui/components/badge'
import { Button } from '@a/ui/components/button'
import { Calendar } from '@a/ui/components/calendar'
import { Checkbox } from '@a/ui/components/checkbox'
import { Collapsible } from '@a/ui/components/collapsible'
import { HoverCard } from '@a/ui/components/hover-card'
import { Input } from '@a/ui/components/input'
import { InputOTP } from '@a/ui/components/input-otp'
import { Kbd } from '@a/ui/components/kbd'
import { Label } from '@a/ui/components/label'
import { NativeSelect } from '@a/ui/components/native-select'
import { RadioGroup } from '@a/ui/components/radio-group'
import { ResizableHandle } from '@a/ui/components/resizable'
import { ScrollArea } from '@a/ui/components/scroll-area'
import { Separator } from '@a/ui/components/separator'
import { Skeleton } from '@a/ui/components/skeleton'
import { Slider } from '@a/ui/components/slider'
import { Spinner } from '@a/ui/components/spinner'
import { Switch } from '@a/ui/components/switch'
import { Tabs } from '@a/ui/components/tabs'
import { Textarea } from '@a/ui/components/textarea'
import { Toggle } from '@a/ui/components/toggle'
import { ToggleGroup } from '@a/ui/components/toggle-group'
import { Tooltip } from '@a/ui/components/tooltip'
const Page = () => (
  <div data-testid='component-verify'>
    <Accordion />
    <Alert />
    <AspectRatio ratio={16 / 9}>
      <div />
    </AspectRatio>
    <Badge />
    <Button />
    <Calendar />
    <Checkbox />
    <Collapsible />
    <HoverCard />
    <Input />
    <InputOTP maxLength={6}>
      <div />
    </InputOTP>
    <Kbd />
    <Label />
    <NativeSelect />
    <RadioGroup />
    <ResizableHandle />
    <ScrollArea />
    <Separator />
    <Skeleton />
    <Slider />
    <Spinner />
    <Switch />
    <Tabs />
    <Textarea />
    <Toggle />
    <ToggleGroup />
    <Tooltip />
  </div>
)
export default Page
export const dynamic = 'force-dynamic'
