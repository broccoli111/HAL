from pathlib import Path
import io
import re

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path("/Users/rosslauda/Documents/HAL/Documents")
BOOK_I_SOURCE = ROOT / "Book I/PDF/HAL_Book_I_Constitution_v1.0.pdf"
BOOK_I_OUT = ROOT / "Book I/_Consolidated/BOOK_I_CONSTITUTION.pdf"
BOOK_II_SOURCE_DIR = ROOT / "Book II/PDF"
BOOK_II_OUT = ROOT / "Book II/_Consolidated/BOOK_II_ARCHITECTURE_SPECIFICATION.pdf"

NAVY = HexColor("#17324D")
BLUE = HexColor("#2F648C")
TEAL = HexColor("#3D7B78")
MUTED = HexColor("#5C6873")
LIGHT = HexColor("#EAF1F6")
WHITE = HexColor("#FFFFFF")
PAGE_W, PAGE_H = letter


def version_key(path: Path) -> tuple[int, int]:
    match = re.search(r"_v(\d+)\.(\d+)\.pdf$", path.name)
    if not match:
        return (-1, -1)
    return int(match.group(1)), int(match.group(2))


def latest_book_ii_chapters() -> list[tuple[int, Path, str, str]]:
    grouped: dict[int, list[Path]] = {}
    for path in BOOK_II_SOURCE_DIR.glob("HAL_Book_II_Chapter_*.pdf"):
        match = re.search(r"_Chapter_(\d{2})_(.+)_v\d+\.\d+\.pdf$", path.name)
        if match:
            grouped.setdefault(int(match.group(1)), []).append(path)
    if set(grouped) != set(range(1, 36)):
        missing = sorted(set(range(1, 36)) - set(grouped))
        raise RuntimeError(f"Book II chapter set is incomplete; missing {missing}")

    selected = []
    for number in range(1, 36):
        path = max(grouped[number], key=version_key)
        match = re.search(r"_Chapter_\d{2}_(.+)_v(\d+\.\d+)\.pdf$", path.name)
        title = match.group(1).replace("_", " ")
        selected.append((number, path, title, match.group(2)))
    return selected


def footer(c: canvas.Canvas, label: str, page_number: int) -> None:
    c.setStrokeColor(HexColor("#C7D2DC"))
    c.setLineWidth(0.6)
    c.line(54, 42, PAGE_W - 54, 42)
    c.setFont("Helvetica", 8)
    c.setFillColor(MUTED)
    c.drawString(54, 28, label)
    c.drawRightString(PAGE_W - 54, 28, str(page_number))


