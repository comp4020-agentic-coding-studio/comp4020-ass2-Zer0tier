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
const navigationLabels = ['Home','Lectures','Tutorials','Assignments','People','Readings','Timetable','Help','FAQ','Policies'];

async function inspectNavigation(page) {
  const toggle = page.getByRole('button',{name:'Menu',exact:true});
  const phone = await toggle.isVisible();
  if (phone) {
    await toggle.click();
    // A link can report visible while its parent still clips it mid-transition.
    // Wait for the entire list to fit before measuring or taking evidence.
    await page.waitForFunction(() => {
      const wrapper = document.querySelector('.at-nav-links-wrapper');
      const list = document.querySelector('.at-nav-links');
      return wrapper.clientHeight >= list.scrollHeight - 1;
    });
  }
  const links = page.locator('.at-nav-links a');
  assert.deepEqual(await links.allTextContents(),navigationLabels);
  for (const link of await links.all()) {
    assert(await link.isVisible(),`Hidden menu section: ${await link.innerText()}`);
    const box = await link.boundingBox();
    assert(box && box.x >= 0 && box.x + box.width <= page.viewportSize().width,
      `Clipped menu section: ${await link.innerText()}`);
    assert(box.height >= 44,'Navigation targets should be at least 44px tall');
    if (phone) {
      const wrapper = await page.locator('.at-nav-links-wrapper').boundingBox();
      assert(wrapper && box.y >= wrapper.y && box.y + box.height <= wrapper.y + wrapper.height + 1,
        `Menu wrapper clips ${await link.innerText()}`);
    }
  }
  if (phone) {
    await page.screenshot({path:`${screenshots}/menu-${page.viewportSize().width}.png`});
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'),'false');
  }
}

async function inspectDecorations(page) {
  const decoration = page.locator('[data-course-decoration]');
  assert.equal(await decoration.count(),2,'The background and compact sprig should be present');
  for (const layer of await decoration.all()) {
    assert.equal(await layer.getAttribute('aria-hidden'),'true');
    assert(await layer.evaluate(el=>el.inert && getComputedStyle(el).pointerEvents === 'none'));
    assert.equal(await layer.locator('a,button,input,[tabindex]').count(),0);
    assert.equal(await layer.evaluate(el=>el.getAnimations({subtree:true}).length),0,'Reading decorations stay still');
  }
  assert.equal(await page.locator('.at-main').evaluate(el=>getComputedStyle(el).backgroundColor),
    await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),'Reading surface stays opaque paper');
  const main = await page.locator('.at-main').boundingBox();
  if (page.viewportSize().width >= 1440) {
    assert(await page.locator('.cherry-background').isVisible());
    const left = await page.locator('.cherry-branch-left').boundingBox();
    const right = await page.locator('.cherry-branch-right').boundingBox();
    assert(left.width > 0 && left.x + left.width <= main.x,'Left branch stays in the margin');
    assert(right.width > 0 && right.x >= main.x + main.width,'Right branch stays in the margin');
  } else {
    assert.equal(await page.locator('.cherry-background').isVisible(),false);
    const sprig = await page.locator('.cherry-sprig').boundingBox();
    const bar = await page.locator('.course-bar').boundingBox();
    const next = await page.locator('.cherry-sprig + *').boundingBox();
    assert(sprig && sprig.height > 0 && sprig.y >= bar.y + bar.height - 1 && sprig.y + sprig.height <= next.y + 1,
      'Compact sprig has its own space, outside text');
  }
}

async function inspectTutorialSchedule(page) {
  assert.equal(await page.locator('.week-row:visible').count(), 12);
  const firstWeek = page.locator('.week-row[data-week="1"]');
  assert(await firstWeek.isVisible(), 'The lecture-only week remains in the timetable');
  assert.match(await firstWeek.innerText(), /No tutorial in week 1/);
  assert.equal(await firstWeek.locator('a[href*="/sessions/"]').count(), 0);
  assert.equal(await firstWeek.locator('a[href*="/lectures/week-01/"]').count(), 2);
  const secondWeek = page.locator('.week-row[data-week="2"]');
  assert.equal(await secondWeek.locator('a[href*="/sessions/02-platforms/"]').count(), 1);
}

