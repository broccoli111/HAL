# M5 Readiness and Assurance Design

**Status:** Proposed design only (not an implementation-complete declaration)  
**Scope baseline:** HAL v0.1 M0-M4 local-only slice in `implementation/hal-core`  
**Authority model:** Book I supremacy; Books V, VI, VII, VIII, IX, and X constrain operations, security/privacy/trust, governance, assurance, machine contracts, and terminology

## 1) Purpose and hard boundary

M5 defines how readiness is assessed for the completed M0-M4 slice. M5 does not grant execution authority, policy expansion, capability expansion, Treaty admission, or Reality Boundary advancement.

Hard boundary for this design package:

- M5 is an assurance and decision-support package only.
- The current operating scope remains local-only, synthetic-data-only, and non-live-effect.
- No new runtime behavior, providers, integrations, authentication systems, databases, or external-effect paths are admitted by this document.
- Any future Reality Boundary advancement requires a separate explicit Owner decision and a separately scoped proposal with its own verification and certification evidence.

## 2) Assurance-case structure

M5 assurance is organized as a structured case with explicit claims, assumptions, evidence, limits, and confidence, with traceability to Books I, V, VI, VII, VIII, IX, and X.

### 2.1 Top claim

**C0:** The implemented M0-M4 local-only slice is sufficiently evidenced to support an Owner readiness decision for continued local-only operation and for considering whether a separate next-boundary proposal should be drafted.

### 2.2 Subclaims

- **C1 (Constitutional and authority restraint):** Current behavior remains within declared local-only, non-live-effect limits and does not infer authority from trust, credentials, transport, or implementation success.
- **C2 (Evidence and integrity):** Durable records and reconstructions are auditable, append-only, integrity-checked, and fail closed on tamper or uncertainty.
- **C3 (Operational readiness at declared scope):** Local runbook procedures for startup, demo execution, reconstruction, and incident handling are defined and testable for the M0-M4 slice.
- **C4 (Security/privacy/trust baseline):** Security, privacy, and trust controls are evidenced for the declared non-live synthetic scope, with explicit residual gaps and remediation obligations.
- **C5 (Decision governance):** Readiness outcomes, conditions, expiry, and appeals are explicit and attributable to designated Owner authority.

### 2.3 Assumptions

- The scope remains the v0.1 local synthetic baseline described in `docs/implementation program/HAL_V0_1_FOUNDATION_PLAN.md`.
- Independent reviewers can access local evidence artifacts read-only.
- No hidden runtime paths bypass the authoritative journals and verification boundaries.
- Any existing exceptions are explicit, bounded, and recorded.

### 2.4 Evidence classes (must remain distinct)

- **Implementation evidence:** code, tests, scripts, implementation records, deterministic local run outputs.
- **Independent verification evidence:** evidence produced by a reviewer distinct from implementation authorship, using reproducible procedures.
- **Owner decision evidence:** explicit decision record documenting outcome, scope, residual risk treatment, validity window, and references.

No one class substitutes for another. Self-authored implementation documentation alone is not independent certification.

### 2.5 Limitations and open-risk framing

- Assurance is bounded to local-only synthetic operation.
- No claim is made for external integrations, real credentials, real identity assurance systems, production data handling, or live-effect commit barriers.
- Backup/restore is required as a readiness control but not yet implemented in the current runtime slice.
- Confidence level must be scoped to what was independently verified and time-bounded by evidence freshness.

## 3) M0-M4 evidence inventory (exact artifacts)

This inventory defines the minimum evidence set M5 must assemble and verify.

### 3.1 Source/control baseline (M0)

- `implementation/hal-core/docs/M0_EXIT_DECISION.md`
- `implementation/hal-core/docs/SOURCE_CONTROL_MANIFEST.md`
- `implementation/hal-core/package.json`
- `implementation/hal-core/.github/workflows/ci.yml`
- `implementation/hal-core/scripts/generate-source-manifest.mjs`

Expected evidence outcomes:

- Manifest integrity and source traceability are present.
- Required local checks are defined (`format:check`, `lint`, `typecheck`, `test`, `security:scan`).

### 3.2 Core admission and Safe Mode (M1)

- `implementation/hal-core/docs/M1_IMPLEMENTATION_RECORD.md`
- `implementation/hal-core/src/kernel/m1CoreDemo.ts`
- `implementation/hal-core/src/authority/localPolicy.ts`
- `implementation/hal-core/src/cli/m1DemoCli.ts`
- `implementation/hal-core/test/m1-demo.test.ts`
- `implementation/hal-core/test/no-network-imports.test.ts`

Expected evidence outcomes:

- Deterministic admission behavior (`allow`, `deny`, `approval_required`) with explicit no-effect boundaries.
- Safe Mode restrictive behavior and fail-closed paths are evidenced.

