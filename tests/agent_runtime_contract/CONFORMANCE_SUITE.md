# Agent Runtime Contract — Test-Only Conformance Suite

> **Status:** Test-only verification specification  
> **Scope:** Implementation-neutral contract conformance before any HermesAdapter integration  
> **Authority:** This suite is verification planning, not an architecture contract or source of authority. Book I, then Book II and Book III, prevail.

## 1. Purpose

Define the minimum repeatable conformance evidence required before an Agent Runtime adapter can be considered for integration. The suite verifies the already-defined Agent Runtime Contract and Capability Gateway boundaries using only deterministic, local, in-memory fakes. It MUST NOT invoke Hermes, a real filesystem, NAS, network, shell, browser, secret store, home-automation system, or external communication service.

## 2. Authoritative Basis

| Source | Relevant requirement |
| --- | --- |
| Book I Decisions 1, 5, 10, 16, 25, 27, 30, 35–40, 43, 48–49, 51, 58 | HAL retains authoritative governance, state ownership, policy, evidence, recovery, replaceability, and constitutional continuity. |
| Book II Chapter 1, §8.1 | HAL Core depends on the Agent Runtime Contract, not Hermes internals; Hermes is only Reference Agent Runtime v1. |
| Book II Chapter 2, §§3.1–3.2 | Contract directions, runtime replaceability, and prohibited direct Hermes dependency. |
| Book II Chapters 10 and 12 | Runtime memory and context are non-authoritative and disposable. |
| Book II Chapters 15 and 16 | Consequential resource actions require Capability Gateway evaluation and governed transaction/evidence paths. |
| Book II Chapters 25, 28, and 35 | Runtime reports are distinguishable evidence candidates; recovery and conformance are evidence-backed. |
| Book III Chapters 3, 5, and 6 | Contract, trust-boundary, negative-authority, failure/recovery, deterministic verification, and evidence requirements. |
| [DR 0001](../../decisions/0001-agent-runtime-sovereignty-and-replaceability.md) | Accepted runtime-sovereignty clarification and deferred test sequence. |

## 3. Test Environment and Safety Constraints

The eventual harness MUST provide the following test doubles only:

- `TestRuntimeAdapter` and one or more deterministic fake runtimes;
- an in-memory HAL governance fixture containing synthetic identities, delegated authorities, policies, task context, evidence custody, lifecycle state, and canonical-knowledge records;
- an in-memory Capability Gateway fixture with an allow, deny, and authorization-required disposition;
- sealed synthetic resource fixtures that can be observed only through the test Gateway;
- deterministic clock, identifiers, correlation records, and fault injection.

The harness MUST NOT substitute a real resource, credential, secret, live process, host filesystem, or external endpoint for a fixture. Test data MUST be synthetic and non-sensitive. A test failure that demonstrates a direct-resource path, missing authority context, uncorrelated report, or unintended canonical mutation is a conformance finding, not a reason to relax the fixture.

## 4. Conformance Model

Each test records: test ID, Contract operation(s), governing requirement, fixture state, deterministic stimulus, expected HAL disposition, expected runtime-visible result, expected evidence, and pass/fail result. A runtime report is a claim; the harness separately records HAL acceptance, rejection, or required authorization.

The suite verifies semantic operations only. It deliberately does not prescribe a programming language, transport, API shape, capability string syntax, serialization schema, or runtime implementation.

## 5. Required Test Cases

