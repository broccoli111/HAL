# Chapter 29 — Software Lifecycle and Change Governance

**Version:** 0.2  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Treat software, model, schema, configuration, adapter, and infrastructure changes as governed evolutionary transactions rather than informal maintenance.

## Authoritative Responsibilities

- **Release Manager:** Change classification, release channels, provenance, rollout, validation, and retirement
- **Compatibility Service:** Contracts, schemas, coexistence, dependency isolation, and migration gates
- **Update Verifier:** Static, simulation, shadow, canary, and post-update evidence
- **Rollback Coordinator:** Recovery point, reverse migration, prior behavior, and incident linkage

## Core State and Records

- **Change Package:** Artifact, type, version, source, signatures, dependencies, permissions, migrations, and risk.
- **Compatibility Contract:** Producer/consumer versions, schema, behavior, deprecation, and test evidence.
- **Rollout Plan:** Environment, cohort, canary, thresholds, observation, promotion, pause, and rollback.
- **Change Record:** Rationale, evidence, authorizations, attempts, outcomes, incidents, and final disposition.

## Runtime Workflow

1. Classify change as constitutional, kernel, service, adapter, model, schema, configuration, or infrastructure.
2. Verify signed provenance, dependencies, permissions, compatibility, and vulnerability evidence.
3. Create recoverable schema/configuration migrations and a tested rollback or compensation path.
4. Run risk-proportionate static, simulated, shadow, and canary verification.
5. Obtain protected Owner authorization where the change affects constitutional or guarded behavior.
6. Roll out in stages with coexistence where needed and continuously compare expected behavior.
7. Validate after adoption; pause, roll back, compensate, or retire based on evidence.

An Agent Runtime replacement is an adapter/provider change when it preserves the Agent Runtime Contract and HAL governance semantics. Any proposed change to the Contract, Capability Gateway semantics, canonical-state authority, or authorization model is reviewed at the higher applicable change class and cannot be disguised as a runtime update.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Unsigned or unverifiable artifact: reject it regardless of claimed urgency.
- Migration partially applies: recover from transaction journal and do not declare the new version active.
- Behavioral drift after model update: quarantine or rollback the provider and preserve comparison evidence.
- Security emergency: accelerate stages only where evidence allows; never disguise governance change as a patch.

## Constitutional Guarantees

- HAL adopts change because it is proven suitable, not merely newer.
- No maintenance operation may redefine identity, authority, policy, or Constitution by implication.
- Version coexistence and migration preserve continuity and reconstructability.
- Every adopted change has provenance, verification, disposition, and a recoverability record.

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

This chapter implements Decisions 33, 37–39, 43, 50–51, 58. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 33, 37–39, 43, 50–51, 58
