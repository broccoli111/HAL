import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root=new URL("..",import.meta.url);
const data=JSON.parse(await fs.readFile(new URL("../schemas/book_viii_controls.json",import.meta.url),"utf8"));
const recon=await fs.readFile(new URL("../planning/BOOK_IX_RECONCILIATION_REGISTER.md",import.meta.url),"utf8");
const markdownRows=(text,n)=>text.split("\n").filter(x=>x.startsWith("|")&&!x.includes("---")).map(x=>x.split("|").slice(1,-1).map(v=>v.trim())).filter(x=>x.length===n);
const reconRows=markdownRows(recon,5);
const wb=Workbook.create();
const sheets=["Summary","Controls","Risk Classes","Verification Ladder","Certification States","Book IX Reconciliation"].map(n=>wb.worksheets.add(n));
for(const s of sheets)s.showGridLines=false;
const [summary,controls,risk,ladder,states,bookix]=sheets;
const navy="#17365D",blue="#D9EAF7",ink="#1F2937",line="#D7DEE8",pale="#F4F7FA";
function table(sheet,heads,rows,widths,name){
  sheet.getRangeByIndexes(0,0,rows.length+1,heads.length).values=[heads,...rows];
  const end=String.fromCharCode(64+heads.length);
  sheet.getRange(`A1:${end}1`).format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
  sheet.getRange(`A2:${end}${rows.length+1}`).format={font:{size:9,color:ink},wrapText:true};
  sheet.getRange(`A1:${end}${rows.length+1}`).format.borders={preset:"insideHorizontal",style:"thin",color:line};
  widths.forEach((w,i)=>sheet.getRange(`${String.fromCharCode(65+i)}:${String.fromCharCode(65+i)}`).format.columnWidth=w);
  sheet.freezePanes.freezeRows(1);
  sheet.tables.add(`A1:${end}${rows.length+1}`,true,name).style="TableStyleMedium2";
}
summary.getRange("A1:F2").merge(); summary.getRange("A1").values=[["HAL Book VIII — Verification and Certification"]];
summary.getRange("A1:F2").format={fill:navy,font:{bold:true,color:"#FFFFFF",size:18},verticalAlignment:"center"};
summary.getRange("A4:B10").values=[
 ["Metric","Value"],["Status","Final v1.0"],["Chapters",13],["Controls",null],["Risk classes",5],["Verification ladder rungs",7],["Book IX mappings / extension items",null]
];
summary.getRange("B7").formulas=[["=COUNTA(Controls!A2:A105)"]];
summary.getRange("B10").values=[["10 / 1"]];
summary.getRange("A4:B4").format={fill:blue,font:{bold:true,color:navy}};
summary.getRange("A12:F12").merge(); summary.getRange("A12").values=[["Authority: Book I is supreme. Verification and certification do not create Authority, Permission, Owner approval, capability classes, Treaty scope, or wire contracts."]];
summary.getRange("A12:F12").format={fill:pale,font:{italic:true,color:ink},wrapText:true};
summary.getRange("A14:F20").values=[
 ["Workbook guide","","","","",""],["Controls","104 enforceable controls","","","",""],["Risk Classes","R0-R4 consequence model","","","",""],["Verification Ladder","Static through Full Adoption","","","",""],["Certification States","Decision lifecycle","","","",""],["Book IX Reconciliation","Ten mappings; one governed extension item","","","",""],["Owner Review","No open item","","","",""]
];
summary.getRange("A14:F14").merge(); summary.getRange("A14:F14").format={fill:blue,font:{bold:true,color:navy}};
for(let r=15;r<=20;r++)summary.getRange(`B${r}:F${r}`).merge();
summary.getRange("A:A").format.columnWidth=31; summary.getRange("B:F").format.columnWidth=18; summary.getRange("A1:F20").format.wrapText=true;

