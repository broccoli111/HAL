# M9 Implementation Record - Controlled Local Knowledge Packs

## Scope and authorization boundary

M9 is implemented under explicit Owner authorization for local-only, deterministic, non-live-effect operation. DR 0028 additionally authorizes one fixed, non-synthetic HAL Canon documentation pilot.

Implemented scope is limited to:

- fixed approved synthetic knowledge-pack root under `fixtures/approved-knowledge-packs`;
- one fixed, source-confined `hal_canon_v1` pack generated only from the DR 0028 allowlist; and
- the separately bounded DR 0029 `personal_document_pilot_v1` pack, generated only from its one exact Owner-approved desktop text file; and
- the separately bounded DR 0030 `personal_document_folder_pilot_v1` pack, generated only from direct regular `.txt`/`.md` files in its exact Owner-approved desktop folder.
- strict pack validation/registration for M9 v1 manifest and content contracts;
- explicit local operator-provided Owner confirmation claims for activation/deactivation;
- dedicated governed M2 admission path before any M9 state mutation;
- append-only hash-chained activation journal and fail-closed reconstruction;
- M6/M7/M8/M4/M5 integration for bounded evidence and backup/restore linkage.

Not implemented:

- private/user-document ingestion apart from the exact DR 0029 one-file and DR 0030 direct-folder pilots;
- cloud/network/model/provider sources;
- arbitrary filesystem pack admission;
- real-world identity/authentication claims;
- authority/readiness uplift.

## Delivered modules and sole mutation owners

Added module: `src/m9/`

- `types.ts`
  - M9 schema constants, strict v1 bounds, and bounded record contracts.
- `canonical.ts`
  - deterministic canonical UTF-8 JSON and SHA-256 hashing helpers.
- `validator.ts` (**sole validation/registration owner**)
  - fixed-root resolution;
  - strict layout enforcement (`manifest.json` + `content/`);
  - manifest self-hash verification via canonical hash omission;
  - declared-file completeness and extra-file rejection;
  - symlink/traversal/URL-like/path-escape rejection;
  - malformed JSON, duplicate/ordering/schema/hash/size/count bound rejection;
  - secret-like content rejection.
- `m2Admission.ts` (**sole M2 admission mapper for M9**)
  - explicit, traceable M2 intent/plan/decision/transaction admission path for activation and deactivation.
- `activationJournal.ts` (**sole M9 durable mutation writer**)
  - append-only hash-chained `m9/m9-pack-activation-journal.jsonl`;
  - bounded record size enforcement;
  - deterministic replay/conflict checks by operation request ID.
- `service.ts` (**sole activation/deactivation/reconstruction owner**)
  - `listApprovedM9PackRegistrations()`
  - `activateApprovedM9Pack()`
  - `deactivateApprovedM9Pack()`
  - `getM9ActivePackState()`
  - `resolveM9PackForActiveInquiry()`
  - fail-closed reconstruction on missing/tampered/swapped/invalid pack tuple.
- `index.ts`
  - module exports.

Added CLI:

- `src/cli/m9PacksCli.ts`
  - constrained local commands: `list`, `activate`, `status`, `deactivate`
  - explicit existing `--state-dir` required;
  - no free-form pack path input;
  - bounded output only;
  - explicit `externalEffect: none`.

## Fixed approved synthetic packs

Added deterministic synthetic fixtures under:

- `fixtures/approved-knowledge-packs/pack_alpha`
- `fixtures/approved-knowledge-packs/pack_beta`

Each pack contains:

- one `manifest.json` (control artifact, excluded from `files`);
- `content/` regular JSON files only, each declared exactly once with hash and byte-size.

Pack identity tuples are case-sensitive and compared exactly.

## DR 0028 HAL Canon documentation pilot

`hal_canon_v1` is the repository-document non-synthetic M9 pack. Its generator reads only the exact code-enforced source list in `src/m9/halCanonSourceScope.ts`: named Book I–IV/X editions, root `agents.md`, `CURRENT_STATE.md`, and enumerated Decision Records. It writes a bounded JSON retrieval representation with a source-record manifest containing each source path, SHA-256 hash, and byte size. M9 revalidates those source hashes on registration and activation; a source change requires a fresh derived pack and activation tuple.

