/** biome-ignore-all lint/correctness/noUnusedImports: build verification */
/* oxlint-disable jsx-no-new-object-as-prop, jsx-no-new-array-as-prop, jsx-no-jsx-as-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import type {
  AgentContentProps,
  AgentHeaderProps,
  AgentInstructionsProps,
  AgentOutputProps,
  AgentProps,
  AgentToolProps,
  AgentToolsProps
} from '@a/ui/components/ai-elements/agent'
import type {
  ArtifactActionProps,
  ArtifactActionsProps,
  ArtifactCloseProps,
  ArtifactContentProps,
  ArtifactDescriptionProps,
  ArtifactHeaderProps,
  ArtifactProps,
  ArtifactTitleProps
} from '@a/ui/components/ai-elements/artifact'
import type {
  AttachmentData,
  AttachmentEmptyProps,
  AttachmentHoverCardContentProps,
  AttachmentHoverCardProps,
  AttachmentHoverCardTriggerProps,
  AttachmentInfoProps,
  AttachmentMediaCategory,
  AttachmentPreviewProps,
  AttachmentProps,
  AttachmentRemoveProps,
  AttachmentsProps,
  AttachmentVariant
} from '@a/ui/components/ai-elements/attachments'
import type {
  AudioPlayerControlBarProps,
  AudioPlayerDurationDisplayProps,
  AudioPlayerElementProps,
  AudioPlayerMuteButtonProps,
  AudioPlayerPlayButtonProps,
  AudioPlayerProps,
  AudioPlayerSeekBackwardButtonProps,
  AudioPlayerSeekForwardButtonProps,
  AudioPlayerTimeDisplayProps,
  AudioPlayerTimeRangeProps,
  AudioPlayerVolumeRangeProps
} from '@a/ui/components/ai-elements/audio-player'
import type {
  ChainOfThoughtContentProps,
  ChainOfThoughtHeaderProps,
  ChainOfThoughtImageProps,
  ChainOfThoughtProps,
  ChainOfThoughtSearchResultProps,
  ChainOfThoughtSearchResultsProps,
  ChainOfThoughtStepProps
} from '@a/ui/components/ai-elements/chain-of-thought'
import type { CheckpointIconProps, CheckpointProps, CheckpointTriggerProps } from '@a/ui/components/ai-elements/checkpoint'
import type {
  CodeBlockCopyButtonProps,
  CodeBlockLanguageSelectorContentProps,
  CodeBlockLanguageSelectorItemProps,
  CodeBlockLanguageSelectorProps,
  CodeBlockLanguageSelectorTriggerProps,
  CodeBlockLanguageSelectorValueProps
} from '@a/ui/components/ai-elements/code-block'
import type {
  CommitActionsProps,
  CommitAuthorAvatarProps,
  CommitAuthorProps,
  CommitContentProps,
  CommitCopyButtonProps,
  CommitFileAdditionsProps,
  CommitFileChangesProps,
  CommitFileDeletionsProps,
  CommitFileIconProps,
  CommitFileInfoProps,
  CommitFilePathProps,
  CommitFileProps,
  CommitFilesProps,
  CommitFileStatusProps,
  CommitHashProps,
  CommitHeaderProps,
  CommitInfoProps,
  CommitMessageProps,
  CommitMetadataProps,
  CommitProps,
  CommitSeparatorProps,
  CommitTimestampProps
} from '@a/ui/components/ai-elements/commit'
import type {
  ConfirmationAcceptedProps,
  ConfirmationActionProps,
  ConfirmationActionsProps,
  ConfirmationProps,
  ConfirmationRejectedProps,
  ConfirmationRequestProps,
  ConfirmationTitleProps
} from '@a/ui/components/ai-elements/confirmation'
import type {
  ContextCacheUsageProps,
  ContextContentBodyProps,
  ContextContentFooterProps,
  ContextContentHeaderProps,
  ContextContentProps,
  ContextInputUsageProps,
  ContextOutputUsageProps,
  ContextProps,
  ContextReasoningUsageProps,
  ContextTriggerProps
} from '@a/ui/components/ai-elements/context'
import type { ControlsProps } from '@a/ui/components/ai-elements/controls'
import type {
  ConversationContentProps,
  ConversationDownloadProps,
  ConversationEmptyStateProps,
  ConversationProps,
  ConversationScrollButtonProps
} from '@a/ui/components/ai-elements/conversation'
import type {
  EnvironmentVariableCopyButtonProps,
  EnvironmentVariableGroupProps,
  EnvironmentVariableNameProps,
  EnvironmentVariableProps,
  EnvironmentVariableRequiredProps,
  EnvironmentVariablesContentProps,
  EnvironmentVariablesHeaderProps,
  EnvironmentVariablesProps,
  EnvironmentVariablesTitleProps,
  EnvironmentVariablesToggleProps,
  EnvironmentVariableValueProps
} from '@a/ui/components/ai-elements/environment-variables'
import type {
  FileTreeActionsProps,
  FileTreeFileProps,
  FileTreeFolderProps,
  FileTreeIconProps,
  FileTreeNameProps,
  FileTreeProps
} from '@a/ui/components/ai-elements/file-tree'
import type { ImageProps } from '@a/ui/components/ai-elements/image'
import type {
  InlineCitationCardBodyProps,
  InlineCitationCardProps,
  InlineCitationCardTriggerProps,
  InlineCitationCarouselContentProps,
  InlineCitationCarouselHeaderProps,
  InlineCitationCarouselIndexProps,
  InlineCitationCarouselItemProps,
  InlineCitationCarouselNextProps,
  InlineCitationCarouselPrevProps,
  InlineCitationCarouselProps,
  InlineCitationProps,
  InlineCitationQuoteProps,
  InlineCitationSourceProps,
  InlineCitationTextProps
} from '@a/ui/components/ai-elements/inline-citation'
import type {
  JSXPreviewContentProps,
  JSXPreviewErrorProps,
  JSXPreviewProps
} from '@a/ui/components/ai-elements/jsx-preview'
import type {
  MessageActionProps,
  MessageActionsProps,
  MessageBranchContentProps,
  MessageBranchNextProps,
  MessageBranchPageProps,
  MessageBranchPreviousProps,
  MessageBranchProps,
  MessageBranchSelectorProps,
  MessageContentProps,
  MessageProps,
  MessageResponseProps,
  MessageToolbarProps
} from '@a/ui/components/ai-elements/message'
import type {
  MicSelectorContentProps,
  MicSelectorEmptyProps,
  MicSelectorInputProps,
  MicSelectorItemProps,
  MicSelectorLabelProps,
  MicSelectorListProps,
  MicSelectorProps,
  MicSelectorTriggerProps,
  MicSelectorValueProps
} from '@a/ui/components/ai-elements/mic-selector'
import type {
  ModelSelectorContentProps,
  ModelSelectorDialogProps,
  ModelSelectorEmptyProps,
  ModelSelectorGroupProps,
  ModelSelectorInputProps,
  ModelSelectorItemProps,
  ModelSelectorListProps,
  ModelSelectorLogoGroupProps,
  ModelSelectorLogoProps,
  ModelSelectorNameProps,
  ModelSelectorProps,
  ModelSelectorSeparatorProps,
  ModelSelectorShortcutProps,
  ModelSelectorTriggerProps
} from '@a/ui/components/ai-elements/model-selector'
import type {
  NodeActionProps,
  NodeContentProps,
  NodeDescriptionProps,
  NodeFooterProps,
  NodeHeaderProps,
  NodeProps,
  NodeTitleProps
} from '@a/ui/components/ai-elements/node'
import type {
  OpenInChatGPTProps,
  OpenInClaudeProps,
  OpenInContentProps,
  OpenInCursorProps,
  OpenInItemProps,
  OpenInLabelProps,
  OpenInProps,
  OpenInSciraProps,
  OpenInSeparatorProps,
  OpenInT3Props,
  OpenInTriggerProps,
  OpenInv0Props
} from '@a/ui/components/ai-elements/open-in-chat'
import type {
  PackageInfoChangeTypeProps,
  PackageInfoContentProps,
  PackageInfoDependenciesProps,
  PackageInfoDependencyProps,
  PackageInfoDescriptionProps,
  PackageInfoHeaderProps,
  PackageInfoNameProps,
  PackageInfoProps,
  PackageInfoVersionProps
} from '@a/ui/components/ai-elements/package-info'
import type { PersonaState } from '@a/ui/components/ai-elements/persona'
import type {
  PlanActionProps,
  PlanContentProps,
  PlanDescriptionProps,
  PlanFooterProps,
  PlanHeaderProps,
  PlanProps,
  PlanTitleProps,
  PlanTriggerProps
} from '@a/ui/components/ai-elements/plan'
import type {
  AttachmentsContext,
  PromptInputActionAddAttachmentsProps,
  PromptInputActionAddScreenshotProps,
  PromptInputActionMenuContentProps,
  PromptInputActionMenuItemProps,
  PromptInputActionMenuProps,
  PromptInputActionMenuTriggerProps,
  PromptInputBodyProps,
  PromptInputButtonProps,
  PromptInputButtonTooltip,
  PromptInputCommandEmptyProps,
  PromptInputCommandGroupProps,
  PromptInputCommandInputProps,
  PromptInputCommandItemProps,
  PromptInputCommandListProps,
  PromptInputCommandProps,
  PromptInputCommandSeparatorProps,
  PromptInputControllerProps,
  PromptInputFooterProps,
  PromptInputHeaderProps,
  PromptInputHoverCardContentProps,
  PromptInputHoverCardProps,
  PromptInputHoverCardTriggerProps,
  PromptInputMessage,
  PromptInputProps,
  PromptInputProviderProps,
  PromptInputSelectContentProps,
  PromptInputSelectItemProps,
  PromptInputSelectProps,
  PromptInputSelectTriggerProps,
  PromptInputSelectValueProps,
  PromptInputSubmitProps,
  PromptInputTabBodyProps,
  PromptInputTabItemProps,
  PromptInputTabLabelProps,
  PromptInputTabProps,
  PromptInputTabsListProps,
  PromptInputTextareaProps,
  PromptInputToolsProps,
  ReferencedSourcesContext,
  TextInputContext
} from '@a/ui/components/ai-elements/prompt-input'
import type {
  QueueItemActionProps,
  QueueItemActionsProps,
  QueueItemAttachmentProps,
  QueueItemContentProps,
  QueueItemDescriptionProps,
  QueueItemFileProps,
  QueueItemImageProps,
  QueueItemIndicatorProps,
  QueueItemProps,
  QueueListProps,
  QueueMessage,
  QueueMessagePart,
  QueueProps,
  QueueSectionContentProps,
  QueueSectionLabelProps,
  QueueSectionProps,
  QueueSectionTriggerProps,
  QueueTodo
} from '@a/ui/components/ai-elements/queue'
import type { ReasoningContentProps, ReasoningProps, ReasoningTriggerProps } from '@a/ui/components/ai-elements/reasoning'
import type {
  SandboxContentProps,
  SandboxHeaderProps,
  SandboxRootProps,
  SandboxTabContentProps,
  SandboxTabsBarProps,
  SandboxTabsListProps,
  SandboxTabsProps,
  SandboxTabsTriggerProps
} from '@a/ui/components/ai-elements/sandbox'
import type {
  SchemaDisplayBodyProps,
  SchemaDisplayContentProps,
  SchemaDisplayDescriptionProps,
  SchemaDisplayExampleProps,
  SchemaDisplayHeaderProps,
  SchemaDisplayMethodProps,
  SchemaDisplayParameterProps,
  SchemaDisplayParametersProps,
  SchemaDisplayPathProps,
  SchemaDisplayPropertyProps,
  SchemaDisplayProps,
  SchemaDisplayRequestProps,
  SchemaDisplayResponseProps
} from '@a/ui/components/ai-elements/schema-display'
import type { TextShimmerProps } from '@a/ui/components/ai-elements/shimmer'
import type {
  SnippetAddonProps,
  SnippetCopyButtonProps,
  SnippetInputProps,
  SnippetProps,
  SnippetTextProps
} from '@a/ui/components/ai-elements/snippet'
import type {
  SourceProps,
  SourcesContentProps,
  SourcesProps,
  SourcesTriggerProps
} from '@a/ui/components/ai-elements/sources'
import type { SpeechInputProps } from '@a/ui/components/ai-elements/speech-input'
import type {
  StackTraceActionsProps,
  StackTraceContentProps,
  StackTraceCopyButtonProps,
  StackTraceErrorMessageProps,
  StackTraceErrorProps,
  StackTraceErrorTypeProps,
  StackTraceExpandButtonProps,
  StackTraceFramesProps,
  StackTraceHeaderProps,
  StackTraceProps
} from '@a/ui/components/ai-elements/stack-trace'
import type { SuggestionProps, SuggestionsProps } from '@a/ui/components/ai-elements/suggestion'
import type {
  TaskContentProps,
  TaskItemFileProps,
  TaskItemProps,
  TaskProps,
  TaskTriggerProps
} from '@a/ui/components/ai-elements/task'
import type {
  TerminalActionsProps,
  TerminalClearButtonProps,
  TerminalContentProps,
  TerminalCopyButtonProps,
  TerminalHeaderProps,
  TerminalProps,
  TerminalStatusProps,
  TerminalTitleProps
} from '@a/ui/components/ai-elements/terminal'
import type {
  TestDurationProps,
  TestErrorMessageProps,
  TestErrorProps,
  TestErrorStackProps,
  TestNameProps,
  TestProps,
  TestResultsContentProps,
  TestResultsDurationProps,
  TestResultsHeaderProps,
  TestResultsProgressProps,
  TestResultsProps,
  TestResultsSummaryProps,
  TestStatusProps,
  TestSuiteContentProps,
  TestSuiteNameProps,
  TestSuiteProps,
  TestSuiteStatsProps
} from '@a/ui/components/ai-elements/test-results'
import type {
  ToolContentProps,
  ToolHeaderProps,
  ToolInputProps,
  ToolOutputProps,
  ToolPart,
  ToolProps
} from '@a/ui/components/ai-elements/tool'
import type { TranscriptionProps, TranscriptionSegmentProps } from '@a/ui/components/ai-elements/transcription'
import type {
  VoiceSelectorAccentProps,
  VoiceSelectorAgeProps,
  VoiceSelectorAttributesProps,
  VoiceSelectorBulletProps,
  VoiceSelectorContentProps,
  VoiceSelectorDescriptionProps,
  VoiceSelectorDialogProps,
  VoiceSelectorEmptyProps,
  VoiceSelectorGenderProps,
  VoiceSelectorGroupProps,
  VoiceSelectorInputProps,
  VoiceSelectorItemProps,
  VoiceSelectorListProps,
  VoiceSelectorNameProps,
  VoiceSelectorPreviewProps,
  VoiceSelectorProps,
  VoiceSelectorSeparatorProps,
  VoiceSelectorShortcutProps,
  VoiceSelectorTriggerProps
} from '@a/ui/components/ai-elements/voice-selector'
import type {
  WebPreviewBodyProps,
  WebPreviewConsoleProps,
  WebPreviewContextValue,
  WebPreviewNavigationButtonProps,
  WebPreviewNavigationProps,
  WebPreviewProps,
  WebPreviewUrlProps
} from '@a/ui/components/ai-elements/web-preview'
import type { CarouselApi } from '@a/ui/components/carousel'
import type { ChartConfig } from '@a/ui/components/chart'
import type { ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@a/ui/components/accordion'
import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  AgentTools
} from '@a/ui/components/ai-elements/agent'
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle
} from '@a/ui/components/ai-elements/artifact'
import {
  Attachment,
  AttachmentEmpty,
  AttachmentHoverCard,
  AttachmentHoverCardContent,
  AttachmentHoverCardTrigger,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
  getAttachmentLabel,
  getMediaCategory,
  useAttachmentContext,
  useAttachmentsContext
} from '@a/ui/components/ai-elements/attachments'
import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerMuteButton,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerVolumeRange
} from '@a/ui/components/ai-elements/audio-player'
import { Canvas } from '@a/ui/components/ai-elements/canvas'
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep
} from '@a/ui/components/ai-elements/chain-of-thought'
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from '@a/ui/components/ai-elements/checkpoint'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContainer,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
  highlightCode
} from '@a/ui/components/ai-elements/code-block'
import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileIcon,
  CommitFileInfo,
  CommitFilePath,
  CommitFiles,
  CommitFileStatus,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp
} from '@a/ui/components/ai-elements/commit'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle
} from '@a/ui/components/ai-elements/confirmation'
import { Connection } from '@a/ui/components/ai-elements/connection'
import {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger
} from '@a/ui/components/ai-elements/context'
import { Controls } from '@a/ui/components/ai-elements/controls'
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
  messagesToMarkdown
} from '@a/ui/components/ai-elements/conversation'
import { Edge } from '@a/ui/components/ai-elements/edge'
import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue
} from '@a/ui/components/ai-elements/environment-variables'
import {
  FileTree,
  FileTreeActions,
  FileTreeFile,
  FileTreeFolder,
  FileTreeIcon,
  FileTreeName
} from '@a/ui/components/ai-elements/file-tree'
import { Image as AiImage } from '@a/ui/components/ai-elements/image'
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText
} from '@a/ui/components/ai-elements/inline-citation'
import { JSXPreview, JSXPreviewContent, JSXPreviewError, useJSXPreview } from '@a/ui/components/ai-elements/jsx-preview'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar
} from '@a/ui/components/ai-elements/message'
import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
  useAudioDevices
} from '@a/ui/components/ai-elements/mic-selector'
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorDialog,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorSeparator,
  ModelSelectorShortcut,
  ModelSelectorTrigger
} from '@a/ui/components/ai-elements/model-selector'
import {
  Node,
  NodeAction,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle
} from '@a/ui/components/ai-elements/node'
import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInItem,
  OpenInLabel,
  OpenInScira,
  OpenInSeparator,
  OpenInT3,
  OpenInTrigger,
  OpenInv0
} from '@a/ui/components/ai-elements/open-in-chat'
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion
} from '@a/ui/components/ai-elements/package-info'
import { Panel } from '@a/ui/components/ai-elements/panel'
import { Persona } from '@a/ui/components/ai-elements/persona'
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger
} from '@a/ui/components/ai-elements/plan'
import {
  LocalReferencedSourcesContext,
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputCommand,
  PromptInputCommandEmpty,
  PromptInputCommandGroup,
  PromptInputCommandInput,
  PromptInputCommandItem,
  PromptInputCommandList,
  PromptInputCommandSeparator,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputHoverCard,
  PromptInputHoverCardContent,
  PromptInputHoverCardTrigger,
  PromptInputProvider,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTab,
  PromptInputTabBody,
  PromptInputTabItem,
  PromptInputTabLabel,
  PromptInputTabsList,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
  usePromptInputController,
  usePromptInputReferencedSources,
  useProviderAttachments
} from '@a/ui/components/ai-elements/prompt-input'
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger
} from '@a/ui/components/ai-elements/queue'
import { Reasoning, ReasoningContent, ReasoningTrigger, useReasoning } from '@a/ui/components/ai-elements/reasoning'
import {
  Sandbox,
  SandboxContent,
  SandboxHeader,
  SandboxTabContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger
} from '@a/ui/components/ai-elements/sandbox'
import {
  SchemaDisplay,
  SchemaDisplayBody,
  SchemaDisplayContent,
  SchemaDisplayDescription,
  SchemaDisplayExample,
  SchemaDisplayHeader,
  SchemaDisplayMethod,
  SchemaDisplayParameter,
  SchemaDisplayParameters,
  SchemaDisplayPath,
  SchemaDisplayProperty,
  SchemaDisplayRequest,
  SchemaDisplayResponse
} from '@a/ui/components/ai-elements/schema-display'
import { Shimmer } from '@a/ui/components/ai-elements/shimmer'
import { Snippet, SnippetAddon, SnippetCopyButton, SnippetInput, SnippetText } from '@a/ui/components/ai-elements/snippet'
import { Source, Sources, SourcesContent, SourcesTrigger } from '@a/ui/components/ai-elements/sources'
import { SpeechInput } from '@a/ui/components/ai-elements/speech-input'
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader
} from '@a/ui/components/ai-elements/stack-trace'
import { Suggestion, Suggestions } from '@a/ui/components/ai-elements/suggestion'
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '@a/ui/components/ai-elements/task'
import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle
} from '@a/ui/components/ai-elements/terminal'
import {
  Test,
  TestDuration,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestName,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestStatus,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats
} from '@a/ui/components/ai-elements/test-results'
import { getStatusBadge, Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@a/ui/components/ai-elements/tool'
import { Toolbar } from '@a/ui/components/ai-elements/toolbar'
import { Transcription, TranscriptionSegment } from '@a/ui/components/ai-elements/transcription'
import {
  useVoiceSelector,
  VoiceSelector,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorContent,
  VoiceSelectorDescription,
  VoiceSelectorDialog,
  VoiceSelectorEmpty,
  VoiceSelectorGender,
  VoiceSelectorGroup,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorPreview,
  VoiceSelectorSeparator,
  VoiceSelectorShortcut,
  VoiceSelectorTrigger
} from '@a/ui/components/ai-elements/voice-selector'
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl
} from '@a/ui/components/ai-elements/web-preview'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@a/ui/components/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@a/ui/components/alert-dialog'
import { AspectRatio } from '@a/ui/components/aspect-ratio'
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@a/ui/components/avatar'
import { Badge, badgeVariants } from '@a/ui/components/badge'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@a/ui/components/breadcrumb'
import { Button, buttonVariants } from '@a/ui/components/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants } from '@a/ui/components/button-group'
import { Calendar, CalendarDayButton } from '@a/ui/components/calendar'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/components/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel
} from '@a/ui/components/carousel'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent
} from '@a/ui/components/chart'
import { Checkbox } from '@a/ui/components/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@a/ui/components/collapsible'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor
} from '@a/ui/components/combobox'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@a/ui/components/command'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@a/ui/components/context-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@a/ui/components/dialog'
import { DirectionProvider, useDirection } from '@a/ui/components/direction'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
} from '@a/ui/components/drawer'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@a/ui/components/dropdown-menu'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@a/ui/components/empty'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '@a/ui/components/field'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@a/ui/components/hover-card'
import { Input } from '@a/ui/components/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from '@a/ui/components/input-group'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@a/ui/components/input-otp'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from '@a/ui/components/item'
import { Kbd, KbdGroup } from '@a/ui/components/kbd'
import { Label } from '@a/ui/components/label'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@a/ui/components/menubar'
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@a/ui/components/native-select'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@a/ui/components/navigation-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@a/ui/components/pagination'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@a/ui/components/popover'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@a/ui/components/progress'
import { RadioGroup, RadioGroupItem } from '@a/ui/components/radio-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@a/ui/components/resizable'
import { ScrollArea, ScrollBar } from '@a/ui/components/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@a/ui/components/select'
import { Separator } from '@a/ui/components/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@a/ui/components/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from '@a/ui/components/sidebar'
import { Skeleton } from '@a/ui/components/skeleton'
import { Slider } from '@a/ui/components/slider'
import { Toaster } from '@a/ui/components/sonner'
import { Spinner } from '@a/ui/components/spinner'
import { Switch } from '@a/ui/components/switch'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@a/ui/components/table'
import { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger } from '@a/ui/components/tabs'
import { Textarea } from '@a/ui/components/textarea'
import { Toggle, toggleVariants } from '@a/ui/components/toggle'
import { ToggleGroup, ToggleGroupItem } from '@a/ui/components/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@a/ui/components/tooltip'
import { BoxIcon, CodeIcon, LayoutDashboardIcon, PaletteIcon, PanelLeftIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { useId } from 'react'
import Providers from './providers'

const hookRefs = [
  useDirection,
  useJSXPreview,
  useAudioDevices,
  useReasoning,
  useVoiceSelector,
  usePromptInputController,
  useProviderAttachments,
  usePromptInputAttachments,
  usePromptInputReferencedSources,
  AlertDialogPortal,
  ContextMenuPortal,
  DialogPortal,
  DropdownMenuPortal,
  MenubarPortal
] as const
const SidebarHookShowcase = () => {
  const sidebar = useSidebar() as unknown as Record<string, unknown>
  return <span data-sidebar-open={JSON.stringify(sidebar)} />
}
const CarouselHookShowcase = () => {
  const carousel = useCarousel() as unknown as Record<string, unknown>
  return <span data-carousel={JSON.stringify(carousel)} />
}
const ComboboxAnchorShowcase = () => {
  const anchor = useComboboxAnchor()
  return <span ref={anchor} />
}
const AttachmentContextShowcase = () => {
  const attachmentsCtx = useAttachmentsContext() as unknown as Record<string, unknown>
  const attachmentCtx = useAttachmentContext() as unknown as Record<string, unknown>
  return <span data-attachment={JSON.stringify(attachmentCtx)} data-attachments={JSON.stringify(attachmentsCtx)} />
}
const safeCall = (fn: unknown): string => (fn as () => string)()
const variantClasses = [
  safeCall(badgeVariants),
  safeCall(buttonVariants),
  safeCall(buttonGroupVariants),
  safeCall(tabsListVariants),
  safeCall(toggleVariants),
  safeCall(navigationMenuTriggerStyle)
].join(' ')
const highlightedCode = (highlightCode as unknown as (code: string, lang: string) => unknown)('const x = 1', 'typescript')
const markdownResult = messagesToMarkdown([] as never)
const statusBadge = (getStatusBadge as unknown as (status: string) => unknown)('output-available')
const edgeTypes = {
  animated: (Edge as Record<string, unknown>).Animated,
  temporary: (Edge as Record<string, unknown>).Temporary
}
const mediaCategory = (getMediaCategory as (data: never) => string)({
  data: '',
  filename: 'f',
  id: '1',
  mediaType: 'text/plain',
  type: 'file'
} as never)
const attachmentLabel = getAttachmentLabel({
  data: '',
  filename: 'f',
  id: '1',
  mediaType: 'text/plain',
  type: 'file'
} as never)
const Page = () => {
  const chartId = useId()
  return (
    <Providers>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <SidebarInput placeholder='Search...' />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupAction>+</SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Dashboard'>
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Projects'>
                    <BoxIcon />
                    <span>Projects</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction>+</SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Settings'>
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuSkeleton />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Teams</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Engineering'>
                    <CodeIcon />
                    <span>Engineering</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Frontend</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Backend</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Design'>
                    <PaletteIcon />
                    <span>Design</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip='Account'>
                <UserIcon />
                <span>Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset
        className='mx-auto flex max-w-3xl flex-col gap-8 p-8'
        data-calendar-day-button={CalendarDayButton.name}
        data-highlight={highlightedCode}
        data-label={attachmentLabel}
        data-markdown={markdownResult}
        data-media={mediaCategory}
        data-testid='component-verify'
        data-variants={variantClasses}>
        <SidebarTrigger />
        <SidebarHookShowcase />
        {statusBadge as ReactNode}
        <span data-edge-types={Object.keys(edgeTypes).join(',')} />
        <Accordion>
          <AccordionItem value='a'>
            <AccordionTrigger>Accordion</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Alert>
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>Description</AlertDescription>
          <AlertAction>Action</AlertAction>
        </Alert>
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Title</AlertDialogTitle>
              <AlertDialogDescription>Description</AlertDialogDescription>
              <AlertDialogMedia />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AspectRatio ratio={16 / 9}>
          <span>Aspect</span>
        </AspectRatio>
        <AvatarGroup>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>A</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <AvatarGroupCount />
        </AvatarGroup>
        <Badge>Badge</Badge>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbList>
        </Breadcrumb>
        <Button>Button</Button>
        <ButtonGroup>
          <ButtonGroupText>Text</ButtonGroupText>
          <ButtonGroupSeparator />
        </ButtonGroup>
        <Calendar />
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Desc</CardDescription>
            <CardAction>Act</CardAction>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselHookShowcase />
        </Carousel>
        <ChartContainer config={{}}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </ChartContainer>
        <ChartStyle config={{}} id={chartId} />
        <Checkbox />
        <Collapsible>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>
        <Combobox>
          <ComboboxTrigger>
            <ComboboxValue />
          </ComboboxTrigger>
          <ComboboxInput />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Label</ComboboxLabel>
                <ComboboxItem value='a'>A</ComboboxItem>
              </ComboboxGroup>
              <ComboboxEmpty>Empty</ComboboxEmpty>
              <ComboboxSeparator />
            </ComboboxList>
          </ComboboxContent>
          <ComboboxChips>
            <ComboboxChip>A</ComboboxChip>
          </ComboboxChips>
          <ComboboxChipsInput />
          <ComboboxCollection>{() => null}</ComboboxCollection>
          <ComboboxAnchorShowcase />
        </Combobox>
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>Empty</CommandEmpty>
            <CommandGroup>
              <CommandItem>
                <CommandShortcut>K</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
        <CommandDialog open={false}>Commands</CommandDialog>
        <ContextMenu>
          <ContextMenuTrigger>Right-click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuLabel>Label</ContextMenuLabel>
              <ContextMenuItem>
                <ContextMenuShortcut>S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuCheckboxItem>Check</ContextMenuCheckboxItem>
              <ContextMenuRadioGroup>
                <ContextMenuRadioItem value='a'>A</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>Sub</ContextMenuSubTrigger>
                <ContextMenuSubContent>Sub</ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Desc</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Title</DrawerTitle>
                <DrawerDescription>Desc</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Label</DropdownMenuLabel>
              <DropdownMenuItem>
                <DropdownMenuShortcut>S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuCheckboxItem>Check</DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value='a'>A</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Sub</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>Sub</DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Empty>
          <EmptyHeader>
            <EmptyMedia />
            <EmptyTitle>Empty</EmptyTitle>
            <EmptyDescription>Nothing</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>Content</EmptyContent>
        </Empty>
        <FieldSet>
          <FieldLegend>Legend</FieldLegend>
          <FieldTitle>Title</FieldTitle>
          <FieldGroup>
            <Field>
              <FieldLabel>Label</FieldLabel>
              <FieldContent>
                <Input />
              </FieldContent>
              <FieldDescription>Desc</FieldDescription>
              <FieldError>Error</FieldError>
            </Field>
          </FieldGroup>
          <FieldSeparator />
        </FieldSet>
        <HoverCard>
          <HoverCardTrigger>Hover</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
        <InputGroup>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput />
          <InputGroupButton>Go</InputGroupButton>
          <InputGroupText>Text</InputGroupText>
          <InputGroupTextarea />
        </InputGroup>
        <span data-input-otp={[InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator].length} />
        <ItemGroup>
          <Item>
            <ItemMedia />
            <ItemHeader>
              <ItemTitle>Title</ItemTitle>
              <ItemDescription>Desc</ItemDescription>
            </ItemHeader>
            <ItemContent>Content</ItemContent>
            <ItemActions>Actions</ItemActions>
            <ItemFooter>Footer</ItemFooter>
          </Item>
          <ItemSeparator />
        </ItemGroup>
        <KbdGroup>
          <Kbd>K</Kbd>
        </KbdGroup>
        <Label>Label</Label>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarLabel>Label</MenubarLabel>
                <MenubarItem>
                  <MenubarShortcut>S</MenubarShortcut>
                </MenubarItem>
                <MenubarCheckboxItem>Check</MenubarCheckboxItem>
                <MenubarRadioGroup>
                  <MenubarRadioItem value='a'>A</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Sub</MenubarSubTrigger>
                  <MenubarSubContent>Sub</MenubarSubContent>
                </MenubarSub>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <NativeSelect>
          <NativeSelectOptGroup label='Group'>
            <NativeSelectOption>Option</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Nav</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
              <NavigationMenuIndicator />
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuPositioner />
        </NavigationMenu>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' size='default' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' size='default'>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' size='default' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Title</PopoverTitle>
              <PopoverDescription>Desc</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <Progress value={50}>
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
          <ProgressLabel>Loading</ProgressLabel>
          <ProgressValue />
        </Progress>
        <RadioGroup value='a'>
          <RadioGroupItem value='a' />
        </RadioGroup>
        <div className='h-48 rounded-lg border'>
          <ResizablePanelGroup orientation='horizontal'>
            <ResizablePanel>A</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>B</ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <ScrollArea>
          <ScrollBar />
        </ScrollArea>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group</SelectLabel>
              <SelectItem value='a'>A</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectScrollUpButton />
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
        <Separator />
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Title</SheetTitle>
              <SheetDescription>Desc</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose>Close</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        {/* Sidebar components rendered above as page layout */}
        <Skeleton />
        <Slider />
        <Toaster />
        <Spinner />
        <Switch />
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableCaption>Caption</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Head</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cell</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Foot</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Tabs defaultValue='a'>
          <TabsList>
            <TabsTrigger value='a'>A</TabsTrigger>
          </TabsList>
          <TabsContent value='a'>Content</TabsContent>
        </Tabs>
        <Textarea />
        <Toggle>Toggle</Toggle>
        <ToggleGroup>
          <ToggleGroupItem value='a'>A</ToggleGroupItem>
        </ToggleGroup>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Tip</TooltipContent>
        </Tooltip>
        {/* AI Elements */}
        <Agent>
          <AgentHeader name='agent'>Agent</AgentHeader>
          <AgentContent>
            <AgentInstructions>Instructions</AgentInstructions>
            <AgentTools>
              <AgentTool tool={{ description: 'd', name: 't' } as never} />
            </AgentTools>
            <AgentOutput schema='schema' />
          </AgentContent>
        </Agent>
        <Artifact>
          <ArtifactHeader>
            <ArtifactClose />
            <ArtifactTitle>Title</ArtifactTitle>
            <ArtifactDescription>Desc</ArtifactDescription>
          </ArtifactHeader>
          <ArtifactActions>
            <ArtifactAction>Act</ArtifactAction>
          </ArtifactActions>
          <ArtifactContent>Content</ArtifactContent>
        </Artifact>
        <Attachments>
          <Attachment data={{ name: 'f', size: 0, type: 'text/plain', url: '' } as never}>
            <AttachmentPreview />
            <AttachmentInfo />
            <AttachmentRemove />
            <AttachmentContextShowcase />
          </Attachment>
          <AttachmentHoverCard>
            <AttachmentHoverCardTrigger>Hover</AttachmentHoverCardTrigger>
            <AttachmentHoverCardContent>Content</AttachmentHoverCardContent>
          </AttachmentHoverCard>
          <AttachmentEmpty>Drop files</AttachmentEmpty>
        </Attachments>
        <AudioPlayer>
          <AudioPlayerElement src='' />
          <AudioPlayerControlBar>
            <AudioPlayerPlayButton />
            <AudioPlayerSeekBackwardButton />
            <AudioPlayerSeekForwardButton />
            <AudioPlayerTimeDisplay />
            <AudioPlayerTimeRange />
            <AudioPlayerDurationDisplay />
            <AudioPlayerMuteButton />
            <AudioPlayerVolumeRange />
          </AudioPlayerControlBar>
        </AudioPlayer>
        <div className='relative h-64 rounded-lg border'>
          <Canvas />
          <Controls />
          <Panel />
          <Toolbar />
          <Connection
            connectionLineType={'' as never}
            connectionStatus={'' as never}
            fromHandle={{} as never}
            fromNode={{} as never}
            fromPosition={'' as never}
            fromX={0}
            fromY={0}
            pointer={{} as never}
            toHandle={{} as never}
            toNode={{} as never}
            toPosition={'' as never}
            toX={100}
            toY={100}
          />
        </div>
        <ChainOfThought>
          <ChainOfThoughtHeader>Thinking</ChainOfThoughtHeader>
          <ChainOfThoughtStep label='Step 1'>
            <ChainOfThoughtContent>Content</ChainOfThoughtContent>
            <ChainOfThoughtImage />
          </ChainOfThoughtStep>
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult />
          </ChainOfThoughtSearchResults>
        </ChainOfThought>
        <Checkpoint>
          <CheckpointIcon />
          <CheckpointTrigger>Trigger</CheckpointTrigger>
        </Checkpoint>
        <CodeBlockContainer language='typescript'>
          <CodeBlockHeader>
            <CodeBlockTitle>Title</CodeBlockTitle>
            <CodeBlockFilename>file.ts</CodeBlockFilename>
            <CodeBlockActions>
              <CodeBlockCopyButton />
              <CodeBlockLanguageSelector>
                <CodeBlockLanguageSelectorTrigger>
                  <CodeBlockLanguageSelectorValue />
                </CodeBlockLanguageSelectorTrigger>
                <CodeBlockLanguageSelectorContent>
                  <CodeBlockLanguageSelectorItem value='ts'>TS</CodeBlockLanguageSelectorItem>
                </CodeBlockLanguageSelectorContent>
              </CodeBlockLanguageSelector>
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent code='const x = 1' language='typescript' />
        </CodeBlockContainer>
        <CodeBlock code='const x = 1' language='typescript' />
        <Commit>
          <CommitHeader>
            <CommitHash>abc123</CommitHash>
            <CommitMessage>Fix bug</CommitMessage>
            <CommitMetadata>
              <CommitInfo>
                <CommitAuthor>
                  <CommitAuthorAvatar initials='AB' />
                </CommitAuthor>
                <CommitTimestamp date={new Date('2024-01-01')} />
              </CommitInfo>
              <CommitSeparator />
            </CommitMetadata>
            <CommitActions>
              <CommitCopyButton hash='abc123' />
            </CommitActions>
          </CommitHeader>
          <CommitContent>
            <CommitFiles>
              <CommitFile>
                <CommitFileInfo>
                  <CommitFileStatus status='added' />
                  <CommitFileIcon />
                  <CommitFilePath>src/a.ts</CommitFilePath>
                </CommitFileInfo>
                <CommitFileChanges>
                  <CommitFileAdditions count={10} />
                  <CommitFileDeletions count={2} />
                </CommitFileChanges>
              </CommitFile>
            </CommitFiles>
          </CommitContent>
        </Commit>
        <Confirmation state='approval-requested'>
          <ConfirmationTitle>Confirm?</ConfirmationTitle>
          <ConfirmationRequest>Do this?</ConfirmationRequest>
          <ConfirmationAccepted>Yes</ConfirmationAccepted>
          <ConfirmationRejected>No</ConfirmationRejected>
          <ConfirmationActions>
            <ConfirmationAction>OK</ConfirmationAction>
          </ConfirmationActions>
        </Confirmation>
        <Context maxTokens={4000} usedTokens={200}>
          <ContextTrigger>Usage</ContextTrigger>
          <ContextContent>
            <ContextContentHeader>Header</ContextContentHeader>
            <ContextContentBody>
              <ContextInputUsage />
              <ContextOutputUsage />
              <ContextReasoningUsage />
              <ContextCacheUsage />
            </ContextContentBody>
            <ContextContentFooter>Footer</ContextContentFooter>
          </ContextContent>
        </Context>
        <div className='h-64 overflow-hidden rounded-lg border'>
          <Conversation>
            <ConversationContent>
              <ConversationEmptyState />
              <ConversationScrollButton />
            </ConversationContent>
          </Conversation>
        </div>
        <ConversationDownload messages={[] as never} />
        <EnvironmentVariables>
          <EnvironmentVariablesHeader>
            <EnvironmentVariablesTitle>Env Vars</EnvironmentVariablesTitle>
            <EnvironmentVariablesToggle />
          </EnvironmentVariablesHeader>
          <EnvironmentVariablesContent>
            <EnvironmentVariableGroup>
              <EnvironmentVariable name='KEY' value='VAL'>
                <EnvironmentVariableName>KEY</EnvironmentVariableName>
                <EnvironmentVariableValue>VAL</EnvironmentVariableValue>
                <EnvironmentVariableCopyButton />
                <EnvironmentVariableRequired />
              </EnvironmentVariable>
            </EnvironmentVariableGroup>
          </EnvironmentVariablesContent>
        </EnvironmentVariables>
        <FileTree>
          <FileTreeFolder name='src' path='src'>
            <FileTreeIcon />
            <FileTreeName>src</FileTreeName>
            <FileTreeFile name='a.ts' path='src/a.ts' />
            <FileTreeActions>Actions</FileTreeActions>
          </FileTreeFolder>
        </FileTree>
        <AiImage base64='' mediaType='image/png' uint8Array={new Uint8Array()} />
        <InlineCitation>
          <InlineCitationText>Text</InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={['http://example.com']}>T</InlineCitationCardTrigger>
            <InlineCitationCardBody>Body</InlineCitationCardBody>
          </InlineCitationCard>
          <InlineCitationCarousel>
            <InlineCitationCarouselHeader>Header</InlineCitationCarouselHeader>
            <InlineCitationCarouselContent>
              <InlineCitationCarouselItem>Item</InlineCitationCarouselItem>
            </InlineCitationCarouselContent>
            <InlineCitationCarouselIndex />
            <InlineCitationCarouselPrev />
            <InlineCitationCarouselNext />
          </InlineCitationCarousel>
          <InlineCitationSource url='http://example.com' />
          <InlineCitationQuote>Quote</InlineCitationQuote>
        </InlineCitation>
        <JSXPreview jsx='<div>Preview</div>'>
          <JSXPreviewContent />
          <JSXPreviewError>Error</JSXPreviewError>
        </JSXPreview>
        <Message from='user'>
          <MessageContent>Hello</MessageContent>
          <MessageActions>
            <MessageAction>Copy</MessageAction>
          </MessageActions>
          <MessageBranch>
            <MessageBranchContent>Branch</MessageBranchContent>
            <MessageBranchSelector>
              <MessageBranchPrevious />
              <MessageBranchPage />
              <MessageBranchNext />
            </MessageBranchSelector>
          </MessageBranch>
          <MessageResponse>Response</MessageResponse>
          <MessageToolbar>Toolbar</MessageToolbar>
        </Message>
        <MicSelector>
          <MicSelectorTrigger>Mic</MicSelectorTrigger>
          <MicSelectorContent>
            <MicSelectorInput />
            <MicSelectorList>
              {(devices: MediaDeviceInfo[]) => (
                <>
                  <MicSelectorEmpty>No mics</MicSelectorEmpty>
                  {devices.map(d => (
                    <MicSelectorItem key={d.deviceId}>
                      <MicSelectorLabel device={d} />
                    </MicSelectorItem>
                  ))}
                </>
              )}
            </MicSelectorList>
          </MicSelectorContent>
          <MicSelectorValue />
        </MicSelector>
        <ModelSelector>
          <ModelSelectorTrigger>Model</ModelSelectorTrigger>
          <ModelSelectorContent>
            <ModelSelectorDialog>
              <ModelSelectorInput />
              <ModelSelectorList>
                <ModelSelectorEmpty>None</ModelSelectorEmpty>
                <ModelSelectorGroup>
                  <ModelSelectorItem value='gpt-4'>
                    <ModelSelectorLogo provider='openai' />
                    <ModelSelectorLogoGroup>
                      <ModelSelectorName>GPT-4</ModelSelectorName>
                    </ModelSelectorLogoGroup>
                    <ModelSelectorShortcut>4</ModelSelectorShortcut>
                  </ModelSelectorItem>
                </ModelSelectorGroup>
                <ModelSelectorSeparator />
              </ModelSelectorList>
            </ModelSelectorDialog>
          </ModelSelectorContent>
        </ModelSelector>
        <Node handles={{ source: true, target: true }}>
          <NodeHeader>
            <NodeTitle>Node</NodeTitle>
            <NodeDescription>Desc</NodeDescription>
            <NodeAction>Act</NodeAction>
          </NodeHeader>
          <NodeContent>Content</NodeContent>
          <NodeFooter>Footer</NodeFooter>
        </Node>
        <OpenIn query='test'>
          <OpenInTrigger>Open In</OpenInTrigger>
          <OpenInContent>
            <OpenInItem>
              <OpenInLabel>Label</OpenInLabel>
            </OpenInItem>
            <OpenInSeparator />
            <OpenInChatGPT />
            <OpenInClaude />
            <OpenInT3 />
            <OpenInScira />
            <OpenInv0 />
            <OpenInCursor />
          </OpenInContent>
        </OpenIn>
        <PackageInfo name='pkg'>
          <PackageInfoHeader>
            <PackageInfoName>pkg</PackageInfoName>
            <PackageInfoChangeType />
            <PackageInfoVersion>1.0</PackageInfoVersion>
          </PackageInfoHeader>
          <PackageInfoDescription>A package</PackageInfoDescription>
          <PackageInfoContent>
            <PackageInfoDependencies>
              <PackageInfoDependency name='dep' />
            </PackageInfoDependencies>
          </PackageInfoContent>
        </PackageInfo>
        <Persona state='idle' />
        <Plan>
          <PlanHeader>
            <PlanTitle>Plan</PlanTitle>
            <PlanDescription>Description</PlanDescription>
            <PlanAction>Action</PlanAction>
          </PlanHeader>
          <PlanContent>Content</PlanContent>
          <PlanFooter>Footer</PlanFooter>
          <PlanTrigger>Trigger</PlanTrigger>
        </Plan>
        <PromptInputProvider>
          <LocalReferencedSourcesContext value={null}>
            <PromptInput onSubmit={() => undefined}>
              <PromptInputHeader>Header</PromptInputHeader>
              <PromptInputBody>
                <PromptInputTextarea />
                <PromptInputTools>Tools</PromptInputTools>
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputButton tooltip='Tip'>Btn</PromptInputButton>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger>Menu</PromptInputActionMenuTrigger>
                  <PromptInputActionMenuContent>
                    <PromptInputActionMenuItem>Item</PromptInputActionMenuItem>
                    <PromptInputActionAddAttachments />
                    <PromptInputActionAddScreenshot />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <PromptInputSubmit>Send</PromptInputSubmit>
                <PromptInputSelect>
                  <PromptInputSelectTrigger>
                    <PromptInputSelectValue />
                  </PromptInputSelectTrigger>
                  <PromptInputSelectContent>
                    <PromptInputSelectItem value='a'>A</PromptInputSelectItem>
                  </PromptInputSelectContent>
                </PromptInputSelect>
                <PromptInputHoverCard>
                  <PromptInputHoverCardTrigger>Info</PromptInputHoverCardTrigger>
                  <PromptInputHoverCardContent>Details</PromptInputHoverCardContent>
                </PromptInputHoverCard>
              </PromptInputFooter>
              <PromptInputTabsList>
                <PromptInputTab>
                  <PromptInputTabLabel>Tab</PromptInputTabLabel>
                  <PromptInputTabBody>
                    <PromptInputTabItem>Item</PromptInputTabItem>
                  </PromptInputTabBody>
                </PromptInputTab>
              </PromptInputTabsList>
              <PromptInputCommand>
                <PromptInputCommandInput />
                <PromptInputCommandList>
                  <PromptInputCommandEmpty>Empty</PromptInputCommandEmpty>
                  <PromptInputCommandGroup>
                    <PromptInputCommandItem>Item</PromptInputCommandItem>
                  </PromptInputCommandGroup>
                  <PromptInputCommandSeparator />
                </PromptInputCommandList>
              </PromptInputCommand>
              <span data-hook-refs={hookRefs.length} />
            </PromptInput>
          </LocalReferencedSourcesContext>
        </PromptInputProvider>
        <Queue>
          <QueueList>
            <QueueSection>
              <QueueSectionTrigger>Section</QueueSectionTrigger>
              <QueueSectionLabel count={1} label='Label' />
              <QueueSectionContent>
                <QueueItem>
                  <QueueItemIndicator />
                  <QueueItemContent>
                    <QueueItemDescription>Desc</QueueItemDescription>
                  </QueueItemContent>
                  <QueueItemActions>
                    <QueueItemAction>Act</QueueItemAction>
                  </QueueItemActions>
                  <QueueItemAttachment>
                    <QueueItemImage />
                    <QueueItemFile />
                  </QueueItemAttachment>
                </QueueItem>
              </QueueSectionContent>
            </QueueSection>
          </QueueList>
        </Queue>
        <Reasoning>
          <ReasoningTrigger>Thinking...</ReasoningTrigger>
          <ReasoningContent>Reasoning content</ReasoningContent>
        </Reasoning>
        <Sandbox>
          <SandboxHeader state='output-available' />
          <SandboxContent>
            <SandboxTabs>
              <SandboxTabsBar>
                <SandboxTabsList>
                  <SandboxTabsTrigger value='preview'>Preview</SandboxTabsTrigger>
                </SandboxTabsList>
              </SandboxTabsBar>
              <SandboxTabContent value='preview'>Content</SandboxTabContent>
            </SandboxTabs>
          </SandboxContent>
        </Sandbox>
        <SchemaDisplay method='GET' path='/api/test'>
          <SchemaDisplayHeader>
            <SchemaDisplayMethod>GET</SchemaDisplayMethod>
            <SchemaDisplayPath>/api/test</SchemaDisplayPath>
            <SchemaDisplayDescription>Desc</SchemaDisplayDescription>
          </SchemaDisplayHeader>
          <SchemaDisplayBody>
            <SchemaDisplayContent>
              <SchemaDisplayParameters>
                <SchemaDisplayParameter name='id' type='string' />
              </SchemaDisplayParameters>
              <SchemaDisplayRequest>
                <SchemaDisplayProperty name='body' type='object' />
              </SchemaDisplayRequest>
              <SchemaDisplayResponse>Response</SchemaDisplayResponse>
            </SchemaDisplayContent>
            <SchemaDisplayExample>Example</SchemaDisplayExample>
          </SchemaDisplayBody>
        </SchemaDisplay>
        <Shimmer>Loading...</Shimmer>
        <Snippet code='npm install'>
          <SnippetAddon>$</SnippetAddon>
          <SnippetText>npm install</SnippetText>
          <SnippetInput />
          <SnippetCopyButton />
        </Snippet>
        <Sources>
          <SourcesTrigger count={1}>Sources</SourcesTrigger>
          <SourcesContent>
            <Source />
          </SourcesContent>
        </Sources>
        <SpeechInput />
        <StackTrace trace='Error: Something\n  at foo (file.ts:1:1)'>
          <StackTraceHeader>
            <StackTraceError>
              <StackTraceErrorType>Error</StackTraceErrorType>
              <StackTraceErrorMessage>Something</StackTraceErrorMessage>
            </StackTraceError>
            <StackTraceActions>
              <StackTraceCopyButton />
              <StackTraceExpandButton />
            </StackTraceActions>
          </StackTraceHeader>
          <StackTraceContent>
            <StackTraceFrames />
          </StackTraceContent>
        </StackTrace>
        <Suggestions>
          <Suggestion suggestion='Try this' />
        </Suggestions>
        <Task>
          <TaskTrigger title='Task'>Open</TaskTrigger>
          <TaskContent>
            <TaskItem>
              <TaskItemFile>file.ts</TaskItemFile>
            </TaskItem>
          </TaskContent>
        </Task>
        <Terminal output='$ echo hello'>
          <TerminalHeader>
            <TerminalTitle>Terminal</TerminalTitle>
            <TerminalStatus />
            <TerminalActions>
              <TerminalCopyButton />
              <TerminalClearButton />
            </TerminalActions>
          </TerminalHeader>
          <TerminalContent>output</TerminalContent>
        </Terminal>
        <TestResults>
          <TestResultsHeader>
            <TestResultsDuration>1.2s</TestResultsDuration>
            <TestResultsSummary>Summary</TestResultsSummary>
          </TestResultsHeader>
          <TestResultsProgress />
          <TestResultsContent>
            <TestSuite name='suite' status='passed'>
              <TestSuiteName>Suite</TestSuiteName>
              <TestSuiteStats>Stats</TestSuiteStats>
              <TestSuiteContent>
                <Test name='test' status='passed'>
                  <TestName>Test</TestName>
                  <TestDuration>100ms</TestDuration>
                  <TestStatus />
                  <TestError>
                    <TestErrorMessage>Error</TestErrorMessage>
                    <TestErrorStack>Stack</TestErrorStack>
                  </TestError>
                </Test>
              </TestSuiteContent>
            </TestSuite>
          </TestResultsContent>
        </TestResults>
        <Tool>
          <ToolHeader state='output-available' type='tool-tool' />
          <ToolContent>
            <ToolInput input={{}} />
            <ToolOutput errorText={undefined} output={{}} />
          </ToolContent>
        </Tool>
        <Transcription segments={[{ endSecond: 1, startSecond: 0, text: 'Hello' }]}>
          {(segment: { endSecond: number; startSecond: number; text: string }, index: number) => (
            <TranscriptionSegment index={index} key={index} segment={segment} />
          )}
        </Transcription>
        <VoiceSelector>
          <VoiceSelectorTrigger>Voice</VoiceSelectorTrigger>
          <VoiceSelectorContent>
            <VoiceSelectorDialog>
              <VoiceSelectorInput />
              <VoiceSelectorList>
                <VoiceSelectorEmpty>None</VoiceSelectorEmpty>
                <VoiceSelectorGroup>
                  <VoiceSelectorItem value='voice-1'>
                    <VoiceSelectorName>Voice</VoiceSelectorName>
                    <VoiceSelectorDescription>Desc</VoiceSelectorDescription>
                    <VoiceSelectorAttributes>
                      <VoiceSelectorGender>Female</VoiceSelectorGender>
                      <VoiceSelectorAccent>US</VoiceSelectorAccent>
                      <VoiceSelectorAge>Adult</VoiceSelectorAge>
                      <VoiceSelectorBullet />
                    </VoiceSelectorAttributes>
                    <VoiceSelectorPreview />
                    <VoiceSelectorShortcut>1</VoiceSelectorShortcut>
                  </VoiceSelectorItem>
                </VoiceSelectorGroup>
                <VoiceSelectorSeparator />
              </VoiceSelectorList>
            </VoiceSelectorDialog>
          </VoiceSelectorContent>
        </VoiceSelector>
      </SidebarInset>
    </Providers>
  )
}
export default Page
