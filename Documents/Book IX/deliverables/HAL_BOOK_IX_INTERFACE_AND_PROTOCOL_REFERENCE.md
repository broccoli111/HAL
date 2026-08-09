# HAL Book IX — Interface and Protocol Reference

**Version:** 1.0  
**Status:** FINAL  
**Date:** 2026-07-27  
**Authority:** Subordinate to Books I-IV and semantically aligned with Book X.

## Document Control

| Field | Value |
|---|---|
| Version | 1.0 |
| Status | Final |
| Authority | Books I, II, III, IV, then Book IX; Book X controls shared semantics |
| Contract corpus | 305 Book IV logical interfaces |
| Owner Review items | None |

## Revision History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-27 | Initial certified edition |

## Table of Contents

1. Purpose, Scope, Authority, and Conformance
2. Contract Taxonomy and Catalog
3. Common Message Envelope
4. Identity, Authentication, and Authority Context
5. Commands, Responses, and Idempotency
6. Queries, Pagination, Filtering, and Partial Results
7. Events, Ordering, Delivery, and Replay
8. Streaming and Flow Control
9. Errors, Denials, Timeouts, Retries, and Cancellation
10. Versioning, Compatibility, and Deprecation
11. Security, Privacy, Classification, and Evidence
12. External Trust Domains, Treaties, and Constitutional Firewall
13. Observability Contracts and Operational Limits
14. OpenAPI, AsyncAPI, Protocol Buffers, and JSON Schema Profiles
15. Conformance, Compatibility Testing, and Certification Evidence
16. Contract Catalog and Examples

---

# 1. Purpose, Scope, Authority, and Conformance

Book IX is the canonical contract-level reference for HAL machine interactions. It binds wire behavior to the responsibilities and logical interfaces already approved in Book II and specified in Book IV. It does not create components, move state ownership, or confer authority.

## Normative controls

### IX-GOV-001 — Authority hierarchy

All contracts MUST preserve Books I-IV and X; conflict MUST fail closed and be recorded.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-GOV-002 — Contract registration

Every machine interaction admitted to a declared live-effect environment and approved Reality Boundary stage MUST use a registered versioned contract.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-GOV-003 — No architectural redesign

A contract MUST NOT move responsibility, state ownership, or authority between Book IV components.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 2. Contract Taxonomy and Catalog

HAL uses commands for requested transitions or effects, queries for non-mutating retrieval, events for completed facts, and streams for ordered sequences. Each registered contract has one provider, an authorized consumer class, a stable identifier, explicit semantics, and a lifecycle state.

## Normative controls

### IX-GOV-001 — Authority hierarchy

All contracts MUST preserve Books I-IV and X; conflict MUST fail closed and be recorded.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-GOV-002 — Contract registration

Every machine interaction admitted to a declared live-effect environment and approved Reality Boundary stage MUST use a registered versioned contract.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-GOV-003 — No architectural redesign

A contract MUST NOT move responsibility, state ownership, or authority between Book IV components.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 3. Common Message Envelope

The HAL envelope carries typed payloads with identity, contract and schema versions, correlation, causation, time, provenance, classification, integrity, and optional authority and Treaty context. Metadata is part of the security decision, not decorative tracing.

## Normative controls

### IX-ENV-001 — Common envelope

Every message MUST carry message, contract, schema, correlation, causation, producer, time, provenance, classification, and integrity metadata.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-ENV-002 — Freshness

Receivers MUST enforce declared issued-at, expiry, and maximum-age constraints.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-ENV-003 — Canonical identifiers

Identifiers MUST be opaque, stable, globally unambiguous, and MUST NOT embed mutable Authority or Permission claims.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 4. Identity, Authentication, and Authority Context

Machine identity authenticates an actor; authority context proves the permitted action and constraints. Receivers independently validate current authority. Delegation chains, policy decisions, purpose, target, resource limits, and expirations are explicit and integrity protected.

## Normative controls

### IX-AUT-001 — Authenticated identity

Every non-public interaction MUST authenticate sender and intended recipient.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-AUT-002 — Authority context

Protected interactions MUST carry integrity-protected authority, delegation, policy, purpose, and constraint references.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-AUT-003 — No ambient authority

Network location, credentials, data possession, or component execution MUST NOT independently confer authority.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-AUT-004 — Decision freshness

Authority decisions MUST be current for the proposed action and invalidated by revocation, expiry, or material proposal change.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-AUT-005 — Denied means no effect

A denial response MUST be terminal for the attempted action and MUST NOT be converted into success by a transport adapter.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 5. Commands, Responses, and Idempotency

Commands express proposed actions, never assumed outcomes. Retriable commands use stable idempotency identities. Results distinguish accepted, committed, denied, pending, indeterminate, and failed. Reality Boundary ambiguity requires reconciliation before retry.

## Normative controls

### IX-IDM-001 — Idempotency key

Every retriable command MUST require a caller-stable idempotency key scoped to principal, operation, and semantic payload.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-IDM-002 — Duplicate disposition

A duplicate command MUST return the recorded disposition and MUST NOT repeat the effect.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-IDM-003 — Reality ambiguity

An ambiguous Reality Boundary outcome MUST enter reconciliation; automatic replay is prohibited until real-world state is verified.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 6. Queries, Pagination, Filtering, and Partial Results

Queries are non-mutating and authority checked. Pagination cursors bind the caller, snapshot, sort, and filter. Partial, redacted, stale, or degraded results are explicit and cannot masquerade as complete authoritative state.

## Normative controls

### IX-PAG-001 — Pagination

List queries MUST use opaque, integrity-protected cursors bound to filter, sort, principal, and snapshot semantics.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-PAG-002 — Filtering

Filterable and sortable fields MUST be allowlisted; unrecognized fields MUST fail validation.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 7. Events, Ordering, Delivery, and Replay

Events are immutable completed facts. Contracts state ordering scope and delivery guarantee. At-least-once delivery requires consumer deduplication; replay is labeled, authorized, bounded, and distinguishable from live delivery.

## Normative controls

### IX-ORD-001 — Ordering scope

Contracts MUST declare no ordering, per-key ordering, or total ordering; consumers MUST NOT infer stronger order.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-ORD-002 — Event immutability

Events MUST describe completed facts and MUST NOT be rewritten; correction uses a new linked event.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 8. Streaming and Flow Control

Streams declare open, data, checkpoint, gap, and close frames; demand, buffering, backpressure, resume, retention, Authority and Permission re-evaluation, and termination behavior are bounded and testable.

## Normative controls

### IX-STR-001 — Stream resume

Resumable streams MUST use opaque cursors with declared retention and gap behavior.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-STR-002 — Stream termination

Streams MUST define normal completion, cancellation, deadline, Authority or Permission loss, Treaty loss, overload, and integrity-failure closure.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 9. Errors, Denials, Timeouts, Retries, and Cancellation

The stable error model separates validation, authentication, Authority-context failure, Permission denial, conflict, not-found, rate, timeout, dependency, integrity, compatibility, Treaty, and internal failure. Retryability is machine-readable and conservative.

## Normative controls

### IX-ERR-001 — Structured errors

Errors MUST use the HAL error schema with stable code, category, retry disposition, correlation, and detail bounded by classification, privacy, and secret-disclosure controls.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-ERR-002 — No sensitive errors

Error messages MUST NOT expose secrets, sensitive payloads, internal credentials, or prohibited inference.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-ERR-003 — Partial result

Partial results MUST be explicitly marked with omitted scopes and MUST NOT be represented as complete.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 10. Versioning, Compatibility, and Deprecation

Contract versions follow semantic compatibility rules. Unknown semantics are rejected. Compatibility adapters are named, reviewed components with evidence; they may translate representation but cannot weaken authority or invent missing meaning.

## Normative controls

### IX-VER-001 — Semantic versioning

Major versions indicate incompatible semantics; minor versions are backward-compatible additions; patches do not change semantics.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-VER-002 — Unknown schema

Unknown or incompatible schemas MUST be rejected or handled by an explicitly approved compatibility adapter.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-VER-003 — Consumer tolerance

Consumers MAY ignore declared extension fields but MUST reject unknown required semantics.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-VER-004 — Deprecation

Deprecation MUST publish replacement, migration evidence, first notice, last supported version, and removal date.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 11. Security, Privacy, Classification, and Evidence

Contracts minimize data, classify sensitive fields, protect each hop, validate inputs and outputs, prevent replay, constrain telemetry, and generate attributable evidence. Access and disclosure are independently authorized.

## Normative controls

### IX-SEC-001 — Transport protection

Confidentiality and integrity MUST protect every non-public hop with authenticated peer identity.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-SEC-002 — Input validation

