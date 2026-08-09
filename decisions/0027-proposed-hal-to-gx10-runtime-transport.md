# Decision Record 0027 — Proposed HAL-to-GX10 Runtime Transport

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Persistent transport from HAL host to the isolated GX10-1 Hermes runtime |
| Owner Review | Explicit Owner approval: Option 1 |

## Decision

The Owner selected Option 1: establish a dedicated restricted SSH transport
from the HAL host to GX10-1 for the verified zero-capability Hermes stateless
execution path.

## Context

DR 0026 proved a disposable, local-only execution slice:

`HAL-issued binding -> HAL mediator -> isolated Hermes stateless component -> local Qwen3 -> result`

The result path reached local Qwen3 and returned the fixed synthetic result.
The HAL adapter edge can retain result callback custody. A durable assistant
requires an operational transport to invoke this isolated execution slice from
the HAL host rather than a manually run evaluation command.

## Existing Authority

Book I remains supreme. Book II assigns node governance, work placement,
runtime lifecycle, capability mediation, evidence, and recovery to HAL. DR
0026 authorizes only the disposable local-only pilot; it does not authorize a
persistent node transport.

## Options

1. **Dedicated restricted SSH transport (selected).** Use a separate
   runtime-only key and `hal_eval` identity, constrained to the fixed rootless,
   network-none, read-only Hermes stateless runner. No interactive shell,
   forwarding, general command execution, secret, or resource-capability path
   is available. The existing evaluation key remains a separate maintenance
   credential and is not repurposed as the persistent runtime key.
2. **HAL-owned local RPC service on GX10-1.** Introduce a new loopback/LAN
   service with mutual authentication and a narrowly defined execution API.
3. **No persistent transport.** Retain only manual disposable evaluation runs.

## Recommendation

Option 1 is authorized for the initial local assistant slice. It reuses the
already reviewed node identity and containment model, is narrowly revocable,
and does not require a new listener, protocol, service account, or direct
runtime resource access. The adapter transport remains outside HAL Core;
HAL Core continues to depend only on the Agent Runtime Contract.

## Required Constraints if Authorized

- fixed account and dedicated key only;
- forced or allow-listed fixed execution command only;
- no shell, port forwarding, agent forwarding, or file-copy capability;
- fixed network-none/read-only/capability-dropped container profile;
- binding, expiry, request-count, model, and output bounds enforced by HAL;
- no runtime capability manifest entries, secrets, canonical knowledge writes,
  or governed-resource access;
- HAL-owned result/evidence custody and explicit teardown verification;
- transport authorization must be revocable without changing HAL identity,
  canonical knowledge, or Constitution.

## Implementation Evidence

The accepted transport was provisioned with a separate runtime-only key using
OpenSSH `restrict` and the forced `hal_gx10_stateless_runtime.py` command. A
fixed synthetic request returned `HAL_LOCAL_OK`; a normal text-only arithmetic
request returned `4`. HAL's external composition harness passed each result
through `RuntimeHost` and `RuntimeSubmissionRecorder`, producing an
integrity-linked `result_report` whose canonical status remained
`unaccepted_runtime_claim`. An attempted arbitrary `id` command using the
runtime-only key was refused. Cleanup found no running container, mediator, or
temporary runtime directory.

## Impact

This would introduce an operational node-transport trust boundary but would
not amend the Constitution, change the Agent Runtime Contract, grant a
capability class, or make Hermes a HAL Core dependency.
