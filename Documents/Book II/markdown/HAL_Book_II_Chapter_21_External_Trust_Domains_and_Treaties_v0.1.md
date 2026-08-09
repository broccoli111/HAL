# Chapter 21 — External Trust Domains and Treaties

**Version:** 0.1  
**Status:** Source-aligned; architecture audit passed

## Purpose

Represent external organizations, services, people, and peer HAL systems as separate trust domains whose collaboration is limited by explicit Owner-approved Treaties.

## Authoritative Responsibilities

- **External Domain Registry:** Domain identity, authentication methods, capabilities, trust evidence, incidents, and current status
- **Treaty Manager:** Treaty proposal, protected approval, activation, renewal, suspension, revocation, and history
- **Federation Coordinator:** Bounded cross-domain collaboration and shared-work context
- **Treaty Policy Evaluator:** Purpose, capability, data, duration, privacy, audit, and recipient constraints

## Core State and Records

- **External Trust Domain:** Identity, type, endpoints, authentication, capabilities, trust profile, incidents, and sovereignty boundary.
- **Treaty:** Parties, approved purpose, capabilities, data scope, authentication, privacy, duration, renewal, revocation, and audit.
- **Federation Session:** Treaty, participants, task, delegated authority, exchanged objects, expiration, and outcome.
- **Treaty Review:** Observed use, compliance, incidents, drift, continuing need, and Owner disposition.

## Runtime Workflow

1. Register and authenticate the external domain without inheriting trust from network location or brand.
2. Confirm that the required capability class has already received protected Owner approval.
3. Draft a Treaty with the minimum purpose, capabilities, data, duration, and authority needed.
4. Present the exact Treaty through the Owner Authorization Ceremony; conversational agreement is not activation.
5. Activate federation only after authorization and Constitutional Firewall validation.
6. Continuously monitor use, provenance, disclosure, expiry, drift, and incidents.
7. Renew, narrow, suspend, or revoke through explicit governed lifecycle transitions.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Unknown or unverifiable domain: deny federation and retain the proposal as inactive.
- Treaty expiry or revocation: stop new exchanges and contain in-flight transactions at safe boundaries.
- Provider changes terms or data use: mark material drift and require a fresh Treaty decision.
- Peer HAL disagrees: preserve independent sovereignty and treat its claims as external evidence.

## Constitutional Guarantees

- Federation is cooperation, never merger of identity, memory, authority, or Constitution.
- Every active Treaty is exact, time-bounded, revocable, auditable, and Owner-authorized.
- Capability-class approval and provider/domain Treaty approval are separate protected decisions.
- No external participant may acquire constitutional authority through usefulness, trust, or repeated access.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Source Alignment and Review

This chapter implements Decisions 27, 32, 36, 39–40, 48–50. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 27, 32, 36, 39–40, 48–50
