from pathlib import Path
from html.parser import HTMLParser
import json

root = Path(__file__).resolve().parents[1]
output = root / 'docs'
routes = json.loads((output / 'manus-routes.json').read_text())['routes']
known = {r['path'] for r in routes}

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.main = 0
        self.forms = 0
        self.links = []
        self.images = []
        self.canonical = []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        self.h1 += tag == 'h1'
        self.main += tag == 'main'
        self.forms += tag == 'form'
        if tag == 'a': self.links.append(data.get('href', ''))
        if tag == 'img': self.images.append(data)
        if tag == 'link' and data.get('rel') == 'canonical': self.canonical.append(data.get('href'))

for route in routes:
    name = route['path']
    filename = output / (name.lstrip('/') + '/index.html' if name != '/' else 'index.html')
    html = filename.read_text()
    parser = PageParser()
    parser.feed(html)
    assert parser.h1 == 1, (name, 'h1', parser.h1)
    assert parser.main == 1, (name, 'main', parser.main)
    assert parser.forms == 0, (name, 'unexpected data form')
    assert 'mobile-nav-disclosure' in html and 'id="mobile-navigation"' in html and '<summary' in html, (name, 'missing no-JavaScript mobile navigation')
    assert 'class="site-page"' in html and 'class="accessibility-fab"' in html, (name, 'missing accessibility integration')
    assert 'aria-label="Open accessibility tools"' in html and 'aria-haspopup="dialog"' in html, (name, 'missing labelled toolbar opener')
    assert parser.canonical == ['https://blindcricket.com.au' + (name + '/' if name != '/' else '/')], (name, 'canonical')
    assert '/api/trpc' not in html and '/api/platform' not in html, (name, 'backend reference')
    for img in parser.images:
        assert img.get('alt'), (name, 'missing image alt', img)
        assert (output / img['src'].lstrip('/')).is_file(), (name, 'missing image', img['src'])
    for href in parser.links:
        if href.startswith('/') and not href.startswith('//'):
            destination = href.split('#')[0].rstrip('/') or '/'
            assert destination in known, (name, 'broken internal link', href)
    assert '<meta property="og:image"' in html, (name, 'missing sharing metadata')
assert (output / 'CNAME').read_text().strip() == 'blindcricket.com.au'
assert (output / '.nojekyll').exists()
assert (output / '404.html').exists()
assert not (output / 'api').exists()
print(f'PASS: {len(routes)} static pages, one H1/main each, image alt/assets, all internal links, metadata and no data forms/API dependencies.')
