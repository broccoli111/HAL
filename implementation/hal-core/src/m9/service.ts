import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { M6_M3_CAPABILITY_ID } from "../m3/types.js";
import { M9ActivationJournal } from "./activationJournal.js";
import { runM2ForM9Activation } from "./m2Admission.js";
import { canonicalJsonUtf8Bytes, sha256Hex } from "./canonical.js";
import {
  buildM9Registry,
  listApprovedPacks,
  resolveApprovedM9PackRoot,
  validateApprovedPackDirectory
} from "./validator.js";
import type {
  M9ActivePackState,
  M9OwnerConfirmationClaimCategory,
  M9ReasonCode,
  M9RegistrationEntry,
  M9ResolvedPack
} from "./types.js";

export type M9ActivationRequest = Readonly<{
  operationRequestId: ImmutableIdentifier;
  stateDirectory: string;
  packId: string;
  ownerConfirmationClaim: string;
  reasonCode: "owner_local_activation";
}>;

export type M9DeactivationRequest = Readonly<{
  operationRequestId: ImmutableIdentifier;
  stateDirectory: string;
  requestedPackId?: string;
  ownerConfirmationClaim: string;
  reasonCode: "owner_local_deactivation";
}>;

export type M9ActivationOperationResult = Readonly<{
  operationRequestId: ImmutableIdentifier;
  correlationId: string;
  result: "succeeded" | "blocked";
  resultReasonCode: M9ReasonCode;
  replayed: boolean;
  conflict: boolean;
  activationRecordId?: ImmutableIdentifier;
  activePack?: M9ActivePackState;
  externalEffect: "none";
}>;

type M9OperationFingerprintInput = Readonly<{
  operationRequestId: ImmutableIdentifier;
  ownerDisposition: "activate" | "deactivate";
  requestedPackId: string;
  requestedPackVersion: string;
  requestedManifestHashSha256: string;
  ownerConfirmationClaimCategory: M9OwnerConfirmationClaimCategory;
  reasonCode: M9ReasonCode;
}>;

function claimCategory(value: string): M9OwnerConfirmationClaimCategory {
  return value === "local_owner_confirmed" ? "local_owner_confirmed" : "owner_claim_invalid";
}

function buildOperationFingerprint(input: M9OperationFingerprintInput): string {
  return sha256Hex(
    canonicalJsonUtf8Bytes({
      operationRequestId: input.operationRequestId,
      ownerDisposition: input.ownerDisposition,
      requestedPackId: input.requestedPackId,
      requestedPackVersion: input.requestedPackVersion,
      requestedManifestHashSha256: input.requestedManifestHashSha256,
      ownerConfirmationClaimCategory: input.ownerConfirmationClaimCategory,
      reasonCode: input.reasonCode
    })
  );
}

function findPackByTuple(
  packId: string,
  packVersion: string,
  manifestHashSha256: string
): M9ResolvedPack | undefined {
  return listApprovedPacks().find(
    (pack) =>
      pack.manifest.packId === packId &&
      pack.manifest.packVersion === packVersion &&
      pack.manifestHashSha256 === manifestHashSha256
  );
}

export function listApprovedM9PackRegistrations(): readonly M9RegistrationEntry[] {
  return buildM9Registry();
}

export function getM9ActivePackState(stateDirectory: string): M9ActivePackState | undefined {
  const journal = new M9ActivationJournal(stateDirectory);
  const records = journal.listAll();
  const latestSucceeded = [...records].reverse().find((record) => record.result === "succeeded");
  if (!latestSucceeded) {
    return undefined;
  }
  if (latestSucceeded.ownerDisposition === "deactivate") {
    return undefined;
  }
  const validatedPack = findPackByTuple(
    latestSucceeded.packId,
    latestSucceeded.packVersion,
    latestSucceeded.manifestHashSha256
  );
  if (!validatedPack) {
    throw new Error("integrity_unavailable: activated pack tuple unavailable");
  }
  validateApprovedPackDirectory(validatedPack.packDirectory);
  return Object.freeze({
    activationRecordId: latestSucceeded.activationRecordId,
    packId: latestSucceeded.packId,
    packVersion: latestSucceeded.packVersion,
    manifestHashSha256: latestSucceeded.manifestHashSha256
  });
}

