import { createAuthorityDecision, type AuthorityDecision } from "./decision.js";
import type { LocalRequest } from "../request/model.js";
import type { SafeMode } from "../kernel/safeMode.js";

const ALLOWED_ACTION = "inspect_synthetic_corpus_summary";
const M6_ALLOWED_ACTION = "answer_synthetic_corpus_question_deterministic_v1";
const APPROVAL_REQUIRED_ACTION = "prepare_synthetic_brief_draft";

export function evaluateLocalPolicy(request: LocalRequest, safeMode: SafeMode): AuthorityDecision {
  const action = request.declaredAction.trim();
  if (!action) {
    return createAuthorityDecision(
      "deny",
      "Malformed request: action is empty.",
      request.correlationId
    );
  }

  if (action === ALLOWED_ACTION || action === M6_ALLOWED_ACTION) {
    return createAuthorityDecision(
      "allow",
      "Admitted synthetic inspection action in local-only mode.",
      request.correlationId
    );
  }

  if (action === APPROVAL_REQUIRED_ACTION) {
    return createAuthorityDecision(
      "approval_required",
      "Action recognized but not admitted; approval_required is a non-executing restriction.",
      request.correlationId
    );
  }

  if (safeMode.isRestrictive()) {
    return createAuthorityDecision(
      "deny",
      "Safe Mode restrictive: unknown or non-admitted action denied with no effect.",
      request.correlationId
    );
  }

  return createAuthorityDecision(
    "deny",
    "Unknown or non-admitted action; no effect is authorized.",
    request.correlationId
  );
}

export const LOCAL_POLICY_ACTIONS = Object.freeze({
  ALLOWED_ACTION,
  M6_ALLOWED_ACTION,
  APPROVAL_REQUIRED_ACTION
});
