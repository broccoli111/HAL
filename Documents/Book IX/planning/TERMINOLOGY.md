# Terminology Rules

Book X terms are used with their canonical meanings. Book IX may define protocol-field and serialization terms but MUST NOT promote those implementation terms into canon-wide semantics.

- **Command:** request to attempt an authorized state transition or effect.
- **Query:** non-mutating request for an authorized representation of state.
- **Event:** immutable assertion that a completed fact occurred.
- **Stream:** ordered, bounded or explicitly long-lived sequence with declared cursor and backpressure semantics.
- **Contract:** versioned machine-facing agreement for an interaction.
- **Envelope:** common metadata surrounding a typed payload.
- **Authority context:** signed or integrity-protected references and constraints proving who may request what, for which purpose, under which delegation and policy.
- **Treaty context:** reference to an active, applicable, signed Treaty decision; it does not replace authority or capability approval.
