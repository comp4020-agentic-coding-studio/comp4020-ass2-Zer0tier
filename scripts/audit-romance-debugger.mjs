import { chromium, expect } from '@playwright/test';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { gitOrigin, resolveDeployment } from './pages-base.ts';

const axePath = createRequire(import.meta.resolve('astro-theme-university')).resolve('axe-core/axe.min.js');

export async function inspectRomanceDebugger(browser, root, screenshots) {
  mkdirSync(screenshots, { recursive: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.setDefaultTimeout(7000);
  const findings = [], errors = [], writes = [];
  let checkedStates = 0;
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.method() !== 'GET') writes.push({ method: request.method(), url: request.url() }); });
  const get = name => page.locator(`[data-debugger-${name}]`);
  const geometry = async label => {
    const result = await page.evaluate(() => {
      const app = document.querySelector('[data-romance-debugger]');
      return { overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: [...app.querySelectorAll('button, p, h2, h3, h4, dd, li')].filter(el => el.checkVisibility()).filter(el => {
          const box = el.getBoundingClientRect();
          return box.left < -1 || box.right > innerWidth + 1;
        }).map(el => el.textContent.slice(0, 90)) };
    });
    if (result.overflow || result.clipped.length) findings.push({ label, geometry: result });
  };
  const pageAxe = async label => {
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    })).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
    if (violations.length) findings.push({ label, violations });
  };
  const accessibility = async label => {
    await geometry(label);
    await pageAxe(label);
    for (const target of await page.locator('[data-romance-debugger] button:visible, [data-romance-debugger] summary:visible').all()) {
      await target.scrollIntoViewIfNeeded();
      const box = await target.boundingBox();
      if (!box || box.width < 24 || box.height < 24) findings.push({ label, target: await target.innerText(), box });
    }
    checkedStates++;
  };
  const choose = async (action, accepted, after) => {
    await get('choices').locator(`[data-debugger-action="${action}"]`).focus();
    await page.keyboard.press('Enter');
    await expect(get('result')).toBeVisible();
    await expect(get('choices')).toBeHidden();
    await expect(get('result-title')).toBeFocused();
    await expect(get('result')).toHaveAttribute('data-accepted', String(accepted));
    await expect(get('after')).toHaveText(after);
    await accessibility(`${page.viewportSize().width}, ${action}, ${accepted}`);
  };
  const next = async () => {
    await get('continue').click();
    await expect(get('result')).toBeHidden();
    await expect(get('prompt')).toBeFocused();
  };
  const retry = async () => {
    await get('retry').click();
    await expect(get('prompt')).toBeFocused();
    await expect(get('choices')).toBeVisible();
  };
  try {
    for (const viewport of [{ width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.goto(`${root}romance-debugger/`);
      await expect(get('app')).toBeVisible();
      await expect(get('fallback')).toBeHidden();
      await expect(get('download')).toBeDisabled();
      if (viewport.width === 1920) {
        const width = await page.locator('[data-romance-debugger]').evaluate(el => {
          const main = el.closest('main');
          const style = getComputedStyle(main);
          return { actual: el.getBoundingClientRect().width,
            available: main.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) };
        });
        assert(Math.abs(width.actual - width.available) <= 2, 'The two-panel debugger uses the available desktop content width');
      }
      await accessibility(`${viewport.width}, initial`);
      await page.locator('.debugger-layout').evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `${screenshots}/debugger-start-${viewport.width}.png` });

      await choose('context', true, 'Pending');
      await expect(get('evidence')).toContainText('I like board games.');
      await next();
      await expect(get('messages')).toContainText('A read receipt is recorded.');
      await choose('resend', false, 'Pending');
      assert.equal(await get('messages').locator('.message-outgoing').count(), 1);
      await retry();
      await choose('unknown', true, 'Pending');
      await expect(get('unknowns')).toContainText('Why no reply has been recorded.');
      await get('result-title').evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `${screenshots}/debugger-unknown-${viewport.width}.png` });
      await next();
      await choose('assume', false, 'Reply to review');
      await retry();
      await choose('clarify', true, 'Reply to review');
      await expect(get('messages').locator('.message-draft')).toHaveCount(1);
      await next();
      await choose('context', false, 'Closed / stop');
      await expect(get('path').locator('.path-selected')).toContainText('Check the boundary');
      await retry();
      await choose('close', true, 'Closed / stop');
      await next();
      await choose('reopen', false, 'Closed / stop');
      await retry();
      await choose('keep-closed', true, 'Closed / stop');
      await expect(get('complete')).toBeVisible();
      await expect(get('continue')).toBeHidden();
      await page.locator('.debugger-snapshot summary').click();
      await expect(get('snapshot')).toContainText('"closed": true');
      await expect(get('snapshot')).toContainText('"inbound": "reply"');
      await accessibility(`${viewport.width}, expanded snapshot`);
      const downloadPromise = page.waitForEvent('download');
      await get('download').click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), 'romance-debugger-shared.json');
      const trace = JSON.parse(readFileSync(await download.path(), 'utf8'));
      assert.equal(trace.fictional, true);
      assert.deepEqual(trace.history.map(item => item.choiceId), ['context','resend','unknown','assume','clarify','context','close','reopen','keep-closed']);
      assert.equal(trace.snapshot.closed, true);
      await get('reset').click();
      await expect(get('download')).toBeDisabled();
      await expect(get('history').locator('li')).toHaveCount(0);
      await expect(get('prompt')).toBeFocused();

      await page.locator('[data-debugger-case="missing"]').click();
      await choose('invent', false, 'Plain draft available');
      await retry();
      await choose('context', false, 'Plain draft available');
      await retry();
      await choose('plain', true, 'Pending');
      await next();
      await choose('unknown', true, 'Pending');
      await expect(get('complete')).toBeVisible();

      await page.locator('[data-debugger-case="history"]').focus();
      await page.keyboard.press('Space');
      await expect(page.locator('[data-debugger-case="history"]')).toHaveAttribute('aria-pressed', 'true');
      await choose('context', false, 'Needs review');
      await retry();
      await choose('review', true, 'Needs review');
      await next();
      await expect(get('messages')).toContainText('Please don’t contact me again.');
      await choose('context', false, 'Closed / stop');
      await retry();
      await choose('close', true, 'Closed / stop');
      await expect(get('complete')).toBeVisible();
      await get('result-title').evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `${screenshots}/debugger-closed-${viewport.width}.png` });
      console.log(`Romance Debugger: all three cases, keyboard, feedback, reset and download passed at ${viewport.width}px.`);
    }
    for (const width of [375,639,640,849,850,1024,1439,1440,1920,390]) {
      await page.setViewportSize({ width, height: 844 });
      await geometry(`resize ${width}`);
      await expect(get('after')).toHaveText('Closed / stop');
    }
    await page.setViewportSize({ width: 844, height: 390 });
    await geometry('short landscape');

    for (const width of [1920,390]) {
      await page.setViewportSize({ width, height: width === 1920 ? 1080 : 844 });
      for (const route of ['', 'toolkit/', 'lectures/week-06/', 'sessions/06-message-tree/']) {
        await page.goto(root + route);
        const link = page.locator('main a').filter({ hasText: /debugger/i }).first();
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', new URL(`${root}romance-debugger/`).pathname);
        assert(await page.evaluate(() => document.documentElement.scrollWidth === innerWidth));
        await pageAxe(`entry page ${route || 'home'}, ${width}`);
        if (!route) {
          await page.locator('.debugger-feature').evaluate(el => el.scrollIntoView({ block: 'center' }));
          await page.screenshot({ path: `${screenshots}/debugger-home-${width}.png` });
        }
        await link.click();
        await expect(get('app')).toBeVisible();
      }
    }
    const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      await noJS.goto(`${root}romance-debugger/`);
      await expect(noJS.locator('[data-debugger-app]')).toBeHidden();
      await expect(noJS.locator('[data-debugger-fallback]')).toBeVisible();
      await noJS.getByText('Inspect this paper trace', { exact: true }).click();
      await expect(noJS.locator('[data-debugger-fallback] details')).toContainText('The route stays pending.');
      assert(await noJS.evaluate(() => document.documentElement.scrollWidth === innerWidth));
    } finally { await noJS.close(); }
    assert.deepEqual(errors, [], 'No browser JavaScript errors');
    assert.deepEqual(writes, [], 'Practice does not send network writes');
    assert.deepEqual(findings, [], 'No accessibility, clipping or target-size findings');
  } finally {
    writeFileSync(`${screenshots}/debugger-report.json`, JSON.stringify({ checkedStates, findings, errors, writes }, null, 2));
    await page.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { base } = resolveDeployment(process.env, gitOrigin);
  const root = `${process.env.AUDIT_ORIGIN ?? 'http://127.0.0.1:4322'}${base.replace(/\/$/, '')}/`;
  const browser = await chromium.launch();
  try { await inspectRomanceDebugger(browser, root, process.env.AUDIT_SCREENSHOTS ?? '/tmp/romance-debugger-audit'); }
  finally { await browser.close(); }
}
