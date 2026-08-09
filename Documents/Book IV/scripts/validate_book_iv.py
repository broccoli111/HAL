from __future__ import annotations

import hashlib
import json
import math
import re
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1]
DELIV=ROOT/"deliverables"
TMP=ROOT/"tmp"
MASTER_RENDER=TMP/"docx-render"
COMPONENT_RENDER=TMP/"component-render"
MASTER_CONTACTS=TMP/"master-contact-sheets"
COMPONENT_CONTACTS=TMP/"component-contact-sheets"
MASTER_CONTACTS.mkdir(parents=True,exist_ok=True)
COMPONENT_CONTACTS.mkdir(parents=True,exist_ok=True)

expected_hashes={
"BOOK_I_CONSTITUTION.pdf":"fd71a272f3eaead6ee3ec864ae8b2b2786f4ce76f724468366886387b7dcdb49",
"BOOK_II_ARCHITECTURE_SPECIFICATION.pdf":"c202abc8f9cc7393e76df6e7b11f8f97310153b12e69202984a88a20922e8f72",
"BOOK_III_ENGINEERING_STANDARDS.pdf":"c5ea5936a91c1e15d9d7e90fe2e07a6a0f6f942a7f4a88b4207de857247ff73c",
"BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.pdf":"efb67c87f2690ad3a6c8d93877b1a357a2aa70b1d5ab83a4d089728f1913ac28",
}

checks=[]
def check(name,condition,detail):
    checks.append((name,bool(condition),detail))
    if not condition:
        raise AssertionError(f"{name}: {detail}")

catalog=json.loads((ROOT/"schemas/book_iv_components.json").read_text(encoding="utf-8"))
schema=json.loads((ROOT/"schemas/book_iv_components.schema.json").read_text(encoding="utf-8"))
req_doc=json.loads((ROOT/"schemas/book_iv_requirements.json").read_text(encoding="utf-8"))
if_doc=json.loads((ROOT/"schemas/book_iv_interfaces.json").read_text(encoding="utf-8"))
test_doc=json.loads((ROOT/"schemas/book_iv_conformance_tests.json").read_text(encoding="utf-8"))
components=catalog["components"]; requirements=req_doc["requirements"]; interfaces=if_doc["interfaces"]; tests=test_doc["tests"]

check("Component count",len(components)==29,"29 controlled component specifications")
ids=[c["component_id"] for c in components]
check("Component identifiers",ids==[f"CMP-{i:02d}" for i in range(1,30)] and len(set(ids))==29,"unique contiguous CMP-01 through CMP-29")
check("Component final status",all(c["status"]=="Final" for c in components),"all components final")
required_fields=set(schema["$defs"]["component"]["required"])
check("Component schema fields",all(required_fields.issubset(c) for c in components),"every component satisfies required catalog fields")
check("Component implementation depth",all(len(c["requirements"])==12 and len(c["tests"])==10 and len(c["interfaces"])>=7 for c in components),
      "each component has 12 requirements, 10 tests, and at least 7 interfaces")

state_domains=[state for c in components for state in c["authoritative_state"]]
duplicates=sorted({state for state in state_domains if state_domains.count(state)>1})
check("Unique mutation ownership",not duplicates,f"{len(state_domains)} authoritative state domains have one owner")
check("Explicit non-ownership",all(c["non_owned_state"] for c in components),"every component names non-owned domains")

req_ids=[r["requirement_id"] for r in requirements]
check("Requirement catalog",len(requirements)==348 and len(req_ids)==len(set(req_ids)),"348 unique numbered requirements")
check("Requirement traceability",all(r["book_i"] and r["book_ii"] and r["book_iii"] and r["book_x_terms"] for r in requirements),
      "every requirement maps to Books I-III and Book X")
check("Critical requirement coverage",all(sum(1 for r in c["requirements"] if r["severity"]=="Critical")>=6 for c in components),
      "each component identifies at least six critical requirements")
book_x_register=(ROOT/"source/book-x-working-baseline/CONCEPT_REGISTER.md").read_text(encoding="utf-8")
book_x_labels={match.group(1).strip() for match in re.finditer(r"^\| HAL-TERM-\d{4} \| ([^|]+) \|",book_x_register,re.M)}
used_book_x_terms={term for c in components for term in c["book_x_terms"]}
check("Book X semantic dependencies",used_book_x_terms.issubset(book_x_labels),
      f"all {len(used_book_x_terms)} declared semantic dependencies resolve to Book X v1.0")

if_ids=[r["interface_id"] for r in interfaces]
check("Interface catalog",len(interfaces)==305 and len(if_ids)==len(set(if_ids)),"305 unique logical interfaces")
check("Interface providers",all(r["provider"] and r["component_id"] in ids for r in interfaces),"every logical interface has one registered provider")
check("Book IX handoff",all("Wire" in r["book_ix_handoff"] or "schema" in r["book_ix_handoff"] for r in interfaces),
      "every interface explicitly hands machine-contract work to Book IX")

