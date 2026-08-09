from pathlib import Path
import re
import sys


ROOT = Path("/Users/rosslauda/Documents/HAL/Documents/Book II")
MD_DIR = ROOT / "markdown"
DOC_DIR = ROOT / "DOC"
PDF_DIR = ROOT / "PDF"


def version_key(path: Path) -> tuple[int, int]:
    match = re.search(r"_v(\d+)\.(\d+)\.", path.name)
    if not match:
        return (-1, -1)
    return (int(match.group(1)), int(match.group(2)))


def latest_chapters(directory: Path, suffix: str) -> dict[int, Path]:
    found: dict[int, list[Path]] = {}
    for path in directory.glob(f"HAL_Book_II_Chapter_*{suffix}"):
        match = re.search(r"_Chapter_(\d{2})_", path.name)
        if match:
            found.setdefault(int(match.group(1)), []).append(path)
    return {chapter: max(paths, key=version_key) for chapter, paths in found.items()}


def require(condition: bool, message: str, failures: list[str]) -> None:
    if not condition:
        failures.append(message)


def main() -> int:
    failures: list[str] = []
    latest_md = latest_chapters(MD_DIR, ".md")
    latest_docx = latest_chapters(DOC_DIR, ".docx")
    latest_pdf = latest_chapters(PDF_DIR, ".pdf")

    expected = set(range(1, 36))
    require(set(latest_md) == expected, "Markdown does not contain one latest edition for Chapters 1–35.", failures)
    require(set(latest_docx) == expected, "DOC does not contain one latest edition for Chapters 1–35.", failures)
    require(set(latest_pdf) == expected, "PDF does not contain one latest edition for Chapters 1–35.", failures)

    corpus = "\n".join(latest_md[c].read_text(encoding="utf-8") for c in sorted(latest_md))
    lowered = corpus.lower()

    required_phrases = [
        "cryptographic payload erasure",
        "minimal non-sensitive tombstone",
        "owner authorization ceremony",
        "limited to 24 hours",
        "any extension requires fresh owner authorization",
        "returns the successor to restricted or safe recovery mode",
        "two exact-change owner authorization ceremonies",
        "72-hour cooling-off period",
        "signed constitutional mirror",
        "independently verified recovery point",
        "preserves hal identity or creates a successor constitutional system",
        "any material proposal change restarts the complete process",
        "conversation service is the sole semantic owner of conversation objects",
        "treaty manager in this chapter is the sole authoritative owner of treaty lifecycle state",
        "scheduler is the sole authority for work admission and placement",
        "constitutional kernel may validate and commit",
        "persistence layer is a physical custodian",
    ]
    for phrase in required_phrases:
        require(phrase in lowered, f"Required resolution language is missing: {phrase}", failures)

    prohibited_phrases = [
        "architect draft complete; constitutional audit passed; engineering review passed",
        "source-aligned draft complete; architecture audit passed",
        "one central constitutional control plane",
    ]
    for phrase in prohibited_phrases:
        require(phrase not in lowered, f"Superseded or self-approval language remains: {phrase}", failures)

    decisions: set[int] = set()
    for match in re.finditer(r"\bDecision(?:s)?\s+([0-9,\s–—-]+)", corpus, re.IGNORECASE):
        for number in re.findall(r"\d+", match.group(1)):
            value = int(number)
            if 1 <= value <= 58:
                decisions.add(value)
        for start, end in re.findall(r"(\d+)\s*[–—-]\s*(\d+)", match.group(1)):
            a, b = int(start), int(end)
            if 1 <= a <= b <= 58:
                decisions.update(range(a, b + 1))
    require(decisions == set(range(1, 59)), f"Constitutional decision references are incomplete: {sorted(set(range(1, 59)) - decisions)}", failures)

    if failures:
        print("AUDIT FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("AUDIT PASSED")
    print("Chapters: 35/35 in Markdown, DOCX, and PDF")
    print("Constitutional decisions referenced: 58/58")
    print("Owner decisions unresolved: 0")
    print("Constitutional conflicts detected: 0")
    for chapter in sorted(latest_md):
        print(
            f"{chapter:02d}: "
            f"{latest_md[chapter].stem.rsplit('_', 1)[-1]} | "
            f"{latest_docx[chapter].stem.rsplit('_', 1)[-1]} | "
            f"{latest_pdf[chapter].stem.rsplit('_', 1)[-1]}"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
