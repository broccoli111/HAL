# M5 Local Backup and Restore Control Design

**Status:** Proposed design only (no runtime implementation in this step)  
**Scope baseline:** HAL v0.1 M0-M4 local-only slice in `implementation/hal-core`  
**Decision posture:** This design alone does not change Owner decision status (`not_ready` remains in force).

## 1) Purpose and hard scope boundary

This document defines the required design contract for a future local backup/restore control used to preserve and verify M2-M4 evidence continuity.

Hard scope boundary:

- local filesystem only;
- synthetic/local HAL evidence only;
- no network, cloud, external storage, credentials, providers, databases, or live effects;
- no authority expansion and no boundary advancement;
- no readiness uplift merely from writing this design.

## 2) Controlled source scope and allowlist

Backup source capture is restricted to an explicit allowlist only:

- `m2-event-journal.jsonl`;
- `m3-event-journal.jsonl`;
- `m4-event-journal.jsonl`;
- regular files under `m3-artifacts/`.

Additional scope requirements:

- every captured entry MUST be a regular file;
- every symlink MUST be rejected;
- any file outside the allowlist MUST be rejected;
- secrets, ambient credentials, external data, and mutable working directories outside allowlist are excluded.

## 3) Root declarations and separation rules

The caller MUST provide three explicit declared roots:

- `backupRoot`: where snapshots are created;
- `operationStateDirectory`: where backup/restore operation records are durably appended;
- `restoreRoot`: parent root under which restore targets may be created.

Separation requirements:

- `backupRoot`, `operationStateDirectory`, and `restoreRoot` are separate explicit roots;
- no implicit defaults are allowed;
- path normalization and containment checks MUST prove each operation stays within the declared root.

## 4) Manifest v1 contract

### 4.1 Schema identifier

The manifest schema version is fixed for v1 as:

- `hal.m5.local-backup-manifest.v1`

### 4.2 Canonical serialization

Manifest bytes for hashing and persistence MUST use:

- UTF-8 JSON;
- canonical serialization with recursively sorted object keys;
- `files` list sorted lexicographically by normalized POSIX relative path.

### 4.3 Required snapshot metadata fields

Manifest v1 MUST include at least:

- `schemaVersion` (exactly `hal.m5.local-backup-manifest.v1`);
- `snapshotId` (immutable identifier);
- `capturedAtUtc` (UTC timestamp);
- `sourceCommitRef` (commit SHA or equivalent baseline ref);
- `sourceVersion` (project/package version label at capture);
- `classification` (local synthetic evidence classification);
- `provenance` (named initiator and declared source root identifier);
- `correlationScope` (summary or explicit none).

### 4.4 Required per-file fields

For each entry in `files`, manifest v1 MUST include:

- normalized POSIX relative path;
- byte size;
- SHA-256;
- logical content class.

Logical content class MUST distinguish at minimum:

- `m2_journal`;
- `m3_journal`;
- `m4_journal`;
- `m3_artifact`.

### 4.5 Manifest integrity hash rule

Manifest v1 MUST contain an integrity hash field computed as:

- SHA-256 of the canonical manifest serialization excluding the integrity-hash field itself.

Verification MUST recompute using the same exclusion rule and canonical serialization rules.

## 5) Snapshot directory layout and eligibility

Snapshots are created only under caller-provided `backupRoot` using a unique snapshot directory.

Required layout:

- `<backupRoot>/<snapshotDirectory>/manifest.json`
- `<backupRoot>/<snapshotDirectory>/payload/...`

Payload requirements:

- copied payload under `payload/` is immutable once snapshot is eligible;
- payload paths mirror normalized relative paths used by manifest entries.

Eligibility requirements:

- no snapshot is eligible until all copy and hash checks succeed;
- failed/incomplete staging output is not eligible;
- failed/incomplete staging output must be retained or explicitly marked invalid;
- prior eligible snapshots must never be deleted or rewritten due to a new failure.

## 6) Operation-record ownership and durable placement

### 6.1 Sole owner

The sole mutation owner for backup/restore operation records is:

- `LocalBackupRestoreCoordinator`

### 6.2 Journal location and format

Operation records MUST be append-only and hash-chained in:

- `m5-backup-restore-journal.jsonl`

Placement requirement:

- this journal resides only in caller-provided explicit `operationStateDirectory`.

### 6.3 Required record fields

Each operation record MUST include:

