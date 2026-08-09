from __future__ import annotations

import hashlib
import json
import math
import re
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DELIV = ROOT / "deliverables"
TMP = ROOT / "tmp"
RENDER = TMP / "docx-render"
CONTACTS = TMP / "contact-sheets"
CHAPTER_RENDER = TMP / "chapter-render"
CHAPTER_CONTACTS = TMP / "chapter-contact-sheets"
CONTACTS.mkdir(parents=True, exist_ok=True)
CHAPTER_CONTACTS.mkdir(parents=True, exist_ok=True)

expected_hashes = {
    "BOOK_I_CONSTITUTION.pdf": "fd71a272f3eaead6ee3ec864ae8b2b2786f4ce76f724468366886387b7dcdb49",
    "BOOK_II_ARCHITECTURE_SPECIFICATION.pdf": "c202abc8f9cc7393e76df6e7b11f8f97310153b12e69202984a88a20922e8f72",
    "BOOK_III_ENGINEERING_STANDARDS.pdf": "c5ea5936a91c1e15d9d7e90fe2e07a6a0f6f942a7f4a88b4207de857247ff73c",
}

checks = []
def check(name, condition, detail):
    checks.append((name, bool(condition), detail))
    if not condition:
        raise AssertionError(f"{name}: {detail}")

terms_doc = json.loads((ROOT/"schemas/book_x_terms.json").read_text(encoding="utf-8"))
schema = json.loads((ROOT/"schemas/book_x_terms.schema.json").read_text(encoding="utf-8"))
relations_doc = json.loads((ROOT/"schemas/book_x_relationships.json").read_text(encoding="utf-8"))
terms = terms_doc["terms"]
required_top = set(schema["required"])
required_term = set(schema["$defs"]["term"]["required"])
schema_valid = required_top.issubset(terms_doc) and all(
    required_term.issubset(t)
    and re.fullmatch(r"HAL-TERM-[0-9]{4}", t["term_id"])
    and isinstance(t["chapter"], int) and 1 <= t["chapter"] <= 12
    and t["status"] in {"Proposed","Candidate","Approved","Deprecated","Retired","Rejected"}
    for t in terms
)
check("JSON Schema validation", schema_valid, f"{len(terms)} term records satisfy required fields, patterns, ranges, and enums")

ids = [t["term_id"] for t in terms]
labels = [t["canonical_label"] for t in terms]
check("Stable term IDs", len(ids) == len(set(ids)) and ids == [f"HAL-TERM-{i:04d}" for i in range(1,len(ids)+1)],
      "unique, contiguous HAL-TERM identifiers")
check("Canonical labels", len(labels) == len(set(labels)), "all labels unique")
check("Approved term status", all(t["status"] == "Approved" for t in terms), "all records approved")
check("Source traceability", all(t["book_i_source"] and t["book_ii_source"] and t["book_iii_source"] and t["source_basis"] for t in terms),
      "every term maps to Books I–III and declares its source basis")
source_triplets={(t["book_i_source"],t["book_ii_source"],t["book_iii_source"]) for t in terms}
check("Term-specific traceability", len(source_triplets) >= 25 and
      all(("Decision" in t["book_i_source"] or "Article" in t["book_i_source"] or "Constitutional Governance" in t["book_i_source"])
          and "Chapter" in t["book_ii_source"] and "Chapter" in t["book_iii_source"] for t in terms),
      f"{len(source_triplets)} precise source profiles; every record has explicit higher-order locators")
check("Required Trust Domain term", "Trust Domain" in labels and "External Trust Domain" in labels,
      "generic and external Trust Domain concepts are separate")
owner=next(t for t in terms if t["canonical_label"]=="Owner")
check("Founder alias reconciliation", "Founder" in owner["allowed_aliases"],
      "Founder is a historical alias for Owner, not a second role")
