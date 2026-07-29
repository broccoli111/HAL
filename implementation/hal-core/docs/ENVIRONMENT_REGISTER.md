# Environment Register

## Scope

This register defines admitted execution boundaries for HAL v0.1 implementation work.

## Status by environment

| Environment         | Status                           | Permitted                                                                                   | Prohibited                                                                        |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Development         | Admitted                         | Local code execution, synthetic fixtures, deterministic local files in controlled workspace | Live effects, external accounts, external credentials, outbound side effects      |
| Test                | Admitted                         | Automated deterministic tests, synthetic data, isolated in-memory/file test state           | Dependence on undeclared external state, real personal data, irreversible actions |
| Simulation / Shadow | Not admitted for execution in M0 | Design and documentation only                                                               | Any execution that crosses local controlled boundary                              |
| Controlled Reality  | Not admitted                     | None during M0/M1 skeleton                                                                  | Any use prior to explicit post-M5 authorization                                   |

## Baseline restrictions

- Synthetic data only.
- Outbound network and external credentials are prohibited by default.
- Real authentication, provider integrations, and external effects are out of scope.
- If uncertainty exists, behavior must fail closed and remain restrictive.
- Continuous integration may fetch declared, lockfile-pinned dependencies during its isolated build; HAL runtime code and tests do not make outbound calls.
