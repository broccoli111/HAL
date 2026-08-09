import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root = new URL("..", import.meta.url);
const catalog = JSON.parse(await fs.readFile(new URL("../schemas/book_iv_components.json", import.meta.url), "utf8"));
const requirementsDoc = JSON.parse(await fs.readFile(new URL("../schemas/book_iv_requirements.json", import.meta.url), "utf8"));
const interfacesDoc = JSON.parse(await fs.readFile(new URL("../schemas/book_iv_interfaces.json", import.meta.url), "utf8"));
const testsDoc = JSON.parse(await fs.readFile(new URL("../schemas/book_iv_conformance_tests.json", import.meta.url), "utf8"));

const ownershipText = await fs.readFile(new URL("../traceability/COMPONENT_OWNERSHIP_MATRIX.md", import.meta.url), "utf8");
const coverageText = await fs.readFile(new URL("../traceability/COVERAGE_REPORT.md", import.meta.url), "utf8");
function markdownRows(text, columns) {
  return text.split("\n").filter((line) => line.startsWith("|") && !line.includes("---"))
    .map((line) => line.split("|").slice(1, -1).map((value) => value.trim()))
    .filter((row) => row.length === columns);
}
const ownershipRows = markdownRows(ownershipText, 5);
const coverageRows = markdownRows(coverageText, 3);

const wb = Workbook.create();
const summary = wb.worksheets.add("Summary");
const components = wb.worksheets.add("Components");
const ownership = wb.worksheets.add("State Ownership");
const interfaces = wb.worksheets.add("Interfaces");
const requirements = wb.worksheets.add("Requirements");
const conformance = wb.worksheets.add("Conformance");
const coverage = wb.worksheets.add("Book II Coverage");
for (const sheet of [summary, components, ownership, interfaces, requirements, conformance, coverage]) sheet.showGridLines = false;

const navy = "#17365D";
const blue = "#D9EAF7";
const pale = "#F4F7FA";
const ink = "#1F2937";
const line = "#D7DEE8";
const gold = "#7A5A00";

summary.getRange("A1:F2").merge();
summary.getRange("A1").values = [["HAL Book IV - Component Specifications"]];
summary.getRange("A1:F2").format = { fill: navy, font: { bold: true, color: "#FFFFFF", size: 18 }, verticalAlignment: "center" };
summary.getRange("A4:B10").values = [
  ["Metric", "Value"], ["Status", "Final v1.0"], ["Components", null], ["Numbered requirements", null],
  ["Logical interfaces", null], ["Authoritative state domains", null], ["Conformance tests", null],
];
summary.getRange("B6").formulas = [["=COUNTA('Components'!A2:A30)"]];
summary.getRange("B7").formulas = [[`=COUNTA('Requirements'!A2:A${requirementsDoc.requirements.length + 1})`]];
summary.getRange("B8").formulas = [[`=COUNTA('Interfaces'!A2:A${interfacesDoc.interfaces.length + 1})`]];
summary.getRange("B9").formulas = [[`=COUNTA('State Ownership'!A2:A${ownershipRows.length})`]];
summary.getRange("B10").formulas = [[`=COUNTA('Conformance'!A2:A${testsDoc.tests.length + 1})`]];
summary.getRange("A4:B4").format = { fill: blue, font: { bold: true, color: navy } };
summary.getRange("A4:B10").format.borders = { preset: "insideHorizontal", style: "thin", color: line };
summary.getRange("A12:F12").merge();
summary.getRange("A12").values = [["Authority: Book I is supreme. Book II is authoritative. Book III governs engineering. Book X governs shared meaning. Book IV defines component obligations and defers wire contracts to Book IX."]];
summary.getRange("A12:F12").format = { fill: pale, font: { italic: true, color: ink }, wrapText: true };
summary.getRange("A14:F21").values = [
  ["Workbook guide", "", "", "", "", ""],
  ["Components", "Component boundaries, source basis, scope, state, interfaces, requirements, tests, and status", "", "", "", ""],
  ["State Ownership", "Exactly one mutation owner for every authoritative state domain", "", "", "", ""],
  ["Interfaces", "Logical commands, queries, events, semantic obligations, and Book IX handoffs", "", "", "", ""],
  ["Requirements", "Numbered normative requirements with Books I-III and Book X traceability", "", "", "", ""],
  ["Conformance", "Executable test intent and required evidence", "", "", "", ""],
  ["Book II Coverage", "All 35 architecture chapters mapped into the component family", "", "", "", ""],
  ["Owner Review", "No open item", "", "", "", ""],
];
summary.getRange("A14:F14").merge();
summary.getRange("A14:F14").format = { fill: blue, font: { bold: true, color: navy } };
for (let row = 15; row <= 21; row++) summary.getRange(`B${row}:F${row}`).merge();
summary.getRange("A14:F21").format.borders = { preset: "insideHorizontal", style: "thin", color: line };
summary.getRange("A:A").format.columnWidth = 30;
summary.getRange("B:F").format.columnWidth = 18;
summary.getRange("A1:F21").format.wrapText = true;

