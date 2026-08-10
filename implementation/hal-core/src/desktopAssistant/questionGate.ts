import type { DesktopAssistantQuestionRequest, DesktopAssistantQuestionResult } from "./types.js";

export type DesktopAssistantQuestionDispatcher = (
  // eslint-disable-next-line no-unused-vars
  request: DesktopAssistantQuestionRequest
) => Promise<DesktopAssistantQuestionResult>;

/** Enforces the UI's one-question-at-a-time bound at the HAL-owned IPC edge. */
export function createDesktopAssistantQuestionGate(
  dispatchQuestion: DesktopAssistantQuestionDispatcher
): DesktopAssistantQuestionDispatcher {
  let dispatchInProgress = false;
  return async (request) => {
    if (dispatchInProgress) return blocked("desktop_request_in_progress");
    dispatchInProgress = true;
    try {
      return await dispatchQuestion(request);
    } finally {
      dispatchInProgress = false;
    }
  };
}

function blocked(reasonCode: string): DesktopAssistantQuestionResult {
  return Object.freeze({ result: "blocked", response: "", reasonCode });
}
