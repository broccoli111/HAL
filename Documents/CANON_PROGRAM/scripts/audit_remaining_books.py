from __future__ import annotations

import json
import re
from pathlib import Path

DOCUMENTS = Path(__file__).resolve().parents[2]

EXPECTED = {
    "Book V": "HAL_BOOK_V_OPERATIONS_MANUAL",
    "Book VI": "HAL_BOOK_VI_SECURITY_PRIVACY_AND_TRUST_MANUAL",
    "Book VII": "HAL_BOOK_VII_GOVERNANCE_AND_STEWARDSHIP_MANUAL",
    "Book VIII": "HAL_BOOK_VIII_VERIFICATION_AND_CERTIFICATION_MANUAL",
    "Book IX": "HAL_BOOK_IX_INTERFACE_AND_PROTOCOL_REFERENCE",
}


def inspect_book(book: str, stem: str) -> dict:
    root = DOCUMENTS / book
    deliverables = root / "deliverables"
    md = deliverables / f"{stem}.md"
    docx = deliverables / f"{stem}.docx"
    pdf = deliverables / f"{stem}.pdf"
    certification = sorted(deliverables.glob("*CERTIFICATION_REPORT.md"))
    text = md.read_text(encoding="utf-8") if md.exists() else ""
    forbidden = sorted(
        set(
            match.group(0)
            for match in re.finditer(
                r"\b(?:TODO|TBD|placeholder|initial draft)\b", text, re.IGNORECASE
            )
        )
    )
    return {
        "book": book,
        "directory": root.exists(),
        "markdown": md.exists() and md.stat().st_size > 1000,
        "docx": docx.exists() and docx.stat().st_size > 1000,
        "pdf": pdf.exists() and pdf.stat().st_size > 1000,
        "certification_report": bool(certification),
        "final_marker": bool(
            re.search(
                r"^(?:\*\*)?Status:(?:\*\*)?\s+(?:Certified\s+)?Final\b",
                text,
                re.IGNORECASE | re.MULTILINE,
            )
        ),
        "owner_review_addressed": "Owner Review" in text,
        "forbidden_markers": forbidden,
    }


results = [inspect_book(book, stem) for book, stem in EXPECTED.items()]
print(json.dumps(results, indent=2))

complete = all(
    item["directory"]
    and item["markdown"]
    and item["docx"]
    and item["pdf"]
    and item["certification_report"]
    and item["final_marker"]
    and item["owner_review_addressed"]
    and not item["forbidden_markers"]
    for item in results
)
raise SystemExit(0 if complete else 2)
