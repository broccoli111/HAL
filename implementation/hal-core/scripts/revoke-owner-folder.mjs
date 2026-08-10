#!/usr/bin/env node
/** Owner-only revocation of one registered local folder; it never reads the folder. */

import { lstatSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  createM9OperationRequestId,
  deactivateApprovedM9Pack,
  getM9ActivePackState,
  M9OwnerFolderRegistryJournal,
  revokeM9OwnerFolderRegistration
} from "../dist/src/m9/index.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-owner-folder.local.json");

function fail(message) {
  process.stderr.write(`HAL owner-folder revoke: ${message}\n`);
  process.exit(2);
}

function requireDirectory(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value)) fail(`${label} must be absolute.`);
  mkdirSync(value, { recursive: true });
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isDirectory() || stat.isSymbolicLink()) fail(`${label} must be a regular directory.`);
  return value;
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (
    args.length !== 4 ||
    args[0] !== "--registration-id" ||
    !args[1]?.trim() ||
    args[2] !== "--owner-confirm" ||
    args[3] !== "local_owner_confirmed"
  ) {
    fail("usage: --registration-id <id> --owner-confirm local_owner_confirmed");
  }
  return Object.freeze({ registrationId: args[1].trim() });
}

const configStat = lstatSync(CONFIG_FILE, { throwIfNoEntry: false });
if (!configStat?.isFile() || configStat.isSymbolicLink()) {
  fail(`local configuration is required at ${CONFIG_FILE}.`);
}
let parsed;
try {
  parsed = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
} catch {
  fail("local configuration is not valid JSON.");
}
const allowed = new Set(["registryStateDirectory", "knowledgeStateDirectory", "packRootDirectory"]);
if (!parsed || typeof parsed !== "object" || Object.keys(parsed).some((key) => !allowed.has(key))) {
  fail("local configuration has unsupported fields.");
}

const input = parseArgs();
const config = Object.freeze({
  registryStateDirectory: requireDirectory(parsed.registryStateDirectory, "registryStateDirectory"),
  knowledgeStateDirectory: requireDirectory(
    parsed.knowledgeStateDirectory,
    "knowledgeStateDirectory"
  ),
  packRootDirectory: requireDirectory(parsed.packRootDirectory, "packRootDirectory")
});
const journal = new M9OwnerFolderRegistryJournal(config.registryStateDirectory);
const registration = journal.latest(input.registrationId);
if (!registration)
  fail("registration is unavailable; no folder was read and no runtime was contacted.");
if (registration.status === "revoked") fail("registration is already revoked.");

const packId = `owner_folder_${registration.registrationId}_v1`;
process.env.HAL_OWNER_FOLDER_PACK_ROOT = config.packRootDirectory;
const active = getM9ActivePackState(config.knowledgeStateDirectory);
if (active?.packId === packId) {
  const deactivation = deactivateApprovedM9Pack({
    operationRequestId: createM9OperationRequestId(),
    stateDirectory: config.knowledgeStateDirectory,
    requestedPackId: packId,
    ownerConfirmationClaim: "local_owner_confirmed",
    reasonCode: "owner_local_deactivation"
  });
  if (deactivation.result !== "succeeded") {
    fail(
      `deactivation failed closed: ${deactivation.resultReasonCode}; registration remains active.`
    );
  }
}
const revoked = revokeM9OwnerFolderRegistration(registration, "local_owner_confirmed");
const event = journal.append("revoked", revoked);
process.stdout.write(`HAL owner-folder revoked: ${revoked.registrationId}#${event.recordHash}\n`);
