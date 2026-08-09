from pathlib import Path
from PIL import Image, ImageDraw
import argparse
import re


def natural_key(path: Path):
    return [int(value) if value.isdigit() else value
            for value in re.split(r"(\d+)", path.name)]


parser = argparse.ArgumentParser()
parser.add_argument("source", type=Path)
parser.add_argument("destination", type=Path)
parser.add_argument("--batch", type=int, default=9)
args = parser.parse_args()

args.destination.mkdir(parents=True, exist_ok=True)
pages = sorted(args.source.glob("*.png"), key=natural_key)
thumb_w, thumb_h, gap = 720, 940, 20

for offset in range(0, len(pages), args.batch):
    batch = pages[offset:offset + args.batch]
    canvas = Image.new("RGB", (3 * thumb_w + 4 * gap, 3 * thumb_h + 4 * gap), "#e9eef4")
    draw = ImageDraw.Draw(canvas)
    for index, page in enumerate(batch):
        with Image.open(page) as source:
            image = source.convert("RGB")
            image.thumbnail((thumb_w - 20, thumb_h - 45))
            x = gap + (index % 3) * (thumb_w + gap)
            y = gap + (index // 3) * (thumb_h + gap)
            canvas.paste(image, (x + (thumb_w - image.width) // 2, y + 25))
            draw.text((x + 8, y + 5), page.stem, fill="#111827")
    canvas.save(args.destination / f"contact-{offset // args.batch + 1:02d}.png")

print({"pages": len(pages), "contacts": (len(pages) + args.batch - 1) // args.batch})