- operation ID and snapshot ID (if assigned);
- operation type (`backup` or `restore`);
- timestamp;
- correlation and causation identifiers where available;
- source/target roots as minimized identifiers (not expanded sensitive paths);
- disposition and reason;
- manifest integrity hash;
- evidence references (manifest path, verification log references, and invalidation markers where applicable);
- prior-record hash and current-record hash for chain integrity.

No operation may be considered successful without its durable append to `m5-backup-restore-journal.jsonl`.

## 7) Restore semantics and artifact-path preservation

### 7.1 Historical immutability constraints

- Existing M3/M4 journals are immutable historical records.
- Recorded artifact paths in historical journals MUST never be rewritten during restore.

### 7.2 Logical artifact mapping requirement

Manifest v1 MUST include logical artifact mapping that links each captured artifact reference to a normalized relative payload path.

### 7.3 Restore verification behavior

Restore verification MUST:

- validate restored artifact bytes against manifest mapping and SHA-256;
- avoid mutating historical journal records;
- treat restored content as evidence/reconstruction material, not as authority to rerun.

### 7.4 Reconstruction and artifact verification separation

Reconstruction from restored state is performed in two distinct tracks:

- **Track A (journal reconstruction):**
  - run M2 reconstruction on restored `m2-event-journal.jsonl`;
  - run M3 reconstruction on restored `m3-event-journal.jsonl`;
  - run M4 reconstruction on restored `m4-event-journal.jsonl`;
  - require expected fail-closed behavior for integrity/linkage anomalies.
- **Track B (artifact verification):**
  - independently verify restored artifact bytes using manifest logical mapping + per-file SHA-256;
  - report artifact verification evidence separately from journal reconstruction outputs.

A restored state is an evidence/reconstruction view only. It is not automatically runnable as a new execution environment and does not authorize rerun.

## 8) Restore target rules and invalidation posture

Restore target constraints:

- restore target must be caller-provided under `restoreRoot`;
- restore target must be newly created for the operation or verified empty before writes;
- restore must never overwrite an existing HAL state directory.

Failure posture:

- any partial target produced by interruption or validation failure is durably marked invalid in operation records;
- partial target must not be declared restored or eligible for reconstruction certification.

## 9) Safety/path rejection requirements

The design MUST reject and durably record at least:

- traversal (`..`), absolute-path injection, separator confusion, and out-of-root resolutions;
- any symlink in source inputs, payload, or restore target paths;
- unexpected files, missing required files, malformed manifest, hash mismatches;
- target collisions and non-empty restore targets.

Any uncertainty in containment, integrity, or classification is treated as failure (fail closed).

## 10) Acceptance plan for later implementation

Implementation acceptance requires evidence for all categories below.

### 10.1 Determinism and manifest contract tests

- manifest determinism under repeated runs on unchanged source;
- canonical recursive key ordering and UTF-8 serialization conformance;
- lexicographic path ordering for manifest file list;
- integrity-hash recomputation using self-field exclusion rule.

### 10.2 Scope and path safety tests

- allowlist-only capture enforcement;
- symlink rejection for all source entries;
- root containment enforcement for `backupRoot`, `operationStateDirectory`, and `restoreRoot`;
- restore target new-or-empty enforcement and collision rejection.

### 10.3 Restore correctness tests

- logical artifact mapping is used without rewriting journal history;
- restored-journal reconstruction succeeds/fails per existing M2/M3/M4 integrity rules;
- restored-artifact verification is demonstrated separately from journal reconstruction.

### 10.4 Failure and interruption tests

- tampered manifest/file/journal/artifact rejection;
- interrupted backup/restore yields no eligible success state;
- partial outputs are durably marked invalid and excluded from success claims.

### 10.5 Operation-journal integrity tests

- append-only behavior for `m5-backup-restore-journal.jsonl`;
- hash-chain validation of M5 operation records;
- no backup/restore success claim without durable operation record append.

### 10.6 Boundary-preservation and decision-gate tests

- source state remains unchanged after backup/restore attempts;
- no network and no external effect proofs are retained;
- explicit acceptance evidence is linked in `M5_EVIDENCE_REGISTER.md` before Owner `not_ready` reconsideration.

Without complete acceptance evidence across sections 10.1 through 10.6, readiness remains `not_ready`.

## 11) Explicit non-goals

- no backup/restore implementation in this step;
- no automatic cleanup or deletion;
- no real authentication claim;
- no encryption/key-management assurance claim;
- no remote replication, NAS admission, or cloud backup scope;
- no controlled-reality authorization.
