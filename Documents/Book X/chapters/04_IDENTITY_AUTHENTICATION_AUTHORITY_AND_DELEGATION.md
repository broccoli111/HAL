# Chapter 4 — Identity, Authentication, Authority, and Delegation

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Separates identity, identifiers, authentication, trust, permission, authority, delegation, policy decisions, and protected action.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I Decisions 5, 6, 25, 26, 27, and 48.
- **Book II:** Book II Chapters 04, 05, 18, 20, 21, and 26.
- **Book III:** Book III Chapters 03, 05, 06, and 08.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Identity, Authentication, Trust, Permission, Authority, Delegation, Capability, and Credential MUST remain separate semantic concepts.
2. Permission MUST be represented as a contextual decision result, while Authority MUST be represented as the governed scope that constrains that decision.
3. Trust MUST NOT grant Authority, and Capability MUST NOT imply Permission.
4. A Delegation MUST be attributable, scoped, conditional, expiring, revocable, and bounded by the delegator's Authority.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0031 | Identity | Governed entity identity | The durable governed identity by which HAL recognizes a human, device, service, sensor, agent, node, or subsystem as the same entity across time. | Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence. |
| HAL-TERM-0032 | Principal | Governed actor role | An Identity that may be the subject of authentication, policy evaluation, authority, delegation, accountability, or action attribution. | Principal status does not itself grant authority. |
| HAL-TERM-0033 | Identity Record | Authoritative record | The authoritative governed state representing an Identity, including its immutable identity reference, type, lifecycle, handles, relationships, and source-approved metadata. | The record represents an Identity but is not interchangeable with the Identity. |
| HAL-TERM-0034 | Identifier | Reference value | A value used to reference an Identity or another entity within a declared namespace and lifecycle. | Possession or presentation of an Identifier does not authenticate identity or grant authority. |
| HAL-TERM-0035 | Identity Attribute | Governed descriptive value | A property, assertion, or governed fact associated with an Identity and qualified by source, time, and confidence where applicable. | An attribute is not the Identity and does not independently establish authentication, trust, or authority. |
| HAL-TERM-0036 | Credential | Authentication instrument | A governed secret, key, token, certificate, biometric template, or other instrument used in an authentication protocol. | Credential possession is evidence, not identity, trust, permission, or authority by itself. |
| HAL-TERM-0037 | Authentication | Assurance process and result | The evidence-based process and resulting confidence that a claimed Identity is presently genuine in a specified context. | Authentication answers who or what is present; it does not answer what action is allowed. |
| HAL-TERM-0038 | Authentication Evidence | Evidence role | One or more Evidence Objects used to assess whether a claimed Identity is presently genuine. | Authentication Evidence informs assurance but does not itself grant authority. |
| HAL-TERM-0039 | Trust | Evidence-based assessment | Multidimensional, domain-specific confidence derived from evidence about an entity, claim, process, or relationship. | Trust may inform decisions but must not be treated as authority or permission. |
| HAL-TERM-0040 | Permission | Decision result | A scoped result of authoritative policy evaluation allowing a specified Principal to attempt a specified operation under stated context and conditions. | Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession. |
| HAL-TERM-0041 | Authority | Governed decision and action scope | The constitutionally and policy-governed scope within which a Principal may decide or cause action. | Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials. |
| HAL-TERM-0042 | Delegation | Governed authority grant | An attributable, scoped, conditional, expiring, and revocable grant of Authority from an authorized delegator to a recipient. | A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable. |
| HAL-TERM-0043 | Policy | Decision rule set | A governed set of rules evaluated against identity, authority, delegation, purpose, context, resource, and risk inputs. | A Policy is not itself a decision and cannot outrank its Normative Source. |
| HAL-TERM-0044 | Policy Decision Record | Decision record | The attributable record of a policy evaluation, including inputs, governing policy version, outcome, obligations, reason, and correlation data. | It records a decision; it does not create standing Authority beyond that decision's scope. |
| HAL-TERM-0045 | Protected Action | Risk classification | An Action whose authority, privacy, security, safety, irreversibility, or constitutional impact requires explicit governed evaluation and evidence. | A routine implementation detail is not protected merely because it is technically complex. |
| HAL-TERM-0164 | Owner Authorization Ceremony | Protected authorization mechanism | The Book II-governed mechanism through which the Owner authorizes an exact protected change, capability-class decision, Treaty, or other Owner-reserved matter bound to an immutable decision identifier, declared scope, and validity period. | It is not conversational consent, ordinary Delegation, reusable standing permission, or a substitute for Constitutional Kernel validation; it authorizes only the exact recorded matter. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0031 — Identity

