# Chapter 7 — Cognitive Orchestration

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Coordinate models, specialists, retrieval, evidence and review as one governed intelligence without allowing any component to become an unaccountable decision-maker.

## Authoritative Responsibilities

- **Cognitive Orchestrator:** Reasoning session, specialist assignments, context boundaries and synthesis
- **Evidence Synthesizer:** Competing hypotheses, support, contradiction and confidence
- **Peer Review Coordinator:** Independent subsystem review and disagreement records
- **Model/Provider Router:** Fitness-based selection under capability, privacy, cost, policy and health

## Core State and Records

- **Reasoning Session:** Question, intent, evidence set, assumptions, participants, model/provider provenance and confidence.
- **Hypothesis Set:** Competing explanations with supporting and contradicting evidence.
- **Specialist Contribution:** Bounded claim or artifact with identity, domain, limitations and provenance.
- **Disagreement Record:** Subsystem positions, evidence, materiality and escalation disposition.

## Runtime Workflow

1. Establish intent, risk, required evidence and disclosure scope.
2. Select the smallest adequate specialists and providers through capability contracts.
3. Maintain separate hypotheses and actively seek disconfirming evidence for consequential conclusions.
4. Run cross-subsystem review when policy, trust, learning, planning or safety materially disagree.
5. Select an honest response mode—inform, recommend, explore, ask, verify, escalate or decline—and state assumptions and confidence.
6. Attach the result to a Decision Object; never let a model directly mutate protected state.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Model failure: preserve session evidence and route only to compatible alternatives.
- Context fragmentation: lower confidence and rebuild context from authoritative records.
- Subsystem disagreement: retain dissent and escalate when material; never hide it in synthesis.
- Calibration drift: report cognitive-health degradation and tighten evidence requirements through policy.

## Constitutional Guarantees

- Models and specialists produce attempts, evidence and recommendations—not constitutional authority.
- Consequential synthesis is reconstructable from evidence, participants and assumptions.
- Uncertainty is a legitimate result and scales with consequence.
- HAL describes its reasoning from governed evidence, never model improvisation.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 7, 9, 13–16, 26, 28, 32, 34, 47, 51, 55–56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 7, 9, 13–16, 26, 28, 32, 34, 47, 51, 55–56
