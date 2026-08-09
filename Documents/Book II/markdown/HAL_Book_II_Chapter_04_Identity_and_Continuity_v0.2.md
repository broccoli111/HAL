## Chapter 4 — Identity and Continuity

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | Universal identity, authentication, delegation, health, quarantine, privacy scope, and lifecycle |
| Constitutional basis | Decisions 6, 19, 25, 27, 29, 32, 39, 45, 47–49, and 51 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

This chapter specifies how HAL establishes who is involved in every interaction without confusing identity, authentication, trust, authority, ownership, or relationship. Identity is durable and universal: people, devices, services, nodes, providers, Presences, agents, sensors, and HAL subsystems all have identities. Authentication evaluates the present session; delegation grants bounded authority; trust evaluates credibility; none automatically substitutes for another.

## 2. Identity Model

| Concept | Definition | May change? |
| --- | --- | --- |
| Identity | A stable, immutable principal identifier with type, public-key material, lifecycle state, and audit lineage. | No; display and metadata may evolve. |
| Authentication session | Current evidence that a live actor controls or represents an identity. | Yes; confidence and factors expire or degrade. |
| Authority | Permission to perform a defined action in a defined scope. | Only through policy, ownership, or delegation. |
| Trust | Domain-specific assessment of credibility or reliability. | Yes; evidence-driven and independent of authority. |
| Ownership | Constitutional or administrative responsibility for an identity. | Only through governed transfer or lifecycle procedure. |
| Presence | A contextual embodiment through which an identity interacts. | Yes; a Presence never becomes the identity. |

## 3. Identity Record and Lifecycle

The Identity Service is the authoritative owner of Identity Records. Each record contains immutable identifier, principal type, owner relationship, public-key or credential references, lifecycle state, authorization bindings, privacy scope, provenance, and audit references. Mutable aliases and display names are versioned metadata and never determine constitutional authority.

| Lifecycle state | Meaning | Permitted posture |
| --- | --- | --- |
| Proposed | Identity observed or requested but not admitted. | No authority; evidence collection only. |
| Registered | Identity record exists with minimum provenance. | May authenticate only if policy allows. |
| Verified | Identity proof and required integrity checks pass. | Eligible for explicitly granted authority. |
| Active | Identity is current, healthy enough, and usable. | Normal scoped operation. |
| Degraded | Health or authentication confidence has fallen. | Reduced disclosure and policy-defined step-up. |
| Quarantined | Compromise, anomaly, or integrity concern requires containment. | No new protected work; forensic evidence and recovery only. |
| Retired | Identity is no longer active but history remains. | No authentication or authority; audit and recovery reference retained. |

## 4. Authentication and Session Confidence

Authentication is continuous, evidence-based, and context-sensitive. Sessions contain issued time, expiry, participant identity, factor evidence class, liveness evidence, device and network context, assurance level, and current confidence. A session is not a standing authorization grant. Sensitive actions independently invoke current policy and, where required, step-up or Owner Authorization Ceremony verification.

- Authentication evidence MAY include passkeys, security keys, signed device assertions, biometrics, PINs, certificates, network context, behavior, and approved future liveness signals.

- HAL MUST distinguish identity confidence from authentication confidence. A failed factor does not create a new identity; it reduces confidence in the current session.

- A lower confidence changes disclosure and action eligibility only through explicit policy; it never silently reclassifies the identity or grants a workaround.

- High-risk and protected actions require fresh, independent evidence. Cached conversation context, IP address, voice alone, or historical trust is insufficient.

## 5. Delegation and Attribution

Delegation is an explicit object that preserves origin. It names delegator, recipient, scope, purpose, conditions, expiration, revocation path, allowed delegation depth, and audit references. Every delegated action records both the executing identity and the delegating chain. HAL never claims delegated actions as its own.

| Control | Requirement |
| --- | --- |
| Scope | Capability- and resource-specific; no implicit role expansion. |
| Duration | Time, task completion, number of uses, or explicit revocation; expiry is enforced at invocation. |
| Depth | Bounded delegation chain; each link preserves the origin and cannot broaden scope. |
| Revocation | Immediate durable revocation takes precedence over cached envelopes. |
| Attribution | Commands, transactions, results, and audit records carry executor and delegation chain. |
| Protected boundaries | Constitutional Owner powers, protected recovery, constitutional amendments, and other protected actions remain non-delegable unless Book I explicitly permits the governed procedure. |