### 3.3 Durable governed intent and journal integrity (M2)

- `implementation/hal-core/docs/M2_IMPLEMENTATION_RECORD.md`
- `implementation/hal-core/src/m2/journal.ts`
- `implementation/hal-core/src/m2/auditService.ts`
- `implementation/hal-core/src/m2/orchestrator.ts`
- `implementation/hal-core/test/m2-durable-intent.test.ts`

Primary journal:

- `<state-dir>/m2-event-journal.jsonl`

Expected evidence outcomes:

- Append-only durable event model with chain integrity hash enforcement.
- Idempotency, conflict denial, reconstruction, and tamper fail-closed behavior are reproducible.

### 3.4 Bounded capability admission, cancellation, timeout, and verification (M3)

- `implementation/hal-core/docs/M3_IMPLEMENTATION_RECORD.md`
- `implementation/hal-core/src/m3/executionCoordinator.ts`
- `implementation/hal-core/src/m3/capabilityRegistry.ts`
- `implementation/hal-core/src/m3/verificationService.ts`
- `implementation/hal-core/src/m3/artifactService.ts`
- `implementation/hal-core/src/m3/orchestrator.ts`
- `implementation/hal-core/src/cli/m3DemoCli.ts`
- `implementation/hal-core/test/m3-bounded-capability.test.ts`
- `implementation/hal-core/fixtures/synthetic-corpus/`

Primary journals and artifacts:

- `<state-dir>/m3-event-journal.jsonl`
- `<state-dir>/m3-artifacts/`

Expected evidence outcomes:

- Single admitted capability boundary is enforced.
- Rejected admissions are durably recorded.
- Cancellation/timeout/verification rejection produce truthful no-effect records.

### 3.5 M4 outcome attestation, recovery, explanation, reconstruction (M4)

- `implementation/hal-core/docs/M4_IMPLEMENTATION_RECORD.md`
- `implementation/hal-core/docs/M4_VERIFIED_OUTCOME_DESIGN.md`
- `implementation/hal-core/src/m4/outcomeAttestationService.ts`
- `implementation/hal-core/src/m4/recoveryCoordinator.ts`
- `implementation/hal-core/src/m4/explanationService.ts`
- `implementation/hal-core/src/m4/orchestrator.ts`
- `implementation/hal-core/src/cli/m4DemoCli.ts`
- `implementation/hal-core/test/m4-verified-outcome.test.ts`

Primary journal:

- `<state-dir>/m4-event-journal.jsonl`

Expected evidence outcomes:

- Final outcome attestation depends on validated M2+M3 evidence linkage.
- Reconstruction fails closed to unavailable when integrity/linkage checks fail.
- Recovery cases and bounded explanations are preserved without inventing success.

### 3.6 Baseline verification command evidence

