import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import {
  AuditService,
  M2_PROVENANCE,
  M2_SCHEMA_VERSION,
  runM2DurableIntentDemo,
  type DecisionRecord,
  type IntentRecord,
  type PlanRecord,
  type TransactionRecord
} from "../src/m2/index.js";
import { ArtifactService } from "../src/m3/artifactService.js";
import { CapabilityRegistry } from "../src/m3/capabilityRegistry.js";
import { ExecutionCoordinator } from "../src/m3/executionCoordinator.js";
import { APPROVED_CORPUS_REFERENCE } from "../src/m3/fixtureCorpus.js";
import { LocalSyntheticCorpusInspector } from "../src/m3/localSyntheticCorpusInspector.js";
import { M3TraceService } from "../src/m3/traceService.js";
import { reconstructM3Trace, runM3BoundedCapabilityDemo } from "../src/m3/orchestrator.js";
import type {
  ArtifactRecord,
  CapabilityRequestInput,
  CapabilityRequestRecord
} from "../src/m3/types.js";
import { M3_CAPABILITY_ID } from "../src/m3/types.js";
import { createCommandId, createImmutableIdentifier } from "../src/shared/id.js";
import type { CorrelationId, ImmutableIdentifier, RequestId } from "../src/shared/types.js";
import { VerificationService } from "../src/m3/verificationService.js";

async function createStateDirectory(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "hal-m3-"));
}

function fixtureRootPath(): string {
  return path.resolve(import.meta.dirname, "../fixtures/synthetic-corpus");
}

function buildCoordinator(input: { stateDirectory: string; fixtureRoot?: string }): {
  coordinator: ExecutionCoordinator;
  traceService: M3TraceService;
  verificationService: VerificationService;
} {
  const traceService = new M3TraceService(input.stateDirectory);
  const auditService = new AuditService(input.stateDirectory);
  const fixtureRoot = input.fixtureRoot ?? fixtureRootPath();
  const registry = new CapabilityRegistry(traceService);
  const provider = new LocalSyntheticCorpusInspector();
  const artifactService = new ArtifactService(traceService, input.stateDirectory);
  const verificationService = new VerificationService(traceService, fixtureRoot);
  const coordinator = new ExecutionCoordinator({
    traceService,
    m2AuditService: auditService,
    registry,
    provider,
    artifactService,
    verificationService,
    fixtureRoot
  });
  return { coordinator, traceService, verificationService };
}

function buildM3Request(input: {
  correlationId: CorrelationId;
  decisionId: string;
  transactionId: string;
  intentId: string;
  planId: string;
  capabilityRequestId?: ImmutableIdentifier;
  deadlineMs?: number;
  itemLimit?: number;
  cancellationRequested?: boolean;
  corpusReference?: string;
}): CapabilityRequestInput {
  return Object.freeze({
    capabilityRequestId:
      input.capabilityRequestId ?? createImmutableIdentifier("m3_capability_request"),
    capabilityId: M3_CAPABILITY_ID,
    correlationId: input.correlationId,
    decisionId: input.decisionId as unknown as ImmutableIdentifier,
    transactionId: input.transactionId as unknown as ImmutableIdentifier,
    intentId: input.intentId as unknown as ImmutableIdentifier,
    planId: input.planId as unknown as ImmutableIdentifier,
    corpusReference: input.corpusReference ?? APPROVED_CORPUS_REFERENCE,
    itemLimit: input.itemLimit ?? 3,
    deadlineMs: input.deadlineMs ?? 2_000,
    ...(typeof input.cancellationRequested === "boolean"
      ? { cancellationRequested: input.cancellationRequested }
      : {})
  });
}

type SyntheticM2ReferenceSet = Readonly<{
  correlationId: CorrelationId;
  intentId: ImmutableIdentifier;
  planId: ImmutableIdentifier;
  decisionId: ImmutableIdentifier;
  transactionId: ImmutableIdentifier;
}>;

