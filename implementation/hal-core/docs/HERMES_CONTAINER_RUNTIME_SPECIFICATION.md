# Hermes Separately Provisioned Container Runtime Specification

## Status

Provider-neutral requirement specification. GX10-1 is the Owner-designated target host under [DR 0006](../../../decisions/0006-container-runtime-hermes-evaluation-environment.md). No container runtime is installed locally and no remote container host is contacted by this document.

## Required Isolation Properties

- Dedicated disposable container instance and disposable writable volume.
- No bind mounts, shared folders, host Docker socket, Kubernetes socket, SSH agent, cloud metadata service, host networking, privileged mode, device access, or capability elevation.
- Read-only source/runtime image where practical; writable data only beneath a disposable evaluation root.
- Explicit `HERMES_HOME` under the evaluation root; no inherited user-home state.
- No credentials, secrets, provider API keys, owner data, canonical HAL data, repository contents, NAS paths, or governed-resource handles.
- Default-deny ingress and egress during evaluation. Any image/dependency acquisition must be a separately authorized, evidenced phase before network denial is asserted.
- No terminal, shell, browser, MCP, scheduler, messaging, Home Assistant, computer-use, remote environment, or secret-source capability enabled for the synthetic task.
- Resource caps for CPU, memory, process count, runtime duration, disk, and log size; values require provider-specific approval before launch.

## Approved Initial GX10-1 Resource Profile

The Owner approved the following initial profile for a future disposable synthetic evaluation. It is an upper bound, not an execution authorization.

- CPU: 4 logical CPUs.
- Memory: 16 GiB.
- Process count: 256.
- Writable evaluation storage: 30 GiB.
- Container log size: 100 MiB.
- Maximum runtime: 15 minutes.
- GPU/device access: prohibited.
- Network: `none`; no ingress or egress.

The profile must be translated into the effective rootless runtime configuration and verified before a container may be launched. The host does not support rootless Docker I/O `io.max` throttling; no implied substitute claim may be made.

## Required Validation Evidence

1. Runtime/provider version, host identity, image digest, provisioning manifest, and container command.
2. Effective mount, network, user, capability, seccomp/AppArmor/SELinux-equivalent, and resource-limit configuration.
3. Negative tests proving host, HAL repository, home, socket, credential, metadata, inbound, and egress denial.
4. Explicit isolated `HERMES_HOME` and writable-path validation.
5. HAL-side custody of all evaluation evidence, with runtime reports remaining non-canonical.
6. Destruction evidence for the container and all associated writable volumes.

## Provisioning Preconditions

GX10-1 is the Owner-designated host. Before any container activity, its approved access path, container runtime availability, supported isolation controls, image-acquisition policy, egress-control mechanism, and lifecycle controls must be confirmed and recorded. This specification does not authorize container creation or Hermes execution.