| ID | Scenario | Contract operation(s) | Acceptance criterion |
| --- | --- | --- | --- |
| ARTC-001 | Lifecycle admission | start runtime; create agent; destroy | HAL admits a runtime only with a recognized test identity, adapter identity, bounded lifecycle state, and correlation context. Destruction revokes the test agent’s active execution state; no canonical HAL state is owned by the runtime. |
| ARTC-002 | Bounded task dispatch | execute task; provide context; provide capability manifest | HAL dispatches only task-bounded context and the permitted capability manifest. The runtime receives neither ambient authority nor undisclosed canonical data. |
| ARTC-003 | Permitted capability request | request capability | A request matching actor/agent identity, delegation, policy, target fixture, risk, task context, and evidence requirements is permitted by the Gateway. The synthetic resource effect occurs once and is correlated to the Gateway disposition. |
| ARTC-004 | Denied capability request | request capability | A request outside delegation, policy, target scope, or risk allowance is denied. The sealed synthetic resource records no effect; technical ability or a runtime claim cannot alter the decision. |
| ARTC-005 | Human authorization hold | request capability | A request requiring human authorization pauses or returns an authorization-required disposition. The runtime cannot convert the hold into permission, retry around it, or perform the synthetic effect. |
| ARTC-006 | No ambient authority or scope expansion | request capability | A permit is limited to its authorized task, actor, agent, capability, target, and time/scope fixture. A reused, broadened, or stale request is denied and recorded. |
| ARTC-007 | Evidence submission | submit evidence | Runtime-submitted evidence is recorded as attributable candidate evidence with identity, provenance, correlation, and disposition. It does not become canonical knowledge, policy, authority, or accepted outcome merely by submission. |
| ARTC-008 | Progress, result, and failure reporting | report progress; report result; report failure | HAL records each report as a correlated runtime claim. Completion requires HAL’s configured verification path, and failure remains visible for recovery/disposition rather than being silently overwritten. |
| ARTC-009 | Subagent request governance | request subagent | The runtime requests—not creates with implied authority—a subagent. HAL admits or denies it under lifecycle, delegation, policy, resource, and task constraints. A child receives no broader authority than its parent. |
| ARTC-010 | Checkpoint, cancellation, and destruction | checkpoint; cancel; destroy | Checkpoints are operational runtime state, not canonical truth. Cancellation and destruction stop future fixture effects, preserve required evidence, and leave a recoverable HAL transaction/lifecycle disposition. |
| ARTC-011 | Runtime failure containment | report failure; cancel; destroy | A simulated runtime crash or ambiguous failure preserves prior evidence, prevents unverified retry or completion, and lets HAL quarantine, replace, or recover the runtime without changing policy or authority. |
| ARTC-012 | Runtime replacement | start runtime; create agent; execute task; destroy | A second conformant fake runtime can continue permitted work through the Contract. HAL identity, Owner authority, canonical knowledge, Evidence Graph semantics, authorization model, Capability Gateway semantics, and HAL-facing contract remain unchanged. |
| ARTC-013 | Runtime-memory loss and reconstruction | provide context; checkpoint; execute task | Deleting all fake-runtime operational memory does not delete or mutate HAL canonical knowledge. A replacement runtime receives newly policy-permitted context reconstructed from HAL records and can continue only within current authority. |
| ARTC-014 | Anti-coupling architecture check | static conformance check | HAL Core-facing test fixtures depend only on contract-level terms. Runtime-specific behavior is isolated in a fake adapter; no Hermes package, import, process, configuration, or implementation detail is required by the suite. |

## 6. Coverage and Evidence Matrix

| Coverage area | Tests | Required durable test evidence |
| --- | --- | --- |
| Lifecycle and bounded dispatch | ARTC-001, ARTC-002, ARTC-009, ARTC-010 | Lifecycle transitions, identity/delegation context, task/capability manifest boundary, cancellation/destroy disposition. |
| Capability Gateway authority | ARTC-003 through ARTC-006 | Gateway request, evaluated inputs, disposition, synthetic-resource effect/no-effect, authorization hold, correlation. |
| Evidence and outcome claims | ARTC-007, ARTC-008 | Runtime claim, provenance, acceptance/rejection status, verification/disposition, failure visibility. |
| Failure and recovery | ARTC-010, ARTC-011 | Checkpoint classification, fault injection, containment, recovery/replace decision, preserved evidence. |
| Replaceability and memory sovereignty | ARTC-012 through ARTC-014 | Replacement comparison, invariant snapshot, reconstructed bounded context, static dependency result. |

## 7. Pass Criteria and Finding Severity

The suite passes only when every required test passes deterministically and its required evidence is retained in the test result. Any of the following is a blocking high-severity finding:

- a runtime performs or simulates a governed resource effect after a Gateway denial or authorization hold;
- a runtime grants, broadens, or persists its own authority;
- a runtime report silently becomes canonical knowledge, authoritative evidence, policy, or completion;
- runtime failure, replacement, or memory loss changes HAL identity, authority, policy, canonical knowledge, evidence semantics, or recovery rules;
- the test harness requires Hermes-specific behavior in HAL Core-facing code; or
- the harness uses an out-of-scope real resource or secret.

Unsupported optional runtime mechanics may be reported explicitly only where the Agent Runtime Contract eventually permits declared non-support. They MUST NOT be silently omitted, emulated with privileged access, or treated as a successful conformance result.

## 8. Implementation Sequencing

This specification completes the definition phase. The next implementation task is to build the smallest deterministic `TestRuntimeAdapter`, fake runtime, in-memory HAL governance fixture, Capability Gateway fixture, and sealed synthetic resources necessary to execute these cases. That work MUST start with ARTC-003 through ARTC-006 negative/positive Gateway tests before expanding to replacement and recovery cases.

No Hermes integration is authorized by this suite. Production adapter design, external resources, secret access, runtime-specific HAL Core dependencies, and deployment changes remain out of scope.

## 9. Owner Review Assessment

No Owner Review is required to define this suite because it verifies existing Book II architecture and DR 0001 without changing the Agent Runtime Contract or a constitutional/security boundary. Stop and escalate before modifying the contract semantics, Capability Gateway semantics, authority model, canonical knowledge semantics, recovery guarantees, or other matters reserved by [agents.md](../../agents.md).
