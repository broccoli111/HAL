from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import re

ROOT = Path(__file__).resolve().parents[1]


def natural_key(path: Path):
    return [int(x) if x.isdigit() else x for x in re.split(r"(\d+)", path.name)]


def make_contacts(source: Path, destination: Path, prefix: str, batch_size: int = 9):
    destination.mkdir(parents=True, exist_ok=True)
    pages = sorted(source.glob("*.png"), key=natural_key)
    for batch_index in range(0, len(pages), batch_size):
        batch = pages[batch_index : batch_index + batch_size]
        thumb_w, thumb_h = 720, 940
        gap = 20
        canvas = Image.new("RGB", (3 * thumb_w + 4 * gap, 3 * thumb_h + 4 * gap), "#e9eef4")
        draw = ImageDraw.Draw(canvas)
        for i, page in enumerate(batch):
            with Image.open(page) as image:
                image = image.convert("RGB")
                image.thumbnail((thumb_w - 20, thumb_h - 45))
                x = gap + (i % 3) * (thumb_w + gap)
                y = gap + (i // 3) * (thumb_h + gap)
                canvas.paste(image, (x + (thumb_w - image.width) // 2, y + 25))
                draw.text((x + 8, y + 5), page.stem, fill="#111827")
        out = destination / f"{prefix}-{batch_index // batch_size + 1:02d}.png"
        canvas.save(out)
    return len(pages), (len(pages) + batch_size - 1) // batch_size


master = make_contacts(
    ROOT / "tmp/docx-render-final",
    ROOT / "tmp/master-contacts-final",
    "contact",
)
chapters = make_contacts(
    ROOT / "tmp/chapter-render-final",
    ROOT / "tmp/chapter-contacts-final",
    "contact",
)
print({"master_pages": master[0], "master_contacts": master[1],
       "chapter_pages": chapters[0], "chapter_contacts": chapters[1]})
