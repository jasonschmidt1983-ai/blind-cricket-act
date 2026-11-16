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
image = Image.open(root / 'assets/source/act-collage.jpg').convert('RGB')
width, height = image.size
# The two photographs in the source collage are not equally wide.
# Keep the complete foreground players and exclude the second photograph's edge.
action = image.crop((0, 0, round(width * 0.465), height))
action.thumbnail((1600, 1200))
action.save(root / 'client/public/images/act-action.webp', 'WEBP', quality=88)
for filename, target in [('Cvho1JqTgoyM.png', 'blind-sports-logo'), ('MyxmHMwlEn5t.png', 'cricket-act-logo'), ('IMZaJLG0x2QD.jpeg', 'pace-logo')]:
    path = Path('/home/ubuntu/upload/search_images') / filename
    if path.exists():
        logo = Image.open(path)
        logo.thumbnail((600, 220))
        logo.save(root / 'client/public/images' / (target + '.webp'), 'WEBP', quality=90)
print('Static assets ready.')
