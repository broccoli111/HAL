# HAL Book II — The Architecture Specification

**Status:** Provisional working edition — not independently recertified
**Scope:** Chapters 1–35
**Compilation date:** 2026-08-09
**Constitutional authority:** Book I — The Constitution

Book I remains the supreme authority. This provisional edition contains the current Markdown working chapter editions, including the runtime-sovereignty clarification. It is published under the time-bounded Engineering Exception 0010 and does not replace the certified 2026-07-27 baseline or issue a certification claim.

## Authoritative editions

- Chapters 1–5: v0.2
- Chapters 6–20: v0.3
- Chapters 21–35: v0.2

## Contents

1. Overall System Architecture — v0.2
2. Runtime Model — v0.2
3. Constitutional Kernel — v0.2
4. Identity and Continuity — v0.2
5. Authority and Delegation — v0.2
6. Intent and Planning Architecture — v0.3
7. Cognitive Orchestration — v0.3
8. Attention and Resource Allocation — v0.3
9. Judgment and Decision Objects — v0.3
10. Knowledge Architecture — v0.3
11. Learning and Wisdom — v0.3
12. Memory and Experience Ledger — v0.3
13. Temporal Architecture — v0.3
14. Presence and Human Interaction — v0.3
15. Capability Architecture — v0.3
16. Action and Transaction Architecture — v0.3
17. Verification and Simulation — v0.3
18. Trust Architecture — v0.3
19. Privacy and Data Governance — v0.3
20. Constitutional Firewall — v0.3
21. External Trust Domains and Treaties — v0.2
22. Distributed Coordination — v0.2
23. Event and Messaging Architecture — v0.2
24. State and Persistence Architecture — v0.2
25. Observability and Evidence — v0.2
26. Security Architecture — v0.2
27. Failure Containment — v0.2
28. Recovery and Continuity — v0.2
29. Software Lifecycle and Change Governance — v0.2
30. Self-Description and Constitutional Mirror — v0.2
31. Human Interaction Architecture — v0.2
32. Outcome and Success Architecture — v0.2
33. Constitutional Evolution Support — v0.2
34. Deployment Topologies — v0.2
35. Architecture Conformance and Certification — v0.2

---


---

## Chapter 1 — Overall System Architecture

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | System topology, authority boundaries, major planes, data ownership, and end-to-end flow |
| Constitutional basis | Decisions 1–58, with primary implementation responsibility for 1–7, 10–16, 24–25, 29, 32, 35–42, 45, 47, 49–51 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

This chapter defines the whole HAL system before later chapters specify individual services. It establishes which components are authoritative, how data and actions cross boundaries, and how the system preserves constitutional identity while executing work through replaceable models, services, nodes, and external partners.

## 2. Architectural Thesis

HAL is a constitutionally governed control system. The constitutional kernel makes and records authoritative decisions; governed services reason, plan, store, observe, and coordinate; capability providers perform bounded work; Presences expose the system to people and the physical world. No provider, node, or interface gains authority merely by participating.

## 3. System Planes

| Plane | Responsibilities | Authority posture |
| --- | --- | --- |
| Constitutional plane | Owner identity, policy, authority, authorization ceremony, audit integrity, constitutional state. | Authoritative; only governed mutation paths. |
| Cognitive-control plane | Intent, planning, evidence synthesis, trust, attention, judgment, scheduling, verification. | Makes or recommends decisions under policy. |
| State and knowledge plane | Experience Ledger, knowledge graph, decision records, configuration, transactions, outcomes. | Each durable domain has one authoritative owner. |
| Execution plane | Execution Orchestrator, Capability Gateway, Agent Runtime Interface, capability contracts, providers, node runtimes, adapters, transactions. | Bounded execution; cannot alter constitutional state directly. |
| Presence and federation plane | Desktop, phone, voice, watch, robot, APIs, external trust domains, Treaties. | Contextual interfaces; cross-domain exchange passes the Constitutional Firewall. |

## 4. Reference Topology

Owner & Presences
        ↓ authenticated, authorized requests
HAL Core — Constitutional Kernel + Governed Services
        ├── Constitutional plane: identity • policy • authority • audit
        ├── Cognitive-control plane: intent • planning • evidence • trust • judgment • scheduling
        ├── State plane: ledger • knowledge • transactions • configuration • observability
        └── Execution Orchestrator + Capability Gateway
                 ↓ Agent Runtime Contract + delegated authority
Replaceable Agent Runtimes, HAL Node Runtimes & Governed Providers
                 ↓ bounded results, evidence, health, and transaction updates
External Trust Domains / Physical & Digital Environment

## 5. Constitutional Kernel

The kernel is deliberately small. It contains only what must remain trustworthy when every optional service fails: root identity, protected authorization admission, protected policy validation, protected audit rules, transaction commit coordination, cluster membership authority, and recovery control. It exposes narrow typed contracts. All other services are replaceable and interact with the kernel by commands, queries, and durable events.

## 6. Authoritative State Ownership

| State domain | Authoritative owner | Derived / replaceable forms |
| --- | --- | --- |
| Identity, delegation, authentication | Identity Service / Authority Service | Session caches, UI claims, presence assertions |
| Policy, exceptions, approvals | Policy System | Signed evaluation bundles, local evaluators |
| Experience and audit | Experience Ledger / Audit Service | Indexes, summaries, forensic projections |
| Knowledge and patterns | Knowledge Service | Embeddings, caches, search indexes |
| Intent, plan, transaction, outcome | Intent Manager / Planner / Transaction Coordinator | Dashboards, work queues, provider-specific task representations |
| Configuration and secrets references | Configuration Plane / Secrets Service | Node-local verified bundles, short-lived credentials |
| Node and provider observations | Node Registry / Provider Registry | Health views, benchmarks, scheduling projections |

## 7. Request-to-Outcome Flow

- A Presence submits a structured request to HAL Core. The request carries identity, context, intent, priority, evidence, classification, and correlation metadata.

- Identity, policy, and trust checks establish whether the request can be understood, planned, or acted upon.

- The Intent and Planning services derive an approved plan. The Decision Engine records alternatives, evidence, uncertainty, and policy constraints.

- The Execution Orchestrator binds capability contracts to current providers and nodes, opens a transaction, reserves resources, and runs only within delegated authority.

- Providers return results, evidence, health, and execution facts. They never directly mutate authoritative state.

- Verification evaluates the result. The transaction completes, compensates, pauses, recovers, or escalates. Experience, audit, knowledge, and outcome records are updated through their authoritative owners.

## 8. Trust Boundaries

| Boundary | Required control |
| --- | --- |
| Presence ↔ HAL Core | Continuous authentication, authorization, disclosure appropriate to Presence privacy and confidence. |
| Kernel ↔ governed service | Typed contract, least privilege, correlation, auditable policy decision, no direct database ownership violation. |
| Core ↔ node runtime | Mutual authentication, encrypted transport, signed configuration, health evidence, delegated execution envelope. |
| Provider ↔ adapter | Capability-scoped credential, provider fitness evidence, timeout/retry semantics, output verification. |
| HAL ↔ external trust domain | Treaty, Constitutional Firewall, provenance validation, data minimization, revocation and audit. |

## 8.1 Agent Runtime Boundary

HAL owns the governed control plane; an Agent Runtime supplies replaceable execution mechanics. HAL may depend on the implementation-neutral Agent Runtime Contract, but HAL Core MUST NOT depend on Hermes-specific behavior, state, APIs, skills, tools, or internal lifecycle semantics. The required dependency direction is:

`HAL Core → Agent Runtime Interface → HermesAdapter → Hermes`

The reverse architectural dependency—`HAL Core → Hermes internals`—is prohibited. Hermes is the initial **Reference Agent Runtime v1**; it neither defines the contract nor becomes a constitutional dependency, root of trust, authoritative state owner, or privileged path around HAL governance. NativeHALAdapter, TestRuntimeAdapter, and future runtime adapters remain valid architectural participants.

## 9. Operating Modes & Failure Posture

HAL exposes Normal, Degraded, Restricted, Safe Mode, Recovering, Maintenance, Emergency, and Offline modes. A failure may reduce availability or capability but cannot silently change policy, identity, authority, authentication requirements, trust thresholds, or constitutional rules. Critical state is preserved through authoritative ownership, append-only journals, durable transaction checkpoints, independent backups, and recovery-first boot.

## 10. Deployment Baseline

The initial deployment uses a Mac mini as the normal Primary Constitutional Host and active HAL Core control plane; GX10 systems run HAL Node Runtimes for governed model and specialist execution; a NAS holds a warm, encrypted, restore-tested recovery replica plus independent backup. This is a deployment topology, not a permanent identity requirement. HAL remains portable as a continuity of constitution, governed state, and authority.

## 11. Interfaces

| Interface class | Primary semantic |
| --- | --- |
| Command | Requests one authoritative state change; caller receives acceptance, rejection, or required approval. |
| Query | Reads declared consistency class from an authoritative owner or controlled projection. |
| Event | Immutable fact with identity, schema, correlation, causation, authorization, provenance, and integrity metadata. |
| Capability invocation | Bounded request to fulfill a capability contract under a transaction and delegation envelope. |
| Treaty exchange | Cross-domain message governed by an active Treaty and the Constitutional Firewall. |

## 12. Guarantees

- No external model, provider, node, service, or Presence is a constitutional authority by default.

- Runtime intelligence, technical access, remembered context, or claimed completion never implies runtime authority or canonical HAL truth.

- Every durable authoritative state domain has one owner, versioned mutation, append-only history, and auditable recovery path.

- Every meaningful action has a transaction, policy context, authorization context, evidence, and explainable outcome.

- All cross-process, device, or trust-boundary communication is authenticated, integrity-protected, and encrypted; sensitive exchanges are end-to-end protected.

- Degradation is disclosed. System rules do not silently change because a dependency fails.

- The architecture remains implementation-neutral: models, adapters, nodes, and non-kernel services are replaceable without changing HAL identity.

## 13. Constitutional Traceability Audit

| Constitutional decisions | Chapter 1 implementation coverage |
| --- | --- |
| 1–7 | Core boundary, modular services, CQE contracts, event journal, state ownership, immutable identity, Self Model. |
| 8–16 | Engagement tiers, decision framework, capabilities, knowledge, planning, provider registry, graph separation, orchestration. |
| 17–25 | Nodes, resource constraints, lifecycle, work model, scheduling, recovery, communication, consistency, policy. |
| 26–35 | Trust, authentication, introspection, distributed execution, memory, intent, communication, learning, reasoning, transactions. |
| 36–45 | Capability stack, kernel boundary, supervision, configuration, observability, resources, durability, updates, time, Presences. |
| 46–58 | Initiative, coordination, ownership, sovereignty, verification, self-description, environment, wisdom, attention, judgment, restraint, outcomes, evolution. |

## 14. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None identified. Book I remains the governing authority. |
| Authority ambiguity | Resolved through single-owner durable state and kernel-only constitutional mutation. |
| Failure posture | Explicit modes, safe degradation, recovery journals, and independent backup topology included. |
| Premature technology coupling | Avoided. Specific transports, databases, and frameworks are deferred to later chapters. |
| Owner review required | None. This chapter chooses implementation structure without altering constitutional philosophy or Owner authority. |

## 15. Completion Status

Chapter 1 is complete as an architectural foundation. Subsequent chapters will refine the runtime, services, data models, interfaces, and deployment mechanisms named here without changing the authority model established in this chapter.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Identity and Authority are separate authoritative services within one logical constitutional domain; each owns only its declared records.

- The Authority Service evaluates ordinary effects and prepares protected decisions. The Constitutional Kernel independently validates and commits protected decisions.

- The persistence layer is a physical custodian, never the semantic owner of domain state.

- HAL has one active constitutional control plane. The normal Mac mini host may be replaced only through the governed lease and recovery process.

---

## Chapter 2 — Runtime Model

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | Boot, lifecycle, supervision, Agent Runtime Contract, operating modes, degradation, shutdown, and recovery |
| Constitutional basis | Decisions 1, 5, 10, 16–25, 27–30, 35–45, 47–51, 54, and 56 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

The runtime model defines how HAL exists while operating. It specifies the order in which HAL earns the right to become active, the state transitions it may enter, how it detects and contains failure, and how it recovers without changing its constitutional rules. A running process is not HAL merely because it starts; it becomes an active HAL runtime only after identity, policy, protected state, and health requirements have been verified.

## 2. Runtime Principles

- Bootstrap constitutional controls before optional intelligence or execution services.

- Treat every runtime state as explicit, observable, and auditable.

- Supervise services independently; isolate fault domains rather than letting one failure cascade.

- Permit capability loss and safe degradation, but never silent alteration of governance, authority, identity, trust, authentication, or policy.

- Prefer recovery, replay, and verification over unexamined restart.

- Make resource use, health, uncertainty, and operating limits part of the runtime self-model.

## 3. Runtime Constituents

| Constituent | Runtime responsibility | Failure consequence |
| --- | --- | --- |
| Bootstrap Manager | Builds the verified runtime in dependency order and selects the initial operating mode. | HAL remains unavailable or enters Safe Mode. |
| Constitutional Kernel | Establishes root identity, policy and authorization authority, protected audit, and commit coordination. | No constitutional mutation or protected action may proceed. |
| Service Supervisor | Starts, observes, isolates, restarts, and retires governed services. | Affected capability is degraded or suspended. |
| Resource Governor | Accounts for CPU, memory, GPU, storage, network, power, thermal, and attention budgets. | Admission control or bounded degradation applies. |
| Mode Manager | Maintains the authoritative operating mode and allowed transitions. | Defaults to the more restrictive safe state. |
| Health and Evidence Collector | Collects liveness, readiness, integrity, performance, and cognitive-health evidence. | Confidence falls; unverified components are restricted. |
| Recovery Manager | Coordinates journals, checkpoints, replay, restoration, and gradual rejoin. | Recovery holds the affected domain until verification completes. |
| Agent Runtime Interface | Admits, supervises, and replaces external agent runtimes through the HAL-defined contract. | Runtime execution is withheld or replaced; HAL governance and canonical state remain available under their declared modes. |

## 3.1 Agent Runtime Contract and Replaceability

The Agent Runtime Contract is the implementation-neutral boundary through which HAL delegates commodity agent-execution mechanics while retaining governance. It specifies semantic responsibilities, not a transport protocol, programming language, exact API, or data schema.

| Direction | Conceptual operations |
| --- | --- |
| HAL → Runtime | Start runtime; create agent; execute task; provide bounded context; provide capability manifest; checkpoint; cancel; destroy. |
| Runtime → HAL | Request capability; submit evidence; report progress; report result; report failure; request subagent. |

HAL remains authoritative for agent admission and lifecycle, identity, delegated authority, policy, governed resource access, canonical state, evidence custody, transaction disposition, recovery, and rollback. A runtime retains no implied authority beyond the particular, time- and scope-bounded work HAL permits. Runtime-level reasoning loops, context management and compression, tool-call mechanics, skill discovery and execution, subagent mechanics, browser and terminal execution, MCP mechanics, runtime-local scheduling mechanics, and sandbox orchestration are delegated and replaceable. HAL retains work-admission, placement, and resource-governance authority.