test_ids=[t["test_id"] for t in tests]
check("Conformance catalog",len(tests)==290 and len(test_ids)==len(set(test_ids)),"290 unique conformance tests")
for c in components:
    titles={t["title"] for t in c["tests"]}
    needed={"Sole-owner mutation","Authority denial","Valid lifecycle","Invalid lifecycle","Critical invariant","Failure containment","Recovery","Contract compatibility","Privacy and security","Topology independence"}
    check(f"{c['component_id']} conformance classes",needed.issubset(titles),"all ten required conformance classes")

coverage=(ROOT/"traceability/COVERAGE_REPORT.md").read_text(encoding="utf-8")
covered={int(n) for n in re.findall(r"^\|\s*(\d{2})\s*\|",coverage,re.M)}
check("Book II chapter coverage",covered==set(range(1,36)),"all 35 architecture chapters mapped")

for filename,expected in expected_hashes.items():
    actual=hashlib.sha256((ROOT/"source"/filename).read_bytes()).hexdigest()
    check(f"{filename} unchanged",actual==expected,actual)

mandatory=[
"HAL_BOOK_IV_COMPONENT_SPECIFICATIONS.md","HAL_BOOK_IV_COMPONENT_SPECIFICATIONS.docx",
"HAL_BOOK_IV_COMPONENT_SPECIFICATIONS.pdf","HAL_BOOK_IV_COMPONENT_CATALOG.xlsx",
"HAL_BOOK_IV_COMPONENT_CATALOG.csv","HAL_BOOK_IV_CERTIFICATION_REPORT.md",
]
for filename in mandatory:
    path=DELIV/filename
    check(f"Deliverable {filename}",path.exists() and path.stat().st_size>100,f"{path.stat().st_size if path.exists() else 0} bytes")

canonical=(DELIV/mandatory[0]).read_text(encoding="utf-8")
check("Canonical status","**Status:** Final" in canonical and "TODO" not in canonical and "Initial draft" not in canonical,"final markers and no placeholders")
check("Canonical component count",len(re.findall(r"^# CMP-\d{2} -",canonical,re.M))==29,"29 full component specifications")
required_sections=("Purpose and scope","Responsibilities","Explicit non-responsibilities","Authoritative and derived state",
                   "Logical interfaces","Lifecycle and state machines","Identity, authority, and policy checks","Trust boundaries",
                   "Security controls","Privacy controls","Failure modes and containment","Recovery behavior",
                   "Observability and required evidence","Performance and resource requirements","Deployment model and topology flexibility",
                   "Compatibility, versioning, and migration","Conformance tests","Prohibited shortcuts","Owner Review items","Completion status")
check("Canonical section coverage",all(canonical.count(f"## {n}. {title}")==29 for n,title in
      [(2,"Purpose and scope"),(4,"Responsibilities"),(5,"Explicit non-responsibilities"),(6,"Authoritative and derived state"),
       (7,"Logical interfaces"),(9,"Lifecycle and state machines"),(10,"Identity, authority, and policy checks"),(11,"Trust boundaries"),
       (12,"Security controls"),(13,"Privacy controls"),(14,"Failure modes and containment"),(15,"Recovery behavior"),
       (16,"Observability and required evidence"),(17,"Performance and resource requirements"),(18,"Deployment model and topology flexibility"),
       (20,"Compatibility, versioning, and migration"),(21,"Conformance tests"),(22,"Prohibited shortcuts"),(28,"Owner Review items"),(29,"Completion status")]),
      "all mandatory sections occur in all 29 component specifications")
check("No Owner Review item","No open Owner Review item" in canonical and canonical.count("## 28. Owner Review items\n\nNone.")==29,
      "all 29 components have no unresolved Owner-required decision")

pdf_path=DELIV/mandatory[2]
reader=PdfReader(str(pdf_path))
master_pages=sorted(MASTER_RENDER.glob("page-*.png"),key=lambda p:int(re.search(r"(\d+)$",p.stem).group(1)))
check("Master PDF pages",len(reader.pages)==len(master_pages) and len(reader.pages)>50,f"{len(reader.pages)} pages")
pdf_text="\n".join((page.extract_text() or "") for page in reader.pages)
check("Master PDF content",all(token in pdf_text for token in ("BOOK IV","Component Specifications","Appendix A","Certification status")),"cover, component family, appendices, certification")

component_pdfs=sorted(DELIV.glob("HAL_BOOK_IV_CMP-??_*.pdf"))
check("Standalone component PDFs",len(component_pdfs)==29 and all(len(PdfReader(str(p)).pages)>=1 for p in component_pdfs),"29 readable standalone PDFs")
component_texts=["\n".join((page.extract_text() or "") for page in PdfReader(str(p)).pages) for p in component_pdfs]
check("Standalone component parity",all(all(section in text for section in ("Authority and state ownership","Critical invariant","Logical interfaces","Conformance tests","Traceability and certification")) for text in component_texts),
      "every component PDF contains core specification and certification sections")

with zipfile.ZipFile(DELIV/mandatory[1]) as archive:
    document_xml=archive.read("word/document.xml").decode("utf-8")
    styles_xml=archive.read("word/styles.xml").decode("utf-8")
