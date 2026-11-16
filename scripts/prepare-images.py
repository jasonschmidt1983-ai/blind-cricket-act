from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
source = root / 'assets/source'
output = root / 'client/public/images'
output.mkdir(parents=True, exist_ok=True)

# Owner-supplied replacements for homepage cards 2, 3 and 4.
# Preserve all content and aspect ratios; only downscale and re-encode.
for filename, name in [
    ('act-community-session.jpg', 'act-community-session'),
    ('act-current-team.jpg', 'act-current-team'),
    ('act-members.jpg', 'act-members'),
]:
    image = ImageOps.exif_transpose(Image.open(source / filename)).convert('RGB')
    image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
    image.save(output / f'{name}.webp', 'WEBP', quality=90)
    print(name, image.size)
print('Prepared the three owner-supplied ACT photographs. Existing action image unchanged.')
