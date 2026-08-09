# M2 Implementation Record — Durable Intent Path

## Scope implemented

M2 introduces a local-only, synthetic-data-only, durable request path:

`request -> intent -> bounded plan -> decision -> transaction disposition -> evidence -> outcome`

All M2 state mutations are append-only event-backed and reconstructable from a file journal in an explicit local state directory.

## Durable model

Implemented immutable durable records:

- Intent (`intentId`, `commandId`, `correlationId`, optional `causationEventId`, `schemaVersion`, `dataClassification`, `provenance`, `timestampIso8601`, `status`)
- Plan (same metadata set + `planId`, `intentId`, bounded plan fields, `status`)
- Decision (same metadata set + `decisionId`, `intentId`, `planId`, `disposition`, `reason`, `uncertainty`, `status`)
- Transaction (same metadata set + `transactionId`, linked IDs, `status`, `declaredEffectClass`, `claimedEffect`, `recoveryDisposition`)
- Evidence (same metadata set + `evidenceId`, `subjectKind`, `subjectId`, `claim`, `confidence`, `status`)
- Outcome (same metadata set + `outcomeId`, linked IDs, `summary`, `claimedEffect`, `status`)
- Durable audit/event records (`eventRecordId`, command metadata, owner, event type, status, payload summary, optional embedded record)

## Owner boundaries

Each domain has exactly one mutation owner class:

- `IntentManager`
- `Planner`
- `DecisionService`
- `TransactionCoordinator`
- `EvidenceService`
- `OutcomeService`
- `AuditService`

Only owner commands mutate durable state by appending journal events. Consumers and CLI code receive frozen snapshots and cannot directly mutate owner state.

## Event semantics and journal

- Journal implementation: `src/m2/journal.ts`
- Storage mechanism: Node built-ins only (`fs`, `path`)
- Format: append-only JSONL (`m2-event-journal.jsonl`)
- Required path policy: explicit `--state-dir`; no implicit production-like default
- Reconstruction source of truth: journal events only

Primary events:

- `IntentRecorded`
- `PlanProposed`
- `DecisionRecorded`
- `TransactionOpened`
- `EvidenceAttached`
- `OutcomeFinalized`
- `CommandRejected`
- `CommandConflictDenied`

## Idempotency and replay behavior

Semantic commands implemented:

- `RecordIntent`
- `ProposePlan`
- `RecordDecision`
- `OpenTransaction`
- `AttachEvidence`
- `FinalizeOutcome`

Behavior:

1. Every command has an immutable `commandId`.
2. `AuditService` computes and stores command fingerprints.
3. Duplicate identical `commandId` returns original disposition (applied or denied) without a second mutation.
4. Conflicting reuse of a `commandId` is denied and audited as `CommandConflictDenied`.
5. Missing-reference, malformed, stale, or uncertain transitions fail closed with `CommandRejected`.
6. Conflict-denial events never replace the original command-index entry; original idempotent replay remains stable before and after hydration.

## Decision-to-transaction authority enforcement

`TransactionCoordinator.openTransaction` derives allowed status/effect from the referenced Decision and rejects caller mismatch:

- `allow` decision -> only `completed_without_effect` and `inspection_only` are admitted.
- `approval_required` or `deny` decision -> only `blocked` and `none` are admitted.
- Transaction creation accepts only the decision-derived opening disposition (no arbitrary `not_started` or `cancelled` at creation).
- Any mismatch fails closed as `CommandRejected` and does not create a Transaction record.

## Derived outcome enforcement

`OutcomeService.finalizeOutcome` validates and derives outcome semantics:

- Intent, Decision, and Transaction references must all exist.
- Transaction must reference supplied Decision and Intent; Decision must reference Intent.
- Decision, Transaction, and Intent correlation IDs must match command correlation.
- Outcome `status` and `claimedEffect` are derived from actual Decision/Transaction state and compared against payload; mismatch is denied as `CommandRejected`.
- Equivalent reference/correlation checks are enforced for Plan->Intent, Decision->Plan/Intent, and Evidence->Transaction.

Replay and recovery:

- `reconstructM2Trace(stateDirectory, correlationId)` rebuilds governed trace from journal.
- A fresh process view (`new AuditService(stateDirectory)`) rehydrates command indexes and record maps from events.

## Journal integrity chain and tamper posture

Each durable event now carries local integrity-chain metadata:

- `previousIntegrityHash` (absent only for first event);
- `integrityHash` (SHA-256 over canonical event content excluding `integrityHash`);
- canonical deterministic hash input with sorted object keys and stable array ordering.

Hydration/reconstruction fail closed on:

- malformed JSONL lines;
- missing required integrity fields;
- broken previous-hash chain;
- integrity-hash mismatch from payload tampering.

No corruption is silently skipped, repaired, or reinterpreted.

## State-directory boundary

- M2 writes only through `LocalFileEventJournal` under caller-provided `stateDirectory`.
- `.gitignore` includes `local-state/` for disposable local data.
- No database package or external persistence system is introduced.

## Test evidence

`test/m2-durable-intent.test.ts` verifies:

- non-owner mutation rejection via frozen snapshots;
- allowed path reaches `completed_without_effect` with claimed effect `inspection_only`;
- approval-required and denied paths reach `blocked` with claimed effect `none`;
- duplicate identical command ID returns original disposition;
- conflicting command ID reuse is denied and audited;
- original idempotency entry is preserved across conflict attempts and journal hydration;
- decision-to-transaction consistency rejects inconsistent status/effect or arbitrary creation statuses;
- outcome derivation/references/correlation checks reject mismatched payload or stale links;
- replay reconstructs both completed-without-effect and blocked paths;
- valid journal replay from hash-chained events;
- tampered payload rejection on hydration;
- tampered previous-hash rejection on hydration;
- malformed JSON-line rejection on hydration/reconstruction;
- required metadata is present on durable records and events;
- fresh-process reconstruction from the journal works;
- source write calls are constrained to explicit state-directory journal path usage.

Existing `test/no-network-imports.test.ts` continues to enforce no network/external client imports.

## Traceability

- **Book II:** single-owner state mutation, event-backed reconstructability, typed command/query/event boundaries.
- **Book IV:** CMP-01/CMP-03/CMP-14/CMP-18/CMP-22/CMP-23/CMP-24/CMP-29 aligned via explicit command semantics, transaction states, evidence and outcome recording, and append-only durable events.
- **Book VI:** trust/identity do not create authority; fail-closed command handling; synthetic data and minimized payload summaries.
- **Book VIII:** replay, negative-path, and recovery-style reconstruction verification added to automated tests.
- **Book IX:** command/event metadata includes versioning, correlation, causation, classification, provenance, and idempotency behavior.
- **Book X:** canonical distinctions preserved (Intent vs Plan vs Decision vs Transaction vs Evidence vs Outcome; Permission vs Authority).

## Explicit non-goals

- No external provider/model/API integration.
- No real authentication or delegated live authority.
- No database adoption.
- No Treaty/federation logic.
- No external execution or live-effect commit barrier.
- No autonomous initiative expansion.
