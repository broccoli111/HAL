from __future__ import annotations

from pathlib import Path

from pypdf import PdfReader

DOCUMENTS = Path(__file__).resolve().parents[2]
OUTPUT = DOCUMENTS / "CANON_PROGRAM/source_text"
OUTPUT.mkdir(parents=True, exist_ok=True)

SOURCES = {
    "BOOK_I.txt": DOCUMENTS / "Book I/_Consolidated/BOOK_I_CONSTITUTION.pdf",
    "BOOK_II.txt": DOCUMENTS / "Book II/_Consolidated/BOOK_II_ARCHITECTURE_SPECIFICATION.pdf",
    "BOOK_III.txt": DOCUMENTS / "Book III/deliverables/HAL_BOOK_III_ENGINEERING_STANDARDS.pdf",
    "BOOK_IV.txt": DOCUMENTS / "Book IV/deliverables/HAL_BOOK_IV_COMPONENT_SPECIFICATIONS.pdf",
    "BOOK_X.txt": DOCUMENTS / "Book X/deliverables/HAL_BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.pdf",
}

for output_name, source in SOURCES.items():
    reader = PdfReader(str(source))
    text = "\n\n".join(
        f"--- PAGE {index} ---\n{page.extract_text() or ''}"
        for index, page in enumerate(reader.pages, start=1)
    )
    (OUTPUT / output_name).write_text(text + "\n", encoding="utf-8")
    print(f"{output_name}: {len(reader.pages)} pages, {len(text)} characters")
