# Cross-Book Consistency Register

Final disposition: every integration test below passed. No material conflict remains.

| Concern | Canonical source | Dependent books | Required integration test |
|---|---|---|---|
| Constitutional authority and invariants | I | All | No lower book creates, waives, or reinterprets constitutional authority |
| Component boundaries and ownership | II and IV | V, VI, VIII, IX | No procedural or contract artifact creates a second mutation owner |
| Engineering controls and evidence | III | V, VI, VIII, IX | Procedures and contracts preserve mandatory controls and exception limits |
| Canonical meanings | X | V, VI, VII, VIII, IX | Shared terms resolve to one canonical meaning |
| Machine contracts | IX | V, VI, VIII | Procedures reference contract IDs and do not redefine wire semantics |
| Verification and certification | VIII | V, VI, VII | Certification states, suspension, revocation, evidence, and authority agree |
| Security, privacy, and trust program | VI | V, VII, VIII | Risk, incident, access, Treaty, and privacy governance agree |
| Operational states and procedures | V | VI, VII, VIII | Degraded, recovery, shutdown, restoration, and continuity states agree |
| Human governance authority | I and VII | V, VI, VIII | Approval and escalation do not exceed delegated authority |

Advisory IXA-001 remains a nonblocking ordinary interface-governance improvement: a future Book IX revision may add a first-class certification-status query/event. Current Book VIII behavior is safely composed from the signed Certification Decision Evidence Object, supersession and audit/event records, runtime freshness/integrity checks, and fail-closed admission.