Receivers MUST validate structure, type, bounds, encoding, canonicalization, classification, current Authority, and the exact Permission decision before use.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-SEC-003 — Replay defense

Protected requests MUST include nonce or idempotency identity, time bounds, and integrity evidence sufficient to detect replay.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 12. External Trust Domains, Treaties, and Constitutional Firewall

Every cross-domain exchange requires authenticated domain identity, active applicable Treaty, permitted purpose/data/capability, and Firewall ingress or egress admission. Revocation, expiry, integrity failure, or drift stops exchange.

## Normative controls

### IX-TRT-001 — Treaty required

Cross-domain exchange MUST cite an active applicable Treaty and MUST fail closed if absent, expired, revoked, or materially drifted.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-TRT-002 — Firewall admission

Every external ingress and egress MUST pass the Constitutional Firewall; direct bypass is prohibited.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-TRT-003 — Separate approvals

Treaty approval MUST NOT substitute for capability-class or action authority approval.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 13. Observability Contracts and Operational Limits

Contract telemetry provides correlation, outcome, latency, saturation, retry, denial, and integrity signals bounded by classification, privacy, retention, and secret-disclosure controls. Rate, size, concurrency, batch, queue, and stream budgets are declared and enforced without silent truncation.

## Normative controls

### IX-OBS-001 — Trace correlation

Interactions MUST emit correlation, causation, contract version, outcome, latency, and policy-decision references.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-OBS-002 — Evidence integrity

Audit evidence MUST be tamper-evident, access-controlled, retention-governed, and attributable.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-OBS-003 — Sensitive telemetry

Telemetry MUST use redaction or references rather than unrestricted sensitive payload copies.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 14. OpenAPI, AsyncAPI, Protocol Buffers, and JSON Schema Profiles

OpenAPI describes request/response bindings; AsyncAPI describes events and channels; Protocol Buffers provide binary service and envelope definitions; JSON Schema is the canonical structural validation profile. Generated bindings remain subordinate to registered semantics.

## Normative controls

### IX-CNF-001 — Schema validation

Every release MUST validate examples and artifacts against the registered schemas.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-CNF-002 — Contract tests

Providers and consumers MUST pass positive, denial, malformed, incompatible, replay, timeout, duplicate, and limit tests.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-CNF-003 — Breaking-change gate

Incompatible change MUST create a new major contract and coexist through the approved migration window.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-CNF-004 — Evidence manifest

Certification MUST bind tested artifacts, hashes, versions, environment, results, and approving roles.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 15. Conformance, Compatibility Testing, and Certification Evidence

Provider and consumer conformance covers happy paths and adversarial cases: malformed data, stale authority, denial, duplicates, replay, incompatible versions, timeout, cancellation, overload, Treaty loss, Firewall rejection, redaction, and recovery.

## Normative controls

### IX-CNF-001 — Schema validation

Every release MUST validate examples and artifacts against the registered schemas.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-CNF-002 — Contract tests

Providers and consumers MUST pass positive, denial, malformed, incompatible, replay, timeout, duplicate, and limit tests.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-CNF-003 — Breaking-change gate

Incompatible change MUST create a new major contract and coexist through the approved migration window.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

### IX-CNF-004 — Evidence manifest

Certification MUST bind tested artifacts, hashes, versions, environment, results, and approving roles.

**Applicability:** All contracts to which this subject applies. **Responsible roles:** provider owner, consumer owner, interface steward, security reviewer. **Enforcement:** schema validation, gateway policy, contract tests, and release gates. **Evidence:** validated artifact, test result, compatibility report, and correlated runtime evidence. **Exception authority:** Interface Steward with Architecture and Security concurrence; no exception may waive Books I-IV. **Verification:** positive and negative conformance tests.

## Required practices

- Providers MUST publish versioned schemas, security and delivery profiles, limits, and supported lifecycle states.
- Consumers MUST validate the registered contract before interpreting payloads and MUST preserve correlation, causation, provenance, and authority evidence.
- Gateways and adapters MUST remain semantically transparent and MUST fail closed when required meaning cannot be preserved.

## Prohibited practices

- Guessing the meaning of an unknown field, version, identity, delegation, Treaty, or result.
- Treating transport success as Authority, Permission, policy admission, effect completion, or constitutional approval.
- Logging unrestricted request or response payloads as a substitute for governed evidence.

## Required evidence and verification

A conforming release produces schema-validation results, provider and consumer contract-test results, compatibility evidence, security-policy decisions, sample trace linkage, negative-test evidence, and a signed artifact manifest. Violations block release or isolate the affected interaction until corrected.

## Examples and anti-patterns

**Example:** A duplicate command with the same semantic payload and idempotency key returns the original disposition and correlation evidence. **Anti-pattern:** a timeout causes a new key and a repeated external purchase without reconciliation.

## Traceability and review

This chapter implements the applicable Book II interface and trust requirements, Book III design/security/testing controls, Book IV logical-interface handoff, and Book X semantics. Constitutional, architectural, engineering, security/privacy, and semantic review status: PASS. Owner Review items: none.

# 16. Contract Catalog and Examples

Each record below formalizes one Book IV logical interface. The common schemas and profiles supply the normative wire fields; provider-specific payload schemas MUST refine, not weaken, them. HTTP routes are canonical bindings for request/response profiles; event channel names are defined by AsyncAPI.

