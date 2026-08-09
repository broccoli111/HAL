# HAL Current State

> **Status document only.** This file records project and implementation status for continuity. It is not architectural, constitutional, or policy authority. The HAL Canon—especially Book I, then Books II through IV and Book X—remains authoritative under the hierarchy in [agents.md](agents.md).

## How to Resume

A new engineering session MUST read [agents.md](agents.md), this document, the relevant authoritative Canon material, and applicable accepted Decision Records before consequential work. Do not treat this status record or prior chat history as authority.

## Current Phase

**Agent Runtime Abstraction and Runtime Sovereignty**

## Current Objective

Establish and verify the implementation-neutral Agent Runtime boundary before integrating Hermes.

## Completed

- Book I constitutional foundation established.
- Book II architecture established.
- Runtime-sovereignty Book II refactor completed in the Book II Markdown working edition.
- Agent Runtime Contract defined architecturally.
- Capability Gateway defined architecturally.
- Runtime memory sovereignty established.
- Runtime replaceability established.
- Hermes selected as **Reference Agent Runtime v1**.
- Repository-root [agents.md](agents.md) established.
- Repository continuity status and Decision Record mechanism established.
- Test-only Agent Runtime Contract conformance suite defined in [tests/agent_runtime_contract/CONFORMANCE_SUITE.md](tests/agent_runtime_contract/CONFORMANCE_SUITE.md).
- Deterministic TestRuntimeAdapter/fake runtime and in-memory governance/Gateway fixtures implemented for the suite.
- Test-only conformance cases ARTC-001 through ARTC-014 passed; see [test evidence](tests/agent_runtime_contract/TEST_EVIDENCE.md).
- Local Canon baseline committed and merged with the existing GitHub `main` implementation history without conflicts.
- Existing TypeScript implementation through M9 controlled local knowledge packs is now present under `implementation/hal-core`; its conformance to the runtime-sovereignty clarification has not yet been assessed.

## Important Current Architectural Boundaries

The following are status pointers, not restatements or replacements of architecture. Consult the cited Book II sections for normative detail.

- HAL retains sovereign authority; see Book I and [Book II Chapter 1, §8.1](Documents/Book%20II/markdown/HAL_Book_II_Chapter_01_Overall_System_Architecture_v0.2.md).
- HAL retains system-level work admission and placement. A runtime may perform runtime-local scheduling only after HAL admits and places work; see [Book II Chapter 2, §3.1](Documents/Book%20II/markdown/HAL_Book_II_Chapter_02_Runtime_Model_v0.2.md) and [Chapter 8](Documents/Book%20II/markdown/HAL_Book_II_Chapter_08_Attention_and_Resource_Allocation_v0.3.md).
- A runtime cannot grant itself authority; governed capabilities remain subject to HAL authorization through the [Capability Gateway](Documents/Book%20II/markdown/HAL_Book_II_Chapter_15_Capability_Architecture_v0.3.md).
- Runtime memory is not canonical HAL knowledge; see [Book II Chapter 10, Runtime Memory Sovereignty](Documents/Book%20II/markdown/HAL_Book_II_Chapter_10_Knowledge_Architecture_v0.3.md) and [Chapter 12](Documents/Book%20II/markdown/HAL_Book_II_Chapter_12_Memory_and_Experience_Ledger_v0.3.md).
- HAL Core depends on the Agent Runtime Contract, not Hermes internals; see [Book II Chapter 2, §3.2](Documents/Book%20II/markdown/HAL_Book_II_Chapter_02_Runtime_Model_v0.2.md).

## Next Planned Sequence

1. Perform targeted Book II conformance recertification using the test-only conformance evidence.
2. Regenerate authoritative formatted Book II editions.
3. Begin HermesAdapter integration only after the boundary has been validated and the preceding steps are complete.

## Explicitly Out of Scope

- Production Hermes integration.
- Unrestricted filesystem access.
- NAS access.
- Unrestricted shell execution.
- Home automation.
- Autonomous external communication.
- Production scheduling through Hermes.
- Direct runtime access to HAL secrets.
- Runtime-specific dependencies inside HAL Core.

## Current Documentation and Certification Status

The runtime-sovereignty clarification is recorded in the Book II Markdown working edition and [Book II Project Register](Documents/Book%20II/markdown/HAL_Book_II_Project_Register_v0.6.md). Test-only contract evidence is available in [tests/agent_runtime_contract/TEST_EVIDENCE.md](tests/agent_runtime_contract/TEST_EVIDENCE.md). Targeted Book II conformance recertification and regeneration of authoritative formatted Book II editions remain pending. The prior Book II certification applies to the preceding baseline only.

## Owner Review Status

No unresolved Owner Decision is currently recorded for the runtime-sovereignty clarification. Owner Review remains required whenever the conditions in [agents.md](agents.md) apply, including a material change to authority, constitutional invariants, a security boundary, canonical knowledge semantics, evidence/recovery guarantees, or a major architecture contract.

## Continuity Rule

Update this file at the completion of meaningful work when:

- the current phase changes;
- an objective is completed;
- the next planned task changes;
- an Owner Decision changes project direction;
- a major implementation milestone is reached; or
- a material blocker appears or is resolved.

Do not update it for trivial implementation edits.

A new Codex session should be able to inspect [agents.md](agents.md), this file, and relevant authoritative documentation to determine what HAL is, which rules apply, the current objective, the next expected work, and whether Owner input is needed.
