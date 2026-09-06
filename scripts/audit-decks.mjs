import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gitOrigin, resolveDeployment } from './pages-base.ts';

export async function inspectDeck(page, url, screenshots) {
  // Exercise the first-visit hint as a normal browser would, rather than
  // letting the slide library suppress it just because this is automation.
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await page.goto(url);
  await page.waitForSelector('.reveal.ready');
  assert.equal(await page.locator('.deck-tools').count(), 0, 'Slides have no navigation toolbar');
  assert.equal(await page.locator('.astromotion-help-hint:visible, .reveal .controls:visible, .reveal .progress:visible, .reveal .slide-number:visible').count(),
    0, 'Only slide content is visible on arrival');
  const count = await page.locator('.slides > section').count();
  assert(count > 1, 'The lecture deck must have multiple slides');
  const current = () => page.locator('.slides > section.present').evaluate(el =>
    [...el.parentElement.children].indexOf(el) + 1);
  const expectSlide = async number => {
    await page.waitForFunction(expected => {
      const slides = [...document.querySelectorAll('.slides > section')];
      return slides.indexOf(document.querySelector('.slides > section.present')) + 1 === expected;
    }, number);
  };
  await expectSlide(1);
  await page.keyboard.press('d');
  await expectSlide(2);
  await page.keyboard.press('a');
  await expectSlide(1);
  await page.keyboard.press('Shift+D');
  await expectSlide(2);
  await page.keyboard.press('Shift+A');
  await expectSlide(1);
  await page.keyboard.press('a');
  assert.equal(await current(), 1, 'A stops at the first slide');
  await page.keyboard.press('ArrowRight');
  await expectSlide(2);
  await page.keyboard.press('d');
  await expectSlide(3);
  await page.locator('.reveal').click({ position: { x: 20, y: 20 } });
  await page.keyboard.press('ArrowLeft');
  await expectSlide(2);
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Control+d');
  assert.equal(await current(), 2, 'Browser shortcuts do not change slides');

  await page.mouse.move(100, 100);
  await page.mouse.wheel(0, 120);
  await expectSlide(3);
  for (let i = 0; i < 5; i++) await page.mouse.wheel(0, 60);
  await page.waitForTimeout(100);
  assert.equal(await current(), 3, 'A wheel burst turns only one page');
  await page.waitForTimeout(250);
  await page.mouse.wheel(0, -120);
  await expectSlide(2);
  await page.waitForTimeout(250);
  await page.mouse.wheel(120, 0);
  assert.equal(await current(), 2, 'Horizontal scrolling does not turn pages');
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, 120);
  await page.keyboard.up('Control');
  await page.waitForTimeout(100);
  assert.equal(await current(), 2, 'Pinch/zoom does not turn pages');

  await page.evaluate(() => {
    const input = document.createElement('input');
    input.setAttribute('aria-label', 'Test slide input');
    document.querySelector('.slides > section.present').append(input);
    input.focus();
  });
  await page.keyboard.type('adAD');
  assert.equal(await page.getByRole('textbox', { name: 'Test slide input' }).inputValue(), 'adAD');
  assert.equal(await current(), 2, 'Typing in a slide does not navigate');
  await page.getByRole('textbox', { name: 'Test slide input' }).evaluate(el => el.remove());

  await page.keyboard.press('Shift+/');
  await page.waitForSelector('.r-overlay');
  await page.keyboard.press('d');
  await page.mouse.wheel(0, 120);
  assert.equal(await current(), 2, 'Help keeps control of keys and scrolling');
  await page.keyboard.press('Escape');
  const lectureUrl = url.replace('/decks/', '/lectures/');
  await page.waitForURL(lectureUrl);
  assert(await page.getByRole('link', { name: 'Open the slides', exact: true }).isVisible(),
    'Esc returns directly to the lecture even with an overlay open');
  await page.getByRole('link', { name: 'Open the slides', exact: true }).click();
  await page.waitForSelector('.reveal.ready');
  await expectSlide(1);

  for (const viewport of [
    { width: 1920, height: 1080 }, { width: 390, height: 844 },
    { width: 375, height: 667 }, { width: 844, height: 390 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    for (let slide = 1; slide <= count; slide++) {
      await page.evaluate(number => { location.hash = `/${number}`; }, slide);
      await expectSlide(slide);
      const geometry = await page.locator('.slides > section.present').evaluate(el => {
        const box = el.getBoundingClientRect();
        return {
          x: box.x, y: box.y, width: box.width, height: box.height,
          fits: el.scrollHeight <= el.clientHeight + 1,
          overflow: document.documentElement.scrollWidth > innerWidth,
          obscured: [...el.children].some(child => {
            if (!child.checkVisibility()) return false;
            const bounds = child.getBoundingClientRect();
            return bounds.top < -1 || bounds.bottom > innerHeight + 1;
          }),
        };
      });
      assert(Math.abs(geometry.x) < 1 && Math.abs(geometry.y) < 1 &&
        Math.abs(geometry.width - viewport.width) < 1 && Math.abs(geometry.height - viewport.height) < 1,
        `Slide ${slide} must fill ${viewport.width}×${viewport.height}: ${JSON.stringify(geometry)}`);
      assert(geometry.fits && !geometry.overflow && !geometry.obscured,
        `Slide ${slide} content must fit the screen at ${viewport.width}×${viewport.height}`);
      if (slide === 1 && screenshots) {
        const deck = new URL(url).pathname.split('/').filter(Boolean).at(-1);
        await page.screenshot({ path: `${screenshots}/fullscreen-${deck}-${viewport.width}.png` });
      }
    }
  }
  await page.keyboard.press('d');
  assert.equal(await current(), count, 'D stops at the last slide');
  await page.keyboard.press('a');
  await expectSlide(count - 1);
  await page.reload();
  await expectSlide(count - 1);
  await page.keyboard.press('Escape');
  await page.waitForURL(lectureUrl);
  // Direct links must also return to the lecture, irrespective of history.
  await page.goto(`${url}#/3`);
  await page.waitForSelector('.reveal.ready');
  await expectSlide(3);
  await page.keyboard.press('Escape');
  await page.waitForURL(lectureUrl);
  console.log(`Deck passed: content only, A/D, arrows, wheel, Esc return and ${count} slides at five viewport sizes.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { base } = resolveDeployment(process.env, gitOrigin);
  const root = `${process.env.AUDIT_ORIGIN ?? 'http://127.0.0.1:4322'}${base.replace(/\/$/, '')}/`;
  const routes = readdirSync('dist/decks', { recursive: true }).filter(path => path.endsWith('index.html'));
  assert(routes.length > 0, 'Build the lecture decks before auditing');
  const screenshots = process.env.AUDIT_SCREENSHOTS ?? '/tmp/partner-audit';
  mkdirSync(screenshots, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(5000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) await inspectDeck(page, `${root}decks/${route.replace(/index\.html$/, '')}`, screenshots);
    assert.deepEqual(errors, [], 'No browser JavaScript errors');
  } finally {
    await browser.close();
  }
}