function seedSyntheticM2References(input: {
  auditService: AuditService;
  correlationId: CorrelationId;
  decisionDisposition: DecisionRecord["disposition"];
  transactionStatus: TransactionRecord["status"];
}): SyntheticM2ReferenceSet {
  const intentId = createImmutableIdentifier("intent");
  const planId = createImmutableIdentifier("plan");
  const decisionId = createImmutableIdentifier("decision");
  const transactionId = createImmutableIdentifier("transaction");
  const now = new Date().toISOString();

  const intentRecord: IntentRecord = Object.freeze({
    commandId: createCommandId("synthetic_intent"),
    correlationId: input.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    dataClassification: "synthetic_non_sensitive",
    provenance: M2_PROVENANCE,
    timestampIso8601: now,
    intentId,
    requestId: createImmutableIdentifier("request") as unknown as RequestId,
    declaredAction: "inspect_synthetic_corpus_summary",
    declaredTarget: "local_synthetic_corpus",
    declaredPurpose: "seed synthetic m2 linkage",
    status: "recorded"
  });
  const planRecord: PlanRecord = Object.freeze({
    commandId: createCommandId("synthetic_plan"),
    correlationId: input.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    dataClassification: "synthetic_non_sensitive",
    provenance: M2_PROVENANCE,
    timestampIso8601: now,
    planId,
    intentId,
    boundedSteps: Object.freeze(["seed"]),
    constraints: Object.freeze(["local-only"]),
    assumptions: Object.freeze(["synthetic"]),
    riskSummary: "none",
    status: "proposed"
  });
  const decisionRecord: DecisionRecord = Object.freeze({
    commandId: createCommandId("synthetic_decision"),
    correlationId: input.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    dataClassification: "synthetic_non_sensitive",
    provenance: M2_PROVENANCE,
    timestampIso8601: now,
    decisionId,
    intentId,
    planId,
    disposition: input.decisionDisposition,
    reason: "seeded decision",
    uncertainty: "low",
    status: "recorded"
  });
  const transactionRecord: TransactionRecord = Object.freeze({
    commandId: createCommandId("synthetic_transaction"),
    correlationId: input.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    dataClassification: "synthetic_non_sensitive",
    provenance: M2_PROVENANCE,
    timestampIso8601: now,
    transactionId,
    intentId,
    planId,
    decisionId,
    status: input.transactionStatus,
    declaredEffectClass: "local_synthetic_inspection",
    claimedEffect:
      input.transactionStatus === "completed_without_effect" ? "inspection_only" : "none",
    recoveryDisposition: "reconstruct_from_journal"
  });

  input.auditService.recordCommandEvent({
    eventType: "IntentRecorded",
    owner: "SyntheticTestSeed",
    status: "applied",
    commandName: "RecordIntent",
    commandId: intentRecord.commandId,
    correlationId: input.correlationId,
    payloadSummary: "seed intent",
    commandFingerprint: "seed-intent",
    commandResult: {
      accepted: true,
      status: "applied",
      reason: "seeded",
      eventType: "IntentRecorded",
      recordKind: "intent",
      recordId: intentId
    },
    recordKind: "intent",
    record: intentRecord
  });
  input.auditService.recordCommandEvent({
    eventType: "PlanProposed",
    owner: "SyntheticTestSeed",
    status: "applied",
    commandName: "ProposePlan",
    commandId: planRecord.commandId,
    correlationId: input.correlationId,
    payloadSummary: "seed plan",
    commandFingerprint: "seed-plan",
    commandResult: {
      accepted: true,
      status: "applied",
      reason: "seeded",
      eventType: "PlanProposed",
      recordKind: "plan",
      recordId: planId
    },
    recordKind: "plan",
    record: planRecord
  });
  input.auditService.recordCommandEvent({
    eventType: "DecisionRecorded",
    owner: "SyntheticTestSeed",
    status: "applied",
    commandName: "RecordDecision",
    commandId: decisionRecord.commandId,
    correlationId: input.correlationId,
    payloadSummary: "seed decision",
    commandFingerprint: "seed-decision",
    commandResult: {
      accepted: true,
      status: "applied",
      reason: "seeded",
      eventType: "DecisionRecorded",
      recordKind: "decision",
      recordId: decisionId
    },
    recordKind: "decision",
    record: decisionRecord
  });
  input.auditService.recordCommandEvent({
    eventType: "TransactionOpened",
    owner: "SyntheticTestSeed",
    status: "applied",
    commandName: "OpenTransaction",
    commandId: transactionRecord.commandId,
    correlationId: input.correlationId,
    payloadSummary: "seed transaction",
    commandFingerprint: "seed-transaction",
    commandResult: {
      accepted: true,
      status: "applied",
      reason: "seeded",
      eventType: "TransactionOpened",
      recordKind: "transaction",
      recordId: transactionId
    },
    recordKind: "transaction",
    record: transactionRecord
  });

  return Object.freeze({
    correlationId: input.correlationId,
    intentId,
    planId,
    decisionId,
    transactionId
  });
}

