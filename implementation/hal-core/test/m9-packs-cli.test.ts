import { mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { runM9PacksCli } from "../src/cli/m9PacksCli.js";
import { getM9ActivePackState } from "../src/m9/service.js";

async function createStateDirectory(): Promise<string> {
  const stateDirectory = await mkdtemp(path.join(os.tmpdir(), "hal-m9-cli-"));
  await mkdir(stateDirectory, { recursive: true });
  return stateDirectory;
}

function runCli(argv: readonly string[]): readonly string[] {
  const lines: string[] = [];
  runM9PacksCli(argv, (line) => {
    lines.push(line);
  });
  return Object.freeze(lines);
}

describe("M9 packs CLI explicit operation IDs", () => {
  test("activation explicit operation ID supports idempotent replay and conflict detection", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      const operationRequestId = "m9-cli-activate-001";
      const first = runCli([
        "activate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_alpha",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_activation",
        "--operation-request-id",
        operationRequestId
      ]);
      expect(first.join("\n")).toContain("result: succeeded");
      expect(first.join("\n")).toContain("replayed: false");
      expect(first.join("\n")).toContain("conflict: false");

      const replay = runCli([
        "activate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_alpha",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_activation",
        "--operation-request-id",
        operationRequestId
      ]);
      expect(replay.join("\n")).toContain("result: succeeded");
      expect(replay.join("\n")).toContain("replayed: true");
      expect(replay.join("\n")).toContain("conflict: false");

      const conflict = runCli([
        "activate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_beta",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_activation",
        "--operation-request-id",
        operationRequestId
      ]);
      expect(conflict.join("\n")).toContain("result: blocked");
      expect(conflict.join("\n")).toContain("resultReasonCode: operation_request_conflict");
      expect(conflict.join("\n")).toContain("replayed: false");
      expect(conflict.join("\n")).toContain("conflict: true");
      expect(getM9ActivePackState(stateDirectory)?.packId).toBe("pack_alpha");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("deactivation explicit operation ID supports idempotent replay and conflict detection", async () => {
    const stateDirectory = await createStateDirectory();
    try {
      runCli([
        "activate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_alpha",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_activation",
        "--operation-request-id",
        "m9-cli-seed-activate-001"
      ]);
      const operationRequestId = "m9-cli-deactivate-001";
      const first = runCli([
        "deactivate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_alpha",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_deactivation",
        "--operation-request-id",
        operationRequestId
      ]);
      expect(first.join("\n")).toContain("result: succeeded");
      expect(first.join("\n")).toContain("replayed: false");
      expect(first.join("\n")).toContain("conflict: false");

      runCli([
        "activate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_alpha",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_activation",
        "--operation-request-id",
        "m9-cli-seed-activate-002"
      ]);
      const conflict = runCli([
        "deactivate",
        "--state-dir",
        stateDirectory,
        "--pack-id",
        "pack_beta",
        "--owner-confirmation",
        "local_owner_confirmed",
        "--reason-code",
        "owner_local_deactivation",
        "--operation-request-id",
        operationRequestId
      ]);
      expect(conflict.join("\n")).toContain("result: blocked");
      expect(conflict.join("\n")).toContain("resultReasonCode: operation_request_conflict");
      expect(conflict.join("\n")).toContain("conflict: true");
      expect(getM9ActivePackState(stateDirectory)?.packId).toBe("pack_alpha");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });
});
