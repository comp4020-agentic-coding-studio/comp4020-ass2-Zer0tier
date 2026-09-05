import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { gitOrigin, resolveDeployment } from './pages-base.ts';

const { base } = resolveDeployment(process.env, gitOrigin);
const origin = process.env.AUDIT_ORIGIN ?? 'http://127.0.0.1:4322';
const root = `${origin}${base.replace(/\/$/, '')}/`;
const themeRequire = createRequire(import.meta.resolve('astro-theme-university'));
const axePath = themeRequire.resolve('axe-core/axe.min.js');
const routes = readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'))
  .map(path => path === 'index.html' ? '' : path.replace(/index\.html$/, ''));
assert(routes.includes('') && routes.length >= 30, 'Built course pages are missing; run pnpm check before this audit.');
const browser = await chromium.launch();
const findings = [];
const consoleErrors = [];
const screenshots = process.env.AUDIT_SCREENSHOTS ?? '/tmp/partner-audit';
mkdirSync(screenshots, { recursive: true });

try {
  for (const viewport of [{width:1920,height:1080},{width:390,height:844}]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => consoleErrors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(root + route);
      assert(response?.status() === 200 || route === '404.html', `HTTP failure: ${route}`);
      await page.evaluate(() => document.fonts.ready);
      const deck = route.startsWith('decks/');
      if (!deck) assert.equal(await page.locator('h1').count(), 1, `One page heading required: ${route}`);
      if (deck) {
        await page.waitForSelector('.reveal.ready');
        await page.keyboard.press('Escape');
        // Escape dismisses the first-run hint; do not toggle overview mode.
        if (await page.locator('.reveal.overview').count()) await page.keyboard.press('Escape');
      }
      await page.addScriptTag({path:axePath});
      const violations = await page.evaluate(async () => (await window.axe.run(document, {
        runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']},
      })).violations.map(v => ({id:v.id, impact:v.impact, targets:v.nodes.map(n=>n.target)})));
      const geometry = await page.evaluate(() => {
        const small = [];
        for (const el of document.querySelectorAll('a[href],button,input,summary')) {
          if (el.closest('[inert]') || el.getAttribute('aria-hidden') === 'true' || el.getAttribute('tabindex') === '-1') continue;
          if (!el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true})) continue;
          // The skip link is intentionally clipped until focused; measure its
          // actual keyboard-visible state instead of the hidden 1px rectangle.
          const skipLink = el.matches('body > a[href="#main"]');
          if (skipLink) el.focus();
          el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
          const box = el.getBoundingClientRect();
          if (box.width < 23.5 || box.height < 23.5) small.push({text:el.textContent?.trim().slice(0,65),width:box.width,height:box.height});
          if (skipLink) el.blur();
        }
        return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,small};
      });
      if (violations.length || geometry.width !== geometry.scrollWidth || geometry.small.length) findings.push({route,viewport,violations,geometry});
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      if (['','weeks/','lectures/week-07/','sessions/12-field-guide/','assessments/field-guide/','policies/','decks/week-01/'].includes(route)) {
        await page.screenshot({path:`${screenshots}/${route.replaceAll('/','-') || 'home'}-${viewport.width}.png`,fullPage:!deck});
      }
    }
    console.log(`Inspected ${routes.length} pages at ${viewport.width}×${viewport.height}.`);
    await context.close();
  }
  writeFileSync(`${screenshots}/report.json`,JSON.stringify({routes:routes.length,findings,consoleErrors},null,2));
  if (findings.length) console.error(`${findings.length} page/viewport findings; details in ${screenshots}/report.json`);
  // The filter is progressive enhancement: without scripts all weeks remain.
  const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const staticPage = await noJs.newPage();
  await staticPage.goto(root+'weeks/');
  assert.equal(await staticPage.locator('.week-row:visible').count(),12);
  await noJs.close();

  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(root+'weeks/');
  await page.getByRole('button',{name:'Make a connection',exact:true}).click();
  assert.equal(await page.locator('.week-row:visible').count(),4);
  await page.getByRole('button',{name:'All 12 weeks',exact:true}).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.week-row:visible').count(),12);
  const menu = page.getByRole('button',{name:'Menu',exact:true});
  await menu.click();
  assert.equal(await menu.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('aria-expanded'),'false');
  for (const width of [639,640,768,1024,1440,1920,390]) {
    await page.setViewportSize({width,height:844});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth), `Overflow after resize to ${width}`);
  }
  await page.getByRole('button',{name:'Search (Cmd+K)',exact:true}).click();
  const search = page.locator('dialog input');
  await search.fill('boundaries');
  await page.waitForSelector('dialog .at-search-result');
  assert((await page.locator('dialog .at-search-result').count())>0);
  await page.keyboard.press('Escape');
  console.log('Syllabus filter, no-JS content, menu, resize and built search passed.');

  const network = await page.context().newCDPSession(page);
  await network.send('Network.enable');
  await network.send('Network.setCacheDisabled',{cacheDisabled:true});
  await network.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:100000});
  await page.goto(root);
  assert.equal(await page.getByRole('link',{name:'Start with week 1'}).count(),1);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
  await network.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  await network.detach();
  console.log('Phone homepage remained usable with a cold cache, 150ms latency and 200kB/s download.');

  await page.goto(root+'decks/week-01/');
  await page.waitForSelector('.reveal.ready');
  if (await page.locator('.astromotion-help-hint').count()) await page.locator('.astromotion-help-hint').click();
  await page.getByRole('button',{name:'Next',exact:true}).click();
  await page.waitForFunction(()=>location.hash==='#/2');
  await page.locator('.reveal').click({position:{x:20,y:20}});
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>location.hash==='#/3');
  for (let slide=1;slide<=9;slide++) {
    await page.goto(`${root}decks/week-01/#/${slide}`);
    await page.waitForSelector('.reveal.ready');
    await page.waitForFunction(expected => document.querySelector('.slides > section.present') === document.querySelectorAll('.slides > section')[expected-1], slide);
    const fits = await page.locator('.slides > section.present').evaluate(el=>el.scrollHeight<=el.clientHeight+1);
    assert(fits, `Slide ${slide} exceeds phone slide area`);
  }
  console.log('Deck buttons, arrow keys and every phone slide passed.');
  assert.deepEqual(consoleErrors, [], 'Browser JavaScript errors');
  writeFileSync(`${screenshots}/report.json`,JSON.stringify({routes:routes.length,findings,consoleErrors},null,2));
  assert.equal(findings.length,0,'Browser accessibility or target-size findings');
} finally {
  await browser.close();
}
