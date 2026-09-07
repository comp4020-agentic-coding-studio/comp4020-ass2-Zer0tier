import { chromium, expect } from '@playwright/test';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { gitOrigin, resolveDeployment } from './pages-base.ts';

const axePath = createRequire(import.meta.resolve('astro-theme-university')).resolve('axe-core/axe.min.js');
const fixtures = [
  {
    id: 'platform-audit', route: 'sessions/02-platforms/', firstQuestion: 'queue', numberQuestion: 'elo',
    allCorrect: ['filtered', 'scoped', '1412', 'corrected', 'bounded', 'allocation'],
    mixed: ['highest', 'scoped', '1424', 'old', 'causal', 'allocation'],
    withheld: 'Then 1400 + 24', feedback: ['1412', '36/900 = 4%'],
  },
  {
    id: 'photo-audit', route: 'sessions/03-photo-assets/', firstQuestion: 'provenance', numberQuestion: 'crop',
    allCorrect: ['blocked', 'isolated', '25', 'unresolved', 'rowwise', 'freeze'],
    mixed: ['looks', 'isolated', '50', 'recognised', 'totals', 'freeze'],
    withheld: '400 × 300 = 120,000', feedback: ['120,000/480,000 = 25%', 'T1, T4, T7 and T8'],
    captureCases: [2, 4],
  },
  {
    id: 'bio-audit', route: 'sessions/04-bio-experiment/', firstQuestion: 'budget', numberQuestion: 'coverage',
    allCorrect: ['codepoints', 'supported', '75', 'weighted', 'units', 'prespecified'],
    mixed: ['utf16', 'supported', '125', 'pooled-cause', 'relative-six', 'prespecified'],
    withheld: 'their union is {0, 1, 2}', feedback: ['100 × 3/4 = 75%', 'A = 38/80 = 47.5%', '0.06/0.12 = 50%'],
    captureCases: [1, 2, 3],
  },
  {
    id: 'match-audit', route: 'sessions/05-match-probability/', firstQuestion: 'conditional', numberQuestion: 'joint',
    allCorrect: ['reverse', 'shared-draw', '12', 'studio', 'denominators', 'conservative'],
    mixed: ['forward', 'shared-draw', '40', 'atrium', 'count-winner', 'conservative'],
    withheld: 'P(A and B) = 0.40 × 0.30 = 0.12', feedback: ['20/100 = 20%', '0.40 × 0.30 = 0.12', 'rank = 1 + 4 = 5/100'],
    captureCases: [2, 3, 4],
  },
  {
    id: 'message-audit', route: 'sessions/06-message-tree/', firstQuestion: 'terminal', numberQuestion: 'crossover',
    allCorrect: ['stop', 'grounded', '0.15', 'priorities', 'recoded', 'filter'],
    mixed: ['review-topic', 'grounded', '0.10', 'restart', 'drop-row', 'filter'],
    withheld: 'Equating them gives 10λ = 1.5', feedback: ['λ = 0.15 utility units per second', '9/40 = 22.5%', '14/20 = 70%'],
    captureCases: [1, 2, 3, 5],
  },
  {
    id: 'communication-audit', route: 'sessions/07-communication/', firstQuestion: 'receipt', numberQuestion: 'threshold',
    allCorrect: ['fields', 'complement', '0.7', 'best-responses', 'late', 'preserve'],
    mixed: ['delivered', 'complement', '0.9', 'dominant', 'extend', 'preserve'],
    withheld: 'gives 5q = 3.5', feedback: ['q = 0.7', 'r = 3/5', 'window [5, 8)'],
    captureCases: [2, 3, 4, 5],
  },
  {
    id: 'threat-audit', route: 'sessions/08-threat-model/', firstQuestion: 'boundary', numberQuestion: 'precision',
    allCorrect: ['remove', 'coded', '37.5', 'cost-aware', 'projected', 'retain'],
    mixed: ['declaration', 'coded', '75', 'always-high', 'recall', 'retain'],
    withheld: 'precision = 100 × 6/16 = 37.5%', feedback: ['100 × 6/16 = 37.5%', '12/61 ≈ 19.67%', 'window is [4, 6)'],
    captureCases: [1, 2, 4, 5],
  },
];

export async function inspectTutorialQuiz(browser, root, screenshots) {
  for (const fixture of fixtures) await inspectQuiz(browser, root, screenshots, fixture);
}

