# M5 Local Backup and Restore Implementation Record

**Status:** Implemented for HAL v0.1 local-only scope  
**Scope boundary:** local filesystem only, synthetic-only evidence, non-live-effect, no network/provider/auth/authority expansion  
**Owner decision impact:** no automatic readiness uplift; `not_ready` remains in force until independent review closure

## 1) Delivered implementation surface

Implemented module: `src/m5/`

- `types.ts`: typed manifest v1 and operation journal contracts.
- `canonicalJson.ts`: recursively sorted canonical JSON serializer.
- `manifest.ts`: manifest build/serialize/validate and integrity hash logic.
- `operationJournal.ts`: append-only hash-chained `m5-backup-restore-journal.jsonl`.
- `backupService.ts`: allowlisted capture + snapshot creation + immutable payload write + copy verification.
- `restoreService.ts`: explicit-root restore into new/empty disposable target + failure invalidation marker.
- `verificationService.ts`: manifest/file/hash verification, artifact-mapping verification, and restored reconstruction checks.
- `coordinator.ts`: `LocalBackupRestoreCoordinator` sole mutation owner for M5 operation records.

CLI added: `src/cli/m5BackupRestoreCli.ts` and `npm run m5:backup-restore`.

## 2) Data model and contracts

### 2.1 Manifest contract (`hal.m5.local-backup-manifest.v1`)

`manifest.json` contains:

- `schemaVersion` fixed to `hal.m5.local-backup-manifest.v1`
- immutable `snapshotId`
- `capturedAtUtc`
- `sourceCommitRef`
- `sourceVersion`
- `classification`
- `provenance` (`initiatedBy`, minimized `sourceRootId`)
- `correlationScope`
- lexicographically sorted `files` entries (normalized POSIX relative path)
- `artifactMappings` for immutable M3 artifact references
- `manifestIntegrityHash`

Per-file entries include required fields:

- `relativePath`
- `byteSize`
- `sha256`
- `logicalContentClass` (`m2_journal`, `m3_journal`, `m4_journal`, `m3_artifact`)

Manifest integrity hash is computed over canonical UTF-8 JSON excluding `manifestIntegrityHash`.

### 2.2 Operation journal contract

Journal path (explicit only):

- `<operationStateDirectory>/m5-backup-restore-journal.jsonl`

Record fields include:

- operation identifiers and type (`backup`, `restore`, `verify`)
- sole owner (`LocalBackupRestoreCoordinator`)
- timestamp
- optional correlation/causation IDs
- minimized source/target root identifiers
- disposition (`succeeded`/`failed`) and reason
- optional manifest integrity hash
- evidence references using bounded labels and logical references (no raw absolute filesystem paths)
- hash-chain fields (`previousIntegrityHash`, `integrityHash`)

No successful operation is returned without durable append.

## 3) Backup behavior implemented

- Explicit caller-provided inputs required: source-state directory, backup root, operation-state directory, source commit ref, source version.
- Only allowlisted sources are captured:
  - `m2-event-journal.jsonl`
  - `m3-event-journal.jsonl`
  - `m4-event-journal.jsonl`
  - regular files directly under `m3-artifacts/`
- Rejects:
  - symlinks
  - unexpected source entries
  - missing required journals
  - path escape/out-of-root resolution
- Creates unique snapshot directory only beneath explicit `backupRoot`.
- Writes immutable payload under `payload/` and `manifest.json`.
- Computes logical artifact mappings from `artifactId` to payload-relative path.
- Verifies source-to-copy hash equality before success.
- On in-process failure after staging starts, writes `SNAPSHOT_INVALID.json` and returns failed disposition (prior snapshots remain untouched).

## 4) Restore behavior implemented

- Explicit caller-provided inputs required: snapshot directory, restore target directory, restore root, operation-state directory.
- Restore target must be under explicit restore root and newly created or empty.
- Restore never overwrites non-empty target state.
- Snapshot verification includes:
  - manifest schema and integrity hash
  - file size/hash checks
  - artifact mapping verification (without rewriting historical journals)
  - M2/M3/M4 reconstruction checks from restored journals
- Restored state is treated as evidence/reconstruction material only.
- On restore failure, writes `RESTORE_INVALID.json` in target and records failed operation.

## 5) CLI modes

Script:

```bash
npm run m5:backup-restore -- <mode> ...
```

Modes:

- `backup`
  - requires explicit `--source-state-dir`, `--backup-root`, `--operation-state-dir`, `--source-commit-ref`, `--source-version`, `--classification`, `--initiated-by`
- `restore`
  - requires explicit `--snapshot-dir`, `--snapshot-root`, `--restore-target-dir`, `--restore-root`, `--operation-state-dir`
- `verify`
  - requires explicit `--snapshot-dir`, `--snapshot-root`, `--operation-state-dir`

All protected roots are explicit arguments; no implicit defaults are used.

## 6) Test evidence

New test suite: `test/m5-local-backup-restore.test.ts`

Coverage includes:

- successful backup/restore/verify with valid M2/M3/M4 reconstruction
- deterministic manifest `files` and artifact mappings for unchanged source
- artifact mapping verification without historical journal rewrite
- tamper rejection (manifest/content/artifact)
- rejection of unexpected files, symlinks, out-of-root targets, and non-empty restore targets
- invalid restore marking (`RESTORE_INVALID.json`)
- source immutability checks
- M5 operation journal hash-chain tamper fail-closed behavior

Updated test list for write-boundary inventory in `test/m2-durable-intent.test.ts` to include new M5 write owners.

## 7) Known limitations

- Backup artifact capture intentionally scopes to regular files directly under `m3-artifacts/` (nested artifact directories are rejected by design for stricter control).
- Root identifiers in operation records are minimized by local SHA-256 of resolved absolute paths; this supports locality/privacy but is not an anonymization guarantee.
- No encryption, key-management, remote replication, cloud storage, or credential handling is implemented or claimed.

## 8) Traceability

- Design source: `docs/M5_LOCAL_BACKUP_AND_RESTORE_DESIGN.md`
- Assurance package references:
  - `docs/M5_READINESS_AND_ASSURANCE_DESIGN.md`
  - `docs/M5_EVIDENCE_REGISTER.md`
  - `docs/M5_LOCAL_OPERATIONS_AND_RECOVERY_RUNBOOK.md`
  - `docs/M5_OWNER_READINESS_DECISION.md`

This record documents implementation facts only and does not alter the current Owner decision state.
