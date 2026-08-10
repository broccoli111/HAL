# M9 Controlled Local Knowledge Packs Design

**Status:** Proposed / not implemented  
**Authorization posture:** Non-authorizing design only. Implementation is blocked pending separate explicit Owner authorization.  
**Current readiness posture preserved:** `ready_to_remain_local_only`  
**Residual assurance limitation preserved:** Independent review remains an explicit residual risk and a prerequisite for any stronger assurance claim or scope expansion.

## 1) Purpose and fixed boundary

M9 defines a controlled local knowledge-pack lifecycle so HAL can run deterministic inquiry over one explicitly approved synthetic knowledge body at a time without changing any existing trust boundary, authority boundary, or readiness posture.

M9 is permanently constrained to all of the following:

- local-only;
- synthetic-only;
- deterministic;
- non-live-effect;
- offline with no network or remote content;
- no model or generative-provider admission;
- no arbitrary filesystem browsing;
- no private-file, user-document, email, cloud-drive, browser, external-tool, database, telemetry, or real-auth admission;
- no autonomous pack discovery, installation, activation, or switching;
- no authority expansion.

Personal/private document ingestion is otherwise out of scope. DR 0029 is the
sole accepted exception: one exact direct regular `.txt` source and its
separately named bounded derived pack. It does not authorize browsing,
directory ingestion, uploads, source discovery, or any other user-document
admission.

## 2) Governing alignment (Books I, II, IV, V, VI, VII, VIII, IX, X)

M9 design requirements are constrained by:

- Book I: evidence-first operation, explicit authority, no silent authority expansion, and fail-closed behavior on uncertainty.
- Book II and Book IV: single owner per authoritative state domain, explicit contracts, no mutation ownership ambiguity.
- Book V: operations stop-work posture on uncertainty, evidence preservation, and bounded recovery.
- Book VI: trust/security/compliance artifacts never create authority; secrets and sensitive material minimization is mandatory.
- Book VII: explicit decision records and role separation; no implicit approval by convenience.
- Book VIII: verification evidence is separate from certification and does not create authority.
- Book IX: idempotency, correlation/causation, denial terminality, replay/conflict clarity, and fail-closed contract handling.
- Book X: semantic precision; no terminology that launders authority or readiness.

## 3) Knowledge-pack contract

### 3.1 Required pack identity fields

Each approved synthetic pack must include:

- `packId` (stable identifier, immutable);
- `packName` (human-readable label);
- `packVersion` (semantic version);
- `schemaVersion` (manifest schema version);
- `packClassification` (must be `synthetic_approved_local_only`);
- `provenanceClassification` (must be `synthetic_non_sensitive`);
- canonical manifest object;
- canonical manifest SHA-256 hash;
- bounded document and section identifiers;
- deterministic file/content ordering;
- explicit M6 lexical-compatibility declaration.

### 3.2 Manifest schema v1 and allowed pack layout

Manifest schema identifier:

- `hal.m9.knowledge-pack.manifest.v1`

Allowed pack layout is exact in M9 v1:

- `manifest.json`
- `content/` directory containing only declared regular JSON content files

No other directories or files are admitted. In particular, no separate metadata files and no alternate directories are admitted in M9 v1.

Required `manifest.json` top-level fields:

- `schemaVersion` (exact value above);
- `packId` (`^[a-z0-9][a-z0-9_-]{2,63}$`);
- `packName` (1-120 UTF-8 chars, printable, single-line);
- `packVersion` (strict semver `MAJOR.MINOR.PATCH`);
- `packClassification` (`synthetic_approved_local_only`);
- `provenanceClassification` (`synthetic_non_sensitive`);
- `m6Compatibility` object:
  - `tokenizerVersion` (must be `m6.tokenizer.v1`);
  - `matcherVersion` (must be `m6.matcher.v1`);
  - `corpusIndexVersion` (must be `m6.corpus-index.v1`);
  - `documentShape` (must be `m6.synthetic-document.v1`);
- `documents` array (bounded declared identity inventory):
  - `documentId` (`^[a-z0-9][a-z0-9_.-]{1,63}$`, unique);
  - `sectionIds` array (`^paragraph:[0-9]+$`, unique per document, contiguous from `paragraph:0`);
- `files` array (declared admitted content files only):
  - `relativePath` (POSIX relative path, no leading slash);
  - `sha256` (64 lowercase hex);
  - `byteSize` (positive integer);
  - `contentClass` (must be `pack_content_json`);
- `contentRoot` (must be `content`);
- `integrity` object:
  - `manifestHashAlgorithm` (must be `sha256`);
  - `manifestHashSha256` (computed canonical hash).

Manifest control-artifact rule:

