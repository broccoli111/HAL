# Hermes Reference Runtime v1 — Implementation-Readiness Checklist

> **Status:** Design-phase checklist. Completion of any or all items does not authorize implementation, activation, or resource access.

## Use

This checklist operationalizes [DR 0011](../../../decisions/0011-production-runtime-integration-design-phase.md) and the [production-integration design](HERMES_PRODUCTION_INTEGRATION_DESIGN.md). Each item requires an attributable evidence record. A missing, failed, expired, or scope-mismatched item fails closed.

## A. Authority and Change Scope

- [ ] A specific implementation/activation change record identifies the immutable Hermes input and version.
- [ ] The record identifies the accountable HAL component, Owner approval, security review, scope, risks, compensating controls, expiry/review date, and revocation conditions.
- [ ] The record confirms Book I, Book II, Book III, accepted Decision Records, and current implementation conformance.
- [ ] Independent Book II review disposition is present and within its declared validity; no provisional edition is represented as certified without it.

## B. Contract and Anti-Coupling

- [ ] Adapter-specific proposal preserves the semantic Agent Runtime Contract without imposing Hermes behavior on HAL Core.
- [ ] Static dependency check confirms `HAL Core -> Agent Runtime Contract -> HermesAdapter -> Hermes` and rejects direct Core-to-Hermes dependency.
- [ ] Protocol, schema, and transport decisions are versioned at the adapter edge with compatibility, error, ordering, and idempotency behavior declared.
- [ ] Runtime replacement test demonstrates a second conformant adapter without HAL identity, authority, canonical-knowledge, Evidence Graph, Gateway, or interface changes.

## C. Runtime and Provider Trust

- [ ] Immutable source/artifact provenance, signature or integrity evidence, license, SBOM/dependency inventory, and vulnerability disposition are recorded.
- [ ] Provider/runtime identity binding, authentication, rotation, revocation, outage, and quarantine behavior are defined and tested.
- [ ] No ambient runtime credential, secret, filesystem, shell, network, node, or resource handle exists outside a HAL-governed boundary.
- [ ] Containment, removal, and rollback procedures restore a verified no-runtime state and have evidence-backed rehearsal results.

## D. Context, Data, and Memory

- [ ] Data-flow inventory identifies every context field supplied to the runtime, its classification, purpose, minimization rule, retention, and deletion/reconstruction behavior.
- [ ] Runtime-local state is explicitly non-canonical, replaceable, and unavailable as a direct HAL knowledge source.
- [ ] Context disclosure, retention, and removal controls have negative tests.
- [ ] A memory-loss/replacement test reconstructs only currently authorized bounded context from HAL-owned records.

## E. Capability and Resource Governance

- [ ] Every consequential runtime request traverses HAL callback custody and Capability Gateway evaluation with identity, delegated authority, task, correlation, target, risk, policy, authorization, and evidence context.
- [ ] The implementation exposes no direct resource invocation path from Hermes or its adapter.
- [ ] Permit, deny, authorization-required, stale, broadened, replayed, malformed, and mislinked requests have deterministic negative/positive tests.
- [ ] Gateway decisions and claims retain appropriate non-canonical evidence/audit custody before any actual resource effect where practical.

## F. Lifecycle, Recovery, and Evidence

- [ ] Admission, health, checkpoint, cancellation, destruction, failure, quarantine, replacement, recovery, rollback, and shutdown behavior are specified with accountable HAL ownership.
- [ ] Malformed, control-plane, post-terminal, and mismatched runtime frames fail closed before callback or resource handling.
- [ ] Runtime claims remain attributable, integrity-protected, and non-canonical until separate governed acceptance.
- [ ] Fault-injection tests demonstrate no unverified completion, unauthorized retry, policy change, authority broadening, or loss of required evidence.

## G. Activation Decision Gate

- [ ] Required evidence is reviewed for scope and freshness.
- [ ] Open critical/high findings are resolved, contained under an active approved exception, or block activation.
- [ ] Owner approves the exact activation scope, environment, allowed operations, resource/data classes, credential posture, and rollback/removal plan.
- [ ] Activation begins with the smallest reversible, isolated, evidence-producing step.

## Current Disposition

All items are intentionally unchecked. The current repository has test-only boundary evidence only; it has not met this implementation-readiness or activation gate.