- **Example:** A dependent artifact cites `HAL-TERM-0031` when it uses **Identity** with this exact governed meaning: The durable governed identity by which HAL recognizes a human, device, service, sensor, agent, node, or subsystem as the same entity across time.
- **Counterexample:** A dependent artifact uses **Identity** in a way that violates its required distinction: Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.
- **Relationship records:** HAL-REL-0007, HAL-REL-0008, HAL-REL-0009
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.

### HAL-TERM-0032 — Principal

- **Example:** A dependent artifact cites `HAL-TERM-0032` when it uses **Principal** with this exact governed meaning: An Identity that may be the subject of authentication, policy evaluation, authority, delegation, accountability, or action attribution.
- **Counterexample:** A dependent artifact uses **Principal** in a way that violates its required distinction: Principal status does not itself grant authority.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Principal status does not itself grant authority.

### HAL-TERM-0033 — Identity Record

- **Example:** A dependent artifact cites `HAL-TERM-0033` when it uses **Identity Record** with this exact governed meaning: The authoritative governed state representing an Identity, including its immutable identity reference, type, lifecycle, handles, relationships, and source-approved metadata.
- **Counterexample:** A dependent artifact uses **Identity Record** in a way that violates its required distinction: The record represents an Identity but is not interchangeable with the Identity.
- **Relationship records:** HAL-REL-0007
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** The record represents an Identity but is not interchangeable with the Identity.

### HAL-TERM-0034 — Identifier

- **Example:** A dependent artifact cites `HAL-TERM-0034` when it uses **Identifier** with this exact governed meaning: A value used to reference an Identity or another entity within a declared namespace and lifecycle.
- **Counterexample:** A dependent artifact uses **Identifier** in a way that violates its required distinction: Possession or presentation of an Identifier does not authenticate identity or grant authority.
- **Relationship records:** HAL-REL-0008
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Possession or presentation of an Identifier does not authenticate identity or grant authority.

### HAL-TERM-0035 — Identity Attribute

- **Example:** A dependent artifact cites `HAL-TERM-0035` when it uses **Identity Attribute** with this exact governed meaning: A property, assertion, or governed fact associated with an Identity and qualified by source, time, and confidence where applicable.
- **Counterexample:** A dependent artifact uses **Identity Attribute** in a way that violates its required distinction: An attribute is not the Identity and does not independently establish authentication, trust, or authority.
- **Relationship records:** HAL-REL-0009
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An attribute is not the Identity and does not independently establish authentication, trust, or authority.

### HAL-TERM-0036 — Credential

- **Example:** A dependent artifact cites `HAL-TERM-0036` when it uses **Credential** with this exact governed meaning: A governed secret, key, token, certificate, biometric template, or other instrument used in an authentication protocol.
- **Counterexample:** A dependent artifact uses **Credential** in a way that violates its required distinction: Credential possession is evidence, not identity, trust, permission, or authority by itself.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Credential possession is evidence, not identity, trust, permission, or authority by itself.

### HAL-TERM-0037 — Authentication

- **Example:** A dependent artifact cites `HAL-TERM-0037` when it uses **Authentication** with this exact governed meaning: The evidence-based process and resulting confidence that a claimed Identity is presently genuine in a specified context.
- **Counterexample:** A dependent artifact uses **Authentication** in a way that violates its required distinction: Authentication answers who or what is present; it does not answer what action is allowed.
- **Relationship records:** HAL-REL-0010
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Authentication answers who or what is present; it does not answer what action is allowed.

### HAL-TERM-0038 — Authentication Evidence

- **Example:** A dependent artifact cites `HAL-TERM-0038` when it uses **Authentication Evidence** with this exact governed meaning: One or more Evidence Objects used to assess whether a claimed Identity is presently genuine.
- **Counterexample:** A dependent artifact uses **Authentication Evidence** in a way that violates its required distinction: Authentication Evidence informs assurance but does not itself grant authority.
- **Relationship records:** HAL-REL-0010
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Authentication Evidence informs assurance but does not itself grant authority.