## CMP-01 — Constitutional Kernel

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0001 | CMP-01-IF-01 | Command | Evaluate Protected Action | `/hal/v1/cmp-01/evaluate-protected-action` | Command-Idempotent-v1 |
| IX-C-0002 | CMP-01-IF-02 | Command | Commit Protected Mutation | `/hal/v1/cmp-01/commit-protected-mutation` | Command-Idempotent-v1 |
| IX-C-0003 | CMP-01-IF-03 | Command | Validate Owner Authorization | `/hal/v1/cmp-01/validate-owner-authorization` | Command-Idempotent-v1 |
| IX-C-0004 | CMP-01-IF-04 | Command | Admit Constitutional Recovery | `/hal/v1/cmp-01/admit-constitutional-recovery` | Command-Idempotent-v1 |
| IX-C-0005 | CMP-01-IF-05 | Query | Get Constitutional State | `/hal/v1/cmp-01/get-constitutional-state` | Query-Bounded-v1 |
| IX-C-0006 | CMP-01-IF-06 | Query | Get Protected Decision | `/hal/v1/cmp-01/get-protected-decision` | Query-Bounded-v1 |
| IX-C-0007 | CMP-01-IF-07 | Event | Protected Action Admitted | `hal.cmp-01.protected.action.admitted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0008 | CMP-01-IF-08 | Event | Protected Action Denied | `hal.cmp-01.protected.action.denied.v1` | Event-AtLeastOnce-v1 |
| IX-C-0009 | CMP-01-IF-09 | Event | Constitutional Mode Changed | `hal.cmp-01.constitutional.mode.changed.v1` | Event-AtLeastOnce-v1 |

All CMP-01 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-02 — Identity and Continuity Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0010 | CMP-02-IF-01 | Command | Create Identity | `/hal/v1/cmp-02/create-identity` | Command-Idempotent-v1 |
| IX-C-0011 | CMP-02-IF-02 | Command | Bind Identifier | `/hal/v1/cmp-02/bind-identifier` | Command-Idempotent-v1 |
| IX-C-0012 | CMP-02-IF-03 | Command | Suspend Identity | `/hal/v1/cmp-02/suspend-identity` | Command-Idempotent-v1 |
| IX-C-0013 | CMP-02-IF-04 | Command | Reconcile Continuity | `/hal/v1/cmp-02/reconcile-continuity` | Command-Idempotent-v1 |
| IX-C-0014 | CMP-02-IF-05 | Query | Resolve Identity | `/hal/v1/cmp-02/resolve-identity` | Query-Bounded-v1 |
| IX-C-0015 | CMP-02-IF-06 | Query | Get Continuity Lineage | `/hal/v1/cmp-02/get-continuity-lineage` | Query-Bounded-v1 |
| IX-C-0016 | CMP-02-IF-07 | Query | Get Authentication Context | `/hal/v1/cmp-02/get-authentication-context` | Query-Bounded-v1 |
| IX-C-0017 | CMP-02-IF-08 | Event | Identity Created | `hal.cmp-02.identity.created.v1` | Event-AtLeastOnce-v1 |
| IX-C-0018 | CMP-02-IF-09 | Event | Identity Suspended | `hal.cmp-02.identity.suspended.v1` | Event-AtLeastOnce-v1 |
| IX-C-0019 | CMP-02-IF-10 | Event | Continuity Reconciled | `hal.cmp-02.continuity.reconciled.v1` | Event-AtLeastOnce-v1 |

All CMP-02 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-03 — Authority and Delegation Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0020 | CMP-03-IF-01 | Command | Grant Delegation | `/hal/v1/cmp-03/grant-delegation` | Command-Idempotent-v1 |
| IX-C-0021 | CMP-03-IF-02 | Command | Revoke Delegation | `/hal/v1/cmp-03/revoke-delegation` | Command-Idempotent-v1 |
| IX-C-0022 | CMP-03-IF-03 | Command | Evaluate Permission | `/hal/v1/cmp-03/evaluate-permission` | Command-Idempotent-v1 |
| IX-C-0023 | CMP-03-IF-04 | Command | Expire Delegation | `/hal/v1/cmp-03/expire-delegation` | Command-Idempotent-v1 |
| IX-C-0024 | CMP-03-IF-05 | Query | Get Effective Authority | `/hal/v1/cmp-03/get-effective-authority` | Query-Bounded-v1 |
| IX-C-0025 | CMP-03-IF-06 | Query | Explain Policy Decision | `/hal/v1/cmp-03/explain-policy-decision` | Query-Bounded-v1 |
| IX-C-0026 | CMP-03-IF-07 | Query | List Active Delegations | `/hal/v1/cmp-03/list-active-delegations` | Query-Bounded-v1 |
| IX-C-0027 | CMP-03-IF-08 | Event | Delegation Activated | `hal.cmp-03.delegation.activated.v1` | Event-AtLeastOnce-v1 |
| IX-C-0028 | CMP-03-IF-09 | Event | Delegation Revoked | `hal.cmp-03.delegation.revoked.v1` | Event-AtLeastOnce-v1 |
| IX-C-0029 | CMP-03-IF-10 | Event | Permission Decided | `hal.cmp-03.permission.decided.v1` | Event-AtLeastOnce-v1 |

All CMP-03 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-04 — Intent Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0030 | CMP-04-IF-01 | Command | Register Intent | `/hal/v1/cmp-04/register-intent` | Command-Idempotent-v1 |
| IX-C-0031 | CMP-04-IF-02 | Command | Revise Intent | `/hal/v1/cmp-04/revise-intent` | Command-Idempotent-v1 |
| IX-C-0032 | CMP-04-IF-03 | Command | Decompose Goal | `/hal/v1/cmp-04/decompose-goal` | Command-Idempotent-v1 |
| IX-C-0033 | CMP-04-IF-04 | Command | Retire Intent | `/hal/v1/cmp-04/retire-intent` | Command-Idempotent-v1 |
| IX-C-0034 | CMP-04-IF-05 | Query | Get Intent Graph | `/hal/v1/cmp-04/get-intent-graph` | Query-Bounded-v1 |
| IX-C-0035 | CMP-04-IF-06 | Query | Trace Objective | `/hal/v1/cmp-04/trace-objective` | Query-Bounded-v1 |
| IX-C-0036 | CMP-04-IF-07 | Query | List Outcome Criteria | `/hal/v1/cmp-04/list-outcome-criteria` | Query-Bounded-v1 |
| IX-C-0037 | CMP-04-IF-08 | Event | Intent Registered | `hal.cmp-04.intent.registered.v1` | Event-AtLeastOnce-v1 |
| IX-C-0038 | CMP-04-IF-09 | Event | Intent Revised | `hal.cmp-04.intent.revised.v1` | Event-AtLeastOnce-v1 |
| IX-C-0039 | CMP-04-IF-10 | Event | Objective Retired | `hal.cmp-04.objective.retired.v1` | Event-AtLeastOnce-v1 |

All CMP-04 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-05 — Cognitive Orchestrator

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0040 | CMP-05-IF-01 | Command | Start Orchestration | `/hal/v1/cmp-05/start-orchestration` | Command-Idempotent-v1 |
| IX-C-0041 | CMP-05-IF-02 | Command | Advance Execution Graph | `/hal/v1/cmp-05/advance-execution-graph` | Command-Idempotent-v1 |
| IX-C-0042 | CMP-05-IF-03 | Command | Cancel Run | `/hal/v1/cmp-05/cancel-run` | Command-Idempotent-v1 |
| IX-C-0043 | CMP-05-IF-04 | Command | Request Provider Work | `/hal/v1/cmp-05/request-provider-work` | Command-Idempotent-v1 |
| IX-C-0044 | CMP-05-IF-05 | Query | Get Run State | `/hal/v1/cmp-05/get-run-state` | Query-Bounded-v1 |
| IX-C-0045 | CMP-05-IF-06 | Query | Explain Routing | `/hal/v1/cmp-05/explain-routing` | Query-Bounded-v1 |
| IX-C-0046 | CMP-05-IF-07 | Query | Get Execution Graph | `/hal/v1/cmp-05/get-execution-graph` | Query-Bounded-v1 |
| IX-C-0047 | CMP-05-IF-08 | Event | Run Started | `hal.cmp-05.run.started.v1` | Event-AtLeastOnce-v1 |
| IX-C-0048 | CMP-05-IF-09 | Event | Node Completed | `hal.cmp-05.node.completed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0049 | CMP-05-IF-10 | Event | Run Failed | `hal.cmp-05.run.failed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0050 | CMP-05-IF-11 | Event | Result Assembled | `hal.cmp-05.result.assembled.v1` | Event-AtLeastOnce-v1 |

All CMP-05 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-06 — Attention Manager

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0051 | CMP-06-IF-01 | Command | Submit Attention Request | `/hal/v1/cmp-06/submit-attention-request` | Command-Idempotent-v1 |
| IX-C-0052 | CMP-06-IF-02 | Command | Admit Work | `/hal/v1/cmp-06/admit-work` | Command-Idempotent-v1 |
| IX-C-0053 | CMP-06-IF-03 | Command | Preempt Work | `/hal/v1/cmp-06/preempt-work` | Command-Idempotent-v1 |
| IX-C-0054 | CMP-06-IF-04 | Command | Release Placement | `/hal/v1/cmp-06/release-placement` | Command-Idempotent-v1 |
| IX-C-0055 | CMP-06-IF-05 | Query | Get Queue State | `/hal/v1/cmp-06/get-queue-state` | Query-Bounded-v1 |
| IX-C-0056 | CMP-06-IF-06 | Query | Explain Priority | `/hal/v1/cmp-06/explain-priority` | Query-Bounded-v1 |
| IX-C-0057 | CMP-06-IF-07 | Query | Get Placement | `/hal/v1/cmp-06/get-placement` | Query-Bounded-v1 |
| IX-C-0058 | CMP-06-IF-08 | Event | Work Admitted | `hal.cmp-06.work.admitted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0059 | CMP-06-IF-09 | Event | Work Preempted | `hal.cmp-06.work.preempted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0060 | CMP-06-IF-10 | Event | Placement Released | `hal.cmp-06.placement.released.v1` | Event-AtLeastOnce-v1 |

All CMP-06 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-07 — Judgment Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0061 | CMP-07-IF-01 | Command | Request Judgment | `/hal/v1/cmp-07/request-judgment` | Command-Idempotent-v1 |
| IX-C-0062 | CMP-07-IF-02 | Command | Record Decision | `/hal/v1/cmp-07/record-decision` | Command-Idempotent-v1 |
| IX-C-0063 | CMP-07-IF-03 | Command | Reconsider Decision | `/hal/v1/cmp-07/reconsider-decision` | Command-Idempotent-v1 |
| IX-C-0064 | CMP-07-IF-04 | Command | Withdraw Decision | `/hal/v1/cmp-07/withdraw-decision` | Command-Idempotent-v1 |
| IX-C-0065 | CMP-07-IF-05 | Query | Get Decision Object | `/hal/v1/cmp-07/get-decision-object` | Query-Bounded-v1 |
| IX-C-0066 | CMP-07-IF-06 | Query | Explain Rationale | `/hal/v1/cmp-07/explain-rationale` | Query-Bounded-v1 |
| IX-C-0067 | CMP-07-IF-07 | Query | List Alternatives | `/hal/v1/cmp-07/list-alternatives` | Query-Bounded-v1 |
| IX-C-0068 | CMP-07-IF-08 | Event | Decision Recorded | `hal.cmp-07.decision.recorded.v1` | Event-AtLeastOnce-v1 |
| IX-C-0069 | CMP-07-IF-09 | Event | Decision Reconsidered | `hal.cmp-07.decision.reconsidered.v1` | Event-AtLeastOnce-v1 |
| IX-C-0070 | CMP-07-IF-10 | Event | Decision Withdrawn | `hal.cmp-07.decision.withdrawn.v1` | Event-AtLeastOnce-v1 |

All CMP-07 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-08 — Knowledge Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0071 | CMP-08-IF-01 | Command | Admit Knowledge Assertion | `/hal/v1/cmp-08/admit-knowledge-assertion` | Command-Idempotent-v1 |
| IX-C-0072 | CMP-08-IF-02 | Command | Revise Knowledge Link | `/hal/v1/cmp-08/revise-knowledge-link` | Command-Idempotent-v1 |
| IX-C-0073 | CMP-08-IF-03 | Command | Invalidate Assertion | `/hal/v1/cmp-08/invalidate-assertion` | Command-Idempotent-v1 |
| IX-C-0074 | CMP-08-IF-04 | Command | Rebuild Index | `/hal/v1/cmp-08/rebuild-index` | Command-Idempotent-v1 |
| IX-C-0075 | CMP-08-IF-05 | Query | Query Knowledge | `/hal/v1/cmp-08/query-knowledge` | Query-Bounded-v1 |
| IX-C-0076 | CMP-08-IF-06 | Query | Trace Provenance | `/hal/v1/cmp-08/trace-provenance` | Query-Bounded-v1 |
| IX-C-0077 | CMP-08-IF-07 | Query | Get Validity Context | `/hal/v1/cmp-08/get-validity-context` | Query-Bounded-v1 |
| IX-C-0078 | CMP-08-IF-08 | Event | Knowledge Admitted | `hal.cmp-08.knowledge.admitted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0079 | CMP-08-IF-09 | Event | Assertion Invalidated | `hal.cmp-08.assertion.invalidated.v1` | Event-AtLeastOnce-v1 |
| IX-C-0080 | CMP-08-IF-10 | Event | Index Rebuilt | `hal.cmp-08.index.rebuilt.v1` | Event-AtLeastOnce-v1 |

