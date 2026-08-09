import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
const root=decodeURIComponent(new URL("../",import.meta.url).pathname);
const controls=JSON.parse(await fs.readFile(`${root}schemas/book_v_controls.json`,"utf8")).controls;
const alerts=JSON.parse(await fs.readFile(`${root}schemas/book_v_alerts.json`,"utf8")).alerts;
const procedures=JSON.parse(await fs.readFile(`${root}schemas/book_v_procedures.json`,"utf8")).procedures;
const wb=Workbook.create(), blue="#1F4D78", mid="#2E74B5", pale="#E8EEF5", green="#E2F0D9", yellow="#FFF2CC";
function col(n){let s="";for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s;}
function sheet(name,title,heads,rows,widths){
 const s=wb.worksheets.add(name);s.showGridLines=false;const last=col(heads.length-1);
 s.getRange(`A1:${last}1`).merge();s.getRange("A1").values=[[title]];s.getRange("A1").format={fill:blue,font:{bold:true,color:"#FFFFFF",size:16}};s.getRange("A1").format.rowHeight=30;
 s.getRange(`A3:${last}3`).values=[heads];s.getRange(`A3:${last}3`).format={fill:mid,font:{bold:true,color:"#FFFFFF"},wrapText:true};
 s.getRange(`A4:${last}${rows.length+3}`).values=rows;s.getRange(`A4:${last}${rows.length+3}`).format={font:{size:9,color:"#1F2937"},wrapText:true,verticalAlignment:"center",borders:{insideHorizontal:{style:"thin",color:"#D9E2F3"}}};
 widths.forEach((w,i)=>s.getRange(`${col(i)}:${col(i)}`).format.columnWidth=w);s.getRange(`A3:${last}${rows.length+3}`).format.autofitRows();s.freezePanes.freezeRows(3);
 s.tables.add(`A3:${last}${rows.length+3}`,true,`${name.replace(/[^A-Za-z0-9]/g,"")}Table`).style="TableStyleMedium2";return s;
}
const sm=wb.worksheets.add("Summary");sm.showGridLines=false;sm.getRange("A1:F1").merge();sm.getRange("A1").values=[["HAL Book V — Operational Control Catalog"]];sm.getRange("A1").format={fill:blue,font:{bold:true,color:"#FFFFFF",size:18}};sm.getRange("A1").format.rowHeight=34;
sm.getRange("A3:B10").values=[["Metric","Value"],["Chapters",18],["Controls",72],["Runbooks",18],["Playbooks",8],["Alerts",25],["Dashboards",5],["Checklists",6]];
sm.getRange("D3:F8").values=[["Dependency","Status","Disposition"],["Books I-IV/X","LOCKED","PASS"],["Book IX","RECONCILED","PASS"],["Book VIII","RECONCILED","PASS"],["Book VI","RECONCILED","PASS"],["Book V","CERTIFIED FINAL","Version 1.0"]];
sm.getRange("A3:B3").format={fill:mid,font:{bold:true,color:"#FFFFFF"}};sm.getRange("D3:F3").format={fill:mid,font:{bold:true,color:"#FFFFFF"}};sm.getRange("A4:B10").format={fill:pale};sm.getRange("D4:F6").format={fill:green};sm.getRange("D7:F8").format={fill:yellow};
for(const [c,w] of [["A",24],["B",15],["D",23],["E",22],["F",26]])sm.getRange(`${c}:${c}`).format.columnWidth=w;
sheet("Controls","Normative Operational Controls",["Control ID","Chapter","Title","Requirement","Responsible role","Severity","Enforcement","Evidence","Exception authority","Book IX binding","Book VIII binding"],controls.map(c=>[c.control_id,Number(c.chapter),c.title,c.requirement,c.responsible_role,c.severity,c.enforcement,c.evidence,c.exception_authority,c.book_ix_binding,c.book_viii_binding]),[18,10,32,80,24,14,38,55,48,42,42]);
sheet("Chapters","Chapter and Control Coverage",["Chapter","Title","Prefix","Owner","Controls","Runbook","Status"],procedures.map((p,i)=>[Number(p.chapter),p.title,controls[i*4].control_id.split("-")[1],p.owner,4,p.runbook_id,"CONTENT COMPLETE"]),[10,54,12,25,12,14,24]);
sheet("Runbooks","Runbook Procedure Spine",["Runbook","Chapter","Title","Owner","Steps","Stop condition","Evidence"],procedures.map(p=>[p.runbook_id,Number(p.chapter),p.title,p.owner,p.steps.length,"Any identity, authority, certification, Treaty, integrity, target, state, harm, or evidence uncertainty","Operation record, telemetry, decisions, verification, certificate disposition, evidence manifest"]),[14,10,48,25,10,65,70]);
sheet("Alerts","Operational Alert Catalog",["Alert ID","Condition","Severity","Immediate action","Runbook linkage required"],alerts.map(a=>[a.alert_id,a.condition,a.severity,a.immediate_action,"YES"]),[14,52,14,58,24]);
sheet("Artifacts","Companion Artifact Inventory",["Class","Count","Location","Status"],[["Formal runbooks",18,"runbooks/","COMPLETE"],["On-call/escalation guidance",2,"runbooks/","COMPLETE"],["Playbooks",8,"playbooks/","COMPLETE"],["Dashboards",5,"dashboards/","COMPLETE"],["Alerts",25,"alerts/","COMPLETE"],["Templates",6,"templates/","COMPLETE"],["Checklists",6,"checklists/","COMPLETE"],["Traceability matrices",8,"traceability/","COMPLETE"],["Review records",11,"reviews/","COMPLETE"]],[25,12,38,28]);
sheet("Reconciliation","Cross-Book Reconciliation",["Dependency","Status","Operational binding","Certification effect"],[["Book IX","CLOSED","305 registered contracts; envelopes, authority context, errors, delivery, compatibility, Treaty/Firewall, observability","None"],["Book VIII","CLOSED","Certification scope/state, verification ladder, evidence, suspension/revocation, recertification","None"],["Book VI","CLOSED","112 controls; roles, protection objectives, incidents, secrets, access, privacy, trust, Treaty, compromise recovery","None"]],[20,16,86,30]);
await fs.mkdir(`${root}tmp/workbook-previews`,{recursive:true});
for(const n of ["Summary","Controls","Chapters","Runbooks","Alerts","Artifacts","Reconciliation"]){const b=await wb.render({sheetName:n,range:n==="Controls"?"A1:K24":undefined,autoCrop:"all",scale:1,format:"png"});await fs.writeFile(`${root}tmp/workbook-previews/${n.toLowerCase()}.png`,new Uint8Array(await b.arrayBuffer()));}
const ins=await wb.inspect({kind:"table",sheetId:"Summary",range:"A1:F10",include:"values,formulas",tableMaxRows:12,tableMaxCols:8,maxChars:5000});await fs.writeFile(`${root}tmp/workbook-inspect.ndjson`,ins.ndjson);
const err=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:100},summary:"formula error scan"});await fs.writeFile(`${root}tmp/workbook-formula-errors.ndjson`,err.ndjson);
const out=await SpreadsheetFile.exportXlsx(wb);await out.save(`${root}deliverables/HAL_BOOK_V_OPERATIONAL_CONTROL_CATALOG.xlsx`);
console.log(JSON.stringify({sheets:7,controls:controls.length,alerts:alerts.length,runbooks:procedures.length}));
