# GX10 Restricted Hermes Runtime Transport

## Status

Owner-authorized initial local-assistant transport under DR 0027. This is a
zero-capability, local-only execution slice; it is not production authority,
a general resource gateway, or canonical knowledge ingestion.

## Boundary

`HAL external adapter harness -> restricted SSH key -> forced GX10 command -> network-none Hermes stateless runner -> HAL mediator -> loopback Ollama/Qwen3 -> HAL RuntimeHost -> RuntimeJournal`

The remote key uses OpenSSH `restrict` and a forced command. It cannot open a
shell, copy files, forward ports, forward an agent, or select another command.
The remote command accepts only a one-line JSON object with `correlationId`
and text `prompt`; it permits no capability manifest.

## Local Configuration

```sh
export HAL_GX10_RUNTIME_TARGET='hal_eval@192.168.124.100'
export HAL_GX10_RUNTIME_KEY="$HOME/.ssh/hal_gx10_runtime_ed25519"
export HAL_RUNTIME_STATE_DIRECTORY='/path/to/hal-runtime-state'
```

`HAL_RUNTIME_STATE_DIRECTORY` is HAL-owned local state. The transport appends
integrity-linked runtime claims there; a runtime result remains
`unaccepted_runtime_claim` and does not become canonical knowledge.

## Asking a Local Question

From `implementation/hal-core`:

```sh
npm run runtime:ask -- 'What is 2 + 2? Reply with only the number.'
```

The command builds HAL Core, sends the question only through the restricted
transport, validates correlation, and displays the result after HAL records
the non-canonical claim.

## Verified Evidence

On 2026-08-09, the fixed synthetic request returned `HAL_LOCAL_OK`; a normal
local arithmetic question returned `4`. In both cases HAL recorded a
`result_report` with `canonicalStatus: unaccepted_runtime_claim`. The
restricted key rejected an arbitrary `id` command, and no temporary container,
mediator, or socket remained after execution.

## Remaining Limits

- Hermes's full tool-capable CLI loop is not enabled by this transport.
- The runner permits no filesystem, shell, secret, node, network-egress, or
  governed-resource capability.
- Result length is capped at 1,024 characters and requests are bounded.
- A result is not accepted as evidence or canonical knowledge without separate
  HAL-governed processes.
