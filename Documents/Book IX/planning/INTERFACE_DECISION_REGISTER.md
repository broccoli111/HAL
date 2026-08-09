# Interface Decision Register

| Decision | Resolution | Basis | Status |
|---|---|---|---|
| IX-DEC-001 | JSON is the canonical REST/event example encoding; Protobuf is the canonical binary/gRPC profile. | Book III permits implementation choices; both are explicit and versioned. | Accepted |
| IX-DEC-002 | All interactions use the HAL envelope and authority-context schema. | Books II-IV require identity, authority, provenance, correlation, time, and schema metadata. | Accepted |
| IX-DEC-003 | Unknown major versions fail closed; compatible minor additions are ignored only when explicitly marked extensible. | Book II forbids guessed semantics. | Accepted |
| IX-DEC-004 | Commands are idempotent by required key unless a contract is explicitly non-retryable; Reality Boundary ambiguity requires reconciliation before retry. | Books II-III. | Accepted |
| IX-DEC-005 | External exchange requires both active Treaty context and Constitutional Firewall admission. | Books I-II. | Accepted |
