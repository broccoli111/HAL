# Chapter 10 — Privacy, Security, Trust Domains, Treaties, and the Constitutional Firewall

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines information classification, privacy purpose, secrets, credentials, trust boundaries, external domains, Treaties, and governed exchange.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I privacy, dignity, sovereignty, external trust, and protected authority.
- **Book II:** Book II Chapters 18, 19, 20, 21, 25, and 26.
- **Book III:** Book III Chapters 02, 04, 05, 06, and 07.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. External-domain exchange MUST be modeled through an External Trust Domain, an applicable Treaty, and the Constitutional Firewall.
2. Every active Treaty MUST be exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized through the Owner Authorization Ceremony bound to that exact Treaty.
3. A Treaty MUST NOT grant Authority prohibited by Book I or bypass constitutional enforcement.
4. Data use MUST state classification, authorized purpose, minimization, access, retention, disclosure, and disposal rules.
5. Security Controls and Authority Controls MUST be distinguished even when implemented by the same mechanism.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0116 | External Trust Domain | External governance domain | An external environment, organization, system, or authority regime whose controls and assumptions are not natively governed by HAL. | External status does not imply hostility or trustworthiness; exchange requires explicit governance. |
| HAL-TERM-0117 | Treaty | Governed trust agreement | An exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized agreement defining allowed cross-domain identities, data, capabilities, authority, obligations, verification, monitoring, failure behavior, and termination. | Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall. |
| HAL-TERM-0118 | Constitutional Firewall | Architectural enforcement boundary | The Book II boundary that mediates and enforces constitutionally governed exchange between HAL and External Trust Domains. | It is not merely a network firewall and must not be bypassed by direct integration. |
| HAL-TERM-0119 | Trust Boundary | Security boundary | A boundary across which identity, authority, integrity, confidentiality, provenance, or governance assumptions change. | Network adjacency alone does not define or erase a Trust Boundary. |
| HAL-TERM-0120 | Data Classification | Governance label | A governed label determining handling, access, transmission, retention, evidence, and disposal requirements for information. | Classification is not a purpose or permission to use the data. |
| HAL-TERM-0121 | Personal Data | Information class | Information relating to an identified or reasonably identifiable human under the governing privacy context. | Pseudonymization may reduce exposure but does not necessarily remove personal-data status. |
| HAL-TERM-0122 | Sensitive Data | Information class | Information whose unauthorized use or disclosure could materially harm a person, HAL, the Owner, security, sovereignty, trust, or protected operations. | Sensitivity is context-dependent and may include non-personal operational data. |
| HAL-TERM-0123 | Purpose Limitation | Use constraint | The rule that governed data may be collected, used, shared, and retained only for declared, authorized, compatible purposes. | Availability or technical usefulness does not establish purpose. |
| HAL-TERM-0124 | Data Minimization | Collection and use constraint | The rule that only the least data reasonably necessary for an authorized purpose may be collected, processed, retained, and disclosed. | Minimization applies to fields, precision, population, duration, access, and derived inferences. |
| HAL-TERM-0125 | Retention Class | Lifecycle label | A governed category defining retention period, review, legal or constitutional hold behavior, archival, and disposal requirements. | A Retention Class does not itself authorize collection or access. |
| HAL-TERM-0126 | Secret | Sensitive authentication material | Confidential material whose disclosure could enable unauthorized access, impersonation, decryption, signing, or protected operation. | An Identifier or public key is not a Secret merely because it is security-related. |
| HAL-TERM-0127 | Cryptographic Key | Cryptographic material | A governed value used by an approved cryptographic operation and managed through generation, storage, access, rotation, revocation, destruction, and provenance controls. | A key's possession does not itself establish business Authority. |
| HAL-TERM-0128 | Security Control | Protective control | A safeguard intended to protect confidentiality, integrity, availability, identity assurance, or system resilience. | A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate. |
| HAL-TERM-0129 | Authority Control | Mandate-limiting control | A safeguard that prevents a Principal, component, or HAL from deciding or acting beyond governed Authority. | It is not interchangeable with a Security Control, though one mechanism may support both. |
| HAL-TERM-0163 | Trust Domain | Governance context | A bounded identity, policy, evidence, security, privacy, and accountability context within which trust assumptions and controls are evaluated. | Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0116 — External Trust Domain

