from pathlib import Path
import re
import requests

output = Path(__file__).resolve().parents[1] / 'client/public/fonts'
output.mkdir(parents=True, exist_ok=True)
fonts = [
    ('Barlow', 400, 'barlow-regular'),
    ('Barlow', 600, 'barlow-semibold'),
    ('Barlow Condensed', 700, 'barlow-condensed-bold'),
]
for family, weight, name in fonts:
    url = 'https://fonts.googleapis.com/css2?family=' + family.replace(' ', '+') + ':wght@' + str(weight) + '&display=swap'
    css = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0'}, timeout=30).text
    urls = re.findall(r'url\((https://[^)]+)\)', css)
    if not urls:
        raise RuntimeError('Font source not found: ' + family)
    response = requests.get(urls[-1], timeout=30)
    response.raise_for_status()
    (output / (name + '.woff2')).write_bytes(response.content)
    print(name, len(response.content))
