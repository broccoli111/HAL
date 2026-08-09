# Book IX Reconciliation Register

Status: Reconciled to Book IX v1.0; one governed contract-extension item remains. This is not an Owner Review register.

Book VIII uses the final Book IX v1.0 catalog and common HAL, authority-context, Treaty-context, and error envelopes. It does not create alternative transports or schemas. `IXR-009` identifies the single contract-level extension needed for a first-class certification-status signal; until then the exact fail-closed composition below is mandatory.

| ID | Logical obligation | Book IX v1.0 binding | Disposition | Mandatory Book VIII use |
|---|---|---|---|---|
| IXR-001 | Evidence submission and retrieval | IX-C-0174–0183; `hal-envelope.schema.json`; `authority-context.schema.json`; HAL error registry | Resolved | Submit/admit/retrieve/verify through CMP-18 contracts; preserve Evidence Manifest fields in the registered envelope and use HAL-INT-0001 for integrity failure. |
| IXR-002 | Verification request and result | IX-C-0143–0153 | Resolved | Start, record, query, reproduce, invalidate, and publish claim disposition only through these contracts; bind claim, target, method, environment, and evidence identifiers in the operation envelope. |
| IXR-003 | Simulation and Digital Twin execution | IX-C-0154–0164 | Resolved | Use Create/Load/Run/Inject/Get Result/Get Fidelity/Get Isolation contracts; retain model version, scenario, fidelity dimensions, limitations, isolation status, and result digest. |
| IXR-004 | Authority-path attestations | IX-C-0022, IX-C-0024–0026, IX-C-0029; `authority-context.schema.json` | Resolved | Link every protected result to current permission and effective-authority evidence; stale or revoked context returns HAL-AUZ-0001. |
| IXR-005 | Reality Boundary action evidence | IX-C-0131–0142 plus IX-C-0001–0008 | Resolved | Correlate proposal, authorization, protected admission/denial, transaction, rollback/compensation, and evidence IDs; HAL-REA-0001 requires reconciliation before retry. |
| IXR-006 | Audit and observability evidence | IX-C-0241–0251; IX-OBS-001–003 | Resolved | Append and seal attributable audit evidence, preserve correlation/causation, minimize sensitive telemetry, and treat broken audit chains as invalidating evidence. |
| IXR-007 | Component conformance results | All 305 component contracts and operation schemas; IX-CMP-001–003 | Resolved | Bind component ID, version, environment, contract ID/version, result, and evidence; contract success never substitutes for semantic or authority conformance. |
| IXR-008 | Treaty certification exchanges | IX-C-0196–0205 and IX-C-0206–0217; `treaty-context.schema.json`; IX-TRT-001–003 | Resolved | Use Firewall admission for every exchange and Treaty lifecycle contracts for activation/suspension/revocation; HAL-TRT-0001 fails closed. |
| IXR-009 | Certification status publication | IX-C-0175, IX-C-0177, IX-C-0178, IX-C-0181, IX-C-0183, IX-C-0241, IX-C-0249, IX-C-0219, IX-C-0226 | Reconciled with extension required | Represent the signed Certification Decision as an admitted Evidence Object; supersede it for status change; append audit evidence and publish the correlated event. Because Book IX has no dedicated certification-status operation, runtimes MUST query and verify the current Evidence Object and deny protected work if freshness or state cannot be proven. Open `IXA-001` through Book IX governance for dedicated certification-state query/event contracts. |
| IXR-010 | Recovery and regression triggers | IX-C-0145, IX-C-0153, IX-C-0250–0251, IX-C-0264–0275 | Resolved | Result invalidation, integrity alerts, audit-chain breaks, and recovery lifecycle events trigger scoped recertification and preserve evidence through reconciliation. |

## Contract extension item

`IXA-001` — Add first-class certification lifecycle contracts only through the Book IX interface-change process: query current Certification Decision and publish Certified, Conditioned, Suspended, Revoked, Expired, and Superseded transitions. Until adopted, the `IXR-009` composition is normative and fail-closed. This is an ordinary architecture/interface governance item, not an Owner decision.
