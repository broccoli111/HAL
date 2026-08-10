import type { CorrelationId, RequestId } from "../shared/types.js";

export type LocalDataClassification =
  "synthetic_non_sensitive" | "owner_approved_repository_canon" | "owner_approved_local_document";

export type LocalRequest = Readonly<{
  requestId: RequestId;
  correlationId: CorrelationId;
  declaredAction: string;
  declaredTarget: string;
  declaredPurpose: string;
  requestedAtIso8601: string;
  dataClassification: LocalDataClassification;
}>;

export function createLocalRequest(input: {
  requestId: RequestId;
  correlationId: CorrelationId;
  declaredAction: string;
  declaredTarget: string;
  declaredPurpose: string;
  requestedAtIso8601: string;
  dataClassification: LocalDataClassification;
}): LocalRequest {
  if (!input.declaredAction.trim()) {
    throw new Error("declaredAction must be non-empty.");
  }
  if (!input.declaredTarget.trim()) {
    throw new Error("declaredTarget must be non-empty.");
  }
  if (!input.declaredPurpose.trim()) {
    throw new Error("declaredPurpose must be non-empty.");
  }
  if (!input.requestedAtIso8601.trim()) {
    throw new Error("requestedAtIso8601 must be non-empty.");
  }
  if (Number.isNaN(Date.parse(input.requestedAtIso8601))) {
    throw new Error("requestedAtIso8601 must be a valid ISO-8601 timestamp.");
  }

  return Object.freeze({
    requestId: input.requestId,
    correlationId: input.correlationId,
    declaredAction: input.declaredAction,
    declaredTarget: input.declaredTarget,
    declaredPurpose: input.declaredPurpose,
    requestedAtIso8601: input.requestedAtIso8601,
    dataClassification: input.dataClassification
  });
}
