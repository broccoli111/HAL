# Decision Record 0001 — Agent Runtime Sovereignty and Replaceability

| Field | Value |
| --- | --- |
| Status | Accepted architectural clarification |
| Date | 2026-08-08 |
| Scope | Repository-wide architecture and future implementation direction |
| Owner Review | Not required; no constitutional amendment or material authority change is made by this record |

## Decision

HAL may delegate replaceable agent-runtime mechanics through the Agent Runtime Contract while retaining sovereign governance. Hermes Agent is **Reference Agent Runtime v1**, behind HermesAdapter; it is not the definition of the contract.

## Context

HAL must remain constitutionally sovereign and implementation-independent while using an external agent runtime for commodity execution mechanics. Book I review found the runtime-sovereignty posture compatible with existing constitutional requirements; no new Constitutional Principle, Rule, or amendment is created by this clarification.

## Authoritative Sources

Higher-order sources prevail over this record.

- Book I: Decisions 1, 5, 10, 16, 25, 27, 30, 35–40, 43, 48–49, 51, and 58 in [HAL Constitution](../Documents/Book%20I/markdown/HAL_Book_I_Constitution_v1.0.md).
- Book II: [Chapter 1, §8.1](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_01_Overall_System_Architecture_v0.2.md), [Chapter 2, §§3.1–3.2](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_02_Runtime_Model_v0.2.md), [Chapter 10](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_10_Knowledge_Architecture_v0.3.md), [Chapter 12](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_12_Memory_and_Experience_Ledger_v0.3.md), [Chapter 15](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_15_Capability_Architecture_v0.3.md), [Chapter 16](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_16_Action_and_Transaction_Architecture_v0.3.md), [Chapter 28](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_28_Recovery_and_Continuity_v0.2.md), and [Chapter 35](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_35_Architecture_Conformance_and_Certification_v0.2.md).
- Repository-wide operating instructions: [agents.md](../agents.md).

## Alternatives Considered

- **Implement HAL’s complete native agent runtime first.** Not selected: it unnecessarily couples commodity runtime mechanics to HAL before the governance boundary is validated.
- **Treat Hermes as the HAL runtime and allow direct resource access.** Rejected: it conflicts with HAL’s authority, resource-governance, evidence, and replaceability requirements.
- **Defer all runtime abstraction.** Not selected: it would make future runtime integration prone to hidden coupling and privileged bypasses.

## Consequences

- HAL retains governance, identity, authority, policy, canonical knowledge, evidence, agent lifecycle authority, recovery authority, governed resource access, and system-level work admission and placement.
- HAL Core may depend on the Agent Runtime Contract but MUST NOT depend on Hermes internals.
- Hermes is neither a constitutional dependency nor a root of trust.
- Runtime-local scheduling may be delegated only after HAL has admitted and placed work.
- Runtime memory remains non-authoritative until accepted through governed HAL knowledge processes.
- No runtime can grant itself authority.
- Replacing Hermes must preserve HAL’s Constitution, canonical knowledge, Evidence Graph semantics, authorization model, Capability Gateway semantics, and HAL-facing interfaces.

## Implementation Implications

- Define and test the Agent Runtime Contract before integrating Hermes.
- Use TestRuntimeAdapter/fake runtime infrastructure to verify capability approval/denial, evidence submission, failure handling, runtime replacement, and runtime-memory reconstruction.
- Do not implement production Hermes integration, direct runtime access to governed resources or secrets, or HAL Core dependencies on Hermes-specific behavior until the contract boundary has been validated.

## Owner Review Assessment

Not required for this record because it records an architectural clarification already compatible with Book I and reflected in Book II. A future change that alters the Agent Runtime Contract, Capability Gateway semantics, canonical knowledge authority, constitutional safeguards, or any other condition in [agents.md](../agents.md) requiring Owner Review must be escalated before adoption.

## Continuity Notes

The test-only Agent Runtime Contract conformance suite and an inert TypeScript adapter seam are implemented. The next implementation task is a HAL-owned runtime-host and Capability Gateway integration against the existing local synthetic authority path. Targeted Book II conformance recertification remains pending until the independent reviewer’s formal disposition is stored; an actual Hermes package, process, transport, or credential integration is not authorized by this record.
