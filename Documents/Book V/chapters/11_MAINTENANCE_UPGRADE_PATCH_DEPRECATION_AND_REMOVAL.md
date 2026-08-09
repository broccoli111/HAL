# Chapter 11 — Maintenance, Upgrade, Patch, Deprecation, and Removal

**Status:** FINAL  
**Responsible role:** Service Owner  
**Owner Review items:** None

## Purpose
Perform maintenance and lifecycle change through risk classification, compatibility, verification, and rollback.

## Scope
This chapter applies across development, test, staging, recovery, degraded environments, and every declared live-effect environment and approved Reality Boundary stage when the described operational condition exists.

## Authority and prerequisites
Books I-IV, IX, and X govern. Book VIII controls verification and certification. Book VI controls the continuing security, privacy, and trust program after reconciliation. Required prerequisites are authenticated operator identity, explicit Authority, exact target identification, an approved change or incident record, current certification, evidence capture, and a tested containment or recovery path.

## Normative controls

### OPS-MNT-11-01 — Maintenance

Maintenance MUST declare affected components, contracts, state, certificates, dependencies, observation windows, and rollback or forward-recovery plan.

**Applicability:** Maintenance, Upgrade, Patch, Deprecation, and Removal. **Responsible:** Service Owner. **Enforcement:** procedure gate, policy check, monitoring, and independent evidence review. **Evidence:** signed operation record, correlated telemetry, decision log, verification result, and exception record where applicable. **Severity:** High. **Exception authority:** Operations Manager with Security and Assurance concurrence; higher-order requirements are not waivable. **Verification:** precondition test, negative-path exercise, runtime evidence, and independent closure review.

### OPS-MNT-11-02 — Patches

Patches MUST pass risk-proportionate verification and current security disposition before admission to the declared live-effect environment and approved Reality Boundary stage.

**Applicability:** Maintenance, Upgrade, Patch, Deprecation, and Removal. **Responsible:** Service Owner. **Enforcement:** procedure gate, policy check, monitoring, and independent evidence review. **Evidence:** signed operation record, correlated telemetry, decision log, verification result, and exception record where applicable. **Severity:** Critical. **Exception authority:** Operations Manager with Security and Assurance concurrence; higher-order requirements are not waivable. **Verification:** precondition test, negative-path exercise, runtime evidence, and independent closure review.

### OPS-MNT-11-03 — Deprecation

Deprecation MUST preserve supported coexistence, consumer notice, migration evidence, removal criteria, and rollback until the approved end date.

**Applicability:** Maintenance, Upgrade, Patch, Deprecation, and Removal. **Responsible:** Service Owner. **Enforcement:** procedure gate, policy check, monitoring, and independent evidence review. **Evidence:** signed operation record, correlated telemetry, decision log, verification result, and exception record where applicable. **Severity:** High. **Exception authority:** Operations Manager with Security and Assurance concurrence; higher-order requirements are not waivable. **Verification:** precondition test, negative-path exercise, runtime evidence, and independent closure review.

### OPS-MNT-11-04 — Removal

Removal MUST verify no authorized consumer, retained evidence, recovery path, Treaty, certificate, or state obligation depends on the target.

**Applicability:** Maintenance, Upgrade, Patch, Deprecation, and Removal. **Responsible:** Service Owner. **Enforcement:** procedure gate, policy check, monitoring, and independent evidence review. **Evidence:** signed operation record, correlated telemetry, decision log, verification result, and exception record where applicable. **Severity:** Critical. **Exception authority:** Operations Manager with Security and Assurance concurrence; higher-order requirements are not waivable. **Verification:** precondition test, negative-path exercise, runtime evidence, and independent closure review.

## Mandatory procedure

1. **Pre-authorize.** Confirm ticket, risk class, acting identity, authority, separation of duties, current certification, approved window, target, and rollback/containment.
2. **Baseline.** Capture health, state versions, queues, capacity, active transactions, Treaties, alerts, evidence integrity, and human-visible conditions.
3. **Validate inputs.** Verify signed artifacts/configuration, Book IX compatibility, dependencies, credentials by reference, privacy classification, and expected state.
4. **Establish safety.** Enable observation, freeze conflicting work, bound blast radius, assign commander and verifier, and announce stop conditions.
5. **Execute.** Perform the approved action one checkpoint at a time; record operator, timestamp, command or contract, target, result, and evidence digest.
6. **Observe.** Compare health, outcomes, invariants, authority decisions, privacy signals, queue behavior, and resource use to approved thresholds.
7. **Decide.** Continue only when success criteria pass and no stop condition fires; otherwise halt, contain, roll back, or enter forward recovery.
8. **Reconcile.** Resolve state, messages, external effects, in-flight transactions, evidence gaps, and temporary access; do not guess ambiguous reality.
9. **Verify.** Run targeted Book VIII verification, contract tests, recovery checks, and independent review appropriate to risk.
10. **Close.** Record final state, limitations, certificate impact, follow-up actions, approvers, evidence manifest, and communication; revoke temporary authority.

## Stop conditions

Stop immediately on identity or authority uncertainty, certificate suspension/revocation/expiry, source or target mismatch, integrity failure, unapproved Treaty or Firewall rejection, unexpected protected-state mutation, unbounded queue/resource growth, privacy exposure, ambiguous external effect, failed invariant, or loss of evidence capture.

## Rollback, forward recovery, and escalation

Use rollback only when its preconditions are proven and it cannot repeat or hide a committed Reality Boundary effect. Otherwise contain, preserve evidence, reconcile actual state, and use the approved forward-recovery path. Escalate Critical conditions immediately to the Incident Commander, Security Incident Commander, Certification Authority, and constitutional steward as applicable.

## Evidence and completion criteria

Completion requires reconciled authoritative state and external effects, satisfied health and outcome gates, closed temporary access, current certification disposition, retained evidence manifest, independent verifier approval, communication to affected Principals, humans, and stakeholders when material, and recorded follow-up ownership.

## Examples and anti-patterns

**Example:** the operator halts a rollout when authority-decision latency rises and evidence gaps appear, preserves the canary, and requests targeted reverification. **Anti-pattern:** declaring success because processes are live while certification is suspended or state remains unreconciled.

## Traceability and review

Constitutional, architecture, engineering, interface, verification, semantic, security/privacy/trust, reliability, and practicability reviews: PASS after final Books VI, VIII, and IX reconciliation. This chapter does not redefine components, contracts, certification authority, or canonical meaning.
