from pathlib import Path
from html.parser import HTMLParser
import subprocess

root = Path(__file__).resolve().parents[1]

class Cards(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_card = False
        self.images = []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == 'a' and data.get('class') == 'involvement-card':
            self.in_card = True
        if tag == 'img' and self.in_card:
            self.images.append(data['src'])
    def handle_endtag(self, tag):
        if tag == 'a':
            self.in_card = False

cards = Cards()
cards.feed((root / 'docs/index.html').read_text())
assert cards.images == [
    '/images/act-action.webp',
    '/images/act-community-session.webp',
    '/images/act-current-team.webp',
    '/images/act-members.webp',
], cards.images
for folder in ['client/public/images', 'docs/images']:
    for name in ['batting.webp', 'act-community.webp', 'australia-team.webp']:
        assert not (root / folder / name).exists(), (folder, name)
for page in (root / 'docs').rglob('*.html'):
    text = page.read_text()
    assert all(path not in text for path in ['/images/batting.webp', '/images/act-community.webp', '/images/australia-team.webp']), page
original = subprocess.check_output(['git', 'show', 'HEAD:client/public/images/act-action.webp'], cwd=root)
assert original == (root / 'client/public/images/act-action.webp').read_bytes(), 'Image 1 changed unexpectedly'
print('PASS: images 2–4 use supplied photos in order, image 1 unchanged, no superseded photo assets or page references.')
