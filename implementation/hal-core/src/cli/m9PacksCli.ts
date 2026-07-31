import path from "node:path";
import { lstatSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ImmutableIdentifier } from "../shared/types.js";

import {
  activateApprovedM9Pack,
  createM9OperationRequestId,
  deactivateApprovedM9Pack,
  getApprovedPackRootForDisplay,
  getM9ActivePackState,
  listApprovedM9PackRegistrations
} from "../m9/index.js";

// eslint-disable-next-line no-unused-vars
type LineWriter = (line: string) => void;

function parseFlag(argv: readonly string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }
  return argv[index + 1];
}

function requireFlag(argv: readonly string[], flag: string): string {
  const value = parseFlag(argv, flag);
  if (!value?.trim()) {
    throw new Error(`Missing required ${flag}.`);
  }
  return value.trim();
}

function resolveExistingStateDirectory(rawStateDirectory: string): string {
  const resolved = path.resolve(rawStateDirectory);
  const stat = lstatSync(resolved, { throwIfNoEntry: false });
  if (!stat || !stat.isDirectory()) {
    throw new Error("state directory must exist and be a directory");
  }
  if (stat.isSymbolicLink()) {
    throw new Error("state directory must not be a symlink");
  }
  return resolved;
}

function printList(stateDirectory: string, writeLine: LineWriter): void {
  const active = getM9ActivePackState(stateDirectory);
  writeLine(`approvedPackRoot: ${getApprovedPackRootForDisplay()}`);
  writeLine("externalEffect: none");
  writeLine("registrations:");
  for (const registration of listApprovedM9PackRegistrations()) {
    const activeLabel =
      active &&
      active.packId === registration.packId &&
      active.packVersion === registration.packVersion &&
      active.manifestHashSha256 === registration.manifestHashSha256
        ? " active=true"
        : "";
    writeLine(
      `- packId=${registration.packId} packVersion=${registration.packVersion} manifestHashSha256=${registration.manifestHashSha256}${activeLabel}`
    );
  }
}

function printStatus(stateDirectory: string, writeLine: LineWriter): void {
  const active = getM9ActivePackState(stateDirectory);
  writeLine("externalEffect: none");
  if (!active) {
    writeLine("activePack: none");
    return;
  }
  writeLine(`activationRecordId: ${active.activationRecordId}`);
  writeLine(`packId: ${active.packId}`);
  writeLine(`packVersion: ${active.packVersion}`);
  writeLine(`manifestHashSha256: ${active.manifestHashSha256}`);
}

function runActivate(argv: readonly string[], stateDirectory: string, writeLine: LineWriter): void {
  const packId = requireFlag(argv, "--pack-id");
  const ownerConfirmationClaim = requireFlag(argv, "--owner-confirmation");
  const reasonCode = requireFlag(argv, "--reason-code");
  const providedOperationRequestId = parseFlag(argv, "--operation-request-id");
  const operationRequestId = (
    providedOperationRequestId?.trim()
      ? providedOperationRequestId.trim()
      : createM9OperationRequestId()
  ) as ImmutableIdentifier;
  if (!providedOperationRequestId?.trim()) {
    writeLine(`generatedOperationRequestId: ${operationRequestId}`);
  }
  const result = activateApprovedM9Pack({
    operationRequestId,
    stateDirectory,
    packId,
    ownerConfirmationClaim,
    reasonCode: reasonCode as "owner_local_activation"
  });
  writeLine(`operationRequestId: ${result.operationRequestId}`);
  writeLine(`correlationId: ${result.correlationId}`);
  writeLine(`result: ${result.result}`);
  writeLine(`resultReasonCode: ${result.resultReasonCode}`);
  writeLine(`replayed: ${String(result.replayed)}`);
  writeLine(`conflict: ${String(result.conflict)}`);
  writeLine(`externalEffect: ${result.externalEffect}`);
  if (result.activePack) {
    writeLine(`activationRecordId: ${result.activePack.activationRecordId}`);
    writeLine(`packId: ${result.activePack.packId}`);
    writeLine(`packVersion: ${result.activePack.packVersion}`);
    writeLine(`manifestHashSha256: ${result.activePack.manifestHashSha256}`);
  }
}

function runDeactivate(
  argv: readonly string[],
  stateDirectory: string,
  writeLine: LineWriter
): void {
  const ownerConfirmationClaim = requireFlag(argv, "--owner-confirmation");
  const reasonCode = requireFlag(argv, "--reason-code");
  const providedOperationRequestId = parseFlag(argv, "--operation-request-id");
  const operationRequestId = (
    providedOperationRequestId?.trim()
      ? providedOperationRequestId.trim()
      : createM9OperationRequestId()
  ) as ImmutableIdentifier;
  const requestedPackId = parseFlag(argv, "--pack-id")?.trim();
  if (!providedOperationRequestId?.trim()) {
    writeLine(`generatedOperationRequestId: ${operationRequestId}`);
  }
  const result = deactivateApprovedM9Pack({
    operationRequestId,
    stateDirectory,
    ...(requestedPackId ? { requestedPackId } : {}),
    ownerConfirmationClaim,
    reasonCode: reasonCode as "owner_local_deactivation"
  });
  writeLine(`operationRequestId: ${result.operationRequestId}`);
  writeLine(`correlationId: ${result.correlationId}`);
  writeLine(`result: ${result.result}`);
  writeLine(`resultReasonCode: ${result.resultReasonCode}`);
  writeLine(`replayed: ${String(result.replayed)}`);
  writeLine(`conflict: ${String(result.conflict)}`);
  writeLine(`externalEffect: ${result.externalEffect}`);
  if (result.activationRecordId) {
    writeLine(`activationRecordId: ${result.activationRecordId}`);
  }
}

export function runM9PacksCli(argv: readonly string[], writeLine: LineWriter): void {
  const mode = argv[0];
  if (!mode || !["list", "activate", "status", "deactivate"].includes(mode)) {
    throw new Error("Usage: m9:packs -- <list|activate|status|deactivate> --state-dir <dir> ...");
  }
  const stateDirectory = resolveExistingStateDirectory(requireFlag(argv, "--state-dir"));
  if (mode === "list") {
    printList(stateDirectory, writeLine);
    return;
  }
  if (mode === "status") {
    printStatus(stateDirectory, writeLine);
    return;
  }
  if (mode === "activate") {
    runActivate(argv, stateDirectory, writeLine);
    return;
  }
  runDeactivate(argv, stateDirectory, writeLine);
}

function main(): void {
  runM9PacksCli(process.argv.slice(2), (line) => {
    console.log(line);
  });
}

const isDirectRun =
  typeof process.argv[1] === "string" &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
  main();
}