def wrap_text(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def build_book_ii_front_matter(
    chapters: list[tuple[int, Path, str, str]],
    start_pages: dict[int, int],
) -> bytes:
    stream = io.BytesIO()
    c = canvas.Canvas(stream, pagesize=letter)
    c.setTitle("HAL Book II - Architecture Specification")
    c.setAuthor("HAL Architecture Project")

    # Page 1: editorial cover.
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(58, PAGE_H - 86, "HAL")
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(58, PAGE_H - 150, "BOOK II")
    c.setFont("Helvetica-Bold", 22)
    c.drawString(58, PAGE_H - 184, "ARCHITECTURE SPECIFICATION")
    c.setStrokeColor(TEAL)
    c.setLineWidth(3)
    c.line(58, PAGE_H - 207, PAGE_W - 58, PAGE_H - 207)
    c.setFillColor(BLUE)
    c.setFont("Helvetica", 13)
    c.drawString(58, PAGE_H - 242, "Consolidated authoritative architecture baseline")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    c.drawString(58, PAGE_H - 286, "Chapters 1-35")
    c.drawString(58, PAGE_H - 304, "Compiled 27 July 2026")
    c.drawString(58, PAGE_H - 322, "Governed by Book I - The Constitution")
    c.setFillColor(LIGHT)
    c.roundRect(58, 118, PAGE_W - 116, 92, 6, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(76, 182, "AUTHORITATIVE EDITIONS")
    c.setFont("Helvetica", 9.5)
    c.drawString(76, 159, "Chapters 1-5: v0.2")
    c.drawString(226, 159, "Chapters 6-20: v0.3")
    c.drawString(396, 159, "Chapters 21-35: v0.2")
    footer(c, "HAL - Book II Architecture Specification", 1)
    c.showPage()

    # Page 2: compilation note.
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(58, PAGE_H - 76, "Document Control")
    c.setStrokeColor(HexColor("#C7D2DC"))
    c.line(58, PAGE_H - 90, PAGE_W - 58, PAGE_H - 90)
    y = PAGE_H - 128
    rows = [
        ("Document", "BOOK_II_ARCHITECTURE_SPECIFICATION"),
        ("Status", "Consolidated authoritative architecture baseline"),
        ("Scope", "Thirty-five chapters"),
        ("Constitutional authority", "Book I Constitution v1.0"),
        ("Compilation date", "27 July 2026"),
        ("Owner review", "No unresolved decisions recorded in the latest chapter set"),
    ]
    for label, value in rows:
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(BLUE)
        c.drawString(58, y, label.upper())
        c.setFont("Helvetica", 10)
        c.setFillColor(NAVY)
        for line in wrap_text(value, "Helvetica", 10, 330):
            c.drawString(218, y, line)
            y -= 13
        y -= 12
    c.setFillColor(LIGHT)
    c.roundRect(58, 196, PAGE_W - 116, 128, 6, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(76, 294, "Compilation rule")
    note = (
        "This edition includes the latest available PDF for each numbered chapter. "
        "Earlier chapter editions, batch reviews, project registers, and audit working papers "
        "are preserved separately and are not reproduced as chapters in this volume."
    )
    c.setFont("Helvetica", 10)
    y_note = 272
    for line in wrap_text(note, "Helvetica", 10, PAGE_W - 152):
        c.drawString(76, y_note, line)
        y_note -= 15
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(TEAL)
    c.drawString(58, 152, "BOOK I REMAINS THE SUPREME AUTHORITY")
    footer(c, "HAL - Book II Architecture Specification", 2)
    c.showPage()

    # Pages 3-4: contents.
    per_page = 18
    for group_index in range(2):
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 20)
        heading = "Contents" if group_index == 0 else "Contents - continued"
        c.drawString(58, PAGE_H - 70, heading)
        c.setStrokeColor(HexColor("#C7D2DC"))
        c.line(58, PAGE_H - 84, PAGE_W - 58, PAGE_H - 84)
        y = PAGE_H - 116
        for number, _, title, version in chapters[group_index * per_page : (group_index + 1) * per_page]:
            c.setFillColor(TEAL)
            c.setFont("Helvetica-Bold", 8.5)
            c.drawString(58, y, f"{number:02d}")
            c.setFillColor(NAVY)
            c.setFont("Helvetica-Bold", 9.2)
            c.drawString(88, y, title)
            c.setFont("Helvetica", 8)
            c.setFillColor(MUTED)
            c.drawRightString(PAGE_W - 92, y, f"v{version}")
            c.setFillColor(NAVY)
            c.setFont("Helvetica-Bold", 9)
            c.drawRightString(PAGE_W - 58, y, str(start_pages[number]))
            c.setStrokeColor(HexColor("#E0E6EB"))
            c.setLineWidth(0.35)
            c.line(58, y - 8, PAGE_W - 58, y - 8)
            y -= 31
        footer(c, "HAL - Book II Architecture Specification", 3 + group_index)
        c.showPage()

    c.save()
    return stream.getvalue()


def compile_book_i() -> None:
    reader = PdfReader(BOOK_I_SOURCE)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata(
        {
            "/Title": "BOOK_I_CONSTITUTION",
            "/Author": "HAL Architecture Project",
            "/Subject": "HAL Book I - The Constitution",
            "/Keywords": "HAL, Book I, Constitution, Decisions 1-58",
        }
    )
    writer.add_outline_item("HAL - Book I Constitution", 0)
    if len(reader.pages) > 2:
        writer.add_outline_item("Contents", 2)

    page_text = [page.extract_text() or "" for page in reader.pages]
    for decision in range(1, 59):
        pattern = re.compile(rf"(?:^|\n)\s*(?:Decision\s+)?{decision}\.\s+|(?:^|\n)\s*Decision\s+{decision}\s*[-—]")
        page_index = next(
            (i for i, text in enumerate(page_text[4:], start=4) if pattern.search(text)),
            None,
        )
        if page_index is not None:
            writer.add_outline_item(f"Decision {decision}", page_index)

    BOOK_I_OUT.parent.mkdir(parents=True, exist_ok=True)
    with BOOK_I_OUT.open("wb") as handle:
        writer.write(handle)


def compile_book_ii() -> None:
    chapters = latest_book_ii_chapters()
    front_pages = 4
    start_pages: dict[int, int] = {}
    next_page = front_pages + 1
    for number, path, _, _ in chapters:
        start_pages[number] = next_page
        next_page += len(PdfReader(path).pages)

    front_reader = PdfReader(io.BytesIO(build_book_ii_front_matter(chapters, start_pages)))
    writer = PdfWriter()
    for page in front_reader.pages:
        writer.add_page(page)

    writer.add_outline_item("HAL - Book II Architecture Specification", 0)
    writer.add_outline_item("Document Control", 1)
    writer.add_outline_item("Contents", 2)

    page_index = len(front_reader.pages)
    for number, path, title, version in chapters:
        reader = PdfReader(path)
        writer.add_outline_item(f"{number}. {title} (v{version})", page_index)
        for page in reader.pages:
            writer.add_page(page)
        page_index += len(reader.pages)

    writer.add_metadata(
        {
            "/Title": "BOOK_II_ARCHITECTURE_SPECIFICATION",
            "/Author": "HAL Architecture Project",
            "/Subject": "HAL Book II - Architecture Specification, Chapters 1-35",
            "/Keywords": "HAL, Book II, Architecture Specification, Chapters 1-35",
        }
    )
    BOOK_II_OUT.parent.mkdir(parents=True, exist_ok=True)
    with BOOK_II_OUT.open("wb") as handle:
        writer.write(handle)


def main() -> None:
    compile_book_i()
    compile_book_ii()
    print(BOOK_I_OUT)
    print(BOOK_II_OUT)


if __name__ == "__main__":
    main()
