# Bounded Desktop Assistant

## Scope

This local Electron UI is authorized by [DR 0035](../../../decisions/0035-owner-authorized-bounded-desktop-chat-ui.md). It is a presentation and dispatch surface for the existing approved terminal assistant—not a new Agent Runtime, capability, source-admission mechanism, or model route.

## Operation

Run `npm run hal:desktop` from `implementation/hal-core`. The app accepts one
bounded question at a time and selects only one of these fixed scopes:

- `canon`;
- `documents`;
- `combined`; or
- `hal-ref-2`.

The Electron main process validates the local renderer origin, scope, and
question bound, then spawns only the existing `hal-assistant.mjs` launcher with
`shell: false`. The renderer has no Node, Electron, filesystem, shell, browser,
or unrestricted IPC access.

## Boundaries

- Content is loaded only from the packaged `hal-desktop://app` protocol.
- Remote navigation, popups, webviews, permission requests, and remote fetch
  are denied.
- The existing launcher retains source validation, pack activation, restricted
  GX10 route, zero capability manifest, local-model-only policy, and result
  custody.
- Results appear only in the open window and are not stored as a desktop
  transcript. Known terminal launch framing is removed for display, while the
  returned answer text is otherwise preserved. Results remain non-canonical
  runtime claims.
- The UI cannot add folders, select arbitrary files, grant capabilities, use
  tools, access secrets, or bypass HAL governance.

## Failure behavior

Malformed sender, scope, or question payloads are rejected before dispatch.
The UI fails closed on unavailable launcher, timeout, oversized output, empty
output, or nonzero launcher result. It does not expose child-process error
details or configuration values to the renderer.
