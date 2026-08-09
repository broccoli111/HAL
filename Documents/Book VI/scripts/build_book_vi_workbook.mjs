import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..") + "/";
const controls = JSON.parse(await fs.readFile(`${root}tmp/control_catalog.json`, "utf8"));
const wb = Workbook.create();
const blue = "#17365D", accent = "#2E75B6", pale = "#D9EAF7", ink = "#17202A", light = "#F3F6F9";

function title(sheet, text, cols) {
  sheet.showGridLines = false;
  const r = sheet.getRange(`A1:${cols}1`); r.merge(); r.values = [[text]];
  r.format = {fill: blue, font: {bold: true, color: "#FFFFFF", size: 18}, rowHeight: 32, verticalAlignment: "center"};
}
function header(range) {
  range.format = {fill: accent, font: {bold:true,color:"#FFFFFF"}, wrapText:true,
    verticalAlignment:"center", borders:{preset:"inside",style:"thin",color:"#D7DEE8"}};
}
function body(range) {
  range.format = {font:{color:ink,size:10}, wrapText:true, verticalAlignment:"top",
    borders:{preset:"inside",style:"thin",color:"#E5EAF0"}};
}

const s = wb.worksheets.add("Summary");
title(s,"HAL Book VI — Control Program Summary","F");
s.getRange("A3:B9").values = [
  ["Metric","Value"],["Version","v1.0"],["Status","FINAL"],
  ["Chapters",14],["Controls",controls.length],["Critical",controls.filter(x=>x.severity==="Critical").length],
  ["High",controls.filter(x=>x.severity==="High").length]
];
header(s.getRange("A3:B3")); body(s.getRange("A4:B9"));
s.getRange("D3:E7").values = [
  ["Protection objective","Count"],["Protect HAL",controls.filter(x=>x.protection_objective==="Protect HAL").length],
  ["Constrain HAL",controls.filter(x=>x.protection_objective==="Constrain HAL").length],
  ["Both",controls.filter(x=>x.protection_objective==="Both").length],
  ["Total","='Summary'!B7"]
];
header(s.getRange("D3:E3")); body(s.getRange("D4:E7"));
s.getRange("A11:F14").values = [
  ["Authority boundary","","","","",""],
  ["Book VIII — Verification/certification authority and states are consumed, never invented.","","","","",""],
  ["Book IX — Exact contracts, schemas, routes, errors, and profiles are consumed, never redefined.","","","","",""],
  ["Owner authority — Security, trust, credentials, compliance, and certification never create Authority.","","","","",""],
];
for (const r of ["A11:F11","A12:F12","A13:F13","A14:F14"]) s.getRange(r).merge();
s.getRange("A11:F11").format={fill:pale,font:{bold:true,color:blue},wrapText:true};
s.getRange("A12:F14").format={fill:light,font:{color:ink},wrapText:true};
s.getRange("A1:F14").format.autofitRows();
s.getRange("A:A").format.columnWidth=24; s.getRange("B:B").format.columnWidth=18;
s.getRange("C:C").format.columnWidth=4; s.getRange("D:D").format.columnWidth=25; s.getRange("E:E").format.columnWidth=14;

const c = wb.worksheets.add("Controls");
title(c,"Numbered Control Catalog","Q");
const ch = ["Control ID","Title","Requirement","Applicability","Responsible role","Enforcement","Evidence","Severity","Exception authority","Objective","Book I","Book II","Book III","Book IV","Book X","Chapter","Automation"];
c.getRange(`A3:Q${controls.length+3}`).values = [ch,...controls.map(x=>[
  x.control_id,x.title,x.requirement,x.applicability,x.responsible_role,x.enforcement,x.evidence,x.severity,
  x.exception_authority,x.protection_objective,x.book_i,x.book_ii,x.book_iii,x.book_iv,x.book_x,x.chapter,x.automation])];
header(c.getRange("A3:Q3")); body(c.getRange(`A4:Q${controls.length+3}`));
c.freezePanes.freezeRows(3); c.freezePanes.freezeColumns(2);
for (const [col,w] of [["A",18],["B",28],["C",55],["D",20],["E",24],["F",30],["G",28],["H",12],["I",23],["J",18],["K",26],["L",28],["M",20],["N",28],["O",22],["P",9],["Q",24]]) c.getRange(`${col}:${col}`).format.columnWidth=w;
c.getRange(`A3:Q${controls.length+3}`).format.autofitRows();

