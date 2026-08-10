# Decision Record 0038 — Local Conversational Owner-Control Surface

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-10 |
| Scope | Local Electron HAL Control Chat for existing governed operations |
| Owner Review | Explicit Owner approval: “Approved as written” |

## Decision

HAL will provide a local conversational control surface. A typed, allowlisted
intent becomes a HAL proposal; consequential operations require a second,
explicit in-chat `approve <proposal-id>` confirmation. HAL records proposal,
authorization, execution outcome, correlation, and an integrity chain in local
HAL state before or with the operation outcome.

The surface invokes only existing HAL-governed command paths. It is not an
arbitrary terminal, shell, filesystem, model, runtime, secret, or network
control path.

## Initial Scope

Read-only: status, local model recommendation, and evidence matrix.
Consequential (two-step confirmation): fixed official model research and the
existing registered-folder lifecycle commands. Folder registration still
requires an exact absolute path and is a new resource admission, not a broad
filesystem grant.

## Authority and Consequences

Book I Owner authority, policy/evidence, and capability invariants; Book II
Capability Gateway and runtime/resource sovereignty; Book III controlled
change practice; DR 0032, DR 0036, and DR 0037 govern this record. Higher-order
authority prevails. This creates no runtime authority and does not supersede
any existing Owner gate, source restriction, or out-of-scope boundary.

## Revocation

The UI surface can be removed without changing the underlying capability
contracts or evidence. Unsupported chat text fails closed.
