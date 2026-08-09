# HAL Repository Instructions

HAL is a sovereign, local-first personal AI operating system governed by a formal constitutional and architectural canon.

These instructions apply repository-wide.

More specific AGENTS.md files may exist within subdirectories. Those files may add or narrow instructions for work within their scope, but they MUST NOT override higher-order HAL authority.

## Authority hierarchy

The HAL source-of-truth hierarchy is:

1. Book I — Constitution
2. Book II — Architecture Specification
3. Book III — Developer Standard
4. Book IV — Operations Manual
5. Book X — Canonical Terminology and Information Model
6. Accepted Decision Records
7. Current implementation
8. Planning and current-state documents

Higher-order sources prevail over lower-order sources.

Book I is the supreme constitutional authority.

No lower-order document, decision record, implementation, test, comment, or current behavior may silently redefine or weaken a higher-order requirement.

Implementation does not become authoritative merely because it already exists.

## Before consequential work

Before making an architectural, security-sensitive, governance-sensitive, or otherwise consequential change:

* inspect the relevant Book I requirements;
* inspect the relevant Book II architecture;
* inspect applicable Book III engineering standards;
* inspect Book X terminology when canonical definitions are involved;
* inspect applicable accepted Decision Records;
* inspect the current implementation before assuming documentation matches implementation.

Do not invent missing HAL policy.

Do not silently reinterpret locked decisions.

If sources conflict, preserve the higher-order source and explicitly identify the conflict.

## Engineering autonomy

Work autonomously when a choice is a routine and reversible implementation consequence of already accepted architecture and standards.

Examples include:

* internal refactoring that preserves contracts;
* naming within established conventions;
* test implementation;
* error handling consistent with existing standards;
* dependency injection;
* non-semantic code organization;
* fake or test adapters;
* implementation details explicitly delegated by Book II or Book III.

Prefer the smallest change that satisfies the accepted architecture.

## Owner Review / Owner Decision

Raise an Owner Review item when the work would materially:

* interpret or alter constitutional philosophy;
* change Owner authority;
* change a constitutional invariant;
* alter a trust or security boundary;
* alter canonical knowledge semantics;
* change evidence or verification guarantees;
* change recovery or rollback guarantees;
* introduce or change a major architecture contract;
* create direct runtime-specific coupling inside HAL Core;
* create a new capability class or Treaty class;
* require substantial irreversible migration;
* accept substantial long-term risk;
* make a long-term stewardship choice that evidence cannot settle.

Do not infer Owner authorization.

When escalation is required, provide:

* Decision required
* Context
* Relevant existing authority
* Options
* Recommendation
* Tradeoffs
* Architectural impact
* Constitutional impact, if any
* Security impact, if any
* Reversibility
* Preferred option and rationale

## Runtime sovereignty

HAL owns sovereign control of:

* governance;
* identity;
* authority;
* policy;
* canonical knowledge;
* evidence;
* system-level work admission and placement;
* agent lifecycle authority;
* recovery authority;
* governed resource access.

Agent runtimes are subordinate and replaceable.

Hermes Agent is the current Reference Agent Runtime v1.

Hermes is not:

* HAL’s root of trust;
* constitutional authority;
* canonical memory;
* owner of HAL-wide work admission or placement;
* a privileged resource-access path;
* an architectural dependency of HAL Core.

Runtime-local scheduling may be delegated after HAL admits and places work.

No runtime may grant itself authority.

Runtime memory is non-authoritative unless and until information is accepted through governed HAL knowledge processes.

HAL Core may depend upon the Agent Runtime Contract.

HAL Core MUST NOT depend directly upon Hermes implementation details.

## Capability boundary

Where governed resources are involved, external runtimes request capabilities through HAL-defined interfaces.

Technical ability does not imply authority.

A runtime request MUST remain subject to applicable:

* identity evaluation;
* delegated authority;
* constitutional constraints;
* policy constraints;
* risk classification;
* authorization requirements;
* evidence requirements;
* resource governance.

Do not introduce a path that allows an external runtime to bypass HAL governance merely because the runtime can technically access the underlying resource.

## Engineering principles

Prefer:

* explicit contracts;
* replaceable components;
* least privilege;
* local-first execution;
* reversible changes;
* evidence-producing operations;
* deterministic tests where practical;
* recoverable state;
* explicit dependency direction;
* bounded authority;
* clear failure behavior.

Avoid:

* hidden coupling;
* undocumented state;
* implicit authority;
* runtime-specific assumptions in HAL Core;
* silent policy creation;
* irreversible migration without authorization;
* convenience shortcuts that weaken constitutional guarantees.

## Documentation responsibilities

Documentation is part of the system.

When implementation materially changes project state:

* update the relevant authoritative documentation when required;
* update accepted Decision Records when a decision has changed;
* update CURRENT_STATE.md when the project’s meaningful current status or next step has changed.

Do not modify authoritative documentation merely to make it agree with an implementation that violates it.

## Continuity

A new engineering session should be able to determine from the repository:

* what HAL is;
* which rules govern the task;
* the current implementation state;
* the current objective;
* the next expected work;
* which unresolved issues require Owner input.

Do not rely on prior chat history as an authoritative project dependency.
