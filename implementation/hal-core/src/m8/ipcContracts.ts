import type { M8QuestionSubmission, M8ReplaySubmission } from "./types.js";
import type { M8StateDirectoryStatus } from "./types.js";

export const M8_IPC_CHANNELS = Object.freeze({
  getBoundary: "m8:get-boundary",
  pickStateDirectory: "m8:pick-state-directory",
  getStateDirectoryStatus: "m8:get-state-directory-status",
  submitQuestion: "m8:submit-question",
  submitReplay: "m8:submit-replay"
});

export function parseM8QuestionSubmission(payload: unknown): M8QuestionSubmission | undefined {
  if (!isObject(payload)) {
    return undefined;
  }
  const questionText = payload.questionText;
  if (typeof questionText !== "string") {
    return undefined;
  }
  return Object.freeze({ questionText });
}

export function parseM8ReplaySubmission(payload: unknown): M8ReplaySubmission | undefined {
  if (!isObject(payload)) {
    return undefined;
  }
  const requestId = payload.requestId;
  const questionText = payload.questionText;
  if (typeof requestId !== "string" || typeof questionText !== "string") {
    return undefined;
  }
  return Object.freeze({
    requestId,
    questionText
  });
}

export function validateM8IpcSender(input: {
  senderId: number;
  expectedSenderId: number;
  senderUrl: string;
  expectedProtocol: string;
  expectedHost: string;
  expectedDocumentPath: string;
  isMainFrame: boolean;
}): string | undefined {
  if (input.senderId !== input.expectedSenderId) {
    return "unexpected_sender";
  }
  if (!input.isMainFrame) {
    return "unexpected_frame";
  }
  let parsed: URL;
  try {
    parsed = new URL(input.senderUrl);
  } catch {
    return "malformed_sender_url";
  }
  if (parsed.protocol !== input.expectedProtocol) {
    return "unexpected_origin";
  }
  if (parsed.host !== input.expectedHost) {
    return "unexpected_origin";
  }
  if (parsed.pathname !== input.expectedDocumentPath) {
    return "unexpected_document";
  }
  return undefined;
}

export function buildDeniedStateDirectoryStatus(
  errorCode = "ipc_validation_failed"
): M8StateDirectoryStatus {
  return Object.freeze({
    selected: false,
    error: errorCode
  });
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return typeof value === "object" && value !== null;
}