HermesAdapter is the initial reference adapter for **Hermes Reference Runtime v1**. NativeHALAdapter, TestRuntimeAdapter, and FutureRuntimeAdapter are equally valid contract implementations. Replacing a runtime MUST NOT require changes to the Constitution, Owner identity, canonical HAL knowledge, Evidence Graph semantics, authorization model, Capability Gateway semantics, or HAL-facing interfaces.

HAL retains durable custody of attributable Runtime Contract submissions and Gateway dispositions. A retained runtime capability request, report, or evidence submission is an operational claim with correlation, provenance, and disposition context; it does not become canonical knowledge, an accepted outcome, authority, or permission merely because HAL records it. Exact storage schemas remain implementation concerns subject to the declared evidence, recovery, and compatibility controls.

## 3.2 Runtime Dependency Guarantee

HAL architecture may depend on the Agent Runtime Contract but MUST NOT depend on Hermes-specific behavior unless that dependency is contained entirely inside HermesAdapter. HAL Core code and governed state MUST NOT understand Hermes internals. The dependency direction is `HAL Core → Agent Runtime Interface → HermesAdapter → Hermes`; direct `HAL Core → Hermes internals` dependency is prohibited.

## 4. Startup and Admission Sequence

Startup is a staged admission process. Each stage establishes evidence required by the next. A stage may halt or restrict the runtime; no stage may be skipped because a dependent service is unavailable.

| Stage | Required evidence | Outcome |
| --- | --- | --- |
| 0. Hardware and host admission | Host identity, secure-time availability or bounded uncertainty, storage accessibility, minimum resource baseline. | Host is accepted as a candidate runtime host. |
| 1. Kernel bootstrap | Root identity material, constitutional version, protected configuration, audit journal integrity. | Constitutional Kernel becomes available in restricted bootstrap state. |
| 2. State admission | Ledger consistency, checkpoint validation, policy version verification, secrets reference availability. | Authoritative state is opened read-only until recovery checks pass. |
| 3. Core-service admission | Identity, policy, audit, transaction, mode, supervisor, and observability readiness. | Core control plane becomes ready. |
| 4. Capability admission | Node/provider identities, capability manifests, health, current delegation, treaty status. | Capabilities are registered but not necessarily schedulable. |
| 5. Active admission | Readiness quorum, current Self Model, verified runtime mode, declared limitations. | HAL accepts normal or degraded work consistent with mode. |

## 5. Runtime State Machine

The Mode Manager owns the current runtime mode. Every transition creates an immutable mode-transition event containing cause, evidence, affected capabilities, authority, and recovery criteria.

| Mode | Permitted behavior | Exit criteria |
| --- | --- | --- |
| Bootstrap | Identity and protected-state verification only. No external actions. | Kernel and state admission succeeds. |
| Normal | All healthy, authorized capabilities may operate under ordinary policy and transaction controls. | Detected degradation, scheduled maintenance, emergency, or shutdown. |
| Degraded | Healthy capabilities operate with disclosed limitations; scheduler excludes unfit components. | Required health and verification evidence restore confidence. |
| Restricted | Local reasoning, monitoring, evidence collection, and safe read operations; no protected permanent mutations. | Partition or integrity condition is reconciled and verified. |
| Safe Mode | Read-only inspection, recovery, audit, and Owner-authorized repair paths only. | Root cause is addressed and recovery verification passes. |
| Recovering | Journal replay, reconciliation, restore, integrity checks, and staged re-admission. | Authoritative state and readiness gates pass. |
| Maintenance | Approved scoped maintenance; unrelated work is isolated or deferred. | Maintenance change is verified, rolled back, or concluded. |
| Emergency | Priority routing for an active emergency under explicit emergency policy. | Emergency closes; post-incident review and reconciliation begin. |
| Offline | No external connectivity assumed. Local rules still apply; network-dependent capabilities are unavailable. | Connectivity and peer identity are re-established and verified. |

## 6. Service Lifecycle and Supervision

Every governed service declares identity, dependency contracts, readiness criteria, resource limits, failure behavior, restart policy, state ownership, and evidence produced. The supervisor may restart a failed service, move work, rebuild a projection, or isolate a node. It may not modify the service’s policy, delegation, constitutional role, or persistent authoritative data outside the established recovery path.

- A service transitions through Defined, Starting, Ready, Busy, Draining, Stopped, Failed, Quarantined, or Recovering.

- Liveness proves that a service is reachable; readiness proves it is fit to receive a declared workload. Neither substitutes for authorization or trust.

- Restart budgets prevent a crash loop from consuming resources or creating noisy, misleading health evidence.

- Stateful services drain or checkpoint before planned retirement. Stateless services may be replaced after contract compatibility and provenance checks.

- A quarantined service or node may collect evidence but receives no work that can change protected state until re-admitted.

- An agent runtime is a governed service/provider for lifecycle purposes. It may be stopped, quarantined, replaced, or reconstructed without acquiring authority over HAL or releasing itself from quarantine.

## 7. Resource and Attention Admission

The Resource Governor evaluates physical and cognitive resource budgets before work begins. It uses the scheduling and attention systems to select the smallest adequate execution scope. Resource exhaustion is a source of evidence, not an excuse to bypass controls.

| Budget | Examples of enforcement |
| --- | --- |
| Physical | CPU, GPU, memory, storage, thermal, power, and network headroom; admission limits and node fitness checks. |
| Cognitive | Reasoning, planning, retrieval, simulation, reflection, and learning allocations; attention budgets and starvation review. |
| Safety | Maximum concurrency for physical actions, transaction blast radius, rollback capacity, and verification capacity. |
| Privacy and treaty | Data classification, permitted destinations, retention, and disclosure bounds. |
| Time | Deadlines, time uncertainty, lease duration, retry horizon, and stale-evidence limits. |

## 8. Failure Detection and Containment

Failure detection combines heartbeat, readiness, integrity, behavior, resource, and cross-subsystem evidence. The system avoids interpreting a missing heartbeat as a definitive explanation. It records a hypothesis, confidence, scope, and recommended containment action.

| Failure class | Containment response |
| --- | --- |
| Single optional service | Isolate, restart within budget, route to a compatible alternative, and disclose degraded capability. |
| Stateful core service | Suspend affected mutations; preserve evidence; fail closed or safe according to the service declaration. |
| Node or provider integrity concern | Quarantine execution authority, collect evidence, require controlled recovery before rejoin. |
| Network partition | Enter Restricted mode for isolated partitions; prohibit canonical commits and governance actions until reconciliation. |
| Resource exhaustion | Apply admission control, defer low-priority work, reduce optional workloads, and preserve critical recovery capacity. |
| Constitutional integrity concern | Enter Safe Mode; stop protected mutations; escalate to Owner Authorization Ceremony for any repair requiring protected change. |

## 9. Shutdown, Handoff, and Recovery

A planned shutdown is a transaction: HAL drains active work, records handoff state, closes or compensates transactions, checkpoints durable state, preserves audit and mode evidence, and verifies that recovery material is available. An unplanned shutdown is treated as an incident. On restart, HAL does not assume previous work succeeded; it reconstructs state from durable facts and verification.

- Graceful shutdown stops new work first, then drains reversible work, then handles protected transactions according to their recovery contract.

- Every in-flight transaction has a durable status: pending, committed, compensated, abandoned with evidence, or awaiting Owner decision.

- Recovery replays authoritative journals, verifies checkpoints, identifies uncertain effects, and uses reconciliation rather than duplicate execution.

- Nodes and services rejoin gradually: identity, integrity, policy, trust, state synchronization, health, and capability fitness are separately verified.

- Restoration is not complete until a recovery verification record proves the restored system can read, reason, enforce policy, and execute only within its permitted mode.

## 10. Runtime Observability and Self Model

The runtime publishes evidence to the operational and cognitive self-model. It reports current mode, active limitations, health dimensions, resource headroom, dependency status, admission decisions, restart history, recovery progress, time confidence, and calibration concerns. A status response is evidence-backed; a language model may render it, but it does not invent it.

## 11. Runtime Guarantees

- HAL MUST establish constitutional identity and protected state before accepting protected work.

- HAL MUST record mode changes, recovery transitions, and authoritative state changes as durable evidence.

- HAL MUST NOT treat local network location, a successful heartbeat, or service availability as sufficient trust or authorization.

- HAL MUST NOT silently change its rules as a consequence of degradation, partition, overload, recovery, or emergency.

- HAL MUST apply the declared failure behavior of each capability and make reduced capability visible to affected participants.

- HAL MUST preserve an auditable path from request, through runtime mode and resource admission, to execution evidence and outcome.

## 12. Constitutional Traceability Audit

| Constitutional decisions | Chapter 2 implementation coverage |
| --- | --- |
| 17–25 | Logical execution nodes, resource limits, lifecycle, work scheduling, capability allocation, recovery, secure communication, consistency, policy enforcement. |
| 28–29 | Operational/cognitive self-awareness, health forecasting inputs, fault tolerance, split-brain restrictions, self-healing boundaries, failure declaration. |
| 35, 38–45 | Transactions, supervision, configuration integrity, observability, resources, durable recovery, safe lifecycle change, temporal confidence, Presence continuity. |
| 47, 50–51 | Distributed coordination, reality modes, verification gates, self-description, identity continuity, constitutional mirror inputs. |
| 54, 56 | Attention budgets, starvation prevention inputs, explicit limits, uncertainty-aware restriction and escalation. |

## 13. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None identified. Runtime behavior preserves Book I authority boundaries. |
| Lifecycle completeness | Startup, admission, active operation, degradation, containment, shutdown, and recovery are covered. |
| Failure posture | Mode transitions, service isolation, resource admission, and partition restrictions are explicit. |
| Unnecessary coupling | Specific process managers, databases, and orchestration frameworks are intentionally deferred. |
| Owner review required | None. The chapter defines implementation mechanics without changing constitutional philosophy, values, or authority. |

## 14. Completion Status

Chapter 2 is complete. It establishes the runtime contract that later service, event, storage, and deployment chapters must satisfy. Chapter 3 will define the Constitutional Kernel and the narrow enforcement interfaces on which the runtime depends.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.

- No substantive constitutional or cross-chapter correction was required in this edition.

---

## Chapter 3 — Constitutional Kernel

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | Protected enforcement boundary, root state, kernel contracts, mutation protocol, and recovery authority |
| Constitutional basis | Decisions 1–7, 24–29, 35, 38–43, 47–51, 56, and 58 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

The Constitutional Kernel is the smallest HAL subsystem that must remain trustworthy for HAL to preserve constitutional identity. It is not a general-purpose application framework, planner, model host, or database. It holds the authority to establish root identity, evaluate protected policy, validate Owner authorization, preserve protected audit evidence, coordinate irreversible commits, and control recovery admission. Every other service is replaceable; the kernel is deliberately narrow, explicit, and continuously verifiable.

## 2. Design Boundary

The kernel enforces constitutional constraints. Governed services supply reasoning, proposals, evidence, state transformations, and execution results. The kernel decides only whether a protected request has the identity, authority, policy context, evidence, verification, and durable record required to proceed. It does not substitute its own judgment for the Intent, Trust, Planning, or Judgment services.

| Kernel responsibility | Explicit non-responsibility |
| --- | --- |
| Root identity and trust anchor | Natural-language interpretation or personality |
| Protected policy and authorization evaluation | Planning, ranking, or goal selection |
| Owner Authorization Ceremony validation | Model inference or provider routing |
| Constitutional version and invariant admission | Search, retrieval, or knowledge graph maintenance |
| Protected audit append and evidence binding | Direct control of optional capabilities |
| Commit coordination for protected state | Application-specific business logic |
| Recovery and re-admission authority | Silent repair of constitutional state |

## 3. Kernel Root State

Kernel root state is compact, versioned, cryptographically protected, and independently recoverable. It is sufficient to determine which constitutional identity is being restored and whether a proposed protected action is permitted. It never depends on a single model, provider, hardware host, or presentation layer.

| Root-state record | Purpose |
| --- | --- |
| Constitutional Identity Record | Stable HAL identity, root public keys, approved recovery roots, and continuity metadata. |
| Owner Authority Record | Exactly one active constitutional Owner identity, protected succession state, and owner-authentication requirements. |
| Constitution and Invariant Registry | Signed constitutional versions, immutable invariant declarations, effective dates, compatibility markers, and amendment lineage. |
| Protected Policy Registry | Active constitutional and protected policies, policy version lineage, and policy-evaluator manifests. |
| Authorization Ceremony Registry | Pending and completed protected authorizations, exact change bindings, expiry, replay protection, and audit references. |
| Protected Audit Anchor | Append-only audit chain roots, checkpoints, witness references, and integrity-verification history. |
| Recovery Admission Record | Trusted recovery material, last verified restore state, emergency restrictions, and re-admission evidence. |

## 4. Kernel Contracts

Kernel interfaces are typed, versioned contracts. A caller submits a command or query under an authenticated service identity. The kernel returns a signed decision, a narrowly scoped capability token, a denial with rationale, or a request for additional evidence or Owner authorization.

| Contract | Primary input | Kernel result |
| --- | --- | --- |
| EvaluateProtectedAction | Actor, intent, scope, policy context, evidence, requested effect. | Allow, deny, require verification, require Owner ceremony, or route to recovery/safe mode. |
| BeginProtectedTransaction | Authorized plan, rollback/compensation path, blast radius, verification requirement. | Transaction lease and immutable policy/authority binding. |
| CommitProtectedMutation | Transaction result, verification evidence, state version precondition, audit payload. | Atomic commit, compensating action, or durable pending/recovery state. |
| ValidateOwnerAuthorization | Exact change identifier, current owner session evidence, fresh authorization factor. | One-time signed authorization or denial. |
| VerifyConstitutionalState | Constitution version, invariant set, root-state evidence, audit anchors. | Admit, restrict, or enter Safe Mode. |
| AdmitRecovery | Restore evidence, integrity report, reconciliation plan, current policy and identity state. | Recovery admission plan or rejection. |
| IssueDelegatedExecutionEnvelope | Authorized actor, capability scope, time limit, transaction/correlation context. | Non-transferable, auditable, narrowly scoped execution envelope. |

## 5. Protected Mutation Protocol

A protected mutation is any state change that affects constitutional rules, protected policy, Owner authority, identity, trust requirements, authentication requirements, audits, quarantines, Treaties, capability classes, or protected permanent state. Protected mutations use a deliberate prepare–verify–authorize–commit sequence.

- Prepare: the requesting service creates a complete change object with exact intended effect, alternatives, affected state, risk, rollback or recovery plan, and required verification.

- Validate: the kernel checks identity, delegation, policy, constitutional version compatibility, transaction preconditions, current operating mode, and evidence freshness.

- Verify: the Verification Service supplies required simulation, shadow, canary, integrity, or recovery evidence; the kernel records its result without inventing confidence.

- Authorize: if the change crosses a protected threshold, the kernel requires the Owner Authorization Ceremony bound to the exact immutable change identifier.

- Commit: the kernel writes the protected audit record and commits only if state versions, authorization, verification, and policy bindings still match.

- Observe: outcome evidence, rollback readiness, and post-change health are attached. A changed proposal invalidates prior authorization and must restart the ceremony.

## 6. Owner Authorization Ceremony Enforcement

