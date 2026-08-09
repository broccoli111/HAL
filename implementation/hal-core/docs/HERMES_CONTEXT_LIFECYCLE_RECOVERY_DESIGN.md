# Hermes Reference Runtime v1 — Context, Lifecycle, and Recovery Design

> **Status:** Non-activating design requirement. No context source, state store, checkpoint format, or runtime process is selected.

## Context and Runtime Memory

HAL supplies only task-bounded, policy-permitted, classified context. Each supplied item requires a purpose, minimization rule, correlation, and retention/deletion treatment. The adapter must not expose undisclosed HAL records, ambient filesystem data, credentials, secrets, or resource handles.

Hermes operational memory, summaries, checkpoints, skills, and caches are runtime-local, non-canonical, and disposable. A runtime replacement or loss of local state never changes HAL canonical knowledge, evidence, policy, identity, or authority. HAL may reconstruct fresh bounded context only from currently authorized HAL-owned records.

## Lifecycle Ownership

HAL owns admission, placement, task binding, checkpoint classification, cancellation, destruction, quarantine, replacement, and recovery disposition. The adapter reports operational conditions; it cannot self-admit, self-restart protected work, clear quarantine, or convert a checkpoint into HAL truth.

| Condition                               | Required HAL disposition                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Normal terminal report                  | Record as non-canonical claim; continue only through transaction/evidence verification            |
| Runtime failure, disconnect, or timeout | Preserve evidence; contain and mark execution ambiguous/failed as applicable; no unverified retry |
| Cancellation                            | HAL sends bounded cancellation; retains task and evidence custody until a governed disposition    |
| Destruction                             | Revoke admitted execution and runtime-local context; preserve required HAL records                |
| Suspected compromise                    | Quarantine; no protected work until identity, integrity, and recovery checks pass                 |
| Replacement                             | Re-admit a conformant runtime with fresh bounded context and current authority                    |

## Recovery Requirements

Recovery restores HAL Constitution, Owner identity, policy, evidence, transactions, and canonical knowledge before any runtime is reconstructed or replaced. A runtime checkpoint may support operational diagnostics but is never a source of constitutional or canonical truth. Ambiguous provider/runtime outcomes require HAL verification before retry, completion, compensation, or Owner escalation.

## Required Tests Before Activation

- context minimization, classification, retention, deletion, and negative disclosure;
- runtime-memory loss and fresh context reconstruction;
- cancellation, destruction, crash, disconnect, timeout, quarantine, replacement, and recovery;
- preserved evidence and absence of unverified retry/completion; and
- proof that no runtime-local checkpoint or memory changes HAL canonical state by itself.

## Deferred Decisions

Context schema, classification implementation, runtime state location, checkpoint format, retention intervals, encryption/key custody, process supervision technology, timeout values, and recovery UI remain subject to later scoped proposals and approvals.
