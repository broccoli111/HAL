# Lifecycle State Register

| Transition ID | Concept | From | To | Entry condition | Required evidence |
|---|---|---|---|---|---|
| HAL-TRANS-0001 | Term Record | Proposed | Candidate | Semantic steward accepts a complete proposal | Proposal and source mapping |
| HAL-TRANS-0002 | Term Record | Candidate | Approved | Cross-book review passes and authority is confirmed | Review record and decision |
| HAL-TRANS-0003 | Term Record | Approved | Deprecated | Replacement and migration plan are approved | Deprecation notice |
| HAL-TRANS-0004 | Term Record | Deprecated | Retired | Sunset conditions are met and dependents are migrated | Retirement verification |
| HAL-TRANS-0005 | Delegation | Draft | Active | Authorized delegator signs within scope | Delegation record |
| HAL-TRANS-0006 | Delegation | Active | Expired | Expiration time is reached | Expiry event |
| HAL-TRANS-0007 | Delegation | Active | Revoked | Authorized revoker acts | Revocation evidence |
| HAL-TRANS-0008 | Transaction | Proposed | Authorized | Authority and policy checks pass | Policy Decision Record |
| HAL-TRANS-0009 | Transaction | Authorized | Prepared | Preconditions and resources are secured | Preparation evidence |
| HAL-TRANS-0010 | Transaction | Prepared | Committed | Commit Barrier conditions pass | Commit record |
| HAL-TRANS-0011 | Transaction | Committed | Completed | Effects and outcomes are observed | Outcome and Evidence Objects |
| HAL-TRANS-0012 | Transaction | Prepared | Rolled Back | Reversible state is restored | Rollback evidence |
| HAL-TRANS-0013 | Transaction | Committed | Compensating | Irreversible effects require remediation | Compensation decision |
| HAL-TRANS-0014 | Evidence Candidate | Collected | Admitted | Evidence Service validates provenance and custody | Admission record |
| HAL-TRANS-0015 | Certification | Proposed | Active | Authorized certifier approves scoped assurance case | Certification record |
| HAL-TRANS-0016 | Certification | Active | Suspended | Material evidence defect or risk invalidates reliance | Suspension record |
| HAL-TRANS-0017 | Certification | Active | Expired | Validity period ends | Expiry record |
| HAL-TRANS-0018 | Treaty | Draft | Active | The Owner Authorization Ceremony approves the exact, time-bounded Treaty | Owner authorization bound to the exact Treaty plus Constitutional Firewall activation evidence |
| HAL-TRANS-0019 | Treaty | Active | Suspended | Boundary conditions or trust fail | Suspension and containment record |
| HAL-TRANS-0020 | Treaty | Active | Revoked | Authorized party terminates the Treaty | Revocation evidence |
| HAL-TRANS-0021 | Service | Starting | Ready | Readiness criteria pass | Readiness observation |
| HAL-TRANS-0022 | Service | Ready | Degraded | Declared service conditions fall below threshold | Health and incident evidence |
| HAL-TRANS-0023 | Service | Degraded | Quarantined | Containment criteria require isolation | Quarantine record |
| HAL-TRANS-0024 | Service | Quarantined | Recovering | Recovery plan is authorized | Recovery record |
| HAL-TRANS-0025 | Release | Candidate | Qualified | Required verification and reviews pass | Release-readiness record |
| HAL-TRANS-0026 | Release | Qualified | Released | Release Authority approves deployment scope | Release certification |
| HAL-TRANS-0027 | Exception | Proposed | Active | Authorized approver accepts bounded residual risk | Exception record |
| HAL-TRANS-0028 | Exception | Active | Expired | Expiration date is reached | Fail-closed signal or escalation |
