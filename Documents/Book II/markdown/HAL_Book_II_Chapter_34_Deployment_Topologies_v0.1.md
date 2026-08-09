# Chapter 34 — Deployment Topologies

**Version:** 0.1  
**Status:** Source-aligned; architecture audit passed

## Purpose

Define deployable HAL topologies that preserve one central constitutional control plane while allowing distributed, replaceable execution and multiple Presences.

## Authoritative Responsibilities

- **Deployment Controller:** Topology manifest, environment, service placement, versions, dependencies, and desired state
- **HAL Core Runtime:** Constitutional kernel, governance, identity, authority, policy, canonical coordination, and audit
- **HAL Node Runtime:** Authenticated capability execution, local health, bounded cache, evidence, and restricted offline mode
- **Presence Runtime:** Device interaction, sensors/outputs, privacy context, and non-authoritative local state

## Core State and Records

- **Deployment Manifest:** Environment, hosts, services, identities, networks, storage, policies, versions, and recovery profile.
- **Core Host Profile:** Dedicated Mac mini or successor, kernel services, canonical storage, security, observability, and reserve.
- **Node Profile:** GX10 or future compute node identity, capabilities, resource limits, software, health, and delegation.
- **Environment Boundary:** Simulation, test, shadow, canary, production, recovery, or emergency with permitted effects.

## Runtime Workflow

1. Validate deployment manifest, host identities, signed artifacts, configuration, secrets, and network boundaries.
2. Bootstrap the dedicated HAL Core control plane and establish the constitutional lease.
3. Restore or initialize Constitution, Owner identity, authority, policy, audit, ledgers, and canonical state.
4. Join compute nodes through the controlled recovery/join pipeline and advertise verified capabilities.
5. Start replaceable services and Presences only after their dependencies and authority boundaries are ready.
6. Route execution dynamically while governance and canonical state remain controlled by HAL Core.
7. Continuously reconcile desired and observed topology and test recovery into an isolated environment.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Core unavailable: nodes retain only bounded delegated work; no node becomes an equal independent HAL.
- Node unavailable: reassign compatible execution or disclose degraded capability.
- Environment boundary uncertain: block real-world effects until production identity is proven.
- Topology drift: reconcile ordinary changes; escalate identity, policy, or constitutional divergence.

## Constitutional Guarantees

- The reference household topology is one dedicated HAL Core with lightweight node and Presence runtimes.
- Distributed execution never distributes constitutional ownership.
- Topology and hardware may evolve without changing HAL identity or capability contracts.
- Simulation, test, recovery, and production deployments cannot accidentally share reality-changing authority.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Source Alignment and Review

This chapter implements Decisions 1–2, 17–24, 29, 37–43, 45, 47, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 1–2, 17–24, 29, 37–43, 45, 47, 51
