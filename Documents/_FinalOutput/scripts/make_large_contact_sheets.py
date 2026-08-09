#!/usr/bin/env python3
"""Create dense whole-document contact sheets for final render QA."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

from PIL import Image, ImageDraw


def natural_key(path: Path):
    return [
        int(value) if value.isdigit() else value
        for value in re.split(r"(\d+)", path.name)
    ]


parser = argparse.ArgumentParser()
parser.add_argument("source", type=Path)
parser.add_argument("destination", type=Path)
args = parser.parse_args()

columns, rows = 6, 6
thumb_w, thumb_h, gap = 360, 480, 12
batch_size = columns * rows
pages = sorted(args.source.glob("page-*.png"), key=natural_key)
args.destination.mkdir(parents=True, exist_ok=True)

for offset in range(0, len(pages), batch_size):
    batch = pages[offset : offset + batch_size]
    canvas = Image.new(
        "RGB",
        (
            columns * thumb_w + (columns + 1) * gap,
            rows * thumb_h + (rows + 1) * gap,
        ),
        "#e9eef4",
    )
    draw = ImageDraw.Draw(canvas)
    for index, page in enumerate(batch):
        with Image.open(page) as source:
            image = source.convert("RGB")
            image.thumbnail((thumb_w - 12, thumb_h - 28))
            x = gap + (index % columns) * (thumb_w + gap)
            y = gap + (index // columns) * (thumb_h + gap)
            canvas.paste(
                image,
                (x + (thumb_w - image.width) // 2, y + 20),
            )
            draw.text((x + 5, y + 3), page.stem, fill="#111827")
    canvas.save(args.destination / f"contact-{offset // batch_size + 1:02d}.png")

print({"pages": len(pages), "contacts": (len(pages) + batch_size - 1) // batch_size})
