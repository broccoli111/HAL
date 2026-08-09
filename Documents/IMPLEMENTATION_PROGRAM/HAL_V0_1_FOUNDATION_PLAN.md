# HAL v0.1 Foundation Plan

**Status:** Proposed implementation baseline  
**Purpose:** Deliver the first evidence-backed, constitutionally governed HAL path from authenticated human intent to a verified outcome.  
**Authority:** Book I controls. Books II–X constrain architecture, engineering, components, operations, security/privacy/trust, governance, assurance, contracts, and terminology. This plan creates no new authority.

## 1. v0.1 outcome

HAL v0.1 proves one complete, bounded workflow:

> An authenticated Owner submits a low-risk, reversible request; HAL records and understands the intent, evaluates policy and authority, forms a bounded plan, invokes one approved capability, verifies the result, and preserves an explainable evidence and audit trail.

v0.1 is successful only when the complete path is demonstrable in a declared non-live-effect or tightly controlled Reality Boundary stage. A successful demo is not a grant of broader autonomy.

## 2. Non-goals

- No constitutional change, Treaty activation, new capability class, autonomous initiative, or Owner-delegation expansion.
- No live-effect, irreversible, financial, safety-critical, external-account, or cross-domain action.
- No multi-node consensus, full federation, robotics, or generalized learning loop.
- No claim that all 29 Book IV components are implemented.

## 3. Foundation slice

| Concern | v0.1 implementation scope | Governing components |
| --- | --- | --- |
| Constitutional admission | Protected boot, controlled configuration, Safe Mode, audit-anchor validation | CMP-01, CMP-25 |
| Human identity and authority | One Owner identity, authenticated session, exact request authorization, explicit denial | CMP-02, CMP-03 |
| Intent and planning | Persist one Objective/Task form, record assumptions and uncertainty, create one bounded plan | CMP-04, CMP-05, CMP-07 |
| State and evidence | Single-owner stores, durable command/event trail, audit and evidence records | CMP-18, CMP-22, CMP-23, CMP-24 |
| Action | One allow-listed, reversible capability through a transaction boundary | CMP-13, CMP-14 |
| Verification | Deterministic completion checks and a human-readable outcome explanation | CMP-15, CMP-29 |
| Interaction | Minimal Owner-facing request, status, approval, explanation, and cancellation surface | CMP-27 |

## 4. Deployment boundary

- **Primary Constitutional Host:** Mac mini running the single active HAL Core control plane.
- **Execution:** local process first; a GX10 may later be admitted only as a governed Node Runtime.
- **Recovery:** encrypted NAS replica and independently restore-tested backup before any declared live-effect stage.
- **Environment:** development and simulation/shadow only until a later assurance decision explicitly admits a controlled reality stage.

## 5. Milestones and advancement evidence

| Milestone | Deliverable | Exit evidence |
| --- | --- | --- |
| M0 — Controlled baseline | Canon source manifest, repository boundary, environment register, threat/privacy assessment, definition of done | Version-pinned source manifest; approved development environment; Book III/VI/VIII review record |
| M1 — Trustworthy core | Kernel admission, identity/authentication, authority/policy decision, Safe Mode | Positive and denial-path tests; audit-chain verification; restart and Safe-Mode exercise |
| M2 — Durable intent path | Intent, plan, decision, transaction, event, evidence, and audit records with explicit owners | Schema and migration tests; replay/idempotency test; authoritative-owner mutation-denial test |
| M3 — One bounded capability | Registered capability contract and provider; reversible execution; cancellation/compensation behavior | Contract tests; exact authority-envelope test; timeout, duplicate, cancellation, and recovery evidence |
| M4 — Verified outcome | Verification checks, outcome record, Owner explanation, failure/restriction behavior | Independent verification result; evidence reconstruction from request through outcome; negative-result demonstration |
| M5 — Readiness decision | v0.1 assurance case and scoped certification recommendation | Book VIII verification plan and evidence; Book V runbook; Book VI control evidence; Owner decision on next Reality Boundary stage |

## 6. Mandatory gates

No milestone may advance unless all applicable conditions hold:

1. Every durable state mutation is accepted only by its named authoritative owner.
2. Commands, queries, and events use registered Book IX semantics and preserve identity, authority, correlation, causation, provenance, classification, and integrity evidence.
3. The system fails closed for uncertain protected authority, policy, identity, or audit integrity.
4. Sensitive data is minimized; secrets are never ambient authority; logs and evidence are classified and access-controlled.
5. A failed action leaves a truthful, recoverable, and explainable disposition—never an invented success.
6. The end-to-end path can be reconstructed independently from durable evidence.

## 7. First reference scenario

**Scenario:** The Owner asks HAL to produce a local, non-destructive research brief from an allow-listed local corpus.

The capability may read only a declared test corpus and write a versioned draft artifact to a controlled workspace. It cannot send messages, alter external systems, access personal accounts, purchase anything, or activate external integrations. The result must carry source provenance, uncertainty, verification findings, and a full audit trail.

This scenario exercises intent interpretation, planning, authority, policy, capability selection, transaction control, evidence, verification, memory association, and outcome evaluation without crossing an irreversible or external reality boundary.

## 8. Initial work order

1. Create the source/control manifest and environment register (M0).
2. Define the v0.1 data and contract register for the minimal path (M1–M2).
3. Implement the kernel, identity, authority, policy, audit, event, and persistence skeleton before the model-facing capability.
4. Implement the single capability behind a versioned contract and transaction envelope (M3).
5. Build the verification, explanation, recovery, and assurance evidence before any Reality Boundary advancement (M4–M5).

## 9. Owner decisions reserved for later

- Admission to any live-effect Reality Boundary stage.
- New capability classes, external providers, Treaties, or wider delegation.
- Any material retention/deletion rule that affects protected history.
- Any constitutional interpretation, amendment, or invariant exception.

## 10. Definition of done for v0.1

v0.1 is done when the reference scenario completes and fails safely under test; every state owner, contract, decision, event, evidence object, audit record, and outcome can be independently traced; recovery from interruption is demonstrated; and an independent Book VIII review establishes only the declared scope of reliance.

