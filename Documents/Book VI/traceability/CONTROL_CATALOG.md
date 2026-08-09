# Book VI Control Catalog

Version 1.0 | Status: Final | Controls: 112

| Control ID | Title | Objective | Severity | Responsible role | Evidence |
|---|---|---|---|---|---|
| VI-GOV-01-001 | Apply the canon hierarchy | Both | Critical | Security and Trust Executive | source manifest and decision record |
| VI-GOV-01-002 | Separate protection from restraint | Both | Critical | Control Owner | control record with protection objective |
| VI-GOV-01-003 | Assign control accountability | Both | High | Security and Trust Executive | approved control assignment |
| VI-GOV-01-004 | Classify risk by consequence | Both | Critical | Risk Steward | risk assessment |
| VI-GOV-01-005 | Maintain separation of duties | Both | Critical | Control Owner | approval and execution evidence |
| VI-GOV-01-006 | Operate a control lifecycle | Both | High | Control Owner | control lifecycle record |
| VI-GOV-01-007 | Time-bound all exceptions | Both | Critical | Risk Steward | signed exception record |
| VI-GOV-01-008 | Forbid program-created authority | Constrain HAL | Critical | Security and Trust Executive | authority non-creation attestation |
| VI-IAM-02-001 | Bind access to immutable identity | Both | Critical | Identity Service Owner | authentication record |
| VI-IAM-02-002 | Independently evaluate Permission for every action | Constrain HAL | Critical | Authority Service Owner | Permission Decision Record |
| VI-IAM-02-003 | Use risk-appropriate authentication | Both | High | Identity Service Owner | authentication assurance record |
| VI-IAM-02-004 | Review access continuously | Both | High | Resource Owner | access review and disposition |
| VI-IAM-02-005 | Revoke promptly | Both | Critical | Access Administrator | revocation receipts |
| VI-IAM-02-006 | Quarantine without identity erasure | Both | Critical | Security Operations | quarantine and release records |
| VI-IAM-02-007 | Prevent shared identities | Protect HAL | High | Identity Service Owner | identity registry |
| VI-IAM-02-008 | Minimize access | Both | High | Resource Owner | grant record |
| VI-PAM-03-001 | Broker privileged access | Both | Critical | Privileged Access Owner | session evidence |
| VI-PAM-03-002 | Use just-in-time elevation | Both | High | Privileged Access Owner | elevation record |
| VI-PAM-03-003 | Constrain break-glass | Both | Critical | Incident Commander | break-glass record and review |
| VI-PAM-03-004 | Protect Owner ceremonies | Constrain HAL | Critical | Privileged Access Owner | ceremony evidence reference |
| VI-PAM-03-005 | Issue workload-bound service identities | Protect HAL | High | Service Owner | service identity record |
| VI-PAM-03-006 | Eliminate embedded credentials | Protect HAL | Critical | Credential Custodian | scan results and rotation record |
| VI-PAM-03-007 | Rotate on defined triggers | Protect HAL | High | Credential Custodian | rotation and revocation receipts |
| VI-PAM-03-008 | Investigate privileged anomalies | Both | Critical | Security Operations | security event and disposition |
| VI-CRY-04-001 | Use approved cryptographic profiles | Protect HAL | Critical | Cryptography Authority | cryptographic inventory |
| VI-CRY-04-002 | Separate keys by purpose and domain | Both | Critical | Key Custodian | key metadata |
| VI-CRY-04-003 | Keep secrets out of ambient authority | Both | Critical | Key Custodian | secret access evidence |
| VI-CRY-04-004 | Protect key custody | Protect HAL | Critical | Key Custodian | key ceremony record |
| VI-CRY-04-005 | Verify certificates completely | Both | Critical | Certificate Operator | validation event |
| VI-CRY-04-006 | Rotate and revoke safely | Both | High | Certificate Operator | rotation manifest |
| VI-CRY-04-007 | Plan cryptographic agility | Protect HAL | High | Cryptography Authority | agility plan |
| VI-CRY-04-008 | Respond to cryptographic compromise | Both | Critical | Security Operations | compromise recovery package |
| VI-PLT-05-001 | Harden from declared baselines | Protect HAL | High | Platform Security Owner | baseline conformance evidence |
| VI-PLT-05-002 | Segment by trust and authority | Both | Critical | Network Security Owner | segmentation evidence |
| VI-PLT-05-003 | Isolate workloads | Protect HAL | High | Workload Owner | workload attestation |
| VI-PLT-05-004 | Build reproducibly | Protect HAL | Critical | Build Custodian | build manifest and comparison |
| VI-PLT-05-005 | Sign and verify provenance | Both | Critical | Build Custodian | provenance record |
| VI-PLT-05-006 | Maintain dependency inventories | Protect HAL | High | Dependency Owner | SBOM and disposition |
| VI-PLT-05-007 | Assume component compromise | Both | Critical | Security Assessor | compromise containment report |
| VI-PLT-05-008 | Control external build services | Both | Critical | Build Custodian | external service assessment |
| VI-VUL-06-001 | Maintain exposure-aware inventory | Protect HAL | High | Vulnerability Program Owner | asset exposure inventory |
| VI-VUL-06-002 | Accept findings from multiple channels | Protect HAL | High | Vulnerability Program Owner | finding record |
| VI-VUL-06-003 | Prioritize by HAL consequence | Both | Critical | Risk Steward | prioritization rationale |
| VI-VUL-06-004 | Meet risk-based remediation targets | Both | Critical | Asset Owner | containment and remediation evidence |
| VI-VUL-06-005 | Test patches before adoption | Both | High | Patch Authority | patch qualification record |
| VI-VUL-06-006 | Do not remove critical checks for urgency | Constrain HAL | Critical | Patch Authority | emergency patch record |
| VI-VUL-06-007 | Verify closure | Protect HAL | High | Independent Assessor | closure verification |
| VI-VUL-06-008 | Coordinate disclosure safely | Both | High | Security and Trust Executive | disclosure decision record |
| VI-PRV-07-001 | Classify before processing | Both | Critical | Data Owner | classification record |
| VI-PRV-07-002 | Prove purpose and authority | Constrain HAL | Critical | Purpose Owner | purpose and authority decision |
| VI-PRV-07-003 | Collect the minimum | Both | Critical | Privacy Steward | minimization assessment |
| VI-PRV-07-004 | Prevent incompatible reuse | Constrain HAL | Critical | Purpose Owner | reuse decision record |
| VI-PRV-07-005 | Set enforceable retention | Both | High | Retention Owner | retention schedule |
| VI-PRV-07-006 | Honor deletion across derived stores | Both | Critical | Retention Owner | deletion certificate |
| VI-PRV-07-007 | Provide confidentiality- and integrity-protected access and export | Both | Critical | Data Owner | access/export manifest |
| VI-PRV-07-008 | Minimize privacy evidence | Both | High | Evidence Custodian | minimized evidence manifest |
| VI-PIN-08-001 | Assess inference risk | Both | Critical | Privacy Steward | inference risk assessment |
| VI-PIN-08-002 | Do not promote inference to fact | Constrain HAL | Critical | Model Owner | inference record |
| VI-PIN-08-003 | Prohibit covert expansion | Constrain HAL | Critical | Privacy Steward | privacy change decision |
| VI-PIN-08-004 | Preserve human dignity and agency | Constrain HAL | Critical | Human Interaction Owner | interaction assessment |
| VI-PIN-08-005 | Test privacy failure paths | Both | Critical | Independent Assessor | privacy verification report |
| VI-PIN-08-006 | Detect privacy incidents | Both | High | Privacy Steward | privacy incident record |
| VI-PIN-08-007 | Contain without destroying accountability | Both | Critical | Incident Commander | containment record |
| VI-PIN-08-008 | Remediate affected lifecycle paths | Both | Critical | Data Owner | privacy recovery package |
| VI-TRU-09-001 | Classify every Trust Domain | Both | Critical | Trust Steward | Trust Domain record |
| VI-TRU-09-002 | Keep trust distinct | Constrain HAL | Critical | Trust Steward | Trust Assessment and Permission Decision Record |
| VI-TRU-09-003 | Route cross-domain exchange through the Firewall | Both | Critical | Constitutional Firewall Owner | Firewall decision and receipt |
| VI-TRU-09-004 | Fail closed on missing boundary facts | Both | Critical | Constitutional Firewall Owner | denial or quarantine event |
| VI-TRU-09-005 | Constrain returned data and effects | Constrain HAL | Critical | Constitutional Firewall Owner | exchange manifest |
| VI-TRU-09-006 | Preserve cross-domain provenance | Both | High | Evidence Custodian | provenance chain |
| VI-TRU-09-007 | Monitor domain drift | Both | High | Domain Owner | domain reassessment |
| VI-TRU-09-008 | Exercise boundary failure | Both | Critical | Security Operations | boundary exercise report |
| VI-TRT-10-001 | Perform Treaty due diligence | Both | Critical | Treaty Steward | Treaty assessment package |
| VI-TRT-10-002 | Preserve Owner approval | Constrain HAL | Critical | Treaty Steward | Owner Authorization Ceremony Record |
| VI-TRT-10-003 | Activate exact approved versions | Both | Critical | Constitutional Firewall Owner | activation record |
| VI-TRT-10-004 | Monitor Treaty obligations | Both | High | Treaty Steward | Treaty monitoring evidence |
| VI-TRT-10-005 | Suspend on material uncertainty | Both | Critical | Incident Commander | suspension record and receipts |
| VI-TRT-10-006 | Revoke comprehensively | Both | Critical | Treaty Steward | revocation manifest |
| VI-TRT-10-007 | Control subcontractors and fourth parties | Both | Critical | Third-Party Risk Owner | downstream party register |
| VI-TRT-10-008 | Exit safely | Both | High | Treaty Steward | exit evidence package |
| VI-DET-11-001 | Emit incident-relevant events | Both | Critical | Observability Owner | event records |
| VI-DET-11-002 | Use canonical telemetry context | Both | High | Observability Owner | validated event stream |
| VI-DET-11-003 | Minimize and protect telemetry | Both | Critical | Privacy Steward | telemetry data inventory |
| VI-DET-11-004 | Detect authority violations separately | Constrain HAL | Critical | Detection Engineering Owner | authority incident alert |
| VI-DET-11-005 | Validate detection quality | Both | High | Detection Engineering Owner | detection validation record |
| VI-DET-11-006 | Triage by consequence | Both | Critical | Security Operations | triage record |
| VI-DET-11-007 | Protect evidence pipelines | Protect HAL | Critical | Evidence Custodian | pipeline attestation |
| VI-DET-11-008 | Measure coverage honestly | Both | High | Detection Engineering Owner | detection coverage report |
| VI-INC-12-001 | Declare incidents by consequence | Both | Critical | Incident Commander | incident declaration |
| VI-INC-12-002 | Establish one incident command | Both | High | Incident Commander | incident record |
| VI-INC-12-003 | Contain proportionately | Both | Critical | Incident Commander | containment decision record |
| VI-INC-12-004 | Preserve chain of custody | Protect HAL | Critical | Evidence Custodian | chain-of-custody record |
| VI-INC-12-005 | Separate facts from hypotheses | Both | High | Security Operations | investigation timeline |
| VI-INC-12-006 | Coordinate privacy and trust response | Both | Critical | Incident Commander | coordination record |
| VI-INC-12-007 | Notify with verified scope | Both | High | Incident Commander | notification record |
| VI-INC-12-008 | Prevent incident authority expansion | Constrain HAL | Critical | Incident Commander | emergency authority record |
| VI-ASR-13-001 | Recover from independently verified foundations | Both | Critical | Recovery Coordinator | Recovery Admission Record |
| VI-ASR-13-002 | Scope eradication to dependencies | Protect HAL | Critical | Recovery Coordinator | eradication evidence |
| VI-ASR-13-003 | Require post-recovery verification | Both | Critical | Certification Liaison | Book VIII result reference |
| VI-ASR-13-004 | Authorize offensive testing | Protect HAL | Critical | Red Team Lead | signed engagement plan |
| VI-ASR-13-005 | Test both attacker and overreach paths | Both | Critical | Security Assessor | adversarial assessment |
| VI-ASR-13-006 | Remediate findings with independent closure | Both | High | Security Assessor | retest and closure record |
| VI-ASR-13-007 | Prepare auditable evidence | Both | High | Audit Lead | audit evidence manifest |
| VI-ASR-13-008 | Supply but do not issue certification | Constrain HAL | Critical | Certification Liaison | assurance evidence package |
| VI-CON-14-001 | Measure outcomes and control health | Both | High | Metrics Owner | metrics catalog and reports |
| VI-CON-14-002 | Prevent vanity metrics | Both | High | Metrics Owner | metric interpretation record |
| VI-CON-14-003 | Track leading and lagging signals | Both | High | Control Owner | risk monitoring record |
| VI-CON-14-004 | Learn without rewriting history | Both | High | Control Owner | improvement decision |
| VI-CON-14-005 | Reconcile Book IX contracts | Both | Critical | Book IX Liaison | Book IX mapping register |
| VI-CON-14-006 | Reconcile Book VIII assurance | Both | Critical | Book VIII Liaison | Book VIII mapping register |
| VI-CON-14-007 | Review the program periodically | Both | High | Independent Assessor | program review report |
| VI-CON-14-008 | Certify Book VI conformance honestly | Both | Critical | Security and Trust Executive | Book VI certification report |
