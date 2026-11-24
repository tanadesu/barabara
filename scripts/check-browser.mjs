import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { site } from '../src/data/site.ts';
import { classifyShows } from '../src/lib/content.ts';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const width of [1440, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:3000');
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('h1').innerText(), 'バ\nラ\nバ\nラ\nロ\nン');
  assert.equal(await page.locator('#contact').count(), 0);
  for (const text of ['プロフィール準備中', '音源準備中', '現在、お知らせはありません。']) assert.ok(await page.getByText(text, { exact: false }).count());
  const { upcoming } = classifyShows(site.shows);
  if (upcoming.length) {
    assert.equal(await page.locator('.live-empty').count(), 0);
    for (const show of upcoming) assert.ok(await page.locator('.show-poster').getByRole('heading', { name: show.title, exact: true }).count());
  } else assert.ok(await page.getByText('現在、ライブの予定はありません').count());
  const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.ok(dimensions.scroll <= dimensions.width, `Overflow at ${width}: ${dimensions.scroll}`);
  if (width <= 560) {
    await page.getByRole('button', { name: 'メニュー +' }).click();
    assert.equal(await page.getByRole('button', { name: '閉じる −' }).getAttribute('aria-expanded'), 'true');
    await page.getByRole('navigation').getByRole('link', { name: 'ライブ' }).click();
    assert.equal(await page.getByRole('button', { name: 'メニュー +' }).getAttribute('aria-expanded'), 'false');
    assert.ok(page.url().endsWith('#live'));
  }
  await page.goto('http://localhost:3000');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `/tmp/barabarron-${width}.png`, fullPage: true });
  console.log(`${width}px: layout, empty states, navigation OK`);
}
assert.deepEqual(errors, []);
await browser.close();
