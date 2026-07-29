import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import {
  M4_SCHEMA_VERSION,
  type RecoveryCaseRecord,
  type RecoveryFailureCategory
} from "./types.js";
import { M4TraceService, computeM4IntegrityHash, createM4Metadata } from "./traceService.js";

export class RecoveryCoordinator {
  private readonly traceService: M4TraceService;

  public constructor(traceService: M4TraceService) {
    this.traceService = traceService;
  }

  public openCase(input: {
    correlationId: CorrelationId;
    attestationRequestId: ImmutableIdentifier;
    attestationId?: ImmutableIdentifier;
    failureCategory: RecoveryFailureCategory;
    affectedReferences: readonly string[];
    reason: string;
  }): RecoveryCaseRecord {
    const commandId = createCommandId("open_recovery_case");
    const base = createM4Metadata({
      commandId,
      correlationId: input.correlationId,
      schemaVersion: M4_SCHEMA_VERSION
    });
    const withoutIntegrity: Omit<RecoveryCaseRecord, "integrityHash"> = {
      ...base,
      recoveryCaseId: createImmutableIdentifier("m4_recovery_case"),
      attestationRequestId: input.attestationRequestId,
      ...(input.attestationId ? { attestationId: input.attestationId } : {}),
      failureCategory: input.failureCategory,
      restrictionState: "reconstruction_and_explanation_only",
      recoveryDisposition: "preserve_evidence_and_reconstruct_only",
      affectedReferences: Object.freeze([...input.affectedReferences].slice(0, 12)),
      status: "open"
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeM4IntegrityHash(withoutIntegrity)
    } satisfies RecoveryCaseRecord);

    this.traceService.appendDomainEvent({
      eventType: "RecoveryCaseOpened",
      owner: "RecoveryCoordinator",
      status: "denied",
      commandName: "OpenRecoveryCase",
      commandId,
      correlationId: input.correlationId,
      payloadSummary: `category=${input.failureCategory}; attestationRequestId=${input.attestationRequestId}`,
      commandFingerprint: M4TraceService.fingerprint({ record, reason: input.reason }),
      commandResult: {
        accepted: false,
        status: "denied",
        reason: input.reason,
        eventType: "RecoveryCaseOpened",
        recordKind: "recovery_case",
        recordId: record.recoveryCaseId
      },
      recordKind: "recovery_case",
      record
    });

    return record;
  }
}
