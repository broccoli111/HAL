import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { lstatSync } from "node:fs";
import { Buffer } from "node:buffer";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { LocalBackupRestoreCoordinator } from "../src/m5/coordinator.js";
import { runM6Inquiry } from "../src/m6/orchestrator.js";
import {
  activateApprovedM9Pack,
  createM9OperationRequestId,
  deactivateApprovedM9Pack,
  getM9ActivePackState,
  listApprovedM9PackRegistrations
} from "../src/m9/service.js";
import { canonicalJsonUtf8Bytes, sha256Hex } from "../src/m9/canonical.js";
import { M9_BOUNDS } from "../src/m9/types.js";
import { M9ActivationJournal } from "../src/m9/activationJournal.js";
import { validateApprovedPackDirectory } from "../src/m9/validator.js";
import { createImmutableIdentifier } from "../src/shared/id.js";

async function createTempDirectory(prefix: string): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), prefix));
}

async function readJsonlRecords(filePath: string): Promise<readonly Record<string, unknown>[]> {
  const lines = (await readFile(filePath, "utf8"))
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return Object.freeze(lines.map((line) => JSON.parse(line) as Record<string, unknown>));
}

function extractRequestedAtFromM2Claim(claim: string): string | undefined {
  const marker = "requestedAtIso8601=";
  const index = claim.indexOf(marker);
  if (index < 0) {
    return undefined;
  }
  return claim.slice(index + marker.length).split(";")[0];
}

type PackOptions = Readonly<{
  packId?: string;
  packName?: string;
  packVersion?: string;
  tagsPerDocument?: number;
  paragraphsPerDocument?: number;
  tagBytes?: number;
  paragraphBytes?: number;
  titleBytes?: number;
  extraFile?: boolean;
}>;

