# Local HAL Control Chat

**Authority:** [DR 0038](../../../decisions/0038-local-conversational-owner-control-surface.md)

The Electron app includes a local **HAL Control Chat**. It is a governed
conversation surface, not a terminal emulator. It never accepts arbitrary
commands or grants the UI, Hermes, or a model direct filesystem, shell, secret,
runtime, or network authority.

Supported messages:

```text
status
recommend text
recommend image
matrix text
matrix image
research
refresh folder <registered-id>
deactivate folder <registered-id>
revoke folder <registered-id>
```

The first five are read-only. `research` and folder lifecycle operations create
a proposal. Review it, then type the exact displayed:

```text
approve <proposal-id>
```

HAL records proposed, approved, completed, and blocked events in an
integrity-chained local control journal under ignored HAL local state. The
underlying existing governed command performs its own validation and remains
authoritative for the operation. Unsupported text and expired/unknown approvals
fail closed.