async function inspectPalette(page) {
  const colours = await page.evaluate(() => {
    const background = selector => getComputedStyle(document.querySelector(selector)).backgroundColor;
    return {paper:background('body'),header:background('.at-nav'),main:background('.at-main'),
      footer:background('.at-footer'),panel:background('.phase-card:last-child'),
      diagram:getComputedStyle(document.querySelector('.hero-art > rect:first-of-type')).fill};
  });
  assert.equal(colours.header,colours.paper,'Header and page share the blossom paper colour');
  assert.equal(colours.main,colours.paper,'Reading area has no mismatched background block');
  assert.equal(colours.diagram,colours.footer,'Diagram and footer share the supporting surface colour');
  assert.equal(colours.panel,colours.footer,'Neutral cards share the supporting surface colour');
}

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
      if (route === 'weeks/') {
        await inspectTutorialSchedule(page);
        await page.locator('.week-row[data-week="1"]').screenshot({path:`${screenshots}/lecture-only-week-${viewport.width}.png`});
      }
      if (route === 'sessions/') {
        const tutorialLinks = page.locator('.at-main a[href*="/sessions/"]');
        assert.equal(await tutorialLinks.count(), 11);
        assert((await tutorialLinks.first().getAttribute('href')).endsWith('/sessions/02-platforms/'));
        assert.match(await page.locator('.at-main').innerText(), /No tutorial in week 1/);
      }
      if (route === '') {
        await inspectNavigation(page);
        await inspectPalette(page);
      }
      if (['','lectures/week-03/','policies/'].includes(route)) await inspectDecorations(page);
      if (route === 'lectures/week-03/') {
        const prose = await page.locator('.at-main > p:not(.lead)').first().evaluate(el => {
          const style = getComputedStyle(el);
          // Astro's variable contains a family list, including a local Arial
          // fallback that need not exist on Linux. Check the primary face.
          const family = getComputedStyle(document.documentElement).getPropertyValue('--font-public-sans').split(',')[0].trim();
          return {font:style.fontFamily,family,size:parseFloat(style.fontSize),leading:parseFloat(style.lineHeight),
            width:el.getBoundingClientRect().width,max:parseFloat(style.maxWidth),
            loaded:[...document.fonts].some(face=>face.family===family.replaceAll('"','') && face.style==='normal' && face.status==='loaded')};
        });
        assert(prose.family && prose.loaded,'The bundled reading font must load');
        assert(prose.font.startsWith(prose.family),'Main prose must use the bundled Public Sans family');
        assert.equal(prose.size,18,'Main reading text should be 18px');
        assert(prose.leading >= 29.5 && prose.width <= prose.max + 1,'Comfortable leading and bounded reading width');
      }
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
      if (['','weeks/','readings/','help/','faq/','lectures/week-03/','lectures/week-07/','lectures/week-10/','sessions/12-maintenance/','assessments/profile-deployment/','toolkit/','policies/','decks/week-01/'].includes(route)) {
        await page.screenshot({path:`${screenshots}/${route.replaceAll('/','-') || 'home'}-${viewport.width}.png`,fullPage:!deck});
        if (route === '') {
          await page.screenshot({path:`${screenshots}/home-${viewport.width}-viewport.png`});
          await page.evaluate(()=>scrollTo({top:800,behavior:'instant'}));
          await page.screenshot({path:`${screenshots}/home-${viewport.width}-scrolled.png`});
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
        }
        if (route === 'toolkit/') await page.locator('.experiment-panel').screenshot({path:`${screenshots}/experiment-${viewport.width}.png`});
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
  await inspectTutorialSchedule(staticPage);
  await staticPage.goto(root+'toolkit/');
  assert.equal(await staticPage.locator('#bio-experiment').isVisible(),false);
  assert.match(await staticPage.locator('.experiment-panel').innerText(), /z = 1\.33/);
  assert.equal(await staticPage.getByRole('link',{name:'Download the 99 synthetic controls'}).count(),1);
  await noJs.close();

  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(root+'weeks/');
  await page.getByRole('button',{name:'Model',exact:true}).click();
  assert.equal(await page.locator('.week-row:visible').count(),4);
  await page.getByRole('button',{name:'All 12 weeks',exact:true}).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.week-row:visible').count(),12);
  await page.getByRole('button',{name:'Measure',exact:true}).click();
  assert.equal(await page.locator('.week-row:visible').count(),3);
  assert(await page.locator('.week-row[data-week="1"]').isVisible());
  await page.getByRole('button',{name:'All 12 weeks',exact:true}).click();
  await inspectTutorialSchedule(page);
  const menu = page.getByRole('button',{name:'Menu',exact:true});
  await menu.click();
  assert.equal(await menu.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('aria-expanded'),'false');
  for (const width of [375,639,640,768,1024,1439,1440,1920,390]) {
    await page.setViewportSize({width,height:844});
    await inspectNavigation(page);
    await inspectDecorations(page);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth), `Overflow after resize to ${width}`);
  }
  assert.deepEqual(await page.locator('.at-nav-links a[aria-current]').allTextContents(),['Timetable']);
  await page.getByRole('button',{name:'Search (Cmd+K)',exact:true}).click();
  const search = page.locator('dialog input');
  await search.fill('stochastic');
  await page.waitForSelector('dialog .at-search-result');
  assert((await page.locator('dialog .at-search-result').count())>0);
  await page.keyboard.press('Escape');
  console.log('Syllabus filter, no-JS content, menu, resize and built search passed.');

  await page.goto(root+'faq/');
  const question = page.locator('summary').first();
  await question.focus();
  await page.keyboard.press('Enter');
  assert.equal(await question.evaluate(el=>el.parentElement.open),true);
  assert.equal(await page.getByRole('link',{name:'participation policies',exact:true}).isVisible(),true);
  await page.screenshot({path:`${screenshots}/faq-expanded-390.png`,fullPage:true});
  await page.keyboard.press('Enter');
  assert.equal(await question.evaluate(el=>el.parentElement.open),false);
  console.log('FAQ disclosure opens and closes with the keyboard.');

  await page.goto(root+'toolkit/');
  await page.getByRole('button',{name:'Compare bios',exact:true}).click();
  assert.match(await page.locator('#experiment-result').innerText(), /\+2\.0 percentage points/);
  assert.match(await page.locator('#experiment-result').innerText(), /No clear difference/);
  await page.locator('#b-positive').fill('300');
  await page.getByRole('button',{name:'Compare bios',exact:true}).click();
  assert.match(await page.locator('#experiment-result').innerText(), /\+18\.0 percentage points/);
  assert.match(await page.locator('#experiment-result').innerText(), /Difference detected/);
  await page.setViewportSize({width:1920,height:1080});
  assert.equal(await page.locator('#b-positive').inputValue(),'300');
  assert.match(await page.locator('#experiment-result').innerText(), /\+18\.0 percentage points/);
  await page.setViewportSize({width:390,height:844});
  await page.locator('#b-positive').fill('1001');
  await page.getByRole('button',{name:'Compare bios',exact:true}).click();
  assert.equal(await page.locator('#b-positive').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#experiment-result').isVisible(), false);
  assert.equal(await page.locator('#b-positive').evaluate(el=>el===document.activeElement), true);
  await page.getByRole('button',{name:'Reset example',exact:true}).click();
  assert.equal(await page.locator('#experiment-result').isVisible(), true);
  assert.equal(await page.locator('#experiment-error').innerText(), '');
  for (const [selector,value] of [['#a-positive','2'],['#a-exposures','8'],['#b-positive','4'],['#b-exposures','8']]) await page.locator(selector).fill(value);
  await page.getByRole('button',{name:'Compare bios',exact:true}).focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('#experiment-result').innerText(), /Normal approximation withheld/);
  const scorer = await page.evaluate(async url => {
    const model = await import(url);
    return model.qualityScore([4,4,4,4]);
  }, root+'data/romance-models.mjs');
  assert.equal(scorer,100,'Downloadable scorer is a working JavaScript module');
  console.log('A/B calculator, validation recovery and downloadable scorer passed.');

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