All CMP-08 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-09 — Memory System

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0081 | CMP-09-IF-01 | Command | Store Memory Association | `/hal/v1/cmp-09/store-memory-association` | Command-Idempotent-v1 |
| IX-C-0082 | CMP-09-IF-02 | Command | Revise Association | `/hal/v1/cmp-09/revise-association` | Command-Idempotent-v1 |
| IX-C-0083 | CMP-09-IF-03 | Command | Forget Memory | `/hal/v1/cmp-09/forget-memory` | Command-Idempotent-v1 |
| IX-C-0084 | CMP-09-IF-04 | Command | Reconcile Conversation | `/hal/v1/cmp-09/reconcile-conversation` | Command-Idempotent-v1 |
| IX-C-0085 | CMP-09-IF-05 | Query | Recall Memory | `/hal/v1/cmp-09/recall-memory` | Query-Bounded-v1 |
| IX-C-0086 | CMP-09-IF-06 | Query | Trace Memory Source | `/hal/v1/cmp-09/trace-memory-source` | Query-Bounded-v1 |
| IX-C-0087 | CMP-09-IF-07 | Query | Get Retention Status | `/hal/v1/cmp-09/get-retention-status` | Query-Bounded-v1 |
| IX-C-0088 | CMP-09-IF-08 | Event | Memory Associated | `hal.cmp-09.memory.associated.v1` | Event-AtLeastOnce-v1 |
| IX-C-0089 | CMP-09-IF-09 | Event | Memory Forgotten | `hal.cmp-09.memory.forgotten.v1` | Event-AtLeastOnce-v1 |
| IX-C-0090 | CMP-09-IF-10 | Event | Conversation Reconciled | `hal.cmp-09.conversation.reconciled.v1` | Event-AtLeastOnce-v1 |

All CMP-09 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-10 — Learning and Wisdom System

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0091 | CMP-10-IF-01 | Command | Record Experience | `/hal/v1/cmp-10/record-experience` | Command-Idempotent-v1 |
| IX-C-0092 | CMP-10-IF-02 | Command | Propose Pattern | `/hal/v1/cmp-10/propose-pattern` | Command-Idempotent-v1 |
| IX-C-0093 | CMP-10-IF-03 | Command | Promote Pattern | `/hal/v1/cmp-10/promote-pattern` | Command-Idempotent-v1 |
| IX-C-0094 | CMP-10-IF-04 | Command | Retire Wisdom | `/hal/v1/cmp-10/retire-wisdom` | Command-Idempotent-v1 |
| IX-C-0095 | CMP-10-IF-05 | Query | Get Experience | `/hal/v1/cmp-10/get-experience` | Query-Bounded-v1 |
| IX-C-0096 | CMP-10-IF-06 | Query | Explain Pattern | `/hal/v1/cmp-10/explain-pattern` | Query-Bounded-v1 |
| IX-C-0097 | CMP-10-IF-07 | Query | Get Wisdom Limits | `/hal/v1/cmp-10/get-wisdom-limits` | Query-Bounded-v1 |
| IX-C-0098 | CMP-10-IF-08 | Event | Experience Recorded | `hal.cmp-10.experience.recorded.v1` | Event-AtLeastOnce-v1 |
| IX-C-0099 | CMP-10-IF-09 | Event | Pattern Promoted | `hal.cmp-10.pattern.promoted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0100 | CMP-10-IF-10 | Event | Wisdom Retired | `hal.cmp-10.wisdom.retired.v1` | Event-AtLeastOnce-v1 |

All CMP-10 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-11 — Temporal Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0101 | CMP-11-IF-01 | Command | Issue Lease | `/hal/v1/cmp-11/issue-lease` | Command-Idempotent-v1 |
| IX-C-0102 | CMP-11-IF-02 | Command | Renew Lease | `/hal/v1/cmp-11/renew-lease` | Command-Idempotent-v1 |
| IX-C-0103 | CMP-11-IF-03 | Command | Record Logical Time | `/hal/v1/cmp-11/record-logical-time` | Command-Idempotent-v1 |
| IX-C-0104 | CMP-11-IF-04 | Command | Declare Time Source Degraded | `/hal/v1/cmp-11/declare-time-source-degraded` | Command-Idempotent-v1 |
| IX-C-0105 | CMP-11-IF-05 | Query | Get Current Time Context | `/hal/v1/cmp-11/get-current-time-context` | Query-Bounded-v1 |
| IX-C-0106 | CMP-11-IF-06 | Query | Compare Causality | `/hal/v1/cmp-11/compare-causality` | Query-Bounded-v1 |
| IX-C-0107 | CMP-11-IF-07 | Query | Get Freshness | `/hal/v1/cmp-11/get-freshness` | Query-Bounded-v1 |
| IX-C-0108 | CMP-11-IF-08 | Event | Lease Issued | `hal.cmp-11.lease.issued.v1` | Event-AtLeastOnce-v1 |
| IX-C-0109 | CMP-11-IF-09 | Event | Lease Expired | `hal.cmp-11.lease.expired.v1` | Event-AtLeastOnce-v1 |
| IX-C-0110 | CMP-11-IF-10 | Event | Time Source Degraded | `hal.cmp-11.time.source.degraded.v1` | Event-AtLeastOnce-v1 |

All CMP-11 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-12 — Presence and Embodiment Layer

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0111 | CMP-12-IF-01 | Command | Create Presence | `/hal/v1/cmp-12/create-presence` | Command-Idempotent-v1 |
| IX-C-0112 | CMP-12-IF-02 | Command | Bind Embodiment | `/hal/v1/cmp-12/bind-embodiment` | Command-Idempotent-v1 |
| IX-C-0113 | CMP-12-IF-03 | Command | Handoff Presence | `/hal/v1/cmp-12/handoff-presence` | Command-Idempotent-v1 |
| IX-C-0114 | CMP-12-IF-04 | Command | End Presence | `/hal/v1/cmp-12/end-presence` | Command-Idempotent-v1 |
| IX-C-0115 | CMP-12-IF-05 | Query | Get Presence Context | `/hal/v1/cmp-12/get-presence-context` | Query-Bounded-v1 |
| IX-C-0116 | CMP-12-IF-06 | Query | List Embodiments | `/hal/v1/cmp-12/list-embodiments` | Query-Bounded-v1 |
| IX-C-0117 | CMP-12-IF-07 | Query | Get Audience Context | `/hal/v1/cmp-12/get-audience-context` | Query-Bounded-v1 |
| IX-C-0118 | CMP-12-IF-08 | Event | Presence Created | `hal.cmp-12.presence.created.v1` | Event-AtLeastOnce-v1 |
| IX-C-0119 | CMP-12-IF-09 | Event | Embodiment Bound | `hal.cmp-12.embodiment.bound.v1` | Event-AtLeastOnce-v1 |
| IX-C-0120 | CMP-12-IF-10 | Event | Presence Handed Off | `hal.cmp-12.presence.handed.off.v1` | Event-AtLeastOnce-v1 |

All CMP-12 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-13 — Capability Registry

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0121 | CMP-13-IF-01 | Command | Register Capability | `/hal/v1/cmp-13/register-capability` | Command-Idempotent-v1 |
| IX-C-0122 | CMP-13-IF-02 | Command | Register Provider | `/hal/v1/cmp-13/register-provider` | Command-Idempotent-v1 |
| IX-C-0123 | CMP-13-IF-03 | Command | Qualify Provider | `/hal/v1/cmp-13/qualify-provider` | Command-Idempotent-v1 |
| IX-C-0124 | CMP-13-IF-04 | Command | Retire Adapter | `/hal/v1/cmp-13/retire-adapter` | Command-Idempotent-v1 |
| IX-C-0125 | CMP-13-IF-05 | Query | Discover Capability | `/hal/v1/cmp-13/discover-capability` | Query-Bounded-v1 |
| IX-C-0126 | CMP-13-IF-06 | Query | Get Provider Qualification | `/hal/v1/cmp-13/get-provider-qualification` | Query-Bounded-v1 |
| IX-C-0127 | CMP-13-IF-07 | Query | Resolve Adapter | `/hal/v1/cmp-13/resolve-adapter` | Query-Bounded-v1 |
| IX-C-0128 | CMP-13-IF-08 | Event | Capability Registered | `hal.cmp-13.capability.registered.v1` | Event-AtLeastOnce-v1 |
| IX-C-0129 | CMP-13-IF-09 | Event | Provider Qualified | `hal.cmp-13.provider.qualified.v1` | Event-AtLeastOnce-v1 |
| IX-C-0130 | CMP-13-IF-10 | Event | Provider Quarantined | `hal.cmp-13.provider.quarantined.v1` | Event-AtLeastOnce-v1 |

All CMP-13 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-14 — Action and Transaction Engine

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0131 | CMP-14-IF-01 | Command | Propose Action | `/hal/v1/cmp-14/propose-action` | Command-Idempotent-v1 |
| IX-C-0132 | CMP-14-IF-02 | Command | Prepare Transaction | `/hal/v1/cmp-14/prepare-transaction` | Command-Idempotent-v1 |
| IX-C-0133 | CMP-14-IF-03 | Command | Commit Transaction | `/hal/v1/cmp-14/commit-transaction` | Command-Idempotent-v1 |
| IX-C-0134 | CMP-14-IF-04 | Command | Rollback Transaction | `/hal/v1/cmp-14/rollback-transaction` | Command-Idempotent-v1 |
| IX-C-0135 | CMP-14-IF-05 | Command | Begin Compensation | `/hal/v1/cmp-14/begin-compensation` | Command-Idempotent-v1 |
| IX-C-0136 | CMP-14-IF-06 | Query | Get Transaction State | `/hal/v1/cmp-14/get-transaction-state` | Query-Bounded-v1 |
| IX-C-0137 | CMP-14-IF-07 | Query | Explain Commit Decision | `/hal/v1/cmp-14/explain-commit-decision` | Query-Bounded-v1 |
| IX-C-0138 | CMP-14-IF-08 | Query | Get Idempotency Result | `/hal/v1/cmp-14/get-idempotency-result` | Query-Bounded-v1 |
| IX-C-0139 | CMP-14-IF-09 | Event | Action Authorized | `hal.cmp-14.action.authorized.v1` | Event-AtLeastOnce-v1 |
| IX-C-0140 | CMP-14-IF-10 | Event | Transaction Committed | `hal.cmp-14.transaction.committed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0141 | CMP-14-IF-11 | Event | Transaction Rolled Back | `hal.cmp-14.transaction.rolled.back.v1` | Event-AtLeastOnce-v1 |
| IX-C-0142 | CMP-14-IF-12 | Event | Compensation Started | `hal.cmp-14.compensation.started.v1` | Event-AtLeastOnce-v1 |

