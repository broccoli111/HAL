# HAL Book II — Full Constitutional and Owner-Decision Audit

**Document type:** Independent architecture audit  
**Version:** 1.0  
**Date:** July 27, 2026  
**Status:** Owner review required  
**Authority:** Book I — The HAL Constitution v1.0 and Constitutional Principles v1.1  
**Scope:** Book II Chapters 1–35  

## Executive Disposition

Book II is **substantially aligned with Book I, but is not yet ready for constitutional certification**.

The audit found:

- **1 constitutional tension requiring an Owner decision**
- **2 additional Owner-level governance decisions**
- **7 internally resolvable cross-chapter inconsistencies or ambiguities**
- **0 findings that silently transfer Owner authority, merge trust with permission, permit competing constitutional identities, or allow models/providers/nodes to become constitutional authorities**
- **All 58 Book I decisions referenced by at least one authoritative Book II chapter**

The principal constitutional tension is between Book I’s absolute preservation language for the Experience Ledger and Book II’s undefined “protected deletion” mechanism. The other Owner decisions concern constitutional-lease succession and the extraordinary process for changing a constitutional invariant.

All remaining findings are engineering or editorial corrections. They do not require Owner judgment.

## 1. Audit Method

### 1.1 Authoritative chapter set

The audit ignored every chapter’s embedded statements such as “architecture audit passed,” “approved,” or “no Owner review required.” Those statements were treated as author metadata, not evidence.

The following editions were reviewed:

- Chapters 1–5: version 0.1
- Chapters 6–20: version 0.2
- Chapters 21–35: version 0.1

Earlier superseded chapter editions and prior batch audit conclusions were not used to determine the result.

### 1.2 Constitutional authority

The controlling sources were:

- *HAL Book I — Constitution v1.0*
- *HAL Book I — Constitutional Principles v1.1*

Where Book II and Book I differ, Book I controls.

### 1.3 Tests performed

Each chapter was reviewed for:

1. constitutional fidelity;
2. Owner authority and authorization boundaries;
3. identity, trust, evidence, and permission separation;
4. authoritative state ownership;
5. lifecycle and state-machine consistency;
6. distributed coordination and recovery behavior;
7. privacy, retention, and historical integrity;
8. cross-chapter object and service ownership;
9. terminology consistency;
10. genuinely unresolved Owner decisions.

## 2. Constitutional Coverage

All 58 constitutional decisions are cited by the selected chapter set. Citation alone does not prove conformance, so coverage was also assessed by constitutional domain.

| Constitutional domain | Primary Book II chapters | Result |
|---|---:|---|
| Core boundary, authority, and single ownership | 1–5, 20, 22, 24, 33–35 | Pass with clarifications |
| Identity, authentication, delegation, and Owner authority | 3–5, 21, 26, 28, 31, 33 | Pass |
| Intent, planning, attention, judgment, and outcomes | 6, 8–9, 16–17, 32 | Pass |
| Reasoning, evidence, trust, and uncertainty | 7, 9, 17–18, 25 | Pass with boundary clarification |
| Knowledge, memory, learning, and wisdom | 10–12, 19, 24 | Owner decision required |
| Time, Presence, communication, and environment | 13–14, 23, 31 | Pass with ownership clarification |
| Capabilities, transactions, and verification | 15–17, 20–21, 29 | Pass |
| Distribution, security, failure, and recovery | 22, 24, 26–29, 34 | Owner decision required for lease succession |
| Self-description, continuity, and constitutional evolution | 30, 33, 35 | Owner decision required for invariant-change procedure |

## 3. Owner Decisions Required

### OR-01 — Experience Ledger deletion semantics

**Decision required:** Define whether any Experience Ledger payload may ever be physically erased and, if so, what historical evidence must remain.

**Why this requires the Owner:** This is not a storage-engine choice. It balances two constitutional values: permanent autobiographical continuity and privacy/data-erasure stewardship. Book I uses absolute language in Decision 30—every interaction, observation, event, and action is preserved in an immutable Experience Ledger; “HAL never forgets experiences”; and “expiration changes accessibility—not preservation.” Decision 53 later says experience is “rarely discarded,” creating an ambiguity inside Book I itself.

**Book II text affected:**

