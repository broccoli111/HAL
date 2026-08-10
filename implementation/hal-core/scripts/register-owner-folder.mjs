#!/usr/bin/env node
/** Owner-only registration of one exact local folder; it does not read the folder. */

import { lstatSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  M9OwnerFolderRegistryJournal,
  createM9OwnerFolderRegistration
} from "../dist/src/m9/index.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-owner-folder.local.json");

function fail(message) {
  process.stderr.write(`HAL owner-folder register: ${message}\n`);
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
  if (args.length !== 6) {
    fail(
      "usage: --registration-id <id> --source-directory <absolute-path> --owner-confirm local_owner_confirmed"
    );
  }
  const values = new Map();
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key || !value || values.has(key))
      fail("arguments must be unique non-empty flag/value pairs.");
    values.set(key, value);
  }
  if (
    values.size !== 3 ||
    !values.has("--registration-id") ||
    !values.has("--source-directory") ||
    !values.has("--owner-confirm")
  ) {
    fail("unsupported registration arguments.");
  }
  return Object.freeze({
    registrationId: values.get("--registration-id"),
    sourceDirectory: values.get("--source-directory"),
    ownerConfirmationClaim: values.get("--owner-confirm")
  });
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
const journal = new M9OwnerFolderRegistryJournal(
  requireDirectory(parsed.registryStateDirectory, "registryStateDirectory")
);
if (journal.latest(input.registrationId)) {
  fail(
    "registration ID already exists; use a new immutable registration ID or revoke the existing entry."
  );
}
const registration = createM9OwnerFolderRegistration({
  registrationId: input.registrationId,
  sourceDirectory: input.sourceDirectory,
  ownerConfirmationClaim: input.ownerConfirmationClaim
});
const event = journal.append("registered", registration);
process.stdout.write(
  `HAL owner-folder registered: ${registration.registrationId}#${event.recordHash}\n`
);
