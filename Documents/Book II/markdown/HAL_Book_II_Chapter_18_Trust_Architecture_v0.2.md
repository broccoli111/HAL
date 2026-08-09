# Chapter 18 — Trust Architecture

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Evaluate how much evidence and sources should be relied upon in a particular domain without allowing trust to become permission or authority.

## Authoritative Responsibilities

- **Evidence Service:** Immutable Evidence Objects, custody, signatures and verification state
- **Trust Engine:** Domain-specific multidimensional trust evaluations
- **Reputation Service:** Outcome-based source history, calibration and decay
- **Contradiction Service:** Conflict sets, materiality and evidence-seeking recommendations

## Core State and Records

- **Evidence Object:** Source identity, observation, timestamp, domain, confidence, custody, signature, expiration and verification.
- **Trust Profile:** Reliability, accuracy, recency, consistency, transparency, verifiability and health by domain.
- **Conclusion Record:** Claim, supporting/contradicting evidence, weights, assumptions, confidence and explanation.
- **Reputation Update:** Prediction, outcome, scoring rule, prior/new state and anti-manipulation checks.

## Runtime Workflow

1. Ingest an observation as evidence rather than unqualified truth.
2. Verify identity, integrity, custody, domain and freshness.
3. Evaluate source trust dimensions for the relevant question; never use one global score.
4. Maintain competing conclusions and explicit contradictions.
5. Seek additional evidence when conflict or consequence exceeds policy threshold.
6. Create an explainable conclusion and update reputation only after observable outcomes.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Stale evidence: decay relevance according to evidence type, not arbitrary deletion.
- Source compromise or sensor drift: reduce health/trust and quarantine if warranted.
- Conflicting trusted sources: preserve dissent and escalate or seek evidence.
- Owner override: record as new evidence; do not rewrite history or instantly alter reputation.

## Constitutional Guarantees

- Evidence precedes belief; trust informs decisions; authority governs actions.
- Trust is multidimensional, domain-specific and independent from permission.
- Conflicting evidence is never silently resolved.
- Every consequential conclusion explains support, contradiction, assumptions and confidence.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 9, 13–14, 22, 26–29, 34, 40, 53, 56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 9, 13–14, 22, 26–29, 34, 40, 53, 56