export function activateApprovedM9Pack(request: M9ActivationRequest): M9ActivationOperationResult {
  const journal = new M9ActivationJournal(request.stateDirectory);
  const registrations = buildM9Registry();
  const selected = registrations.find((entry) => entry.packId === request.packId);
  const requestFingerprint = buildOperationFingerprint({
    operationRequestId: request.operationRequestId,
    ownerDisposition: "activate",
    requestedPackId: request.packId,
    requestedPackVersion: selected?.packVersion ?? "unavailable",
    requestedManifestHashSha256: selected?.manifestHashSha256 ?? "unavailable",
    ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
    reasonCode: request.reasonCode
  });
  const duplicate = journal.findByOperationRequestId(request.operationRequestId);
  if (duplicate) {
    if (duplicate.operationFingerprintSha256 !== requestFingerprint) {
      const conflictAdmission = runM2ForM9Activation({
        operationRequestId: request.operationRequestId,
        operationFingerprintSha256: requestFingerprint,
        stateDirectory: request.stateDirectory,
        ownerDisposition: "activate",
        ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
        reasonCode: request.reasonCode,
        packId: request.packId,
        packVersion: selected?.packVersion ?? "unavailable",
        manifestHashSha256: selected?.manifestHashSha256 ?? "unavailable"
      });
      return Object.freeze({
        operationRequestId: request.operationRequestId,
        correlationId: conflictAdmission.correlationId,
        result: "blocked",
        resultReasonCode: "operation_request_conflict",
        replayed: false,
        conflict: true,
        externalEffect: "none"
      });
    }
    if (duplicate.result === "succeeded" && duplicate.ownerDisposition === "activate") {
      return Object.freeze({
        operationRequestId: request.operationRequestId,
        correlationId: duplicate.correlationId,
        result: "succeeded",
        resultReasonCode: duplicate.resultReasonCode,
        replayed: true,
        conflict: false,
        activationRecordId: duplicate.activationRecordId,
        activePack: Object.freeze({
          activationRecordId: duplicate.activationRecordId,
          packId: duplicate.packId,
          packVersion: duplicate.packVersion,
          manifestHashSha256: duplicate.manifestHashSha256
        }),
        externalEffect: "none"
      });
    }
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: duplicate.correlationId,
      result: duplicate.result,
      resultReasonCode: duplicate.resultReasonCode,
      replayed: true,
      conflict: false,
      externalEffect: "none"
    });
  }

  let currentActive: M9ActivePackState | undefined;
  try {
    currentActive = getM9ActivePackState(request.stateDirectory);
  } catch (error) {
    // A retired immutable derived tuple must continue to block inquiry, but
    // it must not require deletion of its intact activation evidence before
    // an explicitly Owner-confirmed replacement tuple can be admitted.
    if ((error as Error).message !== "integrity_unavailable: activated pack tuple unavailable") {
      throw error;
    }
  }
  const admission = runM2ForM9Activation({
    operationRequestId: request.operationRequestId,
    operationFingerprintSha256: requestFingerprint,
    stateDirectory: request.stateDirectory,
    ownerDisposition: "activate",
    ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
    reasonCode: request.reasonCode,
    packId: request.packId,
    packVersion: selected?.packVersion ?? "unavailable",
    manifestHashSha256: selected?.manifestHashSha256 ?? "unavailable"
  });
  if (admission.decisionDisposition !== "allow") {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: request.operationRequestId,
      ownerDisposition: "activate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: request.packId,
      packVersion: selected?.packVersion ?? "unavailable",
      manifestHashSha256: selected?.manifestHashSha256 ?? "unavailable",
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: admission.resultReasonCode
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  if (request.ownerConfirmationClaim !== "local_owner_confirmed") {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: request.operationRequestId,
      ownerDisposition: "activate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: request.packId,
      packVersion: selected?.packVersion ?? "unavailable",
      manifestHashSha256: selected?.manifestHashSha256 ?? "unavailable",
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: "owner_confirmation_invalid"
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  if (!selected) {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: request.operationRequestId,
      ownerDisposition: "activate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: request.packId,
      packVersion: "unavailable",
      manifestHashSha256: "unavailable",
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: "pack_not_available"
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  if (
    currentActive &&
    currentActive.packId === selected.packId &&
    currentActive.packVersion === selected.packVersion &&
    currentActive.manifestHashSha256 === selected.manifestHashSha256
  ) {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: currentActive.activationRecordId,
      ownerDisposition: "activate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: selected.packId,
      packVersion: selected.packVersion,
      manifestHashSha256: selected.manifestHashSha256,
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: "already_active_same_tuple"
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  const record = journal.append({
    operationRequestId: request.operationRequestId,
    correlationId: admission.correlationId,
    causationId: request.operationRequestId,
    ownerDisposition: "activate",
    operationFingerprintSha256: requestFingerprint,
    reasonCode: request.reasonCode,
    packId: selected.packId,
    packVersion: selected.packVersion,
    manifestHashSha256: selected.manifestHashSha256,
    ownerConfirmationClaimCategory: "local_owner_confirmed",
    m2IntentId: admission.intentId,
    m2PlanId: admission.planId,
    m2DecisionId: admission.decisionId,
    m2TransactionId: admission.transactionId,
    result: "succeeded",
    resultReasonCode: "owner_local_activation"
  });
  return Object.freeze({
    operationRequestId: request.operationRequestId,
    correlationId: record.correlationId,
    result: "succeeded",
    resultReasonCode: "owner_local_activation",
    replayed: false,
    conflict: false,
    activationRecordId: record.activationRecordId,
    activePack: Object.freeze({
      activationRecordId: record.activationRecordId,
      packId: record.packId,
      packVersion: record.packVersion,
      manifestHashSha256: record.manifestHashSha256
    }),
    externalEffect: "none"
  });
}

export function deactivateApprovedM9Pack(
  request: M9DeactivationRequest
): M9ActivationOperationResult {
  const journal = new M9ActivationJournal(request.stateDirectory);
  const current = getM9ActivePackState(request.stateDirectory);
  const registrations = buildM9Registry();
  const requestedPackTuple = request.requestedPackId
    ? registrations.find((entry) => entry.packId === request.requestedPackId)
    : undefined;
  const requestFingerprint = buildOperationFingerprint({
    operationRequestId: request.operationRequestId,
    ownerDisposition: "deactivate",
    requestedPackId: request.requestedPackId ?? "none",
    requestedPackVersion: requestedPackTuple?.packVersion ?? "none",
    requestedManifestHashSha256: requestedPackTuple?.manifestHashSha256 ?? "none",
    ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
    reasonCode: request.reasonCode
  });
  const duplicate = journal.findByOperationRequestId(request.operationRequestId);
  if (duplicate) {
    if (duplicate.operationFingerprintSha256 !== requestFingerprint) {
      const conflictAdmission = runM2ForM9Activation({
        operationRequestId: request.operationRequestId,
        operationFingerprintSha256: requestFingerprint,
        stateDirectory: request.stateDirectory,
        ownerDisposition: "deactivate",
        ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
        reasonCode: request.reasonCode,
        packId: request.requestedPackId ?? "none",
        packVersion: requestedPackTuple?.packVersion ?? "none",
        manifestHashSha256: requestedPackTuple?.manifestHashSha256 ?? "none"
      });
      return Object.freeze({
        operationRequestId: request.operationRequestId,
        correlationId: conflictAdmission.correlationId,
        result: "blocked",
        resultReasonCode: "operation_request_conflict",
        replayed: false,
        conflict: true,
        externalEffect: "none"
      });
    }
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: duplicate.correlationId,
      result: duplicate.result,
      resultReasonCode: duplicate.resultReasonCode,
      replayed: true,
      conflict: false,
      ...(duplicate.result === "succeeded" && duplicate.ownerDisposition === "deactivate"
        ? { activationRecordId: duplicate.activationRecordId }
        : {}),
      externalEffect: "none"
    });
  }

  const admission = runM2ForM9Activation({
    operationRequestId: request.operationRequestId,
    operationFingerprintSha256: requestFingerprint,
    stateDirectory: request.stateDirectory,
    ownerDisposition: "deactivate",
    ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
    reasonCode: request.reasonCode,
    packId: current?.packId ?? "none",
    packVersion: current?.packVersion ?? "none",
    manifestHashSha256: current?.manifestHashSha256 ?? "none"
  });
  if (admission.decisionDisposition !== "allow") {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: request.operationRequestId,
      ownerDisposition: "deactivate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: current?.packId ?? "none",
      packVersion: current?.packVersion ?? "none",
      manifestHashSha256: current?.manifestHashSha256 ?? "none",
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: admission.resultReasonCode
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  if (request.ownerConfirmationClaim !== "local_owner_confirmed") {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: request.operationRequestId,
      ownerDisposition: "deactivate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: current?.packId ?? "none",
      packVersion: current?.packVersion ?? "none",
      manifestHashSha256: current?.manifestHashSha256 ?? "none",
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: "owner_confirmation_invalid"
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  if (request.requestedPackId && current && request.requestedPackId !== current.packId) {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: current.activationRecordId,
      ownerDisposition: "deactivate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: current.packId,
      packVersion: current.packVersion,
      manifestHashSha256: current.manifestHashSha256,
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: "pack_not_available"
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  if (!current) {
    const blocked = journal.append({
      operationRequestId: request.operationRequestId,
      correlationId: admission.correlationId,
      causationId: request.operationRequestId,
      ownerDisposition: "deactivate",
      operationFingerprintSha256: requestFingerprint,
      reasonCode: request.reasonCode,
      packId: "none",
      packVersion: "none",
      manifestHashSha256: "none",
      ownerConfirmationClaimCategory: claimCategory(request.ownerConfirmationClaim),
      m2IntentId: admission.intentId,
      m2PlanId: admission.planId,
      m2DecisionId: admission.decisionId,
      m2TransactionId: admission.transactionId,
      result: "blocked",
      resultReasonCode: "no_active_pack"
    });
    return Object.freeze({
      operationRequestId: request.operationRequestId,
      correlationId: blocked.correlationId,
      result: "blocked",
      resultReasonCode: blocked.resultReasonCode,
      replayed: false,
      conflict: false,
      externalEffect: "none"
    });
  }
  const record = journal.append({
    operationRequestId: request.operationRequestId,
    correlationId: admission.correlationId,
    causationId: current.activationRecordId,
    ownerDisposition: "deactivate",
    operationFingerprintSha256: requestFingerprint,
    reasonCode: request.reasonCode,
    packId: current.packId,
    packVersion: current.packVersion,
    manifestHashSha256: current.manifestHashSha256,
    ownerConfirmationClaimCategory: "local_owner_confirmed",
    m2IntentId: admission.intentId,
    m2PlanId: admission.planId,
    m2DecisionId: admission.decisionId,
    m2TransactionId: admission.transactionId,
    result: "succeeded",
    resultReasonCode: "owner_local_deactivation"
  });
  return Object.freeze({
    operationRequestId: request.operationRequestId,
    correlationId: record.correlationId,
    result: "succeeded",
    resultReasonCode: "owner_local_deactivation",
    replayed: false,
    conflict: false,
    activationRecordId: record.activationRecordId,
    externalEffect: "none"
  });
}

export function resolveM9PackForActiveInquiry(stateDirectory: string): Readonly<{
  activationRecordId: ImmutableIdentifier;
  packId: string;
  packVersion: string;
  manifestHashSha256: string;
  packDirectory: string;
  contentRoot: string;
}> {
  const active = getM9ActivePackState(stateDirectory);
  if (!active) {
    throw new Error("no_active_pack");
  }
  const pack = findPackByTuple(active.packId, active.packVersion, active.manifestHashSha256);
  if (!pack) {
    throw new Error("integrity_unavailable");
  }
  return Object.freeze({
    activationRecordId: active.activationRecordId,
    packId: active.packId,
    packVersion: active.packVersion,
    manifestHashSha256: active.manifestHashSha256,
    packDirectory: pack.packDirectory,
    contentRoot: path.resolve(pack.packDirectory, "content")
  });
}

export function createM9OperationRequestId(): ImmutableIdentifier {
  return createImmutableIdentifier("m9_operation_request");
}

export function getApprovedPackRootForDisplay(): string {
  return resolveApprovedM9PackRoot();
}

export function getM9M3CapabilityId(): string {
  return M6_M3_CAPABILITY_ID;
}
