# Decision Record 0035 — Bounded Desktop Chat UI

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Local desktop presentation of the already approved zero-capability assistant route |
| Owner Review | Explicit Owner approval |

## Decision

HAL may provide a local Electron desktop chat application for the existing
approved local-only assistant scopes. The application is presentation and
bounded-dispatch only: it may select only the four existing fixed scopes and
may invoke only the existing HAL-owned restricted assistant launcher.

## Context

The terminal assistant is usable but not convenient for ordinary local use.
Existing M8 is a separately bounded deterministic M6 interface and is not a
chat client. The Owner approved a distinct desktop chat surface without
expanding sources, runtime authority, or resource access.

## Authoritative Sources

- Book I: Owner authority, bounded delegation, evidence, recovery, and
  non-ambient authority.
- Book II Chapters 2, 10, 12, 15, 25, 29, and 35.
- Book III Chapters 2, 3, 5, 6, and 7.
- DR 0026, DR 0027, DR 0028–0031, DR 0034, and DR 0032.

Higher-order sources prevail over this record.

## Alternatives Considered

1. Keep Terminal-only interaction. Rejected for usability.
2. Extend M8 as a general chat client. Rejected because M8's accepted scope is
   deterministic M6 inquiry and it must not be silently reinterpreted.
3. Add a separate bounded desktop chat surface over the existing launcher.
   Accepted.
4. Add a browser/web UI or direct runtime connection. Rejected: it would create
   new network or trust-boundary behavior.

## Consequences

The UI can make the existing assistant easier to use but cannot expand what it
knows or what it may do. Renderer content remains local, sandboxed, and
without Node/Electron/filesystem/shell APIs. HAL main process validates the
fixed scope and bounded question before spawning the existing launcher with no
shell. Results remain non-canonical, ephemeral UI state.

## Implementation Implications

Enabled:

- a local Electron window, narrow typed preload API, strict IPC sender/payload
  validation, and an allowlisted local protocol;
- four fixed approved knowledge scopes only;
- one bounded question at a time through the existing local-only route;
- temporary on-screen result display with no transcript persistence.

Prohibited:

- new data sources, folder picking, tools, capabilities, direct model/Ollama
  access, external providers, web content, browser use, shell access, secret
  exposure, automatic source selection, or runtime-specific Core coupling.

## Owner Review Assessment

Owner Review was required because the desktop-to-runtime dispatch path is a
security/trust-boundary change. The Owner explicitly approved the narrow scope
above. This record does not authorize production deployment or a broader
capability.

## Continuity Notes

Add boundary and UI-contract tests, validate the packaged local app, update
CURRENT_STATE.md, and retain the existing terminal route as the reference
dispatch path.