- Chapter 5 classifies “protected deletion” as a protected action.
- Chapter 12 says retention and protected-deletion policies apply “without silently rewriting the ledger.”
- Chapter 19 defines “protected delete with evidence” and a Retention/Deletion Coordinator.
- Chapter 24 says append-only protected history is corrected by new records, not silent rewrite.

**Conflict:** Book II permits a protected deletion operation without defining whether it deletes authoritative experience, destroys only encrypted payload access, deletes derived copies, or merely appends a tombstone. That makes the operation incompatible with the absolute version of Decision 30 unless its semantics are narrowed.

**Recommendation:** Preserve the immutable sequence and non-sensitive provenance of every Experience Object. Implement protected deletion as:

1. cryptographic erasure of protected payload keys when erasure is authorized;
2. deletion of non-authoritative copies, caches, indexes, and external replicas;
3. an immutable tombstone recording that content was lawfully erased, by whom, under what authority, and why;
4. retention of only the minimum non-sensitive metadata needed for continuity, audit, and proof of deletion.

Physical alteration of the ledger’s event sequence should remain prohibited. If the Owner wants true removal of even the tombstone or event identity, Book I must be amended first.

**Default pending approval:** No authoritative Experience Ledger payload is physically erased. Access may be restricted, content may be encrypted, and derived copies may be deleted.

**Impact:** Blocks final constitutional certification because Chapters 5, 12, 19, and 24 currently admit more than one interpretation.

### OR-02 — Constitutional lease succession and failover

**Decision required:** Choose the conditions under which constitutional control may move from the normal HAL Core host to a successor host after failure.

**Why this requires the Owner:** This determines how aggressively HAL trades availability against identity consistency and who may activate constitutional control during a disaster. It directly affects constitutional authority and catastrophic-risk tolerance.

**Book II text affected:**

- Chapter 1 establishes the Mac mini as Primary Constitutional Host while stating that HAL identity is portable.
- Chapter 3 describes a logically singular but recoverable kernel.
- Chapter 22 requires one active constitutional lease and quorum evidence.
- Chapter 28 restores constitutional identity and Owner authority before other services.
- Chapter 34 establishes the lease on the dedicated Core host or successor.

**Gap:** Book II says only one lease holder may govern, but does not define who may issue a successor lease, whether failover may be automatic, how long a recovery lease may last, or when the Owner Authorization Ceremony is required. Without this, split-brain protection is conceptually sound but operationally incomplete.

**Recommendation:** Permit an automatic, short-lived recovery lease only to a pre-registered and independently attested successor when:

1. the prior lease has provably expired;
2. the required independent quorum agrees on the last constitutional state;
3. the successor passes identity, integrity, audit, and recovery verification;
4. the system enters Recovery or Restricted mode;
5. the Owner is notified immediately.

A permanent reassignment of the Primary Constitutional Host should require the Owner Authorization Ceremony.

**Default pending approval:** No automatic successor lease. HAL remains in safe recovery until the Owner authorizes transfer.

**Impact:** Does not invalidate current principles, but blocks a complete high-availability and disaster-recovery specification.

### OR-03 — Extraordinary process for changing a constitutional invariant

**Decision required:** Define the additional procedure required when a proposal changes a constitutional invariant rather than an ordinary constitutional rule.

**Why this requires the Owner:** Book I states that invariants require “extraordinary recognition” because changing one may create a fundamentally different constitutional system. Book II cannot invent the meaning of that phrase through engineering judgment.

**Book II text affected:**

- Chapter 3 stores invariant declarations and treats invariant conflict as a constitutional incident.
- Chapter 33 classifies a proposal as an invariant and notes that the result may be a different constitutional system.
- Chapter 35 treats an invariant conflict as constitutional change rather than an engineering waiver.

**Gap:** Chapter 33 otherwise uses the same amendment workflow and authorization ceremony for rules, principles, and invariants. It recognizes the higher consequence but does not define a higher burden.

**Recommendation:** Require, at minimum:

1. two separate Owner Authorization Ceremonies;
2. a mandatory cooling-off interval;
3. a complete Constitutional Mirror and independently verified recovery point;
4. an explicit continuity analysis stating whether the result remains HAL or becomes a successor constitutional system;
5. a second presentation of the exact unchanged amendment after the cooling-off interval;
6. permanent preservation of the predecessor system and migration evidence.

