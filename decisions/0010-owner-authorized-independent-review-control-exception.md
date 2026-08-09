# Engineering Exception 0010 — Owner-Authorized Independent-Review Control Exception

| Field | Value |
| --- | --- |
| Status | Active, time-bounded exception |
| Date | 2026-08-09 |
| Affected controls | Book II Chapter 35, Runtime Workflow step 6; Book III VER-004 through VER-006 and GOV-006 |
| Scope | Runtime-sovereignty clarification and test-only adapter-boundary work only |
| Approving authority | Owner, explicit authorization on 2026-08-09 |
| Effective date | 2026-08-09 |
| Review date | 2026-08-15 |
| Expiration date | 2026-08-16 |

## Decision

The Owner authorizes a temporary exception to the independent-review gate for the narrow runtime-sovereignty clarification and its test-only adapter-boundary evidence. This exception permits continued, provisional documentation and test-only implementation work while the formal independent-review disposition is absent.

It does **not** issue or renew Book II certification, represent the revised Book II working edition as independently recertified, waive any constitutional invariant, authorize production Hermes integration, authorize a real capability or governed resource, or authorize a real provider, credential, or production transport.

## Justification

The Owner explicitly directs the project to move forward without waiting for the independent-review artifact. The existing evidence package, deterministic contract suite, HAL Core quality gate, and bounded GX10 synthetic evidence remain available for later independent review.

## Risk and Compensating Controls

The exception removes independent reviewer separation for this narrow interim stage. The compensating controls are:

- the changed architecture remains a Book II Markdown working edition and is explicitly not recertified;
- all runtime work remains test-only, zero-capability, adapter-confined, and non-production;
- Book I, existing Book II authority boundaries, and all out-of-scope restrictions remain fully binding;
- automated conformance and quality gates must continue to pass;
- runtime claims remain non-canonical and cannot imply authority, permission, an accepted outcome, or canonical knowledge; and
- any production integration, real resource access, real provider/credential use, or certification claim fails closed pending separately governed approval and the required review evidence.

## Evidence

- [Book II Chapter 35](../Documents/Book%20II/markdown/HAL_Book_II_Chapter_35_Architecture_Conformance_and_Certification_v0.2.md)
- [Book III Chapter 9](../Documents/Book%20III/chapters/09_CONTROL_OPERATIONS_EXCEPTIONS_AND_CERTIFICATION.md)
- [Runtime-sovereignty recertification handoff](../tests/agent_runtime_contract/RECERTIFICATION_HANDOFF.md)
- [Runtime Contract test evidence](../tests/agent_runtime_contract/TEST_EVIDENCE.md)
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md)

## Revocation and Fail-Closed Conditions

This exception is revoked immediately if a constitutional conflict, authority-boundary defect, evidence-integrity defect, or material security finding is discovered. It expires on 2026-08-16. On expiry, the project must stop relying on this exception and return to the independent-review gate; no production or certification claim is permitted under any circumstance.

## Consequences

This is an engineering-control exception, not a Constitutional amendment or an architectural change. It is intentionally narrow, temporary, and reversible. It does not alter the requirement for independent review in the HAL Canon.