All CMP-14 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-15 — Verification Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0143 | CMP-15-IF-01 | Command | Start Verification | `/hal/v1/cmp-15/start-verification` | Command-Idempotent-v1 |
| IX-C-0144 | CMP-15-IF-02 | Command | Record Verification Result | `/hal/v1/cmp-15/record-verification-result` | Command-Idempotent-v1 |
| IX-C-0145 | CMP-15-IF-03 | Command | Invalidate Result | `/hal/v1/cmp-15/invalidate-result` | Command-Idempotent-v1 |
| IX-C-0146 | CMP-15-IF-04 | Command | Request Reproduction | `/hal/v1/cmp-15/request-reproduction` | Command-Idempotent-v1 |
| IX-C-0147 | CMP-15-IF-05 | Query | Get Verification Result | `/hal/v1/cmp-15/get-verification-result` | Query-Bounded-v1 |
| IX-C-0148 | CMP-15-IF-06 | Query | Explain Confidence | `/hal/v1/cmp-15/explain-confidence` | Query-Bounded-v1 |
| IX-C-0149 | CMP-15-IF-07 | Query | List Defeaters | `/hal/v1/cmp-15/list-defeaters` | Query-Bounded-v1 |
| IX-C-0150 | CMP-15-IF-08 | Event | Verification Started | `hal.cmp-15.verification.started.v1` | Event-AtLeastOnce-v1 |
| IX-C-0151 | CMP-15-IF-09 | Event | Claim Verified | `hal.cmp-15.claim.verified.v1` | Event-AtLeastOnce-v1 |
| IX-C-0152 | CMP-15-IF-10 | Event | Claim Falsified | `hal.cmp-15.claim.falsified.v1` | Event-AtLeastOnce-v1 |
| IX-C-0153 | CMP-15-IF-11 | Event | Result Invalidated | `hal.cmp-15.result.invalidated.v1` | Event-AtLeastOnce-v1 |

All CMP-15 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-16 — Simulation and Digital Twin Platform

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0154 | CMP-16-IF-01 | Command | Create Simulation | `/hal/v1/cmp-16/create-simulation` | Command-Idempotent-v1 |
| IX-C-0155 | CMP-16-IF-02 | Command | Load Twin State | `/hal/v1/cmp-16/load-twin-state` | Command-Idempotent-v1 |
| IX-C-0156 | CMP-16-IF-03 | Command | Run Scenario | `/hal/v1/cmp-16/run-scenario` | Command-Idempotent-v1 |
| IX-C-0157 | CMP-16-IF-04 | Command | Inject Failure | `/hal/v1/cmp-16/inject-failure` | Command-Idempotent-v1 |
| IX-C-0158 | CMP-16-IF-05 | Command | Terminate Simulation | `/hal/v1/cmp-16/terminate-simulation` | Command-Idempotent-v1 |
| IX-C-0159 | CMP-16-IF-06 | Query | Get Scenario Result | `/hal/v1/cmp-16/get-scenario-result` | Query-Bounded-v1 |
| IX-C-0160 | CMP-16-IF-07 | Query | Get Fidelity Score | `/hal/v1/cmp-16/get-fidelity-score` | Query-Bounded-v1 |
| IX-C-0161 | CMP-16-IF-08 | Query | Get Isolation Status | `/hal/v1/cmp-16/get-isolation-status` | Query-Bounded-v1 |
| IX-C-0162 | CMP-16-IF-09 | Event | Simulation Started | `hal.cmp-16.simulation.started.v1` | Event-AtLeastOnce-v1 |
| IX-C-0163 | CMP-16-IF-10 | Event | Scenario Completed | `hal.cmp-16.scenario.completed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0164 | CMP-16-IF-11 | Event | Isolation Breach Detected | `hal.cmp-16.isolation.breach.detected.v1` | Event-AtLeastOnce-v1 |

All CMP-16 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-17 — Trust Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0165 | CMP-17-IF-01 | Command | Request Trust Assessment | `/hal/v1/cmp-17/request-trust-assessment` | Command-Idempotent-v1 |
| IX-C-0166 | CMP-17-IF-02 | Command | Update Trust Dimension | `/hal/v1/cmp-17/update-trust-dimension` | Command-Idempotent-v1 |
| IX-C-0167 | CMP-17-IF-03 | Command | Invalidate Assessment | `/hal/v1/cmp-17/invalidate-assessment` | Command-Idempotent-v1 |
| IX-C-0168 | CMP-17-IF-04 | Query | Get Trust Assessment | `/hal/v1/cmp-17/get-trust-assessment` | Query-Bounded-v1 |
| IX-C-0169 | CMP-17-IF-05 | Query | Explain Trust Basis | `/hal/v1/cmp-17/explain-trust-basis` | Query-Bounded-v1 |
| IX-C-0170 | CMP-17-IF-06 | Query | List Expiring Assessments | `/hal/v1/cmp-17/list-expiring-assessments` | Query-Bounded-v1 |
| IX-C-0171 | CMP-17-IF-07 | Event | Trust Assessed | `hal.cmp-17.trust.assessed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0172 | CMP-17-IF-08 | Event | Trust Degraded | `hal.cmp-17.trust.degraded.v1` | Event-AtLeastOnce-v1 |
| IX-C-0173 | CMP-17-IF-09 | Event | Assessment Expired | `hal.cmp-17.assessment.expired.v1` | Event-AtLeastOnce-v1 |

