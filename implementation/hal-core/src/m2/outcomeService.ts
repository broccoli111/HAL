import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService, createM2Metadata } from "./auditService.js";
import type {
  ClaimedEffect,
  DecisionRecord,
  FinalizeOutcomeCommand,
  IntentRecord,
  OutcomeRecord,
  OutcomeStatus,
  TransactionRecord
} from "./types.js";
import { M2_SCHEMA_VERSION } from "./types.js";

export type FinalizeOutcomeResponse = Readonly<{
  result: "applied" | "duplicate" | "denied";
  reason: string;
  outcomeRecord?: OutcomeRecord;
  eventId?: ImmutableIdentifier;
}>;

export class OutcomeService {
  private readonly auditService: AuditService;

  public constructor(auditService: AuditService) {
    this.auditService = auditService;
  }

  public finalizeOutcome(command: FinalizeOutcomeCommand): FinalizeOutcomeResponse {
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
      payloadSummary: `transactionId=${command.payload.transactionId}`
    });

    if (claim.kind === "duplicate") {
      const existingOutcome = claim.existing.result.recordId
        ? this.auditService.getRecordById<OutcomeRecord>("outcome", claim.existing.result.recordId)
        : undefined;
      return Object.freeze({
        result: "duplicate",
        reason: "Duplicate command ID with identical payload returned original disposition.",
        ...(existingOutcome ? { outcomeRecord: existingOutcome } : {})
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
      command.payload.transactionId
    );
    const decision = this.auditService.getRecordById<DecisionRecord>(
      "decision",
      command.payload.decisionId
    );
    const intent = this.auditService.getRecordById<IntentRecord>(
      "intent",
      command.payload.intentId
    );
    const missingReference = !transaction || !decision || !intent;
    const staleReference =
      !!transaction &&
      !!decision &&
      !!intent &&
      (transaction.intentId !== intent.intentId ||
        transaction.decisionId !== decision.decisionId ||
        decision.intentId !== intent.intentId);
    const correlationMismatch =
      (transaction?.correlationId ?? command.correlationId) !== command.correlationId ||
      (decision?.correlationId ?? command.correlationId) !== command.correlationId ||
      (intent?.correlationId ?? command.correlationId) !== command.correlationId;
    if (
      missingReference ||
      staleReference ||
      correlationMismatch ||
      !command.payload.summary.trim()
    ) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "OutcomeService",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Outcome denied: missing/stale/mismatched references or malformed summary.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason:
            "Outcome denied: missing references, stale links, correlation mismatch, or malformed summary.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason:
          "Outcome denied: missing references, stale links, correlation mismatch, or malformed summary.",
        eventId: event.eventRecordId
      });
    }

    const transactionRecord = transaction as TransactionRecord;
    const decisionRecord = decision as DecisionRecord;
    const intentRecord = intent as IntentRecord;

    const derivedStatus = deriveOutcomeStatus(decisionRecord, transactionRecord);
    const derivedClaimedEffect = deriveOutcomeClaimedEffect(decisionRecord, transactionRecord);
    if (
      command.payload.status !== derivedStatus ||
      command.payload.claimedEffect !== derivedClaimedEffect
    ) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "OutcomeService",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Outcome command payload mismatch with derived decision/transaction state.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason:
            "Outcome denied: payload status/effect conflicts with referenced decision/transaction.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason:
          "Outcome denied: payload status/effect conflicts with referenced decision/transaction.",
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
      outcomeId: createImmutableIdentifier("outcome"),
      intentId: intentRecord.intentId,
      transactionId: command.payload.transactionId,
      decisionId: command.payload.decisionId,
      status: derivedStatus,
      summary: command.payload.summary,
      claimedEffect: derivedClaimedEffect
    } satisfies OutcomeRecord);

    const event = this.auditService.recordCommandEvent({
      eventType: "OutcomeFinalized",
      owner: "OutcomeService",
      status: "applied",
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      payloadSummary: `outcomeId=${record.outcomeId}; status=${record.status}`,
      commandFingerprint: fingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Outcome finalized.",
        eventType: "OutcomeFinalized",
        recordKind: "outcome",
        recordId: record.outcomeId
      },
      recordKind: "outcome",
      record
    });

    return Object.freeze({
      result: "applied",
      reason: "Outcome finalized.",
      outcomeRecord: record,
      eventId: event.eventRecordId
    });
  }
}

function deriveOutcomeStatus(
  decision: DecisionRecord,
  transaction: TransactionRecord
): OutcomeStatus {
  if (transaction.status === "cancelled") {
    return "cancelled_no_effect";
  }
  if (transaction.status === "completed_without_effect") {
    return "achieved_without_effect";
  }
  return decision.disposition === "approval_required"
    ? "awaiting_approval_no_effect"
    : "not_achieved_no_effect";
}

function deriveOutcomeClaimedEffect(
  decision: DecisionRecord,
  transaction: TransactionRecord
): ClaimedEffect {
  if (decision.disposition === "allow" && transaction.status === "completed_without_effect") {
    return transaction.claimedEffect;
  }
  return "none";
}
