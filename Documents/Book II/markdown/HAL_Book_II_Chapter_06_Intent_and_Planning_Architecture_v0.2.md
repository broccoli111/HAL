# Chapter 6 — Intent and Planning Architecture

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Translate Owner-defined purpose into living, reviewable plans while preserving the distinction between destination, planning, execution, and outcome.

## Authoritative Responsibilities

- **Intent Manager:** Intent Objects, hierarchy, approval state, health and lifecycle
- **Planning Service:** Plan Graphs, alternatives, dependencies and replanning history
- **Goal Health Service:** Progress, momentum, blockers, confidence, risk and alignment
- **Initiative Governor:** Initiative budgets, interruption policy and permitted proactive work

## Core State and Records

- **Intent Object:** Purpose, motivation, desired outcome, constraints, horizon, review cadence, confidence and Owner approval.
- **Plan Graph:** Strategies, milestones, tasks, dependencies, assumptions, verification and approved flexibility.
- **Intent Conflict:** Competing intentions, affected outcomes, tradeoffs and required Owner judgment.
- **Owner Compass:** Evidence-backed representation of stated enduring priorities; never an independent source of values.

## Runtime Workflow

1. Capture the Owner’s stated purpose without silently promoting ordinary conversation into a durable goal.
2. Classify intent as immediate, project, strategic or enduring and request approval where persistence or autonomy changes.
3. Generate alternatives and a Plan Graph with dependencies, risks, evidence needs, verification and resource estimates.
4. Evaluate alignment, goal health, policy, authority and conflicts before work reaches execution.
5. Permit replanning inside approved flexibility; return material destination changes to the Owner.
6. Record outcomes and revise plans without rewriting the originating intent or historical decisions.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Ambiguous destination: ask or preserve a provisional Intent Object; do not invent purpose.
- Conflicting goals: surface the conflict and tradeoffs; do not silently choose a value hierarchy.
- Stalled work: update goal health and recommend options; inactivity is not permission to retire the goal.
- Missing resources or providers: replan or defer without weakening policy or authority.

## Constitutional Guarantees

- Only the Owner defines, adopts, materially changes or retires durable goals.
- Every autonomous action traces to an approved intent and current delegation.
- Plans may evolve; the destination and historical intent remain attributable.
- Initiative is bounded by policy, authority, attention budget and Owner-configured tolerance.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 12, 16, 20–21, 31, 35, 46, 54–57. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 12, 16, 20–21, 31, 35, 46, 54–57
