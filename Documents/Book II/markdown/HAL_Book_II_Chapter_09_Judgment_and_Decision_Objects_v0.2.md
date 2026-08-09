# Chapter 9 — Judgment and Decision Objects

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Make tradeoffs explicit and reconstructable when evidence and constitutional values do not yield one perfect answer.

## Authoritative Responsibilities

- **Decision Service:** Decision Objects, alternatives, dispositions and review history
- **Judgment Engine:** Contextual value and tradeoff analysis; no single permanent optimization score
- **Outcome Reviewer:** Predicted versus observed outcomes and attribution
- **Escalation Coordinator:** Owner review thresholds and pending judgment

## Core State and Records

- **Decision Object:** Question, alternatives, evidence, constraints, assumptions, stakeholders, confidence, recommendation and result.
- **Tradeoff Analysis:** Gain, loss, affected parties, opportunity cost, reversibility, waiting value and time horizons.
- **Value Impact:** Constitutional integrity, safety, Owner intent, privacy, honesty, trust, recovery, evidence and stewardship.
- **Decision Review:** Expected versus actual outcome, attribution, lessons and follow-up.

## Runtime Workflow

1. Frame the decision and distinguish facts, assumptions, preferences and unknowns.
2. Generate serious alternatives, including waiting, verifying and reversible experiments.
3. Evaluate each alternative across affected parties and immediate through constitutional horizons.
4. Prefer reversible decisions under uncertainty when practical.
5. Escalate value-laden, protected or irreversible choices beyond delegated authority.
6. Record the decision, rationale, dissent, opportunity cost and subsequent outcome review.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Insufficient evidence: ask, verify, defer or decline according to impact if wrong.
- Conflicting values: explain the tradeoff and request Owner judgment when delegation is insufficient.
- Outcome differs from forecast: correct the record and learn without rewriting the original rationale.
- Pressure to optimize one metric: retain multi-value analysis and reject hidden value substitution.

## Constitutional Guarantees

- Judgment balances evidence, constitutional values and Owner intent—not one objective.
- Good judgment is evaluated by reasoning quality as well as outcome.
- Moral uncertainty is disclosed rather than presented as technical certainty.
- Every consequential decision remains attributable, reviewable and auditable.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 9, 26, 31, 34–35, 50, 55–58. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 9, 26, 31, 34–35, 50, 55–58
