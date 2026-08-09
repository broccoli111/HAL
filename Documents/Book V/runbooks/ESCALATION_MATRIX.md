# Operational Escalation Matrix

| Condition | Immediate accountable role | Required escalation | Maximum initial escalation time |
|---|---|---|---:|
| Constitutional readiness, Owner authority, or invariant uncertainty | Incident Commander | Constitutional steward, Certification Authority, Operations Manager | Immediate |
| Identity continuity conflict or unauthorized state mutation | Incident Commander | Identity owner, component state owner, Security Incident Commander, Recovery Coordinator | Immediate |
| Reality Boundary ambiguity or repeated-effect risk | Action owner | Incident Commander, Authority owner, Evidence Custodian, Verification Lead | Immediate |
| Security compromise, secret exposure, or privilege escalation | Security Incident Commander | Incident Commander, Privacy Lead, Operations Manager, Certification Authority | Immediate |
| Privacy exposure or retention breach | Privacy Lead | Security Incident Commander, Incident Commander, Evidence Custodian | Immediate |
| Treaty failure, external compromise, or Firewall bypass | Trust Operator | Incident Commander, Security Incident Commander, Treaty Manager owner | Immediate |
| Certificate suspension, revocation, expiry, or invalid evidence | Operations Assurance Lead | Certification Authority, service owner, Incident Commander when active impact exists | Immediate |
| Disaster recovery or identity/state continuity risk | Recovery Coordinator | Incident Commander, state owners, Certification Authority | Immediate |
| High service degradation, capacity, migration, or backup risk | Service Owner | Operations Manager and applicable specialist owner | 15 minutes |
| Moderate operational defect without protected impact | Service Owner | Operations Manager through normal change governance | 4 hours |

Escalation never transfers higher-order authority implicitly. The receiving role MUST confirm identity, scope, authority, and custody.
