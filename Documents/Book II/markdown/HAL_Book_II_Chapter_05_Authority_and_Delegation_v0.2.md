## Chapter 5 — Authority and Delegation

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | Authority sources, policy evaluation, delegation enforcement, protected actions, and audit |
| Constitutional basis | Decisions 5, 9–10, 16, 21, 25, 27, 31–33, 35–36, 39, 46, 48–50, and 58 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

Authority answers one question only: “Who is permitted to cause this effect, in this context, now?” This chapter defines a policy-governed authorization system that consumes identity, authentication, delegation, context, evidence, and transaction facts. Trust, capability, relationship, ownership, and authentication may inform evaluation, but none automatically grants permission.

## 2. Authority Sources and Precedence

| Source | Meaning | Limit |
| --- | --- | --- |
| Constitutional Owner | The sole holder of constitutional authority. | Protected actions still require policy and, where required, the Owner Authorization Ceremony. |
| Constitutional invariant | A non-ordinary constraint on what HAL may become or permit. | Cannot be bypassed by role, delegation, urgency, or provider capability. |
| Policy grant | A rule-defined authorization under declared conditions. | Must be current, deterministic, and auditable. |
| Delegation object | A bounded grant from an authorized delegator to a recipient. | Cannot exceed, outlive, or broaden its source authority. |
| Transaction authorization | A short-lived authorization to execute one validated effect. | Bound to exact scope, policy version, delegation chain, and commit rules. |
| Emergency procedure | A policy-defined exceptional path. | Never removes identity, audit, evidence, or post-incident accountability. |

## 3. Authorization Decision Model

The Authority Service evaluates a structured Authorization Request. It returns Allow, Deny, Require Step-Up, Require Owner Ceremony, Require Verification, Defer, or Escalate. A decision is an immutable Policy Decision Record, not an undocumented boolean.

| Required input | Purpose |
| --- | --- |
| Actor and session | Establish current identity and authentication assurance. |
| Requested effect | Names target, operation, resource, data classification, side effects, and blast radius. |
| Intent and transaction context | Links the effect to approved purpose, plan, correlation, and recovery contract. |
| Delegation chain | Proves source authority, scope, purpose, conditions, depth, expiry, and revocation state. |
| Policy and constitutional context | Pins policy version, invariant state, operating mode, Treaty, and applicable constraints. |
| Evidence and verification state | Supplies freshness, risk evidence, required tests, and uncertainty. |
| Environment and time | Supplies approved contextual facts; neither network location nor relationship substitutes for permission. |

## 4. Evaluation Sequence

- Authenticate the actor and validate session freshness, assurance, and liveness requirements.

- Resolve the requested effect to a capability contract, data/resource scope, and risk class.

- Load applicable constitutional invariants and deterministic policy versions; reject an invalid or ambiguous policy set.

- Validate delegation from the originating authority through every link; enforce scope intersection, conditions, expiry, revocation, and depth.

- Evaluate treaty, privacy, environment, resource, transaction, verification, and operating-mode constraints.

- Produce a signed decision record with rationale, constraints, evidence references, expiry, and any required step-up or ceremony.

- For allowed execution, issue a narrowly scoped, short-lived, non-transferable execution envelope; re-evaluate at commit barriers.

## 5. Delegation Enforcement

Delegation is subtractive: each link can only retain or narrow authority received from the previous link. An execution envelope is never a general credential. It can authorize only the specified effect, subject, resource, purpose, time window, conditions, and transaction context.

| Rule | Enforcement |
| --- | --- |
| No ambient authority | Secrets, service identity, hardware possession, or provider integration do not create permission. |
| Scope intersection | The effective authority is the narrowest scope across Owner/policy/delegation/transaction/Treaty constraints. |
| Purpose binding | A grant may be used only for its recorded purpose and approved intent relationship. |
| Fresh revocation | Invocation and commit validate current revocation state; cached envelopes do not survive revocation. |
| Attribution | Records retain originator, executors, every delegation link, policy version, and decision rationale. |
| No silent escalation | A missing grant, uncertain policy, or unavailable evaluator yields defer, deny, or safe restriction—not inferred access. |

## 6. Protected Actions

Protected actions include constitutional amendments, protected policy changes, Owner authority or succession changes, identity recovery, quarantine release, capability-class activation, Treaty activation, cryptographic protected deletion, and changes to trust/authentication requirements. These actions require the Constitutional Kernel, risk-scaled verification, and the Owner Authorization Ceremony when Book I requires it.

- Agreement in ordinary conversation permits proposal preparation but is never a protected execution credential.

- Authorization binds to the exact immutable change object. A material change invalidates prior authorization.

- The safest reversible default applies when evidence, identity, policy, time, or ceremony requirements are incomplete.

- Emergency urgency may change scheduling and notification, never the constitutional proof burden or immutable audit requirement.

## 7. Interfaces and Evidence

| Interface | Result |
| --- | --- |
| Authorize effect | Signed Allow/Deny/Step-Up/Verify/Escalate decision with rationale and expiry. |
| Issue execution envelope | Short-lived scoped envelope bound to decision, actor, transaction, and capability contract. |
| Revoke delegation or envelope | Durable revocation event and immediately effective policy state. |
| Explain decision | Human-appropriate explanation plus forensic references to policy, authority, evidence, and constraints. |
| Audit query | Authorized read of decision chain, approvals, execution results, and outcome evidence. |

## 8. Guarantees

- HAL MUST authorize effects, not identities in the abstract.

- HAL MUST NOT derive authority from trust, relationship, proximity, network location, model confidence, or capability availability.

- Every protected action MUST have a deterministic policy basis, immutable decision record, and required verification and Owner authorization.

- Delegation MUST be explicit, narrowable, revocable, attributable, and bounded by time and conditions.

- Authorization decisions MUST be explainable and reproducible from pinned policy, evidence, and context.

- If authority cannot be established, HAL MUST safely defer, deny, or escalate.

## 9. Constitutional Traceability Audit

| Decisions | Coverage |
| --- | --- |
| 5, 9–10, 16, 21, 25 | Single authority, evidence-based consequential decisions, capability constraints, orchestration, hard policy limits. |
| 27, 31–36, 39 | Authentication, delegated authority, Owner-defined intent, tiered change control, transactions, capabilities, governed secrets. |
| 46, 48–50, 58 | Intent stewardship, sole Owner, sovereignty/Treaties, verification, amendment and authorization ceremony support. |

## 10. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None. Authority remains independent from identity, trust, authentication, and capability. |
| Escalation safety | Explicit evaluation, envelope binding, revocation, and protected action controls are included. |
| Auditability | Every outcome carries pinned policy, evidence, delegation, and transaction references. |
| Owner review required | None. The chapter implements existing constitutional authority rules without changing Owner powers. |

## 11. Completion Status

Chapter 5 is complete. Chapter 6 will specify Intent and Planning Architecture, which provides the purpose and plans that authorization evaluates without granting authority itself.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Protected deletion never removes an Experience Object from the immutable ledger sequence.

- Authorized deletion may cryptographically erase a protected payload and remove non-authoritative copies, caches, indexes, and external replicas.

- A minimal non-sensitive tombstone remains with the authority, time, scope, and proof of deletion.

- Protected deletion requires the Owner Authorization Ceremony. Removal of the event identity or tombstone would require a constitutional amendment.