function assertRejectedAdmissionEvidence(input: {
  traceService: M3TraceService;
  correlationId: CorrelationId;
  capabilityRequestId: ImmutableIdentifier;
  expectedCategory: string;
}): void {
  expect(() => new M3TraceService(input.traceService.getStateDirectory())).not.toThrow();
  const replay = new M3TraceService(input.traceService.getStateDirectory());
  const events = replay.listEventsByCorrelationId(input.correlationId);
  const rejection = [...events]
    .reverse()
    .find(
      (event) =>
        event.eventType === "CapabilityRequestRejected" &&
        event.commandName === "SubmitCapabilityRequest" &&
        event.payloadSummary.includes(`requestId=${input.capabilityRequestId}`)
    );
  expect(rejection).toBeDefined();
  if (!rejection) {
    return;
  }

  expect(rejection.commandId).toBeTruthy();
  expect(rejection.payloadSummary).toContain(`category=${input.expectedCategory}`);
  expect(rejection.correlationId).toBe(input.correlationId);
  expect(rejection.commandResult?.accepted).toBe(false);
  expect(rejection.commandResult?.status).toBe("denied");
  expect(rejection.commandResult?.reason).toContain(input.expectedCategory);

  const admittedRecord = events.some(
    (event) =>
      event.eventType === "CapabilityRequestAdmitted" &&
      event.recordKind === "capability_request" &&
      (event.record as { capabilityRequestId?: string } | undefined)?.capabilityRequestId ===
        input.capabilityRequestId
  );
  expect(admittedRecord).toBe(false);
  expect(events.some((event) => event.eventType === "ExecutionAttemptSucceeded")).toBe(false);
  expect(events.some((event) => event.recordKind === "artifact")).toBe(false);
  expect(
    events.some(
      (event) =>
        event.recordKind === "verification" &&
        (event.record as { verified?: boolean } | undefined)?.verified === true
    )
  ).toBe(false);
}

