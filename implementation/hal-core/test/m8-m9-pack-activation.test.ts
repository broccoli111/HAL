import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { applyM8PackActivationRequest } from "../src/m8/packActivationService.js";
import { getM9ActivePackState } from "../src/m9/service.js";

async function createStateDirectory(): Promise<string> {
  const stateDirectory = await mkdtemp(path.join(os.tmpdir(), "hal-m8-m9-"));
  await mkdir(stateDirectory, { recursive: true });
  return stateDirectory;
}

async function countJournalLines(filePath: string): Promise<number> {
  const content = await readFile(filePath, "utf8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean).length;
}

describe("M8 request-only M9 activation", () => {
  test("fixed activation request ID replays idempotently with no new M2/M9 records", async () => {
    const stateDirectory = await createStateDirectory();
    const requestId = "m8-pack-activate-001";
    try {
      const first = applyM8PackActivationRequest({
        stateDirectory,
        parsedRequest: {
          requestId,
          ownerDisposition: "activate",
          packId: "pack_alpha",
          ownerConfirmation: "local_owner_confirmed",
          reasonCode: "owner_local_activation"
        }
      });
      expect(first.result).toBe("succeeded");
      expect(first.replayed).toBe(false);
      const activeAfterFirst = getM9ActivePackState(stateDirectory);
      const m9Path = path.resolve(stateDirectory, "m9", "m9-pack-activation-journal.jsonl");
      const m2Path = path.resolve(stateDirectory, "m2-event-journal.jsonl");
      const m9Count = await countJournalLines(m9Path);
      const m2Count = await countJournalLines(m2Path);
      const m2Content = await readFile(m2Path, "utf8");
      expect(m2Content).toContain(`"requestId":"${requestId}"`);

      const replay = applyM8PackActivationRequest({
        stateDirectory,
        parsedRequest: {
          requestId,
          ownerDisposition: "activate",
          packId: "pack_alpha",
          ownerConfirmation: "local_owner_confirmed",
          reasonCode: "owner_local_activation"
        }
      });
      expect(replay.result).toBe("succeeded");
      expect(replay.replayed).toBe(true);
      expect(replay.conflict).toBe(false);
      expect(replay.correlationId).toBe(first.correlationId);
      expect(await countJournalLines(m9Path)).toBe(m9Count);
      expect(await countJournalLines(m2Path)).toBe(m2Count);
      expect(getM9ActivePackState(stateDirectory)).toEqual(activeAfterFirst);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("same request ID with different pack fails closed as conflict", async () => {
    const stateDirectory = await createStateDirectory();
    const requestId = "m8-pack-conflict-001";
    try {
      const first = applyM8PackActivationRequest({
        stateDirectory,
        parsedRequest: {
          requestId,
          ownerDisposition: "activate",
          packId: "pack_alpha",
          ownerConfirmation: "local_owner_confirmed",
          reasonCode: "owner_local_activation"
        }
      });
      expect(first.result).toBe("succeeded");
      const activeAfterFirst = getM9ActivePackState(stateDirectory);

      const conflict = applyM8PackActivationRequest({
        stateDirectory,
        parsedRequest: {
          requestId,
          ownerDisposition: "activate",
          packId: "pack_beta",
          ownerConfirmation: "local_owner_confirmed",
          reasonCode: "owner_local_activation"
        }
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

  test("same request ID with changed disposition fails closed with original correlation", async () => {
    const stateDirectory = await createStateDirectory();
    const requestId = "m8-pack-disposition-conflict-001";
    try {
      const first = applyM8PackActivationRequest({
        stateDirectory,
        parsedRequest: {
          requestId,
          ownerDisposition: "activate",
          packId: "pack_alpha",
          ownerConfirmation: "local_owner_confirmed",
          reasonCode: "owner_local_activation"
        }
      });
      expect(first.result).toBe("succeeded");
      const activeAfterFirst = getM9ActivePackState(stateDirectory);
      const conflict = applyM8PackActivationRequest({
        stateDirectory,
        parsedRequest: {
          requestId,
          ownerDisposition: "deactivate",
          packId: "pack_alpha",
          ownerConfirmation: "local_owner_confirmed",
          reasonCode: "owner_local_deactivation"
        }
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
});
