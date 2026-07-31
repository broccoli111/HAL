import { Buffer } from "node:buffer";
import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { lstatSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, test, vi } from "vitest";

import { M3TraceService } from "../src/m3/traceService.js";
import { reconstructM4Trace } from "../src/m4/orchestrator.js";
import { ExplanationService } from "../src/m4/explanationService.js";
import { OutcomeAttestationService } from "../src/m4/outcomeAttestationService.js";
import { RecoveryCoordinator } from "../src/m4/recoveryCoordinator.js";
import { M4TraceService } from "../src/m4/traceService.js";
import { LocalBackupRestoreCoordinator } from "../src/m5/coordinator.js";
import { loadSyntheticCorpusFromRootForTest } from "../src/m6/corpus.js";
import { M6EvidenceJournal } from "../src/m6/evidenceJournal.js";
import { runM6Inquiry, reconstructM6Trace } from "../src/m6/orchestrator.js";
import { assessQuestionText } from "../src/m6/inputPolicy.js";
import { createImmutableIdentifier } from "../src/shared/id.js";

async function createStateDirectory(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "hal-m6-"));
}

describe("M6 controlled free-form local inquiry", () => {
  test("deterministic matched inquiry returns no-effect attestation and M3 evidence", async () => {
    const stateDirectory = await createStateDirectory();
    const question = "What deterministic synthetic inspection evidence exists?";
    const requestId = "m6-request-match-1";
    try {
      const first = runM6Inquiry({
        stateDirectory,
        questionText: question,
        requestId
      });
      const second = runM6Inquiry({
        stateDirectory,
        questionText: question,
        requestId
      });

      expect(first.result).toBe("matched");
      expect(first.replayed).toBe(false);
      expect(second.replayed).toBe(true);
      expect(first.disposition).toBe("completed_without_effect");
      expect(first.attestationStatus).toBe("achieved_without_effect");
      expect(first.attestationClaimedEffect).toBe("none");
      expect(first.renderedResponse).toBe(second.renderedResponse);
      expect(first.corpusManifestHashSha256).toBe(second.corpusManifestHashSha256);
      expect(first.questionHashSha256).toBe(second.questionHashSha256);

      const m3Trace = new M3TraceService(stateDirectory);
      const events = m3Trace.listEventsByCorrelationId(first.correlationId);
      expect(events.some((event) => event.recordKind === "capability_request")).toBe(true);
      expect(events.some((event) => event.recordKind === "execution_attempt")).toBe(true);
      expect(events.some((event) => event.recordKind === "artifact")).toBe(true);
      expect(events.some((event) => event.owner === "M6InquiryCoordinator")).toBe(false);
      expect(
        events.some(
          (event) =>
            event.recordKind === "verification" &&
            (event.record as { verified?: boolean } | undefined)?.verified === true
        )
      ).toBe(true);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("canonical manifest hash agrees across response, M3 artifact/verification, M6 evidence, and M4 trace", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM6Inquiry({
        stateDirectory,
        requestId: "m6-canonical-manifest-1",
        questionText: "What deterministic synthetic inspection evidence exists?"
      });
      const renderedManifest = result.renderedResponse
        .split("\n")
        .find((line) => line.startsWith("corpusManifestHash="))
        ?.slice("corpusManifestHash=".length);
      expect(renderedManifest).toBe(result.corpusManifestHashSha256);

      const m3Events = new M3TraceService(stateDirectory).listEventsByCorrelationId(
        result.correlationId
      );
      const artifactRecord = m3Events
        .filter((event) => event.recordKind === "artifact" && event.record)
        .map((event) => event.record as { fixtureManifestHash: string; artifactPath: string })
        .at(-1);
      const verificationRecord = m3Events
        .filter((event) => event.recordKind === "verification" && event.record)
        .map((event) => event.record as { fixtureManifestHash: string; verified: boolean })
        .at(-1);
      expect(artifactRecord?.fixtureManifestHash).toBe(result.corpusManifestHashSha256);
      expect(verificationRecord?.fixtureManifestHash).toBe(result.corpusManifestHashSha256);
      expect(verificationRecord?.verified).toBe(true);

      const artifactPayload = JSON.parse(
        await readFile(artifactRecord?.artifactPath ?? "", "utf8")
      ) as {
        deterministicInquiry?: { answerHashSha256?: string };
      };
      const m6Record = new M6EvidenceJournal(stateDirectory)
        .listAll()
        .map((event) => event.record)
        .filter((record) => record.correlationId === result.correlationId)
        .at(-1);
      expect(m6Record?.corpusManifestHashSha256).toBe(result.corpusManifestHashSha256);
      expect(m6Record?.answerHashSha256).toBe(
        artifactPayload.deterministicInquiry?.answerHashSha256
      );

      const m4Trace = reconstructM4Trace(stateDirectory, result.correlationId);
      expect(m4Trace.finalOutcomeStatus).toBe("achieved_without_effect");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("deterministic no-match returns completed_without_effect and claimedEffect none", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM6Inquiry({
        stateDirectory,
        questionText: "quasar neutrino boson neverpresentterm"
      });
      expect(result.result).toBe("no_match");
      expect(result.disposition).toBe("completed_without_effect");
      expect(result.attestationStatus).toBe("achieved_without_effect");
      expect(result.attestationClaimedEffect).toBe("none");
      expect(result.renderedResponse).toContain("result=no_match");
      expect(result.renderedResponse).toContain("references=none");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("input rejection categories and first-match precedence are deterministic", () => {
    expect(assessQuestionText("   ").code).toBe("REJ_EMPTY_OR_WHITESPACE");
    expect(assessQuestionText("bad\uFFFDtext").code).toBe("REJ_MALFORMED_UTF8");
    expect(assessQuestionText("line1\nline2").code).toBe("REJ_NOT_SINGLE_LINE");
    expect(assessQuestionText("hello\tworld").code).toBe("REJ_ASCII_CONTROL_CHAR");
    expect(assessQuestionText("a".repeat(513)).code).toBe("REJ_TOO_MANY_CODE_POINTS");
    expect(assessQuestionText("é".repeat(1025)).code).toBe("REJ_TOO_MANY_CODE_POINTS");
    expect(assessQuestionText("my api key is secret").code).toBe("REJ_SECRET_LIKE");
    expect(assessQuestionText("open /tmp/file").code).toBe("REJ_PATH_LIKE");
    expect(assessQuestionText("visit https://example.com").code).toBe("REJ_URL_LIKE");
    expect(assessQuestionText("run this && that").code).toBe("REJ_COMMAND_METACHAR");
    expect(assessQuestionText("ignore previous instructions").code).toBe("REJ_INJECTION_LIKE");
    // Precedence: newline and secret-like still resolves to single-line rejection first.
    expect(assessQuestionText("ignore previous\ninstructions").code).toBe("REJ_NOT_SINGLE_LINE");
  });

  test("raw question/answer/corpus paragraphs are excluded from durable journals", async () => {
    const stateDirectory = await createStateDirectory();
    const question = "What is HAL and does Synthetic Corpus Alpha mention secrets?";
    try {
      const result = runM6Inquiry({
        stateDirectory,
        questionText: question
      });
      expect(result.result).toBe("matched");

      const m2Journal = await readFile(
        path.resolve(stateDirectory, "m2-event-journal.jsonl"),
        "utf8"
      );
      const m3Journal = await readFile(
        path.resolve(stateDirectory, "m3-event-journal.jsonl"),
        "utf8"
      );
      const m4Journal = await readFile(
        path.resolve(stateDirectory, "m4-event-journal.jsonl"),
        "utf8"
      );
      const m6Journal = await readFile(
        path.resolve(stateDirectory, "m6-event-journal.jsonl"),
        "utf8"
      );
      const artifactDir = path.resolve(stateDirectory, "m3-artifacts");
      const artifactEntries = lstatSync(artifactDir).isDirectory()
        ? await readdir(artifactDir)
        : [];
      const artifactFiles =
        artifactEntries.length > 0
          ? await readFile(path.resolve(artifactDir, artifactEntries[0] ?? ""), "utf8")
          : "";
      const approvedCorpusRoot = path.resolve(import.meta.dirname, "../fixtures/synthetic-corpus");

      for (const text of [m2Journal, m3Journal, m4Journal, m6Journal, artifactFiles]) {
        expect(text).not.toContain(question);
        expect(text).not.toContain("Synthetic Corpus Alpha");
        expect(text).not.toContain(
          "no matching synthetic corpus sections found for the normalized question tokens"
        );
        expect(text).not.toContain(approvedCorpusRoot);
      }
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("corpus safety controls reject symlink and schema mismatch inputs", async () => {
    const corpusRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m6-corpus-"));
    try {
      const valid = {
        id: "safe-a",
        title: "safe title",
        tags: ["safe"],
        paragraphs: ["safe paragraph"]
      };
      await writeFile(
        path.resolve(corpusRoot, "a.json"),
        `${JSON.stringify(valid, null, 2)}\n`,
        "utf8"
      );
      const symlinkTarget = path.resolve(corpusRoot, "a.json");
      await symlink(symlinkTarget, path.resolve(corpusRoot, "b.json"));
      expect(() => loadSyntheticCorpusFromRootForTest(corpusRoot)).toThrow(/symlink/i);
      await rm(path.resolve(corpusRoot, "b.json"), { force: true });

      await writeFile(
        path.resolve(corpusRoot, "broken.json"),
        `${JSON.stringify({ id: "b", title: "broken", tags: "bad", paragraphs: [] }, null, 2)}\n`,
        "utf8"
      );
      expect(() => loadSyntheticCorpusFromRootForTest(corpusRoot)).toThrow(/schema mismatch/i);
    } finally {
      await rm(corpusRoot, { recursive: true, force: true });
    }
  });

  test("output truncation remains deterministic and bounded to 1200 UTF-8 bytes", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const first = runM6Inquiry({
        stateDirectory,
        questionText: "deterministic local synthetic"
      });
      const second = runM6Inquiry({
        stateDirectory,
        questionText: "deterministic local synthetic",
        requestId: first.requestId
      });
      expect(Buffer.byteLength(first.renderedResponse, "utf8")).toBeLessThanOrEqual(1200);
      expect(first.renderedResponse).toBe(second.renderedResponse);
      expect(first.renderedResponse).toContain("result=matched");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("M2 approval_required and deny block before capability execution", async () => {
    const approvalState = await createStateDirectory();
    const denyState = await createStateDirectory();
    try {
      const approval = runM6Inquiry({
        stateDirectory: approvalState,
        questionText: "What is HAL?",
        admissionMode: "approval_required"
      });
      const denied = runM6Inquiry({
        stateDirectory: denyState,
        questionText: "What is HAL?",
        admissionMode: "deny"
      });
      expect(approval.result).toBe("blocked");
      expect(denied.result).toBe("blocked");
      expect(approval.disposition).toBe("blocked");
      expect(denied.disposition).toBe("blocked");

      const approvalM3 = new M3TraceService(approvalState).listEventsByCorrelationId(
        approval.correlationId
      );
      const deniedM3 = new M3TraceService(denyState).listEventsByCorrelationId(
        denied.correlationId
      );
      expect(approvalM3.some((event) => event.recordKind === "execution_attempt")).toBe(false);
      expect(deniedM3.some((event) => event.recordKind === "execution_attempt")).toBe(false);
    } finally {
      await rm(approvalState, { recursive: true, force: true });
      await rm(denyState, { recursive: true, force: true });
    }
  });

  test("M6 journal tamper fails closed and M4 reconstruction fails closed on tampered journals", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM6Inquiry({
        stateDirectory,
        questionText: "deterministic corpus evidence"
      });
      const m6Path = path.resolve(stateDirectory, "m6-event-journal.jsonl");
      const originalM6 = await readFile(m6Path, "utf8");
      const tamperedM6 = originalM6.replace('externalEffect":"none', 'externalEffect":"tampered');
      await writeFile(m6Path, tamperedM6, "utf8");
      expect(() => new M6EvidenceJournal(stateDirectory).listAll()).toThrow(/integrity/i);
      await writeFile(m6Path, originalM6, "utf8");

      const m4Path = path.resolve(stateDirectory, "m4-event-journal.jsonl");
      const originalM4 = await readFile(m4Path, "utf8");
      const m4Lines = originalM4.trim().split("\n");
      const first = JSON.parse(m4Lines[0] ?? "{}") as Record<string, unknown>;
      first.payloadSummary = "tampered";
      m4Lines[0] = JSON.stringify(first);
      await writeFile(m4Path, `${m4Lines.join("\n")}\n`, "utf8");
      const reconstructed = reconstructM4Trace(stateDirectory, result.correlationId);
      expect(reconstructed.finalOutcomeStatus).toBe("unavailable");
      expect(reconstructed.claimedEffect).toBe("unavailable");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("M5 backup/restore/verify preserve and reconstruct M6 evidence", async () => {
    const sourceState = await createStateDirectory();
    const backupRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m6-backup-"));
    const operationState = await mkdtemp(path.join(os.tmpdir(), "hal-m6-op-"));
    const restoreRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m6-restore-"));
    const restoreTarget = path.resolve(restoreRoot, "restored-state");
    try {
      const result = runM6Inquiry({
        stateDirectory: sourceState,
        questionText: "deterministic synthetic local verification"
      });
      const coordinator = new LocalBackupRestoreCoordinator(operationState);
      const backup = coordinator.runBackup({
        sourceStateDirectory: sourceState,
        backupRoot,
        operationStateDirectory: operationState,
        sourceCommitRef: "m6-test",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test",
        correlationId: result.correlationId
      });
      expect(backup.ok).toBe(true);

      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory: operationState,
        correlationId: result.correlationId
      });
      expect(verify.ok).toBe(true);

      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory: restoreTarget,
        restoreRoot,
        operationStateDirectory: operationState,
        correlationId: result.correlationId
      });
      expect(restore.ok).toBe(true);

      const reconstructed = reconstructM6Trace(restoreTarget, result.correlationId);
      expect(reconstructed.evidenceCount).toBeGreaterThanOrEqual(1);
      expect(reconstructed.latestDisposition).toBe("completed_without_effect");
    } finally {
      await rm(sourceState, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationState, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("fixed corpus boundary and deterministic code-unit sorting are enforced", async () => {
    const customRoot = await mkdtemp(path.join(os.tmpdir(), "hal-m6-sort-"));
    const stateDirectory = await createStateDirectory();
    try {
      await writeFile(
        path.resolve(customRoot, "Z.json"),
        `${JSON.stringify({ id: "id-z", title: "z", tags: ["z"], paragraphs: ["z"] })}\n`,
        "utf8"
      );
      await writeFile(
        path.resolve(customRoot, "a.json"),
        `${JSON.stringify({ id: "id-a", title: "a", tags: ["a"], paragraphs: ["a"] })}\n`,
        "utf8"
      );
      const loaded = loadSyntheticCorpusFromRootForTest(customRoot);
      expect(loaded.documents.map((doc) => doc.id)).toEqual(["id-z", "id-a"]);

      const result = runM6Inquiry({
        stateDirectory,
        questionText: "id-z"
      } as unknown as Parameters<typeof runM6Inquiry>[0] & { corpusRoot: string });
      expect(result.corpusManifestHashSha256).not.toBe(loaded.manifestHashSha256);
    } finally {
      await rm(customRoot, { recursive: true, force: true });
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("approved corpus root is module-relative and ignores process cwd", async () => {
    const stateDirectory = await createStateDirectory();
    const cwdFixture = await mkdtemp(path.join(os.tmpdir(), "hal-m6-cwd-"));
    const cwdSpy = vi.spyOn(process, "cwd");
    try {
      const baseline = runM6Inquiry({
        stateDirectory,
        requestId: "m6-cwd-baseline-1",
        questionText: "cwd document only"
      });
      await writeFile(
        path.resolve(cwdFixture, "package.json"),
        `${JSON.stringify({ name: "fake-root" }, null, 2)}\n`,
        "utf8"
      );
      await mkdir(path.resolve(cwdFixture, "fixtures/synthetic-corpus"), { recursive: true });
      await writeFile(
        path.resolve(cwdFixture, "fixtures/synthetic-corpus", "cwd-only.json"),
        `${JSON.stringify(
          {
            id: "cwd-doc",
            title: "cwd document only",
            tags: ["cwd"],
            paragraphs: ["cwd deterministic paragraph"]
          },
          null,
          2
        )}\n`,
        "utf8"
      );
      cwdSpy.mockReturnValue(cwdFixture);
      const result = runM6Inquiry({
        stateDirectory,
        requestId: "m6-cwd-regression-1",
        questionText: "cwd document only"
      });
      expect(result.selectedDocumentIds).not.toContain("cwd-doc");
      expect(result.corpusManifestHashSha256).toBe(baseline.corpusManifestHashSha256);
    } finally {
      cwdSpy.mockRestore();
      await rm(stateDirectory, { recursive: true, force: true });
      await rm(cwdFixture, { recursive: true, force: true });
    }
  });

  test("request-id conflict fails closed with no second provider success path", async () => {
    const stateDirectory = await createStateDirectory();
    const requestId = "m6-request-conflict-1";
    try {
      const first = runM6Inquiry({
        stateDirectory,
        requestId,
        questionText: "what is hal"
      });
      const second = runM6Inquiry({
        stateDirectory,
        requestId,
        questionText: "what is a synthetic corpus"
      });
      expect(first.result).toMatch(/matched|no_match/);
      expect(second.result).toBe("blocked");
      expect(second.disposition).toBe("blocked");

      const m3Events = new M3TraceService(stateDirectory).listAllEvents();
      const successAttempts = m3Events.filter(
        (event) =>
          event.recordKind === "execution_attempt" &&
          (event.record as { status?: string } | undefined)?.status === "succeeded"
      );
      expect(successAttempts.length).toBe(1);
      const m6Records = new M6EvidenceJournal(stateDirectory)
        .listAll()
        .map((event) => event.record)
        .filter((record) => record.requestId === requestId);
      expect(m6Records.at(-1)?.disposition).toBe("blocked");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("same request id with same tokens but different normalized question conflicts", async () => {
    const stateDirectory = await createStateDirectory();
    const requestId = "m6-request-token-conflict-1";
    try {
      const first = runM6Inquiry({
        stateDirectory,
        requestId,
        questionText: "deterministic local synthetic"
      });
      const second = runM6Inquiry({
        stateDirectory,
        requestId,
        questionText: "deterministic   local synthetic!!!"
      });
      expect(first.disposition).toBe("completed_without_effect");
      expect(second.disposition).toBe("blocked");
      expect(second.result).toBe("blocked");
      const events = new M3TraceService(stateDirectory).listAllEvents();
      const successAttempts = events.filter(
        (event) =>
          event.recordKind === "execution_attempt" &&
          (event.record as { status?: string } | undefined)?.status === "succeeded"
      );
      expect(successAttempts.length).toBe(1);
      const m6Records = new M6EvidenceJournal(stateDirectory)
        .listAll()
        .map((event) => event.record)
        .filter((record) => record.requestId === requestId);
      expect(m6Records.at(-1)?.disposition).toBe("blocked");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("same request id with changed admission posture conflicts", async () => {
    const stateDirectory = await createStateDirectory();
    const requestId = "m6-request-admission-conflict-1";
    try {
      const first = runM6Inquiry({
        stateDirectory,
        requestId,
        admissionMode: "allow",
        questionText: "deterministic local synthetic"
      });
      const second = runM6Inquiry({
        stateDirectory,
        requestId,
        admissionMode: "approval_required",
        questionText: "deterministic local synthetic"
      });
      expect(first.disposition).toBe("completed_without_effect");
      expect(second.disposition).toBe("blocked");
      expect(second.result).toBe("blocked");
      const events = new M3TraceService(stateDirectory).listAllEvents();
      const successAttempts = events.filter(
        (event) =>
          event.recordKind === "execution_attempt" &&
          (event.record as { status?: string } | undefined)?.status === "succeeded"
      );
      expect(successAttempts.length).toBe(1);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("tampering M6-linked artifact metadata prevents achieved attestation", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM6Inquiry({
        stateDirectory,
        requestId: "m6-attestation-tamper-1",
        questionText: "deterministic local synthetic"
      });
      expect(result.attestationStatus).toBe("achieved_without_effect");

      const trace = new M3TraceService(stateDirectory);
      const events = trace.listEventsByCorrelationId(result.correlationId);
      const artifact = events
        .filter((event) => event.recordKind === "artifact" && event.record)
        .map((event) => event.record as { artifactPath: string })
        .at(-1);
      expect(artifact).toBeDefined();
      const artifactPath = artifact?.artifactPath as string;
      const parsed = JSON.parse(await readFile(artifactPath, "utf8")) as {
        deterministicInquiry?: { answerHashSha256?: string };
      };
      if (!parsed.deterministicInquiry) {
        throw new Error("Expected deterministic inquiry metadata for tamper test.");
      }
      parsed.deterministicInquiry.answerHashSha256 = "tampered-answer-hash";
      await writeFile(artifactPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

      const attestationService = new OutcomeAttestationService({
        stateDirectory,
        traceService: new M4TraceService(stateDirectory),
        recoveryCoordinator: new RecoveryCoordinator(new M4TraceService(stateDirectory)),
        explanationService: new ExplanationService(new M4TraceService(stateDirectory))
      });
      const reattested = attestationService.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: result.correlationId,
        requestedCapabilityId: "answer_synthetic_corpus_question_deterministic_v1",
        expectedM3CapabilityRequestId: result.requestId
      });
      expect(reattested.attestation.finalOutcomeStatus).not.toBe("achieved_without_effect");
      const reconstructed = reconstructM4Trace(stateDirectory, result.correlationId);
      expect(reconstructed.finalOutcomeStatus).not.toBe("achieved_without_effect");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("tampering bounded M6 evidence manifest hash prevents achieved attestation", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const result = runM6Inquiry({
        stateDirectory,
        requestId: "m6-evidence-manifest-tamper-1",
        questionText: "deterministic local synthetic"
      });
      expect(result.attestationStatus).toBe("achieved_without_effect");

      const m6Path = path.resolve(stateDirectory, "m6-event-journal.jsonl");
      const original = await readFile(m6Path, "utf8");
      const lines = original
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line) as Record<string, unknown>);
      const last = lines[lines.length - 1] as {
        record?: { corpusManifestHashSha256?: string };
      };
      if (last?.record) {
        last.record.corpusManifestHashSha256 = "tampered-manifest-hash";
      }
      await writeFile(
        m6Path,
        `${lines.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
        "utf8"
      );

      const attestationService = new OutcomeAttestationService({
        stateDirectory,
        traceService: new M4TraceService(stateDirectory),
        recoveryCoordinator: new RecoveryCoordinator(new M4TraceService(stateDirectory)),
        explanationService: new ExplanationService(new M4TraceService(stateDirectory))
      });
      const reattested = attestationService.finalizeOutcomeAttestation({
        attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
        correlationId: result.correlationId,
        requestedCapabilityId: "answer_synthetic_corpus_question_deterministic_v1",
        expectedM3CapabilityRequestId: result.requestId
      });
      expect(reattested.attestation.finalOutcomeStatus).not.toBe("achieved_without_effect");
      const reconstructed = reconstructM4Trace(stateDirectory, result.correlationId);
      expect(reconstructed.finalOutcomeStatus).not.toBe("achieved_without_effect");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });
});