The kernel enforces the constitutional distinction between deliberative assent and verified authorization. Ordinary conversational agreement, including “yes,” “lock it in,” or “go ahead,” is never an execution credential for a protected change. The kernel accepts only a fresh, time-limited, non-replayable authorization bound to one exact change object and supported by current Owner identity and liveness evidence.

| Requirement | Kernel enforcement |
| --- | --- |
| Exact binding | Authorization includes the immutable change identifier, affected records, and canonical change digest. |
| Freshness | Authorization expires quickly and cannot be reused after completion, timeout, or material proposal change. |
| Identity and liveness | The kernel verifies active Owner authentication evidence; a successful historical session is insufficient. |
| Factor independence | Authorization factor is separate from ordinary conversation and may combine passkey, hardware key, PIN, biometrics, signed Owner device, or future approved liveness method. |
| Auditability | The ceremony records the proposal, disclosures, authentication evidence class, authorization result, and execution outcome without unnecessarily exposing secrets. |
| Failure behavior | If any required check is unavailable or uncertain, the change remains pending or is denied; standards never relax because a factor is unavailable. |

## 7. Invariants and Safe Mode

The kernel treats an invariant conflict, untrusted root state, broken audit chain, unresolved Owner identity conflict, or unauthorized constitutional mutation as a constitutional incident. It enters Safe Mode for affected protected domains, preserves evidence, and permits only inspection, recovery, and Owner-authorized repair paths.

- There is exactly one active constitutional Owner identity at any time.

- No protected state change is valid without a corresponding immutable audit record and applicable authorization evidence.

- No service may impersonate another service or broaden its delegated authority.

- No node, provider, presence, network location, or historical trust score substitutes for current identity, authorization, and policy evaluation.

- Failures may change capabilities but may never silently change HAL’s rules.

- Constitutional identity persists through implementation replacement only when root state, constitutional lineage, governed memory, audit continuity, and authority are preserved.

## 8. Kernel Availability and Recovery

The kernel is replicated or recoverable according to the deployment’s protected-state durability policy, but it is logically singular: concurrent partitions cannot independently make protected canonical commits. A partition lacking required quorum or current constitutional state enters Restricted mode. Recovery uses signed constitutional mirrors, protected audit checkpoints, independent backups, and reconciliation evidence before resuming protected work.

| Condition | Kernel behavior |
| --- | --- |
| Optional governed service unavailable | Kernel continues enforcing protected controls; related capability is unavailable or degraded. |
| Kernel replica disagreement | Reject protected commits; preserve evidence; reconcile using audit anchors and authorized recovery procedure. |
| Audit anchor mismatch | Enter Safe Mode for protected mutations; verify lineage and restore or reconcile before admission. |
| Owner identity uncertainty | Deny protected Owner actions; allow non-protected, separately authorized operation where policy permits. |
| Constitution version mismatch | Admit only the verified compatible version; restrict affected services and require governed amendment/recovery path. |
| Host replacement or migration | Re-establish root state, verify recovery material, re-bind host identity, and perform staged runtime admission. |

## 9. Security and Privacy Posture

Kernel credentials and root records use hardware-backed or equivalently protected key material where available. Secrets are referenced rather than exposed to ordinary services. The kernel minimizes retained sensitive payloads: it records evidence identifiers, digests, classifications, and access decisions unless protected content is essential to constitutional recovery or audit. All kernel contracts require authenticated, integrity-protected communication; sensitive payloads remain encrypted to authorized recipients.

## 10. Kernel Observability

The kernel publishes a bounded Self Model projection: constitutional version, invariant verification state, current mode, protected-policy version, audit-anchor health, pending authorization ceremonies, recovery status, and declared limitations. It does not expose secret material, raw authorization factors, or unnecessary private payloads. Any inconsistency between the projection and protected root state is a constitutional incident.

## 11. Guarantees

- The kernel MUST be the only path for constitutional and other protected commits.

- The kernel MUST bind protected decisions to identity, authority, policy, evidence, verification, time, and immutable audit evidence.

- The kernel MUST NOT infer protected authorization from conversational language, a prior approval, a cached session, or a network location.

- The kernel MUST fail safe for uncertain protected state and MUST preserve the evidence necessary for recovery and Owner review.

- The kernel MUST expose narrow contracts so governed services remain replaceable without gaining constitutional authority.

- The kernel MUST verify continuity before admitting restored, migrated, or partitioned protected state.

## 12. Constitutional Traceability Audit

| Constitutional decisions | Chapter 3 implementation coverage |
| --- | --- |
| 1–7 | Constitutional core boundary, event/audit journal, identity continuity, self-model evidence, governed service contracts. |
| 24–29 | Policy enforcement, evidence/trust separation, continuous authentication, introspection, distributed restrictions and recovery. |
| 35, 38–43 | Protected transactions, supervision boundary, configuration integrity, observability, durability, recovery, safe change. |
| 47–51 | Coordination without authority transfer, ownership and succession, sovereignty, verification, self-description and constitutional continuity. |
| 56, 58 | Uncertainty-driven restraint, explicit Safe Mode, amendment lifecycle support, and protected invariants. |

## 13. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None identified. The kernel implements, rather than extends, Book I authority. |
| Scope discipline | Planning, learning, model execution, and external integration remain outside the kernel. |
| Authorization safety | Exact-change binding, freshness, liveness, independent factor, and audit requirements are explicit. |
| Recovery posture | Partition, mismatch, migration, and audit-integrity failure paths enter restriction or Safe Mode. |
| Owner review required | None. Kernel boundaries and contracts are implementation choices consistent with already locked constitutional requirements. |

## 14. Completion Status

Chapter 3 is complete. It establishes the narrow enforcement boundary that permits later policy, identity, audit, transaction, and recovery services to evolve without diluting constitutional authority. Chapter 4 will specify Identity and Continuity.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Authority Service may prepare protected decisions, but only the Constitutional Kernel may validate and commit them.

- A recovery constitutional lease is limited to 24 hours. Any extension requires fresh Owner authorization bound to the exact successor, constitutional state, and duration; expiry stops protected canonical mutation and returns the successor to Restricted or Safe Recovery mode.

- An invariant change requires two exact-change Owner Authorization Ceremonies separated by a 72-hour cooling-off period, with a Constitutional Mirror, independently verified recovery point, and explicit continuity classification.

---

## Chapter 4 — Identity and Continuity

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | Universal identity, authentication, delegation, health, quarantine, privacy scope, and lifecycle |
| Constitutional basis | Decisions 6, 19, 25, 27, 29, 32, 39, 45, 47–49, and 51 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

This chapter specifies how HAL establishes who is involved in every interaction without confusing identity, authentication, trust, authority, ownership, or relationship. Identity is durable and universal: people, devices, services, nodes, providers, Presences, agents, sensors, and HAL subsystems all have identities. Authentication evaluates the present session; delegation grants bounded authority; trust evaluates credibility; none automatically substitutes for another.

## 2. Identity Model

| Concept | Definition | May change? |
| --- | --- | --- |
| Identity | A stable, immutable principal identifier with type, public-key material, lifecycle state, and audit lineage. | No; display and metadata may evolve. |
| Authentication session | Current evidence that a live actor controls or represents an identity. | Yes; confidence and factors expire or degrade. |
| Authority | Permission to perform a defined action in a defined scope. | Only through policy, ownership, or delegation. |
| Trust | Domain-specific assessment of credibility or reliability. | Yes; evidence-driven and independent of authority. |
| Ownership | Constitutional or administrative responsibility for an identity. | Only through governed transfer or lifecycle procedure. |
| Presence | A contextual embodiment through which an identity interacts. | Yes; a Presence never becomes the identity. |

## 3. Identity Record and Lifecycle

The Identity Service is the authoritative owner of Identity Records. Each record contains immutable identifier, principal type, owner relationship, public-key or credential references, lifecycle state, authorization bindings, privacy scope, provenance, and audit references. Mutable aliases and display names are versioned metadata and never determine constitutional authority.

| Lifecycle state | Meaning | Permitted posture |
| --- | --- | --- |
| Proposed | Identity observed or requested but not admitted. | No authority; evidence collection only. |
| Registered | Identity record exists with minimum provenance. | May authenticate only if policy allows. |
| Verified | Identity proof and required integrity checks pass. | Eligible for explicitly granted authority. |
| Active | Identity is current, healthy enough, and usable. | Normal scoped operation. |
| Degraded | Health or authentication confidence has fallen. | Reduced disclosure and policy-defined step-up. |
| Quarantined | Compromise, anomaly, or integrity concern requires containment. | No new protected work; forensic evidence and recovery only. |
| Retired | Identity is no longer active but history remains. | No authentication or authority; audit and recovery reference retained. |

## 4. Authentication and Session Confidence

Authentication is continuous, evidence-based, and context-sensitive. Sessions contain issued time, expiry, participant identity, factor evidence class, liveness evidence, device and network context, assurance level, and current confidence. A session is not a standing authorization grant. Sensitive actions independently invoke current policy and, where required, step-up or Owner Authorization Ceremony verification.

- Authentication evidence MAY include passkeys, security keys, signed device assertions, biometrics, PINs, certificates, network context, behavior, and approved future liveness signals.

- HAL MUST distinguish identity confidence from authentication confidence. A failed factor does not create a new identity; it reduces confidence in the current session.

- A lower confidence changes disclosure and action eligibility only through explicit policy; it never silently reclassifies the identity or grants a workaround.

- High-risk and protected actions require fresh, independent evidence. Cached conversation context, IP address, voice alone, or historical trust is insufficient.

## 5. Delegation and Attribution

Delegation is an explicit object that preserves origin. It names delegator, recipient, scope, purpose, conditions, expiration, revocation path, allowed delegation depth, and audit references. Every delegated action records both the executing identity and the delegating chain. HAL never claims delegated actions as its own.

| Control | Requirement |
| --- | --- |
| Scope | Capability- and resource-specific; no implicit role expansion. |
| Duration | Time, task completion, number of uses, or explicit revocation; expiry is enforced at invocation. |
| Depth | Bounded delegation chain; each link preserves the origin and cannot broaden scope. |
| Revocation | Immediate durable revocation takes precedence over cached envelopes. |
| Attribution | Commands, transactions, results, and audit records carry executor and delegation chain. |
| Protected boundaries | Constitutional Owner powers, protected recovery, constitutional amendments, and other protected actions remain non-delegable unless Book I explicitly permits the governed procedure. |

## 6. Identity Health, Quarantine, and Recovery

Identity health is an evidence-based security assessment, separate from identity itself. Indicators include credential compromise, certificate expiry, impossible travel, device cloning, replay evidence, voice mismatch, repeated failures, unexpected hardware, and integrity drift. A health concern can trigger disclosure reduction, factor step-up, authority suspension, or quarantine according to policy.

- Quarantine preserves the identity record, evidence, and history; it restricts credentials, execution envelopes, and new work.

- No identity may self-release from quarantine. Recovery verifies identity, integrity, policy, evidence, and required Owner authority before gradual re-admission.

- Protected identities, including the Owner, use the Owner Authorization Ceremony and recovery policies; HAL may contain risk but cannot silently demote, replace, or restore constitutional authority.

- Compromise does not propagate upward through ownership. A compromised phone, node, or Presence does not become a compromised Owner identity by assumption.

## 7. Privacy, Relationship, and Presence Scope

Human identities may have personal, shared, or delegated visibility scopes. Relationship, trust, and household membership are not authority grants. Presence context—room, device, audience, sensor state, and privacy characteristics—can influence safe disclosure but never proves identity or creates permission. The Identity Service supplies identity and scope facts; the Policy System determines whether an exchange is allowed.

## 8. Continuity and Federation

HAL’s identity remains one constitutional identity across Presences and governed nodes. A node, mobile device, external provider, or federated HAL is a separate identity and trust domain. Federation shares only Treaty-authorized information and capability use; it never merges constitutional ownership, private memory, or authority by default. The Constitutional Mirror binds the current identity, Owner authority, constitutional lineage, and active continuity state for recovery and migration.

## 9. Interfaces

| Interface | Semantics |
| --- | --- |
| Identity query | Returns identity facts, lifecycle state, ownership, and permitted non-secret metadata. |
| Authenticate / refresh session | Accepts evidence; returns assurance, expiry, limitations, and audit reference. |
| Evaluate delegation | Checks current scope, conditions, revocation, chain depth, and policy. |
| Issue execution envelope | Produces a short-lived, non-transferable delegation binding for one capability invocation or transaction. |
| Report identity evidence | Adds health, compromise, integrity, or recovery evidence without changing authority directly. |
| Quarantine / recover identity | Policy-governed state transition requiring required evidence and protected authorization. |

## 10. Guarantees

- Every meaningful request, action, and result MUST be attributable to a verified or explicitly uncertain identity context.

- Identity, authentication, trust, authority, and ownership MUST remain independent dimensions.

- Authority MUST flow through explicit policy or delegation, never relationship, proximity, provider capability, or local network location.

- Delegated authority MUST be scoped, attributable, revocable, and time-bounded.

- Quarantine and recovery MUST preserve evidence and MUST NOT permit self-release.

- HAL MUST preserve one constitutional identity even while interfaces, devices, services, and hosts change.

## 11. Constitutional Traceability Audit

| Constitutional decisions | Chapter 4 implementation coverage |
| --- | --- |
| 6, 19, 25 | Immutable identity, node identity/lifecycle, policy-governed evaluation and mutation. |
| 27, 29, 32 | Universal identities, continuous authentication, delegation, identity quarantine, secure communication. |
| 39, 45, 47 | Scoped secrets and credentials, one identity across Presences, secure node identity and distributed continuity. |
| 48–49, 51 | Single Owner, explicit delegation, sovereign trust domains, Treaty boundaries, Self Model and Constitutional Mirror. |

## 12. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None identified. Separation of identity, authentication, trust, authority, and ownership is preserved. |
| Security posture | Continuous authentication, scoped delegation, quarantine, and recovery are explicit. |
| Privacy posture | Presence and relationship context influence disclosure only through policy. |
| Owner review required | None. This chapter implements already locked identity and delegation rules. |

## 13. Completion Status

Chapter 4 is complete. Chapter 5 will specify the Authority and Delegation enforcement model, including policy evaluation and protected authorization paths that consume the identity facts defined here.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.

- No substantive constitutional or cross-chapter correction was required in this edition.

---

## Chapter 5 — Authority and Delegation

| Field | Value |
| --- | --- |
| Status | Revised after whole-book constitutional and cross-chapter audit |
| Version | 0.2 |
| Scope | Authority sources, policy evaluation, delegation enforcement, protected actions, and audit |
| Constitutional basis | Decisions 5, 9–10, 16, 21, 25, 27, 31–33, 35–36, 39, 46, 48–50, and 58 |
| Owner review | No unresolved Owner decision after whole-book audit |

## 1. Purpose

Authority answers one question only: “Who is permitted to cause this effect, in this context, now?” This chapter defines a policy-governed authorization system that consumes identity, authentication, delegation, context, evidence, and transaction facts. Trust, capability, relationship, ownership, and authentication may inform evaluation, but none automatically grants permission.

## 2. Authority Sources and Precedence

