import { randomUUID } from "node:crypto";

export type DesktopControlOperation =
  | "status"
  | "recommend_text"
  | "recommend_image"
  | "matrix_text"
  | "matrix_image"
  | "research"
  | "refresh_folder"
  | "deactivate_folder"
  | "revoke_folder";

export type DesktopControlProposal = Readonly<{
  proposalId: string;
  operation: DesktopControlOperation;
  args: readonly string[];
  consequential: boolean;
  summary: string;
}>;

export type DesktopControlResult = Readonly<{
  result: "completed" | "approval_required" | "blocked";
  response: string;
  proposal?: DesktopControlProposal;
  reasonCode?: string;
}>;

export type DesktopControlDispatcher = (
  // eslint-disable-next-line no-unused-vars
  proposal: DesktopControlProposal
) => Promise<string>;
export type DesktopControlRecorder = (
  // eslint-disable-next-line no-unused-vars
  event: {
    eventType: "proposed" | "approved" | "completed" | "blocked";
    proposal: DesktopControlProposal;
    reasonCode?: string;
  }
) => void;

function blocked(reasonCode: string): DesktopControlResult {
  return Object.freeze({ result: "blocked", response: "", reasonCode });
}

function parseIntent(value: string): Omit<DesktopControlProposal, "proposalId"> | undefined {
  const normalized = value.trim().replace(/\s+/g, " ").toLowerCase();
  const simple: Readonly<Record<string, readonly [DesktopControlOperation, boolean, string]>> = {
    status: ["status", false, "Read HAL local status."],
    "recommend text": ["recommend_text", false, "Recommend a local text model."],
    "recommend image": ["recommend_image", false, "Recommend a local image model."],
    "matrix text": ["matrix_text", false, "Show the text model evidence matrix."],
    "matrix image": ["matrix_image", false, "Show the image model evidence matrix."],
    research: ["research", true, "Retrieve the fixed official model-planning sources."]
  };
  const matched = simple[normalized];
  if (matched)
    return {
      operation: matched[0],
      args: Object.freeze([]),
      consequential: matched[1],
      summary: matched[2]
    };
  const folder = /^(refresh|deactivate|revoke) folder ([a-z][a-z0-9_-]{2,63})$/.exec(normalized);
  if (!folder) return undefined;
  const operation = `${folder[1]}_folder` as DesktopControlOperation;
  return {
    operation,
    args: Object.freeze([folder[2]!]),
    consequential: true,
    summary: `${folder[1]} registered folder ${folder[2]}.`
  };
}

/** HAL-owned two-step conversational control gate; no terminal grammar is accepted. */
export function createDesktopControlChat(input: {
  dispatch: DesktopControlDispatcher;
  record: DesktopControlRecorder;
}): (
  // eslint-disable-next-line no-unused-vars
  message: string
) => Promise<DesktopControlResult> {
  const pending = new Map<string, DesktopControlProposal>();
  return async (message) => {
    const approval = /^approve ([0-9a-f-]{36})$/i.exec(message.trim());
    if (approval) {
      const proposal = pending.get(approval[1]!);
      if (!proposal) return blocked("unknown_or_expired_proposal");
      pending.delete(proposal.proposalId);
      input.record({ eventType: "approved", proposal });
      try {
        const response = await input.dispatch(proposal);
        input.record({ eventType: "completed", proposal });
        return Object.freeze({ result: "completed", response });
      } catch {
        input.record({ eventType: "blocked", proposal, reasonCode: "control_operation_failed" });
        return blocked("control_operation_failed");
      }
    }
    const intent = parseIntent(message);
    if (!intent) return blocked("unsupported_control_intent");
    const proposal = Object.freeze({ ...intent, proposalId: randomUUID() });
    input.record({ eventType: "proposed", proposal });
    if (!proposal.consequential) {
      try {
        const response = await input.dispatch(proposal);
        input.record({ eventType: "completed", proposal });
        return Object.freeze({ result: "completed", response });
      } catch {
        input.record({ eventType: "blocked", proposal, reasonCode: "control_operation_failed" });
        return blocked("control_operation_failed");
      }
    }
    pending.set(proposal.proposalId, proposal);
    return Object.freeze({
      result: "approval_required",
      response: `Approval required: ${proposal.summary}`,
      proposal
    });
  };
}
