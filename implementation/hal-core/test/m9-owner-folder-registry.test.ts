import { mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import {
  M9OwnerFolderRegistryJournal,
  M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS,
  M9_OWNER_FOLDER_REGISTRY_MAX_FILE_BYTES,
  M9_OWNER_FOLDER_REGISTRY_MAX_FILES,
  M9_OWNER_FOLDER_REGISTRY_MAX_TOTAL_BYTES,
  createM9OwnerFolderRegistration,
  revokeM9OwnerFolderRegistration
} from "../src/m9/ownerFolderRegistry.js";
import {
  buildM9OwnerFolderPackArtifact,
  collectM9OwnerFolderSourceSnapshot,
  persistM9OwnerFolderPackArtifact
} from "../src/m9/ownerFolderPack.js";

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

  test("persists an artifact once to an explicit empty destination", async () => {
    const sourceDirectory = await mkdtemp(path.join(os.tmpdir(), "hal-owner-folder-write-source-"));
    const destinationParent = await mkdtemp(
      path.join(os.tmpdir(), "hal-owner-folder-write-destination-")
    );
    const destination = path.join(destinationParent, "pack");
    try {
      await writeFile(path.join(sourceDirectory, "note.txt"), "bounded owner text", "utf8");
      const registration = createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory,
        ownerConfirmationClaim: "local_owner_confirmed"
      });
      const artifact = buildM9OwnerFolderPackArtifact(
        registration,
        collectM9OwnerFolderSourceSnapshot(registration)
      );
      persistM9OwnerFolderPackArtifact(artifact, destination);
      expect(await readFile(path.join(destination, "manifest.json"), "utf8")).toContain(
        artifact.manifestHashSha256
      );
      expect(() => persistM9OwnerFolderPackArtifact(artifact, destination)).toThrow(
        "already exists"
      );
    } finally {
      await rm(sourceDirectory, { recursive: true, force: true });
      await rm(destinationParent, { recursive: true, force: true });
    }
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

  test("durably chains Owner registration and revocation policy evidence", async () => {
    const stateDirectory = await mkdtemp(path.join(os.tmpdir(), "hal-owner-folder-state-"));
    try {
      const registration = createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory: "/private/tmp/hal-owner-notes",
        ownerConfirmationClaim: "local_owner_confirmed"
      });
      const journal = new M9OwnerFolderRegistryJournal(stateDirectory);
      const registered = journal.append("registered", registration);
      const revoked = journal.append(
        "revoked",
        revokeM9OwnerFolderRegistration(registration, "local_owner_confirmed")
      );
      expect(revoked.previousRecordHash).toBe(registered.recordHash);
      expect(journal.latest("owner_notes_v1")?.status).toBe("revoked");
      expect(journal.list()).toHaveLength(2);
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });

  test("HAL alone collects a bounded immutable source snapshot from an exact registered folder", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "hal-owner-folder-"));
    const source = path.join(directory, "note.txt");
    try {
      await writeFile(source, "Green is the favorite color.\n\nThis is owner context.\n", "utf8");
      const registration = createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory: directory,
        ownerConfirmationClaim: "local_owner_confirmed"
      });
      const snapshot = collectM9OwnerFolderSourceSnapshot(registration);
      expect(snapshot).toHaveLength(1);
      expect(snapshot[0]?.sourceLabel).toBe("owner-approved local folder owner_notes_v1/note.txt");
      expect(snapshot[0]?.paragraphs).toEqual([
        "Green is the favorite color.",
        "This is owner context."
      ]);
      expect(snapshot[0]?.sha256).toMatch(/^[a-f0-9]{64}$/);
      const artifact = buildM9OwnerFolderPackArtifact(registration, snapshot);
      expect(artifact.packId).toBe("owner_folder_owner_notes_v1_v1");
      expect(artifact.manifestHashSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(artifact.content[0]?.relativePath).toBe("content/source-00.json");
      expect(artifact.content[0]?.utf8).toContain("Green is the favorite color.");
      expect(artifact.manifest).toMatchObject({
        packClassification: "owner_approved_local_document_folder_registry",
        provenanceClassification: "owner_approved_local_document"
      });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  test("collection fails closed for unapproved files, symlinks, and revoked registrations", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "hal-owner-folder-deny-"));
    try {
      await writeFile(path.join(directory, "note.pdf"), "not permitted", "utf8");
      const registration = createM9OwnerFolderRegistration({
        registrationId: "owner_notes_v1",
        sourceDirectory: directory,
        ownerConfirmationClaim: "local_owner_confirmed"
      });
      expect(() => collectM9OwnerFolderSourceSnapshot(registration)).toThrow(
        "file type is not approved"
      );
      await rm(path.join(directory, "note.pdf"));
      await symlink("/private/tmp/not-present", path.join(directory, "note.txt"));
      expect(() => collectM9OwnerFolderSourceSnapshot(registration)).toThrow("regular non-symlink");
      expect(() =>
        collectM9OwnerFolderSourceSnapshot(
          revokeM9OwnerFolderRegistration(registration, "local_owner_confirmed")
        )
      ).toThrow("registration is revoked");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