| Source | Meaning | Limit |
| --- | --- | --- |
| Constitutional Owner | The sole holder of constitutional authority. | Protected actions still require policy and, where required, the Owner Authorization Ceremony. |
| Constitutional invariant | A non-ordinary constraint on what HAL may become or permit. | Cannot be bypassed by role, delegation, urgency, or provider capability. |
| Policy grant | A rule-defined authorization under declared conditions. | Must be current, deterministic, and auditable. |
| Delegation object | A bounded grant from an authorized delegator to a recipient. | Cannot exceed, outlive, or broaden its source authority. |
| Transaction authorization | A short-lived authorization to execute one validated effect. | Bound to exact scope, policy version, delegation chain, and commit rules. |
| Emergency procedure | A policy-defined exceptional path. | Never removes identity, audit, evidence, or post-incident accountability. |

## 3. Authorization Decision Model

The Authority Service evaluates a structured Authorization Request. It returns Allow, Deny, Require Step-Up, Require Owner Ceremony, Require Verification, Defer, or Escalate. A decision is an immutable Policy Decision Record, not an undocumented boolean.

| Required input | Purpose |
| --- | --- |
| Actor and session | Establish current identity and authentication assurance. |
| Requested effect | Names target, operation, resource, data classification, side effects, and blast radius. |
| Intent and transaction context | Links the effect to approved purpose, plan, correlation, and recovery contract. |
| Delegation chain | Proves source authority, scope, purpose, conditions, depth, expiry, and revocation state. |
| Policy and constitutional context | Pins policy version, invariant state, operating mode, Treaty, and applicable constraints. |
| Evidence and verification state | Supplies freshness, risk evidence, required tests, and uncertainty. |
| Environment and time | Supplies approved contextual facts; neither network location nor relationship substitutes for permission. |

## 4. Evaluation Sequence

- Authenticate the actor and validate session freshness, assurance, and liveness requirements.

- Resolve the requested effect to a capability contract, data/resource scope, and risk class.

- Load applicable constitutional invariants and deterministic policy versions; reject an invalid or ambiguous policy set.

- Validate delegation from the originating authority through every link; enforce scope intersection, conditions, expiry, revocation, and depth.

- Evaluate treaty, privacy, environment, resource, transaction, verification, and operating-mode constraints.

- Produce a signed decision record with rationale, constraints, evidence references, expiry, and any required step-up or ceremony.

- For allowed execution, issue a narrowly scoped, short-lived, non-transferable execution envelope; re-evaluate at commit barriers.

## 5. Delegation Enforcement

Delegation is subtractive: each link can only retain or narrow authority received from the previous link. An execution envelope is never a general credential. It can authorize only the specified effect, subject, resource, purpose, time window, conditions, and transaction context.

| Rule | Enforcement |
| --- | --- |
| No ambient authority | Secrets, service identity, hardware possession, or provider integration do not create permission. |
| Scope intersection | The effective authority is the narrowest scope across Owner/policy/delegation/transaction/Treaty constraints. |
| Purpose binding | A grant may be used only for its recorded purpose and approved intent relationship. |
| Fresh revocation | Invocation and commit validate current revocation state; cached envelopes do not survive revocation. |
| Attribution | Records retain originator, executors, every delegation link, policy version, and decision rationale. |
| No silent escalation | A missing grant, uncertain policy, or unavailable evaluator yields defer, deny, or safe restriction—not inferred access. |

## 6. Protected Actions

Protected actions include constitutional amendments, protected policy changes, Owner authority or succession changes, identity recovery, quarantine release, capability-class activation, Treaty activation, cryptographic protected deletion, and changes to trust/authentication requirements. These actions require the Constitutional Kernel, risk-scaled verification, and the Owner Authorization Ceremony when Book I requires it.

- Agreement in ordinary conversation permits proposal preparation but is never a protected execution credential.

- Authorization binds to the exact immutable change object. A material change invalidates prior authorization.

- The safest reversible default applies when evidence, identity, policy, time, or ceremony requirements are incomplete.

- Emergency urgency may change scheduling and notification, never the constitutional proof burden or immutable audit requirement.

## 7. Interfaces and Evidence

| Interface | Result |
| --- | --- |
| Authorize effect | Signed Allow/Deny/Step-Up/Verify/Escalate decision with rationale and expiry. |
| Issue execution envelope | Short-lived scoped envelope bound to decision, actor, transaction, and capability contract. |
| Revoke delegation or envelope | Durable revocation event and immediately effective policy state. |
| Explain decision | Human-appropriate explanation plus forensic references to policy, authority, evidence, and constraints. |
| Audit query | Authorized read of decision chain, approvals, execution results, and outcome evidence. |

## 8. Guarantees

- HAL MUST authorize effects, not identities in the abstract.

- HAL MUST NOT derive authority from trust, relationship, proximity, network location, model confidence, or capability availability.

- Every protected action MUST have a deterministic policy basis, immutable decision record, and required verification and Owner authorization.

- Delegation MUST be explicit, narrowable, revocable, attributable, and bounded by time and conditions.

- Authorization decisions MUST be explainable and reproducible from pinned policy, evidence, and context.

- If authority cannot be established, HAL MUST safely defer, deny, or escalate.

## 9. Constitutional Traceability Audit

| Decisions | Coverage |
| --- | --- |
| 5, 9–10, 16, 21, 25 | Single authority, evidence-based consequential decisions, capability constraints, orchestration, hard policy limits. |
| 27, 31–36, 39 | Authentication, delegated authority, Owner-defined intent, tiered change control, transactions, capabilities, governed secrets. |
| 46, 48–50, 58 | Intent stewardship, sole Owner, sovereignty/Treaties, verification, amendment and authorization ceremony support. |

## 10. Internal Engineering Review

| Check | Result |
| --- | --- |
| Constitutional conflicts | None. Authority remains independent from identity, trust, authentication, and capability. |
| Escalation safety | Explicit evaluation, envelope binding, revocation, and protected action controls are included. |
| Auditability | Every outcome carries pinned policy, evidence, delegation, and transaction references. |
| Owner review required | None. The chapter implements existing constitutional authority rules without changing Owner powers. |

## 11. Completion Status

Chapter 5 is complete. Chapter 6 will specify Intent and Planning Architecture, which provides the purpose and plans that authorization evaluates without granting authority itself.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Protected deletion never removes an Experience Object from the immutable ledger sequence.

- Authorized deletion may cryptographically erase a protected payload and remove non-authoritative copies, caches, indexes, and external replicas.

- A minimal non-sensitive tombstone remains with the authority, time, scope, and proof of deletion.

- Protected deletion requires the Owner Authorization Ceremony. Removal of the event identity or tombstone would require a constitutional amendment.

---

# Chapter 6 — Intent and Planning Architecture

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Translate Owner-defined purpose into living, reviewable plans while preserving the distinction between destination, planning, execution, and outcome.

## Authoritative Responsibilities

- **Intent Manager:** Intent Objects, hierarchy, approval state, health and lifecycle
- **Planning Service:** Plan Graphs, alternatives, dependencies and replanning history
- **Goal Health Service:** Progress, momentum, blockers, confidence, risk and alignment
- **Initiative Governor:** Initiative budgets, interruption policy and permitted proactive work

## Core State and Records

- **Intent Object:** Purpose, motivation, desired outcome, constraints, horizon, review cadence, confidence and Owner approval.
- **Plan Graph:** Strategies, milestones, tasks, dependencies, assumptions, verification and approved flexibility.
- **Intent Conflict:** Competing intentions, affected outcomes, tradeoffs and required Owner judgment.
- **Owner Compass:** Evidence-backed representation of stated enduring priorities; never an independent source of values.

## Runtime Workflow

1. Capture the Owner’s stated purpose without silently promoting ordinary conversation into a durable goal.
2. Classify intent as immediate, project, strategic or enduring and request approval where persistence or autonomy changes.
3. Generate alternatives and a Plan Graph with dependencies, risks, evidence needs, verification and resource estimates.
4. Evaluate alignment, goal health, policy, authority and conflicts before work reaches execution.
5. Permit replanning inside approved flexibility; return material destination changes to the Owner.
6. Record outcomes and revise plans without rewriting the originating intent or historical decisions.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Ambiguous destination: ask or preserve a provisional Intent Object; do not invent purpose.
- Conflicting goals: surface the conflict and tradeoffs; do not silently choose a value hierarchy.
- Stalled work: update goal health and recommend options; inactivity is not permission to retire the goal.
- Missing resources or providers: replan or defer without weakening policy or authority.

## Constitutional Guarantees

- Only the Owner defines, adopts, materially changes or retires durable goals.
- Every autonomous action traces to an approved intent and current delegation.
- Plans may evolve; the destination and historical intent remain attributable.
- Initiative is bounded by policy, authority, attention budget and Owner-configured tolerance.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 12, 16, 20–21, 31, 35, 46, 54–57. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 12, 16, 20–21, 31, 35, 46, 54–57

---

# Chapter 7 — Cognitive Orchestration

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Coordinate models, specialists, retrieval, evidence and review as one governed intelligence without allowing any component to become an unaccountable decision-maker.

## Authoritative Responsibilities

- **Cognitive Orchestrator:** HAL-owned reasoning-session governance, specialist assignments, context boundaries, synthesis requirements, and runtime dispatch; it does not require HAL to implement a reasoning loop.
- **Evidence Synthesizer:** Competing hypotheses, support, contradiction and confidence
- **Peer Review Coordinator:** Independent subsystem review and disagreement records
- **Model/Provider Router:** Fitness-based selection under capability, privacy, cost, policy and health

## Core State and Records

- **Reasoning Session:** Question, intent, evidence set, assumptions, participants, model/provider provenance and confidence.
- **Hypothesis Set:** Competing explanations with supporting and contradicting evidence.
- **Specialist Contribution:** Bounded claim or artifact with identity, domain, limitations and provenance.
- **Disagreement Record:** Subsystem positions, evidence, materiality and escalation disposition.

## Runtime Workflow

1. Establish intent, risk, required evidence and disclosure scope.
2. Select the smallest adequate specialists, providers, and agent runtime through capability contracts and the Agent Runtime Contract.
3. Maintain separate hypotheses and actively seek disconfirming evidence for consequential conclusions.
4. Run cross-subsystem review when policy, trust, learning, planning or safety materially disagree.
5. Select an honest response mode—inform, recommend, explore, ask, verify, escalate or decline—and state assumptions and confidence.
6. Attach the result to a Decision Object; never let a model directly mutate protected state.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Model failure: preserve session evidence and route only to compatible alternatives.
- Context fragmentation: lower confidence and rebuild HAL context from authoritative records; runtime context is operational and replaceable.
- Subsystem disagreement: retain dissent and escalate when material; never hide it in synthesis.
- Calibration drift: report cognitive-health degradation and tighten evidence requirements through policy.

## Constitutional Guarantees

- Models and specialists produce attempts, evidence and recommendations—not constitutional authority.
- Consequential synthesis is reconstructable from evidence, participants and assumptions.
- Uncertainty is a legitimate result and scales with consequence.
- HAL describes its reasoning from governed evidence, never model improvisation.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 7, 9, 13–16, 26, 28, 32, 34, 47, 51, 55–56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 7, 9, 13–16, 26, 28, 32, 34, 47, 51, 55–56

---

# Chapter 8 — Attention and Resource Allocation

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Allocate finite physical, financial, cognitive and human-attention resources according to constitutional responsibility, risk and Owner intent.

## Authoritative Responsibilities

- **Attention Manager:** Attention Objects, focus modes, interruption decisions and history
- **Resource Governor:** Budgets, reservations, admission control, quality of service and emergency reserve
- **Scheduler:** Sole work-admission and placement authority across feasible nodes and providers; consumes temporal constraints from Chapter 13
- **Meta-Attention Reviewer:** Starvation, neglected obligations and recurring blind spots

## Core State and Records

- **Attention Object:** Subject, urgency, importance, responsibility, risk, confidence, novelty, persistence and Owner interest.
- **Resource Budget:** Resource class, amount, period, owner, hard/soft limit and escalation behavior.
- **Focus Mode:** Normal, Deep Work, Owner Conversation, Emergency, Recovery, Maintenance, Observation or Learning.
- **Interruption Decision:** Reason, affected focus, deferred work, delivery timing and evidence.

## Runtime Workflow

1. Create or update Attention Objects from requests, incidents, commitments and reflection.
2. Apply hard constitutional, safety, privacy and resource constraints before optimization.
3. Reserve protected capacity for governance, observability and recovery.
4. Allocate remaining capacity using purpose, risk, deadline, locality, reliability and Owner preferences.
5. Record interruption, deferment, resumption and starvation review.
6. Periodically ask what is being overlooked and elevate neglected responsibilities for review.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Overload: admit constitutional and safety work first; defer optional work visibly.
- Resource exhaustion: preserve recovery reserve and degrade quality or throughput deliberately.
- Attention starvation: age persistent obligations into review without granting automatic execution.
- Emergency mode: reprioritize through explicit policy; do not permanently redefine ordinary priorities.

## Constitutional Guarantees

- Hard constraints are inviolable; optimization occurs only inside the permitted space.
- No workload may starve constitutional, observability or recovery capacity.
- Attention changes are explainable and significant shifts are retained in Attention History.
- High activity is not success; HAL may correctly allocate attention to monitoring or non-action.
- An Agent Runtime may schedule its own internal steps only within a HAL-admitted assignment; its local scheduling never replaces HAL work-admission, placement, resource, or authority decisions.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Chapter 8 Scheduler is the sole authority for work admission and placement.
- Temporal commitments, recurrence, windows, and deadlines are authoritative inputs from Chapter 13; they do not create a second placement authority.


## Source Alignment and Review

This chapter directly implements Decisions 18, 21, 28–29, 41, 46, 54, 57. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 18, 21, 28–29, 41, 46, 54, 57

---

# Chapter 9 — Judgment and Decision Objects

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Make tradeoffs explicit and reconstructable when evidence and constitutional values do not yield one perfect answer.

## Authoritative Responsibilities

- **Decision Service:** Decision Objects, alternatives, dispositions and review history
- **Judgment Engine:** Contextual value and tradeoff analysis; no single permanent optimization score
- **Outcome Reviewer:** Predicted versus observed outcomes and attribution
- **Escalation Coordinator:** Owner review thresholds and pending judgment

## Core State and Records

- **Decision Object:** Question, alternatives, evidence, constraints, assumptions, stakeholders, confidence, recommendation and result.
- **Tradeoff Analysis:** Gain, loss, affected parties, opportunity cost, reversibility, waiting value and time horizons.
- **Value Impact:** Constitutional integrity, safety, Owner intent, privacy, honesty, trust, recovery, evidence and stewardship.
- **Decision Review:** Expected versus actual outcome, attribution, lessons and follow-up.

## Runtime Workflow

1. Frame the decision and distinguish facts, assumptions, preferences and unknowns.
2. Generate serious alternatives, including waiting, verifying and reversible experiments.
3. Evaluate each alternative across affected parties and immediate through constitutional horizons.
4. Prefer reversible decisions under uncertainty when practical.
5. Escalate value-laden, protected or irreversible choices beyond delegated authority.
6. Record the decision, rationale, dissent, opportunity cost and subsequent outcome review.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Insufficient evidence: ask, verify, defer or decline according to impact if wrong.
- Conflicting values: explain the tradeoff and request Owner judgment when delegation is insufficient.
- Outcome differs from forecast: correct the record and learn without rewriting the original rationale.
- Pressure to optimize one metric: retain multi-value analysis and reject hidden value substitution.

## Constitutional Guarantees

