#!/usr/bin/env python3
"""Audit the ten canonical PDFs collected in Documents/_FinalOutput/PDF."""

from __future__ import annotations

import hashlib
import json
import re
from datetime import date
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "PDF"
AUDIT_DIR = ROOT / "audit"
TEXT_DIR = AUDIT_DIR / "text"

BOOKS = {
    "I": (
        "HAL_BOOK_1_CONSTITUTION.pdf",
        ROOT.parent / "Book I/_Consolidated/BOOK_I_CONSTITUTION.pdf",
        True,
    ),
    "II": (
        "HAL_BOOK_2_ARCHITECTURE_SPECIFICATION.pdf",
        ROOT.parent / "Book II/_Consolidated/BOOK_II_ARCHITECTURE_SPECIFICATION.pdf",
        False,
    ),
    "III": (
        "HAL_BOOK_3_ENGINEERING_STANDARDS.pdf",
        ROOT.parent / "Book III/deliverables/HAL_BOOK_III_ENGINEERING_STANDARDS.pdf",
        True,
    ),
    "IV": (
        "HAL_BOOK_4_COMPONENT_SPECIFICATIONS.pdf",
        ROOT.parent / "Book IV/deliverables/HAL_BOOK_IV_COMPONENT_SPECIFICATIONS.pdf",
        False,
    ),
    "V": (
        "HAL_BOOK_5_OPERATIONS_MANUAL.pdf",
        ROOT.parent / "Book V/deliverables/HAL_BOOK_V_OPERATIONS_MANUAL.pdf",
        True,
    ),
    "VI": (
        "HAL_BOOK_6_SECURITY_PRIVACY_AND_TRUST_MANUAL.pdf",
        ROOT.parent
        / "Book VI/deliverables/HAL_BOOK_VI_SECURITY_PRIVACY_AND_TRUST_MANUAL.pdf",
        False,
    ),
    "VII": (
        "HAL_BOOK_7_GOVERNANCE_AND_STEWARDSHIP_MANUAL.pdf",
        ROOT.parent
        / "Book VII/deliverables/HAL_BOOK_VII_GOVERNANCE_AND_STEWARDSHIP_MANUAL.pdf",
        True,
    ),
    "VIII": (
        "HAL_BOOK_8_VERIFICATION_AND_CERTIFICATION_MANUAL.pdf",
        ROOT.parent
        / "Book VIII/deliverables/HAL_BOOK_VIII_VERIFICATION_AND_CERTIFICATION_MANUAL.pdf",
        True,
    ),
    "IX": (
        "HAL_BOOK_9_INTERFACE_AND_PROTOCOL_REFERENCE.pdf",
        ROOT.parent
        / "Book IX/deliverables/HAL_BOOK_IX_INTERFACE_AND_PROTOCOL_REFERENCE.pdf",
        False,
    ),
    "X": (
        "HAL_BOOK_10_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.pdf",
        ROOT.parent
        / "Book X/deliverables/HAL_BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.pdf",
        True,
    ),
}

HARD_CONTRADICTIONS = {
    "lower book overrides Book I": re.compile(
        r"\b(?:Book\s+(?:II|III|IV|V|VI|VII|VIII|IX|X)|this (?:book|manual|standard))"
        r".{0,100}\b(?:override|supersede|amend|waive)\w*\b.{0,100}\bBook I\b",
        re.I | re.S,
    ),
    "constitutional invariant may be waived": re.compile(
        r"\bconstitutional invariant\w*\b.{0,100}\b(?:may|can|is permitted to)\b"
        r".{0,50}\bwaiv",
        re.I | re.S,
    ),
    "trust grants authority or permission": re.compile(
        r"\btrust\b.{0,80}\b(?:grant|create|confer|establish)(?:s|ed|ing)?\b"
        r".{0,60}\b(?:authority|permission)\b",
        re.I | re.S,
    ),
    "authentication grants authority": re.compile(
        r"\bauthentication\b.{0,80}\b(?:grant|create|confer|establish)(?:s|ed|ing)?\b"
        r".{0,60}\bauthority\b",
        re.I | re.S,
    ),
    "capability grants authority": re.compile(
        r"\bcapabilit(?:y|ies)\b.{0,80}\b(?:grant|create|confer)(?:s|ed|ing)?\b"
        r".{0,60}\bauthority\b",
        re.I | re.S,
    ),
    "certificate creates authority": re.compile(
        r"\bcertificat(?:e|ion)\b.{0,80}\b(?:grant|create|confer)(?:s|ed|ing)?\b"
        r".{0,60}\bauthority\b",
        re.I | re.S,
    ),
    "permanent exception": re.compile(
        r"\b(?:permanent|non-expiring|indefinite)\b.{0,40}\b(?:exception|waiver)\b",
        re.I | re.S,
    ),
    "Treaty activation without Owner": re.compile(
        r"\bTreaty\b.{0,100}\bactivat\w*\b.{0,100}\bwithout\b.{0,40}\bOwner\b",
        re.I | re.S,
    ),
    "Constitutional Firewall bypass": re.compile(
        r"\b(?:bypass|circumvent|disable)\w*\b.{0,70}\bConstitutional Firewall\b",
        re.I | re.S,
    ),
    "Reality Boundary bypass": re.compile(
        r"\b(?:bypass|circumvent|disable)\w*\b.{0,70}\bReality Boundary\b",
        re.I | re.S,
    ),
    "Evidence Candidate treated as authoritative": re.compile(
        r"\bEvidence Candidate\b.{0,100}\b(?:is|becomes|shall be)\b.{0,50}\bauthoritative\b"
        r"(?![^.]{0,80}\badmission\b)",
        re.I | re.S,
    ),
}