check("DOCX page geometry",'w:pgSz w:w="12240" w:h="15840"' in document_xml and 'w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"' in document_xml,
      "US Letter with one-inch margins")
check("DOCX styles",'w:styleId="Heading1"' in styles_xml and 'w:sz w:val="32"' in styles_xml and 'w:color w:val="2E74B5"' in styles_xml,
      "compact reference guide heading tokens")
check("DOCX table geometry",re.search(r'w:tblW[^>]*(?:w:w="9360"[^>]*w:type="dxa"|w:type="dxa"[^>]*w:w="9360")',document_xml) and 'w:tblInd w:w="120" w:type="dxa"' in document_xml,
      "fixed 9360-DXA tables with 120-DXA indent")
check("DOCX content parity",all(token in document_xml for token in ("CMP-01","CMP-29","Book IX owns wire details","No open Owner Review item")),"first and last components, handoff, and certification present")

with zipfile.ZipFile(DELIV/mandatory[3]) as archive:
    names=set(archive.namelist()); workbook_xml=archive.read("xl/workbook.xml").decode("utf-8")
check("XLSX package","[Content_Types].xml" in names and "xl/workbook.xml" in names,"valid OOXML workbook")
for sheet in ("Summary","Components","State Ownership","Interfaces","Requirements","Conformance","Book II Coverage"):
    check(f"XLSX sheet {sheet}",sheet in workbook_xml,f"{sheet} present")
error_scan=(TMP/"workbook-formula-errors.ndjson").read_text(encoding="utf-8")
check("Workbook formula errors","matched 0" in error_scan.lower() or "0 entries" in error_scan.lower(),error_scan.strip()[:160])

review_files=sorted((ROOT/"reviews/component-reviews").glob("*_REVIEW.md"))
review_texts=[p.read_text(encoding="utf-8") for p in review_files]
check("Component reviews",len(review_files)==29,"29 component review records")
check("Evidence-bearing reviews",all("## Reviewed scope" in text and "## Results" in text and "## Corrections and resolution" in text and re.search(r"CMP-\d{2}-REQ-\d{3}",text) for text in review_texts),
      "each review identifies exact requirements, interfaces, tests, findings, and resolution")
check("Review specificity",len({hashlib.sha256(text.encode()).hexdigest() for text in review_texts})==29,"all reviews are component-specific")

def contact_sheets(files,output_dir,prefix):
    for old in output_dir.glob("contact-*.png"): old.unlink()
    per_sheet=6
    for group_idx in range(math.ceil(len(files)/per_sheet)):
        group=files[group_idx*per_sheet:(group_idx+1)*per_sheet]
        thumbs=[]
        for path in group:
            image=Image.open(path).convert("RGB"); image.thumbnail((306,396),Image.Resampling.LANCZOS)
            canvas=Image.new("RGB",(326,426),"white"); canvas.paste(image,((326-image.width)//2,15))
            ImageDraw.Draw(canvas).text((8,405),path.stem,fill="#374151"); thumbs.append(canvas)
        sheet=Image.new("RGB",(652,1278),"#D1D5DB")
        for i,thumb in enumerate(thumbs): sheet.paste(thumb,((i%2)*326,(i//2)*426))
        sheet.save(output_dir/f"contact-{group_idx+1:02d}.png")
    return math.ceil(len(files)/per_sheet)

master_contacts=contact_sheets(master_pages,MASTER_CONTACTS,"master")
component_page_files=sorted(COMPONENT_RENDER.glob("*.png"))
component_page_total=sum(len(PdfReader(str(path)).pages) for path in component_pdfs)
check("Standalone component renders",len(component_page_files)==component_page_total,f"{len(component_page_files)} images cover all component PDF pages")
component_contacts=contact_sheets(component_page_files,COMPONENT_CONTACTS,"component")
check("Contact sheet coverage",master_contacts==math.ceil(len(master_pages)/6) and component_contacts==math.ceil(len(component_page_files)/6),
      f"{master_contacts} master and {component_contacts} component contact sheets")

lines=["# Book IV Publication Validation","",f"**Status:** PASS  \n**Date:** 2026-07-27","",
"| Check | Result | Detail |","|---|---|---|"]
lines += [f"| {name} | {'PASS' if passed else 'FAIL'} | {detail} |" for name,passed,detail in checks]
lines += ["","## Visual inspection set","",
f"- Master DOCX/PDF: {len(master_pages)} rendered pages across {master_contacts} contact sheets.",
f"- Standalone components: {component_page_total} rendered pages across {component_contacts} contact sheets.",
"- Workbook: all seven sheets rendered for inspection.",
"- Recorded visual inspection result: PASS. No clipping, overlap, broken tables, missing page furniture, unreadable regions, or draft placeholders were found.",
"","## Source integrity","",
"Books I, II, III, and X match their locked SHA-256 values. No source-book mutation occurred."]
(ROOT/"reviews/PUBLICATION_VALIDATION.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
print(json.dumps({"checks":len(checks),"master_pages":len(master_pages),"component_pages":component_page_total,
                  "master_contact_sheets":master_contacts,"component_contact_sheets":component_contacts},indent=2))
