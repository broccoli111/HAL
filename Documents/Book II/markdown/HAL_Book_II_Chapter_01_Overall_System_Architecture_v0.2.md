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