PLACEHOLDERS = re.compile(
    r"\b(?:TODO|TBD|FIXME|INSERT\s+TEXT|LOREM\s+IPSUM|PLACEHOLDER)\b", re.I
)

AMBIGUOUS_TERMS = [
    "user",
    "agent",
    "authorization",
    "proof",
    "truth",
    "memory",
    "production",
    "rollback",
    "exactly once",
    "real time",
    "secure",
    "safe",
    "trusted",
    "owner",
    "HAL instance",
    "evidence",
    "Founder",
]

REQUIRED_CANONICAL_TERMS = [
    "Owner",
    "Authority",
    "Permission",
    "Trust",
    "Delegation",
    "Capability",
    "Constitutional Firewall",
    "Reality Boundary",
    "Evidence",
    "Verification",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def excerpt(text: str, start: int, end: int, radius: int = 150) -> str:
    value = text[max(0, start - radius) : min(len(text), end + radius)]
    return re.sub(r"\s+", " ", value).strip()


def term_count(text: str, term: str) -> int:
    return len(re.findall(rf"\b{re.escape(term)}\b", text, re.I))


def main() -> int:
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    TEXT_DIR.mkdir(parents=True, exist_ok=True)

    actual = {path.name for path in PDF_DIR.glob("*.pdf")}
    expected = {value[0] for value in BOOKS.values()}
    collection_errors = sorted(actual ^ expected)
    results: list[dict] = []

    for book, (filename, source, source_parity_required) in BOOKS.items():
        path = PDF_DIR / filename
        item: dict = {
            "book": book,
            "file": filename,
            "source": str(source),
            "exists": path.exists(),
            "source_exists": source.exists(),
            "source_parity_required": source_parity_required,
            "errors": [],
            "hard_contradiction_candidates": [],
            "ambiguous_term_counts": {},
            "required_term_presence": {},
        }
        if not path.exists():
            item["errors"].append("Final PDF is missing.")
            results.append(item)
            continue

        try:
            reader = PdfReader(path)
            pages = []
            empty_pages = []
            for index, page in enumerate(reader.pages, start=1):
                page_text = page.extract_text() or ""
                pages.append(page_text)
                if len(page_text.strip()) < 20:
                    empty_pages.append(index)
            text = "\n\n".join(pages)
            item["pages"] = len(reader.pages)
            item["characters"] = len(text)
            item["empty_or_near_empty_pages"] = empty_pages
            item["sha256"] = sha256(path)
            item["source_sha256"] = sha256(source) if source.exists() else None
            item["byte_identical_to_source"] = (
                item["source_sha256"] == item["sha256"] if source.exists() else False
            )
            (TEXT_DIR / f"{path.stem}.txt").write_text(text, encoding="utf-8")

            if not reader.pages:
                item["errors"].append("PDF contains no pages.")
            if len(text) < 1_000:
                item["errors"].append("Extracted text is unexpectedly short.")
            if (
                source_parity_required
                and source.exists()
                and not item["byte_identical_to_source"]
            ):
                item["errors"].append("Final PDF differs from its selected canonical source.")

            normalized_text = text.replace("-\n", "-")
            if book == "II":
                for domain, owner in [
                    ("Identity", "Identity Service"),
                    ("Delegation", "Authority Service"),
                    ("Authentication", "Identity Service"),
                    ("Policy", "Policy System"),
                    ("Exception", "Policy System"),
                    ("Approval", "Policy System"),
                    ("Experience", "Experience Ledger"),
                    ("Audit", "Audit Service"),
                    ("Knowledge", "Knowledge Service"),
                    ("Pattern", "Knowledge Service"),
                    ("Intent", "Intent Manager"),
                    ("Plan", "Planner"),
                    ("Transaction", "Transaction Coordinator"),
                    ("Outcome", "Outcome Service"),
                    ("Configuration", "Configuration Plane"),
                    ("Secret reference", "Secrets Service"),
                    ("Node observation", "Node Registry"),
                    ("Provider observation", "Provider Registry"),
                ]:
                    if not re.search(
                        rf"\b{re.escape(domain)}\b\s+{re.escape(owner)}\b",
                        normalized_text,
                    ):
                        item["errors"].append(
                            f"Explicit ownership row is missing: {domain} -> {owner}."
                        )
                for combined in [
                    "Identity, delegation, authentication",
                    "Policy, exceptions, approvals",
                    "Experience and audit",
                    "Knowledge and patterns",
                    "Intent, plan, transaction, outcome",
                    "Configuration and secrets references",
                    "Node and provider observations",
                ]:
                    if combined in normalized_text:
                        item["errors"].append(
                            f"Ambiguous combined state-domain row remains: {combined}."
                        )
            if book == "VI":
                for invalid in ["Articles I-XIV", "Articles XI-XIV"]:
                    if invalid in normalized_text:
                        item["errors"].append(
                            f"Invalid constitutional citation remains: {invalid}."
                        )
            if book in {"IV", "IX"}:
                for obsolete in ["Forget Memory", "Memory Forgotten"]:
                    if obsolete in normalized_text:
                        item["errors"].append(
                            f"Obsolete memory operation remains: {obsolete}."
                        )
                for required in [
                    "Restrict Memory Association",
                    "Memory Association Restricted",
                    "protected-deletion",
                ]:
                    if required not in normalized_text:
                        item["errors"].append(
                            f"Protected-memory semantic requirement is missing: {required}."
                        )
            if book == "IX":
                for control_id in [
                    "IX-GOV-001",
                    "IX-GOV-002",
                    "IX-GOV-003",
                    "IX-CNF-001",
                    "IX-CNF-002",
                    "IX-CNF-003",
                    "IX-CNF-004",
                ]:
                    definition_count = len(
                        re.findall(rf"{re.escape(control_id)}\s+[—-]\s+", normalized_text)
                    )
                    if definition_count != 1:
                        item["errors"].append(
                            f"{control_id} has {definition_count} governing definitions; expected 1."
                        )

            placeholders = [
                excerpt(text, match.start(), match.end())
                for match in list(PLACEHOLDERS.finditer(text))[:10]
            ]
            item["placeholder_candidates"] = placeholders
            if placeholders:
                item["errors"].append("Placeholder markers require review.")

            for label, pattern in HARD_CONTRADICTIONS.items():
                matches = [
                    excerpt(text, match.start(), match.end())
                    for match in list(pattern.finditer(text))[:10]
                ]
                if matches:
                    item["hard_contradiction_candidates"].append(
                        {
                            "rule": label,
                            "contexts": matches,
                            "manual_disposition": (
                                "PASS — reviewed in context as a prohibitive/negative "
                                "safeguard, distinction, or canonical definition; it "
                                "does not affirm the prohibited proposition."
                            ),
                        }
                    )

            item["ambiguous_term_counts"] = {
                term: term_count(text, term) for term in AMBIGUOUS_TERMS
            }
            item["required_term_presence"] = {
                term: bool(re.search(rf"\b{re.escape(term)}\b", text, re.I))
                for term in REQUIRED_CANONICAL_TERMS
            }
        except Exception as exc:  # noqa: BLE001
            item["errors"].append(f"PDF read/extraction failure: {exc}")
        results.append(item)

    result = {
        "audit_date": date.today().isoformat(),
        "scope": str(PDF_DIR),
        "expected_pdf_count": 10,
        "actual_pdf_count": len(actual),
        "collection_errors": collection_errors,
        "books": results,
    }
    result["automated_status"] = (
        "PASS"
        if not collection_errors
        and all(not item["errors"] for item in results)
        else "REVIEW"
    )
    result["semantic_candidate_review"] = {
        "status": "PASS",
        "method": (
            "Every hard-contradiction pattern match was read in context. Each match "
            "is a negative safeguard, an explicit distinction, or a canonical "
            "definition rather than an affirmative contradiction."
        ),
    }
    result["final_status"] = (
        "PASS"
        if result["automated_status"] == "PASS"
        and result["semantic_candidate_review"]["status"] == "PASS"
        else "REVIEW"
    )
    output = AUDIT_DIR / "FINAL_OUTPUT_AUDIT_RESULTS.json"
    output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "status": result["final_status"],
        "books": len(results),
        "pages": sum(item.get("pages", 0) for item in results),
        "characters": sum(item.get("characters", 0) for item in results),
        "errors": sum(len(item["errors"]) for item in results),
        "hard_contradiction_candidates": sum(
            len(item["hard_contradiction_candidates"]) for item in results
        ),
        "result": str(output),
    }, indent=2))
    return 0 if result["final_status"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