- Judgment balances evidence, constitutional values and Owner intent—not one objective.
- Good judgment is evaluated by reasoning quality as well as outcome.
- Moral uncertainty is disclosed rather than presented as technical certainty.
- Every consequential decision remains attributable, reviewable and auditable.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 9, 26, 31, 34–35, 50, 55–58. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 9, 26, 31, 34–35, 50, 55–58

---

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

---

# Chapter 11 — Learning and Wisdom

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Improve HAL through evidence-backed operational learning while protecting constitutional identity and the Owner’s values from autonomous modification.

## Authoritative Responsibilities

- **Learning Engine:** Candidate learning, domains, experiments, promotion and retirement
- **Learning Ledger:** Evidence, versions, promotions, exceptions, adoption and rollback history
- **Experiment Manager:** Control groups, budgets, verification, risk and outcome measurement
- **Meta-Learning Service:** Calibration of learning effectiveness and drift

## Core State and Records

- **Candidate Learning:** Proposed lesson, domain, evidence, expected benefit, risk and confidence.
- **Learning Promotion:** Information→Knowledge→Experience→Pattern→Wisdom transition with proof.
- **Experiment:** Hypothesis, variants, allocation, safety envelope, metrics and stopping rules.
- **Learning Review Tier:** Automatic, Notify, Recommend or Constitutional; determines adoption and Owner-authorization requirements.
- **Wisdom Object:** Domain-scoped governed judgment with repeated cross-context evidence and exceptions.

## Runtime Workflow

1. Record human teaching or self-generated observation as candidate learning, not truth.
2. Assign domain and applicability; prevent cross-domain transfer without evidence.
3. Run controlled, budgeted and reversible experiments where policy permits.
4. Measure outcomes, calibration, exceptions and unintended effects.
5. Adopt low-risk operational improvements according to review tier; preserve rollback.
6. Require Owner Authorization Ceremony for constitutional or protected behavioral change.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Insufficient evidence: keep the candidate provisional.
- Experiment harms quality or violates guardrail: stop and rollback within the declared envelope.
- Learning drift: quarantine the affected domain and restore the last verified behavior.
- Owner rejects proposal: retain the decision and evidence without covert adoption.

## Constitutional Guarantees

- HAL may improve indefinitely but not at the expense of constitutional identity.
- Wisdom is earned through repeated evidence and changes slowly.
- Every adopted change has evidence, review tier, outcome and rollback history.
- Learning effort is budgeted and subordinate to serving the Owner.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 28, 30, 33–34, 43, 50, 53, 56–58. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 28, 30, 33–34, 43, 50, 53, 56–58

---

# Chapter 12 — Memory and Experience Ledger

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Preserve every conversation, observation, event, action and outcome as immutable experience while managing active context and derived memory separately.

## Authoritative Responsibilities

- **Experience Ledger:** Append-only Experience Objects and integrity chain
- **Context Manager:** Working and short-term Active/Cooling/Dormant context states
- **Conversation Service:** Conversation Objects, participants, purpose, decisions and open work
- **Archive Index:** Searchable dormant experience and retention-class access

## Core State and Records

- **Experience Object:** Identity, timestamp, receipt time, content reference, provenance, classification, causation and integrity.
- **Context Entry:** Experience/knowledge reference, active state, relevance, recurrence, unresolved status and Owner priority.
- **Conversation Object:** Purpose, state, participants, decisions, questions, dependencies and next actions.
- **Memory Derivation:** Summary, pattern or knowledge link with source experiences and method.

## Runtime Workflow

1. Append interaction or event once with identity, time, provenance, classification and causal context.
2. Place relevant references in working context for the active task.
3. Move short-term context through Active, Cooling and Dormant; default active horizon is 30 days but relevance may extend it.
4. Run reflection to link, summarize, generalize or promote while preserving raw experience.
5. Retrieve knowledge first, patterns second and raw experience when needed.
6. Apply visibility and retention policies; protected deletion may cryptographically erase payload access and remove derived copies but never remove the Experience Object or its tombstone from the ledger sequence.
7. Provide only policy-permitted, task-bounded context to an Agent Runtime; runtime-held context is not an Experience Object, Memory Derivation, or canonical knowledge unless it is separately submitted and accepted through HAL’s governed paths.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Ledger append unavailable: do not claim durable completion; buffer only under declared safe policy.
- Corrupt projection: discard and rebuild from authoritative ledger entries.
- Privacy scope uncertain: withhold content and expose only permitted metadata.
- Pattern is disproven: revise derived knowledge; retain the supporting and contradicting experiences.

## Constitutional Guarantees

- HAL never forgets experiences merely because active context expires.
- Expiration changes accessibility, not preservation.
- Derived memory never replaces its source experiences.
- Shared, personal and protected visibility are explicit and policy-enforced.
- Runtime context and runtime memory are operational copies. They are disposable and reconstructable from permitted HAL records; their loss, alteration, or retention does not alter ledger history or canonical knowledge.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Conversation Service is the sole semantic owner of Conversation Objects. The Chapter 23 Thread Service maintains transport and delivery projections only.
- The Experience Ledger sequence is immutable. Protected deletion uses cryptographic erasure, deletes derived copies, and preserves a minimal non-sensitive tombstone.
- Removal of an Experience Object identity, sequence position, or tombstone is prohibited without a constitutional amendment.


## Source Alignment and Review

This chapter directly implements Decisions 4, 11, 24, 30, 32, 40, 42, 44, 48, 53. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 4, 11, 24, 30, 32, 40, 42, 44, 48, 53

---

# Chapter 13 — Temporal Architecture

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Represent time as commitments, dependencies, causality, recurrence, aging and confidence so scheduling and historical reasoning remain honest.

## Authoritative Responsibilities

- **Temporal Service:** Time model, conversions, confidence and correction records
- **Temporal Commitment Service:** Authoritative commitments, dependencies, windows, recurrence and deadlines supplied to the Chapter 8 Scheduler
- **Causal Clock:** Logical ordering for distributed events
- **Aging Service:** Policy-driven freshness, decay and retention transitions

## Core State and Records

- **Temporal Context:** Wall-clock, logical, human and system time with timezone and confidence.
- **Commitment:** Owner, obligation, window, dependency, recurrence, priority and consequence.
- **Temporal Correction:** Original value, corrected interpretation, evidence, reason and audit link.
- **Recurrence Pattern:** Observed cadence, confidence, exceptions and next expected interval.

## Runtime Workflow

1. Capture occurrence time, receipt time, source clock and clock confidence.
2. Order distributed events causally where wall clocks cannot establish certainty.
3. Model commitments as windows and dependencies rather than bare timestamps.
4. Learn recurrence from preserved experiences and maintain exceptions.
5. Age evidence, context and knowledge according to type-specific policy.
6. Correct interpretations by appending clarification; never rewrite historical occurrence records.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Clock disagreement: lower time confidence and use causal ordering.
- Missed deadline: record breach, consequence and recovery; do not move the historical due time.
- Unknown timezone or human intent: ask before creating consequential commitments.
- Offline node: operate within bounded leases and reconcile time evidence on return.

## Constitutional Guarantees

- Historical state can be reconstructed as understood at a prior time.
- History may be clarified but never rewritten.
- Temporal uncertainty is explicit in authorization, evidence and scheduling.
- Recurring behavior is inferred from experience, not assumed from one event.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Temporal Service and Temporal Commitment Service own time facts and scheduling constraints.
- Only the Chapter 8 Scheduler admits and places work. Chapter 13 does not independently dispatch execution.


## Source Alignment and Review

This chapter directly implements Decisions 4, 21, 30, 35, 40, 44, 50, 54. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 4, 21, 30, 35, 40, 44, 50, 54

---

# Chapter 14 — Presence and Human Interaction

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Express one HAL identity through multiple contextual Presences while preserving identity, privacy, authority and conversation continuity.

## Authoritative Responsibilities

- **Presence Manager:** Presence Objects, lifecycle, routing and continuity
- **Presence Interaction Adapter:** Presence modality, audience, handoff and rendering context supplied to the canonical Interaction Session
- **Privacy Context Service:** Audience, location, sensor and disclosure conditions
- **Local Presence Runtime:** Bounded cache, device capability and offline interaction

## Core State and Records

- **Presence Object:** Device, active user, modalities, sensors, outputs, permissions, trust, network, resources and privacy.
- **Interaction Session Reference:** Identifier and Presence/audience context linked to the canonical Interaction Session owned by Chapter 31.
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

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Chapter 31 Interaction Manager is the sole semantic owner of Interaction Sessions.
- Chapter 14 owns Presence Objects, Audience Context, and Presence Handoffs and contributes those facts to the canonical session.


## Source Alignment and Review

This chapter directly implements Decisions 27, 32, 45, 48, 51–52. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 27, 32, 45, 48, 51–52

---

# Chapter 15 — Capability Architecture

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Decouple what HAL intends to accomplish from the replaceable providers and technologies that perform it.

## Authoritative Responsibilities

- **Capability Catalog:** Capability Contract identity, versions, composition and lifecycle
- **Provider Registry:** Current provider identity, availability, health, trust, benchmarks and policy fitness
- **Adapter Manager:** Technical integration, compatibility, sandbox and credential references
- **Capability Router:** Provider choice within policy, privacy, resource, risk and verification constraints
- **Capability Gateway:** Consequential runtime-action admission, capability decision, authorization requirement, scoped delegation, and audit/evidence handoff

## Core State and Records

- **Capability Contract:** Outcome, inputs, outputs, constraints, side effects, quality, permission, risk and evaluation.
- **Provider Manifest:** Claims, versions, dependencies, data use, costs, locality and supported contracts.
- **Provider Fitness Record:** Observed performance, health, trust, calibration, conditions and evidence.
- **Capability Invocation:** Intent, contract version, provider, adapter, execution envelope, transaction and result.

## Runtime Workflow

1. Owner approves a new capability class through the protected process.
2. Discover provider manifests as claims; authenticate and verify the provider identity.
3. Benchmark and observe capability performance before preferred status.
4. Route an approved request using capability fit, policy, privacy, trust, availability, cost and locality.
5. Invoke through a sandboxed adapter with scoped credentials and transaction context.
6. Evaluate result, update fitness evidence and retire or quarantine unsafe providers.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Capability Gateway Boundary

The Capability Gateway is HAL’s conceptual enforcement point for consequential Agent Runtime actions. An Agent Runtime may request a capability (for example, `hal.files.read(...)`); it does not receive unrestricted direct access to governed resources merely because it can technically reach them. The Gateway evaluates the actor identity, agent identity, delegated authority, requested capability, target resource, task context, risk classification, constitutional constraints, policy constraints, human-authorization requirements, and evidence requirements. HAL then permits, denies, narrows, pauses for authorization, or otherwise dispositions the request, recording the decision through the authoritative evidence and audit paths before the actual resource is reached where practical.

This boundary applies to governed files, secrets, nodes, networks, services, physical resources, and other consequential resources. Technical reachability, runtime intelligence, a tool definition, a skill, or a runtime-held credential never substitutes for HAL authorization. The contract remains semantic and implementation-neutral; it does not prescribe the eventual capability naming convention, transport, schema, or credential mechanism.

## Failure and Recovery

- Provider outage: route only to compatible verified alternatives or disclose unavailability.
- Adapter compromise: quarantine adapter/provider and revoke scoped credentials.
- Version incompatibility: retain coexistence or block invocation; never guess contract semantics.
- Treaty missing: external provider receives no protected data or invocation.

## Constitutional Guarantees

- Capabilities extend HAL’s reach but never their own authority.
- Provider claims are evidence candidates, not trusted facts.
- Every invocation is attributable to an approved intent, contract, provider and transaction.
- Implementations may change without changing capability semantics or HAL identity.
- A runtime may request capability use; only HAL may determine that its use is permitted.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 10, 13–16, 21, 29, 32, 36, 41, 43, 49–50. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 10, 13–16, 21, 29, 32, 36, 41, 43, 49–50

---

# Chapter 16 — Action and Transaction Architecture

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Turn approved intent into recoverable, observable execution with explicit commit barriers, rollback and compensation.

## Authoritative Responsibilities

- **Transaction Coordinator:** Transaction state, journals, commit barriers and recovery
- **Execution Orchestrator:** HAL-owned provider/runtime selection, transaction binding, ordering constraints, authorization pauses, cancellation, recovery, and completion coordination; runtime-local execution mechanics remain delegated
- **Capability Gateway:** Admission and scoped authorization of consequential runtime capability requests before governed-resource access
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
4. Dispatch an attempt through the selected provider or Agent Runtime Contract. Consequential runtime resource requests pass through the Capability Gateway; HAL records durable journal entries and governs safe pause/resume and bounded retries. Nested transactions inherit no broader authority and cannot commit past the parent barrier.
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
- Runtime success, failure, progress, or evidence reports are claims until HAL records and verifies them according to the transaction and evidence rules.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 9, 16, 20–22, 25, 29, 35, 40, 50, 55–56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 9, 16, 20–22, 25, 29, 35, 40, 50, 55–56

---

# Chapter 17 — Verification and Simulation

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Accumulate risk-proportionate evidence before changing reality and continuously verify critical recovery paths.

## Authoritative Responsibilities

- **Verification Service:** Verification Plans, Records, thresholds and disposition
- **Simulation Service:** Isolated models and simulated environments
- **Digital Twin:** Living model of topology, services, policies, trust, resources, intent and failure modes
- **Reality Boundary Controller:** Simulation, shadow, test, canary, production, recovery and emergency separation

## Core State and Records

- **Verification Plan:** Risk class, applicable levels, evidence required, budget, authority and stopping rules.
- **Verification Record:** Inputs, environment, tests, results, fidelity, confidence, signatures and reproducibility.
- **Simulation Fidelity:** Coverage, accuracy, missing variables, limitations and historical predictive success.
- **Canary/Shadow Observation:** Scope, comparison baseline, drift, health and rollback trigger.

## Runtime Workflow

1. Classify the proposed change by consequence and reversibility.
2. Run static validation for syntax, permissions, dependencies, signatures and compatibility.
3. Use simulation and Digital Twin scenarios; score fidelity rather than treating all simulations equally.
4. Inject bounded failures and evaluate counterfactual alternatives inside the isolated Reality Boundary.
5. Run shadow execution without control and compare predictions with reality.
6. Deploy canary or controlled reality with bounded blast radius and automatic rollback where valid.
7. Adopt fully only after evidence and required Owner authorization; continue post-change verification.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Simulation leaks toward reality: Reality Boundary blocks the effect and raises a constitutional incident.
- Low fidelity: reduce confidence and require stronger real-world evidence.
- Canary degradation: stop expansion and rollback or recover according to transaction policy.
- Verification service unavailable: protected or high-risk change does not proceed.

## Constitutional Guarantees

- HAL earns confidence through verification before changing reality.
- Simulation informs authority but never replaces it.
- Every important verification is reproducible and permanently recorded.
- Verification burden scales with risk; urgency cannot remove constitutional authorization.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter directly implements Decisions 28, 35, 43, 47, 50–51, 55–56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 28, 35, 43, 47, 50–51, 55–56

---

# Chapter 18 — Trust Architecture

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Evaluate how much evidence and sources should be relied upon in a particular domain without allowing trust to become permission or authority.

## Authoritative Responsibilities

