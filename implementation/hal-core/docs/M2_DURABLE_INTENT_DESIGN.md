# M2 — Durable Intent Design and Contract Baseline

**Status:** Proposed; required before M2 implementation  
**Scope:** Local-only, synthetic-data-only durable intent path  
**Authority:** Book I controls. This design implements Book II/IV boundaries and does not create authority, providers, external access, or live effects.

## 1. M2 objective

M2 makes a bounded request reconstructable as governed work. A local request becomes an Intent, a bounded Plan, a recorded Decision, a Transaction disposition, Evidence, and an Outcome. Every transition is explicit, correlated, attributable, and owned by exactly one authoritative service boundary.

M2 remains non-live-effect. No Provider execution, model invocation, external integration, real authentication, Treaty, or autonomous initiative is admitted.

## 2. Authoritative ownership

| Durable domain | Sole mutation owner | Derived/read-only forms |
| --- | --- | --- |
| Intent | Intent Manager | Intent summaries and work views |
| Plan | Planner | Plan previews and scheduling views |
| Decision | Decision Service | Explanation views |
| Transaction | Transaction Coordinator | Transaction status views |
| Evidence | Evidence Service | Evidence indexes and verification views |
| Audit | Audit Service | Audit queries and trace views |
| Outcome | Outcome Service | Outcome summaries |

No store, cache, CLI, fixture loader, test, or consumer gains mutation authority merely by holding a record.

## 3. Minimal record model

All records must use immutable IDs, correlation ID, causation reference where applicable, creation time, schema version, classification, provenance, and integrity metadata.

| Record | Minimum governed fields | M2 constraint |
| --- | --- | --- |
| Intent | intent ID, request ID, objective statement, declared purpose, requester identity reference, classification, status | Captures what HAL is being asked to achieve; does not imply permission to act. |
| Plan | plan ID, intent ID, strategy/steps, constraints, assumptions, risk, status | Bounded local plan only; may not add a capability or external effect. |
| Decision | decision ID, subject, alternatives, evidence references, policy version, disposition, reason, uncertainty | `allow`, `deny`, or `approval_required` are decision results, not execution facts. |
| Transaction | transaction ID, intent/plan/decision references, declared effect class, status, recovery disposition | M2 allows `not_started`, `blocked`, `completed_without_effect`, or `cancelled`; no external commit barrier. |
| Evidence | evidence ID, source type, claim, provenance, integrity reference, confidence, status | Evidence is not authority or permission. |
| Audit record | audit ID, event type, actor reference, correlation/causation, payload summary | Append-only and sensitive-data-minimized. |
| Outcome | outcome ID, intent/transaction reference, stated result, verification references, confidence, status | Records only the local, non-effectful result. |

## 4. Local state transitions

```text
Request received
  → Intent recorded
  → Plan proposed
  → Decision recorded
  → Transaction blocked | completed_without_effect
  → Evidence attached
  → Outcome evaluated
```

- A denied decision creates a `blocked` transaction and an outcome of `not_achieved_no_effect`.
- An approval-required decision creates a `blocked` transaction and an outcome of `awaiting_approval_no_effect`.
- The one M1 inspection action may create `completed_without_effect` only: it inspects synthetic local fixture metadata and claims no external or durable-world effect.
- Cancellation may occur before finalization and must be evidenced; it cannot erase prior records.
- Any malformed, stale, duplicate, missing-authority, or uncertain transition must fail closed with an auditable denial or restriction.

## 5. M2 command and event contracts

These are semantic contracts only. Book IX-level transport/wire contracts are still deferred.

| Command | Owner | Required outcome |
| --- | --- | --- |
| `RecordIntent` | Intent Manager | Creates or idempotently returns one Intent record. |
| `ProposePlan` | Planner | Creates a Plan tied to an existing Intent. |
| `RecordDecision` | Decision Service | Records a reconstructable decision tied to Plan/Intent and evidence. |
| `OpenTransaction` | Transaction Coordinator | Creates a non-effectful Transaction after a valid Decision. |
| `AttachEvidence` | Evidence Service | Adds immutable evidence without rewriting the subject record. |
| `FinalizeOutcome` | Outcome Service | Records a verified local outcome and links it to evidence. |

| Event | Meaning |
| --- | --- |
| `IntentRecorded` | An authoritative Intent transition completed. |
| `PlanProposed` | A bounded Plan was recorded; it is not execution authority. |
| `DecisionRecorded` | A decision completed with a declared disposition and evidence. |
| `TransactionBlocked` | Work cannot proceed; no effect occurred. |
| `TransactionCompletedWithoutEffect` | Local non-effectful work completed; no external effect is claimed. |
| `EvidenceAttached` | Immutable evidence was linked to a governed subject. |
| `OutcomeFinalized` | A local outcome was assessed and recorded. |

## 6. Idempotency, ordering, and recovery

1. Every command carries an immutable command ID and correlation ID.
2. The owning service records the command disposition durably before returning success.
3. Repeated identical command IDs return the original disposition; conflicting reuse is denied and audited.
4. Events are immutable and ordered only within their authoritative record stream.
5. Recovery reconstructs state from authoritative records and events; derived views are disposable.
6. M2 must demonstrate replay of at least one completed-without-effect path and one blocked path.

## 7. Implementation boundaries

- Introduce storage only behind explicit owner-scoped repository interfaces; the persistence technology must not become a semantic owner.
- A local embedded database is an acceptable candidate for M2 only if its migration, backup, integrity, and recovery behavior are defined and tested before it becomes the source of truth.
- Do not introduce a model, Provider, worker Node, external API, or background autonomous loop.
- Do not mutate M0/M1 governing records except to add precise implementation evidence.

## 8. M2 acceptance evidence

- [ ] Ownership-mutation tests deny writes through non-owner paths.
- [ ] Intent-to-outcome trace is reconstructed from a correlation ID.
- [ ] Idempotent duplicate command test returns the original disposition.
- [ ] Conflicting command-ID reuse is denied and audited.
- [ ] Replay reconstructs both a blocked and a completed-without-effect path.
- [ ] Every record/event includes required identity, correlation, causation, provenance, classification, and schema metadata.
- [ ] No external network, Provider, model, real authentication, or live effect is introduced.
- [ ] Format, lint, typecheck, tests, and dependency-security scan pass.

