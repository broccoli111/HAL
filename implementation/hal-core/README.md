# HAL Core (v0.1 M0-M6 Local Implemented Slice + M5-M6 Assurance Docs)

This workspace contains the HAL v0.1 implemented local slice for M0-M6, plus M5-M6 assurance and readiness documentation.

## Safety boundary (local-only)

- Local development and local test use only.
- Synthetic data only.
- No outbound network behavior is implemented by source code.
- No external provider, API client, account access, messaging, purchases, or device control exists.
- No real authentication, no production database, and no live-effect execution capability is included.
- Authority is never inferred from username, machine, credentials, transport success, or model output.

## Prerequisites

- Node.js 20+ (LTS-compatible)
- npm 10+

## Setup

```bash
npm install
cp .env.example .env
```

Use only non-secret local values in `.env`.

## Supported commands

- `npm run format` - format source files
- `npm run format:check` - verify formatting
- `npm run lint` - static lint checks
- `npm run typecheck` - strict TypeScript check
- `npm run test` - full test suite
- `npm run check` - format + lint + typecheck + tests
- `npm run security:scan` - dependency vulnerability audit (`npm audit`)
- `npm run m0:source-manifest` - regenerate `docs/SOURCE_CONTROL_MANIFEST.md`
- `npm run m1:demo` - run local M1 trustworthy-core demo using fixed fixtures
- `npm run m2:demo` - run local M2 durable intent demo and reconstruction
- `npm run m3:demo` - run local M3 bounded capability demo and reconstruction
- `npm run m4:demo` - run local M4 verified outcome demo and reconstruction
- `npm run m5:backup-restore` - run local M5 backup/restore/verify operations
- `npm run m6:inquire` - run local M6 deterministic free-form inquiry
- `npm run m7:session` - run local M7 terminal inquiry session (M6-governed delegation)

## Source structure

- `src/kernel` - controlled admission config + safe mode
- `src/identity` - immutable owner identity types
- `src/authority` - exact authority decision model
- `src/audit` - append-only in-memory audit records (dev/test only)
- `src/shared` - shared immutable ID and correlation types
- `test` - deterministic unit tests
- `docs` - M0-M6 evidence, implementation, readiness, and assurance records
- `scripts` - manifest generation utility

## CI behavior

GitHub Actions runs format check, lint, typecheck, tests, and security scan. Tests are deterministic and local-only; no network-dependent test behavior is admitted.

## M1 demo usage

The CLI only accepts predefined local fixtures:

```bash
npm run m1:demo -- --fixture allowed_inspection_request
npm run m1:demo -- --fixture approval_required_request
npm run m1:demo -- --fixture denied_unknown_request
```

Expected dispositions in restrictive mode (`HAL_SAFE_MODE=restrictive`):

- `allowed_inspection_request` -> `allow` with claimed effect `inspection_only`
- `approval_required_request` -> `approval_required` with claimed effect `none` (non-executing restriction)
- `denied_unknown_request` -> `deny` with claimed effect `none`

## M2 durable intent demo usage

M2 requires an explicit disposable local state directory for the file-backed append-only journal.

```bash
mkdir -p ./local-state/hal-m2
npm run m2:demo -- --state-dir ./local-state/hal-m2 --fixture allowed_inspection_request
npm run m2:demo -- --state-dir ./local-state/hal-m2 --fixture approval_required_request
npm run m2:demo -- --state-dir ./local-state/hal-m2 --fixture denied_unknown_request
```

Reconstruct a governed trace from an existing correlation ID:

```bash
npm run m2:demo -- reconstruct --state-dir ./local-state/hal-m2 --correlation-id <correlation-id>
```

The CLI prints correlation, intent, plan, decision, transaction, and outcome IDs; disposition; transaction status; claimed effect; and event count.

## M3 bounded capability demo usage

M3 also requires an explicit disposable local state directory. It executes the approved synthetic corpus through M2 allow-path governance and then M3 capability execution.

```bash
mkdir -p ./local-state/hal-m3
npm run m3:demo -- run --state-dir ./local-state/hal-m3
```

Reconstruct M3 traceability by correlation ID:

```bash
npm run m3:demo -- reconstruct --state-dir ./local-state/hal-m3 --correlation-id <correlation-id>
```

The command prints request/attempt/artifact/verification IDs, correlation ID, provider version, fixture manifest hash, verification result, and claimed effect.

## M4 verified outcome demo usage

M4 requires an explicit disposable state directory and derives a final no-effect outcome attestation from M2+M3 evidence.

```bash
mkdir -p ./local-state/hal-m4
npm run m4:demo -- run --state-dir ./local-state/hal-m4 --scenario allowed_verified
```

Reconstruct M4 evidence by correlation ID:

