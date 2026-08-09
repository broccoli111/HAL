import type { ImmutableIdentifier } from "../shared/types.js";
import type { M8PackActivationRequest, M8PackActivationResult } from "./types.js";
import { activateApprovedM9Pack, deactivateApprovedM9Pack } from "../m9/index.js";

export function applyM8PackActivationRequest(input: {
  parsedRequest: M8PackActivationRequest;
  stateDirectory: string;
}): M8PackActivationResult {
  if (input.parsedRequest.ownerDisposition === "activate") {
    const activated = activateApprovedM9Pack({
      operationRequestId: input.parsedRequest.requestId as unknown as ImmutableIdentifier,
      stateDirectory: input.stateDirectory,
      packId: input.parsedRequest.packId as string,
      ownerConfirmationClaim: input.parsedRequest.ownerConfirmation,
      reasonCode: "owner_local_activation"
    });
    return Object.freeze({
      requestId: input.parsedRequest.requestId,
      correlationId: activated.correlationId,
      result: activated.result,
      resultReasonCode: activated.resultReasonCode,
      replayed: activated.replayed,
      conflict: activated.conflict,
      ...(activated.activationRecordId ? { activationRecordId: activated.activationRecordId } : {}),
      ...(activated.activePack ? { activePack: activated.activePack } : {}),
      externalEffect: "none"
    });
  }
  const deactivated = deactivateApprovedM9Pack({
    operationRequestId: input.parsedRequest.requestId as unknown as ImmutableIdentifier,
    stateDirectory: input.stateDirectory,
    ...(input.parsedRequest.packId ? { requestedPackId: input.parsedRequest.packId } : {}),
    ownerConfirmationClaim: input.parsedRequest.ownerConfirmation,
    reasonCode: "owner_local_deactivation"
  });
  return Object.freeze({
    requestId: input.parsedRequest.requestId,
    correlationId: deactivated.correlationId,
    result: deactivated.result,
    resultReasonCode: deactivated.resultReasonCode,
    replayed: deactivated.replayed,
    conflict: deactivated.conflict,
    ...(deactivated.activationRecordId
      ? { activationRecordId: deactivated.activationRecordId }
      : {}),
    externalEffect: "none"
  });
}