All CMP-17 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-18 — Evidence Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0174 | CMP-18-IF-01 | Command | Submit Evidence Candidate | `/hal/v1/cmp-18/submit-evidence-candidate` | Command-Idempotent-v1 |
| IX-C-0175 | CMP-18-IF-02 | Command | Admit Evidence Object | `/hal/v1/cmp-18/admit-evidence-object` | Command-Idempotent-v1 |
| IX-C-0176 | CMP-18-IF-03 | Command | Challenge Evidence | `/hal/v1/cmp-18/challenge-evidence` | Command-Idempotent-v1 |
| IX-C-0177 | CMP-18-IF-04 | Command | Record Supersession | `/hal/v1/cmp-18/record-supersession` | Command-Idempotent-v1 |
| IX-C-0178 | CMP-18-IF-05 | Query | Get Evidence Object | `/hal/v1/cmp-18/get-evidence-object` | Query-Bounded-v1 |
| IX-C-0179 | CMP-18-IF-06 | Query | Trace Custody | `/hal/v1/cmp-18/trace-custody` | Query-Bounded-v1 |
| IX-C-0180 | CMP-18-IF-07 | Query | Verify Evidence Integrity | `/hal/v1/cmp-18/verify-evidence-integrity` | Query-Bounded-v1 |
| IX-C-0181 | CMP-18-IF-08 | Event | Evidence Admitted | `hal.cmp-18.evidence.admitted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0182 | CMP-18-IF-09 | Event | Evidence Challenged | `hal.cmp-18.evidence.challenged.v1` | Event-AtLeastOnce-v1 |
| IX-C-0183 | CMP-18-IF-10 | Event | Evidence Superseded | `hal.cmp-18.evidence.superseded.v1` | Event-AtLeastOnce-v1 |

All CMP-18 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-19 — Privacy and Data Governance Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0184 | CMP-19-IF-01 | Command | Classify Data | `/hal/v1/cmp-19/classify-data` | Command-Idempotent-v1 |
| IX-C-0185 | CMP-19-IF-02 | Command | Authorize Purpose | `/hal/v1/cmp-19/authorize-purpose` | Command-Idempotent-v1 |
| IX-C-0186 | CMP-19-IF-03 | Command | Set Retention | `/hal/v1/cmp-19/set-retention` | Command-Idempotent-v1 |
| IX-C-0187 | CMP-19-IF-04 | Command | Order Deletion | `/hal/v1/cmp-19/order-deletion` | Command-Idempotent-v1 |
| IX-C-0188 | CMP-19-IF-05 | Command | Restrict Disclosure | `/hal/v1/cmp-19/restrict-disclosure` | Command-Idempotent-v1 |
| IX-C-0189 | CMP-19-IF-06 | Query | Get Data Policy | `/hal/v1/cmp-19/get-data-policy` | Query-Bounded-v1 |
| IX-C-0190 | CMP-19-IF-07 | Query | Evaluate Data Use | `/hal/v1/cmp-19/evaluate-data-use` | Query-Bounded-v1 |
| IX-C-0191 | CMP-19-IF-08 | Query | Get Deletion Status | `/hal/v1/cmp-19/get-deletion-status` | Query-Bounded-v1 |
| IX-C-0192 | CMP-19-IF-09 | Event | Data Classified | `hal.cmp-19.data.classified.v1` | Event-AtLeastOnce-v1 |
| IX-C-0193 | CMP-19-IF-10 | Event | Purpose Authorized | `hal.cmp-19.purpose.authorized.v1` | Event-AtLeastOnce-v1 |
| IX-C-0194 | CMP-19-IF-11 | Event | Deletion Completed | `hal.cmp-19.deletion.completed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0195 | CMP-19-IF-12 | Event | Use Denied | `hal.cmp-19.use.denied.v1` | Event-AtLeastOnce-v1 |

All CMP-19 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-20 — Constitutional Firewall

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0196 | CMP-20-IF-01 | Command | Open Domain Session | `/hal/v1/cmp-20/open-domain-session` | Command-Idempotent-v1 |
| IX-C-0197 | CMP-20-IF-02 | Command | Authorize Exchange | `/hal/v1/cmp-20/authorize-exchange` | Command-Idempotent-v1 |
| IX-C-0198 | CMP-20-IF-03 | Command | Terminate Exchange | `/hal/v1/cmp-20/terminate-exchange` | Command-Idempotent-v1 |
| IX-C-0199 | CMP-20-IF-04 | Command | Quarantine Payload | `/hal/v1/cmp-20/quarantine-payload` | Command-Idempotent-v1 |
| IX-C-0200 | CMP-20-IF-05 | Query | Get Firewall Decision | `/hal/v1/cmp-20/get-firewall-decision` | Query-Bounded-v1 |
| IX-C-0201 | CMP-20-IF-06 | Query | Get Active Treaty View | `/hal/v1/cmp-20/get-active-treaty-view` | Query-Bounded-v1 |
| IX-C-0202 | CMP-20-IF-07 | Query | Explain Denial | `/hal/v1/cmp-20/explain-denial` | Query-Bounded-v1 |
| IX-C-0203 | CMP-20-IF-08 | Event | Exchange Allowed | `hal.cmp-20.exchange.allowed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0204 | CMP-20-IF-09 | Event | Exchange Denied | `hal.cmp-20.exchange.denied.v1` | Event-AtLeastOnce-v1 |
| IX-C-0205 | CMP-20-IF-10 | Event | Domain Session Terminated | `hal.cmp-20.domain.session.terminated.v1` | Event-AtLeastOnce-v1 |

All CMP-20 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-21 — Treaty Manager

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0206 | CMP-21-IF-01 | Command | Propose Treaty | `/hal/v1/cmp-21/propose-treaty` | Command-Idempotent-v1 |
| IX-C-0207 | CMP-21-IF-02 | Command | Authorize Treaty | `/hal/v1/cmp-21/authorize-treaty` | Command-Idempotent-v1 |
| IX-C-0208 | CMP-21-IF-03 | Command | Activate Treaty | `/hal/v1/cmp-21/activate-treaty` | Command-Idempotent-v1 |
| IX-C-0209 | CMP-21-IF-04 | Command | Suspend Treaty | `/hal/v1/cmp-21/suspend-treaty` | Command-Idempotent-v1 |
| IX-C-0210 | CMP-21-IF-05 | Command | Revoke Treaty | `/hal/v1/cmp-21/revoke-treaty` | Command-Idempotent-v1 |
| IX-C-0211 | CMP-21-IF-06 | Query | Get Treaty | `/hal/v1/cmp-21/get-treaty` | Query-Bounded-v1 |
| IX-C-0212 | CMP-21-IF-07 | Query | Compare Treaty Version | `/hal/v1/cmp-21/compare-treaty-version` | Query-Bounded-v1 |
| IX-C-0213 | CMP-21-IF-08 | Query | List Active Treaties | `/hal/v1/cmp-21/list-active-treaties` | Query-Bounded-v1 |
| IX-C-0214 | CMP-21-IF-09 | Event | Treaty Proposed | `hal.cmp-21.treaty.proposed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0215 | CMP-21-IF-10 | Event | Treaty Activated | `hal.cmp-21.treaty.activated.v1` | Event-AtLeastOnce-v1 |
| IX-C-0216 | CMP-21-IF-11 | Event | Treaty Suspended | `hal.cmp-21.treaty.suspended.v1` | Event-AtLeastOnce-v1 |
| IX-C-0217 | CMP-21-IF-12 | Event | Treaty Revoked | `hal.cmp-21.treaty.revoked.v1` | Event-AtLeastOnce-v1 |