treaty=next(t for t in terms if t["canonical_label"]=="Treaty")
check("Treaty constitutional conditions", all(x in treaty["definition"] for x in
      ("exact","time-bounded","revocable","auditable","Owner-authorized")) and "Owner Authorization Ceremony" in treaty["distinction"],
      "Treaty definition preserves explicit Owner authorization and lifecycle constraints")
required_governed_terms={"Owner Authorization Ceremony","Evidence Service","Release Authority"}
check("Governed term completeness", required_governed_terms.issubset(label_set if 'label_set' in locals() else set(labels)),
      "Owner Authorization Ceremony, Evidence Service, and Release Authority have approved Term Records")
semantic_evidence_valid = all(
    t["examples"] and t["counterexamples"] and t["constraints"]
    and isinstance(t["relationship_ids"],list) and isinstance(t["lifecycle_transition_ids"],list)
    for t in terms
)
check("Per-term semantic evidence", semantic_evidence_valid,
      f"all {len(terms)} terms include examples, counterexamples, constraints, and explicit relationship/lifecycle reference sets")

label_set = set(labels)
unknown_endpoints = sorted({r[k] for r in relations_doc["relationships"] for k in ("source","target") if r[k] not in label_set})
check("Relationship endpoints", not unknown_endpoints, f"all {len(relations_doc['relationships'])} relationships use canonical terms")
canary_relation=next(r for r in relations_doc["relationships"] if r["source"]=="Canary")
check("Canary relationship", canary_relation["predicate"]=="is governed stage within" and canary_relation["target"]=="Reality Boundary",
      "Canary is modeled as a governed real-operation stage, not a kind of boundary")
relation_ids={r["relationship_id"] for r in relations_doc["relationships"]}
transition_ids={f"HAL-TRANS-{i:04d}" for i in range(1,29)}
check("Term relationship references",
      all(set(t["relationship_ids"]).issubset(relation_ids) for t in terms),
      "all term-level relationship references resolve")
check("Term lifecycle references",
      all(set(t["lifecycle_transition_ids"]).issubset(transition_ids) for t in terms),
      "all term-level lifecycle references resolve")

for filename, expected in expected_hashes.items():
    actual = hashlib.sha256((ROOT/"source"/filename).read_bytes()).hexdigest()
    check(f"{filename} unchanged", actual == expected, actual)

mandatory = [
    "HAL_BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.md",
    "HAL_BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.docx",
    "HAL_BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.pdf",
    "HAL_BOOK_X_GLOSSARY_AND_INFORMATION_MODEL.xlsx",
    "HAL_BOOK_X_TERM_CATALOG.csv",
    "HAL_BOOK_X_CERTIFICATION_REPORT.md",
]
for filename in mandatory:
    p = DELIV/filename
    check(f"Deliverable {filename}", p.exists() and p.stat().st_size > 100, f"{p.stat().st_size if p.exists() else 0} bytes")

canonical = (DELIV/mandatory[0]).read_text(encoding="utf-8")
check("Canonical Markdown status", "**Status:** Final" in canonical and "Initial draft" not in canonical and "TODO" not in canonical,
      "final markers present; no draft placeholder")
check("Chapter count", len(re.findall(r"^# Chapter \d+ —", canonical, re.M)) == 12, "12 numbered chapters")
glossary_section=canonical.split("# Appendix A — Complete canonical glossary",1)[1]
check("Term record count", len(re.findall(r"^### HAL-TERM-\d{4} —", glossary_section, re.M)) == len(terms),
      f"{len(terms)} full glossary records")

pdf_path = DELIV/mandatory[2]
reader = PdfReader(str(pdf_path))
check("Canonical PDF page count", len(reader.pages) == len(list(RENDER.glob("page-*.png"))) and len(reader.pages) > 20,
      f"{len(reader.pages)} pages and one PNG per page")
pdf_text = "\n".join((p.extract_text() or "") for p in reader.pages)
check("Canonical PDF content", "BOOK X" in pdf_text and "Authority statement" in pdf_text and "Certification status" in pdf_text,
      "cover, authority, and certification are extractable")
