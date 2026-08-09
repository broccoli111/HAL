# Chapter 13 — Temporal Architecture

**Version:** 0.3  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Represent time as commitments, dependencies, causality, recurrence, aging and confidence so scheduling and historical reasoning remain honest.

## Authoritative Responsibilities

- **Temporal Service:** Time model, conversions, confidence and correction records
- **Temporal Commitment Service:** Authoritative commitments, dependencies, windows, recurrence and deadlines supplied to the Chapter 8 Scheduler
- **Causal Clock:** Logical ordering for distributed events
- **Aging Service:** Policy-driven freshness, decay and retention transitions

## Core State and Records

- **Temporal Context:** Wall-clock, logical, human and system time with timezone and confidence.
- **Commitment:** Owner, obligation, window, dependency, recurrence, priority and consequence.
- **Temporal Correction:** Original value, corrected interpretation, evidence, reason and audit link.
- **Recurrence Pattern:** Observed cadence, confidence, exceptions and next expected interval.

## Runtime Workflow

1. Capture occurrence time, receipt time, source clock and clock confidence.
2. Order distributed events causally where wall clocks cannot establish certainty.
3. Model commitments as windows and dependencies rather than bare timestamps.
4. Learn recurrence from preserved experiences and maintain exceptions.
5. Age evidence, context and knowledge according to type-specific policy.
6. Correct interpretations by appending clarification; never rewrite historical occurrence records.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Clock disagreement: lower time confidence and use causal ordering.
- Missed deadline: record breach, consequence and recovery; do not move the historical due time.
- Unknown timezone or human intent: ask before creating consequential commitments.
- Offline node: operate within bounded leases and reconcile time evidence on return.

## Constitutional Guarantees

- Historical state can be reconstructed as understood at a prior time.
- History may be clarified but never rewritten.
- Temporal uncertainty is explicit in authorization, evidence and scheduling.
- Recurring behavior is inferred from experience, not assumed from one event.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Temporal Service and Temporal Commitment Service own time facts and scheduling constraints.
- Only the Chapter 8 Scheduler admits and places work. Chapter 13 does not independently dispatch execution.


## Source Alignment and Review

This chapter directly implements Decisions 4, 21, 30, 35, 40, 44, 50, 54. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 4, 21, 30, 35, 40, 44, 50, 54
