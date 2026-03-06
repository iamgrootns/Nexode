#!/usr/bin/env python3
# Converts a PNG/JPG to ANSI half-block terminal art
# Usage: python3 img2ansi.py image.png [width] [height]
# Each terminal char = 2 vertical pixels using ▀ (fg=top, bg=bottom)

import sys
from PIL import Image

def img_to_ansi(path: str, term_cols: int = 48, term_rows: int = 12) -> str:
    img = Image.open(path).convert("RGB")

    # Each terminal char = 1 col wide, 2 pixels tall
    pixel_w = term_cols
    pixel_h = term_rows * 2

    img = img.resize((pixel_w, pixel_h), Image.LANCZOS)
    pixels = img.load()

    ESC = '\x1b'
    RST = f'{ESC}[0m'
    out = ''

    for row in range(0, pixel_h, 2):
        for col in range(pixel_w):
            tr, tg, tb = pixels[col, row]
            br, bg, bb = pixels[col, row + 1] if row + 1 < pixel_h else (0, 0, 0)
            out += f'{ESC}[38;2;{tr};{tg};{tb}m{ESC}[48;2;{br};{bg};{bb}m▀'
        out += RST + '\n'

    return out

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 img2ansi.py image.png [cols] [rows]")
        sys.exit(1)

    path = sys.argv[1]
    cols = int(sys.argv[2]) if len(sys.argv) > 2 else 48
    rows = int(sys.argv[3]) if len(sys.argv) > 3 else 12

    print(img_to_ansi(path, cols, rows))