async function createSyntheticPack(root: string, options: PackOptions = {}): Promise<string> {
  const packId = options.packId ?? "pack_test";
  const packDirectory = path.resolve(root, packId);
  const contentDirectory = path.resolve(packDirectory, "content");
  await mkdir(contentDirectory, { recursive: true });
  const title = "t".repeat(options.titleBytes ?? 12);
  const tags = Array.from({ length: options.tagsPerDocument ?? 1 }, () =>
    "g".repeat(options.tagBytes ?? 8)
  );
  const paragraphs = Array.from(
    { length: options.paragraphsPerDocument ?? 1 },
    (_, index) => `paragraph-${index}-${"p".repeat(options.paragraphBytes ?? 16)}`
  );
  const content = {
    id: "doc.synthetic",
    title,
    tags,
    paragraphs
  };
  const fileName = "entry.json";
  const filePath = path.resolve(contentDirectory, fileName);
  const serializedContent = `${JSON.stringify(content, null, 2)}\n`;
  await writeFile(filePath, serializedContent, "utf8");
  const fileBytes = Buffer.byteLength(serializedContent, "utf8");
  const fileSha = sha256Hex(serializedContent);
  const manifestBase = {
    schemaVersion: "hal.m9.knowledge-pack.manifest.v1",
    packId,
    packName: options.packName ?? "Synthetic deterministic pack",
    packVersion: options.packVersion ?? "1.0.0",
    packClassification: "synthetic_approved_local_only",
    provenanceClassification: "synthetic_non_sensitive",
    m6Compatibility: {
      tokenizerVersion: "m6.tokenizer.v1",
      matcherVersion: "m6.matcher.v1",
      corpusIndexVersion: "m6.corpus-index.v1",
      documentShape: "m6.synthetic-document.v1"
    },
    documents: [
      {
        documentId: "doc.synthetic",
        sectionIds: paragraphs.map((_, index) => `paragraph:${index}`)
      }
    ],
    files: [
      {
        relativePath: `content/${fileName}`,
        sha256: fileSha,
        byteSize: fileBytes,
        contentClass: "pack_content_json"
      }
    ],
    contentRoot: "content",
    integrity: {
      manifestHashAlgorithm: "sha256"
    }
  };
  const manifestHashSha256 = sha256Hex(canonicalJsonUtf8Bytes(manifestBase));
  const manifest = {
    ...manifestBase,
    integrity: {
      ...manifestBase.integrity,
      manifestHashSha256
    }
  };
  await writeFile(
    path.resolve(packDirectory, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );
  if (options.extraFile) {
    await writeFile(path.resolve(packDirectory, "metadata.txt"), "forbidden\n", "utf8");
  }
  return packDirectory;
}

describe("M9 controlled local knowledge packs", () => {
  test("approved registry includes deterministic synthetic packs", () => {
    const registry = listApprovedM9PackRegistrations();
    expect(registry.length).toBeGreaterThanOrEqual(2);
    expect(registry.every((entry) => /^[a-f0-9]{64}$/.test(entry.manifestHashSha256))).toBe(true);
  });

  test("activation and deactivation are explicit and bounded with no external effect", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-state-");
    try {
      const activated = activateApprovedM9Pack({
        operationRequestId: createM9OperationRequestId(),
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(activated.result).toBe("succeeded");
      expect(activated.externalEffect).toBe("none");
      expect(activated.activePack?.packId).toBe("pack_alpha");

      const deactivated = deactivateApprovedM9Pack({
        operationRequestId: createM9OperationRequestId(),
        stateDirectory,
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_deactivation"
      });
      expect(deactivated.result).toBe("succeeded");
      expect(deactivated.externalEffect).toBe("none");
      expect(getM9ActivePackState(stateDirectory)).toBeUndefined();
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("invalid owner claim with fixed operation ID remains blocked and traceable without state mutation", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-owner-");
    try {
      const operationRequestId = createImmutableIdentifier("m9_operation_request");
      const blocked = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "invalid_claim",
        reasonCode: "owner_local_activation"
      });
      expect(blocked.result).toBe("blocked");
      expect(blocked.replayed).toBe(false);
      expect(blocked.conflict).toBe(false);
      expect(["owner_confirmation_invalid", "m2_admission_blocked"]).toContain(
        blocked.resultReasonCode
      );
      expect(getM9ActivePackState(stateDirectory)).toBeUndefined();
      const journalPath = path.resolve(stateDirectory, "m9", "m9-pack-activation-journal.jsonl");
      expect(lstatSync(path.resolve(stateDirectory, "m9")).isDirectory()).toBe(true);
      const m9Records = await readJsonlRecords(journalPath);
      expect(m9Records.length).toBe(1);
      expect(m9Records[0]?.operationRequestId).toBe(operationRequestId);
      const m2Events = await readJsonlRecords(
        path.resolve(stateDirectory, "m2-event-journal.jsonl")
      );
      const intent = m2Events
        .map((event) => event.record as Record<string, unknown> | undefined)
        .find((record) => record?.requestId === operationRequestId);
      expect(intent).toBeDefined();
      const evidenceClaim = m2Events
        .map((event) => event.record as Record<string, unknown> | undefined)
        .map((record) => (record?.claim as string | undefined) ?? undefined)
        .find((claim) => typeof claim === "string" && claim.includes("requestedAtIso8601="));
      expect(evidenceClaim).toBeDefined();
      const requestedAt = extractRequestedAtFromM2Claim(evidenceClaim ?? "");
      expect(requestedAt).toBeDefined();
      expect(requestedAt).not.toBe("2026-01-01T00:00:00.000Z");
      expect(Number.isNaN(Date.parse(requestedAt ?? ""))).toBe(false);
      const now = Date.now();
      const requestedAtEpoch = Date.parse(requestedAt ?? "");
      expect(Math.abs(now - requestedAtEpoch)).toBeLessThanOrEqual(120_000);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("activation operation replay is idempotent and changed payload conflicts fail closed", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-replay-activate-");
    try {
      const operationRequestId = createImmutableIdentifier("m9_operation_request");
      const first = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(first.result).toBe("succeeded");
      expect(first.replayed).toBe(false);
      const firstActive = getM9ActivePackState(stateDirectory);
      const m9JournalPath = path.resolve(stateDirectory, "m9", "m9-pack-activation-journal.jsonl");
      const m2JournalPath = path.resolve(stateDirectory, "m2-event-journal.jsonl");
      const firstM9Count = (await readJsonlRecords(m9JournalPath)).length;
      const firstM2Count = (await readJsonlRecords(m2JournalPath)).length;

      const replay = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(replay.result).toBe("succeeded");
      expect(replay.replayed).toBe(true);
      expect(replay.conflict).toBe(false);
      expect(replay.correlationId).toBe(first.correlationId);
      expect((await readJsonlRecords(m9JournalPath)).length).toBe(firstM9Count);
      expect((await readJsonlRecords(m2JournalPath)).length).toBe(firstM2Count);

      const conflicting = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_beta",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(conflicting.result).toBe("blocked");
      expect(conflicting.resultReasonCode).toBe("operation_request_conflict");
      expect(conflicting.replayed).toBe(false);
      expect(conflicting.conflict).toBe(true);
      expect(conflicting.correlationId).toBe(first.correlationId);
      const afterConflictActive = getM9ActivePackState(stateDirectory);
      expect(afterConflictActive).toEqual(firstActive);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("same operation ID with changed disposition returns original correlation and conflicts", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-disposition-conflict-");
    try {
      const operationRequestId = createImmutableIdentifier("m9_operation_request");
      const first = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(first.result).toBe("succeeded");
      const activeAfterFirst = getM9ActivePackState(stateDirectory);

      const conflict = deactivateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        requestedPackId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_deactivation"
      });
      expect(conflict.result).toBe("blocked");
      expect(conflict.resultReasonCode).toBe("operation_request_conflict");
      expect(conflict.replayed).toBe(false);
      expect(conflict.conflict).toBe(true);
      expect(conflict.correlationId).toBe(first.correlationId);
      expect(getM9ActivePackState(stateDirectory)).toEqual(activeAfterFirst);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("deactivation replay is idempotent and changed payload conflicts fail closed", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-replay-deactivate-");
    try {
      const activateRequestId = createImmutableIdentifier("m9_operation_request");
      const activated = activateApprovedM9Pack({
        operationRequestId: activateRequestId,
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(activated.result).toBe("succeeded");

      const deactivateRequestId = createImmutableIdentifier("m9_operation_request");
      const first = deactivateApprovedM9Pack({
        operationRequestId: deactivateRequestId,
        stateDirectory,
        requestedPackId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_deactivation"
      });
      expect(first.result).toBe("succeeded");
      const replay = deactivateApprovedM9Pack({
        operationRequestId: deactivateRequestId,
        stateDirectory,
        requestedPackId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_deactivation"
      });
      expect(replay.result).toBe("succeeded");
      expect(replay.replayed).toBe(true);
      expect(replay.conflict).toBe(false);
      expect(replay.correlationId).toBe(first.correlationId);

      const conflict = deactivateApprovedM9Pack({
        operationRequestId: deactivateRequestId,
        stateDirectory,
        requestedPackId: "pack_beta",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_deactivation"
      });
      expect(conflict.result).toBe("blocked");
      expect(conflict.resultReasonCode).toBe("operation_request_conflict");
      expect(conflict.replayed).toBe(false);
      expect(conflict.conflict).toBe(true);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("fresh-process journal hydration preserves first-record operation authority", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-first-record-");
    try {
      const operationRequestId = createImmutableIdentifier("m9_operation_request");
      const first = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(first.result).toBe("succeeded");

      const hydrated = new M9ActivationJournal(stateDirectory).findByOperationRequestId(
        operationRequestId
      );
      expect(hydrated?.activationRecordId).toBe(first.activationRecordId);

      const conflictAfterHydration = activateApprovedM9Pack({
        operationRequestId,
        stateDirectory,
        packId: "pack_beta",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(conflictAfterHydration.result).toBe("blocked");
      expect(conflictAfterHydration.resultReasonCode).toBe("operation_request_conflict");
      expect(conflictAfterHydration.correlationId).toBe(first.correlationId);
      const authoritative = new M9ActivationJournal(stateDirectory).findByOperationRequestId(
        operationRequestId
      );
      expect(authoritative?.activationRecordId).toBe(first.activationRecordId);
      expect(getM9ActivePackState(stateDirectory)?.packId).toBe("pack_alpha");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("M6 blocks inquiries fail-closed when no active pack exists", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-m6-blocked-");
    try {
      const result = runM6Inquiry({
        stateDirectory,
        requestId: createImmutableIdentifier("m6_request"),
        questionText: "What does the synthetic pack contain?"
      });
      expect(result.disposition).toBe("blocked");
      expect(result.result).toBe("blocked");
      expect(result.renderedResponse).toContain("reason=no_active_pack");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("M6 replay preserves immutable activation tuple and correlation", async () => {
    const stateDirectory = await createTempDirectory("hal-m9-replay-");
    const requestId = createImmutableIdentifier("m6_request");
    try {
      const activated = activateApprovedM9Pack({
        operationRequestId: createM9OperationRequestId(),
        stateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(activated.result).toBe("succeeded");
      const first = runM6Inquiry({
        stateDirectory,
        requestId,
        questionText: "how do synthetic checks run?"
      });
      const replay = runM6Inquiry({
        stateDirectory,
        requestId,
        questionText: "how do synthetic checks run?"
      });
      expect(replay.replayed).toBe(true);
      expect(replay.correlationId).toBe(first.correlationId);

      const journalLines = (
        await readFile(path.resolve(stateDirectory, "m6-event-journal.jsonl"), "utf8")
      )
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => JSON.parse(line) as { record?: Record<string, unknown> });
      const evidence = journalLines.at(-1)?.record;
      expect(evidence?.m9PackId).toBe(activated.activePack?.packId);
      expect(evidence?.m9PackVersion).toBe(activated.activePack?.packVersion);
      expect(evidence?.m9ManifestHashSha256).toBe(activated.activePack?.manifestHashSha256);
      expect(evidence?.m9ActivationRecordId).toBe(activated.activePack?.activationRecordId);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("pack validation rejects undeclared extra files and symlink content", async () => {
    const root = await createTempDirectory("hal-m9-pack-");
    try {
      const packWithExtra = await createSyntheticPack(root, {
        packId: "pack_extra",
        extraFile: true
      });
      expect(() => validateApprovedPackDirectory(packWithExtra)).toThrow(
        /extra regular file rejected/i
      );

      const symlinkPack = await createSyntheticPack(root, { packId: "pack_symlink" });
      const fileTarget = path.resolve(symlinkPack, "content", "entry.json");
      const fileLink = path.resolve(symlinkPack, "content", "entry-link.json");
      await symlink(fileTarget, fileLink);
      expect(() => validateApprovedPackDirectory(symlinkPack)).toThrow(
        /non-regular or symlink content entry rejected/i
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("pack validation fails closed on v1 bounds and leaves no durable raw content", async () => {
    const root = await createTempDirectory("hal-m9-bounds-");
    try {
      const tagsOverflow = await createSyntheticPack(root, {
        packId: "pack_tag_overflow",
        tagsPerDocument: M9_BOUNDS.maxTagsPerDocument + 1
      });
      expect(() => validateApprovedPackDirectory(tagsOverflow)).toThrow(
        /tag count exceeds v1 bound/i
      );

      const paragraphOverflow = await createSyntheticPack(root, {
        packId: "pack_paragraph_overflow",
        paragraphsPerDocument: M9_BOUNDS.maxParagraphsPerDocument + 1
      });
      expect(() => validateApprovedPackDirectory(paragraphOverflow)).toThrow(
        /paragraph count exceeds v1 bound/i
      );

      const titleOverflow = await createSyntheticPack(root, {
        packId: "pack_title_overflow",
        titleBytes: M9_BOUNDS.maxTitleUtf8Bytes + 1
      });
      expect(() => validateApprovedPackDirectory(titleOverflow)).toThrow(/title exceeds v1 bound/i);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("backup and restore carry bounded M9 activation state with reconstruction", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m9-backup-source-");
    const backupRoot = await createTempDirectory("hal-m9-backup-root-");
    const operationStateDirectory = await createTempDirectory("hal-m9-backup-op-");
    const restoreRoot = await createTempDirectory("hal-m9-backup-restore-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restored-state");
    try {
      const activated = activateApprovedM9Pack({
        operationRequestId: createM9OperationRequestId(),
        stateDirectory: sourceStateDirectory,
        packId: "pack_alpha",
        ownerConfirmationClaim: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      });
      expect(activated.result).toBe("succeeded");
      const inquiry = runM6Inquiry({
        stateDirectory: sourceStateDirectory,
        requestId: createImmutableIdentifier("m6_request"),
        questionText: "what does alpha inspect?"
      });
      expect(inquiry.disposition).toBe("completed_without_effect");
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "test-commit",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(backup.ok).toBe(true);
      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory
      });
      expect(verify.ok).toBe(true);
      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory
      });
      expect(restore.ok).toBe(true);
      const restoredState = getM9ActivePackState(restoreTargetDirectory);
      expect(restoredState?.packId).toBe("pack_alpha");
      const restoredJournal = await readFile(
        path.resolve(restoreTargetDirectory, "m9", "m9-pack-activation-journal.jsonl"),
        "utf8"
      );
      expect(restoredJournal).not.toContain("/fixtures/approved-knowledge-packs/");
      expect(restoredJournal).not.toContain('"paragraphs"');
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });
});