- `manifest.json` is a control artifact and is explicitly excluded from `files`.
- `files` must contain every admitted regular content file under `content/` exactly once.
- Any extra regular file other than `manifest.json` is rejected.

### 3.3 Deterministic canonical JSON and hash rules

Canonical serialization for hashing and equality:

1. UTF-8 encoding only, no BOM.
2. JSON objects recursively sorted by key in ascending lexicographic byte order.
3. Arrays preserve declared order; required sorted arrays:
   - `documents` sorted by `documentId`;
   - each `sectionIds` sorted by numeric section index;
   - `files` sorted by `relativePath`.
4. No duplicate object keys.
5. No insignificant whitespace (canonical minified JSON).
6. `integrity.manifestHashSha256` is computed over canonical bytes of `manifest.json` with only that field omitted.
7. Manifest integrity is verified only by deterministic recomputation of `integrity.manifestHashSha256` using the same omission rule.
8. Verifiers must fail closed on mismatch.

### 3.4 Manifest/content enumeration invariants

For a candidate pack directory:

1. `manifest.json` must exist and be a regular file.
2. `content/` must exist and be a directory.
3. Every regular file under `content/` must be declared exactly once in `files`.
4. Every `files` entry must resolve to one regular JSON file under `content/`.
5. Any regular file outside `content/` other than `manifest.json` is rejected.
6. Any non-regular entry, symlink, traversal escape, or undeclared file is rejected.

### 3.5 Pack content compatibility with M6

Every admitted pack content file must use strict `m6.synthetic-document.v1` document shape:

- `id: string`
- `title: string`
- `tags: string[]`
- `paragraphs: string[]`

Compatibility requirements:

- `id` must match one declared `documentId` from manifest.
- Paragraph count must match declared `sectionIds`.
- M6 normalization/tokenization/matching versions must exactly match manifest `m6Compatibility`.
- Any mismatch blocks pack validity and availability.

### 3.6 Exact identifier and version comparison rule

After canonical validation, all identifier and version comparisons are exact, case-sensitive byte comparisons with no case-insensitive fallback:

- `packId`
- `packName`
- `packVersion`
- `documentId`
- `sectionIds`
- `manifestHashSha256`

## 4) Storage and path safety

### 4.1 Fixed application-controlled roots

M9 defines fixed roots, not caller-supplied arbitrary roots:

- Pack root (read-only admission root): `implementation/hal-core/fixtures/approved-knowledge-packs`
- M9 governed local state root (within selected M2+ directory): `<state-dir>/m9`

No renderer-provided, user-typed, machine-derived, or environment-derived alternate pack roots are admitted.

### 4.2 File and path constraints

Admission rejects immediately if any condition occurs:

- non-regular file;
- symlink at any level;
- traversal segments (`..`);
- absolute paths;
- URL-like values (`://`, `file:`, `http:`, `https:`);
- hidden alternate roots;
- undeclared file presence;
- declared file missing;
- duplicate IDs;
- unsupported schema versions;
- malformed JSON;
- hash mismatch;
- secret-like content in admitted files.

Enumeration is lexicographic and deterministic at every directory level.

### 4.3 Secret-like content rejection

Pack validation must run deterministic secret-like detectors against all string fields and reject on match. The rejection record stores category code only; it never stores raw matched text.

### 4.4 Durable minimization

By default, durable journals must not retain:

- raw pack text;
- local filesystem paths;
- raw content body fragments.

Only bounded identity fields (`packId`, `packVersion`, `manifestHashSha256`, schema and status metadata) are admissible.

### 4.5 Exact M9 v1 fail-closed bounds

M9 v1 fixed limits:

- maximum packs under approved root: `32`
- maximum regular content files per pack: `64`
- maximum total bytes per pack (manifest + content): `2,097,152` bytes
- maximum bytes per content file: `131,072` bytes
- maximum documents: `64`
- maximum tags per document: `32`
- maximum paragraphs per document: `128`
- maximum title bytes (UTF-8): `256`
- maximum tag bytes (UTF-8) per tag: `64`
- maximum paragraph bytes (UTF-8) per paragraph: `2,048`
- maximum manifest bytes (UTF-8): `262,144`
- maximum activation-journal record bytes (UTF-8): `4,096`

Any limit violation fails validation/registration/activation closed and does not persist raw content.

## 5) Registration and Owner activation lifecycle

### 5.1 Distinct lifecycle terms (normative)

- **Validation:** deterministic static and integrity checks over one pack root candidate.
- **Registration:** recording pack identity and validated manifest hash into governed M9 pack registry.
- **Availability:** registered pack remains cryptographically valid and physically present under fixed root.
- **Explicit Owner activation:** local operator-provided Owner confirmation claim selecting exactly one available pack as active.
- **Selection for one inquiry:** binding of one inquiry execution to the currently active pack identity.
- **Deactivation:** local operator-provided Owner confirmation claim clearing active-pack status.

