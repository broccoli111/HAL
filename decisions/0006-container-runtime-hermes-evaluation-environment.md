# Decision Record 0006 — Container Runtime Hermes Evaluation Environment

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-08-09 |
| Scope | Isolation environment selection for a future synthetic Hermes evaluation |
| Owner Review | Required and approved by the Owner on 2026-08-09 |

## Decision

The first executable Hermes evaluation, if separately authorized after environment provisioning and validation, will use a separately provisioned container runtime. It must be isolated from the HAL host and repository and must not grant Hermes host, HAL, canonical-state, or governed-resource authority.

The Owner designated **GX10-1** as the intended separately provisioned host on 2026-08-09. This is a placement decision only; it does not authorize host access, container-runtime installation, image acquisition, container creation, Hermes execution, or a relaxation of any containment requirement below.

Following GX10-1 preflight, the Owner approved a dedicated, non-sudo evaluation identity with a rootless container runtime on GX10-1 (Option 1) on 2026-08-09. This authorizes the minimum host bootstrap needed to establish that identity and rootless runtime. It does not authorize image acquisition, container creation, Hermes execution, network egress, or access to HAL data, secrets, or governed resources.

The Owner approved the initial GX10-1 disposable-evaluation resource profile on 2026-08-09: 4 logical CPUs, 16 GiB memory, 256 processes, 30 GiB writable storage, 100 MiB logs, and a 15-minute maximum runtime. GPU/device access and network access remain disallowed. This cap profile does not authorize image acquisition, container creation, or Hermes execution.

## Context

The Owner supersedes the disposable-VM choice in DR 0005. The local host has no container runtime installed, and none will be installed under this decision.

## Consequences

- Hermes execution remains blocked until a separately provisioned runtime and containment configuration are identified and validated.
- No host mounts, host sockets, host networking, credentials, secrets, canonical HAL data, or governed-resource handles are allowed.
- Container destruction and evaluation-volume destruction are the default cleanup path; retention requires separate authorization.

## Implementation Implications

- Prepare provider-neutral container requirements and a validation plan.
- Do not install Docker, Podman, Colima, Lima, or any other runtime locally.
- Do not create or contact an external container host under this decision alone.
- On GX10-1 only, establish the approved dedicated evaluation identity and its rootless runtime using the least-privilege host configuration; record provisioning evidence before any container activity.

## Owner Review Assessment

Required because the chosen isolation environment affects the runtime trust boundary. The Owner selected a separately provisioned container runtime on 2026-08-09. This does not authorize a provider, runtime endpoint, image acquisition, dependency installation, container launch, or Hermes execution.

## Continuity Notes

GX10-1 is the Owner-designated target host. Establish its approved access path and confirm its supported container isolation controls, then validate its isolation before any Hermes artifact is introduced.
