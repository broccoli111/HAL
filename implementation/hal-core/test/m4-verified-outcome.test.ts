import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { AuditService, runM2DurableIntentDemo } from "../src/m2/index.js";
import {
  APPROVED_CORPUS_REFERENCE,
  ArtifactService,
  CapabilityRegistry,
  ExecutionCoordinator,
  LocalSyntheticCorpusInspector,
  M3TraceService,
  VerificationService,
  type CapabilityRequestRecord,
  type ExecutionAttemptRecord
} from "../src/m3/index.js";
import {
  M3_CAPABILITY_ID,
  M3_PROVIDER_ID,
  M3_PROVIDER_VERSION,
  M3_PROVENANCE,
  M3_SCHEMA_VERSION
} from "../src/m3/types.js";
import { computeRecordIntegrityHash as computeM3RecordIntegrityHash } from "../src/m3/traceService.js";
import { ExplanationService } from "../src/m4/explanationService.js";
import { runM4VerifiedOutcomeDemo, reconstructM4Trace } from "../src/m4/orchestrator.js";
import { OutcomeAttestationService } from "../src/m4/outcomeAttestationService.js";
import { RecoveryCoordinator } from "../src/m4/recoveryCoordinator.js";
import { M4TraceService } from "../src/m4/traceService.js";
import { createCommandId, createImmutableIdentifier } from "../src/shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../src/shared/types.js";

async function createStateDirectory(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "hal-m4-"));
}

function fixtureRootPath(): string {
  return path.resolve(import.meta.dirname, "../fixtures/synthetic-corpus");
}

function createM4Service(stateDirectory: string): OutcomeAttestationService {
  const traceService = new M4TraceService(stateDirectory);
  const recoveryCoordinator = new RecoveryCoordinator(traceService);
  const explanationService = new ExplanationService(traceService);
  return new OutcomeAttestationService({
    stateDirectory,
    traceService,
    recoveryCoordinator,
    explanationService
  });
}

function runM3AllowedFlow(input: {
  stateDirectory: string;
  correlationId: CorrelationId;
  decisionId: string;
  transactionId: string;
  intentId: string;
  planId: string;
}): void {
  const m3Trace = new M3TraceService(input.stateDirectory);
  const coordinator = new ExecutionCoordinator({
    traceService: m3Trace,
    m2AuditService: new AuditService(input.stateDirectory),
    registry: new CapabilityRegistry(m3Trace),
    provider: new LocalSyntheticCorpusInspector(),
    artifactService: new ArtifactService(m3Trace, input.stateDirectory),
    verificationService: new VerificationService(m3Trace, fixtureRootPath()),
    fixtureRoot: fixtureRootPath()
  });
  coordinator.submitCapabilityRequest({
    capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
    capabilityId: M3_CAPABILITY_ID,
    correlationId: input.correlationId,
    decisionId: input.decisionId as unknown as ImmutableIdentifier,
    transactionId: input.transactionId as unknown as ImmutableIdentifier,
    intentId: input.intentId as unknown as ImmutableIdentifier,
    planId: input.planId as unknown as ImmutableIdentifier,
    corpusReference: APPROVED_CORPUS_REFERENCE,
    itemLimit: 3,
    deadlineMs: 2000
  });
}

