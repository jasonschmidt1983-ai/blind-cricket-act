from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / 'assets/source'
output = root / 'client/public/images'
output.mkdir(parents=True, exist_ok=True)
for filename, name in [('batting.png', 'batting'), ('australia-team.jpg', 'australia-team'), ('act-community.jpg', 'act-community')]:
    image = Image.open(source / filename).convert('RGB')
    image.thumbnail((1600, 1200))
    image.save(output / f'{name}.webp', 'WEBP', quality=86)
image = Image.open(source / 'act-collage.jpg').convert('RGB')
width, height = image.size
for bounds, name in [((0, 0, width // 2, height), 'act-action'), ((width // 2, 0, width, height), 'act-team')]:
    cropped = image.crop(bounds)
    cropped.thumbnail((1600, 1200))
    cropped.save(output / f'{name}.webp', 'WEBP', quality=88)
print('Prepared five real cricket photographs.')
