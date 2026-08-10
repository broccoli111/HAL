export const DESKTOP_ASSISTANT_SCOPES = Object.freeze([
  "canon",
  "documents",
  "combined",
  "hal-ref-2"
] as const);

export type DesktopAssistantScope = (typeof DESKTOP_ASSISTANT_SCOPES)[number];

export type DesktopAssistantQuestionRequest = Readonly<{
  scope: DesktopAssistantScope;
  questionText: string;
}>;

export type DesktopAssistantQuestionResult = Readonly<{
  result: "completed" | "blocked";
  response: string;
  reasonCode?: string;
}>;
