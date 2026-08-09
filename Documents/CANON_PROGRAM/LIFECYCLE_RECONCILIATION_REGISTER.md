# Cross-Book Lifecycle Reconciliation Register

Final disposition: PASS. Dependent books use the owning semantics and do not create competing state machines.

| Lifecycle | Owning source | Books that must use the same semantics |
|---|---|---|
| Identity continuity | II, IV, X | V, VI, VIII, IX |
| Authority grant and delegation | II, IV, X | V, VI, VII, VIII, IX |
| Intent | II, IV, X | V, VIII, IX |
| Capability | II, IV, X | V, VI, VII, VIII, IX |
| Action and transaction | II, IV, X | V, VI, VIII, IX |
| Evidence and verification result | II, IV, X | V, VI, VII, VIII, IX |
| Certification | I, II, X; procedures in VIII | V, VI, VII, IX |
| Treaty | I, II, IV, X | V, VI, VII, VIII, IX |
| Incident | II, IV; procedures in V and VI | VII, VIII, IX |
| Runtime mode | II and IV | V, VI, VIII, IX |
| Recovery | II-IV | V, VI, VIII, IX |
| Exception and waiver | III | V, VI, VII, VIII, IX |

Each dependent book MUST reference the owning lifecycle rather than create an incompatible state machine.
