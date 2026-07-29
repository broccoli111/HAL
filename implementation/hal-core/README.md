# HAL Core (v0.1 M0-M3 Local Implementation)

This workspace contains the HAL v0.1 controlled baseline (M0) and a minimal, testable M1-ready skeleton.

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

## Source structure

- `src/kernel` - controlled admission config + safe mode
- `src/identity` - immutable owner identity types
- `src/authority` - exact authority decision model
- `src/audit` - append-only in-memory audit records (dev/test only)
- `src/shared` - shared immutable ID and correlation types
- `test` - deterministic unit tests
- `docs` - M0/M1 evidence records
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