**Default pending approval:** Invariant changes cannot be executed. HAL may analyze and simulate them only.

**Impact:** Does not block ordinary constitutional amendments; blocks implementation of invariant changes.

## 4. Constitutional Conflict and Tension Register

| ID | Severity | Chapters | Finding | Disposition |
|---|---|---:|---|---|
| C-01 | High | 5, 12, 19, 24 | Undefined protected deletion can conflict with the immutable Experience Ledger and “never forgets” principle. | Owner decision OR-01 |
| C-02 | Medium | 22, 28, 34 | Single-lease doctrine is constitutionally correct, but successor-lease authority is unspecified. | Owner decision OR-02 |
| C-03 | Medium | 3, 33, 35 | Invariant changes are recognized as extraordinary but use no defined extraordinary procedure. | Owner decision OR-03 |

No other direct constitutional conflicts were identified.

In particular, Book II consistently preserves:

- exactly one constitutional Owner;
- one HAL constitutional identity across replaceable hardware;
- trust as evidence-based and independent from permission;
- separate identity, authentication, authority, trust, and ownership;
- central constitutional governance with distributed bounded execution;
- explicit authorization for protected changes;
- agreement as distinct from authorization;
- Treaties and capability-class approvals as separate protected acts;
- simulation as incapable of replacing authority;
- transparent degradation without silent rule changes;
- model, provider, node, Presence, credential, relationship, or network location as insufficient authority.

## 5. Cross-Chapter Inconsistency Register

These findings can be resolved through architecture editing. They do **not** require Owner approval.

### IC-01 — Interaction Session has two apparent authoritative owners

**Chapters:** 14 and 31  
**Finding:** Both chapters define an `Interaction Session` and assign interaction coordination/management responsibilities. The two schemas overlap but are not identical.  
**Risk:** Competing canonical records, divergent privacy scope, and unclear handoff ownership.  
**Correction:** Make Chapter 31’s Interaction Manager the authoritative owner of the Interaction Session. Chapter 14’s Presence Manager should own Presence and Presence Handoff records and contribute Presence/audience context to the session.

### IC-02 — Conversation Object ownership is duplicated

**Chapters:** 12 and 23  
**Finding:** Chapter 12 assigns Conversation Objects to the Conversation Service. Chapter 23 assigns persistent collaboration state to the Thread Service and defines the same object.  
**Risk:** Transcript, decision, open-question, and continuation state can diverge.  
**Correction:** Retain the Chapter 12 Conversation Service as canonical owner. Limit the Chapter 23 Thread Service to transport correlation, delivery state, participant routing, and a projection/reference to the canonical Conversation Object.

### IC-03 — Treaty Manager is duplicated

**Chapters:** 20 and 21  
**Finding:** Both chapters list a Treaty Manager as an authoritative responsibility.  
**Risk:** Firewall enforcement state and Treaty lifecycle state may disagree.  
**Correction:** Make Chapter 21’s Treaty Manager the sole owner of Treaty lifecycle. Chapter 20’s Constitutional Firewall consumes signed Treaty decisions and owns exchange enforcement, redaction, and incident records.

### IC-04 — Scheduler responsibilities overlap

**Chapters:** 8 and 13  
**Finding:** Chapter 8’s Scheduler assigns resources and work; Chapter 13’s Scheduler owns commitments, recurrence, dependencies, and deadlines.  
**Risk:** Two services can independently determine when work should run.  
**Correction:** Chapter 13’s Temporal Service should own temporal commitments and constraints. Chapter 8’s Scheduler should remain the sole work-admission and placement authority consuming those constraints.

### IC-05 — Identity/Authority service naming changes across chapters

**Chapters:** 1, 4, and 5  
**Finding:** Chapter 1 names an `Identity & Authority Service` as one authoritative owner. Chapters 4 and 5 specify separate Identity and Authority services.  
**Risk:** Ambiguous deployment and state ownership, especially for authentication sessions and delegation records.  
**Correction:** Describe `Identity & Authority` in Chapter 1 as a logical constitutional domain comprising two services with separately declared state ownership.

### IC-06 — Protected policy evaluation boundary is ambiguous

