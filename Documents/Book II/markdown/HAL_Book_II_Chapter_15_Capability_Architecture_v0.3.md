# Chapter 15 — Capability Architecture

**Version:** 0.3  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Decouple what HAL intends to accomplish from the replaceable providers and technologies that perform it.

## Authoritative Responsibilities

- **Capability Catalog:** Capability Contract identity, versions, composition and lifecycle
- **Provider Registry:** Current provider identity, availability, health, trust, benchmarks and policy fitness
- **Adapter Manager:** Technical integration, compatibility, sandbox and credential references
- **Capability Router:** Provider choice within policy, privacy, resource, risk and verification constraints
- **Capability Gateway:** Consequential runtime-action admission, capability decision, authorization requirement, scoped delegation, and audit/evidence handoff

## Core State and Records

- **Capability Contract:** Outcome, inputs, outputs, constraints, side effects, quality, permission, risk and evaluation.
- **Provider Manifest:** Claims, versions, dependencies, data use, costs, locality and supported contracts.
- **Provider Fitness Record:** Observed performance, health, trust, calibration, conditions and evidence.
- **Capability Invocation:** Intent, contract version, provider, adapter, execution envelope, transaction and result.

## Runtime Workflow

1. Owner approves a new capability class through the protected process.
2. Discover provider manifests as claims; authenticate and verify the provider identity.
3. Benchmark and observe capability performance before preferred status.
4. Route an approved request using capability fit, policy, privacy, trust, availability, cost and locality.
5. Invoke through a sandboxed adapter with scoped credentials and transaction context.
6. Evaluate result, update fitness evidence and retire or quarantine unsafe providers.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Capability Gateway Boundary

The Capability Gateway is HAL’s conceptual enforcement point for consequential Agent Runtime actions. An Agent Runtime may request a capability (for example, `hal.files.read(...)`); it does not receive unrestricted direct access to governed resources merely because it can technically reach them. The Gateway evaluates the actor identity, agent identity, delegated authority, requested capability, target resource, task context, risk classification, constitutional constraints, policy constraints, human-authorization requirements, and evidence requirements. HAL then permits, denies, narrows, pauses for authorization, or otherwise dispositions the request, recording the decision through the authoritative evidence and audit paths before the actual resource is reached where practical.

This boundary applies to governed files, secrets, nodes, networks, services, physical resources, and other consequential resources. Technical reachability, runtime intelligence, a tool definition, a skill, or a runtime-held credential never substitutes for HAL authorization. The contract remains semantic and implementation-neutral; it does not prescribe the eventual capability naming convention, transport, schema, or credential mechanism.

## Failure and Recovery

- Provider outage: route only to compatible verified alternatives or disclose unavailability.
- Adapter compromise: quarantine adapter/provider and revoke scoped credentials.
- Version incompatibility: retain coexistence or block invocation; never guess contract semantics.
- Treaty missing: external provider receives no protected data or invocation.

## Constitutional Guarantees

- Capabilities extend HAL’s reach but never their own authority.
- Provider claims are evidence candidates, not trusted facts.
- Every invocation is attributable to an approved intent, contract, provider and transaction.
- Implementations may change without changing capability semantics or HAL identity.
- A runtime may request capability use; only HAL may determine that its use is permitted.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 10, 13–16, 21, 29, 32, 36, 41, 43, 49–50. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 10, 13–16, 21, 29, 32, 36, 41, 43, 49–50
