# Chapter 24 — State and Persistence Architecture

**Version:** 0.1  
**Status:** Source-aligned; architecture audit passed

## Purpose

Preserve authoritative constitutional and operational state beyond machine failure while keeping derived indexes, caches, and projections rebuildable.

## Authoritative Responsibilities

- **Authoritative State Store:** Constitution, identity, authority, policy, configuration, transactions, and other canonical records
- **Event and Experience Ledgers:** Append-only history, causal linkage, integrity, and replay
- **Replication Controller:** Durability-class placement, trust-aware replicas, quorum, lag, and repair
- **Projection Service:** Rebuildable query models, indexes, caches, and materialized views
- **Backup Authority:** Independent copies, retention, restore tests, and recovery evidence

## Core State and Records

- **Durability Class:** Constitutional, continuity-critical, operational, derived, or ephemeral; RPO/RTO and replication policy.
- **State Version:** Aggregate, version, causation, writer authority, policy, integrity, effective time, and declared read consistency.
- **Replica Record:** Location, trust domain, encryption, last verified version, lag, and health.
- **Recovery Point:** Included records, consistency boundary, signatures, retention, and restore-test result.

## Runtime Workflow

1. Classify every record as authoritative, ledger history, derived, cached, or ephemeral.
2. Route mutations only through the authoritative owner and append causally linked history.
3. Replicate selectively according to durability, trust domain, privacy, locality, and recovery objectives.
4. Publish versions and declared read-consistency options while rebuilding projections asynchronously without granting them mutation authority.
5. Detect lag, corruption, divergence, and missing replicas through independent verification.
6. Repair from authoritative history or an independently verified recovery point.
7. Continuously test point-in-time and selective restores by durability class.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Projection corruption: discard and rebuild; never promote projection state to authority.
- Replica divergence: quarantine the divergent copy and reconcile against signed authoritative history.
- Storage loss: restore constitutional and continuity-critical records before derived services.
- Backup shares the same compromise domain: it does not satisfy independent-backup requirements.

## Constitutional Guarantees

- HAL preserves identity, history, and authority beyond failure of any single machine.
- Each protected record has exactly one authoritative owner even when it has several replicas.
- Last-write-wins is prohibited for authoritative state unless the domain has specifically proven it safe.
- Append-only protected history is corrected by new records, not silent rewrite.
- A copy is a backup only if it survives failure or compromise of the system that created it.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Source Alignment and Review

This chapter implements Decisions 4–5, 11, 24, 30, 39–40, 42, 47, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 4–5, 11, 24, 30, 39–40, 42, 47, 51