Owner confirmation claim semantics:

- It is an explicit local operator-provided claim.
- It is not authentication.
- It is not proof of real-world identity.
- It must not be inferred from machine, account, UI access, or successful IPC.
- It is valid only within the existing Owner-controlled local-only operating posture.

Admission rule for activation/deactivation:

- Every activation/deactivation attempt must first pass a dedicated governed M2 intent/plan/decision/transaction path.
- No M9 activation record may be appended and no active-pack state may change unless that M2 path admits the attempt.

M9 must never infer activation from:

- presence on disk;
- filename;
- UI display state alone;
- machine identity;
- prior successful use.

### 5.2 Activation record contract

Activation journal schema:

- `hal.m9.pack-activation-record.v1`

Required fields:

- `activationRecordId`
- `recordedAtUtc`
- `correlationId`
- `causationId` (if present)
- `ownerDisposition` (`activate` | `deactivate`)
- `reasonCode` (bounded enum, no free-form secrets)
- `packId`
- `packVersion`
- `manifestHashSha256`
- `result` (`succeeded` | `blocked`)
- `resultReasonCode`
- `previousRecordHash`
- `recordHash`

Prohibited in activation records:

- raw corpus content;
- raw local paths.

### 5.3 Durability decision and restart reconstruction

Decision: activation is durable and reconstructable from append-only activation journal plus current manifest revalidation.

Restart reconstruction algorithm:

1. Validate activation journal chain integrity.
2. Read latest successful activation/deactivation disposition.
3. If latest state is active, revalidate referenced pack by `packId`, `packVersion`, and `manifestHashSha256`.
4. Admit active state only if all validations pass.
5. Otherwise fail closed as `integrity_unavailable` and require explicit Owner reactivation after repair.

If activation evidence, manifest, or hash validation is unavailable, M9 blocks inquiry and does not synthesize success.

## 6) M2-M5 governance and evidence integration

### 6.1 M2 linkage

Every M9 inquiry must remain attached to one M2 intent/plan/decision/transaction chain and include:

- `m9PackId`
- `m9PackVersion`
- `m9ManifestHashSha256`

No raw corpus text is admitted into M2 durable records.

### 6.2 M3 linkage

M3 capability admission remains bounded. M9 does not admit any new external capability class. Request identity is explicit, bounded, and immutable per inquiry attempt.

### 6.3 M4 linkage

M4 attestation must verify that exactly one approved active pack identity was bound to the inquiry, and that evidence hash linkage remained intact.

### 6.4 M5 linkage

M5 backup/verify/restore must cover:

- M9 pack registry records;
- M9 activation journal;
- M9 inquiry evidence linkage fields.

Restore verification must prove pack linkage consistency (`packId`, `version`, `manifestHash`) or fail closed.

### 6.5 Correlation, causation, idempotency, replay, conflict semantics

- Every activation/deactivation operation receives its own correlation ID.
- Every inquiry receives its own distinct correlation ID.
- Inquiry evidence must include immutable causal activation context:
  - `packId`
  - `packVersion`
  - `manifestHashSha256`
  - `activationRecordId`
- Each inquiry records the exact `activationRecordId` it relied upon.
- Replay preserves the original inquiry correlation ID and original activation tuple.
- Later activation/deactivation must not silently alter the evidence meaning of earlier inquiries.
- Activation replay/conflict semantics are scoped independently to activation request identity.
- Causation IDs link each inquiry record to the relied-upon activation record without collapsing distinct correlation scopes.
- Idempotency key for inquiry replay is scoped to:
  - request ID
  - normalized question hash
  - `packId`
  - `packVersion`
  - `manifestHashSha256`
- Replay with identical scoped key returns original terminal disposition.
- Same request ID with different scoped key is deterministic conflict and must be blocked.

## 7) M6, M7, and M8 behavior constraints

### 7.1 M6 behavior under M9

- M6 performs deterministic inquiry only against the one selected approved active pack.
- No inquiry is admitted when no active pack exists.
- One inquiry cannot merge content across packs.
- Pack identity fields are included in governed evidence; raw pack content is not.

### 7.2 M7 behavior under M9

- M7 remains stateless across questions.
- No cross-question context memory.
- M7 does not persist transcript, raw question, raw answer, or pack content.

### 7.3 M8 behavior under M9

M8 may:

- display approved pack identity and activation status;
- expose a single explicit activation-request action through narrow IPC.

M8 must not:

