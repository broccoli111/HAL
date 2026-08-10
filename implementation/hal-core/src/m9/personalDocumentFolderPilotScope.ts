import path from "node:path";

/** Exact Owner-approved DR 0030 direct-folder source scope; never runtime-configurable. */
export const PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY =
  "/Users/rosslauda/Desktop/HAL_doc_ref" as const;
export const PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY = path.join(
  PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY,
  ".hal-m9-personal-document-folder-pilot"
);
export const M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_ID =
  "personal_document_folder_pilot_v1" as const;
export const M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_CLASSIFICATION =
  "owner_approved_local_document_folder_pilot" as const;
export const M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PROVENANCE_CLASSIFICATION =
  "owner_approved_local_document" as const;
export const PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_FILES = 32 as const;
export const PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_FILE_BYTES = 8_192 as const;
export const PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_TOTAL_BYTES = 131_072 as const;
export const PERSONAL_DOCUMENT_FOLDER_PILOT_ALLOWED_EXTENSIONS = Object.freeze([".md", ".txt"]);

export function isPersonalDocumentFolderPilotPackId(packId: string): boolean {
  return packId === M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_ID;
}
