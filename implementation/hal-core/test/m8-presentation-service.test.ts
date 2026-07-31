import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

import { describe, expect, test } from "vitest";

import { LocalBackupRestoreCoordinator } from "../src/m5/coordinator.js";
import { reconstructM6Trace } from "../src/m6/orchestrator.js";
import { buildBlockedPanel, createM8InquiryExecutor } from "../src/m8/presentationService.js";
import type { CorrelationId } from "../src/shared/types.js";

async function createStateDirectory(): Promise<string> {
  const stateDirectory = path.resolve(
    import.meta.dirname,
    `../local-state/m8-presentation-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  await mkdir(stateDirectory, { recursive: true });
  return stateDirectory;
}

describe("M8 presentation service", () => {
  test("maps governed M6 results with independent submit semantics", async () => {
    const stateDirectory = await createStateDirectory();
    const executeInquiry = createM8InquiryExecutor();
    try {
      const first = executeInquiry({
        stateDirectory,
        questionText: "what is hal",
        replayIntentional: false
      });
      const second = executeInquiry({
        stateDirectory,
        questionText: "what is hal",
        replayIntentional: false
      });
      expect(first.result).toMatch(/matched|no_match/);
      expect(first.disposition).toBe("completed_without_effect");
      expect(first.replayed).toBe(false);
      expect(second.replayed).toBe(false);
      expect(first.requestId).not.toBe(second.requestId);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("enforces deliberate replay and conflict behavior", async () => {
    const stateDirectory = await createStateDirectory();
    const executeInquiry = createM8InquiryExecutor();
    try {
      const first = executeInquiry({
        stateDirectory,
        questionText: "what is hal",
        replayIntentional: true,
        requestId: "m8-replay-001"
      });
      const second = executeInquiry({
        stateDirectory,
        questionText: "what is a synthetic corpus",
        replayIntentional: true,
        requestId: "m8-replay-001"
      });
      expect(first.disposition).toBe("completed_without_effect");
      expect(second.result).toBe("blocked");
      expect(second.response).toContain("request_id_conflict");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("does not create transcript artifacts and remains M5 compatible", async () => {
    const stateDirectory = await createStateDirectory();
    const executeInquiry = createM8InquiryExecutor();
    const backupRoot = await createStateDirectory();
    const operationState = await createStateDirectory();
    const restoreRoot = await createStateDirectory();
    const restoreTarget = path.join(restoreRoot, "restored");
    try {
      const result = executeInquiry({
        stateDirectory,
        questionText: "what is hal",
        replayIntentional: false
      });
      expect(result.disposition).toBe("completed_without_effect");
      const files = await readdir(stateDirectory);
      const fileInventory = files.join("\n");
      expect(fileInventory).not.toContain("m8");
      expect(fileInventory).not.toContain("transcript");
      const coordinator = new LocalBackupRestoreCoordinator(operationState);
      const backup = coordinator.runBackup({
        sourceStateDirectory: stateDirectory,
        backupRoot,
        operationStateDirectory: operationState,
        sourceCommitRef: "m8-test",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(backup.ok).toBe(true);
      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory: operationState
      });
      expect(verify.ok).toBe(true);
      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory: restoreTarget,
        restoreRoot,
        operationStateDirectory: operationState
      });
      expect(restore.ok).toBe(true);
      const reconstructed = reconstructM6Trace(
        restoreTarget,
        result.correlationId as CorrelationId
      );
      expect(reconstructed.evidenceCount).toBeGreaterThan(0);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationState, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("builds deterministic blocked panel without persistence side effects", () => {
    const blocked = buildBlockedPanel({
      code: "ipc_validation_failed",
      reason: "unexpected_sender",
      requestId: "unavailable",
      correlationId: "unavailable"
    });
    expect(blocked.result).toBe("blocked");
    expect(blocked.disposition).toBe("blocked");
    expect(blocked.response).toContain("ipc_validation_failed");
  });
});