const controlRows=data.controls.map(c=>[c.control_id,c.chapter,c.category,c.title,c.requirement,c.applicability,c.responsible_role,c.enforcement,c.evidence,c.severity,c.exception_authority,c.source,c.automation]);
table(controls,["Control ID","Chapter","Category","Title","Normative Requirement","Applicability","Responsible Role","Enforcement","Evidence","Severity","Exception Authority","Source","Automation"],controlRows,[17,10,12,28,70,25,25,32,30,12,22,58,30],"ControlsTable");
table(risk,["Class","Meaning","Minimum assurance"],[
 ["R0","Informational; no protected decision or effect","Basic provenance and correctness"],
 ["R1","Limited, reversible, low-sensitivity effect","Peer review and representative testing"],
 ["R2","Significant state, privacy, availability, or workflow consequence","Independent review and staged verification"],
 ["R3","Critical authority, trust, protected state, continuity, or high-impact consequence","Full assurance case, reproduction, failure and recovery evidence"],
 ["R4","Constitutional invariant, Owner authority, new capability class, Treaty class, or substantial irreversible risk","R3 evidence plus required constitutional/Owner governance"]
],[12,52,72],"RiskClassTable");
table(ladder,["Rung","Effect boundary","Minimum promotion evidence"],[
 ["Static Validation","No execution effect","Source, schema, policy, provenance, and invariant validation"],
 ["Simulation","Isolated modeled execution","Scenario coverage, isolation, reproducibility, model limitations"],
 ["Digital Twin","Governed production-representative model","Fidelity dimensions, divergence, state provenance, containment"],
 ["Shadow Execution","Production-observing; effects suppressed","Privacy controls, divergence analysis, no authoritative feedback"],
 ["Canary Operation","Narrow authorized production effect","Bounded population, abort criteria, rollback, observation"],
 ["Controlled Reality","Explicit bounded real-world trial","Participant authority, containment, enhanced monitoring, recovery"],
 ["Full Adoption","Approved operational scope","Complete observation, no critical defeater, current certification"]
],[23,48,72],"LadderTable");
table(states,["State","Meaning","Permitted reliance"],[
 ["Candidate","Package initiated","None"],["Under Review","Evidence and argument under evaluation","None"],
 ["Certified","All required claims and controls satisfied","Only within exact scope and validity"],
 ["Certified with Conditions","Noncritical bounded conditions active","Only within exact scope while conditions remain current"],
 ["Suspended","Basis uncertain or temporarily invalid","No protected reliance"],["Revoked","Basis fundamentally invalid","No reliance; dependent impact review required"],
 ["Expired","Validity ended","No reliance"],["Superseded","Replaced by a later decision","Historical only"]
],[28,60,60],"CertificationStateTable");
table(bookix,reconRows[0],reconRows.slice(1),[15,48,40,58,58],"BookIXReconciliationTable");

const out=await SpreadsheetFile.exportXlsx(wb);
await out.save(fileURLToPath(new URL("../deliverables/HAL_BOOK_VIII_VERIFICATION_AND_CERTIFICATION_CATALOG.xlsx",import.meta.url)));
const previewDir=new URL("../tmp/workbook-previews/",import.meta.url); await fs.mkdir(previewDir,{recursive:true});
for(const [name,range] of [["Summary","A1:F20"],["Controls","A1:M10"],["Risk Classes","A1:C6"],["Verification Ladder","A1:C8"],["Certification States","A1:C9"],["Book IX Reconciliation","A1:E11"]]){
 const img=await wb.render({sheetName:name,range,scale:1,format:"png"});
 await fs.writeFile(fileURLToPath(new URL(name.toLowerCase().replaceAll(" ","_")+".png",previewDir)),new Uint8Array(await img.arrayBuffer()));
}
const inspect=await wb.inspect({kind:"sheet,table",maxChars:9000,tableMaxRows:5,tableMaxCols:13,tableMaxCellChars:120});
await fs.writeFile(fileURLToPath(new URL("../tmp/workbook-inspect.ndjson",import.meta.url)),inspect.ndjson);
const errors=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:200},summary:"formula error scan"});
await fs.writeFile(fileURLToPath(new URL("../tmp/workbook-formula-errors.ndjson",import.meta.url)),errors.ndjson);
console.log(JSON.stringify({sheets:6,controls:controlRows.length,reconciliation:reconRows.length-1}));