### HAL-TERM-0039 — Trust

- **Example:** A dependent artifact cites `HAL-TERM-0039` when it uses **Trust** with this exact governed meaning: Multidimensional, domain-specific confidence derived from evidence about an entity, claim, process, or relationship.
- **Counterexample:** A dependent artifact uses **Trust** in a way that violates its required distinction: Trust may inform decisions but must not be treated as authority or permission.
- **Relationship records:** HAL-REL-0014
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Trust may inform decisions but must not be treated as authority or permission.

### HAL-TERM-0040 — Permission

- **Example:** A dependent artifact cites `HAL-TERM-0040` when it uses **Permission** with this exact governed meaning: A scoped result of authoritative policy evaluation allowing a specified Principal to attempt a specified operation under stated context and conditions.
- **Counterexample:** A dependent artifact uses **Permission** in a way that violates its required distinction: Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.
- **Relationship records:** HAL-REL-0012, HAL-REL-0013
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.

### HAL-TERM-0041 — Authority

- **Example:** A dependent artifact cites `HAL-TERM-0041` when it uses **Authority** with this exact governed meaning: The constitutionally and policy-governed scope within which a Principal may decide or cause action.
- **Counterexample:** A dependent artifact uses **Authority** in a way that violates its required distinction: Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.
- **Relationship records:** HAL-REL-0011, HAL-REL-0013
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.

### HAL-TERM-0042 — Delegation

- **Example:** A dependent artifact cites `HAL-TERM-0042` when it uses **Delegation** with this exact governed meaning: An attributable, scoped, conditional, expiring, and revocable grant of Authority from an authorized delegator to a recipient.
- **Counterexample:** A dependent artifact uses **Delegation** in a way that violates its required distinction: A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.
- **Relationship records:** HAL-REL-0011
- **Lifecycle transitions:** HAL-TRANS-0005, HAL-TRANS-0006, HAL-TRANS-0007
- **Constraint:** A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.

### HAL-TERM-0043 — Policy

- **Example:** A dependent artifact cites `HAL-TERM-0043` when it uses **Policy** with this exact governed meaning: A governed set of rules evaluated against identity, authority, delegation, purpose, context, resource, and risk inputs.
- **Counterexample:** A dependent artifact uses **Policy** in a way that violates its required distinction: A Policy is not itself a decision and cannot outrank its Normative Source.
- **Relationship records:** HAL-REL-0012
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Policy is not itself a decision and cannot outrank its Normative Source.

### HAL-TERM-0044 — Policy Decision Record

- **Example:** A dependent artifact cites `HAL-TERM-0044` when it uses **Policy Decision Record** with this exact governed meaning: The attributable record of a policy evaluation, including inputs, governing policy version, outcome, obligations, reason, and correlation data.
- **Counterexample:** A dependent artifact uses **Policy Decision Record** in a way that violates its required distinction: It records a decision; it does not create standing Authority beyond that decision's scope.
- **Relationship records:** HAL-REL-0014
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It records a decision; it does not create standing Authority beyond that decision's scope.

### HAL-TERM-0045 — Protected Action

- **Example:** A dependent artifact cites `HAL-TERM-0045` when it uses **Protected Action** with this exact governed meaning: An Action whose authority, privacy, security, safety, irreversibility, or constitutional impact requires explicit governed evaluation and evidence.
- **Counterexample:** A dependent artifact uses **Protected Action** in a way that violates its required distinction: A routine implementation detail is not protected merely because it is technically complex.
- **Relationship records:** HAL-REL-0052
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A routine implementation detail is not protected merely because it is technically complex.

### HAL-TERM-0164 — Owner Authorization Ceremony

- **Example:** The Owner authorizes Treaty `TRT-2048` through a ceremony record bound to that exact immutable Treaty digest, scope, activation window, and decision identifier.
- **Counterexample:** A chat message saying “I approve future treaties with this partner” is treated as a reusable Owner authorization.
- **Relationship records:** HAL-REL-0051, HAL-REL-0052
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not conversational consent, ordinary Delegation, reusable standing permission, or a substitute for Constitutional Kernel validation; it authorizes only the exact recorded matter.

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
