# Chapter 12 — Memory and Experience Ledger

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Preserve every conversation, observation, event, action and outcome as immutable experience while managing active context and derived memory separately.

## Authoritative Responsibilities

- **Experience Ledger:** Append-only Experience Objects and integrity chain
- **Context Manager:** Working and short-term Active/Cooling/Dormant context states
- **Conversation Service:** Conversation Objects, participants, purpose, decisions and open work
- **Archive Index:** Searchable dormant experience and retention-class access

## Core State and Records

- **Experience Object:** Identity, timestamp, receipt time, content reference, provenance, classification, causation and integrity.
- **Context Entry:** Experience/knowledge reference, active state, relevance, recurrence, unresolved status and Owner priority.
- **Conversation Object:** Purpose, state, participants, decisions, questions, dependencies and next actions.
- **Memory Derivation:** Summary, pattern or knowledge link with source experiences and method.

## Runtime Workflow

1. Append interaction or event once with identity, time, provenance, classification and causal context.
2. Place relevant references in working context for the active task.
3. Move short-term context through Active, Cooling and Dormant; default active horizon is 30 days but relevance may extend it.
4. Run reflection to link, summarize, generalize or promote while preserving raw experience.
5. Retrieve knowledge first, patterns second and raw experience when needed.
6. Apply visibility, retention and protected-deletion policies without silently rewriting the ledger.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Ledger append unavailable: do not claim durable completion; buffer only under declared safe policy.
- Corrupt projection: discard and rebuild from authoritative ledger entries.
- Privacy scope uncertain: withhold content and expose only permitted metadata.
- Pattern is disproven: revise derived knowledge; retain the supporting and contradicting experiences.

## Constitutional Guarantees

- HAL never forgets experiences merely because active context expires.
- Expiration changes accessibility, not preservation.
- Derived memory never replaces its source experiences.
- Shared, personal and protected visibility are explicit and policy-enforced.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 4, 11, 24, 30, 32, 40, 42, 44, 48, 53. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 4, 11, 24, 30, 32, 40, 42, 44, 48, 53
