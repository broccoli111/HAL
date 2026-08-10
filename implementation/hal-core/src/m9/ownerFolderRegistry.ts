import path from "node:path";

/**
 * DR 0032's HAL-owned, runtime-independent local-folder registration contract.
 * A registration is a policy/evidence input; it is not a filesystem capability
 * and it conveys neither a path nor a handle to an Agent Runtime.
 */
export const M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION = "hal.m9.owner-folder-registry.v1" as const;
export const M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS = Object.freeze([".md", ".txt"]);
export const M9_OWNER_FOLDER_REGISTRY_MAX_FILES = 32 as const;
export const M9_OWNER_FOLDER_REGISTRY_MAX_FILE_BYTES = 8_192 as const;
export const M9_OWNER_FOLDER_REGISTRY_MAX_TOTAL_BYTES = 131_072 as const;

export type M9OwnerFolderRegistration = Readonly<{
  schemaVersion: typeof M9_OWNER_FOLDER_REGISTRY_SCHEMA_VERSION;
  registrationId: string;
  sourceDirectory: string;
  allowedExtensions: readonly string[];
  maxFiles: number;
  maxFileBytes: number;
  maxTotalBytes: number;
  ownerConfirmationClaimCategory: "local_owner_confirmed";
  status: "registered" | "revoked";
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
    allowedExtensions: M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS,
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
