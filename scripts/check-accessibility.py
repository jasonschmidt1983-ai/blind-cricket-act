"""Focused local toolbar checks; requires Python Playwright and its Chromium binary."""
import json
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3000'
KEY = 'bcact-display-v2'
DEFAULT = {'version': 2, 'textSize': 100, 'colourMode': 'default', 'grayscale': False, 'underlineLinks': False, 'readableFont': False}
LABELS = ['Increase Text', 'Decrease Text', 'Grayscale', 'High Contrast', 'Negative Contrast', 'Light Background', 'Links Underline', 'Readable Font', 'Reset all settings']

def option(page, label):
    return page.get_by_role('dialog').get_by_role('button', name=re.compile('^' + re.escape(label)))

def wait_setting(page, key, value):
    page.wait_for_function('([key,value]) => document.documentElement.dataset[key] === value', arg=[key, value])

def no_horizontal_overflow(page, where):
    dimensions = page.evaluate('({width:innerWidth, content:document.documentElement.scrollWidth})')
    assert dimensions['content'] <= dimensions['width'] + 2, (where, dimensions)

def sizes(page):
    return page.evaluate("""() => Object.fromEntries(['h1','.hero-subtitle','.button','.utility-inner button'].map(s => [s,parseFloat(getComputedStyle(document.querySelector(s)).fontSize)]))""")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 900}, reduced_motion='reduce')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE + '/', wait_until='networkidle')
    wait_setting(page, 'textSize', '100')
    original_sizes = sizes(page)
    page.get_by_role('button', name='Open accessibility tools', exact=True).click()
    for label in LABELS:
        assert option(page, label).count() == 1, label
    assert option(page, 'Decrease Text').is_disabled()
    option(page, 'Increase Text').click()
    wait_setting(page, 'textSize', '125')
    option(page, 'Decrease Text').click()
    wait_setting(page, 'textSize', '100')
    for _ in range(4): option(page, 'Increase Text').click()
    wait_setting(page, 'textSize', '200')
    assert option(page, 'Increase Text').is_disabled()
    enlarged = sizes(page)
    for selector, initial in original_sizes.items():
        assert abs(enlarged[selector] / initial - 2) < 0.03, (selector, initial, enlarged[selector])
    print('PASS: all nine controls, bounded 25% steps, headings/body/buttons/labels scale consistently.', flush=True)

    for label, mode in [('High Contrast', 'high'), ('Negative Contrast', 'negative'), ('Light Background', 'light')]:
        option(page, label).click()
        wait_setting(page, 'colorMode', mode)
        assert option(page, label).get_attribute('aria-pressed') == 'true'
        active = page.get_by_role('dialog').locator('.a11y-option[aria-pressed="true"]').count()
        assert active == 1, (label, active)
        option(page, label).click()
        wait_setting(page, 'colorMode', 'default')
    option(page, 'Grayscale').click()
    wait_setting(page, 'grayscale', 'true')
    assert 'grayscale' in page.locator('.site-page').evaluate('(e) => getComputedStyle(e).filter')
    assert page.locator('html').evaluate('(e) => getComputedStyle(e).filter') == 'none'
    option(page, 'Links Underline').click()
    wait_setting(page, 'underlineLinks', 'true')
    assert 'underline' in page.locator('.footer-links a').first.evaluate('(e) => getComputedStyle(e).textDecorationLine')
    option(page, 'Readable Font').click()
    wait_setting(page, 'readableFont', 'true')
    assert 'Arial' in page.locator('h1').evaluate('(e) => getComputedStyle(e).fontFamily')
    option(page, 'High Contrast').click()
    wait_setting(page, 'colorMode', 'high')
    page.keyboard.press('Escape')
    assert page.get_by_role('dialog').count() == 0
    assert page.locator('.accessibility-fab').evaluate('(e) => e === document.activeElement')
    no_horizontal_overflow(page, 'desktop, 200%')
    fab = page.locator('.accessibility-fab').bounding_box()
    assert fab and fab['y'] + fab['height'] <= 902, fab
    page.goto(BASE + '/contact/', wait_until='networkidle')
    wait_setting(page, 'textSize', '200')
    wait_setting(page, 'colorMode', 'high')
    wait_setting(page, 'grayscale', 'true')
    page.reload(wait_until='networkidle')
    wait_setting(page, 'textSize', '200')
    print('PASS: themes, independent reading controls, fixed launcher, focus return and navigation/reload persistence.', flush=True)

    page.set_viewport_size({'width': 390, 'height': 844})
    no_horizontal_overflow(page, 'mobile contact, 200%')
    page.get_by_role('button', name='Open accessibility tools', exact=True).click()
    panel = page.get_by_role('dialog')
    assert panel.bounding_box()['width'] <= 392
    option(page, 'Reset all settings').click()
    wait_setting(page, 'textSize', '100')
    assert json.loads(page.evaluate('(key) => localStorage.getItem(key)', KEY)) == DEFAULT
    page.keyboard.press('Escape')
    page.locator('.utility-inner button').click()
    for _ in range(25):
        page.keyboard.press('Tab')
        assert page.get_by_role('dialog').evaluate('(e) => e.contains(document.activeElement)'), 'focus escaped dialog'
    page.keyboard.press('Escape')
    assert page.locator('.utility-inner button').evaluate('(e) => e === document.activeElement')
    page.goto(BASE + '/', wait_until='networkidle')
    page.get_by_role('button', name='Open accessibility tools', exact=True).click()
    for _ in range(4): option(page, 'Increase Text').click()
    page.keyboard.press('Escape')
    wait_setting(page, 'textSize', '200')
    no_horizontal_overflow(page, 'mobile homepage, 200%')
    print('PASS: mobile reflow, reset-all, keyboard focus trap and both opener focus-return paths.', flush=True)
    assert not errors, errors
    context.close()

    legacy = browser.new_context()
    legacy.add_init_script("localStorage.setItem('bcact-display', JSON.stringify({largeText:true,contrast:true}));")
    legacy_page = legacy.new_page()
    legacy_page.goto(BASE + '/', wait_until='networkidle')
    wait_setting(legacy_page, 'textSize', '125')
    wait_setting(legacy_page, 'colorMode', 'high')
    legacy.close()

    blocked = browser.new_context()
    blocked.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}});")
    blocked_page = blocked.new_page()
    blocked_page.goto(BASE + '/', wait_until='networkidle')
    blocked_page.get_by_role('button', name='Open accessibility tools', exact=True).click()
    option(blocked_page, 'Increase Text').click()
    wait_setting(blocked_page, 'textSize', '125')
    option(blocked_page, 'Negative Contrast').click()
    wait_setting(blocked_page, 'colorMode', 'negative')
    option(blocked_page, 'Reset all settings').click()
    wait_setting(blocked_page, 'textSize', '100')
    blocked.close()
    browser.close()
    print('PASS: legacy preference migration, blocked storage and zero page JavaScript errors.', flush=True)
