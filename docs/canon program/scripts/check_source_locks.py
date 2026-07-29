from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

LOCKS = {
    "Book I": (
        ROOT / "Book I/_Consolidated/BOOK_I_CONSTITUTION.pdf",
        "fd71a272f3eaead6ee3ec864ae8b2b2786f4ce76f724468366886387b7dcdb49",
    ),
    "Book II": (
        ROOT / "Book II/_Consolidated/BOOK_II_ARCHITECTURE_SPECIFICATION.pdf",
        "c202abc8f9cc7393e76df6e7b11f8f97310153b12e69202984a88a20922e8f72",
    ),
    "Book III": (
        ROOT / "Book III/deliverables/HAL_BOOK_III_ENGINEERING_STANDARDS.pdf",
        "c5ea5936a91c1e15d9d7e90fe2e07a6a0f6f942a7f4a88b4207de857247ff73c",
    ),
    "Book IV": (
        ROOT / "Book IV/deliverables/HAL_BOOK_IV_COMPONENT_SPECIFICATIONS.pdf",
        "1092bc4ef796a3272a2677df88d5bb85c6325c3f4ba5008eae9ad8fd7aead1bd",
    ),
    "Book X": (
        ROOT / "Book X/deliverables/HAL_BOOK_X_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.pdf",
        "efb67c87f2690ad3a6c8d93877b1a357a2aa70b1d5ab83a4d089728f1913ac28",
    ),
}


results = []
for book, (path, expected) in LOCKS.items():
    actual = hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else None
    results.append(
        {
            "book": book,
            "path": str(path),
            "expected": expected,
            "actual": actual,
            "status": "PASS" if actual == expected else "FAIL",
        }
    )

print(json.dumps(results, indent=2))
if any(item["status"] != "PASS" for item in results):
    raise SystemExit(1)
