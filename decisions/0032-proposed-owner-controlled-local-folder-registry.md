# Decision Record 0032 — Owner-Controlled Local Folder Registry

| Field | Value |
| --- | --- |
| Status | Proposed — not adopted |
| Date | 2026-08-09 |
| Scope | Potential future expansion of Owner-approved local-document knowledge sources |
| Owner Review | Required and pending |

## Decision

No decision has been made. This record presents a bounded next-step choice for
allowing the Owner to add or remove explicitly approved local document folders
without giving an Agent Runtime filesystem access or changing the Canon.

## Context

DR 0030 authorizes exactly one non-recursive Desktop folder, and DR 0031
authorizes inquiry over exactly that folder together with the fixed HAL Canon
pack. Both records expressly require a new Owner Decision for another folder,
file type, source class, automatic source selection, combined derived pack, or
runtime resource access.

The Owner has expressed a future usability goal: authorize an additional folder
by naming its location. That goal needs a governed HAL-side admission workflow;
runtime technical ability must not become filesystem authority.

## Authoritative Sources

- Book I: Owner authority, provenance, immutable history, recovery, and the
  prohibition on lower-order sources weakening those requirements.
- Book II Chapter 2 §§3.1–3.2: the Agent Runtime Contract and dependency
  guarantee; Chapter 10: governed knowledge and runtime-memory sovereignty;
  Chapter 15: Capability Gateway; Chapter 25: evidence; Chapter 35:
  conformance.
- Book III: configuration, local-only, evidence, test, and change-control
  standards.
- DR 0028, DR 0030, and DR 0031.

Higher-order authority prevails over this record. This proposed record grants
no access, capability, source admission, or implementation authority.

## Alternatives Considered

1. **Per-folder Owner Decision Record.** For every requested folder, the Owner
   approves one exact absolute path, allowed direct file types, non-recursion,
   size caps, and a separate immutable pack. This is the current model and has
   the smallest implementation surface, but is administratively repetitive.
2. **Owner-controlled bounded folder registry (recommended).** HAL provides a
   local Owner-only registration/removal workflow. Each entry records one exact
   absolute folder path, allowed direct regular file types, source limits,
   provenance, activation state, and expiry/review policy. HAL validates and
   reads entries; the runtime receives only bounded rendered excerpts. The
   registry would not automatically approve a folder merely because a path was
   typed into a runtime prompt.
3. **General filesystem browsing or runtime-selected folders.** Rejected: it
   would create unrestricted or implicit resource authority and contradict the
   existing Capability Gateway and runtime-sovereignty boundaries.
4. **One combined multi-folder pack.** Rejected for the first expansion:
   independent source provenance and explicit source selection would be less
   clear than separately validated packs.

## Consequences

If Alternative 2 is accepted, the registry must be HAL-owned, explicit,
reversible, and evidence-producing. It must deny symlinks, recursive traversal,
unapproved paths, unsupported file types, source drift, and runtime-originated
registration requests. It must preserve separate pack identity and source
labels, require explicit Owner action to activate or revoke an entry, and never
give the runtime a path, directory handle, filesystem tool, capability, or
canonical-knowledge write path.

It would not authorize NAS, home-directory scanning, network/external sources,
secrets, shell access, automatic source selection, canonical promotion,
production use, external providers, or a change to the Agent Runtime Contract.

## Implementation Implications

No implementation is authorized by this record while it is Proposed. If the
Owner accepts Alternative 2, implementation should first define a narrow
HAL-owned registration record and deterministic conformance suite, including:

- exact absolute-path and non-symlink validation;
- a fixed direct-file allowlist and explicit file/byte limits;
- per-folder immutable manifest/hash/provenance and separate activation state;
- Owner-confirmed add, activate, deactivate, and revoke operations;
- source-drift fail-closed behavior and recovery without deleting evidence;
- no runtime source-selection input, filesystem path/handle, tool, or
  capability; and
- tests for denial, revocation, replacement, and runtime-boundary preservation.

## Owner Review Assessment

### Decision required

Choose whether HAL may evolve from the one-folder DR 0030 pilot to a governed
Owner-controlled local folder registry.

### Why Owner Review is required

The choice creates a new governed resource/knowledge admission contract and
alters the trust boundary through which HAL may read local folders. It affects
source scope, provenance, evidence, policy enforcement, recovery, and the
future usability model. `agents.md` requires Owner Review for each of those
material changes.

### Options

- **Option 1:** retain the current per-folder Decision Record model.
- **Option 2 (recommended):** authorize design and conformance of the bounded
  Owner-controlled folder registry described above, with no runtime filesystem
  access and no production/resource capability activation.
- **Option 3:** authorize general folder or runtime-selected access. Not
  recommended; it conflicts with the existing governance boundary and would
  require a separate, much broader architecture/security proposal.

### Recommendation and tradeoffs

Option 2 best meets the requested simple Owner workflow while retaining
least-privilege, provenance, separate source scope, reversible activation, and
runtime replaceability. It adds a durable HAL-side registry and test burden;
Option 1 avoids that work but requires a new Decision Record per folder.

### Architectural, constitutional, and security impact

Architectural impact is a new HAL-owned local-source-admission component; it
must remain outside the Agent Runtime Contract and behind governed policy and
evidence paths. No constitutional amendment is proposed. Security impact is a
new HAL-side, Owner-mediated read boundary; runtimes remain zero-capability and
cannot grant or select access.

### Reversibility

Each entry can be deactivated or revoked while preserving its immutable
admission/activation evidence. Derived packs can be retired without deleting
the underlying source or changing Canon, identity, runtime contract, or
existing single-folder behavior.

## Continuity Notes

Do not implement the registry unless the Owner accepts an option. Upon an
acceptance, create the accepted decision record details, define the conformance
plan, and implement only the accepted bounded scope.
