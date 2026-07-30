import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { evaluateLocalPolicy } from "../src/authority/localPolicy.js";
import { SafeMode } from "../src/kernel/safeMode.js";
import {
  AuditService,
  DecisionService,
  EvidenceService,
  IntentManager,
  OutcomeService,
  Planner,
  TransactionCoordinator,
  reconstructM2Trace,
  runM2DurableIntentDemo,
  type DecisionRecord,
  type OutcomeRecord,
  type RecordIntentCommand,
  type TransactionRecord,
  M2_PROVENANCE,
  M2_SCHEMA_VERSION
} from "../src/m2/index.js";
import { loadLocalRequestFixture } from "../src/request/fixtures.js";
import { createCommandId } from "../src/shared/id.js";

async function createStateDirectory(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "hal-m2-"));
}

describe("M2 durable intent path", () => {
  test("allowed inspection path reaches completed_without_effect", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });

      expect(result.disposition).toBe("allow");
      expect(result.transactionStatus).toBe("completed_without_effect");
      expect(result.claimedEffect).toBe("inspection_only");
      expect(result.eventCount).toBeGreaterThanOrEqual(6);
      expect(result.journalPath.startsWith(path.resolve(stateDirectory))).toBe(true);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("approval-required and denied paths are blocked with no claimed effect", async () => {
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

      expect(approval.disposition).toBe("approval_required");
      expect(approval.transactionStatus).toBe("blocked");
      expect(approval.claimedEffect).toBe("none");
      expect(denied.disposition).toBe("deny");
      expect(denied.transactionStatus).toBe("blocked");
      expect(denied.claimedEffect).toBe("none");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("duplicate identical command returns original disposition", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const audit = new AuditService(stateDirectory);
      const intentManager = new IntentManager(audit);
      const request = loadLocalRequestFixture("allowed_inspection_request");
      const commandId = createCommandId("record_intent_dedup");
      const command: RecordIntentCommand = {
        commandName: "RecordIntent",
        commandId,
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: { request }
      };

      const first = intentManager.recordIntent(command);
      const second = intentManager.recordIntent(command);

      expect(first.result).toBe("applied");
      expect(second.result).toBe("duplicate");
      expect(second.intentRecord?.intentId).toBe(first.intentRecord?.intentId);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("conflicting command-ID reuse is denied and audited", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const audit = new AuditService(stateDirectory);
      const intentManager = new IntentManager(audit);
      const original = loadLocalRequestFixture("allowed_inspection_request");
      const conflicting = loadLocalRequestFixture("denied_unknown_request");
      const commandId = createCommandId("record_intent_conflict");

      const first = intentManager.recordIntent({
        commandName: "RecordIntent",
        commandId,
        correlationId: original.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: { request: original }
      });
      const second = intentManager.recordIntent({
        commandName: "RecordIntent",
        commandId,
        correlationId: original.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: { request: conflicting }
      });

      const events = audit.listEventsByCorrelationId(original.correlationId);
      expect(first.result).toBe("applied");
      expect(second.result).toBe("denied");
      expect(events.some((event) => event.eventType === "CommandConflictDenied")).toBe(true);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("replay reconstructs completed and blocked paths after fresh process view", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const completed = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const blocked = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "denied_unknown_request",
        stateDirectory
      });

      const completedTrace = reconstructM2Trace(stateDirectory, completed.correlationId);
      const blockedTrace = reconstructM2Trace(stateDirectory, blocked.correlationId);

      expect(completedTrace.summary.transactionStatus).toBe("completed_without_effect");
      expect(completedTrace.summary.claimedEffect).toBe("inspection_only");
      expect(blockedTrace.summary.transactionStatus).toBe("blocked");
      expect(blockedTrace.summary.claimedEffect).toBe("none");
      expect(completedTrace.events.length).toBeGreaterThanOrEqual(6);
      expect(blockedTrace.events.length).toBeGreaterThanOrEqual(6);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("all records and events include required metadata and reject non-owner mutation attempts", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const request = loadLocalRequestFixture("allowed_inspection_request");
      const safeMode = new SafeMode("restrictive");
      const disposition = evaluateLocalPolicy(request, safeMode);
      const audit = new AuditService(stateDirectory);
      const intentManager = new IntentManager(audit);
      const planner = new Planner(audit);
      const decisionService = new DecisionService(audit);
      const transactionCoordinator = new TransactionCoordinator(audit);
      const evidenceService = new EvidenceService(audit);
      const outcomeService = new OutcomeService(audit);

      const intent = intentManager.recordIntent({
        commandName: "RecordIntent",
        commandId: createCommandId("record_intent_owner"),
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: { request }
      }).intentRecord;
      if (!intent) {
        throw new Error("Intent did not record.");
      }

      const plan = planner.proposePlan({
        commandName: "ProposePlan",
        commandId: createCommandId("propose_plan_owner"),
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: intent.intentId,
          boundedSteps: ["bounded step"],
          constraints: ["local-only"],
          assumptions: ["synthetic input"],
          riskSummary: "none"
        }
      }).planRecord;
      if (!plan) {
        throw new Error("Plan did not record.");
      }

      const decision = decisionService.recordDecision({
        commandName: "RecordDecision",
        commandId: createCommandId("record_decision_owner"),
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: intent.intentId,
          planId: plan.planId,
          disposition: disposition.disposition,
          reason: disposition.reason,
          uncertainty: "low"
        }
      }).decisionRecord as DecisionRecord;

      const transaction = transactionCoordinator.openTransaction({
        commandName: "OpenTransaction",
        commandId: createCommandId("open_transaction_owner"),
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: intent.intentId,
          planId: plan.planId,
          decisionId: decision.decisionId,
          declaredEffectClass: "local_synthetic_inspection",
          status: "completed_without_effect",
          claimedEffect: "inspection_only"
        }
      }).transactionRecord as TransactionRecord;

      const evidence = evidenceService.attachEvidence({
        commandName: "AttachEvidence",
        commandId: createCommandId("attach_evidence_owner"),
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          subjectKind: "transaction",
          subjectId: transaction.transactionId,
          claim: "evidence claim",
          confidence: "high"
        }
      }).evidenceRecord;
      if (!evidence) {
        throw new Error("Evidence did not record.");
      }

      const outcome = outcomeService.finalizeOutcome({
        commandName: "FinalizeOutcome",
        commandId: createCommandId("finalize_outcome_owner"),
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: intent.intentId,
          transactionId: transaction.transactionId,
          decisionId: decision.decisionId,
          status: "achieved_without_effect",
          summary: "local-only finalized",
          claimedEffect: "inspection_only"
        }
      }).outcomeRecord as OutcomeRecord;

      expect(Object.isFrozen(intent)).toBe(true);
      expect(Object.isFrozen(plan)).toBe(true);
      expect(Object.isFrozen(decision)).toBe(true);
      expect(Object.isFrozen(transaction)).toBe(true);
      expect(Object.isFrozen(evidence)).toBe(true);
      expect(Object.isFrozen(outcome)).toBe(true);
      expect(() => {
        (intent as { status: string }).status = "tampered";
      }).toThrow();

      const events = audit.listEventsByCorrelationId(request.correlationId);
      for (const event of events) {
        expect(event.commandId).toBeTruthy();
        expect(event.correlationId).toBeTruthy();
        expect(event.schemaVersion).toBe(M2_SCHEMA_VERSION);
        expect(event.dataClassification).toBe("synthetic_non_sensitive");
        expect(event.provenance).toBe(M2_PROVENANCE);
        expect(event.timestampIso8601).toMatch(/T/);
        expect(event.integrityHash).toMatch(/^[a-f0-9]{64}$/);
        expect(event.status === "applied" || event.status === "denied").toBe(true);
      }
      const withRecords = events.filter((event) => Boolean(event.record));
      expect(withRecords.length).toBeGreaterThanOrEqual(6);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("transaction creation enforces decision-to-transaction authority consistency", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const prepared = await buildPreparedFlow(stateDirectory, "allowed_inspection_request");
      const inconsistent = prepared.transactionCoordinator.openTransaction({
        commandName: "OpenTransaction",
        commandId: createCommandId("open_transaction_inconsistent"),
        correlationId: prepared.request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: prepared.intent.intentId,
          planId: prepared.plan.planId,
          decisionId: prepared.decision.decisionId,
          declaredEffectClass: "local_synthetic_inspection",
          status: "blocked",
          claimedEffect: "none"
        }
      });

      const notStarted = prepared.transactionCoordinator.openTransaction({
        commandName: "OpenTransaction",
        commandId: createCommandId("open_transaction_not_started"),
        correlationId: prepared.request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: prepared.intent.intentId,
          planId: prepared.plan.planId,
          decisionId: prepared.decision.decisionId,
          declaredEffectClass: "local_synthetic_inspection",
          status: "not_started",
          claimedEffect: "inspection_only"
        }
      });

      expect(inconsistent.result).toBe("denied");
      expect(notStarted.result).toBe("denied");
      const events = prepared.audit.listEventsByCorrelationId(prepared.request.correlationId);
      const transactions = events.filter((event) => event.recordKind === "transaction");
      expect(transactions).toHaveLength(0);
      expect(
        events.filter((event) => event.eventType === "CommandRejected").length
      ).toBeGreaterThanOrEqual(2);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("outcome finalization validates references/correlation and derives status/effect", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const prepared = await buildPreparedFlow(stateDirectory, "approval_required_request");
      const transaction = prepared.transactionCoordinator.openTransaction({
        commandName: "OpenTransaction",
        commandId: createCommandId("open_transaction_blocked"),
        correlationId: prepared.request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: prepared.intent.intentId,
          planId: prepared.plan.planId,
          decisionId: prepared.decision.decisionId,
          declaredEffectClass: "local_synthetic_inspection",
          status: "blocked",
          claimedEffect: "none"
        }
      }).transactionRecord as TransactionRecord;

      const rejectedMismatch = prepared.outcomeService.finalizeOutcome({
        commandName: "FinalizeOutcome",
        commandId: createCommandId("outcome_mismatch"),
        correlationId: prepared.request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: prepared.intent.intentId,
          transactionId: transaction.transactionId,
          decisionId: prepared.decision.decisionId,
          status: "achieved_without_effect",
          summary: "mismatch",
          claimedEffect: "inspection_only"
        }
      });

      const acceptedDerived = prepared.outcomeService.finalizeOutcome({
        commandName: "FinalizeOutcome",
        commandId: createCommandId("outcome_derived"),
        correlationId: prepared.request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: prepared.intent.intentId,
          transactionId: transaction.transactionId,
          decisionId: prepared.decision.decisionId,
          status: "awaiting_approval_no_effect",
          summary: "derived",
          claimedEffect: "none"
        }
      });

      const wrongCorrelation = prepared.outcomeService.finalizeOutcome({
        commandName: "FinalizeOutcome",
        commandId: createCommandId("outcome_wrong_correlation"),
        correlationId: loadLocalRequestFixture("allowed_inspection_request").correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: prepared.intent.intentId,
          transactionId: transaction.transactionId,
          decisionId: prepared.decision.decisionId,
          status: "awaiting_approval_no_effect",
          summary: "wrong-correlation",
          claimedEffect: "none"
        }
      });

      expect(rejectedMismatch.result).toBe("denied");
      expect(acceptedDerived.result).toBe("applied");
      expect(acceptedDerived.outcomeRecord?.status).toBe("awaiting_approval_no_effect");
      expect(acceptedDerived.outcomeRecord?.claimedEffect).toBe("none");
      expect(wrongCorrelation.result).toBe("denied");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("downstream references enforce correlation and linkage (Plan/Decision/Evidence)", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const audit = new AuditService(stateDirectory);
      const intentManager = new IntentManager(audit);
      const planner = new Planner(audit);
      const decisionService = new DecisionService(audit);
      const transactionCoordinator = new TransactionCoordinator(audit);
      const evidenceService = new EvidenceService(audit);
      const firstRequest = loadLocalRequestFixture("allowed_inspection_request");
      const secondRequest = loadLocalRequestFixture("denied_unknown_request");

      const firstIntent = intentManager.recordIntent({
        commandName: "RecordIntent",
        commandId: createCommandId("record_intent_first"),
        correlationId: firstRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: { request: firstRequest }
      }).intentRecord;
      if (!firstIntent) {
        throw new Error("first intent missing");
      }

      const planWithWrongCorrelation = planner.proposePlan({
        commandName: "ProposePlan",
        commandId: createCommandId("plan_wrong_correlation"),
        correlationId: secondRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: firstIntent.intentId,
          boundedSteps: ["x"],
          constraints: ["x"],
          assumptions: ["x"],
          riskSummary: "x"
        }
      });
      expect(planWithWrongCorrelation.result).toBe("denied");

      const plan = planner.proposePlan({
        commandName: "ProposePlan",
        commandId: createCommandId("plan_ok"),
        correlationId: firstRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: firstIntent.intentId,
          boundedSteps: ["x"],
          constraints: ["x"],
          assumptions: ["x"],
          riskSummary: "x"
        }
      }).planRecord;
      if (!plan) {
        throw new Error("plan missing");
      }

      const decisionWrongCorrelation = decisionService.recordDecision({
        commandName: "RecordDecision",
        commandId: createCommandId("decision_wrong_correlation"),
        correlationId: secondRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: firstIntent.intentId,
          planId: plan.planId,
          disposition: "allow",
          reason: "x",
          uncertainty: "x"
        }
      });
      expect(decisionWrongCorrelation.result).toBe("denied");

      const decision = decisionService.recordDecision({
        commandName: "RecordDecision",
        commandId: createCommandId("decision_ok"),
        correlationId: firstRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: firstIntent.intentId,
          planId: plan.planId,
          disposition: "allow",
          reason: "x",
          uncertainty: "x"
        }
      }).decisionRecord as DecisionRecord;

      const transaction = transactionCoordinator.openTransaction({
        commandName: "OpenTransaction",
        commandId: createCommandId("transaction_for_evidence"),
        correlationId: firstRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          intentId: firstIntent.intentId,
          planId: plan.planId,
          decisionId: decision.decisionId,
          declaredEffectClass: "local_synthetic_inspection",
          status: "completed_without_effect",
          claimedEffect: "inspection_only"
        }
      }).transactionRecord as TransactionRecord;

      const evidenceWrongCorrelation = evidenceService.attachEvidence({
        commandName: "AttachEvidence",
        commandId: createCommandId("evidence_wrong_correlation"),
        correlationId: secondRequest.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: {
          subjectKind: "transaction",
          subjectId: transaction.transactionId,
          claim: "x",
          confidence: "high"
        }
      });
      expect(evidenceWrongCorrelation.result).toBe("denied");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("journal integrity rejects tampered payload and malformed lines", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const originalLines = (await readFile(result.journalPath, "utf8")).trim().split("\n");
      expect(() => new AuditService(stateDirectory)).not.toThrow();
      const firstLine = originalLines[0];
      if (!firstLine) {
        throw new Error("Expected at least one journal event.");
      }

      const tamperedPayload = [...originalLines];
      const firstEvent = JSON.parse(firstLine) as Record<string, unknown>;
      firstEvent.payloadSummary = "tampered-payload";
      tamperedPayload[0] = JSON.stringify(firstEvent);
      await writeFile(result.journalPath, `${tamperedPayload.join("\n")}\n`, "utf8");
      expect(() => new AuditService(stateDirectory)).toThrow(/Journal integrity error/);

      await writeFile(result.journalPath, `${originalLines.join("\n")}\n`, "utf8");
      const malformed = [...originalLines];
      malformed[0] = "{not-json";
      await writeFile(result.journalPath, `${malformed.join("\n")}\n`, "utf8");
      expect(() => reconstructM2Trace(stateDirectory, result.correlationId)).toThrow(
        /Journal integrity error/
      );
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("journal integrity rejects tampered previous-hash chain", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "allowed_inspection_request",
        stateDirectory
      });
      const lines = (await readFile(result.journalPath, "utf8")).trim().split("\n");
      const secondLine = lines[1];
      if (!secondLine) {
        throw new Error("Expected at least two journal events.");
      }
      const secondEvent = JSON.parse(secondLine) as Record<string, unknown>;
      secondEvent.previousIntegrityHash =
        "0000000000000000000000000000000000000000000000000000000000000000";
      lines[1] = JSON.stringify(secondEvent);
      await writeFile(result.journalPath, `${lines.join("\n")}\n`, "utf8");

      expect(() => new AuditService(stateDirectory)).toThrow(/Journal integrity error/);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("idempotency index preserves original disposition across conflicts and hydration", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const audit = new AuditService(stateDirectory);
      const intentManager = new IntentManager(audit);
      const request = loadLocalRequestFixture("allowed_inspection_request");
      const conflictingRequest = {
        ...request,
        declaredPurpose: "different purpose for conflict"
      };
      const commandId = createCommandId("intent_conflict_preserve");
      const originalCommand: RecordIntentCommand = {
        commandName: "RecordIntent",
        commandId,
        correlationId: request.correlationId,
        schemaVersion: M2_SCHEMA_VERSION,
        provenance: M2_PROVENANCE,
        dataClassification: "synthetic_non_sensitive",
        payload: { request }
      };

      const first = intentManager.recordIntent(originalCommand);
      const conflict = intentManager.recordIntent({
        ...originalCommand,
        payload: { request: conflictingRequest }
      });
      const replayOriginal = intentManager.recordIntent(originalCommand);

      expect(first.result).toBe("applied");
      expect(conflict.result).toBe("denied");
      expect(replayOriginal.result).toBe("duplicate");
      expect(replayOriginal.intentRecord?.intentId).toBe(first.intentRecord?.intentId);

      const rehydrated = new AuditService(stateDirectory);
      const rehydratedManager = new IntentManager(rehydrated);
      const replayAfterHydration = rehydratedManager.recordIntent(originalCommand);
      const conflictAfterHydration = rehydratedManager.recordIntent({
        ...originalCommand,
        payload: { request: conflictingRequest }
      });

      expect(replayAfterHydration.result).toBe("duplicate");
      expect(replayAfterHydration.intentRecord?.intentId).toBe(first.intentRecord?.intentId);
      expect(conflictAfterHydration.result).toBe("denied");
      expect(
        rehydrated
          .listEventsByCorrelationId(request.correlationId)
          .filter((event) => event.eventType === "CommandConflictDenied").length
      ).toBeGreaterThanOrEqual(2);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("source writes are constrained to explicit state directory path usage", async () => {
    const srcRoot = path.resolve(import.meta.dirname, "../src");
    const files = await listTypeScriptFiles(srcRoot);
    const writePattern = /\b(writeFileSync|appendFileSync|mkdirSync)\s*\(/g;
    const filesWithWrites: string[] = [];

    for (const filePath of files) {
      const content = await readFile(filePath, "utf8");
      if (writePattern.test(content)) {
        filesWithWrites.push(filePath);
      }
    }

    expect(filesWithWrites.sort()).toEqual(
      [
        path.resolve(srcRoot, "m2/journal.ts"),
        path.resolve(srcRoot, "m3/artifactService.ts"),
        path.resolve(srcRoot, "m3/journal.ts"),
        path.resolve(srcRoot, "m5/backupService.ts"),
        path.resolve(srcRoot, "m5/operationJournal.ts"),
        path.resolve(srcRoot, "m5/restoreService.ts"),
        path.resolve(srcRoot, "m4/journal.ts"),
        path.resolve(srcRoot, "m4/orchestrator.ts")
      ].sort()
    );
  });
});

