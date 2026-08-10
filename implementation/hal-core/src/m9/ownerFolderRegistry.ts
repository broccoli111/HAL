import path from "node:path";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

import { canonicalJsonUtf8Bytes, sha256Hex } from "./canonical.js";

/**
 * DR 0032's HAL-owned, runtime-independent local-folder registration contract.
 * A registration is a policy/evidence input; it is not a filesystem capability
 * and it conveys neither a path nor a handle to an Agent Runtime.
 */
export const M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION = "hal.m9.owner-folder-registry.v1" as const;
export const M9_OWNER_FOLDER_REGISTRY_MAX_FILES = 32 as const;
export const M9_OWNER_FOLDER_REGISTRY_MAX_FILE_BYTES = 8_192 as const;
export const M9_OWNER_FOLDER_REGISTRY_MAX_TOTAL_BYTES = 131_072 as const;

export type M9OwnerFolderRegistration = Readonly<{
  schemaVersion: typeof M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION;
  registrationId: string;
  sourceDirectory: string;
  maxFiles: number;
  maxFileBytes: number;
  maxTotalBytes: number;
  ownerConfirmationClaimCategory: "local_owner_confirmed";
  status: "registered" | "revoked";
}>;

export type M9OwnerFolderRegistryEvent = Readonly<{
  schemaVersion: typeof M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION;
  eventType: "registered" | "revoked";
  registration: M9OwnerFolderRegistration;
  previousRecordHash?: string;
  recordHash: string;
}>;

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

function isSafeRegistrationId(value: string): boolean {
  return /^[a-z][a-z0-9_-]{2,63}$/.test(value);
}

/** Validates policy data only; it never reads the source directory. */
export function createM9OwnerFolderRegistration(input: {
  registrationId: string;
  sourceDirectory: string;
  ownerConfirmationClaim: string;
}): M9OwnerFolderRegistration {
  assert(isSafeRegistrationId(input.registrationId), "owner-folder registration ID is invalid");
  assert(path.isAbsolute(input.sourceDirectory), "owner-folder source directory must be absolute");
  const normalized = path.normalize(input.sourceDirectory);
  assert(normalized === input.sourceDirectory, "owner-folder source directory must be normalized");
  assert(
    normalized !== path.parse(normalized).root,
    "owner-folder source directory cannot be filesystem root"
  );
  assert(
    input.ownerConfirmationClaim === "local_owner_confirmed",
    "owner-folder registration requires explicit local Owner confirmation"
  );
  return Object.freeze({
    schemaVersion: M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION,
    registrationId: input.registrationId,
    sourceDirectory: normalized,
    maxFiles: M9_OWNER_FOLDER_REGISTRY_MAX_FILES,
    maxFileBytes: M9_OWNER_FOLDER_REGISTRY_MAX_FILE_BYTES,
    maxTotalBytes: M9_OWNER_FOLDER_REGISTRY_MAX_TOTAL_BYTES,
    ownerConfirmationClaimCategory: "local_owner_confirmed",
    status: "registered"
  });
}

export function revokeM9OwnerFolderRegistration(
  registration: M9OwnerFolderRegistration,
  ownerConfirmationClaim: string
): M9OwnerFolderRegistration {
  assert(
    ownerConfirmationClaim === "local_owner_confirmed",
    "owner-folder revocation requires explicit local Owner confirmation"
  );
  return Object.freeze({ ...registration, status: "revoked" });
}

/** Append-only HAL evidence journal for Owner folder registration policy. */
export class M9OwnerFolderRegistryJournal {
  private readonly journalPath: string;

  public constructor(stateDirectory: string) {
    assert(
      path.isAbsolute(stateDirectory),
      "owner-folder registry state directory must be absolute"
    );
    this.journalPath = path.join(stateDirectory, "m9-owner-folder-registry.jsonl");
  }

  public list(): readonly M9OwnerFolderRegistryEvent[] {
    if (!existsSync(this.journalPath)) return Object.freeze([]);
    const records = readFileSync(this.journalPath, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as M9OwnerFolderRegistryEvent);
    let previousRecordHash: string | undefined;
    for (const record of records) {
      assert(
        record.schemaVersion === M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION,
        "owner-folder registry schema invalid"
      );
      assert(
        record.previousRecordHash === previousRecordHash,
        "owner-folder registry integrity chain invalid"
      );
      const { recordHash, ...unsigned } = record;
      assert(
        sha256Hex(canonicalJsonUtf8Bytes(unsigned)) === recordHash,
        "owner-folder registry record hash invalid"
      );
      previousRecordHash = recordHash;
    }
    return Object.freeze(records);
  }

  public append(
    eventType: "registered" | "revoked",
    registration: M9OwnerFolderRegistration
  ): M9OwnerFolderRegistryEvent {
    const existing = this.list();
    const previousRecordHash = existing.at(-1)?.recordHash;
    const unsigned = {
      schemaVersion: M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION,
      eventType,
      registration,
      ...(previousRecordHash ? { previousRecordHash } : {})
    } as const;
    const event = Object.freeze({
      ...unsigned,
      recordHash: sha256Hex(canonicalJsonUtf8Bytes(unsigned))
    });
    mkdirSync(path.dirname(this.journalPath), { recursive: true });
    appendFileSync(this.journalPath, `${JSON.stringify(event)}\n`, "utf8");
    return event;
  }

  public latest(registrationId: string): M9OwnerFolderRegistration | undefined {
    return [...this.list()]
      .reverse()
      .find((event) => event.registration.registrationId === registrationId)?.registration;
  }
}
