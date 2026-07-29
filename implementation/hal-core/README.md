# HAL Core (v0.1 M0 + M1 Skeleton)

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
