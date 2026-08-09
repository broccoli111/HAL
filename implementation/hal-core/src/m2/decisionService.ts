import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService, createM2Metadata } from "./auditService.js";
import type { DecisionRecord, IntentRecord, PlanRecord, RecordDecisionCommand } from "./types.js";
import { M2_SCHEMA_VERSION } from "./types.js";

export type RecordDecisionResponse = Readonly<{
  result: "applied" | "duplicate" | "denied";
  reason: string;
  decisionRecord?: DecisionRecord;
  eventId?: ImmutableIdentifier;
}>;

export class DecisionService {
  private readonly auditService: AuditService;

  public constructor(auditService: AuditService) {
    this.auditService = auditService;
  }

  public recordDecision(command: RecordDecisionCommand): RecordDecisionResponse {
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
      payloadSummary: `intentId=${command.payload.intentId}; planId=${command.payload.planId}`
    });

    if (claim.kind === "duplicate") {
      const existingDecision = claim.existing.result.recordId
        ? this.auditService.getRecordById<DecisionRecord>(
            "decision",
            claim.existing.result.recordId
          )
        : undefined;
      return Object.freeze({
        result: "duplicate",
        reason: "Duplicate command ID with identical payload returned original disposition.",
        ...(existingDecision ? { decisionRecord: existingDecision } : {})
      });
    }
    if (claim.kind === "conflict") {
      return Object.freeze({
        result: "denied",
        reason: "Conflicting command ID reuse denied and audited."
      });
    }

    const intent = this.auditService.getRecordById<IntentRecord>(
      "intent",
      command.payload.intentId
    );
    const plan = this.auditService.getRecordById<PlanRecord>("plan", command.payload.planId);
    const missing = !intent || !plan || plan.intentId !== intent.intentId;
    const correlationMismatch =
      (intent?.correlationId ?? command.correlationId) !== command.correlationId ||
      (plan?.correlationId ?? command.correlationId) !== command.correlationId;
    if (missing || correlationMismatch) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "DecisionService",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Missing, stale, or mismatched intent/plan references.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Decision denied: missing, stale, or correlation-mismatched references.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Decision denied: missing, stale, or correlation-mismatched references.",
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
      decisionId: createImmutableIdentifier("decision"),
      intentId: intent.intentId,
      planId: plan.planId,
      disposition: command.payload.disposition,
      reason: command.payload.reason,
      uncertainty: command.payload.uncertainty,
      status: "recorded"
    } satisfies DecisionRecord);

    const event = this.auditService.recordCommandEvent({
      eventType: "DecisionRecorded",
      owner: "DecisionService",
      status: "applied",
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      payloadSummary: `decisionId=${record.decisionId}; disposition=${record.disposition}`,
      commandFingerprint: fingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Decision recorded.",
        eventType: "DecisionRecorded",
        recordKind: "decision",
        recordId: record.decisionId
      },
      recordKind: "decision",
      record
    });

    return Object.freeze({
      result: "applied",
      reason: "Decision recorded.",
      decisionRecord: record,
      eventId: event.eventRecordId
    });
  }
}
