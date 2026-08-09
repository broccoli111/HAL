# HAL

HAL is a sovereign, local-first personal AI operating system governed by its Canon. Repository-wide working instructions are in [agents.md](agents.md); current project status is in [CURRENT_STATE.md](CURRENT_STATE.md).

## Working Location

The active working tree is this repository root:

`/Users/rosslauda/Documents/HAL`

Use this Git repository and its `main` branch. Do not treat prior chat history or another local folder as a project dependency.

## Consolidated Layout

- `Documents/` is the physical source/publication workspace for the Canon and Canon program.
- `docs/` contains repository-relative compatibility links to the corresponding canonical material under `Documents/`; existing implementation paths remain valid without maintaining duplicate working copies.
- `implementation/hal-core/` contains the imported TypeScript implementation baseline.
- `decisions/` contains repository-wide Decision Records subordinate to the Canon.
- `tests/agent_runtime_contract/` contains test-only Agent Runtime Contract conformance artifacts.

The initial zero-capability local assistant command and its containment limits
are documented in [GX10 restricted runtime transport](implementation/hal-core/docs/GX10_RESTRICTED_HERMES_RUNTIME_TRANSPORT.md).

Generated render output, local tool output, bytecode caches, and macOS metadata are ignored and should not be committed.
