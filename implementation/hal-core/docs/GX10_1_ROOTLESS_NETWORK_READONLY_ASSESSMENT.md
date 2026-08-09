# GX10-1 Rootless Network — Read-Only Assessment

> **Status:** Read-only assessment on 2026-08-09. This is evidence for DR 0017/DR 0018 planning, not a containment result or activation authorization.

## Scope

The `hal_eval` identity was queried without changing host, Docker, firewall, image, container, listener, or network state. The assessment collected rootless Docker security options, defined Docker networks and images, the user service environment, and host TCP listeners.

## Observed State

| Area                | Observation                                                                                                                   | Consequence                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Docker security     | Built-in seccomp, rootless mode, and cgroup namespace reported.                                                               | Useful baseline; not a proof of route denial.                                                                    |
| Docker networks     | Default `bridge`, `host`, and `none` networks exist.                                                                          | A future test must explicitly select and verify its network mode; default networking is not acceptable evidence. |
| Host listeners      | Loopback listeners include local DNS, printing, port `11000`, and Ollama on `127.0.0.1:11434`; SSH listens on all interfaces. | A route to the host cannot be assumed to reach only Ollama.                                                      |
| Existing images     | Earlier disposable Phase 1–3 images remain present.                                                                           | No new artifact was acquired; any future test must use a specifically recorded image/profile.                    |
| User Docker service | No special mediation or route environment was configured.                                                                     | No inferred access path exists from a container to the host-side proxy.                                          |

## Conclusion

The current `--network none` posture remains the only acceptable runtime posture. A default bridge, host-network mode, published port, raw host socket, or direct Ollama endpoint would violate DR 0017/DR 0018 limits. The host-side proxy is deliberately not container-addressable, and no bypass/egress claim is made.

## Required Before Any Containment Simulation

1. Complete the versioned negative network/bypass test design using the DR 0018 contract and control matrix.
2. Define the exact disposable image, namespace, identity mapping, route binding, and teardown evidence.
3. Obtain any additional required Owner authorization before creating a container-facing route or mount.
4. Fail closed to `--network none` after every probe.
