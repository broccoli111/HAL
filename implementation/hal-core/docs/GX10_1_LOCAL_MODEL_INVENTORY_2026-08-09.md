# GX10-1 Local Model Inventory — 2026-08-09

> **Scope:** Read-only DR 0013 precondition evidence. No model runtime, model, image, endpoint, service, or configuration was installed, started, changed, or exposed.

## Observed Evaluation Identity and Capacity

- Host: `gx10-01`, `aarch64`.
- Evaluation identity: non-privileged `hal_eval`.
- CPU: 20 logical CPUs.
- Memory: 121 GiB total, 118 GiB available at observation.
- GPU: NVIDIA GB10; driver `580.173.02`. The queried memory value was unavailable to the non-privileged inventory command.
- NVIDIA device nodes and `nvidia-ctk` are present, but the rootless Docker runtime currently registers only `runc`; no NVIDIA container runtime is registered for the `hal_eval` evaluation identity.

## Local Model Runtime Inventory

- No `ollama`, `llama-server`, or `vllm` executable was present in the evaluation identity’s command path.
- No local model image/artifact was present in the rootless Docker image inventory.
- The retained images are only the prior bounded Hermes/static Python evaluation images.
- No model endpoint was identified or approved.

## Listener Observation

The host has SSH on port 22 and system loopback listeners. A listener exists on `127.0.0.1:11000`, but its owning process/service, protocol, identity, provenance, model behavior, and authorization posture were not established by this inventory. It is therefore **not** treated as a local model endpoint and must not be used by HAL or Hermes.

## Disposition

DR 0013’s local-model pilot cannot begin yet: a separately approved local model runtime, immutable model input, controlled local endpoint, node/resource limits, and allow-listed evaluation path must be selected and provisioned. External providers remain prohibited.

The rootless GPU-runtime gap is a provisioning decision: do not pass host GPU devices into the existing evaluation container by ad hoc flags. Either retain a CPU-only disposable pilot under the current profile, or provision a separately reviewed least-privilege local model service/runtime with an explicitly governed GPU path.
