import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService, createM2Metadata } from "./auditService.js";
import type { IntentRecord, RecordIntentCommand } from "./types.js";
import { M2_SCHEMA_VERSION } from "./types.js";

export type RecordIntentResponse = Readonly<{
  result: "applied" | "duplicate" | "denied";
  reason: string;
  intentRecord?: IntentRecord;
  eventId?: ImmutableIdentifier;
}>;

export class IntentManager {
  private readonly auditService: AuditService;

  public constructor(auditService: AuditService) {
    this.auditService = auditService;
  }

  public recordIntent(command: RecordIntentCommand): RecordIntentResponse {
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
      payloadSummary: `requestId=${command.payload.request.requestId}`
    });

    if (claim.kind === "duplicate") {
      const existingIntent = claim.existing.result.recordId
        ? this.auditService.getRecordById<IntentRecord>("intent", claim.existing.result.recordId)
        : undefined;
      return Object.freeze({
        result: "duplicate",
        reason: "Duplicate command ID with identical payload returned original disposition.",
        ...(existingIntent ? { intentRecord: existingIntent } : {})
      });
    }

    if (claim.kind === "conflict") {
      return Object.freeze({
        result: "denied",
        reason: "Conflicting command ID reuse denied and audited."
      });
    }

    const request = command.payload.request;
    if (
      !request.declaredAction.trim() ||
      !request.declaredPurpose.trim() ||
      !request.declaredTarget.trim() ||
      request.correlationId !== command.correlationId
    ) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "IntentManager",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Malformed request rejected or correlation mismatched.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Malformed request payload or correlation mismatch.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Malformed request payload or correlation mismatch.",
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
      intentId: createImmutableIdentifier("intent"),
      requestId: request.requestId,
      declaredAction: request.declaredAction,
      declaredTarget: request.declaredTarget,
      declaredPurpose: request.declaredPurpose,
      status: "recorded"
    } satisfies IntentRecord);

    const event = this.auditService.recordCommandEvent({
      eventType: "IntentRecorded",
      owner: "IntentManager",
      status: "applied",
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      payloadSummary: `intentId=${record.intentId}`,
      commandFingerprint: fingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Intent recorded.",
        eventType: "IntentRecorded",
        recordKind: "intent",
        recordId: record.intentId
      },
      recordKind: "intent",
      record
    });

    return Object.freeze({
      result: "applied",
      reason: "Intent recorded.",
      intentRecord: record,
      eventId: event.eventRecordId
    });
  }
}
