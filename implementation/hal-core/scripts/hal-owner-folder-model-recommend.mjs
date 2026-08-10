#!/usr/bin/env node
/**
 * HAL-owned model recommendation for one direct file in a registered folder.
 * This inspects only safe local metadata; it never opens source content,
 * activates a pack, contacts a runtime, or invokes a model.
 */

import { lstatSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  M9OwnerFolderRegistryJournal,
  classifyM9CentralContentFileName
} from "../dist/src/m9/index.js";
import { INITIAL_LOCAL_MODEL_CATALOG } from "../dist/src/modelPlanning/initialCatalog.js";
import { recommendLocalModel } from "../dist/src/modelPlanning/recommendation.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-owner-folder.local.json");
const DEFAULT_REGISTRATION_ID = "hal_ref_2_persistent_v1";

function fail(message) {
  process.stderr.write(`HAL owner-folder model recommendation: ${message}\n`);
  process.exit(2);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const values = new Map();
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key || !value || values.has(key))
      fail("arguments must be unique non-empty flag/value pairs.");
    values.set(key, value);
  }
  if (
    args.length !== values.size * 2 ||
    !values.has("--file-name") ||
    [...values.keys()].some((key) => key !== "--registration-id" && key !== "--file-name")
  ) {
    fail("usage: --file-name <direct-file-name> [--registration-id <registered-id>]");
  }
  return Object.freeze({
    registrationId: values.get("--registration-id") ?? DEFAULT_REGISTRATION_ID,
    fileName: values.get("--file-name")
  });
}

function loadRegistryStateDirectory() {
  const stat = lstatSync(CONFIG_FILE, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink())
    fail(`local configuration is required at ${CONFIG_FILE}.`);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    fail("local configuration is not valid JSON.");
  }
  if (
    !parsed ||
    typeof parsed !== "object" ||
    typeof parsed.registryStateDirectory !== "string" ||
    !path.isAbsolute(parsed.registryStateDirectory)
  ) {
    fail("local configuration has no valid registryStateDirectory.");
  }
  return parsed.registryStateDirectory;
}

const { registrationId, fileName } = parseArgs();
const journal = new M9OwnerFolderRegistryJournal(loadRegistryStateDirectory());
const registration = journal.latest(registrationId);
if (!registration || registration.status !== "registered") {
  fail("registered folder is unavailable or revoked.");
}
const contentClass = classifyM9CentralContentFileName(fileName);
const absolute = path.resolve(registration.sourceDirectory, fileName);
if (path.dirname(absolute) !== registration.sourceDirectory)
  fail("file name escapes registered folder.");
const stat = lstatSync(absolute, { throwIfNoEntry: false });
if (!stat?.isFile() || stat.isSymbolicLink())
  fail("source must be an existing direct regular non-symlink file.");

const requiredModalities = contentClass === "text" ? ["text"] : ["text", "image"];
const recommendation = recommendLocalModel(INITIAL_LOCAL_MODEL_CATALOG, {
  taskLabel: `HAL central ${contentClass} content task`,
  requiredModalities,
  maximumArtifactBytes: 6_500_000_000
});
process.stdout.write(
  `${JSON.stringify({
    result: "completed",
    registrationId,
    contentClass,
    sourceInspection: "metadata_only_no_content_read",
    recommendation
  })}\n`
);
