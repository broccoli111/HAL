# Chapter 14 — Presence and Human Interaction

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Express one HAL identity through multiple contextual Presences while preserving identity, privacy, authority and conversation continuity.

## Authoritative Responsibilities

- **Presence Manager:** Presence Objects, lifecycle, routing and continuity
- **Interaction Coordinator:** Modality, audience, handoff and response rendering
- **Privacy Context Service:** Audience, location, sensor and disclosure conditions
- **Local Presence Runtime:** Bounded cache, device capability and offline interaction

## Core State and Records

- **Presence Object:** Device, active user, modalities, sensors, outputs, permissions, trust, network, resources and privacy.
- **Interaction Session:** Participants, identity confidence, conversation, modality, disclosure scope and handoff token.
- **Presence Handoff:** Source, destination, context subset, privacy review and continuity state.
- **Audience Context:** Observed people, confidence, sensitivity and permitted disclosure.

## Runtime Workflow

1. Register and verify the device/service identity separately from HAL identity.
2. Create a Presence with declared sensors, outputs, resource limits and privacy characteristics.
3. Authenticate the active human and calculate permitted disclosure for the current audience.
4. Route interaction to the suitable modality and capability without changing underlying content authority.
5. Handoff selected context to another Presence after identity and privacy checks.
6. Keep local caches bounded, encrypted and non-authoritative; reconcile on reconnect.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Identity uncertainty: reduce disclosure and require step-up before sensitive action.
- Public or unknown audience: suppress private content by policy.
- Presence offline: continue only within cached, delegated authority and disclose limitations.
- Compromised Presence: quarantine it without changing HAL’s constitutional identity.

## Constitutional Guarantees

- HAL possesses one identity regardless of the number of Presences.
- A Presence changes interaction, never authority or identity.
- Privacy follows participant, audience, place and purpose—not device convenience.
- Conversation continuity never bypasses fresh authentication or disclosure policy.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 27, 32, 45, 48, 51–52. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 27, 32, 45, 48, 51–52