- **Evidence Service:** Immutable Evidence Objects, custody, signatures and verification state
- **Trust Engine:** Domain-specific multidimensional trust evaluations
- **Reputation Service:** Outcome-based source history, calibration and decay
- **Contradiction Service:** Conflict sets, materiality and evidence-seeking recommendations

## Core State and Records

- **Evidence Object:** Source identity, observation, timestamp, domain, confidence, custody, signature, expiration and verification.
- **Trust Profile:** Reliability, accuracy, recency, consistency, transparency, verifiability and health by domain.
- **Conclusion Record:** Claim, supporting/contradicting evidence, weights, assumptions, confidence and explanation.
- **Reputation Update:** Prediction, outcome, scoring rule, prior/new state and anti-manipulation checks.

## Runtime Workflow

1. Ingest an observation as evidence rather than unqualified truth.
2. Verify identity, integrity, custody, domain and freshness.
3. Evaluate source trust dimensions for the relevant question; never use one global score.
4. Maintain competing conclusions and explicit contradictions.
5. Seek additional evidence when conflict or consequence exceeds policy threshold.
6. Create an explainable conclusion and update reputation only after observable outcomes.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Stale evidence: decay relevance according to evidence type, not arbitrary deletion.
- Source compromise or sensor drift: reduce health/trust and quarantine if warranted.
- Conflicting trusted sources: preserve dissent and escalate or seek evidence.
- Owner override: record as new evidence; do not rewrite history or instantly alter reputation.

## Constitutional Guarantees

- Evidence precedes belief; trust informs decisions; authority governs actions.
- Trust is multidimensional, domain-specific and independent from permission.
- Conflicting evidence is never silently resolved.
- Every consequential conclusion explains support, contradiction, assumptions and confidence.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Evidence Service is the semantic owner of Evidence Objects, custody, signatures, and verification state.
- Observability systems may produce evidence candidates and projections but cannot mutate evidentiary meaning or trust conclusions.
- The Audit Ledger owns protected action and access audit, not general Evidence Objects.


## Source Alignment and Review

This chapter directly implements Decisions 9, 13–14, 22, 26–29, 34, 40, 53, 56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 9, 13–14, 22, 26–29, 34, 40, 53, 56

---

# Chapter 19 — Privacy and Data Governance

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Apply privacy, visibility, purpose limitation and data stewardship consistently across memory, audit, Presences and external trust domains.

## Authoritative Responsibilities

- **Data Governance Service:** Classification, ownership, purpose, retention and handling policy
- **Privacy Policy Evaluator:** Disclosure and processing decisions for current identity, audience and purpose
- **Secrets Service:** Secret references, rotation, revocation and audited access
- **Retention/Deletion Coordinator:** Policy lifecycle, legal/constitutional holds, cryptographic payload erasure, derived-copy deletion and tombstone transactions

## Core State and Records

- **Data Classification:** Sensitivity, owner, visibility, permitted purposes, locations and retention class.
- **Consent/Authority Record:** Identity, scope, purpose, duration, revocation and policy basis.
- **Disclosure Record:** Sender, recipient/domain, purpose, fields, redactions, Treaty and authorization.
- **Retention Disposition:** Keep, cool, archive, compress, expire access, or cryptographically erase protected payload access while preserving an immutable tombstone.

## Runtime Workflow

1. Classify information at creation or ingestion and identify ownership/visibility.
2. Limit collection and retrieval to the approved purpose and minimum necessary data.
3. Evaluate identity, authority, audience, Presence, environment and Treaty before disclosure.
4. Encrypt data at rest and in transit; use end-to-end protection for sensitive participants.
5. Apply retention and archive policy while preserving constitutional evidence requirements.
6. Execute protected deletion only through the Owner Authorization Ceremony and an auditable transaction: cryptographically erase the protected payload, delete non-authoritative copies, and preserve the immutable event sequence and minimal tombstone.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- Classification unknown: default to restricted handling pending review.
- Identity/audience uncertain: reduce disclosure, never broaden it.
- External service requires plaintext: treat as an explicit disclosure boundary and enforce Treaty/purpose limits.
- Audit request conflicts with privacy: provide minimized, field-protected access and record the access.

## Constitutional Guarantees

- Privacy follows identity, purpose, audience and domain—not convenience.
- Transparency reveals system behavior without needlessly exposing people.
- Secrets enable bounded action but never ambient authority.
- External encryption does not imply privacy from the external provider.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Protected deletion balances privacy with historical integrity by making authorized content unrecoverable while preserving proof that an event and lawful deletion occurred.
- No retention policy may silently remove an Experience Object identity, sequence position, or deletion tombstone.


## Source Alignment and Review

This chapter directly implements Articles I, VI, XII; Decisions 27, 30, 32, 39–40, 42, 45, 48–49, 52, 56. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Articles I, VI, XII; Decisions 27, 30, 32, 39–40, 42, 45, 48–49, 52, 56

---

# Chapter 20 — Constitutional Firewall

**Version:** 0.3
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Mediate every exchange with an External Trust Domain so collaboration expands capability without transferring constitutional authority or uncontrolled data.

## Authoritative Responsibilities

- **Treaty Decision Consumer:** Verified Treaty state and decisions supplied by the sole Treaty Manager defined in Chapter 21
- **Constitutional Firewall:** Ingress/egress validation, redaction, authorization and audit
- **External Domain Registry:** Domain identity, authentication, capabilities, trust and active Treaties
- **Cross-Domain Monitor:** Exchange health, policy drift, incidents and revocation signals

## Core State and Records

- **Treaty:** Parties, purpose, capabilities, data scope, authentication, privacy, duration, renewal, revocation and audit.
- **Exchange Envelope:** Sender/recipient, Treaty, intent, classification, provenance, authorization, replay protection and expiry.
- **Redaction Decision:** Requested fields, permitted fields, removals, rationale and policy version.
- **Domain Incident:** Violation, affected exchanges, containment, evidence, notification and recovery.

## Runtime Workflow

1. Authenticate the external domain and resolve an active Treaty for the requested purpose.
2. Validate that the capability class was Owner-approved and the specific provider/domain is permitted.
3. Evaluate sender authority, data classification, purpose, requested fields and recipient rights.
4. Minimize/redact egress data and verify ingress provenance, integrity, schema and allowed meaning.
5. Bind the exchange to a transaction or communication object and record audit metadata.
6. Revoke, expire or suspend exchanges immediately when Treaty, identity or integrity conditions fail.

## Interfaces and Contracts

All commands, queries and events are typed, versioned, authenticated and correlated. Commands request mutation from the authoritative owner; queries declare consistency and privacy scope; immutable events record completed facts with identity, causation, authorization, provenance and integrity metadata.

## Failure and Recovery

- No Treaty or expired Treaty: deny the exchange; local capability availability is irrelevant.
- Provenance failure: quarantine incoming evidence and prevent state mutation.
- Overbroad data request: redact or deny; never infer consent from prior collaboration.
- External compromise: revoke credentials/Treaty access, preserve evidence and contain affected transactions.

## Constitutional Guarantees

- HAL remains constitutionally sovereign in every federation.
- Cooperation expands capability and never transfers authority.
- Every cross-domain exchange is authenticated, authorized, minimized, provenance-checked and auditable.
- Treaty approval and capability-class approval are distinct protected decisions.

## Prohibited Behaviors

- No component may silently broaden authority, reinterpret Owner intent, erase dissent, or treat a derived projection as authoritative state.
- No degraded dependency may silently change policy, identity, trust, authentication, verification or evidence requirements.
- No provider, model, node, Presence, secret, relationship or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records correlation, identity, policy/authority context, state versions, decisions, limitations, failures, recovery and outcomes. Verification is risk-scaled and produces durable evidence. Status reporting is derived from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Chapter 21's Treaty Manager is the sole owner of Treaty proposal, approval, lifecycle, and history.
- The Constitutional Firewall owns exchange enforcement, redaction, ingress/egress validation, and cross-domain incident records and consumes signed Treaty state.


## Source Alignment and Review

This chapter directly implements Decisions 26–27, 32, 36, 39–40, 48–50. The v0.2 rewrite restores the source-specific objects, workflows and guarantees missing from v0.1. Final disposition is recorded in the separate source-alignment and constitutional-audit reports.

## Constitutional Basis

Decisions 26–27, 32, 36, 39–40, 48–50

---

# Chapter 21 — External Trust Domains and Treaties

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Represent external organizations, services, people, and peer HAL systems as separate trust domains whose collaboration is limited by explicit Owner-approved Treaties.

## Authoritative Responsibilities

- **External Domain Registry:** Domain identity, authentication methods, capabilities, trust evidence, incidents, and current status
- **Treaty Manager:** Sole semantic owner of Treaty proposal, protected approval, activation, renewal, suspension, revocation, and history
- **Federation Coordinator:** Bounded cross-domain collaboration and shared-work context
- **Treaty Policy Evaluator:** Purpose, capability, data, duration, privacy, audit, and recipient constraints

## Core State and Records

- **External Trust Domain:** Identity, type, endpoints, authentication, capabilities, trust profile, incidents, and sovereignty boundary.
- **Treaty:** Parties, approved purpose, capabilities, data scope, authentication, privacy, duration, renewal, revocation, and audit.
- **Federation Session:** Treaty, participants, task, delegated authority, exchanged objects, expiration, and outcome.
- **Treaty Review:** Observed use, compliance, incidents, drift, continuing need, and Owner disposition.

## Runtime Workflow

1. Register and authenticate the external domain without inheriting trust from network location or brand.
2. Confirm that the required capability class has already received protected Owner approval.
3. Draft a Treaty with the minimum purpose, capabilities, data, duration, and authority needed.
4. Present the exact Treaty through the Owner Authorization Ceremony; conversational agreement is not activation.
5. Activate federation only after authorization and Constitutional Firewall validation.
6. Continuously monitor use, provenance, disclosure, expiry, drift, and incidents.
7. Renew, narrow, suspend, or revoke through explicit governed lifecycle transitions.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Unknown or unverifiable domain: deny federation and retain the proposal as inactive.
- Treaty expiry or revocation: stop new exchanges and contain in-flight transactions at safe boundaries.
- Provider changes terms or data use: mark material drift and require a fresh Treaty decision.
- Peer HAL disagrees: preserve independent sovereignty and treat its claims as external evidence.

## Constitutional Guarantees

- Federation is cooperation, never merger of identity, memory, authority, or Constitution.
- Every active Treaty is exact, time-bounded, revocable, auditable, and Owner-authorized.
- Capability-class approval and provider/domain Treaty approval are separate protected decisions.
- No external participant may acquire constitutional authority through usefulness, trust, or repeated access.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Treaty Manager in this chapter is the sole authoritative owner of Treaty lifecycle state.
- The Chapter 20 Constitutional Firewall consumes signed Treaty decisions and cannot create, renew, or revoke a Treaty independently.


## Source Alignment and Review

This chapter implements Decisions 27, 32, 36, 39–40, 48–50. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 27, 32, 36, 39–40, 48–50

---

# Chapter 22 — Distributed Coordination

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Coordinate one authoritative HAL identity across HAL Core and participating node runtimes while preserving constitutional consistency during failure, recovery, and partition.

## Authoritative Responsibilities

- **Cluster Coordinator:** Membership, roles, topology, health, work placement, and rejoin orchestration
- **Constitutional Lease Authority:** Single active constitutional lease and term history
- **Distributed Scheduler:** Capability- and health-aware assignment within policy and resource budgets
- **Reconciliation Service:** Partition evidence, state comparison, transaction replay, and safe convergence
- **Independent Attestors:** Integrity observations without constitutional control

## Core State and Records

- **Node Record:** Identity, role, capabilities, software/configuration versions, health, trust, workload, and partition state.
- **Constitutional Lease:** Holder, term, issue/expiry, quorum evidence, policy version, and revocation.
- **Work Assignment:** Intent, capability, authority, resources, node, deadline, retry, and result provenance.
- **Partition Record:** Affected nodes, last contact, delegated authority, restricted mode, evidence, and reconciliation state.
- **Rejoin Plan:** Identity/integrity checks, missed evidence, state synchronization, health gates, and staged restoration.

## Runtime Workflow

1. Authenticate a joining node and verify hardware/software integrity before accepting capability claims.
2. Register capabilities, health, configuration, policy version, locality, and resource limits.
3. Assign dynamic task roles without making any compute node the constitutional Owner.
4. Require the active Core to hold a valid constitutional lease before canonical mutation.
5. Restrict disconnected nodes to explicitly delegated local work and evidence collection.
6. On reconnection, compare journals and canonical versions before replay or reconciliation.
7. Return a node gradually after identity, integrity, policy, trust, state, and health validation.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Lease uncertainty: stop canonical mutation and preserve identity consistency over availability.
- Split brain: only the valid lease holder may govern; isolated partitions enter restricted mode.
- Byzantine or compromised node: quarantine it and disregard unverified state while preserving evidence.
- Coordinator failure: recover coordination from durable membership, lease, and transaction records.

## Constitutional Guarantees

- HAL is one intelligence across cooperating nodes, never competing constitutional instances.
- Dynamic leadership applies to execution tasks, not constitutional governance.
- Partitions may reduce capability but cannot create new authority or canonical state.
- Rejoining is earned through evidence and staged verification, never assumed from prior membership.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- A recovery constitutional lease may be issued only to a pre-registered, independently attested successor after the prior lease has provably expired and the required quorum agrees on the latest valid constitutional state.
- Every recovery lease has a hard maximum duration of 24 hours. Any extension requires fresh Owner authorization bound to the exact successor, constitutional state, lease identifier, and duration; expiry ends protected canonical mutation and returns the successor to Restricted or Safe Recovery mode. Permanent Primary Constitutional Host reassignment requires the Owner Authorization Ceremony.


## Source Alignment and Review

This chapter implements Decisions 17–24, 29, 37–38, 41–42, 47, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 17–24, 29, 37–38, 41–42, 47, 51

---

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

---

# Chapter 24 — State and Persistence Architecture

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Preserve authoritative constitutional and operational state beyond machine failure while keeping derived indexes, caches, and projections rebuildable.

## Authoritative Responsibilities

- **Persistence Custodian:** Physical durability for Constitution, identity, authority, policy, configuration, transactions, and other canonical records; semantic authority remains with each domain service
- **Ledger Storage Custody:** Physical storage, integrity, causal linkage, and replay for append-only Event and Experience Ledgers owned by their domain services
- **Replication Controller:** Durability-class placement, trust-aware replicas, quorum, lag, and repair
- **Projection Service:** Rebuildable query models, indexes, caches, and materialized views
- **Backup Authority:** Independent copies, retention, restore tests, and recovery evidence

## Core State and Records

- **Durability Class:** Constitutional, continuity-critical, operational, derived, or ephemeral; RPO/RTO and replication policy.
- **State Version:** Aggregate, version, causation, writer authority, policy, integrity, effective time, and declared read consistency.
- **Replica Record:** Location, trust domain, encryption, last verified version, lag, and health.
- **Recovery Point:** Included records, consistency boundary, signatures, retention, and restore-test result.

## Runtime Workflow

