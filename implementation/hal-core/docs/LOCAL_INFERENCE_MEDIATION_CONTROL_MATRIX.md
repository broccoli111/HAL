# Local Inference Mediation — Control Matrix

> **Status:** Design control matrix under DR 0018. It maps existing authority to future conformance evidence; it does not activate a route.

| Control                | Authority                  | Enforcement expectation                                                        | Required evidence                                  |
| ---------------------- | -------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| HAL authority custody  | Book II Ch. 2 §3.1; Ch. 15 | HAL alone issues/revokes binding; runtime request is never permission.         | Admission, denial, revocation records.             |
| Runtime replaceability | Book II Ch. 2 §3.2         | Contract is adapter-neutral; no HAL Core Hermes imports.                       | Static dependency check and replacement test.      |
| Local-only provider    | DR 0013; DR 0016           | Fixed loopback upstream; no DNS/provider fallback/egress.                      | Configuration inspection and negative route tests. |
| Exact model/profile    | DR 0015; DR 0017           | One model and immutable synthetic profile only.                                | Mutation/override denial tests.                    |
| Identity/correlation   | Book III Ch. 5; DR 0017    | Binding matches runtime, agent, task, correlation, purpose, expiry, and nonce. | Mismatch/replay/expiry/revocation tests.           |
| Least privilege        | Book III Ch. 5; DR 0017    | No host resource, device, secret, socket, tool, or general network path.       | Container negative-access matrix.                  |
| Bounded execution      | DR 0016; DR 0017           | Fixed context/tokens/bytes/timeout/concurrency and immediate unload.           | Limit and cancellation tests.                      |
| Evidence custody       | Book II Ch. 2 §3.1; Ch. 15 | HAL retains attributable non-canonical records; output stays a claim.          | Correlated journal/evidence tests.                 |
| Teardown/recovery      | Book II Ch. 2; DR 0017     | Terminal/revoked paths remove route state and reject reuse.                    | Crash, signal, cleanup, and reconstruction tests.  |
| Fail closed            | Book III Ch. 5–6; DR 0017  | Any uncertainty/violation denies upstream contact and restores no-route state. | Fault injection and no-upstream assertions.        |
