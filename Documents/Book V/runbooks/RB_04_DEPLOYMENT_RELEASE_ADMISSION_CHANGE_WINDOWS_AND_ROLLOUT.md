# RB-04 — Deployment, Release Admission, Change Windows, and Rollout Runbook

**Owner:** Release Manager  
**Severity ceiling:** Critical  
**Status:** FINAL

## Trigger and prerequisites
Admit only signed, compatible, certified artifacts and execute bounded progressive delivery. Trigger only from an approved change, scheduled operation, alert, or declared incident. Preconditions: named commander, authenticated identities, explicit authority, current certification, evidence capture, safe rollback or containment, and verified target.

## Ordered actions

1. **Pre-authorize:** Confirm ticket, risk class, acting identity, authority, separation of duties, current certification, approved window, target, and rollback/containment.
2. **Baseline:** Capture health, state versions, queues, capacity, active transactions, Treaties, alerts, evidence integrity, and human-visible conditions.
3. **Validate inputs:** Verify signed artifacts/configuration, Book IX compatibility, dependencies, credentials by reference, privacy classification, and expected state.
4. **Establish safety:** Enable observation, freeze conflicting work, bound blast radius, assign commander and verifier, and announce stop conditions.
5. **Execute:** Perform the approved action one checkpoint at a time; record operator, timestamp, command or contract, target, result, and evidence digest.
6. **Observe:** Compare health, outcomes, invariants, authority decisions, privacy signals, queue behavior, and resource use to approved thresholds.
7. **Decide:** Continue only when success criteria pass and no stop condition fires; otherwise halt, contain, roll back, or enter forward recovery.
8. **Reconcile:** Resolve state, messages, external effects, in-flight transactions, evidence gaps, and temporary access; do not guess ambiguous reality.
9. **Verify:** Run targeted Book VIII verification, contract tests, recovery checks, and independent review appropriate to risk.
10. **Close:** Record final state, limitations, certificate impact, follow-up actions, approvers, evidence manifest, and communication; revoke temporary authority.

## Decision points

- If any stop condition is true: halt, contain, preserve evidence, and escalate.
- If a Reality Boundary result is ambiguous: prohibit retry until reconciliation proves actual state.
- If a certificate is suspended, revoked, expired, or unverifiable: deny protected reliance and enter the approved degraded or shutdown mode.
- If successful: obtain independent verification, close temporary access, update records, and communicate the final state.

## Evidence

Operation record, approvals, identity and authority decisions, before/after state, invoked IX-C contracts, telemetry, errors, incident/change linkage, verification results, certificate disposition, and evidence manifest.

## Completion

All effects and state reconciled; health and invariants pass; evidence retained; certification current; follow-ups assigned; commander and verifier sign-off recorded.