const componentHeaders = ["Component ID","Component","Book II Basis","Purpose","Authoritative State","Non-Owned State","Commands","Queries","Events","Lifecycle","Dependencies","Critical Invariant","Failure Modes","Requirements","Interfaces","Tests","Status"];
const componentRows = catalog.components.map((c) => [
  c.component_id,c.name,c.book_ii_basis,c.purpose,c.authoritative_state.join("; "),c.non_owned_state.join("; "),
  c.commands.join("; "),c.queries.join("; "),c.events.join("; "),c.lifecycle,c.dependencies.join("; "),
  c.critical_invariant,c.failure_modes.join("; "),c.requirements.length,c.interfaces.length,c.tests.length,c.status,
]);
components.getRangeByIndexes(0,0,componentRows.length+1,componentHeaders.length).values=[componentHeaders,...componentRows];
components.getRange(`A1:Q1`).format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
components.getRange(`A2:Q${componentRows.length+1}`).format={font:{size:9,color:ink},wrapText:true};
components.getRange(`A1:Q${componentRows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:14,B:31,C:16,D:52,E:48,F:40,G:42,H:38,I:38,J:32,K:42,L:52,M:40,N:13,O:11,P:9,Q:11})) components.getRange(`${col}:${col}`).format.columnWidth=width;
components.freezePanes.freezeRows(1); components.freezePanes.freezeColumns(2);
components.tables.add(`A1:Q${componentRows.length+1}`,true,"ComponentsTable").style="TableStyleMedium2";

ownership.getRangeByIndexes(0,0,ownershipRows.length,5).values=ownershipRows;
ownership.getRange("A1:E1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
ownership.getRange(`A2:E${ownershipRows.length}`).format={font:{size:9,color:ink},wrapText:true};
ownership.getRange(`A1:E${ownershipRows.length}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:38,B:16,C:34,D:44,E:15})) ownership.getRange(`${col}:${col}`).format.columnWidth=width;
ownership.freezePanes.freezeRows(1);
ownership.tables.add(`A1:E${ownershipRows.length}`,true,"StateOwnershipTable").style="TableStyleMedium2";

const interfaceHeaders=["Interface ID","Component ID","Provider","Kind","Name","Consumers","Semantic Requirement","Book IX Handoff"];
const interfaceRows=interfacesDoc.interfaces.map((r)=>[r.interface_id,r.component_id,r.provider,r.kind,r.name,r.consumers,r.semantic_requirement,r.book_ix_handoff]);
interfaces.getRangeByIndexes(0,0,interfaceRows.length+1,interfaceHeaders.length).values=[interfaceHeaders,...interfaceRows];
interfaces.getRange("A1:H1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
interfaces.getRange(`A2:H${interfaceRows.length+1}`).format={font:{size:9,color:ink},wrapText:true};
interfaces.getRange(`A1:H${interfaceRows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:18,B:14,C:32,D:12,E:31,F:42,G:64,H:55})) interfaces.getRange(`${col}:${col}`).format.columnWidth=width;
interfaces.freezePanes.freezeRows(1); interfaces.freezePanes.freezeColumns(2);
interfaces.tables.add(`A1:H${interfaceRows.length+1}`,true,"LogicalInterfacesTable").style="TableStyleMedium2";

const requirementHeaders=["Requirement ID","Component ID","Title","Normative Requirement","Severity","Book I","Book II","Book III","Book X Terms"];
const requirementRows=requirementsDoc.requirements.map((r)=>[r.requirement_id,r.component_id,r.title,r.requirement,r.severity,r.book_i,r.book_ii,r.book_iii,r.book_x_terms.join("; ")]);
requirements.getRangeByIndexes(0,0,requirementRows.length+1,requirementHeaders.length).values=[requirementHeaders,...requirementRows];
requirements.getRange("A1:I1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
requirements.getRange(`A2:I${requirementRows.length+1}`).format={font:{size:9,color:ink},wrapText:true};
requirements.getRange(`A1:I${requirementRows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:21,B:14,C:28,D:72,E:12,F:38,G:22,H:55,I:50})) requirements.getRange(`${col}:${col}`).format.columnWidth=width;
requirements.freezePanes.freezeRows(1); requirements.freezePanes.freezeColumns(2);
requirements.tables.add(`A1:I${requirementRows.length+1}`,true,"RequirementsTable").style="TableStyleMedium2";

