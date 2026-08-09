import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
import { fileURLToPath } from "node:url";

const path = new URL("../deliverables/HAL_BOOK_X_GLOSSARY_AND_INFORMATION_MODEL.xlsx", import.meta.url);
const blob = await FileBlob.load(fileURLToPath(path));
const wb = await SpreadsheetFile.importXlsx(blob);
const summary = await wb.inspect({
  kind: "sheet,table",
  include: "id,name,values",
  maxChars: 12000,
  tableMaxRows: 5,
  tableMaxCols: 13,
  tableMaxCellChars: 100,
});
const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: {useRegex: true, maxResults: 100},
  maxChars: 3000,
});
console.log(summary.ndjson);
console.log("FORMULA_ERROR_SCAN");
console.log(errors.ndjson);