describe("M3 bounded local capability", () => {
  test("allowed M2 path produces a verified M3 artifact", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const { coordinator } = buildCoordinator({ stateDirectory });
      const result = coordinator.submitCapabilityRequest(
        buildM3Request({
          correlationId: m2.correlationId,
          decisionId: m2.decisionId,
          transactionId: m2.transactionId,
          intentId: m2.intentId,
          planId: m2.planId
        })
      );

      expect(result.attempt.status).toBe("succeeded");
      expect(result.verification?.verified).toBe(true);
      expect(result.claimedEffect).toBe("inspection_only");
      expect(result.attempt.artifactId).toBeDefined();
      expect(result.attempt.verificationId).toBeDefined();
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("approval-required and denied M2 paths are rejected before provider invocation", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const approval = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "approval_required_request",
        stateDirectory
      });
      const denied = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "denied_unknown_request",
        stateDirectory
      });
      const { coordinator: approvalCoordinator } = buildCoordinator({ stateDirectory });
      const { coordinator: deniedCoordinator } = buildCoordinator({ stateDirectory });

      expect(() =>
        approvalCoordinator.submitCapabilityRequest(
          buildM3Request({
            correlationId: approval.correlationId,
            decisionId: approval.decisionId,
            transactionId: approval.transactionId,
            intentId: approval.intentId,
            planId: approval.planId
          })
        )
      ).toThrow(/decision must be allow/i);
      expect(approvalCoordinator.getProviderInvocationCount()).toBe(0);

      expect(() =>
        deniedCoordinator.submitCapabilityRequest(
          buildM3Request({
            correlationId: denied.correlationId,
            decisionId: denied.decisionId,
            transactionId: denied.transactionId,
            intentId: denied.intentId,
            planId: denied.planId
          })
        )
      ).toThrow(/decision must be allow/i);
      expect(deniedCoordinator.getProviderInvocationCount()).toBe(0);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("traversal, url-like corpus reference, secret-like fixture values, and invalid limits are rejected", async () => {
    const stateDirectory = await createStateDirectory();
    const secretFixtureRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m3-secret-fixture-"));
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      await writeFile(
        path.join(secretFixtureRoot, "secret.json"),
        JSON.stringify({ id: "s1", paragraphs: ["password=synthetic-leak"] }),
        "utf8"
      );

      const { coordinator } = buildCoordinator({ stateDirectory, fixtureRoot: secretFixtureRoot });

      expect(() =>
        coordinator.submitCapabilityRequest(
          buildM3Request({
            correlationId: m2.correlationId,
            decisionId: m2.decisionId,
            transactionId: m2.transactionId,
            intentId: m2.intentId,
            planId: m2.planId,
            corpusReference: "../outside"
          })
        )
      ).toThrow(/unsupported corpus reference|traversal/i);

      expect(() =>
        coordinator.submitCapabilityRequest(
          buildM3Request({
            correlationId: m2.correlationId,
            decisionId: m2.decisionId,
            transactionId: m2.transactionId,
            intentId: m2.intentId,
            planId: m2.planId,
            corpusReference: "https://example.com/corpus.json"
          })
        )
      ).toThrow(/unsupported corpus reference|url-like/i);

      expect(() =>
        coordinator.submitCapabilityRequest(
          buildM3Request({
            correlationId: m2.correlationId,
            decisionId: m2.decisionId,
            transactionId: m2.transactionId,
            intentId: m2.intentId,
            planId: m2.planId,
            itemLimit: 0
          })
        )
      ).toThrow(/itemLimit|bounds/i);

      expect(() =>
        coordinator.submitCapabilityRequest(
          buildM3Request({
            correlationId: m2.correlationId,
            decisionId: m2.decisionId,
            transactionId: m2.transactionId,
            intentId: m2.intentId,
            planId: m2.planId
          })
        )
      ).toThrow(/secret-like pattern/i);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
      await rm(secretFixtureRoot, { recursive: true, force: true });
    }
  });

  test("duplicate identical request IDs are idempotent and conflicting reuse is denied", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const { coordinator } = buildCoordinator({ stateDirectory });
      const requestId = createImmutableIdentifier("m3_capability_request");
      const first = coordinator.submitCapabilityRequest(
        buildM3Request({
          capabilityRequestId: requestId,
          correlationId: m2.correlationId,
          decisionId: m2.decisionId,
          transactionId: m2.transactionId,
          intentId: m2.intentId,
          planId: m2.planId
        })
      );
      const duplicate = coordinator.submitCapabilityRequest(
        buildM3Request({
          capabilityRequestId: requestId,
          correlationId: m2.correlationId,
          decisionId: m2.decisionId,
          transactionId: m2.transactionId,
          intentId: m2.intentId,
          planId: m2.planId
        })
      );

      expect(duplicate.attempt.executionAttemptId).toBe(first.attempt.executionAttemptId);
      expect(coordinator.getProviderInvocationCount()).toBe(1);

      expect(() =>
        coordinator.submitCapabilityRequest(
          buildM3Request({
            capabilityRequestId: requestId,
            correlationId: m2.correlationId,
            decisionId: m2.decisionId,
            transactionId: m2.transactionId,
            intentId: m2.intentId,
            planId: m2.planId,
            itemLimit: 2
          })
        )
      ).toThrow(/reuse conflict denied/i);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("cancelled and timed_out attempts never claim success or effect", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const { coordinator } = buildCoordinator({ stateDirectory });
      const cancelled = coordinator.submitCapabilityRequest(
        buildM3Request({
          correlationId: m2.correlationId,
          decisionId: m2.decisionId,
          transactionId: m2.transactionId,
          intentId: m2.intentId,
          planId: m2.planId,
          cancellationRequested: true
        })
      );
      const timedOut = coordinator.submitCapabilityRequest(
        buildM3Request({
          correlationId: m2.correlationId,
          decisionId: m2.decisionId,
          transactionId: m2.transactionId,
          intentId: m2.intentId,
          planId: m2.planId,
          deadlineMs: 1
        })
      );

      expect(cancelled.attempt.status).toBe("cancelled");
      expect(cancelled.claimedEffect).toBe("none");
      expect(cancelled.attempt.artifactId).toBeUndefined();
      expect(timedOut.attempt.status).toBe("timed_out");
      expect(timedOut.claimedEffect).toBe("none");
      expect(timedOut.attempt.artifactId).toBeUndefined();
      expect(coordinator.getProviderInvocationCount()).toBe(0);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("input manifest mismatch and artifact tampering fail verification", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const m2 = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const { coordinator, traceService, verificationService } = buildCoordinator({
        stateDirectory
      });
      const execution = coordinator.submitCapabilityRequest(
        buildM3Request({
          correlationId: m2.correlationId,
          decisionId: m2.decisionId,
          transactionId: m2.transactionId,
          intentId: m2.intentId,
          planId: m2.planId
        })
      );
      if (!execution.attempt.artifactId) {
        throw new Error("Expected artifact to be present for successful execution.");
      }

      const artifact = traceService.getRecordById<ArtifactRecord>(
        "artifact",
        execution.attempt.artifactId
      );
      const request = traceService.getRecordById<CapabilityRequestRecord>(
        "capability_request",
        execution.capabilityRequest.capabilityRequestId
      );
      if (!artifact || !request) {
        throw new Error("Missing artifact or request record from trace.");
      }

      const badManifestVerification = verificationService.verifyArtifact({
        correlationId: request.correlationId,
        capabilityRequestId: request.capabilityRequestId,
        executionAttemptId: execution.attempt.executionAttemptId,
        transactionId: request.transactionId,
        decisionId: request.decisionId,
        expectedFixtureManifestHash: "tampered-manifest-hash",
        artifact
      });
      expect(badManifestVerification.verified).toBe(false);

      const originalArtifact = await readFile(artifact.artifactPath, "utf8");
      const tamperedPayload = JSON.parse(originalArtifact) as Record<string, unknown>;
      tamperedPayload.itemCount = 99;
      await writeFile(
        artifact.artifactPath,
        `${JSON.stringify(tamperedPayload, null, 2)}\n`,
        "utf8"
      );

      const tamperedArtifactVerification = verificationService.verifyArtifact({
        correlationId: request.correlationId,
        capabilityRequestId: request.capabilityRequestId,
        executionAttemptId: execution.attempt.executionAttemptId,
        transactionId: request.transactionId,
        decisionId: request.decisionId,
        expectedFixtureManifestHash: request.fixtureManifestHash,
        artifact
      });
      expect(tamperedArtifactVerification.verified).toBe(false);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("rejected admission events are durably recorded for malformed and boundary-invalid requests", async () => {
    const stateDirectory = await createStateDirectory();
    const emptyFixtureRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m3-empty-fixture-"));
    const secretFixtureRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m3-secret-fixture-"));
    try {
      const allowed = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      await writeFile(
        path.join(secretFixtureRoot, "secret.json"),
        JSON.stringify({ id: "x", paragraphs: ["private_key=synthetic"] }),
        "utf8"
      );

      const baselineRequest = buildM3Request({
        correlationId: allowed.correlationId,
        decisionId: allowed.decisionId,
        transactionId: allowed.transactionId,
        intentId: allowed.intentId,
        planId: allowed.planId
      });

      const malformedCoordinator = buildCoordinator({ stateDirectory });
      const malformedRequest = {
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        corpusReference: " "
      } as unknown as CapabilityRequestInput;
      expect(() =>
        malformedCoordinator.coordinator.submitCapabilityRequest(malformedRequest)
      ).toThrow(/corpusReference is required/i);
      expect(malformedCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: malformedCoordinator.traceService,
        correlationId: malformedRequest.correlationId,
        capabilityRequestId: malformedRequest.capabilityRequestId,
        expectedCategory: "malformed_request_field"
      });

      const deadlineCoordinator = buildCoordinator({ stateDirectory });
      const badDeadlineRequest = buildM3Request({
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        deadlineMs: 0
      });
      expect(() =>
        deadlineCoordinator.coordinator.submitCapabilityRequest(badDeadlineRequest)
      ).toThrow(/deadline outside allowed bounds/i);
      expect(deadlineCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: deadlineCoordinator.traceService,
        correlationId: badDeadlineRequest.correlationId,
        capabilityRequestId: badDeadlineRequest.capabilityRequestId,
        expectedCategory: "invalid_deadline"
      });

      const itemLimitCoordinator = buildCoordinator({ stateDirectory });
      const badItemRequest = buildM3Request({
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        itemLimit: 0
      });
      expect(() =>
        itemLimitCoordinator.coordinator.submitCapabilityRequest(badItemRequest)
      ).toThrow(/item limit outside allowed bounds/i);
      expect(itemLimitCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: itemLimitCoordinator.traceService,
        correlationId: badItemRequest.correlationId,
        capabilityRequestId: badItemRequest.capabilityRequestId,
        expectedCategory: "invalid_item_limit"
      });

      const capabilityCoordinator = buildCoordinator({ stateDirectory });
      const unknownCapabilityRequest = {
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        capabilityId: "unknown_capability"
      } as unknown as CapabilityRequestInput;
      expect(() =>
        capabilityCoordinator.coordinator.submitCapabilityRequest(unknownCapabilityRequest)
      ).toThrow(/capability\/provider mismatch/i);
      expect(capabilityCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: capabilityCoordinator.traceService,
        correlationId: unknownCapabilityRequest.correlationId,
        capabilityRequestId: unknownCapabilityRequest.capabilityRequestId,
        expectedCategory: "unknown_capability_or_provider"
      });

      const traversalCoordinator = buildCoordinator({ stateDirectory });
      const traversalRequest = buildM3Request({
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        corpusReference: "../outside"
      });
      expect(() =>
        traversalCoordinator.coordinator.submitCapabilityRequest(traversalRequest)
      ).toThrow(/unsupported corpus reference|traversal/i);
      expect(traversalCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: traversalCoordinator.traceService,
        correlationId: traversalRequest.correlationId,
        capabilityRequestId: traversalRequest.capabilityRequestId,
        expectedCategory: "invalid_corpus_input"
      });

      const urlCoordinator = buildCoordinator({ stateDirectory });
      const urlRequest = buildM3Request({
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request"),
        corpusReference: "https://example.test/data.json"
      });
      expect(() => urlCoordinator.coordinator.submitCapabilityRequest(urlRequest)).toThrow(
        /unsupported corpus reference|url-like/i
      );
      expect(urlCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: urlCoordinator.traceService,
        correlationId: urlRequest.correlationId,
        capabilityRequestId: urlRequest.capabilityRequestId,
        expectedCategory: "invalid_corpus_input"
      });

      const missingCorpusCoordinator = buildCoordinator({
        stateDirectory,
        fixtureRoot: emptyFixtureRoot
      });
      const missingCorpusRequest = buildM3Request({
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request")
      });
      expect(() =>
        missingCorpusCoordinator.coordinator.submitCapabilityRequest(missingCorpusRequest)
      ).toThrow(/no approved fixture files found/i);
      expect(missingCorpusCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: missingCorpusCoordinator.traceService,
        correlationId: missingCorpusRequest.correlationId,
        capabilityRequestId: missingCorpusRequest.capabilityRequestId,
        expectedCategory: "missing_corpus_fixture"
      });

      const secretCoordinator = buildCoordinator({
        stateDirectory,
        fixtureRoot: secretFixtureRoot
      });
      const secretRequest = buildM3Request({
        ...baselineRequest,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request")
      });
      expect(() => secretCoordinator.coordinator.submitCapabilityRequest(secretRequest)).toThrow(
        /secret-like pattern/i
      );
      expect(secretCoordinator.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: secretCoordinator.traceService,
        correlationId: secretRequest.correlationId,
        capabilityRequestId: secretRequest.capabilityRequestId,
        expectedCategory: "secret_like_corpus_content"
      });
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
      await rm(emptyFixtureRoot, { recursive: true, force: true });
      await rm(secretFixtureRoot, { recursive: true, force: true });
    }
  });

  test("rejected admission events are durably recorded for M2 reference categories", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const allowed = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const approval = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "approval_required_request",
        stateDirectory
      });

      const missingRefs = buildCoordinator({ stateDirectory });
      const missingRequest = buildM3Request({
        correlationId: allowed.correlationId,
        decisionId: createImmutableIdentifier("decision"),
        transactionId: createImmutableIdentifier("transaction"),
        intentId: createImmutableIdentifier("intent"),
        planId: createImmutableIdentifier("plan"),
        capabilityRequestId: createImmutableIdentifier("m3_capability_request")
      });
      expect(() => missingRefs.coordinator.submitCapabilityRequest(missingRequest)).toThrow(
        /references are missing/i
      );
      expect(missingRefs.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: missingRefs.traceService,
        correlationId: missingRequest.correlationId,
        capabilityRequestId: missingRequest.capabilityRequestId,
        expectedCategory: "missing_m2_references"
      });

      const correlationMismatch = buildCoordinator({ stateDirectory });
      const mismatchRequest = buildM3Request({
        correlationId: createImmutableIdentifier("corr") as unknown as CorrelationId,
        decisionId: allowed.decisionId,
        transactionId: allowed.transactionId,
        intentId: allowed.intentId,
        planId: allowed.planId,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request")
      });
      expect(() =>
        correlationMismatch.coordinator.submitCapabilityRequest(mismatchRequest)
      ).toThrow(/correlation mismatch/i);
      expect(correlationMismatch.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: correlationMismatch.traceService,
        correlationId: mismatchRequest.correlationId,
        capabilityRequestId: mismatchRequest.capabilityRequestId,
        expectedCategory: "m2_correlation_mismatch"
      });

      const decisionNotAllow = buildCoordinator({ stateDirectory });
      const notAllowRequest = buildM3Request({
        correlationId: approval.correlationId,
        decisionId: approval.decisionId,
        transactionId: approval.transactionId,
        intentId: approval.intentId,
        planId: approval.planId,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request")
      });
      expect(() => decisionNotAllow.coordinator.submitCapabilityRequest(notAllowRequest)).toThrow(
        /decision must be allow/i
      );
      expect(decisionNotAllow.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: decisionNotAllow.traceService,
        correlationId: notAllowRequest.correlationId,
        capabilityRequestId: notAllowRequest.capabilityRequestId,
        expectedCategory: "m2_decision_not_allow"
      });

      const syntheticCorrelation = createImmutableIdentifier("corr") as unknown as CorrelationId;
      const syntheticAudit = new AuditService(stateDirectory);
      const synthetic = seedSyntheticM2References({
        auditService: syntheticAudit,
        correlationId: syntheticCorrelation,
        decisionDisposition: "allow",
        transactionStatus: "blocked"
      });
      const blockedTransaction = buildCoordinator({ stateDirectory });
      const blockedRequest = buildM3Request({
        correlationId: synthetic.correlationId,
        decisionId: synthetic.decisionId,
        transactionId: synthetic.transactionId,
        intentId: synthetic.intentId,
        planId: synthetic.planId,
        capabilityRequestId: createImmutableIdentifier("m3_capability_request")
      });
      expect(() => blockedTransaction.coordinator.submitCapabilityRequest(blockedRequest)).toThrow(
        /transaction status is not executable/i
      );
      expect(blockedTransaction.coordinator.getProviderInvocationCount()).toBe(0);
      assertRejectedAdmissionEvidence({
        traceService: blockedTransaction.traceService,
        correlationId: blockedRequest.correlationId,
        capabilityRequestId: blockedRequest.capabilityRequestId,
        expectedCategory: "m2_transaction_not_eligible"
      });
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("restart/replay reconstructs full trace by correlation ID", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const run = runM3BoundedCapabilityDemo({
        stateDirectory,
        fixtureRoot: fixtureRootPath()
      });
      const trace = reconstructM3Trace(stateDirectory, run.correlationId);

      expect(trace.correlationId).toBe(run.correlationId);
      expect(trace.capabilityRequestId).toBe(run.capabilityRequestId);
      expect(trace.executionAttemptId).toBe(run.executionAttemptId);
      expect(trace.finalAttemptStatus).toBe("succeeded");
      expect(trace.verificationPassed).toBe(true);
      expect(trace.claimedEffect).toBe("inspection_only");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });
});