describe("M4 verified outcome and recovery proof", () => {
  test("verified M3 success creates exactly one achieved_without_effect attestation", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "allowed_verified" });
      expect(result.finalOutcomeStatus).toBe("achieved_without_effect");
      expect(result.claimedEffect).toBe("inspection_only");

      const trace = new M4TraceService(stateDirectory);
      const events = trace.listEventsByCorrelationId(result.correlationId);
      const attested = events.filter((event) => event.eventType === "OutcomeAttested");
      expect(attested).toHaveLength(1);
      expect(events.some((event) => event.eventType === "RecoveryCaseOpened")).toBe(false);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("denied and approval-required paths become blocked", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const approval = runM4VerifiedOutcomeDemo({
        stateDirectory,
        scenario: "blocked_approval_required"
      });
      const denied = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "blocked_denied" });
      expect(approval.finalOutcomeStatus).toBe("blocked");
      expect(approval.claimedEffect).toBe("none");
      expect(denied.finalOutcomeStatus).toBe("blocked");
      expect(denied.claimedEffect).toBe("none");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("cancelled, timed-out, and failed attempts map to truthful no-effect outcomes", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const cancelled = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "cancelled" });
      const timedOut = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "timed_out" });
      expect(cancelled.finalOutcomeStatus).toBe("cancelled_no_effect");
      expect(timedOut.finalOutcomeStatus).toBe("timed_out_no_effect");

      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      runM3AllowedFlow({
        stateDirectory,
        correlationId: m2.correlationId,
        decisionId: m2.decisionId,
        transactionId: m2.transactionId,
        intentId: m2.intentId,
        planId: m2.planId
      });
      const m3Trace = new M3TraceService(stateDirectory);
      const capabilityRequest = m3Trace
        .listEventsByCorrelationId(m2.correlationId)
        .filter((event) => event.recordKind === "capability_request" && event.record)
        .map((event) => event.record as CapabilityRequestRecord)
        .at(-1);
      if (!capabilityRequest) {
        throw new Error("Expected capability request record.");
      }
      const failedAttemptWithoutIntegrity: Omit<ExecutionAttemptRecord, "integrityHash"> = {
        commandId: createCommandId("seed_failed_attempt"),
        correlationId: m2.correlationId,
        schemaVersion: M3_SCHEMA_VERSION,
        dataClassification: "synthetic_non_sensitive",
        provenance: "local_m3_bounded_capability",
        timestampIso8601: new Date().toISOString(),
        executionAttemptId: createImmutableIdentifier("m3_execution_attempt"),
        capabilityRequestId: capabilityRequest.capabilityRequestId,
        providerId: M3_PROVIDER_ID,
        providerVersion: M3_PROVIDER_VERSION,
        status: "failed",
        deadlineMs: capabilityRequest.deadlineMs,
        cancellationRequested: false,
        statusReason: "Synthetic failed attempt for M4 mapping test."
      };
      const failedAttempt = Object.freeze({
        ...failedAttemptWithoutIntegrity,
        integrityHash: computeM3RecordIntegrityHash(failedAttemptWithoutIntegrity)
      } satisfies ExecutionAttemptRecord);
      m3Trace.appendDomainEvent({
        eventType: "ExecutionAttemptFailed",
        owner: "ExecutionCoordinator",
        status: "denied",
        commandName: "StartExecutionAttempt",
        commandId: createCommandId("seed_failed_attempt_event"),
        correlationId: m2.correlationId,
        payloadSummary: `attemptId=${failedAttempt.executionAttemptId}; status=failed`,
        commandFingerprint: M3TraceService.fingerprintRequest(failedAttempt),
        commandResult: {
          accepted: false,
          status: "denied",
          reason: "Synthetic failed attempt for test",
          eventType: "ExecutionAttemptFailed",
          recordKind: "execution_attempt",
          recordId: failedAttempt.executionAttemptId
        },
        recordKind: "execution_attempt",
        record: failedAttempt
      });

      const m4Service = createM4Service(stateDirectory);
      const failed = m4Service.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: m2.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      expect(failed.attestation.finalOutcomeStatus).toBe("failed_no_effect");
      expect(failed.attestation.claimedEffect).toBe("none");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("tampered M2/M3 journals, tampered artifact, and missing evidence fail closed with recovery", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const ok = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "allowed_verified" });
      const m2JournalPath = path.resolve(stateDirectory, "m2-event-journal.jsonl");
      const originalM2 = await readFile(m2JournalPath, "utf8");
      const m2Lines = originalM2.trim().split("\n");
      const firstM2 = JSON.parse(m2Lines[0] ?? "{}") as Record<string, unknown>;
      firstM2.payloadSummary = "tampered";
      m2Lines[0] = JSON.stringify(firstM2);
      await writeFile(m2JournalPath, `${m2Lines.join("\n")}\n`, "utf8");

      const m4ServiceTamperedM2 = createM4Service(stateDirectory);
      const m2Tampered = m4ServiceTamperedM2.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: ok.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      expect(m2Tampered.attestation.finalOutcomeStatus).toBe("incomplete_evidence_no_effect");
      expect(m2Tampered.recoveryCaseId).toBeDefined();

      await writeFile(m2JournalPath, originalM2, "utf8");

      const m3JournalPath = path.resolve(stateDirectory, "m3-event-journal.jsonl");
      const originalM3 = await readFile(m3JournalPath, "utf8");
      const m3Lines = originalM3.trim().split("\n");
      const firstM3 = JSON.parse(m3Lines[0] ?? "{}") as Record<string, unknown>;
      firstM3.payloadSummary = "tampered";
      m3Lines[0] = JSON.stringify(firstM3);
      await writeFile(m3JournalPath, `${m3Lines.join("\n")}\n`, "utf8");

      const m4ServiceTamperedM3 = createM4Service(stateDirectory);
      const m3Tampered = m4ServiceTamperedM3.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: ok.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      expect(m3Tampered.attestation.finalOutcomeStatus).toBe("incomplete_evidence_no_effect");
      expect(m3Tampered.recoveryCaseId).toBeDefined();

      await writeFile(m3JournalPath, originalM3, "utf8");

      const verificationRejected = runM4VerifiedOutcomeDemo({
        stateDirectory,
        scenario: "verification_rejected"
      });
      expect(verificationRejected.finalOutcomeStatus).toBe("verification_rejected_no_effect");
      expect(verificationRejected.recoveryCaseId).toBeDefined();

      const incomplete = runM4VerifiedOutcomeDemo({
        stateDirectory,
        scenario: "incomplete_evidence"
      });
      expect(incomplete.finalOutcomeStatus).toBe("incomplete_evidence_no_effect");
      expect(incomplete.recoveryCaseId).toBeDefined();
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("duplicate final-attestation request is idempotent and conflicting reuse is denied/audited", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      runM3AllowedFlow({
        stateDirectory,
        correlationId: m2.correlationId,
        decisionId: m2.decisionId,
        transactionId: m2.transactionId,
        intentId: m2.intentId,
        planId: m2.planId
      });
      const service = createM4Service(stateDirectory);
      const requestId = createImmutableIdentifier("m4_attestation_request");
      const first = service.finalizeOutcomeAttestation({
        attestationRequestId: requestId,
        correlationId: m2.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      const duplicate = service.finalizeOutcomeAttestation({
        attestationRequestId: requestId,
        correlationId: m2.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      expect(duplicate.attestation.attestationId).toBe(first.attestation.attestationId);

      expect(() =>
        service.finalizeOutcomeAttestation({
          attestationRequestId: requestId,
          correlationId: m2.correlationId,
          requestedCapabilityId: `${M3_CAPABILITY_ID}_other`
        })
      ).toThrow(/conflict denied/i);

      const m4Trace = new M4TraceService(stateDirectory);
      const events = m4Trace.listEventsByCorrelationId(m2.correlationId);
      expect(events.some((event) => event.eventType === "AttestationRequestConflictDenied")).toBe(
        true
      );
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("fresh-process cross-journal reconstruction works and explanation is bounded/redacted", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const run = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "allowed_verified" });
      const reconstruction = reconstructM4Trace(stateDirectory, run.correlationId);
      expect(reconstruction.m2IntegrityValid).toBe(true);
      expect(reconstruction.m3IntegrityValid).toBe(true);
      expect(reconstruction.m4IntegrityValid).toBe(true);
      expect(reconstruction.crossJournalLinkageValid).toBe(true);
      expect(reconstruction.finalOutcomeStatus).toBe("achieved_without_effect");

      const m4Trace = new M4TraceService(stateDirectory);
      const explanation = m4Trace
        .listEventsByCorrelationId(run.correlationId)
        .filter((event) => event.recordKind === "explanation" && event.record)
        .map((event) => event.record as { boundedExplanation: string })
        .at(-1);
      expect(explanation).toBeDefined();
      if (!explanation) {
        throw new Error("Expected explanation record.");
      }
      expect(explanation.boundedExplanation.length).toBeLessThanOrEqual(600);
      expect(explanation.boundedExplanation).not.toMatch(/fixtures\/synthetic-corpus/i);
      expect(explanation.boundedExplanation).not.toMatch(/Synthetic Corpus Alpha/i);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("reconstruction returns unavailable after valid attestation if M2 or M3 journal is tampered", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const valid = runM4VerifiedOutcomeDemo({ stateDirectory, scenario: "allowed_verified" });
      const validReconstruction = reconstructM4Trace(stateDirectory, valid.correlationId);
      expect(validReconstruction.finalOutcomeStatus).toBe("achieved_without_effect");

      const m2JournalPath = path.resolve(stateDirectory, "m2-event-journal.jsonl");
      const originalM2 = await readFile(m2JournalPath, "utf8");
      const m2Lines = originalM2.trim().split("\n");
      const firstM2 = JSON.parse(m2Lines[0] ?? "{}") as Record<string, unknown>;
      firstM2.payloadSummary = "tampered_for_reconstruct_test";
      m2Lines[0] = JSON.stringify(firstM2);
      await writeFile(m2JournalPath, `${m2Lines.join("\n")}\n`, "utf8");

      const reconstructedAfterM2Tamper = reconstructM4Trace(stateDirectory, valid.correlationId);
      expect(reconstructedAfterM2Tamper.m2IntegrityValid).toBe(false);
      expect(reconstructedAfterM2Tamper.finalOutcomeStatus).toBe("unavailable");
      expect(reconstructedAfterM2Tamper.claimedEffect).toBe("unavailable");
      expect(reconstructedAfterM2Tamper.boundedSummary).toContain(
        "traceTrust=restricted_untrusted"
      );
      expect(reconstructedAfterM2Tamper.boundedSummary).toContain("externalEffect=none");
      expect(reconstructedAfterM2Tamper.finalOutcomeStatus).not.toBe("achieved_without_effect");

      await writeFile(m2JournalPath, originalM2, "utf8");

      const m3JournalPath = path.resolve(stateDirectory, "m3-event-journal.jsonl");
      const originalM3 = await readFile(m3JournalPath, "utf8");
      const m3Lines = originalM3.trim().split("\n");
      const firstM3 = JSON.parse(m3Lines[0] ?? "{}") as Record<string, unknown>;
      firstM3.payloadSummary = "tampered_for_reconstruct_test";
      m3Lines[0] = JSON.stringify(firstM3);
      await writeFile(m3JournalPath, `${m3Lines.join("\n")}\n`, "utf8");

      const reconstructedAfterM3Tamper = reconstructM4Trace(stateDirectory, valid.correlationId);
      expect(reconstructedAfterM3Tamper.m3IntegrityValid).toBe(false);
      expect(reconstructedAfterM3Tamper.finalOutcomeStatus).toBe("unavailable");
      expect(reconstructedAfterM3Tamper.claimedEffect).toBe("unavailable");
      expect(reconstructedAfterM3Tamper.boundedSummary).toContain(
        "traceTrust=restricted_untrusted"
      );
      expect(reconstructedAfterM3Tamper.boundedSummary).toContain("externalEffect=none");
      expect(reconstructedAfterM3Tamper.finalOutcomeStatus).not.toBe("achieved_without_effect");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("readable cross-journal linkage mismatch causes reconstruction unavailable", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      runM3AllowedFlow({
        stateDirectory,
        correlationId: m2.correlationId,
        decisionId: m2.decisionId,
        transactionId: m2.transactionId,
        intentId: m2.intentId,
        planId: m2.planId
      });
      const m4Service = createM4Service(stateDirectory);
      const attested = m4Service.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: m2.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      expect(attested.attestation.finalOutcomeStatus).toBe("achieved_without_effect");

      const m3Trace = new M3TraceService(stateDirectory);
      const mismatchAttemptWithoutIntegrity: Omit<ExecutionAttemptRecord, "integrityHash"> = {
        commandId: createCommandId("seed_reconstruct_mismatch_attempt"),
        correlationId: m2.correlationId,
        schemaVersion: M3_SCHEMA_VERSION,
        dataClassification: "synthetic_non_sensitive",
        provenance: M3_PROVENANCE,
        timestampIso8601: new Date().toISOString(),
        executionAttemptId: createImmutableIdentifier("m3_execution_attempt"),
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        providerId: M3_PROVIDER_ID,
        providerVersion: M3_PROVIDER_VERSION,
        status: "succeeded",
        deadlineMs: 2000,
        cancellationRequested: false,
        statusReason: "Readable linkage-mismatch record for reconstruction test."
      };
      const mismatchAttempt = Object.freeze({
        ...mismatchAttemptWithoutIntegrity,
        integrityHash: computeM3RecordIntegrityHash(mismatchAttemptWithoutIntegrity)
      } satisfies ExecutionAttemptRecord);
      m3Trace.appendDomainEvent({
        eventType: "ExecutionAttemptSucceeded",
        owner: "ExecutionCoordinator",
        status: "applied",
        commandName: "StartExecutionAttempt",
        commandId: createCommandId("seed_reconstruct_mismatch_attempt_event"),
        correlationId: m2.correlationId,
        payloadSummary: `attemptId=${mismatchAttempt.executionAttemptId}; status=succeeded`,
        commandFingerprint: M3TraceService.fingerprintRequest(mismatchAttempt),
        commandResult: {
          accepted: true,
          status: "applied",
          reason: "Readable mismatch attempt for reconstruct check",
          eventType: "ExecutionAttemptSucceeded",
          recordKind: "execution_attempt",
          recordId: mismatchAttempt.executionAttemptId
        },
        recordKind: "execution_attempt",
        record: mismatchAttempt
      });

      const reconstructed = reconstructM4Trace(stateDirectory, m2.correlationId);
      expect(reconstructed.m2IntegrityValid).toBe(true);
      expect(reconstructed.m3IntegrityValid).toBe(true);
      expect(reconstructed.m4IntegrityValid).toBe(true);
      expect(reconstructed.crossJournalLinkageValid).toBe(false);
      expect(reconstructed.finalOutcomeStatus).toBe("unavailable");
      expect(reconstructed.claimedEffect).toBe("unavailable");
      expect(reconstructed.boundedSummary).toContain("traceTrust=restricted_untrusted");
      expect(reconstructed.boundedSummary).toContain("externalEffect=none");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("capability-ID mismatch fails closed with recovery and no achieved attestation", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      runM3AllowedFlow({
        stateDirectory,
        correlationId: m2.correlationId,
        decisionId: m2.decisionId,
        transactionId: m2.transactionId,
        intentId: m2.intentId,
        planId: m2.planId
      });
      const service = createM4Service(stateDirectory);
      const result = service.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: m2.correlationId,
        requestedCapabilityId: "inspect_synthetic_corpus_summary_v2"
      });
      expect(result.attestation.finalOutcomeStatus).toBe("incomplete_evidence_no_effect");
      expect(result.attestation.claimedEffect).toBe("none");
      expect(result.recoveryCaseId).toBeDefined();

      const events = new M4TraceService(stateDirectory).listEventsByCorrelationId(m2.correlationId);
      const achieved = events
        .filter((event) => event.recordKind === "outcome_attestation" && event.record)
        .map(
          (event) =>
            event.record as {
              finalOutcomeStatus: string;
            }
        )
        .some((record) => record.finalOutcomeStatus === "achieved_without_effect");
      expect(achieved).toBe(false);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("execution-attempt-to-capability-request mismatch fails closed with recovery and no achieved attestation", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      runM3AllowedFlow({
        stateDirectory,
        correlationId: m2.correlationId,
        decisionId: m2.decisionId,
        transactionId: m2.transactionId,
        intentId: m2.intentId,
        planId: m2.planId
      });
      const m3Trace = new M3TraceService(stateDirectory);
      const capabilityRequest = m3Trace
        .listEventsByCorrelationId(m2.correlationId)
        .filter((event) => event.recordKind === "capability_request" && event.record)
        .map((event) => event.record as CapabilityRequestRecord)
        .at(-1);
      if (!capabilityRequest) {
        throw new Error("Expected capability request record for mismatch test.");
      }
      const mismatchedAttemptWithoutIntegrity: Omit<ExecutionAttemptRecord, "integrityHash"> = {
        commandId: createCommandId("seed_mismatched_attempt"),
        correlationId: m2.correlationId,
        schemaVersion: M3_SCHEMA_VERSION,
        dataClassification: "synthetic_non_sensitive",
        provenance: M3_PROVENANCE,
        timestampIso8601: new Date().toISOString(),
        executionAttemptId: createImmutableIdentifier("m3_execution_attempt"),
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        providerId: M3_PROVIDER_ID,
        providerVersion: M3_PROVIDER_VERSION,
        status: "succeeded",
        deadlineMs: capabilityRequest.deadlineMs,
        cancellationRequested: false,
        statusReason: "Synthetic mismatch attempt for linkage regression test."
      };
      const mismatchedAttempt = Object.freeze({
        ...mismatchedAttemptWithoutIntegrity,
        integrityHash: computeM3RecordIntegrityHash(mismatchedAttemptWithoutIntegrity)
      } satisfies ExecutionAttemptRecord);
      m3Trace.appendDomainEvent({
        eventType: "ExecutionAttemptSucceeded",
        owner: "ExecutionCoordinator",
        status: "applied",
        commandName: "StartExecutionAttempt",
        commandId: createCommandId("seed_mismatched_attempt_event"),
        correlationId: m2.correlationId,
        payloadSummary: `attemptId=${mismatchedAttempt.executionAttemptId}; status=succeeded`,
        commandFingerprint: M3TraceService.fingerprintRequest(mismatchedAttempt),
        commandResult: {
          accepted: true,
          status: "applied",
          reason: "Synthetic mismatched attempt for M4 linkage test",
          eventType: "ExecutionAttemptSucceeded",
          recordKind: "execution_attempt",
          recordId: mismatchedAttempt.executionAttemptId
        },
        recordKind: "execution_attempt",
        record: mismatchedAttempt
      });

      const service = createM4Service(stateDirectory);
      const result = service.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: m2.correlationId,
        requestedCapabilityId: M3_CAPABILITY_ID
      });
      expect(result.attestation.finalOutcomeStatus).toBe("incomplete_evidence_no_effect");
      expect(result.attestation.claimedEffect).toBe("none");
      expect(result.recoveryCaseId).toBeDefined();

      const events = new M4TraceService(stateDirectory).listEventsByCorrelationId(m2.correlationId);
      const achieved = events
        .filter((event) => event.recordKind === "outcome_attestation" && event.record)
        .map(
          (event) =>
            event.record as {
              finalOutcomeStatus: string;
            }
        )
        .some((record) => record.finalOutcomeStatus === "achieved_without_effect");
      expect(achieved).toBe(false);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });
});