DR 0029 adds one separately named, non-canonical `personal_document_pilot_v1` pack. Its source, output location, pack identifier, classification, and provenance are fixed in `src/m9/personalDocumentPilotScope.ts`; it admits exactly one direct regular `.txt` file, refuses symlinks and overwrite, and bounds the source to 8 KiB/32 non-empty lines/2 KiB per line. The derived pack remains adjacent to the Owner-controlled source and is not a repository artifact. It records the source label, hash, and byte size at generation. Source changes require a new immutable pack and Owner-confirmed activation. It does not create a filesystem capability or expose the source path to the runtime.

DR 0030 adds a separately named `personal_document_folder_pilot_v1` pack. Its direct source directory, output location, identifiers, and bounds are fixed in `src/m9/personalDocumentFolderPilotScope.ts`. It admits at most 32 direct regular `.txt`/`.md` files, each at most 8 KiB and at most 128 KiB total. It rejects selected-path symlinks, records every source label/hash/byte size, and revalidates source-set count, names, hashes, and byte sizes before use. No recursion or runtime path/handle is permitted.

This representation is non-canonical retrieval context. It is not a new canonical knowledge store, does not grant runtime filesystem access, and may not be expanded by a runtime. HAL gives the zero-capability runtime only bounded M6-rendered text and source-labeled references. Canon documentation may mention security terms such as “secret”; only value-shaped credentials are rejected for this fixed pack, while the stricter synthetic-pack guard remains unchanged.

## M6/M7/M8 integration

- M6 now requires one active validated M9 pack for accepted inquiries.
  - no active pack -> fail-closed blocked result (`reason=no_active_pack`);
  - inquiry evidence records include immutable activation tuple fields:
    - `m9PackId`
    - `m9PackVersion`
    - `m9ManifestHashSha256`
    - `m9ActivationRecordId`
  - replay preserves original correlation and original activation tuple.
- M7 remains stateless and delegates through shared governed M6 path.
- M8 adds request-only pack controls:
  - new typed IPC channels for pack status and pack activation request submission;
  - sender/frame/origin/payload validation remains in main process;
  - renderer can only propose activation/deactivation requests;
  - main process remains sole mutation owner;
  - no transcript/raw-content/path persistence by M8.

## M3/M4/M5 integration

- M3 deterministic inquiry artifact metadata carries M9 activation tuple context.
- M4 verification now independently validates:
  - M6 evidence tuple <-> M3 deterministic artifact tuple consistency;
  - tuple references against approved M9 registry;
  - attested corpus manifest consistency for active M9 content root.
- M5 backup/restore coverage extended for M9 activation journal only:
  - allowlisted optional capture: `m9/m9-pack-activation-journal.jsonl`;
  - no arbitrary pack-root/raw-pack-content backup admission.

## Tests and verification coverage

Added tests:

- `test/m9-controlled-local-knowledge-packs.test.ts`
  - approved registry visibility and deterministic manifest-hash validation;
  - explicit activation/deactivation lifecycle with bounded outputs;
  - no mutation on invalid Owner-claim path;
  - inquiry blocked with no active pack;
  - inquiry replay preserves immutable activation tuple/correlation;
  - extra-file/symlink rejection;
  - v1 bound rejection checks;
  - M5 backup/restore + fresh-process M9 reconstruction.

Updated tests:

- `test/m6-controlled-inquiry.test.ts`
- `test/m7-local-inquiry-session.test.ts`
- `test/m8-presentation-service.test.ts`
- `test/local-inquiry-service.test.ts`
- `test/m8-ipc-contracts.test.ts`
- `test/m2-durable-intent.test.ts` (write-boundary inventory includes `m9/activationJournal.ts`)

Verified command suite:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run security:scan`

## Remaining limits and posture

- Owner confirmation claims are local operational assertions only; they are not authentication or real-world identity proof.
- M9 stays local-only with `externalEffect=none`. Apart from the fixed DR 0028 HAL Canon pack and the separately named exact DR 0029/DR 0030 local-document pilots, packs remain synthetic-only.
- This implementation record does not claim authority expansion, certification, or readiness uplift.
