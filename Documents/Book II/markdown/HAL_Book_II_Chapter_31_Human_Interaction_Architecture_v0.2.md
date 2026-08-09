# Chapter 31 — Human Interaction Architecture

**Version:** 0.2  
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Provide respectful, adaptive, multimodal interaction that reduces cognitive burden while preserving identity, privacy, agency, and the distinction between agreement and authorization.

## Authoritative Responsibilities

- **Interaction Manager:** Sole semantic owner of Interaction Sessions, conversation linkage, modality, response mode, handoff, and interruption behavior
- **Participant Context Service:** Identity confidence, relationship, delegation, preferences, accessibility, audience, and privacy
- **Presentation Service:** Voice, text, visual, notification, and technical-depth rendering
- **Consent and Confirmation Service:** Ordinary confirmation, step-up prompts, and protected authorization boundaries

## Core State and Records

- **Interaction Session:** Participants, Presence, conversation, intent, modality, audience, privacy, and identity confidence.
- **Communication Preference:** Person, context, format, verbosity, timing, accessibility, evidence, and override.
- **Confirmation Request:** Exact action, consequence, authority needed, expiry, and accepted response class.
- **Interruption Decision:** Subject, urgency, impact, current focus, delivery mode, deferral, and rationale.

## Runtime Workflow

1. Identify participants and current audience with explicit confidence and privacy scope.
2. Resolve the active Conversation Object, intent, authority, and communication preferences.
3. Choose inform, recommend, explore, ask, verify, escalate, or decline according to evidence and consequence.
4. Render the same governed content appropriately for modality, accessibility, expertise, and context.
5. Treat casual agreement as deliberative assent only; invoke a separate ceremony for protected action.
6. Record decisions and open work while minimizing unnecessary sensitive transcript exposure.
7. Learn communication preferences as revisable evidence, never as authority or immutable personality.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Identity confidence falls: reduce disclosure and require step-up before sensitive continuation.
- Audience becomes public: suppress private material and explain the limitation discreetly.
- Preferred modality fails: use a safe alternative without changing the underlying answer or authority.
- Ambiguous consent: ask a precise question; do not convert social language into authorization.

## Constitutional Guarantees

- HAL amplifies human agency and never replaces consequential human judgment.
- A person may have privacy and broad delegation without constitutional ownership.
- Personalization changes presentation and assistance, not truth, policy, or authority.
- Protected action always remains separate, fresh, exact, time-limited, non-replayable, and auditable.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Interaction Manager in this chapter is the sole semantic owner of Interaction Sessions.
- Presence, audience, modality, and handoff facts supplied by Chapter 14 are referenced as governed context rather than copied into a competing session record.


## Source Alignment and Review

This chapter implements Articles I, VI, XII; Decisions 8, 27, 31–32, 45–46, 48, 52, 54–57. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Articles I, VI, XII; Decisions 8, 27, 31–32, 45–46, 48, 52, 54–57
