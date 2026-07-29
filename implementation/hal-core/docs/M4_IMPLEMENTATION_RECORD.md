# M4 Implementation Record - Verified Outcome and Recovery Proof

## Scope

M4 adds final local outcome attestation over the existing M2 and M3 evidence chain:

`M2 intent -> plan -> decision -> transaction -> M3 request -> attempt -> artifact -> verification -> M4 attestation`

M4 introduces no new capability, model, external provider, database, real authentication path, network behavior, or live effect.

## Sole-owner M4 services

- `OutcomeAttestationService` owns final outcome attestation records and derivation rules.
- `RecoveryCoordinator` owns recovery-case records for integrity/evidence failure posture.
- `ExplanationService` owns bounded local explanation records.

All records are immutable and include:

- immutable IDs
- correlation/causation metadata
- schema version (`m4.v1`)
- synthetic classification (`synthetic_non_sensitive`)
- provenance (`local_m4_verified_outcome`)
- timestamp
- integrity hash

## Terminal outcome states

M4 enforces these terminal states:

- `achieved_without_effect`
- `blocked`
- `failed_no_effect`
- `cancelled_no_effect`
- `timed_out_no_effect`
- `verification_rejected_no_effect`
- `incomplete_evidence_no_effect`

No caller-provided status is accepted as truth. Status is derived from validated M2/M3 evidence.

## Final attestation rules

`achieved_without_effect` requires all of:

- M2 decision is `allow`
- linked M2 transaction exists and links consistently to intent/plan/decision
- M3 succeeded attempt exists for same correlation chain
- attestation request capability identity exactly matches selected M3 capability request capability identity
- selected M3 execution attempt capability-request linkage exactly matches selected M3 capability request ID
- linked artifact record exists
- linked verification record exists with `verified === true`
- linkage IDs match across M2/M3
- M2 and M3 journal integrity validation succeeds
- artifact content hash consistency checks succeed

Any missing/tampered/contradictory evidence fails closed to no-effect outcomes.

## Recovery posture

M4 creates recovery cases for integrity/evidence failures, including:

- M2 journal integrity failure
- M3 journal integrity failure
- missing evidence
- evidence linkage mismatch
- verification rejection
- artifact integrity failure

Recovery case restrictions:

- preserve evidence references
- preserve correlation and failure category
- allow reconstruction and explanation only
- no silent M3 rerun
- no history rewrite

## Cross-journal reconstruction

`reconstructM4Trace(stateDirectory, correlationId)` verifies and reconstructs from:

- M2 journal
- M3 journal
- M4 journal

It validates journal-chain readability before trusting trace fields, enforces bounded summary output, and avoids fixture content/path disclosure.

Reconstruction is fail-closed:

- if any M2, M3, or M4 journal integrity validation fails, reconstructed outcome/effect are returned as `unavailable`;
- bounded reconstruction summary is marked restricted/untrusted and still states `externalEffect=none`;
- reconstruction independently validates cross-journal linkage (M2 IDs, M3 request/attempt/artifact/verification linkage, capability identity, and M4 attestation references) before accepting reconstructed attestation status/effect.

## Explanation boundary

M4 explanation includes:

- requested capability
- final outcome and claimed effect
- whether M3 attempt ran
- decision and verification result
- attestation/evidence identifiers
- explicit no-external-effect statement
- recovery restriction when applicable

It redacts path-like separators and does not include fixture contents.

## Evidence and tests

`test/m4-verified-outcome.test.ts` verifies:

- exactly one achieved attestation for verified success
- blocked mapping for deny and approval-required flows
- truthful mapping for cancelled/timed-out/failed attempts
- fail-closed + recovery-case creation for tampered journals, tampered artifact/verification rejection, and missing evidence
- final-attestation request idempotency and conflict denial/audit
- fresh-process cross-journal reconstruction
- bounded/redacted explanation output

Existing no-network and write-boundary tests remain in place and were updated for M4 journals/demo writes.

## Traceability

- Book I: explicit layered work state and evidence-based recovery with uncertainty.
- Book II/IV: single-owner durable mutation, verification gates, recovery admission, and auditable state transitions.
- Book VI/VIII: fail-closed posture, integrity-preserving evidence handling, reconstructability, independent verification discipline.
- Book IX: correlation/causation/idempotency/metadata semantics preserved in command-event records.
- Book X: intent/plan/outcome distinctions and outcome evaluation semantics preserved.

## Explicit non-goals

- No external live-effect action.
- No policy/authority expansion beyond local bounded scope.
- No treaty/federation behavior.
- No autonomous replay of protected work as part of recovery.
