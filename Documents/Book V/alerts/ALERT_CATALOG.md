# Alert Catalog

| ID | Condition | Severity | Immediate action |
|---|---|---|---|
| ALT-001 | Constitutional readiness unknown | Critical | Immediately stop protected admission |
| ALT-002 | Authority decision stale or unavailable | Critical | Fail closed and enter authority-safe degradation |
| ALT-003 | Certificate suspended, revoked, expired, or unverifiable | Critical | Deny scoped reliance |
| ALT-004 | Treaty inactive or drifted during exchange | Critical | Stop exchange and reconcile in-flight work |
| ALT-005 | Constitutional Firewall bypass or rejection spike | Critical | Contain external paths |
| ALT-006 | Identity continuity conflict | Critical | Fence competing identity/state writers |
| ALT-007 | Reality Boundary outcome indeterminate | Critical | Block retry and reconcile reality |
| ALT-008 | Audit/evidence integrity failure | Critical | Preserve sources and suspend dependent reliance |
| ALT-009 | Unauthorized protected-state mutation | Critical | Fence writer and declare incident |
| ALT-010 | Backup restore verification failure | High | Quarantine restore and investigate |
| ALT-011 | Replication lag exceeds recovery objective | High | Throttle risk and escalate |
| ALT-012 | Queue age exceeds deadline budget | High | Apply backpressure/degradation |
| ALT-013 | Dead-letter growth | High | Contain producer/consumer path |
| ALT-014 | Contract incompatibility | High | Reject version and route only approved adapter |
| ALT-015 | Configuration drift | High | Freeze normalization and classify |
| ALT-016 | Secret exposure signal | Critical | Revoke, rotate, contain, preserve evidence |
| ALT-017 | Certificate nearing expiry | High | Initiate verified rotation |
| ALT-018 | Capacity saturation | High | Bound admission and scale safely |
| ALT-019 | Recovery objective threatened | High | Activate continuity plan |
| ALT-020 | Privacy retention breach risk | High | Hold processing and notify privacy lead |
| ALT-021 | Telemetry freshness unknown | High | Mark health unknown |
| ALT-022 | Canary harm threshold exceeded | Critical | Stop and regress verification rung |
| ALT-023 | Migration reconciliation mismatch | Critical | Abort cutover and preserve source authority |
| ALT-024 | Temporary access nearing expiry | High | Revoke unless explicitly reapproved |
| ALT-025 | Corrective action overdue | High | Escalate to accountable owner |

Every alert also requires an owner, evidence query, escalation clock, communication path, and verified resolution signal configured in the monitoring system.