Required command set from `implementation/hal-core`:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run security:scan`

Command outputs and timestamps must be preserved in the M5 evidence package.

## 4) Verification and certification plan

### 4.1 Independent reviewer role and limits

Reviewer responsibilities:

- Reproduce baseline checks and M2-M4 reconstruction using declared procedures.
- Validate evidence integrity and chain-of-custody metadata.
- Confirm fail-closed behavior for negative and tamper scenarios.

Independence limits:

- For this local repository context, reviewer independence may be operationally constrained; the record must explicitly state any overlap with implementer roles.
- If reviewer and implementer overlap exists, certification confidence is limited and must be called out as a conditional weakness.

### 4.2 Reproducible procedure

Minimum reproducible sequence:

1. Use a clean working tree and controlled local state directory.
2. Run baseline checks (`format:check`, `lint`, `typecheck`, `test`, `security:scan`).
3. Run M2/M3/M4 demo flows and capture correlation IDs.
4. Run reconstruction commands for each captured correlation ID.
5. Perform negative-path and tamper-path tests.
6. Archive outputs, state snapshots, and hashes into the M5 evidence package.

### 4.3 Required negative-path and boundary tests

At minimum:

- admission denial paths;
- idempotency replay and conflict denial;
- cancellation and timeout paths;
- artifact and journal tamper paths;
- missing-evidence and linkage-mismatch paths;
- recovery-case creation and no-effect truthfulness;
- reconstruction fail-closed behavior;
- no-network/no-external-effect boundary checks.

### 4.4 Pass/fail criteria

Pass requires all of the following:

- All baseline checks pass.
- Required M0-M4 evidence artifacts exist and are internally consistent.
- Independent reproduction succeeds for declared positive and negative paths.
- No critical unresolved integrity, authority, or boundary violation remains open.
- Any non-critical residual risks are explicitly bounded, owned, and dated.

Fail if any critical condition above is not met.

### 4.5 Evidence retention requirements

The M5 package must retain:

- command transcripts and timestamps;
- exact code/document versions under review;
- journal and artifact hashes;
- reviewer findings and dispositions;
- decision records, conditions, and expiry dates.

Retention metadata must include classification, access scope, and supersession handling.

## 5) Operations readiness and runbook requirements

M5 requires a bounded runbook for local-only operation:

- startup and preflight checks;
- controlled demo execution;
- status and reconstruction procedure;
- incident detection, containment, and recovery escalation;
- backup/restore drill procedure (design requirement even if runtime backup is not yet implemented);
- evidence preservation and chain-of-custody handling;
- controlled shutdown and post-run verification.

Current explicit limitations (must be restated in every readiness decision):

- local journals and local state directories only;
- synthetic corpus only;
- no real authentication implementation;
- no backup implementation yet;
- no external effect execution.

Required preconditions before any controlled-reality consideration (without authorizing it):

- explicit remediation plan for backup/restore implementation and tested drills;
- expanded independent verification package for any proposed boundary change;
- scoped risk and control impact assessment under Books V, VI, VIII;
- separate Owner decision to authorize drafting of a next-boundary proposal.

## 6) Security, privacy, and trust control evidence

M5 must verify evidence for:

- no ambient secrets as authority and no outbound network behavior in admitted code paths;
- data classification and minimization consistent with synthetic non-sensitive scope;
- journal and artifact integrity controls and tamper detection behavior;
- local state-directory write boundaries and path controls;
- dependency/security scan results and remediations.

Explicit gaps and remediation obligations:

- lack of implemented backup/restore is a declared readiness gap for any broader operational posture;
- local-only assumptions must be revalidated before any boundary proposal;
- reviewer-independence limitations (if present) require explicit mitigation before stronger certification claims.

## 7) Formal Owner decision model

### 7.1 Allowed outcomes

- `not_ready`
- `ready_to_remain_local_only`
- `ready_for_scoped_next-boundary_proposal`

### 7.2 Outcome semantics

- `not_ready`: readiness evidence is insufficient or critical issues remain.
- `ready_to_remain_local_only`: current M0-M4 local-only operation is accepted with recorded limits and review date.
- `ready_for_scoped_next-boundary_proposal`: authorizes drafting a separate boundary-advancement proposal only.

`ready_for_scoped_next-boundary_proposal` is not approval for controlled reality, live effects, new providers, or expanded authority.

### 7.3 Required decision inputs

- full M5 assurance package and independent reviewer report;
- open-risk register with owner, severity, mitigation, and due date;
- exceptions and residual-risk acceptance records (if any);
- operations/runbook readiness evidence;
- security/privacy/trust control evidence package.

### 7.4 Unresolved-risk treatment

- critical unresolved risks require `not_ready`;
- high residual risks require explicit bounded conditions and review deadlines;
- all accepted residual risks require owner attribution and sunset date.

### 7.5 Expiry and review

Every readiness decision must include:

- effective date;
- expiry/review date;
- triggering conditions for early re-review (incident, drift, control failure, or scope change).

### 7.6 Audit and evidence references

Decision records must reference exact evidence artifact identifiers, journal snapshots/hashes, reviewer findings, and applicable canon sources.

## 8) M5 acceptance criteria (objective checklist)

The following checklist defines readiness for future M5 implementation and review. Completion of this checklist is required before recording any certification or readiness conclusion.

- [ ] M5 scope statement confirms design-only package and no runtime/authority expansion.
- [ ] Hard boundary statement confirms local-only, synthetic-only, non-live-effect state.
- [ ] Assurance case includes claims, subclaims, assumptions, evidence, limitations, open risks, and confidence.
- [ ] Traceability to Books I, V, VI, VII, VIII, IX, and X is explicit.
- [ ] Evidence classes are separated: implementation vs independent verification vs Owner decision.
- [ ] M0-M4 evidence inventory is complete with exact files, tests, scripts, and journals.
- [ ] Reproducible verification procedure is documented and executable.
- [ ] Negative-path/tamper/replay/recovery/boundary tests are defined with pass/fail criteria.
- [ ] Evidence-retention requirements and chain-of-custody expectations are explicit.
- [ ] Operations runbook requirements are defined for startup, operation, reconstruction, incident/recovery, backup/restore drill, evidence preservation, and shutdown.
- [ ] Security/privacy/trust controls and gaps are documented with remediation expectations.
- [ ] Owner decision model is explicit with allowed outcomes, inputs, unresolved-risk treatment, and expiry.
- [ ] Decision language states that `ready_for_scoped_next-boundary_proposal` is proposal-authorizing only, not boundary approval.
- [ ] No certification or readiness conclusion is recorded unless independent review evidence and an explicit Owner decision are both present.

## 9) Non-goals and prohibited interpretations

- This document is not a certification decision.
- This document is not an authority grant.
- This document does not declare M5 complete.
- This document does not authorize controlled reality, live effects, or any expanded runtime scope.
