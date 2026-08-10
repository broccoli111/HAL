import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { reconstructM2Trace, type ReconstructedTrace } from "../m2/index.js";
import {
  M3TraceService,
  type ExecutionAttemptRecord,
  type VerificationRecord
} from "../m3/index.js";
import type { ArtifactRecord, CapabilityRequestRecord } from "../m3/index.js";
import type { M3EventRecord } from "../m3/types.js";
import { ExplanationService } from "./explanationService.js";
import { RecoveryCoordinator } from "./recoveryCoordinator.js";
import { M4TraceService, computeM4IntegrityHash, createM4Metadata } from "./traceService.js";
import {
  M4_SCHEMA_VERSION,
  type FinalOutcomeStatus,
  type FinalizeOutcomeAttestationInput,
  type OutcomeAttestationRecord
} from "./types.js";
import { M6_M3_CAPABILITY_ID } from "../m3/types.js";
import { M6EvidenceJournal } from "../m6/evidenceJournal.js";
import { loadApprovedSyntheticCorpus, loadSyntheticCorpusFromRootForTest } from "../m6/corpus.js";
import { renderM6Response } from "../m6/response.js";
import type { M6MatchOutcome, M6SelectedDocument, M6SelectedSection } from "../m6/types.js";
import { listApprovedPacks } from "../m9/validator.js";

export type FinalAttestationResult = Readonly<{
  attestation: OutcomeAttestationRecord;
  recoveryCaseId: ImmutableIdentifier | undefined;
  explanationId: ImmutableIdentifier;
}>;

export class OutcomeAttestationService {
  private readonly stateDirectory: string;
  private readonly traceService: M4TraceService;
  private readonly recoveryCoordinator: RecoveryCoordinator;
  private readonly explanationService: ExplanationService;

  public constructor(input: {
    stateDirectory: string;
    traceService: M4TraceService;
    recoveryCoordinator: RecoveryCoordinator;
    explanationService: ExplanationService;
  }) {
    this.stateDirectory = path.resolve(input.stateDirectory);
    this.traceService = input.traceService;
    this.recoveryCoordinator = input.recoveryCoordinator;
    this.explanationService = input.explanationService;
  }

