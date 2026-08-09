# M1 Implementation Record — Trustworthy Core Demo

## Scope implemented

This M1 increment implements a deterministic local demonstration pipeline:

1. load controlled configuration;
2. initialize Safe Mode;
3. load one predefined local request fixture;
4. evaluate deterministic authority decision policy;
5. append correlated immutable audit records;
6. print concise human-readable decision output.

## Files changed for M1

- `src/cli/m1DemoCli.ts`
- `src/kernel/m1CoreDemo.ts`
- `src/request/model.ts`
- `src/request/fixtures.ts`
- `src/authority/localPolicy.ts`
- `src/audit/memoryAuditStore.ts`
- `src/shared/id.ts`
- `src/shared/types.ts`
- `src/kernel/index.ts`
- `src/index.ts`
- `test/m1-demo.test.ts`
- `test/id-and-audit.test.ts`
- `test/no-network-imports.test.ts`
- `README.md`
- `package.json`

## Architectural assumptions

1. Request input is fixture-only for M1 demo, not arbitrary user text.
2. Safe Mode `restrictive` permits exactly one inspection action (`allow`), returns `approval_required` for one recognized but non-admitted draft action, and denies all other actions.
3. Audit details reject sensitive-looking fields by keyword pattern rather than storing redacted payload fragments.
4. No effect execution engine exists; `allow` only indicates policy admission for an inspection-class synthetic action.
5. `approval_required` is an explicit non-executing restriction state and does not grant permission or bypass Safe Mode.

## Explicit non-goals (still excluded)

- No external providers or model routing.
- No outbound API/network client behavior.
- No real authentication implementation.
- No persistent database.
- No action execution capabilities affecting external systems.
- No treaty/federation or live-effect behavior.

## Evidence and tests

Tests validate:

- allowed request returns expected decision and evidence;
- restrictive Safe Mode allows only inspection fixture effect (`inspection_only`);
- unknown request denies with no claimed effect;
- approval-required request does not execute;
- approval-required fixture never returns `allow`;
- malformed and missing configuration fail closed;
- Safe Mode blocks unknown/non-admitted work while keeping approval-required non-executing;
- audit trail reconstruction by correlation ID works;
- no network/external client imports are introduced in source.

## Traceability (Book II/IV/VI/VIII/IX/X)

- **Book II:** kernel boundary, safe mode, authoritative decision path, reconstructable evidence.
- **Book IV:** CMP-01/CMP-03/CMP-24 semantics: explicit decision outcome, no authority inference, append-only correlated audit.
- **Book VI:** permission not inferred from trust/credential/environment; sensitive detail controls in audit.
- **Book VIII:** deterministic verification evidence through local tests and fail-closed behavior.
- **Book IX:** decision vocabulary and correlation identity preserved; no transport-success-based authorization.
- **Book X:** canonical distinctions preserved (`Authority`, `Permission`, `Correlation`, `Evidence`).

## Runtime constraints confirmed

M1 demo remains development/test-only, synthetic-data-only, no-network by design, and non-live-effect.
