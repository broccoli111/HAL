import path from "node:path";

/**
 * Exact Owner-approved source and derived-pack locations for DR 0029.
 * This is deliberately not configurable by a runtime, request, or model.
 */
export const PERSONAL_DOCUMENT_PILOT_SOURCE_DIRECTORY =
  "/Users/rosslauda/Desktop/HAL_doc_ref" as const;
export const PERSONAL_DOCUMENT_PILOT_SOURCE_FILE = "HAL_reference.txt" as const;
export const PERSONAL_DOCUMENT_PILOT_SOURCE_PATH = path.join(
  PERSONAL_DOCUMENT_PILOT_SOURCE_DIRECTORY,
  PERSONAL_DOCUMENT_PILOT_SOURCE_FILE
);
export const PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY = path.join(
  PERSONAL_DOCUMENT_PILOT_SOURCE_DIRECTORY,
  ".hal-m9-personal-document-pilot"
);

export const M9_PERSONAL_DOCUMENT_PILOT_PACK_ID = "personal_document_pilot_v1" as const;
export const M9_PERSONAL_DOCUMENT_PILOT_PACK_CLASSIFICATION =
  "owner_approved_local_document_pilot" as const;
export const M9_PERSONAL_DOCUMENT_PILOT_PROVENANCE_CLASSIFICATION =
  "owner_approved_local_document" as const;

export function isPersonalDocumentPilotPackId(packId: string): boolean {
  return packId === M9_PERSONAL_DOCUMENT_PILOT_PACK_ID;
}