1. Classify every record as authoritative, ledger history, derived, cached, or ephemeral.
2. Route mutations only through the authoritative owner and append causally linked history.
3. Replicate selectively according to durability, trust domain, privacy, locality, and recovery objectives.
4. Publish versions and declared read-consistency options while rebuilding projections asynchronously without granting them mutation authority.
5. Detect lag, corruption, divergence, and missing replicas through independent verification.
6. Repair from authoritative history or an independently verified recovery point.
7. Continuously test point-in-time and selective restores by durability class.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Projection corruption: discard and rebuild; never promote projection state to authority.
- Replica divergence: quarantine the divergent copy and reconcile against signed authoritative history.
- Storage loss: restore constitutional and continuity-critical records before derived services.
- Backup shares the same compromise domain: it does not satisfy independent-backup requirements.

## Constitutional Guarantees

- HAL preserves identity, history, and authority beyond failure of any single machine.
- Each protected record has exactly one authoritative owner even when it has several replicas.
- Last-write-wins is prohibited for authoritative state unless the domain has specifically proven it safe.
- Append-only protected history is corrected by new records, not silent rewrite.
- A copy is a backup only if it survives failure or compromise of the system that created it.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Persistence components are physical custodians. They never become semantic authorities merely because they store, replicate, or restore a record.
- Experience Ledger, Evidence Service, Audit Ledger, Knowledge Service, and each domain service retain separate canonical responsibilities.
- Protected deletion may erase payload keys and derived copies but may not remove the Experience Object sequence or minimal tombstone.


## Source Alignment and Review

This chapter implements Decisions 4–5, 11, 24, 30, 39–40, 42, 47, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 4–5, 11, 24, 30, 39–40, 42, 47, 51

---

# Chapter 25 — Observability and Evidence

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Make HAL’s behavior reconstructable from governed evidence while minimizing unnecessary exposure of people and protected content.

## Authoritative Responsibilities

- **Observability Fabric:** Metrics, logs, traces, decisions, transactions, communications, outcomes, and health correlation
- **Audit Ledger:** Tamper-evident protected records, access history, retention, and integrity verification
- **Explanation Service:** Audience-appropriate summaries linked to forensic evidence
- **Incident Recorder:** Bounded snapshots, timelines, affected state, hypotheses, and resolution evidence
- **Calibration Service:** Predicted confidence versus observed outcomes

## Core State and Records

- **Correlation Context:** Request, intent, identities, causation, policy, transaction, thread, and outcome identifiers.
- **Audit Record:** Actor, action, target, authority, policy, time, result, integrity, classification, and access controls.
- **Time Integrity Record:** Occurrence time, receipt time, causal order, source clock, clock confidence, correction, and uncertainty.
- **Health Observation:** Alive, ready, healthy, trusted, effective, source, confidence, and timestamp.
- **Incident Object:** Trigger, timeline, evidence, affected components, hypotheses, containment, recovery, and lessons.

## Runtime Workflow

1. Issue correlation context at the beginning of consequential work and propagate it end-to-end.
2. Collect structured evidence from independent observers as well as the component being observed.
3. Protect sensitive fields and payloads while retaining enough metadata to reconstruct behavior.
4. Link decisions, authorizations, transactions, messages, provider attempts, outcomes, occurrence/receipt time, causal order, and clock confidence.
5. Record Agent Runtime identity, adapter identity/version, runtime lifecycle events, capability requests and Gateway dispositions separately from runtime-reported progress, results, failures, and evidence claims.
6. Detect anomalies, contradiction, calibration drift, and missing telemetry as health signals.
7. Preserve bounded incident snapshots when ordinary retention would lose necessary evidence.
8. Generate explanations from governed records at summary, technical, or forensic depth.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Missing telemetry: disclose the blind spot and lower confidence rather than infer healthy operation.
- Audit integrity failure: raise a constitutional incident and preserve affected storage for investigation.
- Observability overload: retain protected audit and safety signals before optional verbose diagnostics.
- Privacy conflict: use field protection, minimization, and audited access rather than unrestricted logging.

## Constitutional Guarantees

- HAL can reconstruct what it did, why it did it, and what authority permitted it.
- No component is the sole observer or judge of its own health.
- Transparency reveals behavior without needlessly exposing people.
- Status and explanation derive from governed evidence, never model assertion alone.
- Runtime-reported memory, progress, result, and evidence are distinguishable from HAL-accepted canonical records and cannot silently become them.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Observability Fabric produces telemetry and evidence candidates; it is not the semantic owner of general Evidence Objects.
- The Chapter 18 Evidence Service owns Evidence Objects and custody. The Audit Ledger owns protected action/access audit records.
- Explanations and health views are derived projections and cannot become authoritative state.


## Source Alignment and Review

This chapter implements Decisions 4, 7, 22, 26, 28, 34, 40, 44, 51, 55–56. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 4, 7, 22, 26, 28, 34, 40, 44, 51, 55–56

---

# Chapter 26 — Security Architecture

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Protect constitutional identity, authority, data, communication, software, and reality-changing actions through layered, evidence-backed controls.

## Authoritative Responsibilities

- **Security Policy Service:** Security rules, risk classes, control requirements, and exception governance
- **Identity Security Service:** Credential lifecycle, step-up authentication, liveness, compromise signals, and revocation
- **Key and Secrets Service:** Key custody, short-lived credentials, rotation, revocation, and audited use
- **Security Monitor:** Threat detection, attack correlation, containment recommendations, and incident evidence
- **Supply Chain Verifier:** Artifact provenance, signatures, dependencies, compatibility, and release evidence

## Core State and Records

- **Security Context:** Actor, target, risk, authentication confidence, device/Presence, policy, and environment.
- **Credential:** Subject, scope, issuer, proof type, issue/expiry, revocation, hardware binding, and use constraints.
- **Threat Observation:** Source, indicator, affected assets, confidence, severity, evidence, and recommended containment.
- **Security Exception:** Exact control, reason, scope, duration, compensating controls, authorization, and review.

## Runtime Workflow

1. Authenticate every actor and component cryptographically; treat local network location as untrusted context.
2. Evaluate least-privilege authority, purpose, device/Presence, risk, and fresh policy for each protected action.
3. Use scoped, short-lived credentials and secret references rather than distributing ambient secrets.
4. Verify signed software provenance and compatibility before loading executable artifacts.
5. Monitor for identity, behavior, integrity, exfiltration, replay, escalation, and supply-chain anomalies.
6. Contain suspected compromise by the narrowest safe boundary and preserve evidence.
7. Recover through verified identity, state, credentials, software, and post-incident validation.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Security dependency unavailable: protected actions fail closed or enter a predefined safe state.
- Credential compromise: revoke the credential and quarantine affected sessions without redefining identity.
- Key loss: recover through separately protected Owner and continuity procedures; never bypass authentication.
- Urgent vulnerability: accelerate verification and rollout but retain authorization and recoverability.

## Constitutional Guarantees

- Authority is explicit, least-privilege, purpose-bound, time-bounded where possible, and continuously auditable.
- Encryption provides confidentiality and integrity but does not replace identity, authorization, or privacy policy.
- Security failure cannot silently make HAL more permissive or more restrictive.
- HAL protects its constitutional kernel more strongly than replaceable capabilities and providers.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter implements Decisions 25, 27, 29, 32, 35–43, 47–50. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 25, 27, 29, 32, 35–43, 47–50

---

# Chapter 27 — Failure Containment

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Prevent component, node, provider, data, or reasoning failures from cascading across HAL or silently changing its rules.

## Authoritative Responsibilities

- **Failure Domain Manager:** Failure boundaries, dependency graph, blast-radius policy, and isolation state
- **Circuit Breaker Service:** Health thresholds, trip state, probes, cooldown, and recovery evidence
- **Quarantine Manager:** Identity, node, provider, artifact, data, or evidence quarantine lifecycle
- **Degradation Controller:** Declared fallback, reduced capability, disclosure, and protected capacity

## Core State and Records

- **Failure Domain:** Components, dependencies, protected boundaries, containment action, and safe-state behavior.
- **Failure Declaration:** Trigger, evidence, confidence, affected capability, user impact, and disposition.
- **Quarantine Record:** Subject, reason, restrictions, evidence, authority, review, and release requirements.
- **Degradation Mode:** Unavailable/reduced capability, permitted substitutes, quality impact, disclosure, and exit gate.

## Runtime Workflow

1. Detect failure from independent health, transaction, evidence, security, or outcome observations.
2. Classify affected domain, consequence, uncertainty, and declared fail-open/fail-closed/fail-safe behavior.
3. Trip the narrowest circuit, isolate dependencies, and preserve constitutional/observability/recovery reserve.
4. Quarantine untrusted identities, nodes, providers, artifacts, or data when integrity is uncertain.
5. Select only predeclared, policy-valid fallback behavior and disclose material degradation.
6. Verify recovery with probes, shadow/canary evidence, and state reconciliation.
7. Restore gradually; protected quarantine release follows its Owner-governed rule.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Failure detector disagreement: preserve both observations and choose the safer bounded state pending evidence.
- Fallback also fails: stop the affected capability rather than cascade through unverified substitutes.
- Containment harms unrelated work: record impact and adjust topology without lowering constitutional controls.
- Unknown root cause: retain quarantine and continue evidence collection; uncertainty is not restoration evidence.

## Constitutional Guarantees

- No single failure may silently change HAL’s rules or constitutional behavior.
- Failures are contained by explicit domains rather than implicit shared dependencies.
- Graceful degradation is transparent, bounded, and policy-governed.
- Quarantine limits authority and access without rewriting identity or historical evidence.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter implements Decisions 19, 22, 28–29, 35, 38, 41–42, 47, 50, 56. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 19, 22, 28–29, 35, 38, 41–42, 47, 50, 56

---

# Chapter 28 — Recovery and Continuity

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Restore HAL after partial or catastrophic failure in an order that preserves constitutional identity, Owner authority, history, and verifiable continuity.

## Authoritative Responsibilities

- **Recovery Manager:** Recovery plans, orchestration, checkpoints, evidence, and disposition
- **Continuity Service:** Constitution, identity, authority, audit, configuration, and ledger recovery order
- **Restore Verifier:** Integrity, completeness, compatibility, identity continuity, and outcome tests
- **Recovery Presence:** Minimal Owner interaction and status during degraded restoration

## Core State and Records

- **Recovery Plan:** Scenario, priorities, sources, steps, authority, RPO/RTO, verification, and rollback.
- **Continuity Checkpoint:** Constitution, Owner identity, authority, policy, audit, ledger versions, and signatures.
- **Restore Attempt:** Source, target, versions, transformations, checks, result, and evidence.
- **Recovery Record:** Failure, selected plan, timeline, restored state, gaps, uncertainty, approvals, and final status.

## Runtime Workflow

1. Identify failure scope and preserve remaining evidence before making restorative changes.
2. Establish a trusted minimal environment and verify the Owner recovery channel.
3. Restore Constitution and Owner identity/authorization before other governance or capability.
4. Restore governance, audit, configuration, transaction/experience ledgers, and canonical knowledge in order.
5. Reconcile distributed state and rebuild derived indexes and caches from authoritative records.
6. Validate identity continuity, policy, trust, Treaties, transactions, capabilities, and limitations.
7. Resume through staged operation and issue a signed post-recovery Constitutional Mirror.
8. Reconstruct or replace Agent Runtime instances only after governance, canonical state, Capability Gateway controls, and runtime-admission evidence are available; runtime memory is not a recovery source of constitutional truth.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Recovery source integrity uncertain: do not promote it; seek another independent copy or Owner-directed path.
- State versions conflict: preserve alternatives and reconstruct causality before selecting canonical state.
- Owner authentication unavailable: remain in minimal safe recovery without constitutional mutation.
- Restore passes technically but not constitutionally: keep production disabled until continuity checks pass.

## Constitutional Guarantees

- Recovery restores who HAL is before restoring what HAL can do.
- Recovery evidence is explicit; absence of an error is not proof of continuity.
- Derived data is rebuilt only after canonical records are verified.
- Every material recovery remains reproducible, reviewable, and linked to the initiating incident.
- Runtime replacement or runtime-memory loss does not alter constitutional continuity, canonical knowledge, Evidence Graph semantics, authorization, or Capability Gateway decisions.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- A successor may receive a recovery constitutional lease only after independent state, identity, integrity, and quorum verification.
- The lease expires after no more than 24 hours. Every extension requires fresh, exact, Owner-specific authorization.
- Without extension, recovery continues only in Restricted or Safe Recovery mode and protected canonical mutation stops.
- Permanent reassignment of the Primary Constitutional Host requires the Owner Authorization Ceremony.


## Source Alignment and Review

This chapter implements Decisions 22, 29, 35, 38, 42, 47, 50–51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 22, 29, 35, 38, 42, 47, 50–51

---

# Chapter 29 — Software Lifecycle and Change Governance

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Treat software, model, schema, configuration, adapter, and infrastructure changes as governed evolutionary transactions rather than informal maintenance.

## Authoritative Responsibilities

- **Release Manager:** Change classification, release channels, provenance, rollout, validation, and retirement
- **Compatibility Service:** Contracts, schemas, coexistence, dependency isolation, and migration gates
- **Update Verifier:** Static, simulation, shadow, canary, and post-update evidence
- **Rollback Coordinator:** Recovery point, reverse migration, prior behavior, and incident linkage

## Core State and Records

- **Change Package:** Artifact, type, version, source, signatures, dependencies, permissions, migrations, and risk.
- **Compatibility Contract:** Producer/consumer versions, schema, behavior, deprecation, and test evidence.
- **Rollout Plan:** Environment, cohort, canary, thresholds, observation, promotion, pause, and rollback.
- **Change Record:** Rationale, evidence, authorizations, attempts, outcomes, incidents, and final disposition.

## Runtime Workflow

1. Classify change as constitutional, kernel, service, adapter, model, schema, configuration, or infrastructure.
2. Verify signed provenance, dependencies, permissions, compatibility, and vulnerability evidence.
3. Create recoverable schema/configuration migrations and a tested rollback or compensation path.
4. Run risk-proportionate static, simulated, shadow, and canary verification.
5. Obtain protected Owner authorization where the change affects constitutional or guarded behavior.
6. Roll out in stages with coexistence where needed and continuously compare expected behavior.
7. Validate after adoption; pause, roll back, compensate, or retire based on evidence.

An Agent Runtime replacement is an adapter/provider change when it preserves the Agent Runtime Contract and HAL governance semantics. Any proposed change to the Contract, Capability Gateway semantics, canonical-state authority, or authorization model is reviewed at the higher applicable change class and cannot be disguised as a runtime update.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Unsigned or unverifiable artifact: reject it regardless of claimed urgency.
- Migration partially applies: recover from transaction journal and do not declare the new version active.
- Behavioral drift after model update: quarantine or rollback the provider and preserve comparison evidence.
- Security emergency: accelerate stages only where evidence allows; never disguise governance change as a patch.

## Constitutional Guarantees

- HAL adopts change because it is proven suitable, not merely newer.
- No maintenance operation may redefine identity, authority, policy, or Constitution by implication.
- Version coexistence and migration preserve continuity and reconstructability.
- Every adopted change has provenance, verification, disposition, and a recoverability record.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter implements Decisions 33, 37–39, 43, 50–51, 58. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 33, 37–39, 43, 50–51, 58

---

# Chapter 30 — Self-Description and Constitutional Mirror

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Maintain a verified model of HAL’s identity, authority, capabilities, limitations, Presences, topology, health, Treaties, and operating state.

