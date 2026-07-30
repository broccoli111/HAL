# M5 Local Operations and Recovery Runbook

**Status:** Local-only runbook for M5 assurance operations  
**Boundary:** synthetic-only, no-network, non-live-effect, no external side effects

## 1) Scope and operating constraints

This runbook applies only to the local `implementation/hal-core` M0-M4 slice.

- No external providers, integrations, or accounts.
- No real authentication flows.
- No controlled-reality or live-effect execution.
- All evidence and state are local and disposable unless explicitly retained.

## 2) Preflight (required before any run)

From repository root:

```bash
npm --prefix "implementation/hal-core" run format:check
npm --prefix "implementation/hal-core" run lint
npm --prefix "implementation/hal-core" run typecheck
npm --prefix "implementation/hal-core" run test
npm --prefix "implementation/hal-core" run security:scan
```

Preflight pass criteria:

- all five commands pass;
- no unresolved critical alert in local check output;
- working tree state is recorded in evidence package.

## 3) Disposable local state setup

Use explicit disposable directories for every demo cycle:

```bash
mkdir -p "./implementation/hal-core/local-state/m5/m1"
mkdir -p "./implementation/hal-core/local-state/m5/m2"
mkdir -p "./implementation/hal-core/local-state/m5/m3"
mkdir -p "./implementation/hal-core/local-state/m5/m4"
```

Do not reuse prior test state unless replay testing explicitly requires it.

## 4) Controlled local demo operations

Run from repo root using explicit `--prefix`.

### 4.0 Required local test configuration (M1/M2 prerequisite)

Before running M1 or M2 demos, set:

```bash
export HAL_ENVIRONMENT=development
export HAL_SAFE_MODE=restrictive
export HAL_OWNER_ID=owner_independent_reviewer
```

These values are local non-secret test configuration only. They are not authentication credentials and do not create authority.

### 4.1 M1 demo set

```bash
npm --prefix "implementation/hal-core" run m1:demo -- --fixture allowed_inspection_request
npm --prefix "implementation/hal-core" run m1:demo -- --fixture approval_required_request
npm --prefix "implementation/hal-core" run m1:demo -- --fixture denied_unknown_request
```

### 4.2 M2 demo set

```bash
npm --prefix "implementation/hal-core" run m2:demo -- --state-dir "./implementation/hal-core/local-state/m5/m2" --fixture allowed_inspection_request
npm --prefix "implementation/hal-core" run m2:demo -- --state-dir "./implementation/hal-core/local-state/m5/m2" --fixture approval_required_request
npm --prefix "implementation/hal-core" run m2:demo -- --state-dir "./implementation/hal-core/local-state/m5/m2" --fixture denied_unknown_request
```

### 4.3 M3 demo set

```bash
npm --prefix "implementation/hal-core" run m3:demo -- run --state-dir "./implementation/hal-core/local-state/m5/m3"
```

### 4.4 M4 demo set

```bash
npm --prefix "implementation/hal-core" run m4:demo -- run --state-dir "./implementation/hal-core/local-state/m5/m4" --scenario allowed_verified
```

### 4.5 M5 backup/restore/verify demo set

```bash
mkdir -p "./implementation/hal-core/local-state/m5/backup-root"
mkdir -p "./implementation/hal-core/local-state/m5/ops"
mkdir -p "./implementation/hal-core/local-state/m5/restore-root"

npm --prefix "implementation/hal-core" run m5:backup-restore -- backup \
  --source-state-dir "./implementation/hal-core/local-state/m5/m4" \
  --backup-root "./implementation/hal-core/local-state/m5/backup-root" \
  --operation-state-dir "./implementation/hal-core/local-state/m5/ops" \
  --source-commit-ref "<commit-sha>" \
  --source-version "0.1.0-local" \
  --classification "synthetic_non_sensitive" \
  --initiated-by "owner_local_operator"

npm --prefix "implementation/hal-core" run m5:backup-restore -- restore \
  --snapshot-dir "<snapshot-dir-from-backup-output>" \
  --snapshot-root "./implementation/hal-core/local-state/m5/backup-root" \
  --restore-target-dir "./implementation/hal-core/local-state/m5/restore-root/restored-1" \
  --restore-root "./implementation/hal-core/local-state/m5/restore-root" \
  --operation-state-dir "./implementation/hal-core/local-state/m5/ops"

npm --prefix "implementation/hal-core" run m5:backup-restore -- verify \
  --snapshot-dir "<snapshot-dir-from-backup-output>" \
  --snapshot-root "./implementation/hal-core/local-state/m5/backup-root" \
  --operation-state-dir "./implementation/hal-core/local-state/m5/ops"
```

## 5) Reconstruction procedure

Capture correlation IDs from demo output, then reconstruct:

```bash
npm --prefix "implementation/hal-core" run m2:demo -- reconstruct --state-dir "./implementation/hal-core/local-state/m5/m2" --correlation-id <m2-correlation-id>
npm --prefix "implementation/hal-core" run m3:demo -- reconstruct --state-dir "./implementation/hal-core/local-state/m5/m3" --correlation-id <m3-correlation-id>
npm --prefix "implementation/hal-core" run m4:demo -- reconstruct --state-dir "./implementation/hal-core/local-state/m5/m4" --correlation-id <m4-correlation-id>
```

Expected posture:

- reconstruction is evidence-driven;
- integrity or linkage issues fail closed (do not infer success).

## 6) Incident handling (local-only)

Trigger incident handling when any of the following occur:

- preflight check failure;
- journal integrity failure;
- unexpected no-network boundary breach signal;
- reconstruction mismatch or unavailable result where success was expected.

Local incident flow:

1. Stop further demo runs.
2. Preserve current local state directory and command logs.
3. Record condition in M5 evidence register as `pending`/`inconclusive`.
4. Run targeted negative-path check to confirm fail-closed behavior.
5. Escalate to M5 independent verification workflow before any readiness conclusion.

## 7) Evidence preservation

Preserve at minimum:

- preflight command outputs;
- correlation IDs and reconstruction outputs;
- M2/M3/M4 journal snapshots;
- artifact hash list and verification outcomes;
- any failure/tamper logs and dispositions.

Suggested package root:

```text
implementation/hal-core/local-state/m5/evidence-package/
```

## 8) Controlled shutdown

After operations:

1. Ensure no further demo commands are running.
2. Snapshot journals and artifacts into evidence package.
3. Record final pre/post check statuses.
4. Mark run complete with timestamp and operator identifier.

## 9) Post-run verification

Re-run the five local checks after documentation or evidence updates:

```bash
npm --prefix "implementation/hal-core" run format:check
npm --prefix "implementation/hal-core" run lint
npm --prefix "implementation/hal-core" run typecheck
npm --prefix "implementation/hal-core" run test
npm --prefix "implementation/hal-core" run security:scan
```

## 10) Backup/restore drill status

**Current state:** implemented local control with retained constraints.

- Backup and restore are local-only evidence controls with explicit caller-provided roots.
- Restore output is evidence/reconstruction material only; it does not authorize rerun.
- Failures are durably recorded in `m5-backup-restore-journal.jsonl`; partial restore targets are marked invalid.
- This capability does not change authority, boundary scope, or Owner decision posture.

Residual assurance condition:

- Independent review of M5 backup/restore evidence remains an explicit residual risk and a prerequisite for any stronger assurance claim or scope expansion.
