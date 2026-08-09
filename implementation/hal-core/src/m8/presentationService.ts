import {
  M8_REQUEST_ID_PREFIX,
  createLocalInquiryRequestIdGenerator,
  executeLocalGovernedInquiry
} from "../inquiry/localInquiryService.js";
import type { M8BlockedCode, M8InquiryPanel } from "./types.js";

export type M8InquiryExecutor = (
  // eslint-disable-next-line no-unused-vars
  input: {
    stateDirectory: string;
    questionText: string;
    replayIntentional: boolean;
    requestId?: string;
  }
) => M8InquiryPanel;

export function createM8InquiryExecutor(): M8InquiryExecutor {
  const requestIdGenerator = createLocalInquiryRequestIdGenerator(M8_REQUEST_ID_PREFIX);
  return (input) => {
    const outcome = executeLocalGovernedInquiry({
      stateDirectory: input.stateDirectory,
      questionText: input.questionText,
      replayIntentional: input.replayIntentional,
      ...(input.requestId ? { requestId: input.requestId } : {}),
      generateRequestId: requestIdGenerator
    });
    if (outcome.ok) {
      const result = outcome.result;
      return Object.freeze({
        requestId: result.requestId,
        correlationId: result.correlationId,
        result: result.result,
        disposition: result.disposition,
        replayed: result.replayed,
        attestationStatus: result.attestationStatus,
        attestationClaimedEffect: result.attestationClaimedEffect,
        inputClassification: result.inputClassification,
        response: result.renderedResponse
      });
    }
    if (outcome.code === "integrity_unavailable") {
      return buildBlockedPanel({
        code: "integrity_unavailable",
        requestId: outcome.requestId,
        correlationId: outcome.correlationId ?? "unavailable",
        reason: outcome.reason,
        result: "integrity_unavailable"
      });
    }
    return buildBlockedPanel({
      code: "m6_invocation_failed",
      requestId: outcome.requestId || "unavailable",
      correlationId: "unavailable",
      reason: outcome.reason
    });
  };
}

export function buildBlockedPanel(input: {
  code: M8BlockedCode;
  reason: string;
  requestId: string;
  correlationId: string;
  result?: string;
}): M8InquiryPanel {
  const result = input.result ?? "blocked";
  return Object.freeze({
    requestId: input.requestId,
    correlationId: input.correlationId,
    result,
    disposition: "blocked",
    replayed: false,
    attestationStatus: "unavailable",
    attestationClaimedEffect: "unavailable",
    inputClassification: "UNAVAILABLE",
    response: `result=${result}\nexternalEffect=none\nreason=${input.code}:${input.reason}`
  });
}
