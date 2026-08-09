# HAL Book IX Project Instructions

Book I is the supreme constitutional authority. Book II is the authoritative architecture. Book III defines mandatory engineering standards. Book IV defines component responsibilities and logical interfaces. Book X supplies canonical terminology.

Book IX defines normative machine-facing contracts. It MUST NOT reinterpret Book I, redesign Book II, alter Book IV ownership or responsibilities, or redefine Book X terms.

Every contract MUST identify its Book IV logical-interface source and define:
- provider and authorized consumer class;
- interaction kind and transport-neutral semantics;
- request, response, event, or stream schema;
- identity, authentication, authority-context, Treaty, and purpose requirements;
- correlation, causation, provenance, time, freshness, and ordering;
- idempotency, replay, duplicate, retry, timeout, and cancellation behavior;
- success, denial, error, and partial-result semantics;
- classification, privacy, redaction, and evidence rules;
- limits, compatibility, versioning, deprecation, and conformance tests.

Schemas are canonical contract artifacts only when they pass validation and agree with the prose standard. Unknown or incompatible schemas MUST be rejected or routed through an explicitly approved compatibility adapter; implementations MUST NOT guess semantics.

External-domain exchange MUST require an active applicable Treaty and Constitutional Firewall admission. Capability approval and Treaty approval remain distinct. Credentials, possession of data, or network reachability never confer authority.

Maintain durable planning, traceability, contract catalogs, review records, validation evidence, and source integrity records. Resolve routine protocol decisions without Owner escalation. Raise Owner Review only for genuine constitutional interpretation, Owner authority, new capability or Treaty classes, substantial irreversible risk, constitutional invariants, major human-value conflicts, or evidence-insoluble stewardship choices.

Do not claim completion while a Book IV logical interface is unmapped, a normative schema is invalid, a critical authority or failure path is unspecified, or a required artifact has not been inspected.
