# HAL Current State

> **Status document only.** This file records project and implementation status for continuity. It is not architectural, constitutional, or policy authority. The HAL Canon—especially Book I, then Books II through IV and Book X—remains authoritative under the hierarchy in [agents.md](agents.md).

## How to Resume

A new engineering session MUST read [agents.md](agents.md), this document, the relevant authoritative Canon material, and applicable accepted Decision Records before consequential work. Do not treat this status record or prior chat history as authority.

## Active Working Location

The active workspace is the Git repository rooted at `/Users/rosslauda/Documents/HAL`, on `main` tracking `origin/main`. The Canon’s physical source/publication workspace is `Documents/`; `docs/` provides repository-relative compatibility links for existing implementation paths and is not a second working copy.

## Current Phase

**Bounded Local Assistant — Hermes v1 Reference Runtime**

## Current Objective

Maintain and improve the usable, bounded local-only assistant over the
Owner-approved HAL Canon and `HAL_doc_ref` knowledge scopes while preserving
the HAL Agent Runtime Contract, zero-capability runtime posture, provenance,
and governance boundaries.

## Completed

- Book I constitutional foundation established.
- Book II architecture established.
- Runtime-sovereignty Book II refactor completed in the Book II Markdown working edition.
- Agent Runtime Contract defined architecturally.
- Capability Gateway defined architecturally.
- Runtime memory sovereignty established.
- Runtime replaceability established.
- Hermes selected as **Reference Agent Runtime v1**.
- Repository-root [agents.md](agents.md) established.
- Repository continuity status and Decision Record mechanism established.
- Test-only Agent Runtime Contract conformance suite defined in [tests/agent_runtime_contract/CONFORMANCE_SUITE.md](tests/agent_runtime_contract/CONFORMANCE_SUITE.md).
- Deterministic TestRuntimeAdapter/fake runtime and in-memory governance/Gateway fixtures implemented for the suite.
- Test-only conformance cases ARTC-001 through ARTC-014 passed; see [test evidence](tests/agent_runtime_contract/TEST_EVIDENCE.md).
- Local Canon baseline committed and merged with the existing GitHub `main` implementation history without conflicts.
- Existing TypeScript implementation through M9 controlled local knowledge packs is now present under `implementation/hal-core`; its conformance to the runtime-sovereignty clarification has not yet been assessed.
- Workspace reconciled into the repository root: verified duplicate `docs/` trees now link to their single physical `Documents/` sources, and generated render/cache output was removed.
- Owner has authorized a time-bounded exception to the independent-review control for the narrow runtime-sovereignty clarification; see [Engineering Exception 0010](decisions/0010-owner-authorized-independent-review-control-exception.md). The formal reviewer artifact is still absent, and no independent recertification claim is made.
- A local TypeScript semantic projection of the Agent Runtime Contract is implemented in `implementation/hal-core/src/runtime/`, with `TestRuntimeAdapter` and an inert `HermesAdapter` seam.
- `RuntimeHost` now owns local runtime lifecycle sequencing, bounded context and capability-manifest delivery, callback custody, and agent/task/correlation linkage checks.
- `LocalSyntheticCapabilityGateway` reuses the existing restrictive M3 local policy to permit only the already-admitted synthetic corpus-inspection capability; unknown requests, including `hal.files.read`, are denied.
- The local adapter boundary has no Hermes package/process dependency and no filesystem, shell, network, secret, node, or governed-resource handle.
- Adapter-boundary tests now cover lifecycle, permit/deny, report submission, failure reporting, runtime replacement, and runtime-memory loss/reconstruction.
- Static anti-coupling tests verify HAL Core has no Hermes-specific reference outside the runtime adapter boundary and that the boundary imports no Hermes implementation.
- Owner Decision DR 0002 authorizes a narrow, synthetic-only durable operational record for runtime claims and Gateway dispositions. Those records are integrity-chained and explicitly non-canonical.
- Owner Decision DR 0004 supersedes DR 0003 and pins the Hermes evaluation candidate to the latest official release resolved on 2026-08-09: `v2026.8.3`, commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`, for read-only source preflight only.
- The current v2026.8.3 source preflight records broad runtime capability surfaces and containment requirements; see [preflight findings](implementation/hal-core/docs/HERMES_SOURCE_PREFLIGHT_v2026.8.3.md). No Hermes artifact is installed or executed.
- `npm run check` passed for the existing TypeScript core and adapter-boundary addition: 22 test files and 162 tests.
- Owner selected **GX10-1** as the separately provisioned target host for a future containerized Hermes evaluation. This records placement only; no remote access, installation, container creation, or Hermes execution has occurred.
- GX10-1 host identity was Owner-verified and trusted for SSH on 2026-08-09. The host rejected the available SSH credentials, so no remote preflight command, installation, container creation, or Hermes execution occurred.
- A dedicated local `HAL-to-GX10-1` SSH key pair was created on 2026-08-09 and its public half was authorized for the `broccoli_01` account on GX10-1.
- The authorized read-only preflight reached GX10-1: it runs Ubuntu 24.04.4 LTS, kernel `6.17.0-1026-nvidia`, and Docker 29.2.1 with baseline AppArmor, seccomp, and cgroup-namespace security options. No host or container state was changed.
- The supplied `broccoli_01` account belongs to both `sudo` and `docker` groups, and one existing Docker container is present. Administrator authentication is required to inspect the Docker daemon configuration and firewall state. This account must not be treated as the eventual least-privilege evaluation identity without an Owner security-boundary decision.
- Owner approved Option 1 for GX10-1: establish a dedicated non-sudo evaluation identity and rootless Docker runtime. The required Ubuntu packages were installed without a Docker upgrade; no container was created.
- A distinct local SSH key pair was created and authorized for the non-privileged GX10-1 evaluation identity.
- The Owner-approved `hal_eval` account and its account-local rootless Docker 29.2.1 service are now provisioned on GX10-1. The runtime has zero images, zero containers, and zero published ports; no Hermes artifact was acquired or executed. The pre-container record is [HERMES_GX10_1_ROOTLESS_RUNTIME_PROVISIONING.md](implementation/hal-core/docs/HERMES_GX10_1_ROOTLESS_RUNTIME_PROVISIONING.md).
- GX10-1 pre-container capacity evidence records 20 logical CPUs, 121 GiB memory, and 824 GiB free in the evaluation account’s home filesystem; no GPU/device access is enabled for the evaluation identity.
- Owner approved the initial GX10-1 disposable evaluation cap profile: 4 CPUs, 16 GiB memory, 256 processes, 30 GiB writable storage, 100 MiB logs, 15-minute maximum runtime, no GPU, and no network. This is not authorization to acquire an image, create a container, or execute Hermes.
- Owner authorized one bounded source-only acquisition of the DR 0004-pinned Hermes Git tag on the GX10-1 `hal_eval` identity: no checkout, build, dependency installation, image pull, container, or execution.
- The bounded source-only acquisition completed and resolved to the DR 0004-pinned commit. Its 404 KiB Git object store passed `git fsck`; the worktree has zero materialized source entries, and rootless Docker still has zero images and zero containers. Evidence: [HERMES_GX10_1_SOURCE_ACQUISITION.md](implementation/hal-core/docs/HERMES_GX10_1_SOURCE_ACQUISITION.md).
- Owner approved the bounded GX10-1 synthetic runtime test phase, beginning with a digest-pinned Linux/ARM64 Python 3.13 slim base-image acquisition and containment probes only; see [DR 0007](decisions/0007-gx10-1-synthetic-runtime-test-phase.md).
- DR 0007 Phase 1 passed: the digest-pinned base image ran a synthetic rootless probe with no network route, no host mounts, read-only root, dropped capabilities, no devices, and the approved CPU/memory/process/log limits. The probe container was destroyed and no Hermes code ran. Evidence: [HERMES_GX10_1_CONTAINMENT_PROBE.md](implementation/hal-core/docs/HERMES_GX10_1_CONTAINMENT_PROBE.md).
- DR 0007 Phase 2 passed: the DR 0004-pinned source was copied into a network-disabled static-validation image and all 1,106 Python files compiled in memory under the hardened profile. No Hermes import or runtime process occurred; the disposable validation container was destroyed. Evidence: [HERMES_GX10_1_STATIC_VALIDATION.md](implementation/hal-core/docs/HERMES_GX10_1_STATIC_VALIDATION.md).
- DR 0007 Phase 3 dependency image was built from the frozen lockfile, but the non-root `hermes --help` smoke command was denied by the image filesystem before process execution. The container was destroyed; no Hermes process, network action, or HAL interaction occurred. Diagnose the image-path permission boundary without relaxing the non-root runtime identity.
- DR 0007 Phase 3 remediation passed: rebuilding against the approved system Python 3.13 allowed non-root `hermes --help` under the hardened profile. A safe-mode no-provider synthetic task then failed as expected before inference, reporting no configured provider; no network, credentials, tool action, HAL connection, or governed-resource action occurred. Each disposable container was destroyed.
- Post-containment local validation passed on 2026-08-09: the repository Agent Runtime Contract suite passed 14/14 tests, and `implementation/hal-core` formatting, lint, typecheck, and Vitest gate passed 22/22 files and 162/162 tests.
- Owner-approved DR 0008 test-only line-driver seam is implemented wholly at the Hermes adapter edge. It accepts injected transport replies only as correlated progress/result/failure claims and retains HAL callback custody; its focused TypeScript adapter test passes 7/7 cases.
- The DR 0008 GX10-side synthetic line-driver command was syntax-checked, placed only under `hal_eval`'s isolated acquisition path, and probed over the approved SSH channel. A zero-capability execute-task frame returned exactly correlated progress/result claims; it did not invoke Hermes, a model, a tool, a capability, or a HAL resource.
- The DR 0008 external SSH harness was implemented outside HAL Core and passed against GX10-1 using the dedicated non-privileged key. It validated only correlated progress/result frames from the synthetic driver.
- The line-driver boundary rejects malformed, capability-like, and mislinked remote frames before callback delivery. HAL-side claim custody remains covered by the existing `RuntimeSubmissionRecorder`/`RuntimeJournal` adapter-boundary test.
- Owner-approved DR 0009 synthetic streaming cancellation passed over the isolated GX10-1 SSH stdio session with a 15-minute harness deadline: a bounded cancel frame produced a correlated failure claim and no capability, model, credential, tool, HAL resource, or inbound listener was used.
- The line-driver integration path has a passing HAL-side journal-custody test: correlated progress/result frames are integrity-chained as `unaccepted_runtime_claim` records and cannot become canonical knowledge by transport success alone.
- Test-only line-driver hardening rejects remote claims returned on checkpoint, cancel, or destroy control operations, and rejects post-terminal claims after closing HAL task linkage; focused boundary checks passed 15/15.
- `RuntimeHost` now rejects checkpoint, cancel, and destroy calls for agents not admitted through that HAL-owned host; the expanded focused boundary checks passed 16/16.
- `RuntimeHost` now gives every adapter HAL-owned callback custody: mismatched runtime, agent, task, or correlation claims are rejected before callback handling across capability, evidence, progress, result, failure, and subagent operations; the expanded focused boundary checks passed 18/18.
- The repository-root `scripts/run_runtime_boundary_checks.sh` runner makes the complete test-only Contract, HAL Core, and diff-integrity gate reproducible without invoking Hermes or any external resource.
- Owner Decision DR 0011 authorizes production-integration design and conformance planning only. It does not authorize a real Hermes driver, installation, execution, transport, provider, credential, capability, or governed resource.
- Owner Decision DR 0012 is accepted for sequential Phases A–C. Phase A is active; Phase B remains blocked until Phase A evidence is complete and an adapter-private transport proposal is explicitly selected.
- DR 0012 Phase A conformance evidence is complete. Phase B ran one isolated safe-mode, zero-capability, no-provider synthetic Hermes task: it failed before inference as expected because no provider/API key existed, and cleanup verified zero containers and no default Hermes state. Evidence: [GX10-1 Phase B record](implementation/hal-core/docs/HERMES_GX10_1_PHASE_B_SAFE_MODE_EVALUATION.md).
- Owner Decision DR 0013 establishes a local-only model-provider policy: external inference providers and egress are prohibited. HAL may choose only from an Owner-approved local model catalog and may not autonomously acquire or expose models. A synthetic local-model-only pilot is approved subject to its recorded preconditions.
- Owner Decision DR 0014 selects Ollama as the initial GX10-1 local model runtime.
- Owner Decision DR 0015 selects `qwen3:8b` as the first local catalog candidate, limited to a synthetic text-only Ollama pilot with one-time provenance-recorded acquisition and no external inference.
- The Qwen3 8B local model-only pilot passed on GX10-1: Ollama 0.32.6 is loopback-only with cloud disabled; artifact `500a1f067a9f` returned the synthetic expected text, loaded 100% on the GB10, and was unloaded. Evidence: [local model pilot](implementation/hal-core/docs/GX10_1_OLLAMA_QWEN3_8B_LOCAL_MODEL_PILOT.md).
- A 120-page provisional Book II working edition was generated and visually checked in Markdown, DOCX, and PDF form under Engineering Exception 0010. It is explicitly non-recertified, does not replace the July 27 certified baseline, and is recorded in the [Book II Project Register](Documents/Book%20II/markdown/HAL_Book_II_Project_Register_v0.6.md).
- DR 0017 host-side proxy prototype checks passed on GX10-1 under `hal_eval`: the sole synthetic Qwen3 request returned a 663-byte bounded response, a non-allow-listed request was denied locally, signal-aware teardown removed the Unix socket, and Ollama was left with no loaded model. No Hermes process, container, container mount, runtime route, network listener, capability, or governed resource was used. Evidence: [GX10-1 proxy synthetic test](implementation/hal-core/docs/GX10_1_LOCAL_OLLAMA_PROXY_SYNTHETIC_TEST.md).
- Owner accepted DR 0018: HAL-owned local-inference mediation must bind runtime, agent, task, correlation, profile, lifetime, and limits before any runtime request can reach the local model. The adapter-neutral contract, control matrix, and staged verification plan are recorded under `implementation/hal-core/docs/`; no route or activation is authorized.
- DR 0018 pure-contract and in-memory fake-upstream conformance passed locally: nine deterministic tests cover HAL-issued one-use bindings, pre-execution mismatch/profile denial, expiry/replay, cancellation/revocation, fixed-profile forwarding, upstream/oversize failure containment, and non-canonical result-claim custody. It opens no socket or network and invokes no model, container, or runtime process. Evidence: [Agent Runtime Contract Test Evidence](tests/agent_runtime_contract/TEST_EVIDENCE.md).
- The GX10-1 rootless-network read-only assessment is recorded: Docker has its default `bridge`, `host`, and `none` definitions and the host has several loopback listeners, so neither default networking nor host reachability is admissible. The only current runtime posture remains `--network none`. Evidence: [rootless network assessment](implementation/hal-core/docs/GX10_1_ROOTLESS_NETWORK_READONLY_ASSESSMENT.md).
- The DR 0017/DR 0018 containment test design defines exact negative probes, fixed no-network entry/exit posture, teardown, and a separate Owner-gated positive test. Evidence: [containment test design](implementation/hal-core/docs/LOCAL_INFERENCE_MEDIATION_CONTAINMENT_TEST_DESIGN.md).
- Owner approved DR 0019 for CT-001 through CT-007 only: a disposable negative containment simulation. Hermes, all model requests/CT-008, real data, capabilities, host networking, and production use remain excluded.
- DR 0019 CT-001 through CT-007 passed on GX10-1. The disposable rootless namespace denied DNS/LAN/host-loopback paths and had no host sockets/devices/secrets; missing and invalid bindings were denied by the no-upstream mediator; teardown removed the socket and prevented reuse. Final verification found no mediator process/socket, containers, or loaded Ollama model. Evidence: [negative containment test](implementation/hal-core/docs/GX10_1_LOCAL_INFERENCE_CONTAINMENT_NEGATIVE_TEST.md).
- Owner approved DR 0020 for CT-008 only: one disposable synthetic `qwen3:8b` request through a one-use HAL-issued test binding. Hermes, real data, capabilities, external providers, host networking, and production use remain excluded.
- DR 0020 CT-008 passed once on GX10-1: the exact one-use binding was accepted; the fixed synthetic request returned a 663-byte bounded response; only minimized non-canonical events were retained; and final verification found no mediator process/socket, containers, or loaded Ollama model. Hermes, raw Ollama access, and all other paths remained absent. Evidence: [CT-008 positive test](implementation/hal-core/docs/GX10_1_LOCAL_INFERENCE_MEDIATION_POSITIVE_TEST.md).
- Owner approved initiation of the targeted independent Book II runtime-sovereignty review under DR 0021. The review packet is ready; the independent reviewer’s completed disposition/attestation is still required and the Book II working edition remains unrecertified until then.
- Owner directed continuation without waiting for the independent-review artifact under DR 0022. This relies only on the existing time-bounded Engineering Exception 0010 through 2026-08-16; it permits provisional/test-only work only and does not issue recertification or authorize production/Hermes integration.
- CT-008 mediator validation was hardened with three deterministic local tests: only the exact one-use binding/request shape is admitted, and mutation, malformed input, replay, expiry, and invalid lifetimes are denied before upstream contact. The full local runner now has 32 Python checks and 167 TypeScript tests. The 60-second expiry addition was not exercised through a second GX10 inference request. Evidence: [Agent Runtime Contract Test Evidence](tests/agent_runtime_contract/TEST_EVIDENCE.md).
- Owner accepted DR 0023, establishing a risk-scaled Book III Solo-Owner Assurance Profile for routine, reversible, non-production work when no independent reviewer exists. The Book III Chapter 8 Markdown source and combined Markdown edition are now an Owner-authorized working amendment pending recertification; the prior formatted Book III editions remain the certified baseline. The reusable [Solo-Owner Assurance template](Documents/Book%20III/templates/SOLO_OWNER_ASSURANCE_TEMPLATE.md) records required evidence and the high-risk threshold.
- Test-only mediation script boundaries are now statically enforced: networkless/read-only/capability-dropped/Hermes-free harnesses; no upstream/model path in the negative mediator; and fixed loopback/model/expiry limits in the positive mediator. Evidence: [Agent Runtime Contract Test Evidence](tests/agent_runtime_contract/TEST_EVIDENCE.md).
- Engineering Exception 0024 clears the Book III Solo-Owner Assurance amendment's certification-control gate for exact revision `add12ce` through 2026-08-16. The disposition is Owner-authorized exception-based technical certification, not independent certification; it does not alter the existing formatted Book III baseline or authorize any other high-risk or production work. See [Exception 0024](decisions/0024-owner-authorized-book-iii-certification-control-exception.md) and the [certification packet](Documents/Book%20III/deliverables/HAL_BOOK_III_SOLO_OWNER_ASSURANCE_CERTIFICATION_PACKET.md).
- The controlled Book III formatted-edition release artifacts were regenerated, and the DOCX was rendered to 26 pages with visual checks of the cover and representative chapter content. The release generator is now guarded against overwriting reviewed source chapters and review records. The amendment remains explicitly a working edition under Exception 0024; it is not independently certified and does not replace Book II controls.
- The advisory Book III technical review at revision `b782068` found a metadata nonconformance. Its required Markdown/generator/verifier remediation is now implemented and recorded; qualified independent attestation remains open. See [technical review record](Documents/Book%20III/reviews/BOOK_III_SOLO_OWNER_ASSURANCE_TECHNICAL_REVIEW_2026-08-09.md).
- The independent-review handoff is prepared for committed remediation revision `a277311`, with all technical evidence and reviewer-attestation fields. It remains explicitly uncertified pending qualified independent review. See [independent review handoff](Documents/Book%20III/deliverables/HAL_BOOK_III_SOLO_OWNER_ASSURANCE_INDEPENDENT_REVIEW_HANDOFF.md).
- A follow-up independent AI technical review of revision `a277311b704f38138461e376f6a7268fda7d9ed4` found a P1 combined-Markdown chapter-metadata inconsistency. The correction and a nine-chapter status assertion passed local validation; independent re-review remains required and no certification claim is made.
- The follow-up AI technical re-review of correction revision `add12ce` passed with no unresolved technical nonconformance. It remains advisory only; the distinct, time-bounded Owner Exception 0024 supplies the limited exception-based certification-control disposition.
- The Owner technical review of correction revision `add12ce` passed and is retained as additional durable evidence. It explicitly remains an Owner review rather than independent review or certification; the high-risk certification gate remains open. See [Owner review](Documents/Book%20III/reviews/BOOK_III_SOLO_OWNER_ASSURANCE_OWNER_REVIEW_2026-08-09.md).
- An independent AI technical review of the narrow Book II runtime-sovereignty clarification and synthetic test-only evidence completed with Pass with limitations at revision `083c2c8b9de91370a6b8ce61290d29a4755c1234`. All required technical checks passed; the disposition does not certify Hermes, production integration, real mediation, governed-resource access, or deployment, and it does not claim human or professional reviewer qualification. See [review disposition](tests/agent_runtime_contract/BOOK_II_RUNTIME_SOVEREIGNTY_REVIEW_2026-08-09.md).
- DR 0026 authorized a bounded real Hermes local-only pilot. The HAL-owned mediator permits only an exact, expiring binding, fixed local `qwen3:8b` profile, bounded text requests, and a four-request turn budget; its deterministic admission tests pass. Its relay and mediator now read exact length-bounded HTTP requests rather than arbitrary partial byte reads. Hermes’s built-in stateless inference component returned the fixed `HAL_LOCAL_OK` result through that route from a network-none/read-only container. The HAL adapter edge has a zero-capability stateless driver that reports results only through HAL callback custody. The full Hermes CLI agent-loop compatibility remains unresolved; no result was accepted as HAL knowledge and all temporary pilot containers/processes were removed.
- Owner accepted DR 0027 Option 1. A separate runtime-only SSH key now has OpenSSH `restrict` plus a forced GX10 command; it cannot open a shell, execute arbitrary commands, copy files, or forward ports. The complete local assistant slice passed: restricted transport invoked the isolated Hermes stateless runner, HAL `RuntimeHost` received the result, and `RuntimeJournal` recorded integrity-linked non-canonical result claims. The fixed synthetic prompt returned `HAL_LOCAL_OK`; a normal local arithmetic question returned `4`. See [transport operation record](implementation/hal-core/docs/GX10_RESTRICTED_HERMES_RUNTIME_TRANSPORT.md).
- The deterministic test-only full-Hermes CLI probe passed on GX10-1 with the fixed `HAL_LOCAL_OK` prompt. Hermes completed one OpenAI-compatible streaming local-Qwen3 call with `Tools: 0`, no loaded tools, and a `text_response(finish_reason=stop)`. The mediator enforced the fixed profile and binding; the container remained network-none, read-only, capability-dropped, and disposable. Temporary probe artifacts were removed. This validates the full CLI loop only for the bounded zero-capability text-only profile; it does not authorize tools, resources, canonical knowledge, or production use.
- Owner-authorized Option 1 read-only local knowledge pilot passed. HAL activated only the approved synthetic `pack_alpha` knowledge pack in HAL-owned state, completed its evidence-backed M6 inquiry, and supplied its bounded rendered context to the restricted zero-capability GX10 Hermes/Qwen route. The answer to the approved-pack question was returned without giving Hermes a corpus path, filesystem handle, capability manifest entry, or canonical-knowledge write authority.
- Owner-authorized Option 4 initial shell pilot passed on the HAL repository workspace only. The HAL-owned allowlist permits exactly `pwd`, `git status --short`, and `git log --oneline -n 20`; arbitrary commands such as `id` are denied. It uses argument-array execution with no shell parsing, writes, package actions, network, or arbitrary executable path.
- The first fixed-composition read-only repository-status assistant passed end to end. HAL executed only the allow-listed `git status --short` probe, passed its bounded structured result as context to the restricted zero-capability GX10 Hermes/Qwen route, and the runtime correctly reported the clean status. Three deterministic HAL-local tests now cover its fixed success path, malformed/arbitrary/shell-like command denial, and static no-direct-Git/no-shell composition boundary; the full runtime-boundary runner includes them. This is pre-dispatch HAL mediation, not a runtime shell capability or a general command interface.
- The matching fixed-composition repository-history assistant passed through the same restricted route. HAL executed only `git log --oneline -n 20` and supplied its bounded structured result as context; the runtime summarized the recent bounded history without a command handle, tool, capability, or canonical-knowledge write authority. The deterministic read-only boundary suite covers both status and history compositions.
- A bounded stateless terminal assistant is available through `npm run runtime:chat` with the existing DR 0027 GX10 environment variables. It limits a process to 20 independent questions of at most 8,192 characters, persists no transcript, delegates each turn only to the existing zero-capability `runtime:ask` transport, and cleanly handles normal terminal EOF. A live local arithmetic smoke test returned `4` and ended cleanly.
- DR 0028 HAL Canon documentation pilot passed. `hal_canon_v1` is generated only from an exact code-enforced allowlist of named Canon editions, root continuity documents, and enumerated Decision Records; every source path, hash, and byte size is manifest-recorded and revalidated. M9/M6 activation produces non-canonical, source-labeled context only, and the restricted GX10 runtime receives bounded rendered text without a source path, filesystem handle, capability, tool, secret, network egress, or canonical-knowledge write authority. The full Core gate passed 22 test files / 174 tests, including rejection of a source-record hash tamper even after its derived manifest is rehashed; a live bounded runtime-authority query returned a source-labeled answer.
- A bounded HAL Canon terminal assistant is available through `npm run runtime:chat:knowledge` after activation of the current `hal_canon_v1` tuple in `HAL_KNOWLEDGE_STATE_DIRECTORY`. It is stateless per turn, has the same 20-turn/8,192-character bounds as the general local assistant, and passed a one-turn GX10 smoke test with clean EOF termination.
- DR 0029 extends the bounded local-knowledge path to one exact Owner-approved Desktop text file only: `/Users/rosslauda/Desktop/HAL_doc_ref/HAL_reference.txt`. HAL generated a separate immutable `personal_document_pilot_v1` pack beside the source, recorded its source label/hash/byte size, activated it in temporary HAL state, and retrieved bounded non-canonical excerpts. The existing zero-capability GX10 route answered the approved favorite-color test from the supplied excerpt. The runtime received no source path, filesystem handle, tool, capability, secret, or canonical-knowledge write authority. Use `npm run runtime:chat:personal-doc` only after explicit activation of this exact pack.
- DR 0030 authorizes the next bounded step: direct regular `.txt`/`.md` files only in `/Users/rosslauda/Desktop/HAL_doc_ref`, never subdirectories. `personal_document_folder_pilot_v1` records every file’s label/hash/byte size and fails closed on source additions, removals, renames, or content drift. The source cap is 32 files, 8 KiB per file, and 128 KiB total. It remains non-canonical and zero-capability; no general filesystem or runtime access is authorized.
- A simple Owner-facing interactive launch path is available through `npm run hal:chat`. It loads only an ignored local non-secret configuration file, validates/activates the exact DR 0030 folder pack, and starts the existing bounded, zero-capability HAL → restricted SSH → GX10 Hermes/Qwen route. Its session context is operational only: at most three prior prompt/result pairs and 4 KiB in process memory; it is neither persisted nor canonical knowledge and disappears at exit. `npm run hal:knowledge:refresh` explicitly regenerates only the derived folder pack after an approved direct-folder source change, restoring the prior derived pack if generation fails. Live sessions returned the scoped favorite-color answer, general local-model answers, and a two-turn `nebula` follow-up, then exited cleanly; all responses were journaled as `unaccepted_runtime_claim` records.
- A separate Owner-facing Canon chat path is available through `npm run hal:canon-chat`. It uses a distinct local M9 state directory and activates only the existing DR 0028 `hal_canon_v1` pack before it starts the same bounded, zero-capability route. It deliberately does not combine the Canon and personal-folder packs: M9 preserves one active, source-scoped pack per state directory. This adds no knowledge source, runtime capability, direct resource access, or Canonical-knowledge promotion.
- M9 activation recovery now preserves retired immutable-pack evidence while allowing an explicit Owner-confirmed activation of a newly regenerated valid tuple. Inquiry still fails closed when only a retired tuple is present. `npm run m9:refresh-hal-canon-pack` performs recoverable fixed-allowlist Canon-pack regeneration; the analogous existing folder refresh remains `npm run hal:knowledge:refresh`. The Canon chat launcher passed a real restricted GX10/Qwen smoke request through the zero-capability route; the response remained an `unaccepted_runtime_claim`.
- M6’s deterministic lexical ranking now scores the same bounded top-two evidence window it renders, preventing a long document with repeated weak matches from outranking a shorter, more directly matching source merely due to length. The source scope, provenance, non-canonical status, and response/evidence limits are unchanged; a focused regression test covers the ranking rule.
- The `hal_canon_v1` generator now derives bounded, manifest-hashed topic-index documents from the existing Book II and Book X sources only. M6 preferentially preserves the highest-ranked source-derived topic statement within its fixed response budget, while retaining the complete bounded reference set. This improves retrieval of named Canon topics without adding a source, runtime access, authority, or canonical-knowledge path; the full local suite passed 23 files / 180 tests and the runtime-boundary checks passed.
- `npm run hal:assistant` is the simple Owner-facing entry point for the two existing governed chat scopes. It requires an explicit choice of either the HAL Canon/project documentation pack or the approved direct-folder pack and then dispatches only to the existing launcher. It does not merge source scopes, select sources autonomously, contact the runtime itself, or alter any capability/authority boundary.
- `npm run hal:assistant -- --help` now documents the three exact approved scopes without validating or activating a pack or contacting GX10. The interactive selector accurately presents all three options. This is a usability-only change; it does not alter scope, source admission, authority, capability, or transport behavior.

## Important Current Architectural Boundaries

The following are status pointers, not restatements or replacements of architecture. Consult the cited Book II sections for normative detail.

- HAL retains sovereign authority; see Book I and [Book II Chapter 1, §8.1](Documents/Book%20II/markdown/HAL_Book_II_Chapter_01_Overall_System_Architecture_v0.2.md).
- HAL retains system-level work admission and placement. A runtime may perform runtime-local scheduling only after HAL admits and places work; see [Book II Chapter 2, §3.1](Documents/Book%20II/markdown/HAL_Book_II_Chapter_02_Runtime_Model_v0.2.md) and [Chapter 8](Documents/Book%20II/markdown/HAL_Book_II_Chapter_08_Attention_and_Resource_Allocation_v0.3.md).
- A runtime cannot grant itself authority; governed capabilities remain subject to HAL authorization through the [Capability Gateway](Documents/Book%20II/markdown/HAL_Book_II_Chapter_15_Capability_Architecture_v0.3.md).
- Runtime memory is not canonical HAL knowledge; see [Book II Chapter 10, Runtime Memory Sovereignty](Documents/Book%20II/markdown/HAL_Book_II_Chapter_10_Knowledge_Architecture_v0.3.md) and [Chapter 12](Documents/Book%20II/markdown/HAL_Book_II_Chapter_12_Memory_and_Experience_Ledger_v0.3.md).
- HAL Core depends on the Agent Runtime Contract, not Hermes internals; see [Book II Chapter 2, §3.2](Documents/Book%20II/markdown/HAL_Book_II_Chapter_02_Runtime_Model_v0.2.md).

## Next Planned Sequence

1. Maintain the provisional, explicitly unrecertified formatted Book II working edition under the active, time-bounded [Engineering Exception 0010](decisions/0010-owner-authorized-independent-review-control-exception.md).
2. The Book II targeted review passed with limitations for the narrow runtime-sovereignty clarification and synthetic test-only evidence; retain its expiry and re-review triggers. See [review record](tests/agent_runtime_contract/BOOK_II_RUNTIME_SOVEREIGNTY_REVIEW_2026-08-09.md).
3. Maintain the passed full Hermes CLI agent-loop conformance only for the approved bounded zero-capability local text profile; do not infer or enable tool-capable runtime behavior from that result.
4. Completed: DR 0028 HAL Canon documentation knowledge pilot. Maintain its fixed source allowlist, hash-verified manifest, non-canonical retrieval boundary, and source-change regeneration/activation requirements before considering any broader knowledge scope.
5. Completed: DR 0029 one-file local document pilot. Maintain its exact path/file/type/size scope and derived-pack provenance; a new source, a directory scan, source expansion, canonical promotion, or any runtime file access requires a new Owner Decision.
6. Completed: DR 0030 direct-folder local document pilot. Maintain its direct `.txt`/`.md`, non-recursive, hash-verified bounds; any other path, subdirectory, file type, NAS source, canonical promotion, or runtime file access requires a new Owner Decision.
7. Completed: Owner-facing bounded interactive chat launcher. Maintain its ephemeral session context, HAL-owned activation/journaling path, zero capability manifest, local-only configuration, and fail-closed source validation.
8. Completed: DR 0031 bounded governed dual-scope inquiry. Maintain its exact two-pack allowlist, separate state validation, per-source labels, 4 KiB combined context bound, zero-capability runtime route, and ephemeral-only session context. Any additional source/pack, automatic selection, combined pack, canonical promotion, or resource route requires an Owner Decision.
9. Use the Solo-Owner Assurance Profile only for eligible routine, reversible, non-production work; retain independent review for the high-risk threshold and production release. Exception 0024 applies only to the exact Book III amendment certification-control gate.
10. Do not broaden the completed DR 0012/0015/0019/0020 pilots or DR 0026 into an external provider, unapproved model, real capability, real resource, general mediation service, or production deployment.

## Explicitly Out of Scope

- Production Hermes activation or connection to a real Hermes package, process, or transport beyond the bounded DR 0026/DR 0027 local-only stateless slice.
- Unrestricted filesystem access.
- NAS access.
- Unrestricted shell execution.
- Home automation.
- Autonomous external communication.
- Production scheduling through Hermes.
- Direct runtime access to HAL secrets.
- Runtime-specific dependencies inside HAL Core.

## Current Documentation and Certification Status

The runtime-sovereignty clarification is recorded in the Book II Markdown working edition and [Book II Project Register](Documents/Book%20II/markdown/HAL_Book_II_Project_Register_v0.6.md). A 2026-08-09 provisional Markdown, DOCX, and PDF edition exists in `Documents/_FinalOutput/`; it is explicitly unrecertified and separate from the certified baseline. Test-only contract evidence is available in [tests/agent_runtime_contract/TEST_EVIDENCE.md](tests/agent_runtime_contract/TEST_EVIDENCE.md), with a bounded [recertification handoff](tests/agent_runtime_contract/RECERTIFICATION_HANDOFF.md). Targeted Book II conformance recertification and regeneration of authoritative formatted Book II editions remain pending. The prior Book II certification applies to the preceding baseline only.

## Material Blocker

**Accepted DR 0031 dual-scope profile:** The Owner approved Option 2 for one
bounded, read-only inquiry over exactly `hal_canon_v1` and
`personal_document_folder_pilot_v1`. M9 still maintains one active pack per
state directory; HAL independently validates both tuples before retrieval,
retains pack/source labels in each M6 inquiry, bounds the combined non-canonical
context to 4 KiB, and provides the runtime no path, handle, tool, capability,
canonical-write, or source-selection authority. `npm run hal:assistant` now
offers **Both approved contexts**. The 23-file/180-test local suite and runtime
boundary suite passed, and one restricted GX10/Qwen smoke inquiry returned the
approved local-folder favorite-color fact. The runtime result remained an
`unaccepted_runtime_claim`.

The accepted dual-scope chat retains at most three prior prompt/result pairs
(4 KiB total) in process memory only for direct follow-up questions. This is
operational runtime context, never canonical HAL knowledge, evidence, authority,
or a capability grant, and is discarded when the session ends.

`npm run hal:assistant:status` provides a read-only local readiness check for
the two exact available pack tuples and local configuration. It reports whether
each tuple is active or needs the launcher's normal revalidation. It does not
start a runtime process, connect over SSH, contact Ollama, or access any
governed resource beyond existing M9 integrity validation.

DR 0031 does not authorize additional pack/source types, automatic cross-scope
selection, a combined derived pack, canonical promotion, filesystem access,
NAS, external data/providers, secrets, shell access, or production use.

The formal independent AI technical-review scope, findings/disposition, date, and attestation are now stored in the repository with Pass with limitations. This status record does not decide whether an AI reviewer satisfies any human or professional qualification requirement and therefore does not itself claim or issue Book II recertification. The Owner has authorized the narrow, temporary [Engineering Exception 0010](decisions/0010-owner-authorized-independent-review-control-exception.md), which allows only provisional documentation and test-only work until 2026-08-16. If the recorded reviewer qualification is not accepted by the applicable Owner/Certification Service, a qualified human disposition remains required before expiry. The exception cannot authorize production integration or a certification claim.

GX10-1 evaluation evidence remains strictly bounded to the approved isolated `hal_eval` account, rootless container profile, static validation, safe no-provider smoke result, synthetic line-driver probes, the DR 0026 local-only Hermes/Qwen3 pilot, and the DR 0027 restricted stateless transport. The stateless result/evidence route and bounded zero-capability full Hermes CLI-loop conformance are complete; neither result authorizes tools, governed resources, a general provider route, credentials, production activation, or tool-capable runtime behavior.

**Resolved prompt-scope clarification:** On 2026-08-09, the Owner explicitly approved bounded local text questions through the existing DR 0027 restricted transport. DR 0026 now clarifies that its former "No general prompt support" wording prohibited an unbounded direct model proxy, not this bounded text-only assistant route. The clarification does not alter the zero-capability, local-only containment controls or canonical-knowledge boundary, and does not authorize the full Hermes CLI loop, capabilities, or production use.

**Owner-approved controlled non-synthetic knowledge pilot:** DR 0028 authorizes a fixed HAL Canon documentation source set only. The implementation must derive a manifest-hashed, provenance-recorded non-canonical retrieval pack; the runtime remains zero-capability and receives only bounded rendered context, never a filesystem path or handle. Private/user documents, arbitrary workspace admission, external sources, direct runtime filesystem access, and runtime canonical-knowledge writes remain prohibited.

**Owner-approved one-file local document pilot:** DR 0029 authorizes only the exact Desktop `HAL_reference.txt` source and its separate, bounded derived pack. It is non-canonical retrieval context, not a filesystem capability. HAL alone reads and hashes the source; the runtime receives only bounded rendered excerpts. Any folder scan, additional document, NAS source, source mutation workflow, canonical promotion, or runtime direct-access route is outside the approval.

**Owner-approved direct-folder local document pilot:** DR 0030 authorizes only direct regular `.txt`/`.md` files in the exact Desktop `HAL_doc_ref` folder, with no recursion. HAL revalidates every selected file’s name/hash/byte size and sends the runtime only bounded rendered excerpts. Any subdirectory, other file type/path, NAS source, canonical promotion, or runtime direct-access route remains outside the approval.

DR 0018 resolves the design-authorization decision for a HAL-owned identity-and-correlation mediator. The activation path remains blocked on its planned conformance evidence and a further Owner activation decision. Read-only assessment confirms that rootless Docker retains its default `bridge`, `host`, and `none` network definitions, while GX10-1 exposes multiple host loopback listeners (including Ollama). The host-side proxy prototype is intentionally not mountable or runtime-addressable. No container-to-proxy route, container mount, runtime identity binding, or bypass/egress negative test has been attempted or passed.

## Known Dependency Follow-Up

The lockfile-pinned development dependency audit reports two high-severity advisories: `brace-expansion` (GHSA-rgw5-rvv9-x895) and `nanoid` (GHSA-2v37-7h3g-55p8). No dependency or lockfile change was made, and package install scripts for `esbuild` and `fsevents` remained blocked by the local install policy. Review and remediation must be a separately scoped dependency-change task under Book II Chapter 29; it is not part of the adapter-boundary milestone.

## Owner Review Status

No unresolved Owner Decision is currently recorded for the runtime-sovereignty clarification. Owner Review remains required whenever the conditions in [agents.md](agents.md) apply, including a material change to authority, constitutional invariants, a security boundary, canonical knowledge semantics, evidence/recovery guarantees, or a major architecture contract.

## Continuity Rule

Update this file at the completion of meaningful work when:

- the current phase changes;
- an objective is completed;
- the next planned task changes;
- an Owner Decision changes project direction;
- a major implementation milestone is reached; or
- a material blocker appears or is resolved.

Do not update it for trivial implementation edits.

A new Codex session should be able to inspect [agents.md](agents.md), this file, and relevant authoritative documentation to determine what HAL is, which rules apply, the current objective, the next expected work, and whether Owner input is needed.