```bash
npm run m4:demo -- reconstruct --state-dir ./local-state/hal-m4 --correlation-id <correlation-id>
```

## M5 assurance package documents

- `docs/M5_READINESS_AND_ASSURANCE_DESIGN.md`
- `docs/M5_EVIDENCE_REGISTER.md`
- `docs/M5_LOCAL_OPERATIONS_AND_RECOVERY_RUNBOOK.md`
- `docs/M5_INDEPENDENT_VERIFICATION_PROTOCOL.md`
- `docs/M5_OWNER_READINESS_DECISION.md`
- `docs/M5_OWNER_LOCAL_READINESS_DECISION.md`
- `docs/M5_OWNER_RUN_REPRODUCIBILITY_RECORD.md`
- `docs/M5_OWNER_RUN_BACKUP_RESTORE_EVIDENCE_RECORD.md`
- `docs/M5_LOCAL_BACKUP_AND_RESTORE_DESIGN.md`
- `docs/M5_LOCAL_BACKUP_AND_RESTORE_IMPLEMENTATION_RECORD.md`
- `docs/M6_CONTROLLED_FREE_FORM_LOCAL_INQUIRY_DESIGN.md`
- `docs/M6_IMPLEMENTATION_RECORD.md`
- `docs/M6_LOCAL_TEST_RUNBOOK.md`
- `docs/M6_OWNER_RUN_LOCAL_VERIFICATION_RECORD.md`
- `docs/M7_LOCAL_INQUIRY_SESSION_DESIGN.md` (Design basis)
- `docs/M7_IMPLEMENTATION_RECORD.md`
- `docs/M8_OFFLINE_DESKTOP_INTERFACE_DESIGN.md` (**Proposed / not implemented**)

## M6 controlled local inquiry usage

M6 accepts exactly one typed question and executes local-only deterministic matching against the approved synthetic corpus.

```bash
mkdir -p ./local-state/m6
npm run m6:inquire -- --state-dir ./local-state/m6 --request-id m6-inquiry-001 --question "What is HAL?"
```

Constraints:

- One `--question` value per invocation.
- Caller-visible `--request-id` enables governed replay/conflict behavior.
- Input is normalized and evaluated with fixed deterministic rejection precedence.
- Rejected input never prints or persists raw question text.
- Corpus is fixed to approved local synthetic JSON files under `fixtures/synthetic-corpus`.
- Rendered response is deterministic and capped at 1200 UTF-8 bytes.
- Durable journals exclude raw question text, raw corpus paragraphs, rendered answer text, and transient excerpts.
- All outcomes remain `externalEffect=none`.

For Owner-run local verification and evidence capture:

- `docs/M6_LOCAL_TEST_RUNBOOK.md`
- `docs/M6_OWNER_RUN_LOCAL_VERIFICATION_RECORD.md`

Local evidence bundle retained for the pre-independent-verification Owner run:

- `local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/`

## M5 backup/restore CLI usage

All M5 backup/restore inputs require explicit caller-provided paths and source references; no protected-root defaults exist.

```bash
npm run m5:backup-restore -- backup --source-state-dir ./local-state/hal-m4 --backup-root ./local-state/m5-backups --operation-state-dir ./local-state/m5-ops --source-commit-ref <commit-sha> --source-version 0.1.0-local --classification synthetic_non_sensitive --initiated-by owner_local_operator
npm run m5:backup-restore -- restore --snapshot-dir <snapshot-dir> --snapshot-root ./local-state/m5-backups --restore-target-dir ./local-state/m5-restore/restored-1 --restore-root ./local-state/m5-restore --operation-state-dir ./local-state/m5-ops
npm run m5:backup-restore -- verify --snapshot-dir <snapshot-dir> --snapshot-root ./local-state/m5-backups --operation-state-dir ./local-state/m5-ops
```

## M7 local inquiry session usage

M7 is a terminal-only local session interface that delegates every inquiry to M6 governed execution.

```bash
mkdir -p ./local-state/m7
npm run m7:session -- --state-dir ./local-state/m7
```

Admitted commands:

- `help`
- `status`
- `ask <question>`
- `ask --request-id <id> --replay-intent <question>`
- `exit`

Session constraints:

- Requires explicit `--state-dir` with strict local safety validation.
- Plain `ask` generates a fresh local request ID using `m7-session-request-...`.
- Explicit request-ID reuse is only allowed via `--request-id ... --replay-intent ...`.
- No follow-up interpretation, no conversational memory, and no hidden prompt state.
- No session transcript, raw question history, rendered answer text, or excerpt persistence by M7.
- M6/M2/M3/M4/M5 durable records remain the sole governed evidence path.
- All outcomes remain local-only, synthetic-only, deterministic, and `externalEffect=none`.
