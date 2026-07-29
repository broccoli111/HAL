import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService, createM2Metadata } from "./auditService.js";
import type { IntentRecord, PlanRecord, ProposePlanCommand } from "./types.js";
import { M2_SCHEMA_VERSION } from "./types.js";

export type ProposePlanResponse = Readonly<{
  result: "applied" | "duplicate" | "denied";
  reason: string;
  planRecord?: PlanRecord;
  eventId?: ImmutableIdentifier;
}>;

export class Planner {
  private readonly auditService: AuditService;

  public constructor(auditService: AuditService) {
    this.auditService = auditService;
  }

  public proposePlan(command: ProposePlanCommand): ProposePlanResponse {
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
      payloadSummary: `intentId=${command.payload.intentId}`
    });

    if (claim.kind === "duplicate") {
      const existingPlan = claim.existing.result.recordId
        ? this.auditService.getRecordById<PlanRecord>("plan", claim.existing.result.recordId)
        : undefined;
      return Object.freeze({
        result: "duplicate",
        reason: "Duplicate command ID with identical payload returned original disposition.",
        ...(existingPlan ? { planRecord: existingPlan } : {})
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
    if (!intent || intent.correlationId !== command.correlationId) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "Planner",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Missing or mismatched intent reference.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Plan denied: referenced intent missing or correlation mismatched.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Plan denied: referenced intent missing or correlation mismatched.",
        eventId: event.eventRecordId
      });
    }

    if (command.payload.boundedSteps.length === 0) {
      const event = this.auditService.recordCommandEvent({
        eventType: "CommandRejected",
        owner: "Planner",
        status: "denied",
        commandName: command.commandName,
        commandId: command.commandId,
        correlationId: command.correlationId,
        ...causation,
        payloadSummary: "Malformed plan with no bounded steps.",
        commandFingerprint: fingerprint,
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Plan denied: boundedSteps must be non-empty.",
          eventType: "CommandRejected"
        }
      });
      return Object.freeze({
        result: "denied",
        reason: "Plan denied: boundedSteps must be non-empty.",
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
      planId: createImmutableIdentifier("plan"),
      intentId: intent.intentId,
      boundedSteps: Object.freeze([...command.payload.boundedSteps]),
      constraints: Object.freeze([...command.payload.constraints]),
      assumptions: Object.freeze([...command.payload.assumptions]),
      riskSummary: command.payload.riskSummary,
      status: "proposed"
    } satisfies PlanRecord);

    const event = this.auditService.recordCommandEvent({
      eventType: "PlanProposed",
      owner: "Planner",
      status: "applied",
      commandName: command.commandName,
      commandId: command.commandId,
      correlationId: command.correlationId,
      ...causation,
      payloadSummary: `planId=${record.planId}`,
      commandFingerprint: fingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Plan proposed.",
        eventType: "PlanProposed",
        recordKind: "plan",
        recordId: record.planId
      },
      recordKind: "plan",
      record
    });

    return Object.freeze({
      result: "applied",
      reason: "Plan proposed.",
      planRecord: record,
      eventId: event.eventRecordId
    });
  }
}