  public finalizeOutcomeAttestation(
    request: FinalizeOutcomeAttestationInput
  ): FinalAttestationResult {
    const commandId = createCommandId("finalize_outcome_attestation");
    const requestFingerprint = M4TraceService.fingerprint(request);
    if (!request.requestedCapabilityId.trim()) {
      return this.rejectRequestAndThrow({
        request,
        commandId,
        requestFingerprint,
        reason: "Malformed request: requestedCapabilityId is required."
      });
    }

    const claim = this.traceService.claimAttestationRequest({
      attestationRequestId: request.attestationRequestId,
      correlationId: request.correlationId,
      commandFingerprint: requestFingerprint,
      payloadSummary: `attestationRequestId=${request.attestationRequestId}`
    });
    if (claim.kind === "duplicate") {
      const existing = this.findAttestationByRequestId(request.attestationRequestId);
      if (!existing) {
        throw new Error(
          "Duplicate attestation request matched index but attestation record is missing."
        );
      }
      const explanation = this.findExplanationByAttestationId(existing.attestationId);
      if (!explanation) {
        throw new Error("Duplicate attestation request matched but explanation record is missing.");
      }
      const recovery = this.findRecoveryByAttestationId(existing.attestationId);
      return Object.freeze({
        attestation: existing,
        recoveryCaseId: recovery?.recoveryCaseId,
        explanationId: explanation.explanationId
      });
    }
    if (claim.kind === "conflict") {
      throw new Error("Attestation request ID reuse conflict denied.");
    }

    let m2Trace: ReconstructedTrace | undefined;
    let m3Events: readonly M3EventRecord[];
    try {
      m2Trace = reconstructM2Trace(this.stateDirectory, request.correlationId);
    } catch (error) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: false,
        verificationPassed: false,
        uncertainty: "m2_journal_unreadable",
        evidenceSummary: "M2 reconstruction failed.",
        failureCategory: "m2_journal_integrity_failure",
        failureReason: `M2 journal integrity validation failed: ${(error as Error).message}`,
        affectedReferences: ["m2_journal"]
      });
    }

    try {
      const m3Trace = new M3TraceService(this.stateDirectory);
      m3Events = m3Trace.listEventsByCorrelationId(request.correlationId);
    } catch (error) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: false,
        verificationPassed: false,
        uncertainty: "m3_journal_unreadable",
        evidenceSummary: "M3 reconstruction failed.",
        failureCategory: "m3_journal_integrity_failure",
        failureReason: `M3 journal integrity validation failed: ${(error as Error).message}`,
        affectedReferences: ["m3_journal"]
      });
    }

    const disposition = m2Trace.summary.disposition;
    const terminal = this.deriveM3TerminalEvidence(m3Events);
    const requestedCapabilityId = request.requestedCapabilityId;

    if (disposition !== "allow") {
      return this.attestWithoutRecovery({
        request,
        commandId,
        requestFingerprint,
        requestedCapabilityId,
        m2Trace,
        terminal,
        finalOutcomeStatus: "blocked",
        claimedEffect: "none",
        uncertainty: `m2_disposition_${disposition ?? "missing"}`
      });
    }

    if (!terminal.capabilityRequest || !terminal.attempt) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: Boolean(terminal.attempt),
        verificationPassed: false,
        uncertainty: "missing_m3_request_or_attempt",
        evidenceSummary: "M3 request/attempt evidence missing.",
        failureCategory: "missing_evidence",
        failureReason: "Required M3 request/attempt evidence is missing.",
        affectedReferences: ["m3_capability_request", "m3_execution_attempt"]
      });
    }

    if (
      terminal.capabilityRequest.correlationId !== request.correlationId ||
      terminal.capabilityRequest.decisionId !==
        (m2Trace.summary.decisionId as unknown as ImmutableIdentifier) ||
      terminal.capabilityRequest.transactionId !==
        (m2Trace.summary.transactionId as unknown as ImmutableIdentifier) ||
      terminal.capabilityRequest.intentId !==
        (m2Trace.summary.intentId as unknown as ImmutableIdentifier) ||
      terminal.capabilityRequest.planId !==
        (m2Trace.summary.planId as unknown as ImmutableIdentifier)
    ) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: true,
        verificationPassed: false,
        uncertainty: "m2_m3_linkage_mismatch",
        evidenceSummary: "M2/M3 linked identifiers mismatch.",
        failureCategory: "evidence_linkage_mismatch",
        failureReason: "M2 and M3 record linkages mismatch.",
        affectedReferences: [
          "intentId",
          "planId",
          "decisionId",
          "transactionId",
          "capabilityRequestId"
        ]
      });
    }

    if (request.expectedM3CapabilityRequestId) {
      if (
        terminal.capabilityRequest.capabilityRequestId !== request.expectedM3CapabilityRequestId
      ) {
        return this.attestWithRecovery({
          request,
          commandId,
          requestFingerprint,
          finalOutcomeStatus: "incomplete_evidence_no_effect",
          claimedEffect: "none",
          m3AttemptRan: true,
          verificationPassed: false,
          uncertainty: "unexpected_capability_request_id",
          evidenceSummary: "Capability request ID did not match expected request.",
          failureCategory: "evidence_linkage_mismatch",
          failureReason: "Expected M3 capability request ID mismatch.",
          affectedReferences: ["expectedM3CapabilityRequestId"]
        });
      }
    }

    if (request.requestedCapabilityId !== terminal.capabilityRequest.capabilityId) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: true,
        verificationPassed: false,
        uncertainty: "capability_identity_mismatch",
        evidenceSummary:
          "Requested capability does not match attested M3 capability request record.",
        failureCategory: "evidence_linkage_mismatch",
        failureReason:
          "Capability identity mismatch between attestation request and M3 capability request.",
        affectedReferences: ["requestedCapabilityId", "capabilityRequest.capabilityId"]
      });
    }

    if (terminal.attempt.capabilityRequestId !== terminal.capabilityRequest.capabilityRequestId) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: true,
        verificationPassed: false,
        uncertainty: "attempt_to_request_linkage_mismatch",
        evidenceSummary:
          "Execution attempt linkage does not match selected capability request record.",
        failureCategory: "evidence_linkage_mismatch",
        failureReason:
          "Execution attempt capabilityRequestId mismatches selected capability request capabilityRequestId.",
        affectedReferences: [
          "executionAttempt.capabilityRequestId",
          "capabilityRequest.capabilityRequestId"
        ]
      });
    }

    const attempt = terminal.attempt;
    if (attempt.status === "cancelled") {
      return this.attestWithoutRecovery({
        request,
        commandId,
        requestFingerprint,
        requestedCapabilityId,
        m2Trace,
        terminal,
        finalOutcomeStatus: "cancelled_no_effect",
        claimedEffect: "none",
        uncertainty: "attempt_cancelled"
      });
    }
    if (attempt.status === "timed_out") {
      return this.attestWithoutRecovery({
        request,
        commandId,
        requestFingerprint,
        requestedCapabilityId,
        m2Trace,
        terminal,
        finalOutcomeStatus: "timed_out_no_effect",
        claimedEffect: "none",
        uncertainty: "attempt_timed_out"
      });
    }
    if (attempt.status === "failed") {
      return this.attestWithoutRecovery({
        request,
        commandId,
        requestFingerprint,
        requestedCapabilityId,
        m2Trace,
        terminal,
        finalOutcomeStatus: "failed_no_effect",
        claimedEffect: "none",
        uncertainty: "attempt_failed"
      });
    }
    if (attempt.status !== "succeeded") {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: true,
        verificationPassed: false,
        uncertainty: `unexpected_attempt_status_${attempt.status}`,
        evidenceSummary: "Unexpected attempt status for final attestation.",
        failureCategory: "missing_evidence",
        failureReason: `Unexpected attempt status: ${attempt.status}`,
        affectedReferences: ["executionAttempt.status"]
      });
    }

    const verification = terminal.verification;
    const artifact = terminal.artifact;
    if (!verification || !artifact) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus: "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: true,
        verificationPassed: false,
        uncertainty: "missing_verification_or_artifact",
        evidenceSummary: "Required verification/artifact evidence missing.",
        failureCategory: "missing_evidence",
        failureReason: "Verification or artifact record missing for succeeded attempt.",
        affectedReferences: ["verificationId", "artifactId"]
      });
    }

    const verificationOutcome = this.validateVerificationAndArtifact({
      request,
      terminal,
      verification,
      artifact
    });
    if (!verificationOutcome.valid) {
      return this.attestWithRecovery({
        request,
        commandId,
        requestFingerprint,
        finalOutcomeStatus:
          verificationOutcome.category === "verification_rejected" ||
          verificationOutcome.category === "artifact_integrity_failure"
            ? "verification_rejected_no_effect"
            : "incomplete_evidence_no_effect",
        claimedEffect: "none",
        m3AttemptRan: true,
        verificationPassed: false,
        uncertainty: verificationOutcome.uncertainty,
        evidenceSummary: verificationOutcome.reason,
        failureCategory: verificationOutcome.category,
        failureReason: verificationOutcome.reason,
        affectedReferences: verificationOutcome.affectedReferences
      });
    }

    if (request.requestedCapabilityId === M6_M3_CAPABILITY_ID) {
      const m6Outcome = this.validateM6EvidenceConsistency({
        request,
        m2Trace,
        terminal,
        artifact
      });
      if (!m6Outcome.valid) {
        return this.attestWithRecovery({
          request,
          commandId,
          requestFingerprint,
          finalOutcomeStatus: "incomplete_evidence_no_effect",
          claimedEffect: "none",
          m3AttemptRan: true,
          verificationPassed: false,
          uncertainty: m6Outcome.uncertainty,
          evidenceSummary: m6Outcome.reason,
          failureCategory: m6Outcome.category,
          failureReason: m6Outcome.reason,
          affectedReferences: m6Outcome.affectedReferences
        });
      }
    }

    return this.attestWithoutRecovery({
      request,
      commandId,
      requestFingerprint,
      requestedCapabilityId,
      m2Trace,
      terminal,
      finalOutcomeStatus: "achieved_without_effect",
      claimedEffect:
        request.requestedCapabilityId === M6_M3_CAPABILITY_ID ? "none" : "inspection_only",
      uncertainty: "low"
    });
  }

  private attestWithoutRecovery(input: {
    request: FinalizeOutcomeAttestationInput;
    commandId: ReturnType<typeof createCommandId>;
    requestFingerprint: string;
    requestedCapabilityId: string;
    m2Trace: ReconstructedTrace;
    terminal: TerminalM3Evidence;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    uncertainty: string;
  }): FinalAttestationResult {
    const attestation = this.createAttestation({
      request: input.request,
      commandId: input.commandId,
      requestFingerprint: input.requestFingerprint,
      requestedCapabilityId: input.requestedCapabilityId,
      terminal: input.terminal,
      m2Trace: input.m2Trace,
      finalOutcomeStatus: input.finalOutcomeStatus,
      claimedEffect: input.claimedEffect,
      m3AttemptRan: Boolean(input.terminal.attempt),
      verificationPassed: input.terminal.verification?.verified === true,
      uncertainty: input.uncertainty,
      evidenceSummary: buildEvidenceSummary(input.terminal, input.m2Trace)
    });
    const explanation = this.explanationService.issueExplanation({
      correlationId: input.request.correlationId,
      attestationId: attestation.attestationId,
      finalOutcomeStatus: attestation.finalOutcomeStatus,
      claimedEffect: attestation.claimedEffect,
      requestedCapabilityId: attestation.requestedCapabilityId,
      m3AttemptRan: attestation.m3AttemptRan,
      decisionDisposition: input.m2Trace.summary.disposition ?? "unknown",
      verificationResult: attestation.verificationPassed ? "verified" : "not_verified",
      evidenceIds: collectEvidenceIds(attestation)
    });
    return Object.freeze({
      attestation,
      recoveryCaseId: undefined,
      explanationId: explanation.explanationId
    });
  }

  private attestWithRecovery(input: {
    request: FinalizeOutcomeAttestationInput;
    commandId: ReturnType<typeof createCommandId>;
    requestFingerprint: string;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    m3AttemptRan: boolean;
    verificationPassed: boolean;
    uncertainty: string;
    evidenceSummary: string;
    failureCategory:
      | "m2_journal_integrity_failure"
      | "m3_journal_integrity_failure"
      | "missing_evidence"
      | "evidence_linkage_mismatch"
      | "verification_rejected"
      | "artifact_integrity_failure";
    failureReason: string;
    affectedReferences: readonly string[];
  }): FinalAttestationResult {
    const attestation = this.createAttestation({
      request: input.request,
      commandId: input.commandId,
      requestFingerprint: input.requestFingerprint,
      requestedCapabilityId: input.request.requestedCapabilityId,
      terminal: {
        capabilityRequest: undefined,
        attempt: undefined,
        artifact: undefined,
        verification: undefined
      },
      m2Trace: undefined,
      finalOutcomeStatus: input.finalOutcomeStatus,
      claimedEffect: input.claimedEffect,
      m3AttemptRan: input.m3AttemptRan,
      verificationPassed: input.verificationPassed,
      uncertainty: input.uncertainty,
      evidenceSummary: input.evidenceSummary
    });
    const recovery = this.recoveryCoordinator.openCase({
      correlationId: input.request.correlationId,
      attestationRequestId: input.request.attestationRequestId,
      attestationId: attestation.attestationId,
      failureCategory: input.failureCategory,
      reason: input.failureReason,
      affectedReferences: input.affectedReferences
    });
    const explanation = this.explanationService.issueExplanation({
      correlationId: input.request.correlationId,
      attestationId: attestation.attestationId,
      recoveryCaseId: recovery.recoveryCaseId,
      finalOutcomeStatus: attestation.finalOutcomeStatus,
      claimedEffect: attestation.claimedEffect,
      requestedCapabilityId: attestation.requestedCapabilityId,
      m3AttemptRan: attestation.m3AttemptRan,
      decisionDisposition: "unknown_or_restricted",
      verificationResult: "not_verified",
      evidenceIds: collectEvidenceIds(attestation),
      recoveryRestriction: recovery.restrictionState
    });
    return Object.freeze({
      attestation,
      recoveryCaseId: recovery.recoveryCaseId,
      explanationId: explanation.explanationId
    });
  }

  private createAttestation(input: {
    request: FinalizeOutcomeAttestationInput;
    commandId: ReturnType<typeof createCommandId>;
    requestFingerprint: string;
    requestedCapabilityId: string;
    terminal: TerminalM3Evidence;
    m2Trace: ReconstructedTrace | undefined;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    m3AttemptRan: boolean;
    verificationPassed: boolean;
    uncertainty: string;
    evidenceSummary: string;
  }): OutcomeAttestationRecord {
    const base = createM4Metadata({
      commandId: input.commandId,
      correlationId: input.request.correlationId,
      schemaVersion: M4_SCHEMA_VERSION
    });
    const withoutIntegrity: Omit<OutcomeAttestationRecord, "integrityHash"> = {
      ...base,
      attestationId: createImmutableIdentifier("m4_attestation"),
      attestationRequestId: input.request.attestationRequestId,
      requestedCapabilityId: input.requestedCapabilityId,
      ...(input.terminal.capabilityRequest
        ? { capabilityRequestId: input.terminal.capabilityRequest.capabilityRequestId }
        : {}),
      ...(input.terminal.attempt
        ? { executionAttemptId: input.terminal.attempt.executionAttemptId }
        : {}),
      ...(input.terminal.artifact ? { artifactId: input.terminal.artifact.artifactId } : {}),
      ...(input.terminal.verification
        ? { verificationId: input.terminal.verification.verificationId }
        : {}),
      ...(input.m2Trace?.summary.intentId
        ? { intentId: input.m2Trace.summary.intentId as unknown as ImmutableIdentifier }
        : {}),
      ...(input.m2Trace?.summary.planId
        ? { planId: input.m2Trace.summary.planId as unknown as ImmutableIdentifier }
        : {}),
      ...(input.m2Trace?.summary.decisionId
        ? { decisionId: input.m2Trace.summary.decisionId as unknown as ImmutableIdentifier }
        : {}),
      ...(input.m2Trace?.summary.transactionId
        ? { transactionId: input.m2Trace.summary.transactionId as unknown as ImmutableIdentifier }
        : {}),
      finalOutcomeStatus: input.finalOutcomeStatus,
      claimedEffect: input.claimedEffect,
      m3AttemptRan: input.m3AttemptRan,
      verificationPassed: input.verificationPassed,
      uncertainty: input.uncertainty,
      evidenceSummary: input.evidenceSummary.slice(0, 220),
      status: "attested"
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeM4IntegrityHash(withoutIntegrity)
    } satisfies OutcomeAttestationRecord);
    this.traceService.appendDomainEvent({
      eventType: "OutcomeAttested",
      owner: "OutcomeAttestationService",
      status: record.finalOutcomeStatus === "achieved_without_effect" ? "applied" : "denied",
      commandName: "FinalizeOutcomeAttestation",
      commandId: input.commandId,
      correlationId: input.request.correlationId,
      payloadSummary: `attestationRequestId=${input.request.attestationRequestId}; outcome=${record.finalOutcomeStatus}`,
      commandFingerprint: input.requestFingerprint,
      commandResult: {
        accepted: record.finalOutcomeStatus === "achieved_without_effect",
        status: record.finalOutcomeStatus === "achieved_without_effect" ? "applied" : "denied",
        reason: `Final outcome derived as ${record.finalOutcomeStatus}.`,
        eventType: "OutcomeAttested",
        recordKind: "outcome_attestation",
        recordId: record.attestationId
      },
      recordKind: "outcome_attestation",
      record
    });
    return record;
  }

  private rejectRequestAndThrow(input: {
    request: FinalizeOutcomeAttestationInput;
    commandId: ReturnType<typeof createCommandId>;
    requestFingerprint: string;
    reason: string;
  }): never {
    this.traceService.appendDomainEvent({
      eventType: "AttestationRequestRejected",
      owner: "OutcomeAttestationService",
      status: "denied",
      commandName: "FinalizeOutcomeAttestation",
      commandId: input.commandId,
      correlationId: input.request.correlationId,
      payloadSummary: `attestationRequestId=${input.request.attestationRequestId}; malformed_request`,
      commandFingerprint: input.requestFingerprint,
      commandResult: {
        accepted: false,
        status: "denied",
        reason: input.reason,
        eventType: "AttestationRequestRejected"
      }
    });
    throw new Error(input.reason);
  }

  private findAttestationByRequestId(
    attestationRequestId: ImmutableIdentifier
  ): OutcomeAttestationRecord | undefined {
    const records = this.traceService
      .listAllEvents()
      .filter((event) => event.recordKind === "outcome_attestation" && event.record)
      .map((event) => event.record as OutcomeAttestationRecord)
      .filter((record) => record.attestationRequestId === attestationRequestId);
    return records.at(-1);
  }

  private findExplanationByAttestationId(attestationId: ImmutableIdentifier) {
    const records = this.traceService
      .listAllEvents()
      .filter((event) => event.recordKind === "explanation" && event.record)
      .map(
        (event) =>
          event.record as {
            explanationId: ImmutableIdentifier;
            attestationId: ImmutableIdentifier;
          }
      )
      .filter((record) => record.attestationId === attestationId);
    return records.at(-1);
  }

  private findRecoveryByAttestationId(attestationId: ImmutableIdentifier) {
    const records = this.traceService
      .listAllEvents()
      .filter((event) => event.recordKind === "recovery_case" && event.record)
      .map(
        (event) =>
          event.record as {
            recoveryCaseId: ImmutableIdentifier;
            attestationId?: ImmutableIdentifier;
          }
      )
      .filter((record) => record.attestationId === attestationId);
    return records.at(-1);
  }

  private deriveM3TerminalEvidence(events: readonly M3EventRecord[]): TerminalM3Evidence {
    const capabilityRequest = [...events]
      .filter((event) => event.recordKind === "capability_request" && event.record)
      .map((event) => event.record as CapabilityRequestRecord)
      .at(-1);
    const attempt = [...events]
      .filter((event) => event.recordKind === "execution_attempt" && event.record)
      .map((event) => event.record as ExecutionAttemptRecord)
      .at(-1);
    const artifact = [...events]
      .filter((event) => event.recordKind === "artifact" && event.record)
      .map((event) => event.record as ArtifactRecord)
      .at(-1);
    const verification = [...events]
      .filter((event) => event.recordKind === "verification" && event.record)
      .map((event) => event.record as VerificationRecord)
      .at(-1);
    return Object.freeze({ capabilityRequest, attempt, artifact, verification });
  }

  private validateVerificationAndArtifact(input: {
    request: FinalizeOutcomeAttestationInput;
    terminal: TerminalM3Evidence;
    verification: VerificationRecord;
    artifact: ArtifactRecord;
  }):
    | Readonly<{ valid: true }>
    | Readonly<{
        valid: false;
        category:
          | "verification_rejected"
          | "artifact_integrity_failure"
          | "evidence_linkage_mismatch"
          | "missing_evidence";
        reason: string;
        uncertainty: string;
        affectedReferences: readonly string[];
      }> {
    const capabilityRequest = input.terminal.capabilityRequest;
    const attempt = input.terminal.attempt;
    if (!capabilityRequest || !attempt) {
      return Object.freeze({
        valid: false,
        category: "missing_evidence",
        reason: "Missing capability request or attempt during verification validation.",
        uncertainty: "missing_capability_request_or_attempt",
        affectedReferences: ["capabilityRequest", "attempt"]
      });
    }
    if (input.verification.verified !== true) {
      return Object.freeze({
        valid: false,
        category: "verification_rejected",
        reason: "Verification record is rejected/unverified.",
        uncertainty: "verification_rejected",
        affectedReferences: ["verification.verified"]
      });
    }
    if (
      input.verification.correlationId !== input.request.correlationId ||
      input.verification.capabilityRequestId !== capabilityRequest.capabilityRequestId ||
      input.verification.executionAttemptId !== attempt.executionAttemptId ||
      input.verification.artifactId !== input.artifact.artifactId
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "Verification linkage metadata mismatch.",
        uncertainty: "verification_linkage_mismatch",
        affectedReferences: ["verification"]
      });
    }
    if (
      input.artifact.correlationId !== input.request.correlationId ||
      input.artifact.capabilityRequestId !== capabilityRequest.capabilityRequestId ||
      input.artifact.executionAttemptId !== attempt.executionAttemptId
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "Artifact linkage metadata mismatch.",
        uncertainty: "artifact_linkage_mismatch",
        affectedReferences: ["artifact"]
      });
    }

    let serialized: string;
    try {
      serialized = readFileSync(input.artifact.artifactPath, "utf8");
    } catch (error) {
      return Object.freeze({
        valid: false,
        category: "missing_evidence",
        reason: `Artifact content missing or unreadable: ${(error as Error).message}`,
        uncertainty: "artifact_unreadable",
        affectedReferences: ["artifactPath"]
      });
    }
    const contentHash = createHash("sha256").update(serialized).digest("hex");
    if (
      contentHash !== input.artifact.artifactContentHash ||
      input.verification.artifactContentHash !== input.artifact.artifactContentHash
    ) {
      return Object.freeze({
        valid: false,
        category: "artifact_integrity_failure",
        reason: "Artifact content integrity hash mismatch.",
        uncertainty: "artifact_hash_mismatch",
        affectedReferences: ["artifactContentHash"]
      });
    }
    if (input.verification.fixtureManifestHash !== input.artifact.fixtureManifestHash) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "Verification and artifact manifest hashes mismatch.",
        uncertainty: "manifest_hash_mismatch",
        affectedReferences: ["fixtureManifestHash"]
      });
    }
    return Object.freeze({ valid: true });
  }

  private validateM6EvidenceConsistency(input: {
    request: FinalizeOutcomeAttestationInput;
    m2Trace: ReconstructedTrace;
    terminal: TerminalM3Evidence;
    artifact: ArtifactRecord;
  }):
    | Readonly<{ valid: true }>
    | Readonly<{
        valid: false;
        category: "missing_evidence" | "evidence_linkage_mismatch" | "artifact_integrity_failure";
        reason: string;
        uncertainty: string;
        affectedReferences: readonly string[];
      }> {
    let latestM6: ReturnType<M6EvidenceJournal["listAll"]>[number]["record"] | undefined;
    try {
      latestM6 = new M6EvidenceJournal(this.stateDirectory)
        .listAll()
        .filter((event) => event.correlationId === input.request.correlationId)
        .map((event) => event.record)
        .at(-1);
    } catch (error) {
      return Object.freeze({
        valid: false,
        category: "artifact_integrity_failure",
        reason: `M6 evidence journal integrity failure: ${(error as Error).message}`,
        uncertainty: "m6_journal_integrity_failure",
        affectedReferences: ["m6_event_journal"]
      });
    }
    if (!latestM6) {
      return Object.freeze({
        valid: false,
        category: "missing_evidence",
        reason: "M6 evidence record missing for attested correlation.",
        uncertainty: "missing_m6_evidence",
        affectedReferences: ["m6_event_journal"]
      });
    }
    if (latestM6.requestId !== input.terminal.capabilityRequest?.capabilityRequestId) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 request identity does not match M3 capability request identity.",
        uncertainty: "m6_request_id_mismatch",
        affectedReferences: ["m6.requestId", "m3.capabilityRequestId"]
      });
    }
    if (
      latestM6.m2IntentId !== (input.m2Trace.summary.intentId as unknown as ImmutableIdentifier) ||
      latestM6.m2PlanId !== (input.m2Trace.summary.planId as unknown as ImmutableIdentifier) ||
      latestM6.m2DecisionId !==
        (input.m2Trace.summary.decisionId as unknown as ImmutableIdentifier) ||
      latestM6.m2TransactionId !==
        (input.m2Trace.summary.transactionId as unknown as ImmutableIdentifier)
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 record M2 linkage does not match reconstructed M2 linkage.",
        uncertainty: "m6_m2_linkage_mismatch",
        affectedReferences: ["m6.m2Linkage", "m2.summary"]
      });
    }
    if (latestM6.corpusManifestHashSha256 !== input.artifact.fixtureManifestHash) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 corpus manifest hash does not match M3 artifact manifest hash.",
        uncertainty: "m6_manifest_hash_mismatch",
        affectedReferences: ["m6.corpusManifestHashSha256", "m3.artifact.fixtureManifestHash"]
      });
    }

    let parsedArtifact: unknown;
    try {
      parsedArtifact = JSON.parse(readFileSync(input.artifact.artifactPath, "utf8"));
    } catch (error) {
      return Object.freeze({
        valid: false,
        category: "missing_evidence",
        reason: `M3 artifact unreadable while validating M6 linkage: ${(error as Error).message}`,
        uncertainty: "m3_artifact_unreadable_for_m6_check",
        affectedReferences: ["m3.artifactPath"]
      });
    }
    const artifactDeterministic = (
      parsedArtifact as {
        deterministicInquiry?: {
          questionNormalizedHashSha256?: string;
          selectedDocumentIds?: string[];
          selectedSectionIds?: string[];
          noMatch?: boolean;
          answerHashSha256?: string;
          m9ActivationContext?: {
            activationRecordId?: string;
            packId?: string;
            packVersion?: string;
            manifestHashSha256?: string;
          };
        };
      }
    ).deterministicInquiry;
    if (
      !artifactDeterministic ||
      typeof artifactDeterministic.questionNormalizedHashSha256 !== "string" ||
      !Array.isArray(artifactDeterministic.selectedDocumentIds) ||
      !Array.isArray(artifactDeterministic.selectedSectionIds) ||
      typeof artifactDeterministic.noMatch !== "boolean" ||
      typeof artifactDeterministic.answerHashSha256 !== "string"
    ) {
      return Object.freeze({
        valid: false,
        category: "artifact_integrity_failure",
        reason: "M6 deterministic artifact metadata missing or malformed.",
        uncertainty: "m6_artifact_metadata_malformed",
        affectedReferences: ["m3.artifact.deterministicInquiry"]
      });
    }
    if (
      latestM6.questionNormalizedHashSha256 !==
        artifactDeterministic.questionNormalizedHashSha256 ||
      latestM6.answerHashSha256 !== artifactDeterministic.answerHashSha256 ||
      latestM6.noMatch !== artifactDeterministic.noMatch
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 question/result hash or no-match flag mismatch versus M3 artifact metadata.",
        uncertainty: "m6_artifact_hash_or_nomatch_mismatch",
        affectedReferences: [
          "m6.questionHash/answerHash/noMatch",
          "m3.artifact.deterministicInquiry"
        ]
      });
    }
    if (
      latestM6.selectedDocumentIds.join("|") !==
        artifactDeterministic.selectedDocumentIds.join("|") ||
      latestM6.selectedSectionIds.join("|") !== artifactDeterministic.selectedSectionIds.join("|")
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 selected references mismatch versus M3 artifact deterministic metadata.",
        uncertainty: "m6_selected_references_mismatch",
        affectedReferences: ["m6.selectedReferences", "m3.artifact.deterministicInquiry"]
      });
    }
    const artifactM9 = artifactDeterministic.m9ActivationContext;
    if (
      !latestM6.m9ActivationRecordId ||
      !latestM6.m9PackId ||
      !latestM6.m9PackVersion ||
      !latestM6.m9ManifestHashSha256
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 record missing required M9 activation tuple fields.",
        uncertainty: "m6_missing_m9_tuple",
        affectedReferences: ["m6.m9ActivationContext"]
      });
    }
    if (
      !artifactM9 ||
      artifactM9.activationRecordId !== latestM6.m9ActivationRecordId ||
      artifactM9.packId !== latestM6.m9PackId ||
      artifactM9.packVersion !== latestM6.m9PackVersion ||
      artifactM9.manifestHashSha256 !== latestM6.m9ManifestHashSha256
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "M6 M9 activation tuple mismatch versus M3 deterministic artifact metadata.",
        uncertainty: "m6_m9_tuple_mismatch",
        affectedReferences: [
          "m6.m9ActivationContext",
          "m3.artifact.deterministicInquiry.m9ActivationContext"
        ]
      });
    }
    let corpusSnapshot: ReturnType<typeof loadApprovedSyntheticCorpus>;
    if (latestM6.m9PackId && latestM6.m9PackVersion && latestM6.m9ManifestHashSha256) {
      const pack = listApprovedPacks().find(
        (candidate) =>
          candidate.manifest.packId === latestM6.m9PackId &&
          candidate.manifest.packVersion === latestM6.m9PackVersion &&
          candidate.manifestHashSha256 === latestM6.m9ManifestHashSha256
      );
      if (!pack) {
        return Object.freeze({
          valid: false,
          category: "missing_evidence",
          reason: "M6 evidence references an unavailable M9 active pack tuple.",
          uncertainty: "m6_m9_pack_unavailable",
          affectedReferences: ["m6.m9ActivationContext", "m9.approvedPackRegistry"]
        });
      }
      try {
        corpusSnapshot = loadSyntheticCorpusFromRootForTest(
          path.resolve(pack.packDirectory, "content")
        );
      } catch (error) {
        return Object.freeze({
          valid: false,
          category: "missing_evidence",
          reason: `Active M9 corpus load failed during M6 attestation validation: ${(error as Error).message}`,
          uncertainty: "m6_corpus_load_failure",
          affectedReferences: ["m9.approvedPack.content"]
        });
      }
    } else {
      try {
        corpusSnapshot = loadApprovedSyntheticCorpus();
      } catch (error) {
        return Object.freeze({
          valid: false,
          category: "missing_evidence",
          reason: `Approved corpus load failed during M6 attestation validation: ${(error as Error).message}`,
          uncertainty: "m6_corpus_load_failure",
          affectedReferences: ["approved_m6_corpus"]
        });
      }
    }
    if (corpusSnapshot.manifestHashSha256 !== latestM6.corpusManifestHashSha256) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "Canonical manifest hash does not match the attested corpus manifest hash.",
        uncertainty: "m6_canonical_manifest_mismatch",
        affectedReferences: ["m6.corpusManifestHashSha256", "attestedCorpus.manifestHashSha256"]
      });
    }
    let rendered: ReturnType<typeof renderM6Response>;
    try {
      const reconstructedMatch = reconstructM6MatchOutcome({
        corpusSnapshot,
        selectedDocumentIds: artifactDeterministic.selectedDocumentIds,
        selectedSectionIds: artifactDeterministic.selectedSectionIds,
        noMatch: artifactDeterministic.noMatch
      });
      rendered = renderM6Response({
        match: reconstructedMatch,
        corpusManifestHashSha256: latestM6.corpusManifestHashSha256
      });
    } catch (error) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: `M6 deterministic reconstruction failed: ${(error as Error).message}`,
        uncertainty: "m6_reconstruction_failure",
        affectedReferences: ["m3.artifact.deterministicInquiry", "approved_m6_corpus"]
      });
    }
    const reconstructedHash = createHash("sha256").update(rendered.responseText).digest("hex");
    if (
      reconstructedHash !== artifactDeterministic.answerHashSha256 ||
      reconstructedHash !== latestM6.answerHashSha256
    ) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "Independent M6 response hash mismatch across artifact/evidence reconstruction.",
        uncertainty: "m6_reconstructed_response_hash_mismatch",
        affectedReferences: [
          "m3.artifact.deterministicInquiry.answerHashSha256",
          "m6.answerHashSha256",
          "m6.reconstructedResponseHash"
        ]
      });
    }
    const renderedManifest = rendered.responseText
      .split("\n")
      .find((line) => line.startsWith("corpusManifestHash="))
      ?.slice("corpusManifestHash=".length);
    if (renderedManifest !== latestM6.corpusManifestHashSha256) {
      return Object.freeze({
        valid: false,
        category: "evidence_linkage_mismatch",
        reason: "Rendered response corpusManifestHash field mismatches canonical manifest hash.",
        uncertainty: "m6_rendered_manifest_field_mismatch",
        affectedReferences: ["rendered.corpusManifestHash", "m6.corpusManifestHashSha256"]
      });
    }
    return Object.freeze({ valid: true });
  }
}

