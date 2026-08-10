# Decision Record 0039 — Loopback Local Web Presence

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-10 |
| Scope | Local Node.js browser interface replacing provisional Electron testing surface |
| Owner Review | Explicit Owner approval |

## Decision

HAL may provide a Node.js web interface bound exclusively to `127.0.0.1` on a
random port. Each launch creates a random session token and opens the local page
in the Owner's browser. The interface exposes only the same bounded question
and conversational-control routes already governed by HAL; it is not a LAN or
internet service, arbitrary terminal, runtime capability, or filesystem path.

## Constraints

- No `0.0.0.0`, IPv6 wildcard, public listener, port configuration, proxy, or
  remote access is permitted.
- Requests require the per-launch token and have fixed body/output bounds.
- HAL, not browser JavaScript, performs all command dispatch and evidence.
- The native macOS app remains a future replaceable Presence implementation.

## Authority

Book I policy/evidence/capability invariants, Book II Capability Gateway and
Presence boundaries, and DR 0038 govern this interface. Higher-order authority
prevails. This record does not authorize external communication, production
hosting, general network access, or a new runtime privilege.
