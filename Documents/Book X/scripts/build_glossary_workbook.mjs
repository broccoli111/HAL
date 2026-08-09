import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root = new URL("..", import.meta.url);
const termsDoc = JSON.parse(await fs.readFile(new URL("../schemas/book_x_terms.json", import.meta.url), "utf8"));
const relationshipsDoc = JSON.parse(await fs.readFile(new URL("../schemas/book_x_relationships.json", import.meta.url), "utf8"));
const lifecycleText = await fs.readFile(new URL("../model/LIFECYCLE_STATE_REGISTER.md", import.meta.url), "utf8");
const ambiguityText = await fs.readFile(new URL("../model/AMBIGUOUS_AND_FORBIDDEN_TERMS.md", import.meta.url), "utf8");
const acronymText = await fs.readFile(new URL("../model/ACRONYM_REGISTER.md", import.meta.url), "utf8");

function markdownRows(text, columns) {
  return text.split("\n")
    .filter((line) => line.startsWith("|") && !line.includes("---"))
    .map((line) => line.split("|").slice(1, -1).map((v) => v.trim()))
    .filter((row) => row.length === columns);
}

const lifecycleRows = markdownRows(lifecycleText, 6);
const ambiguityRows = markdownRows(ambiguityText, 3);
const acronymRows = markdownRows(acronymText, 3);

const wb = Workbook.create();
const summary = wb.worksheets.add("Summary");
const terms = wb.worksheets.add("Terms");
const evidence = wb.worksheets.add("Term Evidence");
const relations = wb.worksheets.add("Relationships");
const lifecycles = wb.worksheets.add("Lifecycles");
const language = wb.worksheets.add("Language Controls");
for (const sheet of [summary, terms, evidence, relations, lifecycles, language]) sheet.showGridLines = false;

const navy = "#17365D";
const blue = "#D9EAF7";
const pale = "#F4F7FA";
const ink = "#1F2937";
const muted = "#5B6573";
const line = "#D7DEE8";

summary.getRange("A1:F2").merge();
summary.getRange("A1").values = [["HAL Book X — Canonical Terminology and Information Model"]];
summary.getRange("A1:F2").format = {fill: navy, font: {bold: true, color: "#FFFFFF", size: 18}, verticalAlignment: "center"};
summary.getRange("A4:B9").values = [
  ["Metric", "Value"],
  ["Status", "Final v1.0"],
  ["Approved canonical terms", termsDoc.terms.length],
  ["Typed relationships", relationshipsDoc.relationships.length],
  ["Lifecycle transitions", lifecycleRows.length - 1],
  ["Open Owner Review items", 0],
];
summary.getRange("A4:B4").format = {fill: blue, font: {bold: true, color: navy}};
summary.getRange("A4:B9").format.borders = {preset: "insideHorizontal", style: "thin", color: line};
summary.getRange("A11:F11").merge();
summary.getRange("A11").values = [["Authority: Book I is supreme. Book II is authoritative. Book III governs engineering. Book X fixes shared meaning without changing them."]];
summary.getRange("A11:F11").format = {fill: pale, font: {italic: true, color: ink}, wrapText: true};
summary.getRange("A13:F18").values = [
  ["Workbook guide", "", "", "", "", ""],
  ["Terms", "Canonical IDs, labels, definitions, distinctions, sources, and status", "", "", "", ""],
  ["Term Evidence", "Per-term examples, counterexamples, constraints, relationships, and lifecycle references", "", "", "", ""],
  ["Relationships", "Typed semantic relations, cardinality, and constraints", "", "", "", ""],
  ["Lifecycles", "Governed transitions, entry conditions, and required evidence", "", "", "", ""],
  ["Language Controls", "Acronyms plus forbidden or qualification-required usages", "", "", "", ""],
];
summary.getRange("A13:F13").merge();
summary.getRange("A13:F13").format = {fill: blue, font: {bold: true, color: navy}};
for (let r = 14; r <= 18; r++) summary.getRange(`B${r}:F${r}`).merge();
summary.getRange("A13:F18").format.borders = {preset: "insideHorizontal", style: "thin", color: line};
summary.getRange("A:A").format.columnWidth = 28;
summary.getRange("B:F").format.columnWidth = 18;
summary.getRange("A1:F18").format.wrapText = true;

const termHeaders = ["Term ID","Canonical Label","Chapter","Category","Semantic Type","Definition","Required Distinction","Allowed Aliases","Status","Book I Source","Book II Source","Book III Source","Source Basis","Introduced"];
const termRows = termsDoc.terms.map((t) => [
  t.term_id, t.canonical_label, t.chapter, t.category, t.semantic_type, t.definition, t.distinction,
  t.allowed_aliases.join("; "), t.status, t.book_i_source, t.book_ii_source, t.book_iii_source, t.source_basis, t.version_introduced,
]);
terms.getRangeByIndexes(0, 0, termRows.length + 1, termHeaders.length).values = [termHeaders, ...termRows];
terms.getRange(`A1:N1`).format = {fill: navy, font: {bold: true, color: "#FFFFFF"}, wrapText: true};
terms.getRange(`A2:N${termRows.length + 1}`).format = {font: {size: 9, color: ink}, wrapText: true};
terms.getRange(`A1:N${termRows.length + 1}`).format.borders = {preset: "insideHorizontal", style: "thin", color: line};
for (const [col, width] of Object.entries({A:16,B:26,C:9,D:18,E:24,F:56,G:56,H:22,I:12,J:34,K:34,L:30,M:34,N:11})) {
  terms.getRange(`${col}:${col}`).format.columnWidth = width;
}
terms.freezePanes.freezeRows(1);
terms.freezePanes.freezeColumns(2);
terms.tables.add(`A1:N${termRows.length + 1}`, true, "CanonicalTermsTable").style = "TableStyleMedium2";

