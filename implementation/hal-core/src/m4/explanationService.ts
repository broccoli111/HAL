import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { M4_SCHEMA_VERSION, type ExplanationRecord, type FinalOutcomeStatus } from "./types.js";
import { M4TraceService, computeM4IntegrityHash, createM4Metadata } from "./traceService.js";

export class ExplanationService {
  private readonly traceService: M4TraceService;

  public constructor(traceService: M4TraceService) {
    this.traceService = traceService;
  }

  public issueExplanation(input: {
    correlationId: CorrelationId;
    attestationId: ImmutableIdentifier;
    recoveryCaseId?: ImmutableIdentifier;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    requestedCapabilityId: string;
    m3AttemptRan: boolean;
    decisionDisposition: string;
    verificationResult: string;
    evidenceIds: readonly string[];
    recoveryRestriction?: string;
  }): ExplanationRecord {
    const commandId = createCommandId("issue_explanation");
    const base = createM4Metadata({
      commandId,
      correlationId: input.correlationId,
      schemaVersion: M4_SCHEMA_VERSION
    });
    const boundedExplanation = this.buildBoundedExplanation(input);
    const withoutIntegrity: Omit<ExplanationRecord, "integrityHash"> = {
      ...base,
      explanationId: createImmutableIdentifier("m4_explanation"),
      attestationId: input.attestationId,
      ...(input.recoveryCaseId ? { recoveryCaseId: input.recoveryCaseId } : {}),
      finalOutcomeStatus: input.finalOutcomeStatus,
      claimedEffect: input.claimedEffect,
      boundedExplanation,
      status: "issued"
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeM4IntegrityHash(withoutIntegrity)
    } satisfies ExplanationRecord);

    this.traceService.appendDomainEvent({
      eventType: "ExplanationIssued",
      owner: "ExplanationService",
      status: "applied",
      commandName: "IssueExplanation",
      commandId,
      correlationId: input.correlationId,
      payloadSummary: `attestationId=${input.attestationId}; outcome=${input.finalOutcomeStatus}`,
      commandFingerprint: M4TraceService.fingerprint(record),
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Explanation issued.",
        eventType: "ExplanationIssued",
        recordKind: "explanation",
        recordId: record.explanationId
      },
      recordKind: "explanation",
      record
    });

    return record;
  }

  private buildBoundedExplanation(input: {
    requestedCapabilityId: string;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    m3AttemptRan: boolean;
    decisionDisposition: string;
    verificationResult: string;
    evidenceIds: readonly string[];
    recoveryRestriction?: string;
  }): string {
    const evidence = input.evidenceIds.slice(0, 6).join(",");
    const lines = [
      `capability=${sanitize(input.requestedCapabilityId)}`,
      `finalOutcome=${input.finalOutcomeStatus}; claimedEffect=${input.claimedEffect}`,
      `m3AttemptRan=${input.m3AttemptRan}; decision=${sanitize(input.decisionDisposition)}; verification=${sanitize(input.verificationResult)}`,
      `evidenceRefs=${sanitize(evidence)}`,
      "externalEffect=none"
    ];
    if (input.recoveryRestriction) {
      lines.push(`restriction=${sanitize(input.recoveryRestriction)}`);
    }
    return lines.join(" | ").slice(0, 600);
  }
}

function sanitize(value: string): string {
  return value.replace(/\s+/g, " ").replace(/[\\/]/g, "_").trim().slice(0, 140);
}