## 6. Identity Health, Quarantine, and Recovery

Identity health is an evidence-based security assessment, separate from identity itself. Indicators include credential compromise, certificate expiry, impossible travel, device cloning, replay evidence, voice mismatch, repeated failures, unexpected hardware, and integrity drift. A health concern can trigger disclosure reduction, factor step-up, authority suspension, or quarantine according to policy.

- Quarantine preserves the identity record, evidence, and history; it restricts credentials, execution envelopes, and new work.

- No identity may self-release from quarantine. Recovery verifies identity, integrity, policy, evidence, and required Owner authority before gradual re-admission.

- Protected identities, including the Owner, use the Owner Authorization Ceremony and recovery policies; HAL may contain risk but cannot silently demote, replace, or restore constitutional authority.

- Compromise does not propagate upward through ownership. A compromised phone, node, or Presence does not become a compromised Owner identity by assumption.

## 7. Privacy, Relationship, and Presence Scope

Human identities may have personal, shared, or delegated visibility scopes. Relationship, trust, and household membership are not authority grants. Presence context—room, device, audience, sensor state, and privacy characteristics—can influence safe disclosure but never proves identity or creates permission. The Identity Service supplies identity and scope facts; the Policy System determines whether an exchange is allowed.

## 8. Continuity and Federation

HAL’s identity remains one constitutional identity across Presences and governed nodes. A node, mobile device, external provider, or federated HAL is a separate identity and trust domain. Federation shares only Treaty-authorized information and capability use; it never merges constitutional ownership, private memory, or authority by default. The Constitutional Mirror binds the current identity, Owner authority, constitutional lineage, and active continuity state for recovery and migration.

## 9. Interfaces

| Interface | Semantics |
| --- | --- |
| Identity query | Returns identity facts, lifecycle state, ownership, and permitted non-secret metadata. |
| Authenticate / refresh session | Accepts evidence; returns assurance, expiry, limitations, and audit reference. |
| Evaluate delegation | Checks current scope, conditions, revocation, chain depth, and policy. |
| Issue execution envelope | Produces a short-lived, non-transferable delegation binding for one capability invocation or transaction. |
| Report identity evidence | Adds health, compromise, integrity, or recovery evidence without changing authority directly. |
| Quarantine / recover identity | Policy-governed state transition requiring required evidence and protected authorization. |

## 10. Guarantees

- Every meaningful request, action, and result MUST be attributable to a verified or explicitly uncertain identity context.

- Identity, authentication, trust, authority, and ownership MUST remain independent dimensions.

- Authority MUST flow through explicit policy or delegation, never relationship, proximity, provider capability, or local network location.

- Delegated authority MUST be scoped, attributable, revocable, and time-bounded.

- Quarantine and recovery MUST preserve evidence and MUST NOT permit self-release.

- HAL MUST preserve one constitutional identity even while interfaces, devices, services, and hosts change.

## 11. Constitutional Traceability Audit

| Constitutional decisions | Chapter 4 implementation coverage |
| --- | --- |
| 6, 19, 25 | Immutable identity, node identity/lifecycle, policy-governed evaluation and mutation. |
| 27, 29, 32 | Universal identities, continuous authentication, delegation, identity quarantine, secure communication. |
| 39, 45, 47 | Scoped secrets and credentials, one identity across Presences, secure node identity and distributed continuity. |
| 48–49, 51 | Single Owner, explicit delegation, sovereign trust domains, Treaty boundaries, Self Model and Constitutional Mirror. |

## 12. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None identified. Separation of identity, authentication, trust, authority, and ownership is preserved. |
| Security posture | Continuous authentication, scoped delegation, quarantine, and recovery are explicit. |
| Privacy posture | Presence and relationship context influence disclosure only through policy. |
| Owner review required | None. This chapter implements already locked identity and delegation rules. |

## 13. Completion Status

Chapter 4 is complete. Chapter 5 will specify the Authority and Delegation enforcement model, including policy evaluation and protected authorization paths that consume the identity facts defined here.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.

- No substantive constitutional or cross-chapter correction was required in this edition.