All CMP-21 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-22 — Event and Messaging Platform

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0218 | CMP-22-IF-01 | Command | Publish Command | `/hal/v1/cmp-22/publish-command` | Command-Idempotent-v1 |
| IX-C-0219 | CMP-22-IF-02 | Command | Append Event | `/hal/v1/cmp-22/append-event` | Command-Idempotent-v1 |
| IX-C-0220 | CMP-22-IF-03 | Command | Acknowledge Delivery | `/hal/v1/cmp-22/acknowledge-delivery` | Command-Idempotent-v1 |
| IX-C-0221 | CMP-22-IF-04 | Command | Quarantine Message | `/hal/v1/cmp-22/quarantine-message` | Command-Idempotent-v1 |
| IX-C-0222 | CMP-22-IF-05 | Query | Query Event Stream | `/hal/v1/cmp-22/query-event-stream` | Query-Bounded-v1 |
| IX-C-0223 | CMP-22-IF-06 | Query | Get Delivery State | `/hal/v1/cmp-22/get-delivery-state` | Query-Bounded-v1 |
| IX-C-0224 | CMP-22-IF-07 | Query | Trace Causation | `/hal/v1/cmp-22/trace-causation` | Query-Bounded-v1 |
| IX-C-0225 | CMP-22-IF-08 | Event | Message Accepted | `hal.cmp-22.message.accepted.v1` | Event-AtLeastOnce-v1 |
| IX-C-0226 | CMP-22-IF-09 | Event | Event Published | `hal.cmp-22.event.published.v1` | Event-AtLeastOnce-v1 |
| IX-C-0227 | CMP-22-IF-10 | Event | Delivery Failed | `hal.cmp-22.delivery.failed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0228 | CMP-22-IF-11 | Event | Message Quarantined | `hal.cmp-22.message.quarantined.v1` | Event-AtLeastOnce-v1 |

All CMP-22 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-23 — State and Persistence Platform

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0229 | CMP-23-IF-01 | Command | Commit State Change | `/hal/v1/cmp-23/commit-state-change` | Command-Idempotent-v1 |
| IX-C-0230 | CMP-23-IF-02 | Command | Create Snapshot | `/hal/v1/cmp-23/create-snapshot` | Command-Idempotent-v1 |
| IX-C-0231 | CMP-23-IF-03 | Command | Migrate Store | `/hal/v1/cmp-23/migrate-store` | Command-Idempotent-v1 |
| IX-C-0232 | CMP-23-IF-04 | Command | Rebuild Projection | `/hal/v1/cmp-23/rebuild-projection` | Command-Idempotent-v1 |
| IX-C-0233 | CMP-23-IF-05 | Query | Read State | `/hal/v1/cmp-23/read-state` | Query-Bounded-v1 |
| IX-C-0234 | CMP-23-IF-06 | Query | Get Version | `/hal/v1/cmp-23/get-version` | Query-Bounded-v1 |
| IX-C-0235 | CMP-23-IF-07 | Query | Verify Replica | `/hal/v1/cmp-23/verify-replica` | Query-Bounded-v1 |
| IX-C-0236 | CMP-23-IF-08 | Query | Get Migration State | `/hal/v1/cmp-23/get-migration-state` | Query-Bounded-v1 |
| IX-C-0237 | CMP-23-IF-09 | Event | State Committed | `hal.cmp-23.state.committed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0238 | CMP-23-IF-10 | Event | Snapshot Created | `hal.cmp-23.snapshot.created.v1` | Event-AtLeastOnce-v1 |
| IX-C-0239 | CMP-23-IF-11 | Event | Migration Completed | `hal.cmp-23.migration.completed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0240 | CMP-23-IF-12 | Event | Replica Diverged | `hal.cmp-23.replica.diverged.v1` | Event-AtLeastOnce-v1 |

All CMP-23 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-24 — Observability and Audit Platform

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0241 | CMP-24-IF-01 | Command | Append Audit Record | `/hal/v1/cmp-24/append-audit-record` | Command-Idempotent-v1 |
| IX-C-0242 | CMP-24-IF-02 | Command | Emit Telemetry | `/hal/v1/cmp-24/emit-telemetry` | Command-Idempotent-v1 |
| IX-C-0243 | CMP-24-IF-03 | Command | Declare Alert | `/hal/v1/cmp-24/declare-alert` | Command-Idempotent-v1 |
| IX-C-0244 | CMP-24-IF-04 | Command | Seal Audit Segment | `/hal/v1/cmp-24/seal-audit-segment` | Command-Idempotent-v1 |
| IX-C-0245 | CMP-24-IF-05 | Query | Query Audit Ledger | `/hal/v1/cmp-24/query-audit-ledger` | Query-Bounded-v1 |
| IX-C-0246 | CMP-24-IF-06 | Query | Get Trace | `/hal/v1/cmp-24/get-trace` | Query-Bounded-v1 |
| IX-C-0247 | CMP-24-IF-07 | Query | Get Metric | `/hal/v1/cmp-24/get-metric` | Query-Bounded-v1 |
| IX-C-0248 | CMP-24-IF-08 | Query | Verify Audit Chain | `/hal/v1/cmp-24/verify-audit-chain` | Query-Bounded-v1 |
| IX-C-0249 | CMP-24-IF-09 | Event | Audit Record Appended | `hal.cmp-24.audit.record.appended.v1` | Event-AtLeastOnce-v1 |
| IX-C-0250 | CMP-24-IF-10 | Event | Alert Raised | `hal.cmp-24.alert.raised.v1` | Event-AtLeastOnce-v1 |
| IX-C-0251 | CMP-24-IF-11 | Event | Audit Chain Broken | `hal.cmp-24.audit.chain.broken.v1` | Event-AtLeastOnce-v1 |

All CMP-24 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-25 — Runtime Supervisor

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0252 | CMP-25-IF-01 | Command | Start Service | `/hal/v1/cmp-25/start-service` | Command-Idempotent-v1 |
| IX-C-0253 | CMP-25-IF-02 | Command | Stop Service | `/hal/v1/cmp-25/stop-service` | Command-Idempotent-v1 |
| IX-C-0254 | CMP-25-IF-03 | Command | Restart Service | `/hal/v1/cmp-25/restart-service` | Command-Idempotent-v1 |
| IX-C-0255 | CMP-25-IF-04 | Command | Enter Degraded Mode | `/hal/v1/cmp-25/enter-degraded-mode` | Command-Idempotent-v1 |
| IX-C-0256 | CMP-25-IF-05 | Command | Quarantine Service | `/hal/v1/cmp-25/quarantine-service` | Command-Idempotent-v1 |
| IX-C-0257 | CMP-25-IF-06 | Query | Get Service State | `/hal/v1/cmp-25/get-service-state` | Query-Bounded-v1 |
| IX-C-0258 | CMP-25-IF-07 | Query | Get Health | `/hal/v1/cmp-25/get-health` | Query-Bounded-v1 |
| IX-C-0259 | CMP-25-IF-08 | Query | Get Resource Use | `/hal/v1/cmp-25/get-resource-use` | Query-Bounded-v1 |
| IX-C-0260 | CMP-25-IF-09 | Event | Service Ready | `hal.cmp-25.service.ready.v1` | Event-AtLeastOnce-v1 |
| IX-C-0261 | CMP-25-IF-10 | Event | Service Degraded | `hal.cmp-25.service.degraded.v1` | Event-AtLeastOnce-v1 |
| IX-C-0262 | CMP-25-IF-11 | Event | Service Quarantined | `hal.cmp-25.service.quarantined.v1` | Event-AtLeastOnce-v1 |
| IX-C-0263 | CMP-25-IF-12 | Event | Service Stopped | `hal.cmp-25.service.stopped.v1` | Event-AtLeastOnce-v1 |

All CMP-25 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-26 — Recovery Coordinator

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0264 | CMP-26-IF-01 | Command | Open Recovery Case | `/hal/v1/cmp-26/open-recovery-case` | Command-Idempotent-v1 |
| IX-C-0265 | CMP-26-IF-02 | Command | Authorize Recovery Step | `/hal/v1/cmp-26/authorize-recovery-step` | Command-Idempotent-v1 |
| IX-C-0266 | CMP-26-IF-03 | Command | Restore State | `/hal/v1/cmp-26/restore-state` | Command-Idempotent-v1 |
| IX-C-0267 | CMP-26-IF-04 | Command | Reconcile Partition | `/hal/v1/cmp-26/reconcile-partition` | Command-Idempotent-v1 |
| IX-C-0268 | CMP-26-IF-05 | Command | Close Recovery | `/hal/v1/cmp-26/close-recovery` | Command-Idempotent-v1 |
| IX-C-0269 | CMP-26-IF-06 | Query | Get Recovery State | `/hal/v1/cmp-26/get-recovery-state` | Query-Bounded-v1 |
| IX-C-0270 | CMP-26-IF-07 | Query | Get RPO/RTO Result | `/hal/v1/cmp-26/get-rpo-rto-result` | Query-Bounded-v1 |
| IX-C-0271 | CMP-26-IF-08 | Query | Explain Reconciliation | `/hal/v1/cmp-26/explain-reconciliation` | Query-Bounded-v1 |
| IX-C-0272 | CMP-26-IF-09 | Event | Recovery Started | `hal.cmp-26.recovery.started.v1` | Event-AtLeastOnce-v1 |
| IX-C-0273 | CMP-26-IF-10 | Event | State Restored | `hal.cmp-26.state.restored.v1` | Event-AtLeastOnce-v1 |
| IX-C-0274 | CMP-26-IF-11 | Event | Partition Reconciled | `hal.cmp-26.partition.reconciled.v1` | Event-AtLeastOnce-v1 |
| IX-C-0275 | CMP-26-IF-12 | Event | Recovery Failed | `hal.cmp-26.recovery.failed.v1` | Event-AtLeastOnce-v1 |

All CMP-26 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-27 — Human Interaction Layer

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0276 | CMP-27-IF-01 | Command | Start Interaction | `/hal/v1/cmp-27/start-interaction` | Command-Idempotent-v1 |
| IX-C-0277 | CMP-27-IF-02 | Command | Submit Human Input | `/hal/v1/cmp-27/submit-human-input` | Command-Idempotent-v1 |
| IX-C-0278 | CMP-27-IF-03 | Command | Request Confirmation | `/hal/v1/cmp-27/request-confirmation` | Command-Idempotent-v1 |
| IX-C-0279 | CMP-27-IF-04 | Command | End Interaction | `/hal/v1/cmp-27/end-interaction` | Command-Idempotent-v1 |
| IX-C-0280 | CMP-27-IF-05 | Query | Get Session State | `/hal/v1/cmp-27/get-session-state` | Query-Bounded-v1 |
| IX-C-0281 | CMP-27-IF-06 | Query | Get Accessible Representation | `/hal/v1/cmp-27/get-accessible-representation` | Query-Bounded-v1 |
| IX-C-0282 | CMP-27-IF-07 | Query | Get Action Status | `/hal/v1/cmp-27/get-action-status` | Query-Bounded-v1 |
| IX-C-0283 | CMP-27-IF-08 | Event | Interaction Started | `hal.cmp-27.interaction.started.v1` | Event-AtLeastOnce-v1 |
| IX-C-0284 | CMP-27-IF-09 | Event | Clarification Requested | `hal.cmp-27.clarification.requested.v1` | Event-AtLeastOnce-v1 |
| IX-C-0285 | CMP-27-IF-10 | Event | Confirmation Recorded | `hal.cmp-27.confirmation.recorded.v1` | Event-AtLeastOnce-v1 |
| IX-C-0286 | CMP-27-IF-11 | Event | Interaction Ended | `hal.cmp-27.interaction.ended.v1` | Event-AtLeastOnce-v1 |

All CMP-27 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-28 — Self-Model and Constitutional Mirror

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0287 | CMP-28-IF-01 | Command | Refresh Self Model | `/hal/v1/cmp-28/refresh-self-model` | Command-Idempotent-v1 |
| IX-C-0288 | CMP-28-IF-02 | Command | Publish Constitutional Mirror | `/hal/v1/cmp-28/publish-constitutional-mirror` | Command-Idempotent-v1 |
| IX-C-0289 | CMP-28-IF-03 | Command | Invalidate Projection | `/hal/v1/cmp-28/invalidate-projection` | Command-Idempotent-v1 |
| IX-C-0290 | CMP-28-IF-04 | Query | Get Self Description | `/hal/v1/cmp-28/get-self-description` | Query-Bounded-v1 |
| IX-C-0291 | CMP-28-IF-05 | Query | Trace Mirror Claim | `/hal/v1/cmp-28/trace-mirror-claim` | Query-Bounded-v1 |
| IX-C-0292 | CMP-28-IF-06 | Query | Get Declared Limitation | `/hal/v1/cmp-28/get-declared-limitation` | Query-Bounded-v1 |
| IX-C-0293 | CMP-28-IF-07 | Event | Self Model Refreshed | `hal.cmp-28.self.model.refreshed.v1` | Event-AtLeastOnce-v1 |
| IX-C-0294 | CMP-28-IF-08 | Event | Mirror Published | `hal.cmp-28.mirror.published.v1` | Event-AtLeastOnce-v1 |
| IX-C-0295 | CMP-28-IF-09 | Event | Projection Invalidated | `hal.cmp-28.projection.invalidated.v1` | Event-AtLeastOnce-v1 |

All CMP-28 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

## CMP-29 — Outcome and Success Evaluation Service

| Contract | Source | Kind | Operation | Binding | Delivery |
|---|---|---|---|---|---|
| IX-C-0296 | CMP-29-IF-01 | Command | Open Outcome Evaluation | `/hal/v1/cmp-29/open-outcome-evaluation` | Command-Idempotent-v1 |
| IX-C-0297 | CMP-29-IF-02 | Command | Record Outcome | `/hal/v1/cmp-29/record-outcome` | Command-Idempotent-v1 |
| IX-C-0298 | CMP-29-IF-03 | Command | Evaluate Success | `/hal/v1/cmp-29/evaluate-success` | Command-Idempotent-v1 |
| IX-C-0299 | CMP-29-IF-04 | Command | Refer Learning | `/hal/v1/cmp-29/refer-learning` | Command-Idempotent-v1 |
| IX-C-0300 | CMP-29-IF-05 | Query | Get Outcome Object | `/hal/v1/cmp-29/get-outcome-object` | Query-Bounded-v1 |
| IX-C-0301 | CMP-29-IF-06 | Query | Explain Success Result | `/hal/v1/cmp-29/explain-success-result` | Query-Bounded-v1 |
| IX-C-0302 | CMP-29-IF-07 | Query | List Side Effects | `/hal/v1/cmp-29/list-side-effects` | Query-Bounded-v1 |
| IX-C-0303 | CMP-29-IF-08 | Event | Outcome Recorded | `hal.cmp-29.outcome.recorded.v1` | Event-AtLeastOnce-v1 |
| IX-C-0304 | CMP-29-IF-09 | Event | Success Evaluated | `hal.cmp-29.success.evaluated.v1` | Event-AtLeastOnce-v1 |
| IX-C-0305 | CMP-29-IF-10 | Event | Review Required | `hal.cmp-29.review.required.v1` | Event-AtLeastOnce-v1 |

All CMP-29 contracts require `HAL-Internal-Authority-v1`, the HAL envelope, structured errors, semantic versioning, bounded limits, and conformance evidence. Their payload semantics remain exactly those stated by Book IV.

# Appendix A — Error Code Registry

| Code | Meaning | Retry disposition |
|---|---|---|
| HAL-VAL-0001 | Schema or bounds validation failed | NEVER |
| HAL-AUT-0001 | Authentication failed | AFTER_REAUTHORIZATION |
| HAL-AUZ-0001 | Authority absent, stale, revoked, or insufficient | AFTER_REAUTHORIZATION |
| HAL-POL-0001 | Policy or constitutional admission denied | NEVER |
| HAL-CMP-0001 | Contract or schema version incompatible | AFTER_UPGRADE |
| HAL-TRT-0001 | Treaty absent, inactive, expired, revoked, or inapplicable | AFTER_REAUTHORIZATION |
| HAL-INT-0001 | Integrity or provenance validation failed | NEVER |
| HAL-TIM-0001 | Deadline exceeded | AFTER_RECONCILIATION |
| HAL-LIM-0001 | Declared resource limit exceeded | AFTER_BACKOFF |
| HAL-DEP-0001 | Required dependency unavailable | AFTER_BACKOFF |
| HAL-REA-0001 | Reality Boundary result indeterminate | AFTER_RECONCILIATION |

# Appendix B — Contract Artifact Map

- `contracts/openapi/hal-book-ix.openapi.json`: 208 command/query operations.
- `contracts/asyncapi/hal-book-ix.asyncapi.json`: 97 event channels.
- `contracts/protobuf/hal_book_ix.proto`: common messages and component RPC services.
- `contracts/json-schema/`: common envelope, authority, Treaty, error, and 305 operation schemas.
- `schemas/book_ix_contracts.json`: complete machine-readable registry.

# Appendix C — Certification Statement

Book IX v1.0 is certified as a contract-level implementation of Books I-IV, aligned with Book X. It introduces no component, state owner, constitutional principle, capability class, Treaty class, or Owner-authority change. Each Book IV logical-interface identifier maps to one and only one Book IX contract identifier. No Owner Review item is required.