async function listTypeScriptFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listTypeScriptFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

async function buildPreparedFlow(
  stateDirectory: string,
  fixtureName: "allowed_inspection_request" | "approval_required_request"
): Promise<{
  audit: AuditService;
  request: ReturnType<typeof loadLocalRequestFixture>;
  intent: NonNullable<ReturnType<IntentManager["recordIntent"]>["intentRecord"]>;
  plan: NonNullable<ReturnType<Planner["proposePlan"]>["planRecord"]>;
  decision: NonNullable<ReturnType<DecisionService["recordDecision"]>["decisionRecord"]>;
  transactionCoordinator: TransactionCoordinator;
  outcomeService: OutcomeService;
}> {
  const request = loadLocalRequestFixture(fixtureName);
  const decision = evaluateLocalPolicy(request, new SafeMode("restrictive"));
  const audit = new AuditService(stateDirectory);
  const intentManager = new IntentManager(audit);
  const planner = new Planner(audit);
  const decisionService = new DecisionService(audit);
  const transactionCoordinator = new TransactionCoordinator(audit);
  const outcomeService = new OutcomeService(audit);

  const intent = intentManager.recordIntent({
    commandName: "RecordIntent",
    commandId: createCommandId("prep_record_intent"),
    correlationId: request.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: { request }
  }).intentRecord;
  if (!intent) {
    throw new Error("failed to create intent in helper");
  }

  const plan = planner.proposePlan({
    commandName: "ProposePlan",
    commandId: createCommandId("prep_propose_plan"),
    correlationId: request.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      intentId: intent.intentId,
      boundedSteps: ["s1"],
      constraints: ["local-only"],
      assumptions: ["synthetic input"],
      riskSummary: "none"
    }
  }).planRecord;
  if (!plan) {
    throw new Error("failed to create plan in helper");
  }

  const recordedDecision = decisionService.recordDecision({
    commandName: "RecordDecision",
    commandId: createCommandId("prep_record_decision"),
    correlationId: request.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      intentId: intent.intentId,
      planId: plan.planId,
      disposition: decision.disposition,
      reason: decision.reason,
      uncertainty: "helper"
    }
  }).decisionRecord;
  if (!recordedDecision) {
    throw new Error("failed to create decision in helper");
  }

  return {
    audit,
    request,
    intent,
    plan,
    decision: recordedDecision,
    transactionCoordinator,
    outcomeService
  };
}
