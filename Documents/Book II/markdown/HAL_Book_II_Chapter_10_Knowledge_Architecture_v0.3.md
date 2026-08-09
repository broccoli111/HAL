# Chapter 10 — Knowledge Architecture

**Version:** 0.3  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Maintain evolving, relationship-rich understanding derived from immutable experience without confusing knowledge with historical truth.

## Authoritative Responsibilities

- **Knowledge Service:** Knowledge Objects, relationships, versions, confidence and stability
- **Knowledge Graph:** Typed entities and explicit relationships across HAL, people, environment, intent and capability
- **Retrieval Service:** Contextual ranking and provenance-preserving retrieval
- **Contradiction Manager:** Competing claims, temporal validity and evidence reconciliation

## Core State and Records

- **Knowledge Object:** Claim, domain, confidence, stability, relevance, temporal validity, provenance and version.
- **Relationship:** Typed connection, direction, confidence, evidence and effective period.
- **Contradiction Set:** Competing claims, supporting evidence, materiality and resolution state.
- **Retrieval Result:** Knowledge, raw experience references, ranking factors, limitations and freshness.

## Runtime Workflow

1. Derive candidate knowledge from Experience Ledger evidence; never promote a single utterance automatically.
2. Link candidates to entities, domains and temporal context; evaluate trust and contradiction.
3. Promote knowledge through reflection, repetition, usefulness, verification or explicit Owner instruction.
4. Compress recurring experiences into evidence-linked patterns or abstractions without replacing their raw sources.
5. Version changed understanding while retaining prior validity and supporting evidence.
6. Rank retrieval using task context, relationship, recency, importance, confidence, trust, stability and Owner priority.
7. Return to raw experience when summaries or abstractions are insufficient.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Runtime Memory Sovereignty

HAL canonical knowledge is authoritative only when designated through HAL’s governed knowledge and evidence paths. It is provenance- and evidence-aware, policy-governed, versionable, recoverable, and subject to HAL authority. An Agent Runtime may receive bounded context or maintain operational memory for an agent, but that memory is convenience-oriented, non-authoritative, replaceable, and reconstructable or disposable. A runtime remembering, summarizing, retrieving, or asserting information MUST NOT make it HAL truth; promotion requires the same HAL evidence, provenance, policy, and authoritative mutation path as every other knowledge candidate.

## Failure and Recovery

- Conflicting evidence: preserve alternatives and request or seek more evidence.
- Stale knowledge: reduce current relevance through temporal policy; do not delete history.
- Broken index or embedding: rebuild from authoritative objects and ledger references.
- Uncertain identity or privacy scope: reduce disclosure even if relevant knowledge exists.

## Constitutional Guarantees

- The Experience Ledger is historical authority; the Knowledge Graph is derived understanding.
- Knowledge changes by version and evidence, not silent overwrite.
- Every durable knowledge claim is explainable through provenance.
- High-stability knowledge resists revision without proportionate evidence.
- Runtime memory is neither a canonical knowledge store nor an authoritative source of system state.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Knowledge Service is the semantic owner of Knowledge Objects and relationships.
- Databases, replicas, indexes, embeddings, caches, and observability projections are physical or derived custodians and cannot become knowledge authority.


## Source Alignment and Review

This chapter directly implements Decisions 4, 11, 24, 26, 30, 34, 40, 42, 53. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 4, 11, 24, 26, 30, 34, 40, 42, 53
