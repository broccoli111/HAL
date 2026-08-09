# GX10-1 Local Ollama Proxy — Synthetic Test Record

> **Status:** Test-only host-side evidence under DR 0017. This record does not authorize a Hermes connection, a container mount, a network route, real data, capabilities, or production use.

## Scope

On 2026-08-09, the `hal_eval` identity ran `run-local-ollama-proxy-synthetic-test.sh` against the host-side `hal_ollama_unix_proxy.py` prototype. The proxy listened only on an owner-only Unix-domain socket and upstreamed only to the already loopback-bound Ollama service at `127.0.0.1:11434`.

## Result

- The exact fixed synthetic request was accepted.
- The proxied HTTP response was bounded to **663 bytes**, below the 16,384-byte limit.
- The initial process test exposed a stale-socket teardown defect when the process received an unhandled termination signal. No runtime path was exposed. The defect was corrected with signal-aware teardown; the replacement test passed and verified the socket absent after termination.
- A non-allow-listed request was rejected with the fixed `{"error":"request_denied"}` response and was not forwarded to Ollama.
- The proxy test did not start Hermes, a container, a container network, or a runtime-facing listener.
- No capability, file, secret, host socket, LAN, internet, or HAL resource was involved.

## Remaining Activation Gates

The current prototype remains deliberately unusable by a runtime. Before any container-facing path can be considered, DR 0017 requires the identity-and-correlation binding, HAL-owned evidence path, container access design, and negative network/bypass tests described in [CONTROLLED_LOCAL_INFERENCE_PROXY_DESIGN.md](CONTROLLED_LOCAL_INFERENCE_PROXY_DESIGN.md). The existing rootless network assessment has not proven those denials.
