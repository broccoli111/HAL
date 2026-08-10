import { describe, expect, test } from "vitest";

import {
  M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS,
  M9_OWNER_FOLDER_REGISTRY_MAX_FILE_BYTES,
  M9_OWNER_FOLDER_REGISTRY_MAX_FILES,
  M9_OWNER_FOLDER_REGISTRY_MAX_TOTAL_BYTES,
  createM9OwnerFolderRegistration,
  revokeM9OwnerFolderRegistration
} from "../src/m9/ownerFolderRegistry.js";

describe("M9 Owner-controlled folder registry contract", () => {
  test("creates a fixed-policy HAL-owned registration without reading a folder", () => {
    const registration = createM9OwnerFolderRegistration({
      registrationId: "owner_notes_v1",
      sourceDirectory: "/private/tmp/hal-owner-notes",
      ownerConfirmationClaim: "local_owner_confirmed"
    });
    expect(registration.status).toBe("registered");
    expect(registration.allowedExtensions).toEqual([".md", ".txt"]);
    expect(registration.maxFiles).toBe(M9_OWNER_FOLDER_REGISTRY_MAX_FILES);
    expect(registration.maxFileBytes).toBe(M9_OWNER_FOLDER_REGISTRY_MAX_FILE_BYTES);
    expect(registration.maxTotalBytes).toBe(M9_OWNER_FOLDER_REGISTRY_MAX_TOTAL_BYTES);
    expect(registration.allowedExtensions).toEqual(M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS);
  });

  test("rejects implicit, broad, or malformed registration inputs", () => {
    expect(() =>
      createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory: "relative-folder",
        ownerConfirmationClaim: "local_owner_confirmed"
      })
    ).toThrow("must be absolute");
    expect(() =>
      createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory: "/",
        ownerConfirmationClaim: "local_owner_confirmed"
      })
    ).toThrow("cannot be filesystem root");
    expect(() =>
      createM9OwnerFolderRegistration({
        registrationId: "x",
        sourceDirectory: "/private/tmp/hal-owner-notes",
        ownerConfirmationClaim: "local_owner_confirmed"
      })
    ).toThrow("ID is invalid");
    expect(() =>
      createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory: "/private/tmp/hal-owner-notes",
        ownerConfirmationClaim: "runtime_requested"
      })
    ).toThrow("explicit local Owner confirmation");
  });

  test("requires a second explicit Owner confirmation to revoke", () => {
    const registration = createM9OwnerFolderRegistration({
      registrationId: "owner_notes_v1",
      sourceDirectory: "/private/tmp/hal-owner-notes",
      ownerConfirmationClaim: "local_owner_confirmed"
    });
    expect(() => revokeM9OwnerFolderRegistration(registration, "runtime_requested")).toThrow(
      "explicit local Owner confirmation"
    );
    expect(revokeM9OwnerFolderRegistration(registration, "local_owner_confirmed").status).toBe(
      "revoked"
    );
  });
});
