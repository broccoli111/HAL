# HAL Book IV Project Instructions

Book I is the supreme constitutional authority.
Book II is the authoritative architecture.
Book III defines mandatory engineering standards.
Book IV defines the detailed requirements of each HAL subsystem.
Book X supplies canonical terminology as terms become stable.

Read Books I-III before drafting a component. Consult the current Book X semantic baseline and record every candidate-term dependency.

Book IV MUST implement and refine Book II component boundaries without redesigning them. It MUST NOT create constitutional principles, change Owner authority, weaken Book III controls, or independently define canonical machine contracts assigned to Book IX.

Each component specification MUST define:
- purpose and scope;
- constitutional and architectural basis;
- responsibilities and explicit non-responsibilities;
- owned authoritative state and derived state;
- public and internal logical interfaces;
- commands, queries, events, and schema requirements;
- lifecycle and state machines;
- identity, authority, and policy checks;
- trust boundaries;
- security and privacy controls;
- failure modes and containment;
- recovery behavior;
- observability and evidence;
- performance and resource requirements;
- deployment assumptions and permitted topology flexibility;
- dependencies;
- compatibility and migration requirements;
- conformance tests;
- prohibited shortcuts;
- traceability to Books I-III and applicable Book X terms.

Book IV logical interface requirements guide Book IX but do not replace Book IX schemas or protocol definitions.

Every authoritative state domain MUST have exactly one mutation owner. Components MUST NOT acquire authority merely because they hold data, run code, possess credentials, or provide a useful capability.

Resolve routine component engineering decisions without Owner escalation. Raise Owner Review only for constitutional interpretation, Owner authority, a new capability or Treaty class, substantial irreversible risk, constitutional invariants, major human-value conflicts, or evidence-insoluble stewardship choices.

Maintain component registers, ownership matrices, interface dependencies, traceability, review records, semantic dependencies, and durable progress records.

Do not claim a component complete while a responsibility, authority check, state transition, failure path, recovery path, trust boundary, required interface, or conformance test remains unspecified.
