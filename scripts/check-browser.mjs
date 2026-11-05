import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
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
  for (const text of ['PROFILE COMING SOON', 'MUSIC', 'COMING SOON', 'NO SHOWS ANNOUNCED YET', 'NOTHING HERE. YET.']) assert.ok(await page.getByText(text, { exact: false }).count());
  const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.ok(dimensions.scroll <= dimensions.width, `Overflow at ${width}: ${dimensions.scroll}`);
  if (width <= 560) {
    await page.getByRole('button', { name: 'MENU +' }).click();
    assert.equal(await page.getByRole('button', { name: 'CLOSE −' }).getAttribute('aria-expanded'), 'true');
    await page.getByRole('navigation').getByRole('link', { name: 'LIVE' }).click();
    assert.equal(await page.getByRole('button', { name: 'MENU +' }).getAttribute('aria-expanded'), 'false');
    assert.ok(page.url().endsWith('#live'));
  }
  await page.goto('http://localhost:3000');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `/tmp/barabarron-${width}.png`, fullPage: true });
  console.log(`${width}px: layout, empty states, navigation OK`);
}
assert.deepEqual(errors, []);
await browser.close();
