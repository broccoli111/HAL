# Chapter 20 — Constitutional Firewall

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Mediate every exchange with an External Trust Domain so collaboration expands capability without transferring constitutional authority or uncontrolled data.

## Authoritative Responsibilities

- **Treaty Manager:** Treaty identity, scope, lifecycle, renewal, revocation and evidence
- **Constitutional Firewall:** Ingress/egress validation, redaction, authorization and audit
- **External Domain Registry:** Domain identity, authentication, capabilities, trust and active Treaties
- **Cross-Domain Monitor:** Exchange health, policy drift, incidents and revocation signals

## Core State and Records

- **Treaty:** Parties, purpose, capabilities, data scope, authentication, privacy, duration, renewal, revocation and audit.
- **Exchange Envelope:** Sender/recipient, Treaty, intent, classification, provenance, authorization, replay protection and expiry.
- **Redaction Decision:** Requested fields, permitted fields, removals, rationale and policy version.
- **Domain Incident:** Violation, affected exchanges, containment, evidence, notification and recovery.

## Runtime Workflow

1. Authenticate the external domain and resolve an active Treaty for the requested purpose.
2. Validate that the capability class was Owner-approved and the specific provider/domain is permitted.
3. Evaluate sender authority, data classification, purpose, requested fields and recipient rights.
4. Minimize/redact egress data and verify ingress provenance, integrity, schema and allowed meaning.
5. Bind the exchange to a transaction or communication object and record audit metadata.
6. Revoke, expire or suspend exchanges immediately when Treaty, identity or integrity conditions fail.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- No Treaty or expired Treaty: deny the exchange; local capability availability is irrelevant.
- Provenance failure: quarantine incoming evidence and prevent state mutation.
- Overbroad data request: redact or deny; never infer consent from prior collaboration.
- External compromise: revoke credentials/Treaty access, preserve evidence and contain affected transactions.

## Constitutional Guarantees

- HAL remains constitutionally sovereign in every federation.
- Cooperation expands capability and never transfers authority.
- Every cross-domain exchange is authenticated, authorized, minimized, provenance-checked and auditable.
- Treaty approval and capability-class approval are distinct protected decisions.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 26–27, 32, 36, 39–40, 48–50. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 26–27, 32, 36, 39–40, 48–50
