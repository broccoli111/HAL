# Chapter 27 — Failure Containment

**Version:** 0.2  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Prevent component, node, provider, data, or reasoning failures from cascading across HAL or silently changing its rules.

## Authoritative Responsibilities

- **Failure Domain Manager:** Failure boundaries, dependency graph, blast-radius policy, and isolation state
- **Circuit Breaker Service:** Health thresholds, trip state, probes, cooldown, and recovery evidence
- **Quarantine Manager:** Identity, node, provider, artifact, data, or evidence quarantine lifecycle
- **Degradation Controller:** Declared fallback, reduced capability, disclosure, and protected capacity

## Core State and Records

- **Failure Domain:** Components, dependencies, protected boundaries, containment action, and safe-state behavior.
- **Failure Declaration:** Trigger, evidence, confidence, affected capability, user impact, and disposition.
- **Quarantine Record:** Subject, reason, restrictions, evidence, authority, review, and release requirements.
- **Degradation Mode:** Unavailable/reduced capability, permitted substitutes, quality impact, disclosure, and exit gate.

## Runtime Workflow

1. Detect failure from independent health, transaction, evidence, security, or outcome observations.
2. Classify affected domain, consequence, uncertainty, and declared fail-open/fail-closed/fail-safe behavior.
3. Trip the narrowest circuit, isolate dependencies, and preserve constitutional/observability/recovery reserve.
4. Quarantine untrusted identities, nodes, providers, artifacts, or data when integrity is uncertain.
5. Select only predeclared, policy-valid fallback behavior and disclose material degradation.
6. Verify recovery with probes, shadow/canary evidence, and state reconciliation.
7. Restore gradually; protected quarantine release follows its Owner-governed rule.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Failure detector disagreement: preserve both observations and choose the safer bounded state pending evidence.
- Fallback also fails: stop the affected capability rather than cascade through unverified substitutes.
- Containment harms unrelated work: record impact and adjust topology without lowering constitutional controls.
- Unknown root cause: retain quarantine and continue evidence collection; uncertainty is not restoration evidence.

## Constitutional Guarantees

- No single failure may silently change HAL’s rules or constitutional behavior.
- Failures are contained by explicit domains rather than implicit shared dependencies.
- Graceful degradation is transparent, bounded, and policy-governed.
- Quarantine limits authority and access without rewriting identity or historical evidence.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter implements Decisions 19, 22, 28–29, 35, 38, 41–42, 47, 50, 56. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 19, 22, 28–29, 35, 38, 41–42, 47, 50, 56
