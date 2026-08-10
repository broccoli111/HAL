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

## Bounded Local Terminal Assistant

For a stateless local question-and-answer session through the same path, run:

```sh
npm run runtime:chat
```

Type a question at `HAL>` and `/exit` to finish. The interface permits at most
20 separate requests per local process and at most 8,192 characters per
question. It stores no transcript and does not pass prior turns to Hermes;
each turn remains a separately bounded, zero-capability request through the
same HAL-owned result/evidence route. End-of-input is treated as a clean local
session termination.

## HAL Canon Terminal Assistant

After activating the Owner-approved `hal_canon_v1` pack in the existing
`HAL_KNOWLEDGE_STATE_DIRECTORY`, run:

````sh
npm run runtime:chat:knowledge

For the separately Owner-approved DR 0029 one-file or DR 0030 direct-folder
local-document pilot, first activate the corresponding pack
(`personal_document_pilot_v1` or `personal_document_folder_pilot_v1`) in the
same state directory and run:

```sh
npm run runtime:chat:personal-doc
````

That path receives only M6-rendered bounded excerpts from the active pack. It
does not give Hermes/Qwen the Desktop source path, a filesystem handle, a tool,
or a resource capability.

```

This has the same 20-turn and 8,192-character limits as `runtime:chat`, but
each independent turn first obtains HAL-owned, source-labeled, non-canonical
context from the active pack. A stale activation hash fails closed; regenerate
the pack and activate its new tuple after an approved source changes. The
runtime never receives a source path, filesystem handle, tool, capability, or
canonical-knowledge write authority.

## Verified Evidence

On 2026-08-09, the fixed synthetic request returned `HAL_LOCAL_OK`; a normal
local arithmetic question returned `4`. In both cases HAL recorded a
`result_report` with `canonicalStatus: unaccepted_runtime_claim`. The
restricted key rejected an arbitrary `id` command, and no temporary container,
mediator, or socket remained after execution.

A separate DR 0026 test-only full Hermes CLI probe also completed its fixed
`HAL_LOCAL_OK` prompt with one streamed local-Qwen3 call and
`text_response(finish_reason=stop)`. Its explicit `platform_toolsets.cli: []`
configuration resulted in no loaded tools. This confirms CLI/provider
compatibility for the same disposable, zero-capability profile only; it is not
part of the restricted user transport and grants no capability.

## Remaining Limits

- Hermes's full tool-capable CLI loop is not enabled by this transport. Only
  the separate zero-tool compatibility probe has been validated.
- The runner permits no filesystem, shell, secret, node, network-egress, or
  governed-resource capability.
- Result length is capped at 1,024 characters and requests are bounded.
- A result is not accepted as evidence or canonical knowledge without separate
  HAL-governed processes.
```