const roles = [...new Set(controls.map(x=>x.responsible_role))].sort();
const rs = wb.worksheets.add("Roles");
title(rs,"Role Accountability","D");
rs.getRange(`A3:D${roles.length+3}`).values=[["Responsible role","Control count","Critical","High"],...roles.map(r=>[
  r,controls.filter(x=>x.responsible_role===r).length,controls.filter(x=>x.responsible_role===r&&x.severity==="Critical").length,
  controls.filter(x=>x.responsible_role===r&&x.severity==="High").length])];
header(rs.getRange("A3:D3")); body(rs.getRange(`A4:D${roles.length+3}`));
rs.getRange("A:A").format.columnWidth=34; rs.getRange("B:D").format.columnWidth=15;

const chap = wb.worksheets.add("Chapter Coverage");
title(chap,"Chapter and Objective Coverage","G");
const cats=[...new Set(controls.map(x=>x.chapter))].sort();
chap.getRange(`A3:G${cats.length+3}`).values=[["Chapter","Controls","Critical","High","Protect HAL","Constrain HAL","Both"],...cats.map(n=>{
 const a=controls.filter(x=>x.chapter===n); return [Number(n),a.length,a.filter(x=>x.severity==="Critical").length,
 a.filter(x=>x.severity==="High").length,a.filter(x=>x.protection_objective==="Protect HAL").length,
 a.filter(x=>x.protection_objective==="Constrain HAL").length,a.filter(x=>x.protection_objective==="Both").length]})];
header(chap.getRange("A3:G3")); body(chap.getRange(`A4:G${cats.length+3}`));
chap.getRange("A:G").format.columnWidth=17;

const rec = wb.worksheets.add("Reconciliation");
title(rec,"Book VIII and Book IX Reconciliation","D");
rec.getRange("A3:D11").values=[
 ["Book","Concern","Authoritative treatment","Status"],
 ["VIII","Control effectiveness","Claims, evidence, risk, and domain assurance","Aligned"],
 ["VIII","Adversarial and recovery evidence","Failure, compromise, recovery, and human verification","Aligned"],
 ["VIII","Treaty assurance","Treaty certification and external-domain assurance","Aligned"],
 ["VIII","Certification states","Consumed by Book VI; not invented","Aligned"],
 ["IX","Authority context","Canonical envelope and independent current-Authority validation","Aligned"],
 ["IX","Constitutional Firewall","CMP-20 contracts IX-C-0196 through IX-C-0205","Aligned"],
 ["IX","Treaty lifecycle","CMP-21 contracts IX-C-0206 through IX-C-0217","Aligned"],
 ["IX","Security and errors","IX-SEC-001/002/003 and stable HAL error taxonomy","Aligned"]
];
header(rec.getRange("A3:D3")); body(rec.getRange("A4:D11"));
rec.getRange("A:A").format.columnWidth=12; rec.getRange("B:B").format.columnWidth=28; rec.getRange("C:C").format.columnWidth=58; rec.getRange("D:D").format.columnWidth=14;
rec.getRange("A3:D11").format.autofitRows();

await fs.mkdir(`${root}deliverables`,{recursive:true});
const out=await SpreadsheetFile.exportXlsx(wb);
await out.save(`${root}deliverables/HAL_BOOK_VI_CONTROL_CATALOG.xlsx`);
await fs.mkdir(`${root}tmp/workbook-previews`,{recursive:true});
for (const name of ["Summary","Controls","Roles","Chapter Coverage","Reconciliation"]) {
 const blob=await wb.render({sheetName:name,autoCrop:"all",scale:1,format:"png"});
 await fs.writeFile(`${root}tmp/workbook-previews/${name.toLowerCase().replaceAll(" ","_")}.png`,new Uint8Array(await blob.arrayBuffer()));
}
const inspection=await wb.inspect({kind:"table",sheetId:"Summary",range:"A1:F14",include:"values,formulas",tableMaxRows:20,tableMaxCols:8,maxChars:5000});
await fs.writeFile(`${root}tmp/workbook-inspect.ndjson`,inspection.ndjson);
const errors=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:200},summary:"final formula error scan"});
await fs.writeFile(`${root}tmp/workbook-formula-errors.ndjson`,errors.ndjson);
console.log(JSON.stringify({sheets:5,controls:controls.length,roles:roles.length}));
