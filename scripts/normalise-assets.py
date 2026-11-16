from pathlib import Path
from fontTools.ttLib import TTFont
from PIL import Image

root = Path(__file__).resolve().parents[1]
for font in (root / 'client/public/fonts').glob('*.woff2'):
    if font.read_bytes()[:4] != b'wOF2':
        converted = TTFont(font)
        converted.flavor = 'woff2'
        converted.save(font)
        print('Converted to WOFF2:', font.name)
# Existing cricket photos are preserved. Owner-supplied replacements are prepared
# explicitly by prepare-images.py, not regenerated from superseded source photos.
for filename, target in [('Cvho1JqTgoyM.png', 'blind-sports-logo'), ('MyxmHMwlEn5t.png', 'cricket-act-logo'), ('IMZaJLG0x2QD.jpeg', 'pace-logo')]:
    path = Path('/home/ubuntu/upload/search_images') / filename
    if path.exists():
        logo = Image.open(path)
        logo.thumbnail((600, 220))
        logo.save(root / 'client/public/images' / (target + '.webp'), 'WEBP', quality=90)
print('Static assets ready.')
