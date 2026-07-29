# M3 Implementation Record - Bounded Local Capability

## Scope

This record documents HAL v0.1 M3 implementation of exactly one local bounded capability:

- `inspect_synthetic_corpus_summary`

The capability is local-only, synthetic-data-only, deterministic, non-live-effect, and governed by prior M2 authority records.

## Capability contract

- Capability ID: `inspect_synthetic_corpus_summary`
- Provider: `LocalSyntheticCorpusInspector@1.0.0`
- Admission prerequisite: linked M2 `allow` decision and correlated Intent/Plan/Decision/Transaction references
- Input bounds: item limit <= 20, bounded deadline <= 10_000 ms, approved corpus reference only
- Output: deterministic summary JSON artifact under explicit state directory
- Claimed effect: `inspection_only` only when verification succeeds; otherwise `none`

## Sole-owner boundaries

- `CapabilityRegistry` owns registration records and registration events.
- `ExecutionCoordinator` owns capability request admission, rejected-admission evidence, linked M2 validation, attempt lifecycle state transitions, timeout/cancellation handling, and request idempotency/conflict denial.
- `ArtifactService` owns artifact creation and artifact records.
- `VerificationService` owns verification decisions and verification records.

All records are immutable (`Object.freeze`) and carry:

- Immutable record IDs
- Correlation and optional causation metadata
- Schema version (`m3.v1`)
- Synthetic classification (`synthetic_non_sensitive`)
- Provenance (`local_m3_bounded_capability`)
- ISO timestamps
- Per-record integrity hash

## Durable rejected-admission evidence

Every rejected admission appends an immutable `CapabilityRequestRejected` event before throwing. Rejection events include:

- capability request ID
- correlation ID
- command ID
- rejection category
- minimized payload summary
- denied command result (`accepted: false`, `status: denied`)

Rejected admissions never create an admitted capability-request record, successful attempt, artifact, or verification success.

## Fixture boundary and provider boundary

- Approved fixture root is explicit and local.
- Approved corpus reference is fixed: `default_synthetic_corpus_v1`.
- Traversal, URL-like references, missing corpus, invalid limits, and secret-like fixture values are rejected before provider invocation.
- Provider uses Node built-ins only, reads approved files only, performs deterministic summary reduction, and cannot perform network/model/shell/child-process/database behavior.

## Attempt state model

Execution attempts are represented with immutable records and events across these states:

- `created`
- `running`
- `succeeded`
- `failed`
- `cancelled`
- `timed_out`

Rules enforced:

- Cancellation and timeout terminate with no accepted success artifact/effect.
- Request-ID duplicates with identical payload are idempotent.
- Conflicting request-ID reuse is denied and audited without replacing original disposition.

## Artifact and verification integrity

- Artifact files are written only inside `<stateDir>/m3-artifacts`.
- Artifact records include immutable linkage to request, attempt, decision, transaction, and correlation.
- Artifact content hash is persisted and later rechecked.
- Verification validates:
  - Artifact schema shape
  - Item count consistency
  - Input manifest hash
  - Artifact content hash
  - Provider identity/version
  - Path boundary under explicit state directory
  - Metadata linkage consistency
- Any tampering causes verification rejection and prevents success claims.

## Reconstruction and traceability

- M3 events are durable in append-only `m3-event-journal.jsonl` with hash-chain integrity.
- `reconstructM3Trace(stateDirectory, correlationId)` rebuilds request/attempt/artifact/verification trace by correlation.
- CLI supports:
  - run: executes allowed fixture through M2 then M3
  - reconstruct: rebuilds M3 trace by correlation

## Test evidence

`test/m3-bounded-capability.test.ts` covers:

- allowed path produces verified artifact
- denied and approval-required paths never invoke provider
- durable rejected-admission events for malformed, M2-reference, capability/provider, limit, and corpus-boundary categories
- traversal/url-like/secret-like/missing/invalid corpus admission rejection
- duplicate + conflicting request-ID handling
- cancellation and timeout behavior
- manifest mismatch and artifact tampering rejection
- restart/replay reconstruction by correlation ID

Existing constraints remain covered:

- no network or external client import policy
- write operations constrained to explicit state directory paths

## Explicit non-goals

- No external network, model provider, shell command execution, child process, or external API.
- No real authentication, production database, or live operational side effect.
- No capability beyond `inspect_synthetic_corpus_summary`.
