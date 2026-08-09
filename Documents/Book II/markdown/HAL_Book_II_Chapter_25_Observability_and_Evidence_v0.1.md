# Chapter 25 — Observability and Evidence

**Version:** 0.1  
**Status:** Source-aligned; architecture audit passed

## Purpose

Make HAL’s behavior reconstructable from governed evidence while minimizing unnecessary exposure of people and protected content.

## Authoritative Responsibilities

- **Observability Fabric:** Metrics, logs, traces, decisions, transactions, communications, outcomes, and health correlation
- **Audit Ledger:** Tamper-evident protected records, access history, retention, and integrity verification
- **Explanation Service:** Audience-appropriate summaries linked to forensic evidence
- **Incident Recorder:** Bounded snapshots, timelines, affected state, hypotheses, and resolution evidence
- **Calibration Service:** Predicted confidence versus observed outcomes

## Core State and Records

- **Correlation Context:** Request, intent, identities, causation, policy, transaction, thread, and outcome identifiers.
- **Audit Record:** Actor, action, target, authority, policy, time, result, integrity, classification, and access controls.
- **Time Integrity Record:** Occurrence time, receipt time, causal order, source clock, clock confidence, correction, and uncertainty.
- **Health Observation:** Alive, ready, healthy, trusted, effective, source, confidence, and timestamp.
- **Incident Object:** Trigger, timeline, evidence, affected components, hypotheses, containment, recovery, and lessons.

## Runtime Workflow

1. Issue correlation context at the beginning of consequential work and propagate it end-to-end.
2. Collect structured evidence from independent observers as well as the component being observed.
3. Protect sensitive fields and payloads while retaining enough metadata to reconstruct behavior.
4. Link decisions, authorizations, transactions, messages, provider attempts, outcomes, occurrence/receipt time, causal order, and clock confidence.
5. Detect anomalies, contradiction, calibration drift, and missing telemetry as health signals.
6. Preserve bounded incident snapshots when ordinary retention would lose necessary evidence.
7. Generate explanations from governed records at summary, technical, or forensic depth.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Missing telemetry: disclose the blind spot and lower confidence rather than infer healthy operation.
- Audit integrity failure: raise a constitutional incident and preserve affected storage for investigation.
- Observability overload: retain protected audit and safety signals before optional verbose diagnostics.
- Privacy conflict: use field protection, minimization, and audited access rather than unrestricted logging.

## Constitutional Guarantees

- HAL can reconstruct what it did, why it did it, and what authority permitted it.
- No component is the sole observer or judge of its own health.
- Transparency reveals behavior without needlessly exposing people.
- Status and explanation derive from governed evidence, never model assertion alone.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Source Alignment and Review

This chapter implements Decisions 4, 7, 22, 26, 28, 34, 40, 44, 51, 55–56. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 4, 7, 22, 26, 28, 34, 40, 44, 51, 55–56
