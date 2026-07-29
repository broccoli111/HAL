import { createCorrelationId, createRequestId } from "../shared/id.js";
import { createLocalRequest, type LocalRequest } from "./model.js";

export type LocalRequestFixtureName =
  "allowed_inspection_request" | "approval_required_request" | "denied_unknown_request";

export function loadLocalRequestFixture(fixtureName: LocalRequestFixtureName): LocalRequest {
  const now = new Date().toISOString();

  if (fixtureName === "allowed_inspection_request") {
    return createLocalRequest({
      requestId: createRequestId(),
      correlationId: createCorrelationId(),
      declaredAction: "inspect_synthetic_corpus_summary",
      declaredTarget: "local_synthetic_corpus",
      declaredPurpose: "produce a local-only summary preview",
      requestedAtIso8601: now,
      dataClassification: "synthetic_non_sensitive"
    });
  }

  if (fixtureName === "approval_required_request") {
    return createLocalRequest({
      requestId: createRequestId(),
      correlationId: createCorrelationId(),
      declaredAction: "prepare_synthetic_brief_draft",
      declaredTarget: "local_synthetic_workspace",
      declaredPurpose: "prepare draft that requires explicit later admission",
      requestedAtIso8601: now,
      dataClassification: "synthetic_non_sensitive"
    });
  }

  return createLocalRequest({
    requestId: createRequestId(),
    correlationId: createCorrelationId(),
    declaredAction: "unknown_effectful_action",
    declaredTarget: "undefined_target",
    declaredPurpose: "exercise deny path for unknown action",
    requestedAtIso8601: now,
    dataClassification: "synthetic_non_sensitive"
  });
}
