# GX10-1 Local Inference Mediation — Negative Containment Test

> **Status:** DR 0019 evidence, completed 2026-08-09. This is not positive inference evidence and does not authorize CT-008, Hermes, a model request, or production use.

## Environment

- **Identity:** dedicated non-privileged `hal_eval` account with rootless Docker.
- **Image:** existing Linux/ARM64 Python 3.13 image `sha256:8c5de2243cba89f49a93e05cacb78e27058bcaa69c148baac127005da03af39e`; no pull or installation occurred.
- **Container controls:** `--network none`, read-only root, dropped capabilities, `no-new-privileges`, 32-process, 128 MiB, 1 CPU limits, and no devices or host mounts except the temporary mediator socket for CT-005/006.
- **Mediator:** test-only owner-only Unix socket with no network, model, Ollama, upstream, credential, or positive request implementation. Every request was denied.

## Results

| Test   | Result | Evidence                                                                                                                   |
| ------ | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| CT-001 | PASS   | DNS lookup failed under `--network none`.                                                                                  |
| CT-002 | PASS   | LAN/internet connection attempt failed.                                                                                    |
| CT-003 | PASS   | Container-local attempts to SSH and raw Ollama loopback failed; no host-loopback path existed.                             |
| CT-004 | PASS   | Docker socket, mediator socket in the no-mount case, GPU device, and HAL secret-like environment variables were absent.    |
| CT-005 | PASS   | A request with no binding reached the temporary socket and returned only `{"error":"binding_denied"}`.                     |
| CT-006 | PASS   | A replayed/mutated synthetic binding/model request returned only `{"error":"binding_denied"}`.                             |
| CT-007 | PASS   | Signal-aware mediator teardown removed the socket; a later bind-mount attempt failed because the source no longer existed. |

The mediator recorded exactly two minimized `binding_denied` events. No positive request was admitted, so no upstream/model contact was possible.

## Cleanup Verification

After the suite, read-only verification found no mediator process, no mediator socket, no remaining test containers, and no Ollama model loaded. The test did not start Hermes, invoke Ollama, create a listener, alter Docker networking, or expose any governed resource.

## Limits and Next Gate

This proves the declared negative containment behaviors only. It does not prove a valid HAL-issued binding, a real mediator implementation, runtime identity mapping, positive local inference, model output handling, or production readiness. CT-008 remains a separate Owner-gated bounded synthetic test under the DR 0018 contract and must not proceed without explicit approval.
