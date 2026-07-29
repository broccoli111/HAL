import { randomUUID } from "node:crypto";

import type { CorrelationId, ImmutableIdentifier, RequestId } from "./types.js";

export function createImmutableIdentifier(prefix: string): ImmutableIdentifier {
  const normalizedPrefix = prefix.trim().toLowerCase();
  if (!normalizedPrefix) {
    throw new Error("ImmutableIdentifier prefix must be non-empty.");
  }

  return `${normalizedPrefix}_${randomUUID()}` as ImmutableIdentifier;
}

export function createCorrelationId(): CorrelationId {
  return randomUUID() as CorrelationId;
}

export function createRequestId(): RequestId {
  return createImmutableIdentifier("request") as unknown as RequestId;
}
