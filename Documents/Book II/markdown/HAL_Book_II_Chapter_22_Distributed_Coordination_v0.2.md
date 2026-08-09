# Chapter 22 — Distributed Coordination

**Version:** 0.2  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Coordinate one authoritative HAL identity across HAL Core and participating node runtimes while preserving constitutional consistency during failure, recovery, and partition.

## Authoritative Responsibilities

- **Cluster Coordinator:** Membership, roles, topology, health, work placement, and rejoin orchestration
- **Constitutional Lease Authority:** Single active constitutional lease and term history
- **Distributed Scheduler:** Capability- and health-aware assignment within policy and resource budgets
- **Reconciliation Service:** Partition evidence, state comparison, transaction replay, and safe convergence
- **Independent Attestors:** Integrity observations without constitutional control

## Core State and Records

- **Node Record:** Identity, role, capabilities, software/configuration versions, health, trust, workload, and partition state.
- **Constitutional Lease:** Holder, term, issue/expiry, quorum evidence, policy version, and revocation.
- **Work Assignment:** Intent, capability, authority, resources, node, deadline, retry, and result provenance.
- **Partition Record:** Affected nodes, last contact, delegated authority, restricted mode, evidence, and reconciliation state.
- **Rejoin Plan:** Identity/integrity checks, missed evidence, state synchronization, health gates, and staged restoration.

## Runtime Workflow

1. Authenticate a joining node and verify hardware/software integrity before accepting capability claims.
2. Register capabilities, health, configuration, policy version, locality, and resource limits.
3. Assign dynamic task roles without making any compute node the constitutional Owner.
4. Require the active Core to hold a valid constitutional lease before canonical mutation.
5. Restrict disconnected nodes to explicitly delegated local work and evidence collection.
6. On reconnection, compare journals and canonical versions before replay or reconciliation.
7. Return a node gradually after identity, integrity, policy, trust, state, and health validation.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Lease uncertainty: stop canonical mutation and preserve identity consistency over availability.
- Split brain: only the valid lease holder may govern; isolated partitions enter restricted mode.
- Byzantine or compromised node: quarantine it and disregard unverified state while preserving evidence.
- Coordinator failure: recover coordination from durable membership, lease, and transaction records.

## Constitutional Guarantees

- HAL is one intelligence across cooperating nodes, never competing constitutional instances.
- Dynamic leadership applies to execution tasks, not constitutional governance.
- Partitions may reduce capability but cannot create new authority or canonical state.
- Rejoining is earned through evidence and staged verification, never assumed from prior membership.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- A recovery constitutional lease may be issued only to a pre-registered, independently attested successor after the prior lease has provably expired and the required quorum agrees on the latest valid constitutional state.
- Every recovery lease has a hard maximum duration of 24 hours. Any extension requires fresh Owner authorization bound to the exact successor, constitutional state, lease identifier, and duration; expiry ends protected canonical mutation and returns the successor to Restricted or Safe Recovery mode. Permanent Primary Constitutional Host reassignment requires the Owner Authorization Ceremony.


## Source Alignment and Review

This chapter implements Decisions 17–24, 29, 37–38, 41–42, 47, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 17–24, 29, 37–38, 41–42, 47, 51
