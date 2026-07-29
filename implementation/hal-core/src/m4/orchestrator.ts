import { writeFileSync } from "node:fs";
import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { AuditService, reconstructM2Trace, runM2DurableIntentDemo } from "../m2/index.js";
import type { LocalRequestFixtureName } from "../request/fixtures.js";
import {
  APPROVED_CORPUS_REFERENCE,
  ArtifactService,
  type ArtifactRecord,
  type CapabilityRequestRecord,
  CapabilityRegistry,
  ExecutionCoordinator,
  type ExecutionAttemptRecord,
  LocalSyntheticCorpusInspector,
  M3TraceService,
  VerificationService,
  type VerificationRecord
} from "../m3/index.js";
import { M3_CAPABILITY_ID } from "../m3/types.js";
import { ExplanationService } from "./explanationService.js";
import { OutcomeAttestationService } from "./outcomeAttestationService.js";
import { RecoveryCoordinator } from "./recoveryCoordinator.js";
import { M4TraceService } from "./traceService.js";
import type {
  FinalOutcomeStatus,
  FinalizeOutcomeAttestationInput,
  OutcomeAttestationRecord
} from "./types.js";

export type M4DemoScenario =
  | "allowed_verified"
  | "blocked_approval_required"
  | "blocked_denied"
  | "cancelled"
  | "timed_out"
  | "verification_rejected"
  | "incomplete_evidence";

export type M4DemoResult = Readonly<{
  correlationId: CorrelationId;
  scenario: M4DemoScenario;
  attestationId: ImmutableIdentifier;
  explanationId: ImmutableIdentifier;
  recoveryCaseId: ImmutableIdentifier | undefined;
  finalOutcomeStatus: FinalOutcomeStatus;
  claimedEffect: "inspection_only" | "none";
}>;

export function runM4VerifiedOutcomeDemo(input: {
  stateDirectory: string;
  scenario: M4DemoScenario;
  fixtureRoot?: string;
}): M4DemoResult {
  const fixtureRoot = path.resolve(
    input.fixtureRoot ?? path.resolve(process.cwd(), "fixtures/synthetic-corpus")
  );
  const fixtureName = toM2Fixture(input.scenario);
  const m2 = runM2DurableIntentDemo({
    configuration: {
      environment: "development",
      safeMode: "restrictive",
      ownerId: "owner_hal_local_dev"
    },
    fixtureName,
    stateDirectory: input.stateDirectory
  });

  const m3Trace = new M3TraceService(input.stateDirectory);
  if (input.scenario !== "incomplete_evidence" && m2.disposition === "allow") {
    const m2Audit = new AuditService(input.stateDirectory);
    const coordinator = new ExecutionCoordinator({
      traceService: m3Trace,
      m2AuditService: m2Audit,
      registry: new CapabilityRegistry(m3Trace, fixtureRoot),
      provider: new LocalSyntheticCorpusInspector(),
      artifactService: new ArtifactService(m3Trace, input.stateDirectory),
      verificationService: new VerificationService(m3Trace, fixtureRoot),
      fixtureRoot
    });
    coordinator.submitCapabilityRequest({
      capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
      capabilityId: M3_CAPABILITY_ID,
      correlationId: m2.correlationId,
      decisionId: m2.decisionId as unknown as ImmutableIdentifier,
      transactionId: m2.transactionId as unknown as ImmutableIdentifier,
      intentId: m2.intentId as unknown as ImmutableIdentifier,
      planId: m2.planId as unknown as ImmutableIdentifier,
      corpusReference: APPROVED_CORPUS_REFERENCE,
      itemLimit: 3,
      deadlineMs: input.scenario === "timed_out" ? 1 : 2_000,
      ...(input.scenario === "cancelled" ? { cancellationRequested: true } : {})
    });

    if (input.scenario === "verification_rejected") {
      const latestArtifact = m3Trace
        .listEventsByCorrelationId(m2.correlationId)
        .filter((event) => event.recordKind === "artifact" && event.record)
        .map((event) => event.record as { artifactPath: string })
        .at(-1);
      if (latestArtifact?.artifactPath) {
        writeFileSync(
          latestArtifact.artifactPath,
          `${JSON.stringify({ tampered: true, note: "m4 demo tamper" }, null, 2)}\n`,
          "utf8"
        );
      }
    }
  }

  const m4Trace = new M4TraceService(input.stateDirectory);
  const recoveryCoordinator = new RecoveryCoordinator(m4Trace);
  const explanationService = new ExplanationService(m4Trace);
  const outcomeService = new OutcomeAttestationService({
    stateDirectory: input.stateDirectory,
    traceService: m4Trace,
    recoveryCoordinator,
    explanationService
  });

  const attestationRequest: FinalizeOutcomeAttestationInput = Object.freeze({
    attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
    correlationId: m2.correlationId,
    requestedCapabilityId: M3_CAPABILITY_ID
  });
  const result = outcomeService.finalizeOutcomeAttestation(attestationRequest);

  return Object.freeze({
    correlationId: m2.correlationId,
    scenario: input.scenario,
    attestationId: result.attestation.attestationId,
    explanationId: result.explanationId,
    recoveryCaseId: result.recoveryCaseId,
    finalOutcomeStatus: result.attestation.finalOutcomeStatus,
    claimedEffect: result.attestation.claimedEffect
  });
}