## Authoritative Responsibilities

- **Self Model Service:** Canonical self-description assembled from governed registries and evidence
- **Consistency Checker:** Declared-versus-observed identity, authority, policy, capability, and topology validation
- **Constitutional Mirror Service:** Signed human-readable snapshots and continuity comparison
- **Self Explanation Service:** Audience-appropriate answers grounded in verified self-state

## Core State and Records

- **Self Model:** Identity, Owner, Constitution, authority, capabilities, limitations, Presences, nodes, health, policies, and Treaties.
- **Limitation Record:** Unavailable/unauthorized capability, cause, confidence, duration, alternatives, and evidence.
- **Identity Drift Incident:** Expected state, observed divergence, evidence, containment, and resolution.
- **Constitutional Mirror:** Signed versioned snapshot of Constitution, identity, authority, trust, intent, knowledge, topology, health, and pending work.

## Runtime Workflow

1. Read identity, authority, policy, capability, Presence, cluster, Treaty, health, and recovery registries.
2. Assemble a versioned Self Model without asking an LLM to invent missing self-knowledge.
3. Compare declared state with independently observed runtime and durable state.
4. Raise and contain identity drift, unauthorized capability, or unexplained policy divergence.
5. Answer self-questions from verified records and state explicit limitations or unknowns.
6. Generate signed Constitutional Mirrors on schedule and before/after material change or recovery.
7. Compare Mirrors to establish explainable continuity across implementation replacement.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Registry disagreement: report the conflict and lower self-description confidence.
- Mirror generation fails: block any workflow that requires a verified continuity checkpoint.
- Self Model stale: display last verified time and do not claim current capability.
- Identity drift: enter constitutional investigation rather than normal self-healing.

## Constitutional Guarantees

- HAL describes itself from verified evidence, never assumption or prompt identity.
- Implementation may change while constitutional identity and governed continuity remain intact.
- Limitations are first-class self-knowledge and never hidden for conversational convenience.
- A Constitutional Mirror explains a backup or recovery point; it does not replace it.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter implements Decisions 7, 28, 38, 40, 45, 47, 49, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 7, 28, 38, 40, 45, 47, 49, 51

---

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

---

# Chapter 32 — Outcome and Success Architecture

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Measure whether HAL helped create the Owner’s intended enduring outcome rather than rewarding task volume, activity, or one optimization metric.

## Authoritative Responsibilities

- **Outcome Service:** Outcome Objects, evidence criteria, horizons, stakeholders, and review cadence
- **Success Evaluator:** Execution, quality, outcome, human impact, and constitutional stewardship
- **Attribution Service:** HAL contribution, other causes, correlation, uncertainty, and luck
- **Outcome Review Service:** Progress, compounding value, prevention, failure, and learning

## Core State and Records

- **Outcome Object:** Desired future state, evidence, confidence, horizon, stakeholders, dependencies, risks, reversibility, and review.
- **Success Assessment:** Five success layers, supporting/contradicting evidence, tradeoffs, confidence, and disposition.
- **Attribution Record:** Candidate causes, interventions, counterfactual, external factors, uncertainty, and confidence.
- **Preventative Outcome:** Threat or cost avoided, baseline, intervention, evidence, residual risk, and review.

## Runtime Workflow

1. Define outcome and success evidence when the intent is approved, not after activity occurs.
2. Link plans, decisions, transactions, costs, human attention, and observed state to the Outcome Object.
3. Evaluate execution and quality without confusing completion with real-world success.
4. Measure human impact and constitutional stewardship alongside the intended outcome.
5. Assess attribution honestly using comparison, counterfactual, external factors, and uncertainty.
6. Recognize compounding work, preventative success, and justified non-action.
7. Review across immediate, weekly, monthly, yearly, lifetime, and constitutional horizons.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Metric improves while outcome worsens: treat the metric as misleading evidence and revise evaluation.
- Outcome cannot be observed: report uncertainty and agree on a proxy without calling it the outcome.
- Attribution ambiguous: state contribution bounds rather than claiming causation.
- Owner intent changes: version the Outcome Object and preserve prior expectations and results.

## Constitutional Guarantees

- Success is enduring outcome plus constitutional integrity, not volume of activity.
- HAL never creates work merely to appear useful.
- Prevented failures and quiet stable operation may be successful outcomes.
- Outcome review feeds learning without rewriting the original intent or decision rationale.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Embedded author approval is not conformance evidence. This chapter's constitutional status is determined only by the independent whole-book audit.
- No substantive constitutional or cross-chapter correction was required in this edition.


## Source Alignment and Review

This chapter implements Decisions 31, 35, 40, 46, 53–57. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 31, 35, 40, 46, 53–57

---

# Chapter 33 — Constitutional Evolution Support

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Support deliberate constitutional stewardship while ensuring ordinary conversation, software maintenance, or operational policy can never become an accidental amendment.

## Authoritative Responsibilities

- **Constitution Manager:** Signed versions, invariants, effective state, amendment history, and recovery
- **Change Analysis Service:** Motivation, alternatives, compatibility, affected decisions, risks, migration, and rollback
- **Authorization Ceremony Service:** Fresh Owner verification bound to the exact proposed amendment
- **Commentary Service:** Rationale, history, examples, rejected alternatives, and lessons separate from authority

## Core State and Records

- **Constitutional Change Object:** Exact text, motivation, problem, alternatives, benefits, risks, compatibility, verification, migration, rollback, and disposition.
- **Compatibility Report:** Principles, rules, policies, decisions, interfaces, data, identity continuity, and conflicts affected.
- **Authorization Challenge:** Change digest, Owner identity/liveness, factor, nonce, expiry, and result.
- **Constitution Version:** Signed immutable text, effective time, predecessor, amendment set, and adoption evidence.

## Runtime Workflow

1. Create a proposal without modifying the active Constitution and answer necessity, insufficiency, and long-term relevance.
2. Classify the proposal as Commentary, operational policy, constitutional rule, principle, or invariant.
3. Analyze conflicts, alternatives, identity continuity, migration, verification, and rollback.
4. Simulate and review the exact final amendment; invalidate approval if any material text changes.
5. Obtain fresh Owner identity/liveness proof and change-bound step-up authorization.
6. Stage adoption, observe effects, and incorporate only after verification.
7. Sign the new immutable version and preserve all prior text, rationale, approval, and migration history.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Owner casually says yes or 'lock it': retain assent but do not execute an amendment.
- Authorization factor unavailable: keep the proposal pending; never lower the ceremony standard.
- Invariant would change: explicitly classify the result as potentially becoming a different constitutional system.
- Migration fails: return to the last effective version and preserve the failed attempt and evidence.

## Constitutional Guarantees

- Agreement permits preparation; only verified, exact, fresh authorization permits execution.
- The Constitution is living but never casual, and every adopted version is immutable.
- Commentary preserves understanding while constitutional text preserves authority.
- Software, configuration, or policy updates cannot smuggle in constitutional change.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- An invariant change requires two separate Owner Authorization Ceremonies bound to the exact unchanged proposal.
- The ceremonies are separated by a mandatory 72-hour cooling-off period.
- Before the second ceremony, HAL creates a signed Constitutional Mirror and independently verified recovery point for the predecessor system.
- The final compatibility report explicitly classifies whether the result preserves HAL identity or creates a successor constitutional system.
- Any material proposal change restarts the complete process. The predecessor Constitution, state, authorization, and migration evidence are preserved permanently.
- Until the extraordinary process completes, invariant changes may be analyzed and simulated but never executed.


## Source Alignment and Review

This chapter implements Constitutional Governance; Decisions 25, 27, 33, 43, 48, 50–51, 58. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Constitutional Governance; Decisions 25, 27, 33, 43, 48, 50–51, 58

---

# Chapter 34 — Deployment Topologies

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Define deployable HAL topologies that preserve one active constitutional control plane while allowing distributed, replaceable execution and multiple Presences.

## Authoritative Responsibilities

- **Deployment Controller:** Topology manifest, environment, service placement, versions, dependencies, and desired state
- **HAL Core Runtime:** Constitutional kernel, governance, identity, authority, policy, canonical coordination, and audit
- **HAL Node Runtime:** Authenticated capability execution, local health, bounded cache, evidence, and restricted offline mode
- **Presence Runtime:** Device interaction, sensors/outputs, privacy context, and non-authoritative local state

## Core State and Records

- **Deployment Manifest:** Environment, hosts, services, identities, networks, storage, policies, versions, and recovery profile.
- **Core Host Profile:** Dedicated Mac mini or successor, kernel services, canonical storage, security, observability, and reserve.
- **Node Profile:** GX10 or future compute node identity, capabilities, resource limits, software, health, and delegation.
- **Environment Boundary:** Simulation, test, shadow, canary, production, recovery, or emergency with permitted effects.

## Runtime Workflow

1. Validate deployment manifest, host identities, signed artifacts, configuration, secrets, and network boundaries.
2. Bootstrap the dedicated HAL Core control plane and establish the constitutional lease; a recovery successor lease is capped at 24 hours and every extension requires fresh Owner authorization.
3. Restore or initialize Constitution, Owner identity, authority, policy, audit, ledgers, and canonical state.
4. Join compute nodes through the controlled recovery/join pipeline and advertise verified capabilities.
5. Start replaceable services and Presences only after their dependencies and authority boundaries are ready.
6. Route execution dynamically while governance and canonical state remain controlled by HAL Core.
7. Continuously reconcile desired and observed topology and test recovery into an isolated environment.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Core unavailable: nodes retain only bounded delegated work; no node becomes an equal independent HAL.
- Node unavailable: reassign compatible execution or disclose degraded capability.
- Environment boundary uncertain: block real-world effects until production identity is proven.
- Topology drift: reconcile ordinary changes; escalate identity, policy, or constitutional divergence.

## Constitutional Guarantees

- The reference household topology is one dedicated HAL Core with lightweight node and Presence runtimes.
- Distributed execution never distributes constitutional ownership.
- Topology and hardware may evolve without changing HAL identity or capability contracts.
- Simulation, test, recovery, and production deployments cannot accidentally share reality-changing authority.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- The Mac mini is the normal Primary Constitutional Host, not an irreplaceable identity anchor.
- Only one active constitutional control plane may hold a valid lease.
- A pre-registered successor may hold a verified recovery lease for no more than 24 hours; extensions require fresh Owner authorization and permanent reassignment requires the Owner Authorization Ceremony.


## Source Alignment and Review

This chapter implements Decisions 1–2, 17–24, 29, 37–43, 45, 47, 51. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

Decisions 1–2, 17–24, 29, 37–43, 45, 47, 51

---

# Chapter 35 — Architecture Conformance and Certification

**Version:** 0.2
**Status:** Revised after whole-book constitutional and cross-chapter audit

## Purpose

Prove that Book II and its implementations satisfy Book I through bidirectional traceability, executable conformance evidence, independent review, and time-bounded certification.

## Authoritative Responsibilities

- **Conformance Service:** Requirement catalog, tests, evidence, waivers, coverage, and certification state
- **Traceability Registry:** Book I requirement to architecture, component, interface, control, evidence, and verification mapping
- **Independent Review Coordinator:** Reviewer separation, findings, remediation, and attestation
- **Architecture Certification Service:** Scope, version, environment, result, limitations, expiry, and revocation; certification is not constitutional authority

## Core State and Records

- **Constitutional Requirement:** Source article/decision, normative statement, interpretation, invariants, and affected architecture.
- **Conformance Case:** Claim, implementation scope, controls, tests, evidence, exceptions, reviewer, and result.
- **Nonconformance:** Requirement, evidence, severity, affected scope, containment, remediation, and disposition.
- **Certification Record:** Book/implementation versions, environment, coverage, reviewers, findings, limitations, issue/expiry, and signatures.

## Runtime Workflow

1. Extract normative Book I requirements and assign stable identifiers without rewriting their meaning.
2. Map each requirement to Book II chapters, authoritative components, interfaces, controls, evidence, and tests.
3. Map each major component back to a constitutional or necessary engineering rationale.
4. Execute structural, security, privacy, recovery, Reality Boundary, authorization, and failure tests.
5. Verify Agent Runtime Contract conformance: a runtime can request but cannot grant authority; consequential governed-resource access is mediated by the Capability Gateway where practical; runtime memory cannot become canonical knowledge without HAL acceptance; and replacing a reference runtime preserves HAL constitutional and governance semantics.
6. Have independent review disregard embedded self-approval and examine unresolved assumptions and exceptions.
7. Remediate internally resolvable defects; escalate only genuine Owner-level constitutional choices.
8. Issue a signed, scoped, time-bounded certification or explicit nonconformance report.

## Interfaces and Contracts

Commands, queries, events, records, and evidence are typed, versioned, authenticated, authorized, correlated, and classified. Mutation is accepted only by the authoritative owner. Every external or reality-changing boundary carries identity, policy, authority, provenance, integrity, time, and transaction context.

## Failure and Recovery

- Requirement unmapped: certification fails for completeness even if no direct contradiction is visible.
- Evidence stale or environment changed: suspend or expire the affected certification.
- Test passes but design violates an invariant: constitutional meaning prevails over implementation evidence.
- Owner waiver requested for invariant conflict: treat it as a constitutional change, not an engineering exception.

## Constitutional Guarantees

- Book I always prevails over Book II, implementation, configuration, and test artifacts.
- No component exists without constitutional or necessary engineering rationale.
- Certification is scoped evidence, not permanent self-approval.
- A known material defect or unmapped requirement prevents a claim of complete conformance.
- No HAL-core dependency on a reference runtime’s internals is conformant; runtime-specific behavior is confined to its adapter.

## Prohibited Behaviors

- No component may silently broaden or narrow constitutional authority, reinterpret Owner intent, erase dissent, or promote derived state to authority.
- No failure, degraded dependency, emergency, or optimization may silently change identity, policy, trust, authentication, evidence, or verification rules.
- No model, service, provider, node, Presence, credential, relationship, environment, or network location receives constitutional authority by implication.

## Observability and Verification

The subsystem records identity, correlation, authority/policy context, inputs, state versions, decisions, limitations, failures, recovery, and outcomes. Verification is risk-scaled, reproducible, and stored as durable evidence. Status and explanation derive from governed state rather than model assertion.

## Whole-Book Audit Resolution

The following requirements supersede any ambiguous earlier wording in this chapter and are incorporated into this edition:

- Architecture certification is an evidence-backed conformance status and never a source of constitutional authority.
- Certification requires one semantic owner per authoritative object and explicit separation of domain authority from persistence and observability custody.
- Invariant-change conformance requires two exact Owner ceremonies, a 72-hour cooling-off period, a Constitutional Mirror, independent recovery proof, and continuity classification.
- Recovery-lease conformance requires a 24-hour maximum and fresh Owner authorization for every extension.
- Experience deletion conformance requires cryptographic payload erasure, derived-copy removal, and an immutable minimal tombstone.


## Source Alignment and Review

This chapter implements All Articles and Decisions 1–58; especially Decisions 25, 37–43, 47–51, 58. Final source-alignment and constitutional disposition is recorded in the batch audit reports; embedded approval text is not treated as review evidence.

## Constitutional Basis

All Articles and Decisions 1–58; especially Decisions 25, 37–43, 47–51, 58
