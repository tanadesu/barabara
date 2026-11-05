import { chromium } from '@playwright/test';
import { site } from '../src/data/site.ts';
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;background:${site.colors.black};color:${site.colors.paper};font-family:Arial,sans-serif;padding:52px}header{font:14px monospace;letter-spacing:3px;border-bottom:1px solid #666;padding-bottom:24px}.stripe{position:absolute;left:-20px;top:260px;width:1250px;height:130px;background:${site.colors.red};transform:rotate(-9deg)}h1{position:relative;display:flex;justify-content:center;margin:105px 0 64px;font-size:148px;letter-spacing:-12px;white-space:nowrap;font-family:'Hiragino Kaku Gothic ProN',sans-serif;font-weight:900}h1 span{background:${site.colors.paper};color:${site.colors.black};transform:rotate(-5deg);padding:0 5px 10px 0;line-height:1.1}h1 span:nth-child(2n){background:${site.colors.red};color:${site.colors.paper};transform:rotate(5deg) translateY(9px)}footer{position:relative;display:flex;justify-content:space-between;font:17px monospace;letter-spacing:3px}</style><header>${escape(site.genre)} / OFFICIAL WEBSITE</header><div class="stripe"></div><h1>${[...site.name].map(c=>`<span>${escape(c)}</span>`).join('')}</h1><footer><span>NO RULES. JUST NOISE.</span><span>バラバラで、ひとつの音。</span></footer>`);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('Generated public/og.png from src/data/site.ts');