type TerminalM3Evidence = Readonly<{
  capabilityRequest: CapabilityRequestRecord | undefined;
  attempt: ExecutionAttemptRecord | undefined;
  artifact: ArtifactRecord | undefined;
  verification: VerificationRecord | undefined;
}>;

function collectEvidenceIds(attestation: OutcomeAttestationRecord): readonly string[] {
  return Object.freeze(
    [
      attestation.intentId,
      attestation.planId,
      attestation.decisionId,
      attestation.transactionId,
      attestation.capabilityRequestId,
      attestation.executionAttemptId,
      attestation.artifactId,
      attestation.verificationId,
      attestation.attestationId
    ]
      .filter((value): value is ImmutableIdentifier => typeof value === "string")
      .map((value) => value.slice(0, 64))
  );
}

function buildEvidenceSummary(terminal: TerminalM3Evidence, m2Trace: ReconstructedTrace): string {
  return [
    `m2Decision=${m2Trace.summary.disposition ?? "unknown"}`,
    `m2Transaction=${m2Trace.summary.transactionStatus ?? "unknown"}`,
    `m3Attempt=${terminal.attempt?.status ?? "none"}`,
    `m3Verification=${terminal.verification?.verified === true ? "verified" : "not_verified"}`
  ].join("; ");
}

