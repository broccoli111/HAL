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

## Use the Bounded Local Assistant

From `implementation/hal-core`, check local readiness and then start the
explicit scope selector:

```bash
npm run hal:assistant:status
npm run hal:assistant
```

The selector never grants a runtime authority or filesystem access. Choose only
the source scope you intend to query. The currently authorized scopes are HAL
Canon/project documentation, the direct local-document folder, their already
governed dual-scope inquiry, and the exact persistent `hal_ref_2` folder.

If the Owner changes content in the persistent `hal_ref_2` folder, refresh its
HAL-derived immutable pack before using it again:

```bash
npm run hal:owner-folder:refresh
```

This does not authorize a new folder, source class, capability, or canonical
knowledge promotion.

Generated render output, local tool output, bytecode caches, and macOS metadata are ignored and should not be committed.
