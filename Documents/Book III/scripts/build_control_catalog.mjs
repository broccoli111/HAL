import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const root = new URL('..', import.meta.url);
const csv = await fs.readFile(new URL('../traceability/CONTROL_CATALOG.csv', import.meta.url), 'utf8');
const rows = csv.trim().split('\n').map(line => {
  const out=[]; let cur='', quoted=false;
  for(let i=0;i<line.length;i++){ const c=line[i]; if(c==='"'){if(quoted && line[i+1]==='"'){cur+='"';i++;}else quoted=!quoted;} else if(c===','&&!quoted){out.push(cur);cur='';}else cur+=c; } out.push(cur); return out;
});
const wb=Workbook.create(); const sh=wb.worksheets.add('Control Catalog'); sh.showGridLines=false;
sh.getRangeByIndexes(0,0,rows.length,rows[0].length).values=rows;
const title=sh.getRange('A1:M1'); title.format.fill='#17365D'; title.format.font={bold:true,color:'#FFFFFF'}; title.format.wrapText=true; title.format.rowHeight=30;
const data=sh.getRange(`A2:M${rows.length}`); data.format.wrapText=true; data.format.font={size:10}; data.format.borders={preset:'insideHorizontal',style:'thin',color:'#D9E2F3'};
for (const [col,width] of Object.entries({A:14,B:28,C:55,D:30,E:20,F:28,G:35,H:12,I:28,J:30,K:25,L:18,M:18})) sh.getRange(`${col}:${col}`).format.columnWidth=width;
sh.freezePanes.freezeRows(1);
const summary=wb.worksheets.add('Summary'); summary.showGridLines=false;
summary.getRange('A1:D1').merge(); summary.getRange('A1').values=[['HAL Book III - Control Catalog']]; summary.getRange('A1:D1').format.fill='#17365D'; summary.getRange('A1:D1').format.font={bold:true,color:'#FFFFFF',size:16}; summary.getRange('A3:B6').values=[['Metric','Value'],['Total controls',rows.length-1],['Control families',new Set(rows.slice(1).map(r=>r[0].split('-')[0])).size],['Status','Final v1.0']]; summary.getRange('A3:B6').format.borders={preset:'all',style:'thin',color:'#D9E2F3'}; summary.getRange('A3:B3').format.fill='#D9EAF7'; summary.getRange('A3:B3').format.font={bold:true}; summary.getRange('A:A').format.columnWidth=24; summary.getRange('B:B').format.columnWidth=22;
const out=new URL('../deliverables/HAL_BOOK_III_CONTROL_CATALOG.xlsx',import.meta.url); const blob=await SpreadsheetFile.exportXlsx(wb); await blob.save(fileURLToPath(out));
const preview=await wb.render({sheetName:'Control Catalog',range:`A1:M${Math.min(rows.length,16)}`,scale:1}); await fs.writeFile(fileURLToPath(new URL('../tmp/control_catalog_preview.png',import.meta.url)),new Uint8Array(await preview.arrayBuffer()));
const inspect=await wb.inspect({kind:'table',range:'Control Catalog!A1:M8',include:'values',tableMaxRows:8,tableMaxCols:13}); console.log(inspect.ndjson);
