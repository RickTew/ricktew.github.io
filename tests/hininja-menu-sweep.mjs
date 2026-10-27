/* The Ninja Menu on /hininja/ (25 Oct 2026): desktop and phone, the eight areas, the belt dots,
   filling the weeks and the cap, the four stays and the upsell beside Book, the plan mail (stubbed:
   nothing is sent) and the checkout hand-off through the real /hininja/buy/ relay (the checkout
   function is stubbed: no Stripe session), the belt program's button, an ad click's src, the popular
   quick picks (one fills a week, 27 Oct 2026), and no page overflow. Serve the repo first, then: BASE=http://localhost:8765 node tests/hininja-menu-sweep.mjs */
import { createRequire } from 'module';
import os from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || '/Users/ricktew/Dev/NinjaVillage/node_modules/playwright');
const OUT = (process.env.OUT || os.tmpdir()) + '/';
const BASE = process.env.BASE || 'http://localhost:8765';
const bad = [];
const browser = await chromium.launch();
for (const [label, vp] of [['desktop', { width: 1280, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') bad.push(label + ' console: ' + m.text()); });
  page.on('pageerror', e => bad.push(label + ' pageerror: ' + e.message));
  let posted = null, checkout = null;
  await page.route('**/functions/v1/ricktew-contact', r => { posted = JSON.parse(r.request().postData()); r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{"ok":true}' }); });
  await page.route('**/functions/v1/ricktew-shop/**', r => { checkout = r.request().url(); r.fulfill({ status: 200, contentType: 'text/html', body: '<p>stub checkout</p>' }); });
  const menu = page.locator('#menu');
  const tile = (t) => menu.locator('.tile', { hasText: t }).click();
  const pick = (t) => menu.locator('.pick', { hasText: t }).first().click();
  const button = (t) => menu.locator('button', { hasText: t }).first().click();
  const stayBtn = (t) => menu.locator('.stay-o', { hasText: t });
  await page.goto(BASE + '/hininja/?gclid=Cj0KabcXYZ&cid=2233');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.screenshot({ path: OUT + label + '-1-menu.png' });
  if (await menu.locator('.tile').count() !== 8) bad.push(label + ' tiles');
  // nothing to book before the Ninja Week is built (Rick, 25 Oct: "minimum 5 choices")
  const noBook = async (when) => { if (await menu.locator('button', { hasText: /^Book/ }).count() || await menu.locator('.stay-o').count()) bad.push(label + ' Book or stays shown ' + when); };
  await noBook('on arrival');
  await tile('Body Movement');
  if (await menu.locator('h2').textContent() !== 'Which move?') bad.push(label + ' bm heading');
  if (await menu.locator('.pick-l.lv1').count() !== 2) bad.push(label + ' yellow dots');
  await pick('Stealthing');
  if (await menu.locator('h2').textContent() !== 'Which move?') bad.push(label + ' a pick left the list');
  if (await menu.locator('.pick', { hasText: 'Stealthing' }).getAttribute('aria-pressed') !== 'true') bad.push(label + ' Stealthing not pressed');
  if (!/4 more to go/.test(await menu.locator('.tray-n').textContent())) bad.push(label + ' progress after 1');
  await noBook('after 1 pick');
  await page.screenshot({ path: OUT + label + '-2-one.png' });
  await button('Other areas');
  await tile('Stances');
  for (let i = 0; i < 3; i++) await menu.locator('.pick[aria-pressed="false"]').first().click();
  await noBook('after 4 picks');
  await menu.locator('.pick[aria-pressed="false"]').first().click(); // the 5th
  if (await menu.locator('h2').textContent() !== 'Your Ninja Week is ready') bad.push(label + ' 5th pick did not open the ready step');
  if (await menu.locator('.stay-o').count() !== 4) bad.push(label + ' stays not shown when ready');
  if (await menu.locator('.wk').count() !== 1) bad.push(label + ' empty week rows under ready: ' + await menu.locator('.wk').count());
  await page.screenshot({ path: OUT + label + '-3-ready.png' });
  // fill the 2 weeks
  await button('Add more picks'); await tile('Stances');
  for (let i = 0; i < 5; i++) await menu.locator('.pick[aria-pressed="false"]:not([disabled])').first().click();
  const total = await page.evaluate(() => JSON.parse(localStorage.getItem('hininja-plan-v1')).picks.length);
  if (total !== 10) bad.push(label + ' total ' + total);
  if (await menu.locator('.pick:not([aria-pressed="true"]):not([disabled])').count()) bad.push(label + ' picks open when full');
  if (!(await stayBtn('2 weeks').isEnabled())) bad.push(label + ' 2 weeks disabled at 10 picks');
  await menu.locator('.mc-back').click(); await tile('Kicks');
  if (await menu.locator('.pick:disabled').count() !== 10) bad.push(label + ' kicks not disabled when full');
  await stayBtn('1 month').click();
  if (await stayBtn('1 month').getAttribute('aria-pressed') !== 'true') bad.push(label + ' month not pressed');
  if (await menu.locator('.pick:disabled').count() !== 0) bad.push(label + ' kicks disabled in a month');
  await pick('Front Kicks');
  if (await stayBtn('2 weeks').isEnabled()) bad.push(label + ' 2 weeks enabled with 11 picks');
  await page.screenshot({ path: OUT + label + '-4-stays.png' });
  // the pick list's bar: "Your Ninja Week is ready" with See my week
  if (!/ready/.test(await menu.locator('.mc-bar').textContent())) bad.push(label + ' bar not ready');
  await menu.locator('.mc-bar button').click();
  if (await menu.locator('h2').textContent() !== 'Your Ninja Week is ready') bad.push(label + ' See my week');
  await button('Book my month');
  if (await menu.locator('.upsell').count()) bad.push(label + ' upsell shown for a month');
  if (await menu.locator('.stay-o').count()) bad.push(label + ' a second stay picker on the book step');
  if (!/1 month, \$3,997/.test(await menu.locator('.stay-line').textContent())) bad.push(label + ' stay line');
  await menu.locator('.stay-line button', { hasText: 'Change' }).click();
  await stayBtn('3 weeks').click();
  await button('Book my 3 weeks');
  if (!/full month for \$3,997/.test(await menu.locator('.upsell').textContent())) bad.push(label + ' upsell for 3 weeks');
  await page.fill('#planName', 'Test Person');
  await button('The full month, $3,997'); // keeps what was typed
  if (await page.inputValue('#planName') !== 'Test Person') bad.push(label + ' name lost');
  await page.fill('#planEmail', 'test.person@gmail.com');
  if (await menu.locator('button[type=submit]').textContent() !== 'Save my plan and book, $3,997') bad.push(label + ' send text');
  await page.screenshot({ path: OUT + label + '-5-book.png' });
  await menu.locator('button[type=submit]').click();
  await page.waitForTimeout(1500);
  if (!posted || posted.subject !== 'plan' || !/Stay: 1 month, \$3,997/.test(posted.message) || !/Week 3: Front Kicks \(Kicks\)/.test(posted.message) || /WinJitsu coaching add-on/.test(posted.message) || posted.source !== 'gads')
    bad.push(label + ' posted ' + JSON.stringify(posted));
  if (!checkout || !/buy\?sku=HIN-GNS-2W&src=gns-gads-2233-gCj0KabcXYZ&weeks=4&cur=thb$/.test(checkout)) bad.push(label + ' checkout ' + checkout);
  if (label === 'desktop') console.log(posted && posted.message);
  // the belt program's button: straight to the form with the belt, no picks needed
  posted = null; checkout = null;
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('#belts a[data-stay="8"]').click();
  await page.waitForTimeout(700);
  if (!/A belt, 2 months, \$7,994/.test(await menu.locator('.stay-line').textContent())) bad.push(label + ' belt not chosen');
  if (!/No picks needed/.test(await menu.locator('.tray-n').last().textContent())) bad.push(label + ' belt picks line');
  await page.fill('#planName', 'Belt Person'); await page.fill('#planEmail', 'belt.person@gmail.com');
  if (await menu.locator('button[type=submit]').textContent() !== 'Save my plan and book, $7,994') bad.push(label + ' belt send text');
  await page.screenshot({ path: OUT + label + '-6-belt.png' });
  await menu.locator('button[type=submit]').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Stay: A belt, 2 months, \$7,994 \(the belt program, yellow belt first\)/.test(posted.message)) bad.push(label + ' belt posted ' + JSON.stringify(posted));
  if (!checkout || !/src=ricktew-plan&weeks=8&cur=thb$/.test(checkout)) bad.push(label + ' belt checkout ' + checkout);
  // the popular quick picks (27 Oct 2026): one fills a whole week, mixes with single picks, and closes when the weeks are full
  posted = null; checkout = null;
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  if (await menu.locator('.qp').count() !== 4) bad.push(label + ' quick picks ' + await menu.locator('.qp').count());
  if (await menu.locator('.tile img').count() !== 8) bad.push(label + ' tile icons');
  await tile('Strikes'); await pick('Fist Strikes'); await pick('Elbow'); await pick('Ridge Hand');
  await button('Other areas');
  await menu.locator('.qp', { hasText: 'PSC Self-Defense Program' }).click();
  if (await menu.locator('h2').textContent() !== 'Your Ninja Week is ready') bad.push(label + ' a quick pick did not open the ready step');
  const rows = await menu.locator('.wk').allTextContents();
  if (rows.length !== 2 || !/Week 1.*PSC Self-Defense Program/.test(rows[0]) || !/Week 2.*Fist Strikes/.test(rows[1])) bad.push(label + ' quick rows ' + JSON.stringify(rows));
  await page.screenshot({ path: OUT + label + '-7-quick.png' });
  await button('Add more picks');
  if (await menu.locator('.qp[aria-pressed="false"]:disabled').count() !== 3) bad.push(label + ' quick picks open with 2 weeks used');
  await stayBtn('3 weeks').click();
  await menu.locator('.qp', { hasText: 'Strikes and Kicks form' }).click();
  if (await stayBtn('2 weeks').isEnabled()) bad.push(label + ' 2 weeks enabled with 3 weeks used');
  await button('Book my 3 weeks');
  await page.fill('#planName', 'Quick Person'); await page.fill('#planEmail', 'quick.person@gmail.com');
  await menu.locator('button[type=submit]').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Week 1: Quick pick: PSC Self-Defense Program\nWeek 2: Quick pick: Strikes and Kicks form\nWeek 3: Fist Strikes \(Strikes\), Elbow \(Strikes\), Ridge Hand \(Strikes\)/.test(posted.message)) bad.push(label + ' quick posted ' + JSON.stringify(posted && posted.message));
  if (!checkout || !/src=ricktew-plan&weeks=3&cur=thb$/.test(checkout)) bad.push(label + ' quick checkout ' + checkout);
  if (label === 'desktop') console.log(posted && posted.message);
  await page.goto(BASE + '/hininja/');
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (ov > 0) bad.push(label + ' overflow ' + ov);
  for (const id of ['belts', 'where', 'day', 'price', 'rick']) {
    await page.locator('#' + id).scrollIntoViewIfNeeded();
    await page.screenshot({ path: OUT + label + '-s-' + id + '.png' });
  }
  const txt = await page.locator('body').innerText();
  if (/Big C|mall\b|island is yours|add-on/i.test(txt)) bad.push(label + ' old words: ' + (txt.match(/Big C|mall\b|island is yours|add-on/i) || [])[0]);
  await ctx.close();
}
await browser.close();
console.log(bad.length ? 'FINDINGS:\n' + bad.join('\n') : 'CLEAN');
