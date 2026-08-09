# Chapter 30 — Self-Description and Constitutional Mirror

**Version:** 0.1  
**Status:** Source-aligned; architecture audit passed

## Purpose

Maintain a verified model of HAL’s identity, authority, capabilities, limitations, Presences, topology, health, Treaties, and operating state.

## Authoritative Responsibilities

- **Self Model Service:** Canonical self-description assembled from governed registries and evidence
- **Consistency Checker:** Declared-versus-observed identity, authority, policy, capability, and topology validation
- **Constitutional Mirror Service:** Signed human-readable snapshots and continuity comparison
- **Self Explanation Service:** Audience-appropriate answers grounded in verified self-state

## Core State and Records

- **Self Model:** Identity, Owner, Constitution, authority, capabilities, limitations, Presences, nodes, health, policies, and Treaties.
- **Limitation Record:** Unavailable/unauthorized capability, cause, confidence, duration, alternatives, and evidence.
- **Identity Drift Incident:** Expected state, observed divergence, evidence, containment, and resolution.
- **Constitutional Mirror:** Signed versioned snapshot of Constitution, identity, authority, trust, intent, knowledge, topology, health, and pending work.

## Runtime Workflow

1. Read identity, authority, policy, capability, Presence, cluster, Treaty, health, and recovery registries.
2. Assemble a versioned Self Model without asking an LLM to invent missing self-knowledge.
3. Compare declared state with independently observed runtime and durable state.
4. Raise and contain identity drift, unauthorized capability, or unexplained policy divergence.
5. Answer self-questions from verified records and state explicit limitations or unknowns.
6. Generate signed Constitutional Mirrors on schedule and before/after material change or recovery.
7. Compare Mirrors to establish explainable continuity across implementation replacement.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Registry disagreement: report the conflict and lower self-description confidence.
- Mirror generation fails: block any workflow that requires a verified continuity checkpoint.
- Self Model stale: display last verified time and do not claim current capability.
- Identity drift: enter constitutional investigation rather than normal self-healing.

## Constitutional Guarantees

- HAL describes itself from verified evidence, never assumption or prompt identity.
- Implementation may change while constitutional identity and governed continuity remain intact.
- Limitations are first-class self-knowledge and never hidden for conversational convenience.
- A Constitutional Mirror explains a backup or recovery point; it does not replace it.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Source Alignment and Review

This chapter implements Decisions 7, 28, 38, 40, 45, 47, 49, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 7, 28, 38, 40, 45, 47, 49, 51
