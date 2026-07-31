import { readFileSync, writeFileSync } from "node:fs";
import { mkdir, rm, symlink } from "node:fs/promises";
import path from "node:path";

import { describe, expect, test } from "vitest";

import {
  M7_REQUEST_ID_PREFIX,
  createLocalInquiryRequestIdGenerator,
  executeLocalGovernedInquiry,
  resolveAndValidateLocalInquiryStateDirectory
} from "../src/inquiry/localInquiryService.js";

async function createStateDirectory(): Promise<string> {
  const stateDirectory = path.resolve(
    import.meta.dirname,
    `../local-state/local-inquiry-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  await mkdir(stateDirectory, { recursive: true });
  return stateDirectory;
}

describe("shared local inquiry service", () => {
  test("rejects URL-like state directories and symlink roots", async () => {
    expect(() => resolveAndValidateLocalInquiryStateDirectory("https://example.com/state")).toThrow(
      /URL-like/i
    );
    const base = await createStateDirectory();
    const target = path.join(base, "target");
    const symlinkPath = path.join(base, "state-link");
    await mkdir(target, { recursive: true });
    await symlink(target, symlinkPath);
    try {
      expect(() => resolveAndValidateLocalInquiryStateDirectory(symlinkPath)).toThrow(/symlink/i);
    } finally {
      await rm(base, { recursive: true, force: true });
    }
  });

  test("generated request IDs preserve deterministic format behavior", () => {
    const generate = createLocalInquiryRequestIdGenerator(M7_REQUEST_ID_PREFIX);
    const first = generate();
    const second = generate();
    expect(first.startsWith(M7_REQUEST_ID_PREFIX)).toBe(true);
    expect(second.startsWith(M7_REQUEST_ID_PREFIX)).toBe(true);
    expect(first).not.toBe(second);
  });

  test("replay conflict remains blocked and non-replayed", async () => {
    const stateDirectory = await createStateDirectory();
    const generateRequestId = createLocalInquiryRequestIdGenerator(M7_REQUEST_ID_PREFIX);
    try {
      const first = executeLocalGovernedInquiry({
        stateDirectory,
        questionText: "what is hal",
        replayIntentional: true,
        requestId: "shared-replay-001",
        generateRequestId
      });
      expect(first.ok).toBe(true);
      const second = executeLocalGovernedInquiry({
        stateDirectory,
        questionText: "what is a synthetic corpus",
        replayIntentional: true,
        requestId: "shared-replay-001",
        generateRequestId
      });
      expect(second.ok).toBe(true);
      if (second.ok) {
        expect(second.result.result).toBe("blocked");
        expect(second.result.disposition).toBe("blocked");
        expect(second.result.replayed).toBe(false);
      }
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("trust failure returns integrity_unavailable fail-closed", async () => {
    const stateDirectory = await createStateDirectory();
    const generateRequestId = createLocalInquiryRequestIdGenerator(M7_REQUEST_ID_PREFIX);
    try {
      const outcome = executeLocalGovernedInquiry({
        stateDirectory,
        questionText: "what is hal",
        replayIntentional: false,
        generateRequestId,
        onInquiryResult: () => {
          const m4JournalPath = path.join(stateDirectory, "m4-event-journal.jsonl");
          const original = readFileSync(m4JournalPath, "utf8");
          writeFileSync(
            m4JournalPath,
            original.replace("achieved_without_effect", "tampered_outcome"),
            "utf8"
          );
        }
      });
      expect(outcome.ok).toBe(false);
      if (!outcome.ok) {
        expect(outcome.code).toBe("integrity_unavailable");
      }
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });
});
