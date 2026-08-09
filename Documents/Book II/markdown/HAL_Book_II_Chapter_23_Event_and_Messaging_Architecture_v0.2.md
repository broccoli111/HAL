# Chapter 23 — Event and Messaging Architecture

**Version:** 0.2  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Provide typed, secure, traceable communication for commands, queries, events, streams, and persistent collaboration across HAL identities.

## Authoritative Responsibilities

- **HAL Communication Protocol:** Message semantics, envelopes, versioning, identity, intent, provenance, and security metadata
- **Event Fabric:** Point-to-point, publish/subscribe, request/response, streaming, deferred delivery, and replay
- **Thread Service:** Transport correlation, participant routing, delivery state, continuation handles, and projections of the canonical Conversation Object
- **Delivery Controller:** Priority, expiry, deduplication, retry, backpressure, and dead-letter handling

## Core State and Records

- **Communication Object:** Sender, recipients, intent, context, priority, evidence, classification, expiry, correlation, and provenance.
- **Message Primitive Contract:** Command, query, event, stream, or coordination semantics; ordering, persistence, acknowledgement, replay, expiry, and recovery.
- **Command:** Requested mutation, target authority, preconditions, idempotency, deadline, and reply contract.
- **Event:** Immutable completed fact with source identity, occurrence/receipt time, causation, and integrity.
- **Conversation Object Reference:** Identifier and delivery projection of the canonical Conversation Object owned by the Chapter 12 Conversation Service.

## Runtime Workflow

1. Authenticate sender and recipient identities and resolve the applicable authorization and Treaty boundaries.
2. Validate schema version, primitive contract, ordering/persistence semantics, intent, classification, expiry, replay protection, and routing metadata.
3. Encrypt across process, device, or trust boundaries; apply end-to-end protection for sensitive payloads.
4. Deliver by intent and capability rather than binding planners to a particular implementation.
5. Record correlation and receipt evidence; deduplicate before side-effecting command handling.
6. Persist significant collaboration in Conversation Objects independently of transcript presentation.
7. Apply bounded retry, backpressure, deferral, or dead-letter handling without losing provenance.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Unknown schema: reject or route to an explicit compatibility adapter; never guess semantics.
- Duplicate command: return the recorded disposition using its idempotency identity.
- Unavailable recipient: defer until expiry or return a transparent failure according to message policy.
- Compromised event fabric: payload encryption and signatures preserve confidentiality/integrity; revoke transport trust.

## Constitutional Guarantees

- Communication conveys intent; evidence supports decisions; authority determines action.
- Network location never establishes trust—identity, authorization, and cryptographic proof do.
- Commands, queries, events, streams, and coordination use explicit semantics rather than one forced primitive.
- Transport infrastructure may route protected messages without automatically reading their payloads.
- Every consequential message remains attributable, correlated, versioned, and auditable.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Chapter 12 Conversation Service is the sole semantic owner of Conversation Objects.
- The Thread Service owns message/thread delivery mechanics only and references the canonical conversation rather than duplicating it.


## Source Alignment and Review

This chapter implements Decisions 3–4, 23, 27, 32, 39–40, 44, 49. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 3–4, 23, 27, 32, 39–40, 44, 49