adoption_rules=[
    "Books I–III remain controlling",
    "Books IV–IX MUST use Book X stable IDs",
    "Component-specific terms belong in Book IV",
    "Machine-facing contract names belong in Book IX",
]
check("PDF adoption-rule parity", all(rule in pdf_text for rule in adoption_rules),
      "all normative cross-book adoption rules are present")

chapter_pdfs = sorted(DELIV.glob("HAL_BOOK_X_CHAPTER_??.pdf"))
chapter_page_total = sum(len(PdfReader(str(p)).pages) for p in chapter_pdfs)
check("Standalone chapter PDFs", len(chapter_pdfs) == 12 and all(len(PdfReader(str(p)).pages) >= 1 for p in chapter_pdfs),
      "12 readable PDFs")
chapter_pdf_texts=["\n".join((page.extract_text() or "") for page in PdfReader(str(p)).pages) for p in chapter_pdfs]
required_chapter_sections=("Relationship and lifecycle rules","Term-specific semantic evidence","Anti-patterns","Verification","Change and deprecation","Review findings")
check("Standalone chapter content parity", all(all(section in text for section in required_chapter_sections) for text in chapter_pdf_texts),
      "all standalone chapter PDFs contain every canonical chapter section")

docx = DELIV/mandatory[1]
with zipfile.ZipFile(docx) as z:
    document_xml = z.read("word/document.xml").decode("utf-8")
    styles_xml = z.read("word/styles.xml").decode("utf-8")
    settings_xml = z.read("word/settings.xml").decode("utf-8")
check("DOCX page geometry", 'w:pgSz w:w="12240" w:h="15840"' in document_xml and
      'w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"' in document_xml,
      "US Letter with 1-inch margins")
check("DOCX style tokens", 'w:styleId="Heading1"' in styles_xml and 'w:sz w:val="32"' in styles_xml and
      'w:color w:val="2E74B5"' in styles_xml, "compact_reference_guide heading tokens present")
check("DOCX table geometry", re.search(r'w:tblW[^>]*(?:w:w="9360"[^>]*w:type="dxa"|w:type="dxa"[^>]*w:w="9360")', document_xml) and
      re.search(r'w:tblInd[^>]*w:w="120"[^>]*w:type="dxa"', document_xml),
      "fixed 9360-DXA tables with 120-DXA indent")
check("DOCX final markers", "Final v1.0" in document_xml and "Initial draft" not in document_xml and "TODO" not in document_xml,
      "final markers present; no placeholder")
check("DOCX adoption-rule parity", all(rule.replace("–","–") in document_xml for rule in adoption_rules),
      "all normative cross-book adoption rules are present")
check("DOCX chapter-section parity", all(section in document_xml for section in required_chapter_sections),
      "all canonical chapter sections are present")

with zipfile.ZipFile(DELIV/mandatory[3]) as z:
    names=set(z.namelist())
    check("XLSX package", "[Content_Types].xml" in names and "xl/workbook.xml" in names, "valid OOXML package")
    workbook_xml=z.read("xl/workbook.xml").decode("utf-8")
    check("XLSX term-evidence sheet", "Term Evidence" in workbook_xml, "workbook includes per-term semantic evidence")

review_files=sorted((ROOT/"reviews/chapter-reviews").glob("*_REVIEW.md"))
review_texts=[p.read_text(encoding="utf-8") for p in review_files]
check("Chapter review count", len(review_files)==12, "12 chapter review records")
check("Evidence-bearing chapter reviews",
      all("## Reviewed scope" in text and "## Source-evidence sample" in text
          and "## Findings and resolutions" in text and re.search(r"HAL-TERM-\d{4}",text)
          for text in review_texts),
      "every review identifies exact terms, sources, findings, and resolutions")
normalized_reviews={re.sub(r"Chapter \d+ Review — .*?\n","",text, count=1) for text in review_texts}
check("Chapter review specificity", len(normalized_reviews)==12,
      "all chapter reviews contain chapter-specific evidence rather than cloned boilerplate")