- **Example:** A dependent artifact cites `HAL-TERM-0116` when it uses **External Trust Domain** with this exact governed meaning: An external environment, organization, system, or authority regime whose controls and assumptions are not natively governed by HAL.
- **Counterexample:** A dependent artifact uses **External Trust Domain** in a way that violates its required distinction: External status does not imply hostility or trustworthiness; exchange requires explicit governance.
- **Relationship records:** HAL-REL-0041, HAL-REL-0050
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** External status does not imply hostility or trustworthiness; exchange requires explicit governance.

### HAL-TERM-0117 — Treaty

- **Example:** A dependent artifact cites `HAL-TERM-0117` when it uses **Treaty** with this exact governed meaning: An exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized agreement defining allowed cross-domain identities, data, capabilities, authority, obligations, verification, monitoring, failure behavior, and termination.
- **Counterexample:** A dependent artifact uses **Treaty** in a way that violates its required distinction: Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.
- **Relationship records:** HAL-REL-0041, HAL-REL-0042
- **Lifecycle transitions:** HAL-TRANS-0018, HAL-TRANS-0019, HAL-TRANS-0020
- **Constraint:** Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.

### HAL-TERM-0118 — Constitutional Firewall

- **Example:** A dependent artifact cites `HAL-TERM-0118` when it uses **Constitutional Firewall** with this exact governed meaning: The Book II boundary that mediates and enforces constitutionally governed exchange between HAL and External Trust Domains.
- **Counterexample:** A dependent artifact uses **Constitutional Firewall** in a way that violates its required distinction: It is not merely a network firewall and must not be bypassed by direct integration.
- **Relationship records:** HAL-REL-0042
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not merely a network firewall and must not be bypassed by direct integration.

### HAL-TERM-0119 — Trust Boundary

- **Example:** A dependent artifact cites `HAL-TERM-0119` when it uses **Trust Boundary** with this exact governed meaning: A boundary across which identity, authority, integrity, confidentiality, provenance, or governance assumptions change.
- **Counterexample:** A dependent artifact uses **Trust Boundary** in a way that violates its required distinction: Network adjacency alone does not define or erase a Trust Boundary.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Network adjacency alone does not define or erase a Trust Boundary.

### HAL-TERM-0120 — Data Classification

- **Example:** A dependent artifact cites `HAL-TERM-0120` when it uses **Data Classification** with this exact governed meaning: A governed label determining handling, access, transmission, retention, evidence, and disposal requirements for information.
- **Counterexample:** A dependent artifact uses **Data Classification** in a way that violates its required distinction: Classification is not a purpose or permission to use the data.
- **Relationship records:** HAL-REL-0043
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Classification is not a purpose or permission to use the data.

### HAL-TERM-0121 — Personal Data

- **Example:** A dependent artifact cites `HAL-TERM-0121` when it uses **Personal Data** with this exact governed meaning: Information relating to an identified or reasonably identifiable human under the governing privacy context.
- **Counterexample:** A dependent artifact uses **Personal Data** in a way that violates its required distinction: Pseudonymization may reduce exposure but does not necessarily remove personal-data status.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Pseudonymization may reduce exposure but does not necessarily remove personal-data status.

### HAL-TERM-0122 — Sensitive Data

- **Example:** A dependent artifact cites `HAL-TERM-0122` when it uses **Sensitive Data** with this exact governed meaning: Information whose unauthorized use or disclosure could materially harm a person, HAL, the Owner, security, sovereignty, trust, or protected operations.
- **Counterexample:** A dependent artifact uses **Sensitive Data** in a way that violates its required distinction: Sensitivity is context-dependent and may include non-personal operational data.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Sensitivity is context-dependent and may include non-personal operational data.

### HAL-TERM-0123 — Purpose Limitation

- **Example:** A dependent artifact cites `HAL-TERM-0123` when it uses **Purpose Limitation** with this exact governed meaning: The rule that governed data may be collected, used, shared, and retained only for declared, authorized, compatible purposes.
- **Counterexample:** A dependent artifact uses **Purpose Limitation** in a way that violates its required distinction: Availability or technical usefulness does not establish purpose.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Availability or technical usefulness does not establish purpose.

### HAL-TERM-0124 — Data Minimization