function reconstructM6MatchOutcome(input: {
  corpusSnapshot: ReturnType<typeof loadApprovedSyntheticCorpus>;
  selectedDocumentIds: readonly string[];
  selectedSectionIds: readonly string[];
  noMatch: boolean;
}): M6MatchOutcome {
  if (input.noMatch) {
    return Object.freeze({
      noMatch: true,
      selectedDocuments: Object.freeze([]),
      selectedDocumentIds: Object.freeze([]),
      selectedSectionIds: Object.freeze([])
    });
  }
  const documentsById = new Map(
    input.corpusSnapshot.documents.map((document) => [document.id, document] as const)
  );
  const selectedDocuments: M6SelectedDocument[] = [];
  for (const documentId of input.selectedDocumentIds) {
    const document = documentsById.get(documentId);
    if (!document) {
      throw new Error(`M6 attestation reconstruction missing document ID ${documentId}.`);
    }
    const sectionRefs = input.selectedSectionIds.filter((ref) => ref.startsWith(`${documentId}#`));
    const selectedSections: M6SelectedSection[] = sectionRefs.map((reference, index) => {
      const sectionId = reference.split("#")[1];
      const section = document.sections.find((candidate) => candidate.sectionId === sectionId);
      if (!section) {
        throw new Error(`M6 attestation reconstruction missing section reference ${reference}.`);
      }
      return Object.freeze({
        documentId,
        sectionId: section.sectionId,
        sectionIndex: section.index,
        sectionScore: Math.max(1, sectionRefs.length - index),
        paragraph: section.originalParagraph
      });
    });
    selectedDocuments.push(
      Object.freeze({
        documentId,
        documentScore: Math.max(2, selectedSections.length),
        titleMatches: 1,
        tags: document.tags,
        selectedSections: Object.freeze(selectedSections)
      })
    );
  }
  return Object.freeze({
    noMatch: false,
    selectedDocuments: Object.freeze(selectedDocuments),
    selectedDocumentIds: Object.freeze([...input.selectedDocumentIds]),
    selectedSectionIds: Object.freeze([...input.selectedSectionIds])
  });
}
