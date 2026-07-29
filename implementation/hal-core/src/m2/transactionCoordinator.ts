import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService, createM2Metadata } from "./auditService.js";
import type {
  DecisionRecord,
  IntentRecord,
  OpenTransactionCommand,
  PlanRecord,
  TransactionRecord
} from "./types.js";
import { M2_SCHEMA_VERSION } from "./types.js";

export type OpenTransactionResponse = Readonly<{
  result: "applied" | "duplicate" | "denied";
  reason: string;
  transactionRecord?: TransactionRecord;
  eventId?: ImmutableIdentifier;
}>;

export class TransactionCoordinator {
  private readonly auditService: AuditService;

  public constructor(auditService: AuditService) {
    this.auditService = auditService;
  }

  public openTransaction(command: OpenTransactionCommand): OpenTransactionResponse {
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
      payloadSummary: `decisionId=${command.payload.decisionId}`
    });

    if (claim.kind === "duplicate") {
      const existingTransaction = claim.existing.result.recordId
        ? this.auditService.getRecordById<TransactionRecord>(
            "transaction",
            claim.existing.result.recordId
          )
        : undefined;
      return Object.freeze({
        result: "duplicate",
        reason: "Duplicate command ID with identical payload returned original disposition.",
        ...(existingTransaction ? { transactionRecord: existingTransaction } : {})
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
    const decision = this.auditService.getRecordById<DecisionRecord>(
      "decision",
      command.payload.decisionId
    );
    const stale =
      !intent ||
      !plan ||
      !decision ||
      decision.intentId !== intent.intentId ||
      decision.planId !== plan.planId;
    const correlationMismatch =
      (intent?.correlationId ?? command.correlationId) !== command.correlationId ||
      (plan?.correlationId ?? command.correlationId) !== command.correlationId ||
      (decision?.correlationId ?? command.correlationId) !== command.correlationId;
    if (stale || correlationMismatch) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "TransactionCoordinator",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Missing, stale, or mismatched transaction references.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Transaction denied: missing, stale, or correlation-mismatched references.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Transaction denied: missing, stale, or correlation-mismatched references.",
        eventId: event.eventRecordId
      });
    }

    const intentRecord = intent as IntentRecord;
    const planRecord = plan as PlanRecord;
    const decisionRecord = decision as DecisionRecord;

    const expectedStatus =
      decisionRecord.disposition === "allow" ? "completed_without_effect" : "blocked";
    const expectedClaimedEffect =
      decisionRecord.disposition === "allow" ? "inspection_only" : "none";
    const commandIsConsistent =
      command.payload.declaredEffectClass === "local_synthetic_inspection" &&
      command.payload.status === expectedStatus &&
      command.payload.claimedEffect === expectedClaimedEffect;
    if (!commandIsConsistent) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "TransactionCoordinator",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Decision/transaction consistency violation at transaction creation.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Transaction denied: status/effect does not match referenced decision.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Transaction denied: status/effect does not match referenced decision.",
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
      transactionId: createImmutableIdentifier("transaction"),
      intentId: intentRecord.intentId,
      planId: planRecord.planId,
      decisionId: decisionRecord.decisionId,
      status: expectedStatus,
      declaredEffectClass: "local_synthetic_inspection",
      claimedEffect: expectedClaimedEffect,
      recoveryDisposition: "reconstruct_from_journal"
    } satisfies TransactionRecord);

    const event = this.auditService.recordCommandEvent({
      eventType: "TransactionOpened",
      owner: "TransactionCoordinator",
      status: "applied",
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      payloadSummary: `transactionId=${record.transactionId}; status=${record.status}`,
      commandFingerprint: fingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Transaction opened.",
        eventType: "TransactionOpened",
        recordKind: "transaction",
        recordId: record.transactionId
      },
      recordKind: "transaction",
      record
    });

    return Object.freeze({
      result: "applied",
      reason: "Transaction opened.",
      transactionRecord: record,
      eventId: event.eventRecordId
    });
  }
}
