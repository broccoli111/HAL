import { DESKTOP_ASSISTANT_SCOPES, type DesktopAssistantQuestionRequest } from "./types.js";

export const DESKTOP_ASSISTANT_IPC_CHANNEL = "desktop-assistant:submit-question";
export const DESKTOP_ASSISTANT_MAX_QUESTION_CHARS = 8_192;

export function parseDesktopAssistantQuestionRequest(
  payload: unknown
): DesktopAssistantQuestionRequest | undefined {
  if (!isObject(payload)) return undefined;
  const scope = payload.scope;
  const questionText = payload.questionText;
  if (
    typeof scope !== "string" ||
    !DESKTOP_ASSISTANT_SCOPES.includes(scope as (typeof DESKTOP_ASSISTANT_SCOPES)[number]) ||
    typeof questionText !== "string" ||
    !questionText.trim() ||
    questionText.length > DESKTOP_ASSISTANT_MAX_QUESTION_CHARS
  ) {
    return undefined;
  }
  return Object.freeze({
    scope: scope as DesktopAssistantQuestionRequest["scope"],
    questionText: questionText.trim()
  });
}

export function validateDesktopAssistantIpcSender(input: {
  senderId: number;
  expectedSenderId: number;
  senderUrl: string;
  isMainFrame: boolean;
}): string | undefined {
  if (input.senderId !== input.expectedSenderId) return "unexpected_sender";
  if (!input.isMainFrame) return "unexpected_frame";
  try {
    const parsed = new URL(input.senderUrl);
    if (
      parsed.protocol !== "hal-desktop:" ||
      parsed.host !== "app" ||
      parsed.pathname !== "/index.html"
    ) {
      return "unexpected_origin";
    }
  } catch {
    return "malformed_sender_url";
  }
  return undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
