from pathlib import Path
from PIL import Image, ImageChops

root = Path(__file__).resolve().parents[1]
source = root / 'client/public/images/blind-cricket-act-original.png'
output = source.parent
image = Image.open(source).convert('RGB')
# Trim blank outer padding only; retain all artwork and embedded lettering.
difference = ImageChops.difference(image, Image.new('RGB', image.size, 'white'))
mask = difference.point(lambda value: 255 if value > 35 else 0).convert('L')
bounds = mask.getbbox()
if not bounds:
    raise RuntimeError('Logo artwork bounds not found.')
left, top, right, bottom = bounds
padding = 14
side = max(right - left, bottom - top) + 2 * padding
centre_x, centre_y = (left + right) / 2, (top + bottom) / 2
crop = (int(centre_x - side / 2), int(centre_y - side / 2), int(centre_x - side / 2) + side, int(centre_y - side / 2) + side)
assert crop[0] <= left and crop[1] <= top and crop[2] >= right and crop[3] >= bottom
prepared = image.crop(crop)
prepared.save(output / 'blind-cricket-act-logo.webp', 'WEBP', lossless=True)
prepared.save(output / 'blind-cricket-act-logo.png', 'PNG', optimize=True)
icon = prepared.copy()
icon.thumbnail((64, 64), Image.Resampling.LANCZOS)
icon.save(root / 'client/public/favicon.png', 'PNG', optimize=True)
print('Artwork preserved, cropped only blank outer padding:', bounds, 'output:', prepared.size)