export type ReconstructedM4Trace = Readonly<{
  correlationId: CorrelationId;
  m2IntegrityValid: boolean;
  m3IntegrityValid: boolean;
  m4IntegrityValid: boolean;
  crossJournalLinkageValid: boolean;
  finalOutcomeStatus: FinalOutcomeStatus | "unavailable";
  claimedEffect: "inspection_only" | "none" | "unavailable";
  m3AttemptRan: boolean;
  decisionDisposition: "allow" | "deny" | "approval_required" | "unknown";
  verificationResult: "verified" | "rejected" | "missing";
  attestationId: ImmutableIdentifier | undefined;
  recoveryCaseId: ImmutableIdentifier | undefined;
  explanationId: ImmutableIdentifier | undefined;
  boundedSummary: string;
}>;

export function reconstructM4Trace(
  stateDirectory: string,
  correlationId: CorrelationId
): ReconstructedM4Trace {
  let m2IntegrityValid = true;
  let m3IntegrityValid = true;
  let m4IntegrityValid = true;
  let decisionDisposition: "allow" | "deny" | "approval_required" | "unknown" = "unknown";
  let m3AttemptRan = false;
  let verificationResult: "verified" | "rejected" | "missing" = "missing";
  let attestationId: ImmutableIdentifier | undefined;
  let recoveryCaseId: ImmutableIdentifier | undefined;
  let explanationId: ImmutableIdentifier | undefined;
  let finalOutcomeStatus: FinalOutcomeStatus | "unavailable";
  let claimedEffect: "inspection_only" | "none" | "unavailable";
  let crossJournalLinkageValid: boolean;
  let m2Summary:
    | Readonly<{
        intentId: string | undefined;
        planId: string | undefined;
        decisionId: string | undefined;
        transactionId: string | undefined;
        disposition: "allow" | "deny" | "approval_required" | undefined;
      }>
    | undefined;
  let selectedCapabilityRequest: CapabilityRequestRecord | undefined;
  let selectedAttempt: ExecutionAttemptRecord | undefined;
  let selectedArtifact: ArtifactRecord | undefined;
  let selectedVerification: VerificationRecord | undefined;
  let selectedAttestation: OutcomeAttestationRecord | undefined;

  try {
    const m2Trace = reconstructM2Trace(stateDirectory, correlationId);
    m2Summary = m2Trace.summary;
    decisionDisposition = m2Trace.summary.disposition ?? "unknown";
  } catch {
    m2IntegrityValid = false;
  }

  try {
    const m3Trace = new M3TraceService(stateDirectory);
    const m3Events = m3Trace.listEventsByCorrelationId(correlationId);
    selectedCapabilityRequest = m3Events
      .filter((event) => event.recordKind === "capability_request" && event.record)
      .map((event) => event.record as CapabilityRequestRecord)
      .at(-1);
    selectedAttempt = m3Events
      .filter((event) => event.recordKind === "execution_attempt" && event.record)
      .map((event) => event.record as ExecutionAttemptRecord)
      .at(-1);
    selectedArtifact = m3Events
      .filter((event) => event.recordKind === "artifact" && event.record)
      .map((event) => event.record as ArtifactRecord)
      .at(-1);
    selectedVerification = m3Events
      .filter((event) => event.recordKind === "verification" && event.record)
      .map((event) => event.record as VerificationRecord)
      .at(-1);
    m3AttemptRan = Boolean(selectedAttempt);
    if (selectedVerification) {
      verificationResult = selectedVerification.verified ? "verified" : "rejected";
    }
  } catch {
    m3IntegrityValid = false;
  }

  try {
    const m4Trace = new M4TraceService(stateDirectory);
    const events = m4Trace.listEventsByCorrelationId(correlationId);
    selectedAttestation = events
      .filter((event) => event.recordKind === "outcome_attestation" && event.record)
      .map((event) => event.record as OutcomeAttestationRecord)
      .at(-1);
    if (selectedAttestation) {
      attestationId = selectedAttestation.attestationId;
    }
    const recovery = events
      .filter((event) => event.recordKind === "recovery_case" && event.record)
      .map((event) => event.record as { recoveryCaseId: ImmutableIdentifier })
      .at(-1);
    recoveryCaseId = recovery?.recoveryCaseId;
    const explanation = events
      .filter((event) => event.recordKind === "explanation" && event.record)
      .map((event) => event.record as { explanationId: ImmutableIdentifier })
      .at(-1);
    explanationId = explanation?.explanationId;
  } catch {
    m4IntegrityValid = false;
  }

  const allIntegrityValid = m2IntegrityValid && m3IntegrityValid && m4IntegrityValid;
  if (!allIntegrityValid) {
    const boundedSummary = [
      "traceTrust=restricted_untrusted",
      "reason=journal_integrity_validation_failed",
      `decision=${decisionDisposition}`,
      `m3AttemptRan=${m3AttemptRan}`,
      `verification=${verificationResult}`,
      "externalEffect=none"
    ].join("; ");
    return Object.freeze({
      correlationId,
      m2IntegrityValid,
      m3IntegrityValid,
      m4IntegrityValid,
      crossJournalLinkageValid: false,
      finalOutcomeStatus: "unavailable",
      claimedEffect: "unavailable",
      m3AttemptRan,
      decisionDisposition,
      verificationResult,
      attestationId,
      recoveryCaseId,
      explanationId,
      boundedSummary
    });
  }

  const linkage = validateCrossJournalLinkage({
    correlationId,
    m2Summary,
    capabilityRequest: selectedCapabilityRequest,
    attempt: selectedAttempt,
    artifact: selectedArtifact,
    verification: selectedVerification,
    attestation: selectedAttestation
  });
  crossJournalLinkageValid = linkage.valid;
  if (!linkage.valid || !selectedAttestation) {
    const linkageReason = linkage.valid ? "missing_m4_attestation" : linkage.reason;
    const boundedSummary = [
      "traceTrust=restricted_untrusted",
      `reason=${linkageReason}`,
      `decision=${decisionDisposition}`,
      `m3AttemptRan=${m3AttemptRan}`,
      `verification=${verificationResult}`,
      "externalEffect=none"
    ].join("; ");
    return Object.freeze({
      correlationId,
      m2IntegrityValid,
      m3IntegrityValid,
      m4IntegrityValid,
      crossJournalLinkageValid,
      finalOutcomeStatus: "unavailable",
      claimedEffect: "unavailable",
      m3AttemptRan,
      decisionDisposition,
      verificationResult,
      attestationId,
      recoveryCaseId,
      explanationId,
      boundedSummary
    });
  }

  finalOutcomeStatus = selectedAttestation.finalOutcomeStatus;
  claimedEffect = selectedAttestation.claimedEffect;

  const boundedSummary = [
    "traceTrust=validated",
    `decision=${decisionDisposition}`,
    `outcome=${finalOutcomeStatus}`,
    `claimedEffect=${claimedEffect}`,
    `m3AttemptRan=${m3AttemptRan}`,
    `verification=${verificationResult}`,
    "externalEffect=none"
  ].join("; ");

  return Object.freeze({
    correlationId,
    m2IntegrityValid,
    m3IntegrityValid,
    m4IntegrityValid,
    crossJournalLinkageValid,
    finalOutcomeStatus,
    claimedEffect,
    m3AttemptRan,
    decisionDisposition,
    verificationResult,
    attestationId,
    recoveryCaseId,
    explanationId,
    boundedSummary
  });
}

