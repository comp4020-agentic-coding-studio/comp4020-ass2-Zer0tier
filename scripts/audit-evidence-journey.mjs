import { chromium, expect } from '@playwright/test';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { gitOrigin, resolveDeployment } from './pages-base.ts';

const axePath = createRequire(import.meta.resolve('astro-theme-university')).resolve('axe-core/axe.min.js');

export async function inspectEvidenceJourney(browser, root, screenshots) {
  mkdirSync(screenshots, { recursive: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.setDefaultTimeout(8000);
  const findings = [], errors = [], writes = [];
  let states = 0;
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.method() !== 'GET') writes.push(request.url()); });
  const exp = name => page.locator(`[data-exp-${name}]`);
  const rel = name => page.locator(`[data-rel-${name}]`);
  const geometry = async label => {
    const result = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth,
      clipped: [...document.querySelectorAll('.evidence-lab :is(button,select,input,p,h2,h3,li,pre)')].filter(el => el.checkVisibility()).filter(el => {
        const box = el.getBoundingClientRect(); return box.left < -1 || box.right > innerWidth + 1;
      }).map(el => el.textContent.slice(0, 80)) }));
    if (result.overflow || result.clipped.length) findings.push({ label, result });
  };
  const audit = async label => {
    await geometry(label);
    if (page.viewportSize().width === 1920 && await page.locator('.evidence-lab').count()) {
      const width = await page.locator('.evidence-lab').evaluate(el => {
        const main = el.closest('main'), style = getComputedStyle(main);
        return { actual: el.getBoundingClientRect().width, available: main.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) };
      });
      assert(Math.abs(width.actual - width.available) <= 2, 'The two-column investigation must use the available desktop width');
    }
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })));
    if (violations.length) findings.push({ label, violations });
    for (const target of await page.locator('.evidence-lab :is(button,select,input,summary):visible').all()) {
      await target.scrollIntoViewIfNeeded();
      const box = await target.boundingBox();
      if (!box || box.width < 24 || box.height < 24) findings.push({ label, target: await target.getAttribute('name') || await target.innerText(), box });
    }
    states++;
  };
  const keyboard = async locator => { await locator.focus(); await page.keyboard.press('Enter'); };
  const run = async count => { await keyboard(rel('run')); await expect(rel('check-title')).toBeFocused(); await expect(rel('check-title')).toContainText(`${count} of 3`); };
  const repair = async (id, action) => {
    await keyboard(page.locator(`[data-rel-inspect="${id}"]`));
    await expect(rel('inspector-title')).toBeFocused();
    await keyboard(page.locator(`[data-rel-repair="${action}"]`));
    await expect(rel('repair-feedback')).toBeFocused();
    await expect(rel('check-title')).toContainText('have not run');
    await expect(rel('decision')).toHaveText('Decision pending');
  };
  const download = async (locator, filename) => {
    const pending = page.waitForEvent('download'); await locator.click();
    const file = await pending; assert.equal(file.suggestedFilename(), filename);
    return JSON.parse(readFileSync(await file.path(), 'utf8'));
  };
  try {
    for (const viewport of [{ width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.goto(root + 'experiment-that-lied/');
      await expect(exp('app')).toBeVisible(); await expect(exp('fallback')).toBeHidden();
      await expect(exp('pooled')).toBeHidden(); await expect(exp('groups')).toBeHidden();
      await keyboard(exp('predict').getByRole('button'));
      await expect(page.locator('#exp-prediction')).toBeFocused();
      await expect(exp('pooled')).toBeHidden();
      await audit(`${viewport.width} prediction`);
      await page.locator('#exp-prediction').selectOption('A');
      await keyboard(exp('predict').getByRole('button'));
      await expect(exp('pooled-title')).toBeFocused();
      await expect(exp('pooled')).toContainText('26%'); await expect(exp('pooled')).toContainText('19%');
      await expect(exp('groups')).toBeHidden();
      await keyboard(exp('reveal')); await expect(exp('groups-title')).toBeFocused();
      await expect(exp('groups')).toContainText('B leads by 5 percentage points');
      await exp('groups').getByText('Compare a shared 50/50 mix', { exact: true }).click();
      await expect(exp('groups').locator('details')).toContainText('20%');
      await audit(`${viewport.width} reversal`);
      await exp('groups-title').evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `${screenshots}/experiment-reversal-${viewport.width}.png` });
      await keyboard(exp('write')); await expect(exp('report-title')).toBeFocused();
      await keyboard(exp('record-form').getByRole('button'));
      await expect(page.locator('#exp-conclusion')).toBeFocused(); await expect(exp('handover')).toBeHidden();
      await page.locator('#exp-conclusion').selectOption('causal-a');
      await page.locator('#exp-allocation').selectOption('repeat-mix');
      await page.locator('#exp-photo').selectOption('change');
      await page.locator('#exp-stopping').selectOption('winner');
      await keyboard(exp('record-form').getByRole('button'));
      await expect(exp('feedback-title')).toBeFocused(); await expect(exp('issues').locator('li')).toHaveCount(7);
      const premature = await download(exp('download'), 'alex-experiment-v1.json');
      assert.equal(premature.choices.conclusion, 'causal-a'); assert.equal(premature.choices.prediction, 'A');
      await audit(`${viewport.width} imperfect note`);
      await page.locator('#exp-conclusion').selectOption('unknown'); await expect(exp('handover')).toBeHidden();
      for (const risk of ['mix', 'allocation', 'identity']) await page.locator(`[name="risks"][value="${risk}"]`).check();
      await page.locator('#exp-allocation').selectOption('within-zone');
      await page.locator('#exp-photo').selectOption('frozen'); await page.locator('#exp-stopping').selectOption('fixed');
      for (const width of [375, 639, 640, 849, 850, 1024, 1439, 1440, 1920, viewport.width]) {
        await page.setViewportSize({ width, height: viewport.height }); await geometry(`experiment resize ${width}`);
        await expect(page.locator('#exp-conclusion')).toHaveValue('unknown');
      }
      await keyboard(exp('record-form').getByRole('button'));
      await expect(exp('feedback-title')).toHaveText('Evidence note ready to carry forward');
      const record = await download(exp('download'), 'alex-experiment-v1.json');
      assert.deepEqual(record.observations.map(row => row.positives), [24, 7, 2, 12]);
      assert.equal(record.choices.prediction, 'A'); assert.equal(record.choices.conclusion, 'unknown');
      await audit(`${viewport.width} supported note`);
      await exp('report-title').evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `${screenshots}/experiment-note-${viewport.width}.png` });
      await keyboard(exp('continue'));
      await expect(rel('app')).toBeVisible(); await expect(rel('origin')).toContainText('Carried from your Week 4');
      assert.deepEqual(JSON.parse(await rel('record').textContent()), record);
      await keyboard(rel('ready')); await expect(rel('decision')).toHaveText('Rehearsal held'); await expect(rel('decision')).toBeFocused();
      await run(0); await audit(`${viewport.width} release initially held`);
      await rel('check-title').evaluate(el => el.scrollIntoView({ block: 'center' }));
      await page.screenshot({ path: `${screenshots}/release-held-${viewport.width}.png` });
      await repair('claim', 'swap-winner'); await run(0);
      await repair('claim', 'limit-claim'); await run(1);
      assert.equal(JSON.parse(await rel('record').textContent()).choices.prediction, 'A');
      await repair('photo', 'rename-photo'); await run(1);
      await expect(rel('current')).toContainText('photo-a-draft.svg');
      await repair('photo', 'restore-photo'); await run(2);
      await expect(rel('current')).toContainText('photo-a-crop.svg');
      await repair('plan', 'raise-budget'); await run(2);
      await repair('plan', 'restore-plan');
      await expect(rel('current')).toContainText('Confirmation not established');
      await keyboard(rel('ready')); await expect(rel('decision')).toHaveText('Rehearsal held');
      await run(3); await keyboard(rel('ready')); await expect(rel('decision')).toHaveText('Ready for this rehearsal only');
      await audit(`${viewport.width} release ready`);
      const trace = await download(rel('download'), 'alex-release-review-v1.json');
      assert.deepEqual(trace.received, record); assert.equal(trace.current.decision, 'ready');
      assert.equal(trace.current.revision, 6); assert.equal(trace.current.audit.revision, 6);
      assert.equal(trace.current.history.length, 17); assert.equal(trace.fictional, true);
      await rel('decision').evaluate(el => el.scrollIntoView({ block: 'center' }));
      await page.screenshot({ path: `${screenshots}/release-ready-${viewport.width}.png` });
      await repair('plan', 'raise-budget'); await keyboard(rel('ready')); await expect(rel('decision')).toHaveText('Rehearsal held');
      await rel('reset').click(); await expect(rel('check-title')).toBeFocused();
      assert.deepEqual(JSON.parse(await rel('record').textContent()), record);
      await expect(rel('history').locator('li')).toHaveCount(1);

      await page.getByText('Bring a saved Week 4 note', { exact: true }).click();
      for (const text of ['not JSON', JSON.stringify({ ...record, fictional: false }), 'x'.repeat(10001)]) {
        await rel('file').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from(text) });
        await expect(rel('error')).toContainText('Your current rehearsal is unchanged');
        assert.deepEqual(JSON.parse(await rel('record').textContent()), record);
      }
      await rel('file').setInputFiles({ name: 'alex-experiment-v1.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(premature)) });
      await expect(rel('origin')).toContainText('Loaded your saved Week 4');
      await expect(rel('error')).toBeEmpty();
      assert.deepEqual(JSON.parse(await rel('record').textContent()), premature);
      await page.reload();
      await expect(rel('app')).toBeVisible();
      assert.deepEqual(JSON.parse(await rel('record').textContent()), premature, 'Reload keeps the selected incoming note');
      await repair('claim', 'limit-claim');
      const revised = await download(rel('download-note'), 'alex-experiment-v1.json');
      assert.deepEqual(revised.choices, { ...premature.choices, conclusion: 'unknown' });
      for (const width of [375, 639, 640, 849, 850, 1024, 1439, 1440, 1920, viewport.width]) {
        await page.setViewportSize({ width, height: viewport.height }); await geometry(`release resize ${width}`);
        await expect(rel('current')).toContainText('No causal bio effect');
      }
      await audit(`${viewport.width} file import and revised source`);
      await rel('experiment').click(); await expect(exp('report')).toBeVisible();
      await expect(page.locator('#exp-conclusion')).toHaveValue('unknown');
      await expect(page.locator('#exp-allocation')).toHaveValue('repeat-mix');
      await exp('reset').click(); await expect(page.locator('#exp-prediction')).toBeFocused();
      await expect(exp('report')).toBeHidden(); await expect(exp('pooled')).toBeHidden(); assert.equal(new URL(page.url()).hash, '');
      console.log(`Evidence journey: prediction, reversal, handoff, rejected repairs, rechecks, imports and downloads passed at ${viewport.width}px.`);
    }
    await page.goto(root + 'release-day/#experiment=%E0%A4%A');
    await expect(rel('error')).toContainText('sample is shown instead'); await expect(rel('app')).toBeVisible();
    await page.goto(root + 'experiment-that-lied/#experiment=null');
    await expect(exp('error')).toContainText('fresh investigation'); await expect(exp('app')).toBeVisible();
    await page.setViewportSize({ width: 844, height: 390 }); await geometry('short landscape');

    const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      for (const [route, prefix, summary] of [['experiment-that-lied/', 'exp', 'Open the four exposure cells'], ['release-day/', 'rel', 'Trace the repairs to earlier weeks']]) {
        await noJS.goto(root + route);
        await expect(noJS.locator(`[data-${prefix}-app]`)).toBeHidden();
        await expect(noJS.locator(`[data-${prefix}-fallback]`)).toBeVisible();
        await noJS.getByText(summary, { exact: true }).click();
        assert(await noJS.evaluate(() => document.documentElement.scrollWidth === innerWidth));
      }
    } finally { await noJS.close(); }

    const network = await page.context().newCDPSession(page);
    await network.send('Network.enable'); await network.send('Network.setCacheDisabled', { cacheDisabled: true });
    await network.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 100000 });
    for (const [route, app] of [['experiment-that-lied/', exp('app')], ['release-day/', rel('app')]]) {
      await page.goto(root + route); await expect(app).toBeVisible(); await geometry('slow ' + route);
    }
    await network.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    await network.detach();

    for (const width of [1920, 390]) {
      await page.setViewportSize({ width, height: width === 1920 ? 1080 : 844 });
      for (const [route, target] of [['', 'experiment-that-lied/'], ['toolkit/', 'release-day/'], ['lectures/week-04/', 'experiment-that-lied/'], ['lectures/week-12/', 'release-day/'], ['sessions/04-bio-experiment/', 'experiment-that-lied/'], ['sessions/12-maintenance/', 'release-day/'], ['assessments/market-report/', 'experiment-that-lied/'], ['assessments/profile-deployment/', 'release-day/']]) {
        await page.goto(root + route); await audit(`entry ${route || 'home'} ${width}`);
        const link = page.locator(`main a[href="${new URL(root + target).pathname}"]`).first();
        await expect(link).toBeVisible(); await link.click(); await expect(page.locator('.evidence-lab')).toBeVisible();
      }
    }
    assert.deepEqual(errors, [], 'No browser errors'); assert.deepEqual(writes, [], 'No network writes');
    assert.deepEqual(findings, [], 'No accessibility, clipping or target-size findings');
  } finally {
    writeFileSync(`${screenshots}/evidence-journey-report.json`, JSON.stringify({ states, findings, errors, writes }, null, 2));
    await page.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { base } = resolveDeployment(process.env, gitOrigin);
  const root = `${process.env.AUDIT_ORIGIN ?? 'http://127.0.0.1:4322'}${base.replace(/\/$/, '')}/`;
  const browser = await chromium.launch();
  try { await inspectEvidenceJourney(browser, root, process.env.AUDIT_SCREENSHOTS ?? '/tmp/evidence-journey-audit'); }
  finally { await browser.close(); }
}
