import type { CorrelationId } from "../shared/types.js";

export type AuthorityDecisionDisposition = "allow" | "deny" | "approval_required";

export type AuthorityDecision = Readonly<{
  disposition: AuthorityDecisionDisposition;
  reason: string;
  correlationId: CorrelationId;
}>;

export function createAuthorityDecision(
  disposition: AuthorityDecisionDisposition,
  reason: string,
  correlationId: CorrelationId
): AuthorityDecision {
  if (!reason.trim()) {
    throw new Error("AuthorityDecision reason must be non-empty.");
  }

  return Object.freeze({
    disposition,
    reason,
    correlationId
  });
}