- **Example:** A dependent artifact cites `HAL-TERM-0124` when it uses **Data Minimization** with this exact governed meaning: The rule that only the least data reasonably necessary for an authorized purpose may be collected, processed, retained, and disclosed.
- **Counterexample:** A dependent artifact uses **Data Minimization** in a way that violates its required distinction: Minimization applies to fields, precision, population, duration, access, and derived inferences.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Minimization applies to fields, precision, population, duration, access, and derived inferences.

### HAL-TERM-0125 — Retention Class

- **Example:** A dependent artifact cites `HAL-TERM-0125` when it uses **Retention Class** with this exact governed meaning: A governed category defining retention period, review, legal or constitutional hold behavior, archival, and disposal requirements.
- **Counterexample:** A dependent artifact uses **Retention Class** in a way that violates its required distinction: A Retention Class does not itself authorize collection or access.
- **Relationship records:** HAL-REL-0043
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Retention Class does not itself authorize collection or access.

### HAL-TERM-0126 — Secret

- **Example:** A dependent artifact cites `HAL-TERM-0126` when it uses **Secret** with this exact governed meaning: Confidential material whose disclosure could enable unauthorized access, impersonation, decryption, signing, or protected operation.
- **Counterexample:** A dependent artifact uses **Secret** in a way that violates its required distinction: An Identifier or public key is not a Secret merely because it is security-related.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Identifier or public key is not a Secret merely because it is security-related.

### HAL-TERM-0127 — Cryptographic Key

- **Example:** A dependent artifact cites `HAL-TERM-0127` when it uses **Cryptographic Key** with this exact governed meaning: A governed value used by an approved cryptographic operation and managed through generation, storage, access, rotation, revocation, destruction, and provenance controls.
- **Counterexample:** A dependent artifact uses **Cryptographic Key** in a way that violates its required distinction: A key's possession does not itself establish business Authority.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A key's possession does not itself establish business Authority.

### HAL-TERM-0128 — Security Control

- **Example:** A dependent artifact cites `HAL-TERM-0128` when it uses **Security Control** with this exact governed meaning: A safeguard intended to protect confidentiality, integrity, availability, identity assurance, or system resilience.
- **Counterexample:** A dependent artifact uses **Security Control** in a way that violates its required distinction: A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.

### HAL-TERM-0129 — Authority Control

- **Example:** A dependent artifact cites `HAL-TERM-0129` when it uses **Authority Control** with this exact governed meaning: A safeguard that prevents a Principal, component, or HAL from deciding or acting beyond governed Authority.
- **Counterexample:** A dependent artifact uses **Authority Control** in a way that violates its required distinction: It is not interchangeable with a Security Control, though one mechanism may support both.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not interchangeable with a Security Control, though one mechanism may support both.

### HAL-TERM-0163 — Trust Domain

- **Example:** A dependent artifact cites `HAL-TERM-0163` when it uses **Trust Domain** with this exact governed meaning: A bounded identity, policy, evidence, security, privacy, and accountability context within which trust assumptions and controls are evaluated.
- **Counterexample:** A dependent artifact uses **Trust Domain** in a way that violates its required distinction: Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.
- **Relationship records:** HAL-REL-0050
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.

## Anti-patterns

- **Semantic drift:** redefining a Canonical Term locally without a governed Semantic Change.
- **Authority laundering:** using a definition, alias, schema field, or component name to imply authority not granted by Books I–III.
- **Representation collapse:** treating an entity, its identifier, its record, and its current state as interchangeable.

## Verification

Verify the chapter through source traceability, stable-ID uniqueness, canonical-label uniqueness, circular-definition review, relationship consistency, lifecycle consistency, ambiguity review, schema validation, cross-book impact review, and example/counterexample inspection.

## Change and deprecation

A proposed change MUST include source authority, compatibility classification, dependent-artifact impact, migration guidance, reviewer, effective version, and—when deprecating—a replacement plus sunset condition. Book X maintainers may resolve routine lexical and modeling matters. They MUST escalate only if the change would interpret constitutional philosophy or alter an Owner-reserved matter.

## Review findings

The chapter passed constitutional fidelity, architecture fidelity, engineering fidelity, semantic consistency, clarity, usability, machine-readability, and Owner-threshold review. No unresolved internally correctable issue remains.

## Owner Review items

None.

## Completion status

Complete and approved for Book X v1.0.
