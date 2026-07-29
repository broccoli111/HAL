import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService, createM2Metadata } from "./auditService.js";
import type { AttachEvidenceCommand, EvidenceRecord, TransactionRecord } from "./types.js";
import { M2_SCHEMA_VERSION } from "./types.js";

export type AttachEvidenceResponse = Readonly<{
  result: "applied" | "duplicate" | "denied";
  reason: string;
  evidenceRecord?: EvidenceRecord;
  eventId?: ImmutableIdentifier;
}>;

export class EvidenceService {
  private readonly auditService: AuditService;

  public constructor(auditService: AuditService) {
    this.auditService = auditService;
  }

  public attachEvidence(command: AttachEvidenceCommand): AttachEvidenceResponse {
    const fingerprint = AuditService.fingerprintCommand(command.commandName, command);
    const causation = command.causationEventId
      ? { causationEventId: command.causationEventId }
      : {};
    const claim = this.auditService.claimCommand({
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      commandFingerprint: fingerprint,
      payloadSummary: `subjectId=${command.payload.subjectId}`
    });

    if (claim.kind === "duplicate") {
      const existingEvidence = claim.existing.result.recordId
        ? this.auditService.getRecordById<EvidenceRecord>(
            "evidence",
            claim.existing.result.recordId
          )
        : undefined;
      return Object.freeze({
        result: "duplicate",
        reason: "Duplicate command ID with identical payload returned original disposition.",
        ...(existingEvidence ? { evidenceRecord: existingEvidence } : {})
      });
    }
    if (claim.kind === "conflict") {
      return Object.freeze({
        result: "denied",
        reason: "Conflicting command ID reuse denied and audited."
      });
    }

    const transaction = this.auditService.getRecordById<TransactionRecord>(
      "transaction",
      command.payload.subjectId
    );
    const invalidReference =
      !transaction ||
      transaction.correlationId !== command.correlationId ||
      command.payload.subjectKind !== "transaction";
    if (invalidReference || !command.payload.claim.trim()) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "EvidenceService",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Evidence denied: missing/mismatched transaction reference or claim.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Evidence denied: missing reference, correlation mismatch, or malformed claim.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Evidence denied: missing reference, correlation mismatch, or malformed claim.",
        eventId: event.eventRecordId
      });
    }

    const record = Object.freeze({
      ...createM2Metadata({
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        schemaVersion: M2_SCHEMA_VERSION
      }),
      evidenceId: createImmutableIdentifier("evidence"),
      subjectKind: "transaction",
      subjectId: command.payload.subjectId,
      claim: command.payload.claim,
      confidence: command.payload.confidence,
      status: "attached"
    } satisfies EvidenceRecord);

    const event = this.auditService.recordCommandEvent({
      eventType: "EvidenceAttached",
      owner: "EvidenceService",
      status: "applied",
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      payloadSummary: `evidenceId=${record.evidenceId}`,
      commandFingerprint: fingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Evidence attached.",
        eventType: "EvidenceAttached",
        recordKind: "evidence",
        recordId: record.evidenceId
      },
      recordKind: "evidence",
      record
    });

    return Object.freeze({
      result: "applied",
      reason: "Evidence attached.",
      evidenceRecord: record,
      eventId: event.eventRecordId
    });
  }
}