const testHeaders=["Test ID","Component ID","Title","Method","Expected Evidence"];
const testRows=testsDoc.tests.map((t)=>[t.test_id,t.component_id,t.title,t.method,t.expected]);
conformance.getRangeByIndexes(0,0,testRows.length+1,testHeaders.length).values=[testHeaders,...testRows];
conformance.getRange("A1:E1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
conformance.getRange(`A2:E${testRows.length+1}`).format={font:{size:9,color:ink},wrapText:true};
conformance.getRange(`A1:E${testRows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
for(const [col,width] of Object.entries({A:20,B:14,C:28,D:72,E:66})) conformance.getRange(`${col}:${col}`).format.columnWidth=width;
conformance.freezePanes.freezeRows(1); conformance.freezePanes.freezeColumns(2);
conformance.tables.add(`A1:E${testRows.length+1}`,true,"ConformanceTestsTable").style="TableStyleMedium2";

coverage.getRangeByIndexes(0,0,coverageRows.length,3).values=coverageRows;
coverage.getRange("A1:C1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
coverage.getRange(`A2:C${coverageRows.length}`).format={font:{size:10,color:ink},wrapText:true};
coverage.getRange(`A1:C${coverageRows.length}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
coverage.getRange("A:A").format.columnWidth=18; coverage.getRange("B:B").format.columnWidth=55; coverage.getRange("C:C").format.columnWidth=16;
coverage.freezePanes.freezeRows(1);
coverage.tables.add(`A1:C${coverageRows.length}`,true,"BookIICoverageTable").style="TableStyleMedium2";

const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(fileURLToPath(new URL("../deliverables/HAL_BOOK_IV_COMPONENT_CATALOG.xlsx", import.meta.url)));

const previewDir=new URL("../tmp/workbook-previews/",import.meta.url);
await fs.mkdir(previewDir,{recursive:true});
for(const [sheetName,range] of [
  ["Summary","A1:F21"],["Components","A1:Q8"],["State Ownership","A1:E14"],["Interfaces","A1:H12"],
  ["Requirements","A1:I10"],["Conformance","A1:E12"],["Book II Coverage","A1:C36"],
]){
  const preview=await wb.render({sheetName,range,scale:1,format:"png"});
  const filename=sheetName.toLowerCase().replaceAll(" ","_")+".png";
  await fs.writeFile(fileURLToPath(new URL(filename,previewDir)),new Uint8Array(await preview.arrayBuffer()));
}

const inspect=await wb.inspect({kind:"sheet,table",maxChars:8000,tableMaxRows:5,tableMaxCols:10,tableMaxCellChars:100});
await fs.writeFile(fileURLToPath(new URL("../tmp/workbook-inspect.ndjson",import.meta.url)),inspect.ndjson);
const errors=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:300},summary:"final formula error scan"});
await fs.writeFile(fileURLToPath(new URL("../tmp/workbook-formula-errors.ndjson",import.meta.url)),errors.ndjson);
console.log(JSON.stringify({sheets:7,components:componentRows.length,requirements:requirementRows.length,interfaces:interfaceRows.length,stateDomains:ownershipRows.length-1,tests:testRows.length}));
