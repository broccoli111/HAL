# Chapter 16 — Action and Transaction Architecture

**Version:** 0.2  
**Status:** Source-aligned rewrite; architecture audit passed

## Purpose

Turn approved intent into recoverable, observable execution with explicit commit barriers, rollback and compensation.

## Authoritative Responsibilities

- **Transaction Coordinator:** Transaction state, journals, commit barriers and recovery
- **Execution Orchestrator:** Provider/node binding, ordering, concurrency, retries and cancellation
- **Effect Registry:** Declared side effects, reversibility, idempotency and compensation
- **Verification Coordinator:** Precondition, dry-run and outcome verification

## Core State and Records

- **Transaction:** Intent, plan, actor, authority, policy, state, effects, recovery and outcome.
- **Transaction State:** Planned, Validating, Authorized, Simulating, Executing, Paused, Compensating, Verifying, Completed, Failed or Awaiting Owner.
- **Execution Attempt:** Provider, node, input, start/end, result, evidence and retry relation.
- **Commit Barrier:** Exact irreversible transition, required evidence and authorization.
- **Compensation Plan:** Real-world counteraction, limits, cost, authority and verification.

## Runtime Workflow

1. Create a Planned transaction from an approved plan and bind intent, identity, authority and policy versions.
2. Validate preconditions, resources, Treaty/privacy constraints, idempotency and recovery/compensation paths.
3. Authorize execution and perform dry run or simulation according to risk policy.
4. Execute attempts with durable journal entries, safe pause/resume and bounded retries; nested transactions inherit no broader authority and cannot commit past the parent barrier.
5. Before every irreversible effect, revalidate the explicit commit barrier and required approval.
6. Verify outcomes; complete, roll back truly reversible effects, compensate irreversible effects, recover, or await Owner.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Duplicate delivery: use idempotency keys and effect records to prevent duplicate reality changes.
- Partial success: preserve completed effects and run declared compensation or Owner escalation.
- Crash during commit: reconstruct from journal and external evidence; never assume success or failure.
- Provider ambiguity: pause and verify real-world state before retry.

## Constitutional Guarantees

- Every meaningful action has an explicit lifecycle and durable journal.
- Rollback is used only where reality is reversible; otherwise HAL compensates honestly.
- Retries never silently change original intent or broaden authority.
- Completed status requires outcome verification, not merely provider success.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Source Alignment and Review

This chapter directly implements Decisions 9, 16, 20–22, 25, 29, 35, 40, 50, 55–56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 9, 16, 20–22, 25, 29, 35, 40, 50, 55–56