async function inspectQuiz(browser, root, screenshots, fixture) {
  const { id, route, firstQuestion, numberQuestion, allCorrect, mixed } = fixture;
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const quiz = page.locator(`#${id}-quiz`);
  const form = quiz.locator('form');
  const results = quiz.locator('[data-quiz-results]');
  const submit = quiz.getByRole('button', { name: 'Reveal answers', exact: true });
  const keyUrl = root + `data/quizzes/${id}.json`;
  let answerRequests = 0;
  page.on('request', request => { if (request.url() === keyUrl) answerRequests++; });

  async function open() {
    await page.goto(root + route + `#${id}-quiz`);
    await expect(quiz).toHaveAttribute('data-enhanced', 'true');
  }
  async function choose(index, response) {
    await quiz.locator(`[data-quiz-step="${index}"]`).click();
    const field = quiz.locator('[data-quiz-question]').nth(index);
    if (index === 2) await field.getByRole('textbox').fill(response);
    else await field.locator(`input[value="${response}"]`).check();
  }
  async function noReveal() {
    await expect(results).toBeHidden();
    assert.equal(await quiz.locator('[data-quiz-feedback] article').count(), 0);
    assert(!(await quiz.textContent()).includes(fixture.withheld), 'No worked solution exists in the hidden DOM');
  }
  async function geometryAndAxe(label) {
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), page.viewportSize().width, label);
    const targets = await quiz.locator('label.quiz-option, button:visible, input[type="text"]:visible').evaluateAll(elements => elements.filter(el => el.checkVisibility()).map(el => {
      const r = el.getBoundingClientRect(); return { text: el.textContent, w: r.width, h: r.height };
    }));
    assert(targets.every(t => t.w >= 44 && t.h >= 44), `${label}: touch targets ${JSON.stringify(targets)}`);
    for (const illustration of await quiz.locator('img:visible').all()) {
      await illustration.scrollIntoViewIfNeeded();
      await expect(illustration).toHaveJSProperty('complete', true);
      assert(await illustration.evaluate(el => el.naturalWidth > 0), `${label}: illustration loaded`);
      const box = await illustration.boundingBox();
      assert(box && box.x >= 0 && box.x + box.width <= page.viewportSize().width, `${label}: illustration fits`);
    }
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    })).violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })));
    assert.deepEqual(violations, [], label);
  }

  try {
    for (const viewport of [{ width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await open();
      const requestsBefore = answerRequests;
      await noReveal();
      await expect(submit).toBeDisabled();
      await geometryAndAxe(`Initial quiz at ${viewport.width}`);
      if (screenshots) await quiz.screenshot({ path: `${screenshots}/${id}-quiz-initial-${viewport.width}.png` });
      for (let index = 1; index < 6; index++) {
        await quiz.locator(`[data-quiz-step="${index}"]`).click();
        await geometryAndAxe(`${id} case ${index + 1} at ${viewport.width}`);
        if (screenshots && fixture.captureCases?.includes(index)) {
          await quiz.screenshot({ path: `${screenshots}/${id}-case-${index + 1}-${viewport.width}.png` });
        }
      }

      // A direct submit cannot bypass the button's completion gate.
      await form.evaluate(el => el.requestSubmit());
      await expect(quiz.locator('[data-quiz-error]')).toBeFocused();
      await expect(quiz.locator('[data-error-list] li')).toHaveCount(6);
      await noReveal();
      assert.equal(answerRequests, requestsBefore);

      // Actual native-radio keyboard interaction, including changing a choice.
      await quiz.locator('[data-error-list] a').first().click();
      await expect(quiz.locator(`input[name="${firstQuestion}"]`).first()).toBeFocused();
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await expect(quiz.locator(`input[name="${firstQuestion}"]`).nth(1)).toBeChecked();
      await choose(0, mixed[0]);
      await choose(1, mixed[1]);
      await choose(2, 'not a number');
      await expect(quiz.locator('[data-quiz-status]')).toContainText('2 of 6 answered');
      await form.evaluate(el => el.requestSubmit());
      await expect(quiz.locator(`input[name="${numberQuestion}"]`)).toHaveAttribute('aria-invalid', 'true');
      await geometryAndAxe(`Incomplete quiz at ${viewport.width}`);
      await choose(2, mixed[2]);
      await choose(3, mixed[3]);
      await choose(4, mixed[4]);
      await expect(quiz.locator('[data-quiz-status]')).toContainText('5 of 6 answered');
      await expect(submit).toBeDisabled();
      await form.evaluate(el => el.requestSubmit());
      await noReveal();
      assert.equal(answerRequests, requestsBefore, 'Five answers must not fetch the solutions');

      await choose(5, mixed[5]);
      await quiz.getByRole('button', { name: 'Previous case', exact: true }).click();
      await expect(quiz.locator(`input[value="${mixed[4]}"]`)).toBeChecked();
      await expect(submit).toBeEnabled();
      await noReveal();
      assert.equal(answerRequests, requestsBefore, 'Completing the sixth case does not auto-reveal');

      // A failed solution request keeps the attempt and supports a real retry.
      await page.route(keyUrl, route => route.fulfill({ status: 503, body: 'Temporarily unavailable' }), { times: 1 });
      await submit.click();
      await expect(quiz.locator('[data-quiz-load-error]')).toBeVisible();
      await expect(submit).toBeFocused();
      await noReveal();
      await submit.click();
      await expect(quiz.locator('[data-quiz-result-title]')).toHaveText('2 of 6 cases checked correctly');
      await expect(quiz.locator('[data-quiz-result-title]')).toBeFocused();
      await expect(results.locator('article')).toHaveCount(6);
      for (const explanation of fixture.feedback) await expect(results).toContainText(explanation);
      await geometryAndAxe(`Worked feedback at ${viewport.width}`);
      if (screenshots) await results.screenshot({ path: `${screenshots}/${id}-quiz-feedback-${viewport.width}.png` });

      await quiz.getByRole('button', { name: 'Try again', exact: true }).click();
      await noReveal();
      await expect(quiz.locator('[data-quiz-status]')).toContainText('0 of 6 answered');
      await expect(submit).toBeDisabled();
      assert.equal(await quiz.locator('input:checked').count(), 0);
      await expect(quiz.locator(`input[name="${numberQuestion}"]`)).toHaveValue('');
      for (let i = 0; i < allCorrect.length; i++) await choose(i, allCorrect[i]);
      await submit.focus();
      await page.keyboard.press('Enter');
      await expect(quiz.locator('[data-quiz-result-title]')).toHaveText('6 of 6 cases checked correctly');
      await page.reload();
      await expect(quiz.locator('[data-quiz-status]')).toContainText('0 of 6 answered');
      await noReveal();
    }

    for (const viewport of [{ width: 375, height: 667 }, { width: 844, height: 390 }]) {
      await page.setViewportSize(viewport);
      await open();
      for (let index = 0; index < 6; index++) {
        await quiz.locator(`[data-quiz-step="${index}"]`).click();
        await geometryAndAxe(`Case ${index + 1} at ${viewport.width}`);
      }
    }
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const staticPage = await noJs.newPage();
    await staticPage.goto(root + route + `#${id}-quiz`);
    await expect(staticPage.locator('[data-quiz-fallback]')).toBeVisible();
    await expect(staticPage.locator('[data-quiz-question]:visible')).toHaveCount(6);
    await expect(staticPage.locator('[data-quiz-submit]')).toBeDisabled();
    await expect(staticPage.locator('[data-quiz-results]')).toBeHidden();
    const staticUrl = staticPage.url();
    await staticPage.locator(`input[name="${numberQuestion}"]`).fill('100');
    await staticPage.keyboard.press('Enter');
    assert.equal(staticPage.url(), staticUrl, 'No-JS Enter must not send responses as URL parameters');
    assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth), 390);
    await noJs.close();
    assert.deepEqual(errors, []);
    console.log(`${id} quiz passed: six-case completion gate, no early solution requests, keyboard, mixed/full scores, retry, load recovery, no-JS, axe and all six cases at four viewports.`);
  } finally {
    await context.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { base } = resolveDeployment(process.env, gitOrigin);
  const root = `${process.env.AUDIT_ORIGIN ?? 'http://127.0.0.1:4322'}${base.replace(/\/$/, '')}/`;
  const screenshots = process.env.AUDIT_SCREENSHOTS ?? '/tmp/tutorial-quiz-audit';
  mkdirSync(screenshots, { recursive: true });
  const browser = await chromium.launch();
  try { await inspectTutorialQuiz(browser, root, screenshots); }
  finally { await browser.close(); }
}