- auto-select a pack;
- auto-switch packs;
- directly mutate activation state;
- persist transcript/UI journal/raw question/raw answer/raw pack content/raw local paths.

#### M8 IPC control contract (design-only)

Proposed channel: `m8.pack.activate.request.v1`

Allowed payload fields:

- `requestId`
- `correlationId`
- `packId`
- `packVersion`
- `manifestHashSha256`
- `ownerDisposition` (`activate` | `deactivate`)
- `reasonCode`

Main process must validate sender, frame, payload schema, and bounded values before any activation attempt.

M8 activation request semantics:

- UI interaction proposes an activation/deactivation request only.
- UI access is not authentication and not Owner proof.
- Successful IPC transport is not authority.
- The request must still be admitted by dedicated governed M2 activation/deactivation flow before any M9 activation mutation.

## 8) Verification and recovery requirements

Independent validation must cover all of the following:

- manifest and file tampering rejection;
- undeclared file rejection;
- duplicate ID rejection;
- symlink rejection;
- traversal rejection;
- malformed schema rejection;
- secret-like content rejection;
- unavailable/missing active pack handling;
- activation replay and conflict behavior;
- pack swap after activation detection;
- restart reconstruction behavior;
- backup/restore valid pack-linkage preservation;
- tampered M9 evidence or activation-record detection;
- fail-closed `integrity_unavailable` behavior;
- no-network/no-external-effect proof.

## 9) M9 acceptance matrix (design gate, future implementation only)

| #   | Test case                                                        | Required result                                                                                        |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | valid approved-pack activation                                   | activation succeeds only with explicit Owner action and valid manifest/hash evidence                   |
| 2   | deterministic inquiry against one active pack                    | repeated identical requests return materially identical governed result and same pack identity binding |
| 3   | deterministic no-match                                           | no-match returns truthful deterministic no-effect outcome with active pack identity fields             |
| 4   | attempt query with no active pack                                | blocked fail-closed (`integrity_unavailable` or `no_active_pack`)                                      |
| 5   | pack manifest/file tamper rejection                              | pack becomes unavailable; inquiry blocked; no success synthesis                                        |
| 6   | symlink/traversal/undeclared-file rejection                      | validation blocks registration/availability                                                            |
| 7   | activation replay and same-ID conflict                           | identical replay idempotent; materially different replay conflicts and blocks                          |
| 8   | inquiry replay preserving pack identity and original correlation | replay returns original governed correlation and pack identity tuple                                   |
| 9   | activation or pack mismatch blocks final success                 | any mismatch in active tuple prevents `completed_without_effect` success                               |
| 10  | M5 backup/verify/restore plus fresh-process reconstruction       | restored process reconstructs valid activation only with intact journal+manifest hash linkage          |
| 11  | M8 sender/payload validation for new pack controls               | invalid sender/payload blocked before activation mutation                                              |
| 12  | no raw pack contents/paths in durable evidence                   | evidence inspection proves bounded metadata only                                                       |
| 13  | no-network/no-external-effect proof                              | static/runtime evidence confirms no outbound network and `externalEffect=none`                         |
| 14  | manifest self-hash verification                                  | `integrity.manifestHashSha256` recomputation succeeds only with canonical omission rule                |
| 15  | extra metadata or undeclared file rejection                      | any regular file outside `content/` except `manifest.json` is rejected fail-closed                     |
| 16  | no direct M8 activation mutation without M2 admission            | UI/IPC request alone cannot append activation record or change active state                            |
| 17  | UI access not treated as authentication or Owner proof           | activation attempt blocked unless explicit local Owner confirmation claim is admitted through M2       |
| 18  | distinct activation vs inquiry correlations and causal binding   | separate correlations plus immutable `activationRecordId` and pack tuple in inquiry evidence           |
| 19  | every M9 v1 count/size limit fail-closed                         | each bound violation rejects validation/registration/activation without raw-content persistence        |

## 10) Explicit non-goals

- no private or user-document ingestion apart from the exact DR 0029 one-file pilot;
- no upload/import wizard;
- no cloud or network source;
- no semantic/vector/model search;
- no conversational memory;
- no multi-pack blended answers;
- no installer/distribution/update work;
- no live-effect action;
- no authority or readiness uplift.

## 11) Readiness and assurance posture (unchanged)

M9 does not change M0-M8 behavior, does not authorize implementation, and does not modify governing/canon/implementation-program authority.

The current posture remains:

- `ready_to_remain_local_only` for current implemented scope only;
- independent review remains an explicit residual risk;
- no claim is made that M9 is implemented, approved, certified, or ready.

Any M9 implementation work requires separate explicit Owner authorization recorded before code changes are admitted.
