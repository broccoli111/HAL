# Proposed Hermes-to-Local-Ollama Mediation Boundary

> **Status:** Superseded as a selection/design proposal by DR 0017 and DR 0018. It remains historical context only and does not authorize a connection, network change, container change, credential, tool, capability, or real data flow.

## Current Proven Boundaries

- Hermes evaluation containers use `--network none` and cannot reach any host endpoint.
- Ollama/Qwen3 8B is bound only to `127.0.0.1:11434` on GX10-1 with cloud disabled.
- Both boundaries are correct. Connecting them requires a new, explicit mediation path; neither boundary may be relaxed ad hoc.

## Required Properties

1. Hermes may reach only the approved local Ollama inference service—not LAN, internet, model registry, host services, or a general network.
2. The mediation path must authenticate/bind the admitted Hermes execution and preserve task/correlation context.
3. It must enforce one approved model (`qwen3:8b`), synthetic data only, no tools, bounded context/tokens/time/concurrency, and no cloud/provider fallback.
4. It must not expose host filesystem, Docker socket, GPU device, secrets, raw shell, or any governed-resource capability to Hermes.
5. HAL must retain lifecycle, cancellation, evidence, and non-canonical claim custody.
6. Removal must restore the current separate no-network Hermes and loopback-only Ollama state.

## Candidate Designs

| Option                              | Description                                                                                                                                                              | Assessment                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| A. Controlled local inference proxy | A dedicated least-privilege proxy exposes one authenticated/synthetic-only local inference route to the Hermes evaluation namespace, with all other destinations denied. | **Recommended.** Explicitly narrow and independently observable.          |
| B. Shared private container network | Move/add services to a private network with strict egress controls.                                                                                                      | Broader blast radius; requires new network and service containment proof. |
| C. Host networking or broader bind  | Let Hermes reach host loopback through host-network behavior or widen Ollama binding.                                                                                    | Rejected. Weakens present isolation and risks unintended host/LAN access. |

## Required Evidence Before Activation

- architecture, threat, data-flow, and teardown review for the proxy/path;
- negative tests proving Hermes cannot reach LAN, internet, registry, DNS, host services, files, sockets, or unapproved local ports;
- positive test limited to synthetic Qwen3 8B inference with a single bounded request;
- identity/task/correlation, cancellation, failure, and non-canonical output evidence; and
- removal verification restoring `--network none` Hermes and loopback-only Ollama.

## Current Governing Direction

The Owner selected Option A in DR 0017 and authorized the HAL-owned, adapter-neutral identity-and-correlation mediation design in DR 0018. The active design artifacts are [Local Inference Mediation Contract](LOCAL_INFERENCE_MEDIATION_CONTRACT.md), [control matrix](LOCAL_INFERENCE_MEDIATION_CONTROL_MATRIX.md), and [verification plan](LOCAL_INFERENCE_MEDIATION_VERIFICATION_PLAN.md).

That authorization is limited to design and conformance planning. A container-facing route or activation still requires the recorded verification evidence and a further explicit Owner decision.