function toM2Fixture(scenario: M4DemoScenario): LocalRequestFixtureName {
  if (scenario === "blocked_approval_required") {
    return "approval_required_request";
  }
  if (scenario === "blocked_denied") {
    return "denied_unknown_request";
  }
  return "allowed_inspection_request";
}

function validateCrossJournalLinkage(input: {
  correlationId: CorrelationId;
  m2Summary:
    | Readonly<{
        intentId: string | undefined;
        planId: string | undefined;
        decisionId: string | undefined;
        transactionId: string | undefined;
      }>
    | undefined;
  capabilityRequest: CapabilityRequestRecord | undefined;
  attempt: ExecutionAttemptRecord | undefined;
  artifact: ArtifactRecord | undefined;
  verification: VerificationRecord | undefined;
  attestation: OutcomeAttestationRecord | undefined;
}): Readonly<{ valid: true }> | Readonly<{ valid: false; reason: string }> {
  const m2 = input.m2Summary;
  if (!m2?.intentId || !m2.planId || !m2.decisionId || !m2.transactionId) {
    return Object.freeze({ valid: false, reason: "missing_m2_trace_ids" });
  }
  if (!input.capabilityRequest || !input.attempt || !input.artifact || !input.verification) {
    return Object.freeze({ valid: false, reason: "missing_m3_terminal_records" });
  }
  if (!input.attestation) {
    return Object.freeze({ valid: false, reason: "missing_m4_attestation" });
  }

  const sameCorrelation =
    input.capabilityRequest.correlationId === input.correlationId &&
    input.attempt.correlationId === input.correlationId &&
    input.artifact.correlationId === input.correlationId &&
    input.verification.correlationId === input.correlationId &&
    input.attestation.correlationId === input.correlationId;
  if (!sameCorrelation) {
    return Object.freeze({ valid: false, reason: "cross_journal_correlation_mismatch" });
  }

  if (
    input.attestation.intentId !== (m2.intentId as unknown as ImmutableIdentifier) ||
    input.attestation.planId !== (m2.planId as unknown as ImmutableIdentifier) ||
    input.attestation.decisionId !== (m2.decisionId as unknown as ImmutableIdentifier) ||
    input.attestation.transactionId !== (m2.transactionId as unknown as ImmutableIdentifier)
  ) {
    return Object.freeze({ valid: false, reason: "m4_to_m2_linkage_mismatch" });
  }

  if (
    input.attestation.capabilityRequestId !== input.capabilityRequest.capabilityRequestId ||
    input.attestation.executionAttemptId !== input.attempt.executionAttemptId ||
    input.attestation.artifactId !== input.artifact.artifactId ||
    input.attestation.verificationId !== input.verification.verificationId
  ) {
    return Object.freeze({ valid: false, reason: "m4_to_m3_linkage_mismatch" });
  }

  if (
    input.capabilityRequest.intentId !== (m2.intentId as unknown as ImmutableIdentifier) ||
    input.capabilityRequest.planId !== (m2.planId as unknown as ImmutableIdentifier) ||
    input.capabilityRequest.decisionId !== (m2.decisionId as unknown as ImmutableIdentifier) ||
    input.capabilityRequest.transactionId !== (m2.transactionId as unknown as ImmutableIdentifier)
  ) {
    return Object.freeze({ valid: false, reason: "m3_request_to_m2_linkage_mismatch" });
  }

  if (input.attempt.capabilityRequestId !== input.capabilityRequest.capabilityRequestId) {
    return Object.freeze({ valid: false, reason: "m3_attempt_to_request_linkage_mismatch" });
  }

  if (
    input.artifact.capabilityRequestId !== input.capabilityRequest.capabilityRequestId ||
    input.artifact.executionAttemptId !== input.attempt.executionAttemptId ||
    input.verification.capabilityRequestId !== input.capabilityRequest.capabilityRequestId ||
    input.verification.executionAttemptId !== input.attempt.executionAttemptId ||
    input.verification.artifactId !== input.artifact.artifactId
  ) {
    return Object.freeze({ valid: false, reason: "m3_artifact_verification_linkage_mismatch" });
  }

  if (input.attestation.requestedCapabilityId !== input.capabilityRequest.capabilityId) {
    return Object.freeze({ valid: false, reason: "capability_identity_mismatch" });
  }

  return Object.freeze({ valid: true });
}
