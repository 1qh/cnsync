/** biome-ignore-all lint/correctness/noUnusedImports: build verification */
/* oxlint-disable eslint/no-unused-vars, react-perf/jsx-no-new-object-as-prop, react-perf/jsx-no-new-array-as-prop, eslint/complexity */
'use client'
import { Accordion } from '@a/ui/components/accordion'
import { Agent } from '@a/ui/components/ai-elements/agent'
import { Artifact } from '@a/ui/components/ai-elements/artifact'
import { Attachments } from '@a/ui/components/ai-elements/attachments'
import { AudioPlayer } from '@a/ui/components/ai-elements/audio-player'
import { Canvas } from '@a/ui/components/ai-elements/canvas'
import { ChainOfThought } from '@a/ui/components/ai-elements/chain-of-thought'
import { Checkpoint } from '@a/ui/components/ai-elements/checkpoint'
import { CodeBlockContainer } from '@a/ui/components/ai-elements/code-block'
import { Commit } from '@a/ui/components/ai-elements/commit'
import { Confirmation } from '@a/ui/components/ai-elements/confirmation'
import { Connection } from '@a/ui/components/ai-elements/connection'
import { Context } from '@a/ui/components/ai-elements/context'
import { Controls } from '@a/ui/components/ai-elements/controls'
import { Conversation } from '@a/ui/components/ai-elements/conversation'
import { Edge } from '@a/ui/components/ai-elements/edge'
import { EnvironmentVariables } from '@a/ui/components/ai-elements/environment-variables'
import { FileTree } from '@a/ui/components/ai-elements/file-tree'
import { Image as AiImage } from '@a/ui/components/ai-elements/image'
import { InlineCitation } from '@a/ui/components/ai-elements/inline-citation'
import { JSXPreview } from '@a/ui/components/ai-elements/jsx-preview'
import { Message } from '@a/ui/components/ai-elements/message'
import { MicSelector } from '@a/ui/components/ai-elements/mic-selector'
import { ModelSelector } from '@a/ui/components/ai-elements/model-selector'
import { Node } from '@a/ui/components/ai-elements/node'
import { OpenIn } from '@a/ui/components/ai-elements/open-in-chat'
import { PackageInfoHeader } from '@a/ui/components/ai-elements/package-info'
import { Panel } from '@a/ui/components/ai-elements/panel'
import { Persona } from '@a/ui/components/ai-elements/persona'
import { Plan } from '@a/ui/components/ai-elements/plan'
import { PromptInput } from '@a/ui/components/ai-elements/prompt-input'
import { QueueItem } from '@a/ui/components/ai-elements/queue'
import { Reasoning } from '@a/ui/components/ai-elements/reasoning'
import { Sandbox } from '@a/ui/components/ai-elements/sandbox'
import { SchemaDisplayHeader } from '@a/ui/components/ai-elements/schema-display'
import { Shimmer } from '@a/ui/components/ai-elements/shimmer'
import { Snippet } from '@a/ui/components/ai-elements/snippet'
import { Sources } from '@a/ui/components/ai-elements/sources'
import { SpeechInput } from '@a/ui/components/ai-elements/speech-input'
import { StackTrace } from '@a/ui/components/ai-elements/stack-trace'
import { Suggestion } from '@a/ui/components/ai-elements/suggestion'
import { Task } from '@a/ui/components/ai-elements/task'
import { TerminalHeader } from '@a/ui/components/ai-elements/terminal'
import { TestResultsHeader } from '@a/ui/components/ai-elements/test-results'
import { Tool } from '@a/ui/components/ai-elements/tool'
import { Toolbar } from '@a/ui/components/ai-elements/toolbar'
import { Transcription } from '@a/ui/components/ai-elements/transcription'
import { VoiceSelector } from '@a/ui/components/ai-elements/voice-selector'
import { WebPreview } from '@a/ui/components/ai-elements/web-preview'
import { Alert } from '@a/ui/components/alert'
import { AlertDialog } from '@a/ui/components/alert-dialog'
import { AspectRatio } from '@a/ui/components/aspect-ratio'
import { Avatar } from '@a/ui/components/avatar'
import { Badge } from '@a/ui/components/badge'
import { Breadcrumb } from '@a/ui/components/breadcrumb'
import { Button } from '@a/ui/components/button'
import { ButtonGroup } from '@a/ui/components/button-group'
import { Calendar } from '@a/ui/components/calendar'
import { Card } from '@a/ui/components/card'
import { Carousel } from '@a/ui/components/carousel'
import { ChartContainer } from '@a/ui/components/chart'
import { Checkbox } from '@a/ui/components/checkbox'
import { Collapsible } from '@a/ui/components/collapsible'
import { Combobox } from '@a/ui/components/combobox'
import { Command } from '@a/ui/components/command'
import { ContextMenu } from '@a/ui/components/context-menu'
import { Dialog } from '@a/ui/components/dialog'
import { DirectionProvider } from '@a/ui/components/direction'
import { Drawer } from '@a/ui/components/drawer'
import { DropdownMenu } from '@a/ui/components/dropdown-menu'
import { Empty } from '@a/ui/components/empty'
import { Field } from '@a/ui/components/field'
import { HoverCard } from '@a/ui/components/hover-card'
import { Input } from '@a/ui/components/input'
import { InputGroup } from '@a/ui/components/input-group'
import { InputOTP } from '@a/ui/components/input-otp'
import { Item } from '@a/ui/components/item'
import { Kbd } from '@a/ui/components/kbd'
import { Label } from '@a/ui/components/label'
import { Menubar } from '@a/ui/components/menubar'
import { NativeSelect } from '@a/ui/components/native-select'
import { NavigationMenu } from '@a/ui/components/navigation-menu'
import { Pagination } from '@a/ui/components/pagination'
import { Popover } from '@a/ui/components/popover'
import { Progress } from '@a/ui/components/progress'
import { RadioGroup } from '@a/ui/components/radio-group'
import { ResizableHandle } from '@a/ui/components/resizable'
import { ScrollArea } from '@a/ui/components/scroll-area'
import { Select } from '@a/ui/components/select'
import { Separator } from '@a/ui/components/separator'
import { Sheet } from '@a/ui/components/sheet'
import { Sidebar } from '@a/ui/components/sidebar'
import { Skeleton } from '@a/ui/components/skeleton'
import { Slider } from '@a/ui/components/slider'
import { Toaster } from '@a/ui/components/sonner'
import { Spinner } from '@a/ui/components/spinner'
import { Switch } from '@a/ui/components/switch'
import { Table } from '@a/ui/components/table'
import { Tabs } from '@a/ui/components/tabs'
import { Textarea } from '@a/ui/components/textarea'
import { Toggle } from '@a/ui/components/toggle'
import { ToggleGroup } from '@a/ui/components/toggle-group'
import { Tooltip } from '@a/ui/components/tooltip'
// eslint-disable-next-line complexity
const Page = () => (
  <div data-testid='component-verify'>
    <Accordion />
    <Alert />
    <AlertDialog />
    <AspectRatio ratio={16 / 9}>
      <div />
    </AspectRatio>
    <Avatar />
    <Badge />
    <Breadcrumb />
    <Button />
    <ButtonGroup />
    <Calendar />
    <Card />
    <Carousel />
    {typeof ChartContainer === 'function' ? null : null}
    <Checkbox />
    <Collapsible />
    <Combobox />
    <Command />
    <ContextMenu />
    <Dialog />
    <DirectionProvider />
    <Drawer />
    <DropdownMenu />
    <Empty />
    <Field />
    <HoverCard />
    <Input />
    <InputGroup />
    <InputOTP maxLength={6}>
      <div />
    </InputOTP>
    <Item />
    <Kbd />
    <Label />
    <Menubar />
    <NativeSelect />
    <NavigationMenu />
    <Pagination />
    <Popover />
    <Progress value={50} />
    <RadioGroup />
    {typeof ResizableHandle === 'function' ? null : null}
    <ScrollArea />
    <Select />
    <Separator />
    <Sheet />
    {typeof Sidebar === 'function' ? null : null}
    <Skeleton />
    <Slider />
    <Toaster />
    <Spinner />
    <Switch />
    <Table />
    <Tabs />
    <Textarea />
    <Toggle />
    <ToggleGroup />
    <Tooltip />
    {typeof Agent === 'function' ? null : null}
    <Artifact />
    {typeof Attachments === 'function' ? null : null}
    {typeof AudioPlayer === 'function' ? null : null}
    {typeof Canvas === 'function' ? null : null}
    {typeof ChainOfThought === 'function' ? null : null}
    {typeof Checkpoint === 'function' ? null : null}
    {typeof CodeBlockContainer === 'function' ? null : null}
    {typeof Commit === 'function' ? null : null}
    {typeof Confirmation === 'function' ? null : null}
    {typeof Connection === 'function' ? null : null}
    {typeof Context === 'function' ? null : null}
    {typeof Controls === 'function' ? null : null}
    {typeof Conversation === 'function' ? null : null}
    {typeof Edge === 'object' ? null : null}
    {typeof EnvironmentVariables === 'function' ? null : null}
    {typeof FileTree === 'function' ? null : null}
    {typeof AiImage === 'function' ? null : null}
    {typeof InlineCitation === 'function' ? null : null}
    {typeof JSXPreview === 'function' ? null : null}
    <Message from='user'>
      <div />
    </Message>
    {typeof MicSelector === 'function' ? null : null}
    <ModelSelector />
    {typeof Node === 'function' ? null : null}
    {typeof OpenIn === 'function' ? null : null}
    {typeof PackageInfoHeader === 'function' ? null : null}
    <Panel />
    {typeof Persona === 'function' ? null : null}
    {typeof Plan === 'function' ? null : null}
    {typeof PromptInput === 'function' ? null : null}
    {typeof QueueItem === 'function' ? null : null}
    {typeof Reasoning === 'function' ? null : null}
    {typeof Sandbox === 'function' ? null : null}
    {typeof SchemaDisplayHeader === 'function' ? null : null}
    {typeof Shimmer === 'function' ? null : null}
    {typeof Snippet === 'function' ? null : null}
    {typeof Sources === 'function' ? null : null}
    {typeof SpeechInput === 'function' ? null : null}
    {typeof StackTrace === 'function' ? null : null}
    {typeof Suggestion === 'function' ? null : null}
    {typeof Task === 'function' ? null : null}
    {typeof TerminalHeader === 'function' ? null : null}
    {typeof TestResultsHeader === 'function' ? null : null}
    <Toolbar />
    {typeof Tool === 'function' ? null : null}
    {typeof Transcription === 'function' ? null : null}
    {typeof WebPreview === 'function' ? null : null}
    {typeof VoiceSelector === 'function' ? null : null}
  </div>
)
export default Page
export const dynamic = 'force-dynamic'