**Chapters:** 1, 3, and 5  
**Finding:** Chapter 1 places policy issuance/evaluation in the kernel; Chapter 3 says the kernel evaluates protected requests; Chapter 5 assigns authorization evaluation to the Authority Service.  
**Risk:** Implementers may put all authorization logic in the kernel or permit the Authority Service to commit protected decisions independently.  
**Correction:** State explicitly: the Authority Service evaluates ordinary effects and prepares protected decisions; the Constitutional Kernel independently validates and commits protected decisions. The Policy System owns policy text and deterministic evaluators; the kernel owns protected admission.

### IC-07 — Physical persistence and semantic authority are not clearly separated

**Chapters:** 1, 10, 12, 18, 24, and 25  
**Finding:** Chapter 24’s `Authoritative State Store` and `Event and Experience Ledgers` can be read as owning records already assigned to domain services. Evidence, audit, experience, and knowledge also have adjacent but distinct ownership.  
**Risk:** A database or observability subsystem may be mistaken for the semantic authority over domain state.  
**Correction:** Declare the persistence layer a physical custodian, not a semantic owner. Preserve these canonical boundaries:

- Experience Ledger: historical experience authority;
- Evidence Service: evidentiary objects and custody;
- Audit Ledger: protected action/access audit;
- Knowledge Service: revisable derived understanding;
- domain services: semantic owners of their records;
- State Store/Replication Controller: durability, replication, and recovery substrate only.

## 6. Terminology and Editorial Findings

These are lower-risk but should be corrected during consolidation:

1. Replace “one central constitutional control plane” in Chapter 34 with “one active constitutional control plane” to preserve host portability and recovery succession.
2. Replace embedded status phrases such as “architecture audit passed” and “no Owner review required” with neutral document-control metadata. They can be mistaken for evidence of independent review.
3. Rename Chapter 35’s `Certification Authority` to `Architecture Certification Service` or explicitly state that certification authority is not constitutional authority.
4. Normalize “authoritative owner,” “physical custodian,” “derived projection,” and “enforcement point” in the glossary.
5. Add a global authoritative-object register so each object has exactly one semantic owner and other chapters reference it.

## 7. Certification Readiness

### Current verdict

**Not certified — conditionally conformant pending resolution and revision.**

The architecture is coherent enough to continue development, and no evidence was found of broad constitutional drift. However, a final certification would be premature until:

1. OR-01 is decided and Chapters 5, 12, 19, and 24 are harmonized;
2. OR-02 is decided and Chapters 22, 28, and 34 define lease succession;
3. OR-03 is decided and Chapter 33 defines the invariant-change procedure;
4. IC-01 through IC-07 are corrected;
5. the revised chapter set receives a fresh bidirectional traceability and cross-chapter review.

### Safe work that may continue

The following work does not depend on the unresolved Owner decisions:

- service interface design;
- typed command/query/event schemas;
- ordinary identity and delegation flows;
- capability registration and provider routing;
- transaction journals;
- verification environments;
- Treaty proposal objects;
- non-destructive memory retrieval;
- observability, security, and recovery test design;
- chapter ownership and terminology cleanup.

## 8. Owner Review Summary

| ID | Owner question | Recommendation | Blocking scope |
|---|---|---|---|
| OR-01 | What does protected deletion mean for immutable experience? | Cryptographic erasure plus immutable tombstone; never remove ledger sequence. | Final constitutional certification |
| OR-02 | When may a successor host receive the constitutional lease? | Short-lived attested recovery lease; permanent transfer requires ceremony. | HA/disaster-recovery completion |
| OR-03 | What makes an invariant change “extraordinary”? | Two ceremonies, cooling-off, Mirror, recovery proof, continuity declaration. | Invariant-change implementation |

## 9. Final Audit Statement

Book II is not a constitutional rewrite of Book I. Its dominant architecture correctly implements the constitutional system: one Owner, one constitutional identity, explicit authority, evidence-based trust, bounded distributed execution, recoverable transactions, secure Treaties, and governed evolution.

The audit nevertheless rejects the books’ prior self-approval as sufficient evidence. Three Owner-level matters remain unresolved, and seven cross-chapter boundaries require editorial correction. After those items are resolved and the chapters are revised, Book II should undergo one final certification audit before it is treated as the governing implementation specification.

