#!/usr/bin/env python3
"""Extract the four existing circular Board portraits from PDF page 6.

Requirements: Poppler's pdftoppm and Pillow. No source PDF is copied into public.
The PDF's original circular framing is retained; no AI, retouching, stretching,
or extra people from the full embedded photographs are introduced. Rendering at
225 DPI is a PDF rasterization setting, not a claim of increased source detail.

Usage:
    python3 scripts/prepare-board-portraits.py
    python3 scripts/prepare-board-portraits.py --pdf /private/path/source.pdf
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PDF = Path('/home/ubuntu/upload/BlindCricketSponsorship2026(1).pdf')
OUTPUT_DIR = ROOT / 'client/public/images'
DPI = 225
PAGE = 6
# PDF coordinates in points, from the page's top-left. Each 162-point square
# encompasses the full original colored ring and a small white safety margin,
# stopping above the name captions. Squares preserve circular aspect ratio.
PORTRAITS = (
    ('board-jason-schmidt.webp', 170, 205),
    ('board-robert-altamore.webp', 428, 205),
    ('board-jespah-soegeng.webp', 168, 418),
    ('board-chris-hartshorn.webp', 425, 418),
)
FRAME_POINTS = 162


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--pdf', type=Path, default=DEFAULT_PDF)
    args = parser.parse_args()
    if not args.pdf.is_file():
        parser.error(f'Source PDF not found: {args.pdf}')
    if not shutil.which('pdftoppm'):
        parser.error('Poppler pdftoppm is required.')

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='bcact-board-') as temp_dir:
        page_prefix = Path(temp_dir) / 'page6'
        subprocess.run(
            ['pdftoppm', '-f', str(PAGE), '-l', str(PAGE), '-singlefile',
             '-r', str(DPI), '-png', str(args.pdf), str(page_prefix)],
            check=True,
        )
        with Image.open(page_prefix.with_suffix('.png')) as page_image:
            page_image = page_image.convert('RGB')
            side = round(FRAME_POINTS * DPI / 72)
            for filename, center_x, center_y in PORTRAITS:
                left = round(center_x * DPI / 72 - side / 2)
                top = round(center_y * DPI / 72 - side / 2)
                bounds = (left, top, left + side, top + side)
                if left < 0 or top < 0 or bounds[2] > page_image.width or bounds[3] > page_image.height:
                    raise ValueError(f'Portrait crop is outside PDF page: {filename}')
                portrait = page_image.crop(bounds)
                output = OUTPUT_DIR / filename
                # Lossless WebP preserves the rendered crop's pixels, including
                # the existing blue/yellow ring and white corner backgrounds.
                portrait.save(output, format='WEBP', lossless=True, method=6)
                print(f'{output}: {portrait.width}x{portrait.height}, '
                      f'{output.stat().st_size} bytes; PDF page {PAGE}, bounds={bounds}')


if __name__ == '__main__':
    main()
