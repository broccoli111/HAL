# Decision Record 0005 — Disposable VM Hermes Evaluation Environment

| Field | Value |
| --- | --- |
| Status | Superseded by DR 0006 |
| Date | 2026-08-09 |
| Scope | Isolation environment selection for a future synthetic Hermes evaluation |
| Owner Review | Required and approved by the Owner on 2026-08-09 |

## Decision

The first executable Hermes evaluation, if authorized after environment provisioning and validation, will occur only in a dedicated disposable virtual machine. The VM is not a HAL node, trust domain, canonical-state location, or governed-resource provider.

## Context

The local macOS `sandbox-exec` containment profile failed before its positive control completed. The profile was not weakened. A disposable VM provides a more appropriate isolation boundary for an untrusted external runtime with broad built-in tool, process, network, scheduler, state, messaging, MCP, and computer-use surfaces.

## Authoritative Sources

Higher-order sources prevail over this record.

- Book I sovereignty, authority, evidence, recovery, and resource-governance requirements.
- Book II Chapters 2, 15, 26–29, and 35.
- Book III Chapters 1, 3, 5, 6, 7, and 9.
- DR 0001, DR 0002, and DR 0004.

## Consequences

- Hermes execution remains blocked until a VM is provisioned and validated against the specified containment controls.
- The VM requires no HAL identity, authority, credential, secret, canonical data, or governed-resource access.
- VM destruction is the default post-evaluation cleanup path; retention requires separate authorization.

## Implementation Implications

- Prepare a provider-neutral VM specification and containment validation plan.
- Do not install a local hypervisor, create a cloud account, provision a VM, or grant external access under this decision alone.

## Owner Review Assessment

Required because the chosen isolation environment affects the runtime trust boundary. The Owner selected a disposable VM on 2026-08-09. This does not authorize a VM provider, installation, network configuration, or Hermes execution.

## Continuity Notes

Superseded because the Owner selected a separately provisioned container runtime instead of a disposable VM. Retained as decision history only.
