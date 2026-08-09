# M0 — Controlled Baseline

**Status:** Ready to execute  
**Parent plan:** [HAL v0.1 Foundation Plan](HAL_V0_1_FOUNDATION_PLAN.md)  
**Purpose:** Establish the controlled, reproducible, and safe implementation boundary required before HAL core code is admitted.

## 1. Outcome

M0 is complete when the HAL v0.1 implementation has one declared repository boundary, one controlled source baseline, one non-live-effect development environment, and an evidence-backed exit decision. M0 does not implement HAL behavior; it makes that implementation trustworthy and reviewable.

## 2. Scope

### Included

- Create the implementation project structure and declare its repository root.
- Record the exact governing-canon baseline used for v0.1.
- Declare development, test, simulation, and future live-effect environments.
- Define permitted test data, prohibited effects, secrets handling, and artifact retention.
- Establish a minimal test, formatting, dependency, and evidence-capture workflow.
- Record the M1 entry criteria and the M0 exit decision.

### Excluded

- Production deployment or any live-effect action.
- External accounts, providers, Treaties, credentials, purchases, messages, devices, or integrations.
- Real personal data unless separately authorized and classified.
- Any change to the ten operating books.

## 3. Source and control manifest

| Control | Required M0 record |
| --- | --- |
| Governing canon | Pin Book I through Book X to the reviewed controlled editions in `_Final/Markdown`; record file hashes and review date. |
| Implementation repository | Declare one repository root, default branch, protected-branch rule, and change-review rule. |
| Working baseline | Record the initial commit ID, dependency lockfiles, supported runtime versions, build command, test command, and formatting command. |
| Terminology | Reference Book X for all names introduced by code, schemas, tests, and documentation. |
| Traceability | Every M1 work item must identify its Book II/IV basis, Book IX contract impact, and Book III/VI/VIII evidence obligations. |

## 4. Environment register

| Environment | Permitted | Prohibited | Admission evidence |
| --- | --- | --- | --- |
| Development | Local code, synthetic fixtures, local files in the controlled workspace, deterministic tests | Live effects, external credentials, personal data, outbound side effects | Environment record; local configuration validation |
| Test | Repeatable automated tests, synthetic data, fault injection, isolated temporary storage | Dependence on undeclared external state; untracked secrets; irreversible effects | Passing test run and captured report |
| Simulation / shadow | Declared test corpus, no-effect capability simulation, evidence capture | External actions or unapproved data transfer | Approved verification plan and simulated-run evidence |
| Controlled reality | Not admitted by M0 | Any use until separately authorized after M5 evidence | Future Owner decision and assurance result |

## 5. Security, privacy, and data baseline

1. Use synthetic data by default. Any exception requires classified, purpose-bound, minimum-necessary data and a Book VI-aligned approval record.
2. Keep secrets outside source control. `.env` files, credentials, tokens, private keys, and production configuration are prohibited from commits and test fixtures.
3. Treat logs, test reports, screenshots, and generated artifacts as evidence-bearing outputs: classify them, avoid sensitive payloads, and retain them only as long as needed for the declared purpose.
4. Outbound network actions are disabled or mocked by default. Every approved integration later requires an explicit capability contract and authority boundary.
5. Development failure must preserve diagnostic evidence without revealing secrets or sensitive test data.

## 6. Required repository controls

- A readable project README with local setup, test, and safety boundaries.
- A machine-readable dependency lockfile for every package ecosystem used.
- Automated formatting, linting/static analysis, and test commands that run locally and in continuous integration.
- A test-results artifact and a change record for each merged change.
- Secret scanning and dependency-vulnerability scanning before merge.
- A rule that generated state, local databases, secrets, and temporary artifacts are ignored or isolated from source control.
- A clear convention for semantic versioning of code, schemas, and contracts.

## 7. M1 implementation charter

M1 may create only the following initial capabilities:

| Capability | Required behavior | Must not do |
| --- | --- | --- |
| Startup admission | Load controlled configuration, validate essential integrity, expose status | Start in an unrestricted mode if essential state is missing or uncertain |
| Safe Mode | Allow bounded inspection and recovery status | Perform protected mutation or silently degrade safeguards |
| Identity stub | Represent one immutable Owner identity and an authenticated development session | Infer Owner authority from a username, machine, secret, or UI session alone |
| Authority/policy decision | Accept an exact proposed action and return allow, deny, or approval-required with reason/evidence | Treat a model output, credential possession, or transport success as permission |
| Audit foundation | Append immutable, correlated decision/audit records | Store sensitive payloads indiscriminately or allow records to be rewritten |

## 8. M0 evidence checklist

- [ ] Source manifest: canon version paths, file hashes, review date, and implementation repository baseline.
- [ ] Environment register: development/test/simulation boundaries and prohibited effects.
- [ ] Data and secrets policy: synthetic-data default, secret handling, logging rules, and network-default posture.
- [ ] Repository controls: README, ignore rules, lockfiles, formatting, static analysis, tests, scans, and CI plan.
- [ ] M1 traceability register: initial work items mapped to Books I–X where applicable.
- [ ] M0 review record: independent confirmation that no live-effect capability has been admitted.
- [ ] Exit decision: recorded authorization to begin M1 implementation work.

## 9. Exit gate

M0 exits only when every checklist item is evidenced and the following statement is true:

> The v0.1 implementation environment is reproducible, non-live-effect, source-controlled, and bounded. Beginning M1 will not grant HAL authority, autonomy, external reach, or access beyond the explicitly declared development scope.

The exit decision authorizes development of M1 only. It does not authorize an external provider, real-world action, data expansion, or a change in Reality Boundary.