const evidenceHeaders = ["Term ID","Canonical Label","Example","Counterexample","Relationship IDs","Lifecycle Transition IDs","Constraints"];
const evidenceRows = termsDoc.terms.map((t) => [
  t.term_id, t.canonical_label, t.examples.join("; "), t.counterexamples.join("; "),
  t.relationship_ids.join("; ") || "None registered",
  t.lifecycle_transition_ids.join("; ") || "None registered",
  t.constraints.join("; "),
]);
evidence.getRangeByIndexes(0,0,evidenceRows.length + 1,evidenceHeaders.length).values=[evidenceHeaders,...evidenceRows];
evidence.getRange(`A1:G1`).format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
evidence.getRange(`A2:G${evidenceRows.length+1}`).format={font:{size:9,color:ink},wrapText:true};
evidence.getRange(`A1:G${evidenceRows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:18,B:28,C:60,D:60,E:28,F:28,G:60})) evidence.getRange(`${col}:${col}`).format.columnWidth=width;
evidence.freezePanes.freezeRows(1);
evidence.freezePanes.freezeColumns(2);
evidence.tables.add(`A1:G${evidenceRows.length+1}`,true,"TermEvidenceTable").style="TableStyleMedium2";

const relHeaders = ["Relationship ID","Source","Predicate","Target","Source Cardinality","Target Cardinality","Constraint"];
const relRows = relationshipsDoc.relationships.map((r) => [r.relationship_id,r.source,r.predicate,r.target,r.source_cardinality,r.target_cardinality,r.constraint]);
relations.getRangeByIndexes(0,0,relRows.length + 1,relHeaders.length).values = [relHeaders,...relRows];
relations.getRange(`A1:G1`).format = {fill: navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
relations.getRange(`A2:G${relRows.length+1}`).format = {font:{size:9,color:ink},wrapText:true};
relations.getRange(`A1:G${relRows.length+1}`).format.borders = {preset:"insideHorizontal",style:"thin",color:line};
for (const [col,width] of Object.entries({A:18,B:25,C:24,D:25,E:17,F:17,G:52})) relations.getRange(`${col}:${col}`).format.columnWidth=width;
relations.freezePanes.freezeRows(1);
relations.tables.add(`A1:G${relRows.length+1}`,true,"SemanticRelationshipsTable").style="TableStyleMedium2";

lifecycles.getRangeByIndexes(0,0,lifecycleRows.length,6).values=lifecycleRows;
lifecycles.getRange("A1:F1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
lifecycles.getRange(`A2:F${lifecycleRows.length}`).format={font:{size:9,color:ink},wrapText:true};
lifecycles.getRange(`A1:F${lifecycleRows.length}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:19,B:24,C:18,D:18,E:46,F:38})) lifecycles.getRange(`${col}:${col}`).format.columnWidth=width;
lifecycles.freezePanes.freezeRows(1);
lifecycles.tables.add(`A1:F${lifecycleRows.length}`,true,"LifecycleTransitionsTable").style="TableStyleMedium2";

language.getRange("A1:F1").merge();
language.getRange("A1").values=[["Approved Acronyms"]];
language.getRange("A1:F1").format={fill:navy,font:{bold:true,color:"#FFFFFF",size:14}};
language.getRangeByIndexes(2,0,acronymRows.length,3).values=acronymRows;
language.getRange(`A3:C3`).format={fill:blue,font:{bold:true,color:navy}};
language.getRange(`A3:C${acronymRows.length+2}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
const ambiguityStart=acronymRows.length+5;
language.getRange(`A${ambiguityStart}:F${ambiguityStart}`).merge();
language.getRange(`A${ambiguityStart}`).values=[["Forbidden or Qualification-Required Usages"]];
language.getRange(`A${ambiguityStart}:F${ambiguityStart}`).format={fill:navy,font:{bold:true,color:"#FFFFFF",size:14}};
language.getRangeByIndexes(ambiguityStart+1,0,ambiguityRows.length,3).values=ambiguityRows;
language.getRange(`A${ambiguityStart+2}:C${ambiguityStart+2}`).format={fill:blue,font:{bold:true,color:navy}};
language.getRange(`A${ambiguityStart+2}:C${ambiguityStart+ambiguityRows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
language.getRange("A:A").format.columnWidth=25;
language.getRange("B:B").format.columnWidth=62;
language.getRange("C:C").format.columnWidth=55;
language.getRange(`A1:C${ambiguityStart+ambiguityRows.length+1}`).format.wrapText=true;

const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(fileURLToPath(new URL("../deliverables/HAL_BOOK_X_GLOSSARY_AND_INFORMATION_MODEL.xlsx", import.meta.url)));

const previewDir = new URL("../tmp/workbook-previews/", import.meta.url);
await fs.mkdir(previewDir, {recursive:true});
for (const [sheetName, range] of [
  ["Summary","A1:F18"],
  ["Terms","A1:N12"],
  ["Term Evidence","A1:G10"],
  ["Relationships","A1:G14"],
  ["Lifecycles","A1:F15"],
  ["Language Controls",`A1:C${ambiguityStart+ambiguityRows.length+1}`],
]) {
  const preview = await wb.render({sheetName, range, scale:1, format:"png"});
  const filename = sheetName.toLowerCase().replaceAll(" ","_") + ".png";
  await fs.writeFile(fileURLToPath(new URL(filename, previewDir)), new Uint8Array(await preview.arrayBuffer()));
}

console.log(JSON.stringify({workbook:"HAL_BOOK_X_GLOSSARY_AND_INFORMATION_MODEL.xlsx",sheets:6,terms:termsDoc.terms.length,relationships:relationshipsDoc.relationships.length,lifecycles:lifecycleRows.length-1}));