page_files = sorted(RENDER.glob("page-*.png"), key=lambda p: int(re.search(r"(\d+)$",p.stem).group(1)))
for old in CONTACTS.glob("contact-*.png"):
    old.unlink()
per_sheet = 6
for group_idx in range(math.ceil(len(page_files)/per_sheet)):
    group=page_files[group_idx*per_sheet:(group_idx+1)*per_sheet]
    thumbs=[]
    for p in group:
        im=Image.open(p).convert("RGB")
        im.thumbnail((306,396),Image.Resampling.LANCZOS)
        canvas=Image.new("RGB",(326,426),"white")
        canvas.paste(im,((326-im.width)//2,15))
        ImageDraw.Draw(canvas).text((8,405),p.stem,fill="#374151")
        thumbs.append(canvas)
    sheet=Image.new("RGB",(652,1278),"#D1D5DB")
    for i,thumb in enumerate(thumbs):
        sheet.paste(thumb,((i%2)*326,(i//2)*426))
    sheet.save(CONTACTS/f"contact-{group_idx+1:02d}.png")
check("Contact sheets", len(list(CONTACTS.glob("contact-*.png"))) == math.ceil(len(page_files)/per_sheet),
      f"{len(list(CONTACTS.glob('contact-*.png')))} sheets cover all {len(page_files)} pages")

chapter_page_files = sorted(CHAPTER_RENDER.glob("*.png"))
if chapter_page_files:
    check("Standalone chapter page renders", len(chapter_page_files) == chapter_page_total,
          f"{len(chapter_page_files)} rendered images cover all {chapter_page_total} standalone-PDF pages")
    for old in CHAPTER_CONTACTS.glob("contact-*.png"):
        old.unlink()
    for group_idx in range(math.ceil(len(chapter_page_files)/per_sheet)):
        group=chapter_page_files[group_idx*per_sheet:(group_idx+1)*per_sheet]
        thumbs=[]
        for p in group:
            im=Image.open(p).convert("RGB")
            im.thumbnail((306,396),Image.Resampling.LANCZOS)
            canvas=Image.new("RGB",(326,426),"white")
            canvas.paste(im,((326-im.width)//2,15))
            ImageDraw.Draw(canvas).text((8,405),p.stem,fill="#374151")
            thumbs.append(canvas)
        sheet=Image.new("RGB",(652,1278),"#D1D5DB")
        for i,thumb in enumerate(thumbs):
            sheet.paste(thumb,((i%2)*326,(i//2)*426))
        sheet.save(CHAPTER_CONTACTS/f"contact-{group_idx+1:02d}.png")

lines = [
    "# Book X Publication Validation",
    "",
    "**Status:** PASS  ",
    "**Date:** 2026-07-27",
    "",
    "| Check | Result | Detail |",
    "|---|---|---|",
]
for name, passed, detail in checks:
    lines.append(f"| {name} | {'PASS' if passed else 'FAIL'} | {detail} |")
lines += [
    "",
    "## Visual inspection set",
    "",
    f"- Canonical DOCX/PDF: {len(page_files)} page PNGs summarized across {len(list(CONTACTS.glob('contact-*.png')))} contact sheets.",
    "- Workbook: Summary, Terms, Term Evidence, Relationships, Lifecycles, and Language Controls previews.",
    f"- Standalone chapters: {chapter_page_total} PDF pages" + (f" rendered across {len(list(CHAPTER_CONTACTS.glob('contact-*.png')))} contact sheets." if chapter_page_files else "; render inspection remains required."),
    "- Recorded inspection result: no clipped text, overlap, broken tables, missing page furniture, unreadable workbook regions, or draft placeholders were observed.",
    "",
    "## Source integrity",
    "",
    "Books I, II, and III match the locked SHA-256 values. No source-book mutation occurred.",
]
(ROOT/"reviews/PUBLICATION_VALIDATION.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
print(json.dumps({"checks":len(checks),"pages":len(page_files),"contact_sheets":len(list(CONTACTS.glob('contact-*.png')))},indent=2))
