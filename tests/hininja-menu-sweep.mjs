/* The Ninja Menu on /hininja/ (25 Oct 2026): desktop and phone, the eight areas, the belt dots,
   filling the weeks and the cap, the three stays (28 Oct 2026: the month left, the belt is $2,998) and the upsell beside Book, the plan mail (stubbed:
   nothing is sent) and the checkout hand-off through the real /hininja/buy/ relay (the checkout
   function is stubbed: no Stripe session), the belt program's button, an ad click's src, the popular
   quick picks (one fills a week, 27 Oct 2026), the November friend promo on a set clock (shown with
   its friend box in the plan mail, then gone after 30 November), and no page overflow. Serve the repo first, then: BASE=http://localhost:8765 node tests/hininja-menu-sweep.mjs */
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
  if (await menu.locator('.stays:not(.days) .stay-o').count() !== 6) bad.push(label + ' stays not shown when ready'); // Days, 1 week, 2 weeks, 1 month, 2 months (the belt), 3 months (29 Oct 2026 late: 3 weeks dropped)
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
  if (!(await stayBtn('1 month').count())) bad.push(label + ' the month is missing from the stays');
  await stayBtn('2 months, the belt program').click();
  if (await stayBtn('2 months, the belt program').getAttribute('aria-pressed') !== 'true') bad.push(label + ' belt not pressed');
  if (await menu.locator('.pick:disabled').count() !== 0) bad.push(label + ' kicks disabled in a belt');
  await pick('Front Kicks');
  if (await stayBtn('2 weeks').isEnabled()) bad.push(label + ' 2 weeks enabled with 11 picks');
  await page.screenshot({ path: OUT + label + '-4-stays.png' });
  // the pick list's bar: "Your Ninja Week is ready" with See my week
  if (!/ready/.test(await menu.locator('.mc-bar').textContent())) bad.push(label + ' bar not ready');
  await menu.locator('.mc-bar button').click();
  if (await menu.locator('h2').textContent() !== 'Your Ninja Week is ready') bad.push(label + ' See my week');
  await button('Book my 2 months');
  if (await menu.locator('.upsell').count()) bad.push(label + ' upsell shown for a belt');
  if (await menu.locator('.stay-o').count()) bad.push(label + ' a second stay picker on the book step');
  if (!/2 months, the belt program, \$2,998/.test(await menu.locator('.stay-line').textContent())) bad.push(label + ' stay line');
  await menu.locator('.stay-line button', { hasText: 'Change' }).click();
  await stayBtn('1 month').click();
  await button('Book my month');
  if (!/2 months in the belt program, \$2,998/.test(await menu.locator('.upsell').textContent())) bad.push(label + ' upsell for the month');
  await page.fill('#planName', 'Test Person');
  await button('2 months, the belt program, $2,998'); // keeps what was typed
  if (await page.inputValue('#planName') !== 'Test Person') bad.push(label + ' name lost');
  await page.fill('#planEmail', 'test.person@gmail.com'); await page.fill('#planArrive', '2027-02-01'); await page.click('[data-bed="yes"]');
  // two ways to pay (Rick's clicks, 28 Oct 2026 night): $555 down, or the whole stay now, $222 off
  if (await menu.locator('button[data-pay="deposit"]').textContent() !== 'Hold my spot: $555 deposit') bad.push(label + ' deposit text');
  if (await menu.locator('button[data-pay="full"]').textContent() !== 'Pay in full now: $2,776') bad.push(label + ' full text');
  await page.screenshot({ path: OUT + label + '-5-book.png' });
  await menu.locator('button[data-pay="deposit"]').click();
  await page.waitForTimeout(1500);
  if (posted && !/\nPaying: \$555 deposit to hold the spot \(refunded after departure if nothing is broken\), the full \$[0-9,]+ 2 weeks before arrival\n/.test(posted.message)) bad.push(label + ' deposit line ' + JSON.stringify(posted.message));
  if (!posted || posted.subject !== 'plan' || !/Stay: 2 months, the belt program, \$2,998 \(yellow belt first\)/.test(posted.message) || !/Week 3: Front Kicks \(Kicks\)/.test(posted.message) || /WinJitsu coaching add-on/.test(posted.message) || posted.source !== 'gads')
    bad.push(label + ' posted ' + JSON.stringify(posted));
  if (!checkout || !/buy\?sku=HIN-GNS-2W&src=gns-gads-2233-gCj0KabcXYZ&months=2&p=2&pay=deposit&cur=thb$/.test(checkout)) bad.push(label + ' checkout ' + checkout);
  if (!posted || !/\nArrival, desired or estimated: 1 February 2027\nBed: yes, a dorm bed every night of the stay\n/.test(posted.message)) bad.push(label + ' arrival/bed lines ' + JSON.stringify(posted && posted.message));
  if (label === 'desktop') console.log(posted && posted.message);
  // the belt program's button: straight to the form with the belt, no picks needed
  posted = null; checkout = null;
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('#belts a[data-stay="m2"]').click();
  await page.waitForTimeout(700);
  if (!/2 months, the belt program, \$2,998/.test(await menu.locator('.stay-line').textContent())) bad.push(label + ' belt not chosen');
  if (!/No picks needed/.test(await menu.locator('.tray-n').last().textContent())) bad.push(label + ' belt picks line');
  await page.fill('#planName', 'Belt Person'); await page.fill('#planEmail', 'belt.person@gmail.com'); await page.fill('#planArrive', '2027-02-01'); await page.click('[data-bed="yes"]');
  if (await menu.locator('button[data-pay="full"]').textContent() !== 'Pay in full now: $2,776') bad.push(label + ' belt full text');
  await page.screenshot({ path: OUT + label + '-6-belt.png' });
  await menu.locator('button[data-pay="full"]').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Stay: 2 months, the belt program, \$2,998 \(yellow belt first\)\nPaying: in full now, \$2,776/.test(posted.message)) bad.push(label + ' belt posted ' + JSON.stringify(posted));
  if (!checkout || !/src=ricktew-plan&months=2&p=2&pay=full&cur=thb$/.test(checkout)) bad.push(label + ' belt checkout ' + checkout);
  // the 1 week card (Rick's click "Sell it, pay in full only", 29 Oct 2026): Ninja Week first, one Book button, paid in
  // full, no ?pay to the checkout, and the upsell offers the 2 weeks
  posted = null; checkout = null;
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('#price a[data-stay="1"]').click();
  await page.waitForTimeout(700);
  if (await menu.locator('.tile').count() !== 8) bad.push(label + ' 1 week card did not open the menu');
  await menu.locator('.qp', { hasText: 'PSC Self-Defense Program' }).click();
  if (await menu.locator('h2').textContent() !== 'Your Ninja Week is ready') bad.push(label + ' 1 week: no ready step');
  if (await stayBtn('1 week').getAttribute('aria-pressed') !== 'true') bad.push(label + ' 1 week not pressed');
  await button('Book my week');
  if (!/Make it 2 weeks for \$1,111/.test(await menu.locator('.upsell').textContent())) bad.push(label + ' upsell for 1 week');
  if (await menu.locator('button[data-pay="full"]').count()) bad.push(label + ' a pay-in-full button on the 1 week');
  if (await menu.locator('.mc-pay button').textContent() !== 'Book my week: $555') bad.push(label + ' 1 week button text');
  if (/\$555 deposit/.test(await menu.locator('.mc-small').textContent())) bad.push(label + ' deposit line on the 1 week');
  // 2 weeks takes the $555 deposit or $889 in full (Rick's click "2 weeks and up", 29 Oct 2026 night)
  await menu.locator('.upsell button', { hasText: '2 weeks in all, $1,111' }).click();
  if (await menu.locator('button[data-pay="deposit"]').textContent() !== 'Hold my spot: $555 deposit') bad.push(label + ' 2 weeks deposit button');
  if (await menu.locator('button[data-pay="full"]').textContent() !== 'Pay in full now: $889') bad.push(label + ' 2 weeks full button');
  if (!/refunded after you leave if nothing is broken/.test(await menu.locator('.mc-small').textContent())) bad.push(label + ' 2 weeks deposit line');
  await page.locator('#price a[data-stay="1"]').click();
  await page.waitForTimeout(700);
  if (await menu.locator('.mc-pay button').textContent() !== 'Book my week: $555') bad.push(label + ' back to 1 week');
  await page.fill('#planName', 'Week Person'); await page.fill('#planEmail', 'week.person@gmail.com'); await page.fill('#planArrive', '2027-02-01'); await page.click('[data-bed="yes"]');
  await menu.locator('.mc-pay button').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Stay: 1 week, \$555\nPaying: in full, \$555/.test(posted.message)) bad.push(label + ' 1 week posted ' + JSON.stringify(posted));
  if (!checkout || !/src=ricktew-plan&weeks=1&p=2&cur=thb$/.test(checkout)) bad.push(label + ' 1 week checkout ' + checkout);
  // the Day card (Rick, 29 Oct 2026: Day $222, up to 4 days, paid in full): Ninja Week first, the days row, ?days=
  posted = null; checkout = null;
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('#price a[data-stay="d1"]').click();
  await page.waitForTimeout(700);
  await menu.locator('.qp', { hasText: 'PSC Self-Defense Program' }).click();
  if (await stayBtn('Days').getAttribute('aria-pressed') !== 'true') bad.push(label + ' Days not pressed');
  await menu.locator('.stays.days .stay-o', { hasText: '3' }).first().click();
  await button('Book my 3 days');
  if (!/Add a day for \$111/.test(await menu.locator('.upsell').textContent())) bad.push(label + ' upsell for days');
  if (await menu.locator('button[data-pay="full"]').count()) bad.push(label + ' a pay-in-full button on a day');
  if (await menu.locator('.mc-pay button').textContent() !== 'Book my 3 days: $333') bad.push(label + ' days button text');
  await page.fill('#planName', 'Day Person'); await page.fill('#planEmail', 'day.person@gmail.com'); await page.fill('#planArrive', '2027-02-01'); await page.click('[data-bed="yes"]');
  await menu.locator('.mc-pay button').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Stay: 3 days, \$333\nPaying: in full, \$333/.test(posted.message)) bad.push(label + ' days posted ' + JSON.stringify(posted));
  if (!checkout || !/src=ricktew-plan&days=3&p=2&cur=thb$/.test(checkout)) bad.push(label + ' days checkout ' + checkout);
  // a week plus days (Rick's click "A day added onto a week", 29 Oct 2026): the Add days row, paid in full, ?weeks=1&days=2
  posted = null; checkout = null;
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('#price a[data-stay="1"]').click();
  await page.waitForTimeout(700);
  await menu.locator('.qp', { hasText: 'Strikes and Kicks form' }).click();
  await menu.locator('.stays.days .stay-o', { hasText: '+2 days' }).click();
  if (await stayBtn('1 week').first().getAttribute('aria-pressed') !== 'true') bad.push(label + ' 1 week not pressed with days');
  await button('Book my stay');
  if (await menu.locator('.mc-pay button').textContent() !== 'Book my stay: $777') bad.push(label + ' week+days button text');
  await page.fill('#planName', 'Plus Days'); await page.fill('#planEmail', 'plus.days@gmail.com'); await page.fill('#planArrive', '2027-02-01'); await page.click('[data-bed="yes"]');
  await menu.locator('.mc-pay button').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Stay: 1 week and 2 days, \$777\nPaying: in full, \$777/.test(posted.message)) bad.push(label + ' week+days posted ' + JSON.stringify(posted));
  if (!checkout || !/src=ricktew-plan&weeks=1&days=2&p=2&cur=thb$/.test(checkout)) bad.push(label + ' week+days checkout ' + checkout);
  // the price cards (28 Oct 2026, the four of Rick's later click; smallest first since his click that night); Mastery and Instructor fill the ask box;
  // a stay other than the belt opens the menu with that stay, Ninja Week first
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  const amts = await page.locator('#price .stay-cards .amt').allTextContents();
  if (amts.join(' ') !== '$111 $555 $1,999 $6,666 $11,988') bad.push(label + ' price cards ' + amts.join(' '));
  if (await page.locator('a[data-stay="4"]').count()) bad.push(label + ' a month button is back');
  await page.locator('#price .stay-cards a[data-ask^="I want to reserve a Mastery"]').click();
  if (!/^I want to reserve a Mastery spot for 2027 with \$2,222 down/.test(await page.locator('#askMsg').inputValue())) bad.push(label + ' Mastery did not fill the ask box');
  await page.locator('#askMsg').fill('');
  await page.locator('#price .stay-cards a[data-ask^="I want to reserve an Instructor"]').click();
  if (!/^I want to reserve an Instructor spot: 1 year of training, and learning to teach \(\$6,666\)/.test(await page.locator('#askMsg').inputValue())) bad.push(label + ' Instructor did not fill the ask box');
  // the topic rides along (Rick, 28 Oct 2026: "selectors for what type of question"), and nothing asks anyone to write
  if (await page.locator('#askTopic').inputValue() !== 'mastery') bad.push(label + ' Instructor did not set the topic');
  if (/write to me|ask me anything|ask anything/i.test(await page.evaluate(() => document.body.innerText))) bad.push(label + ' a "write to me" line is back');
  await page.locator('#askMsg').fill('');
  await page.locator('#price a[data-stay="m1"]').click();
  await page.waitForTimeout(700);
  if (await menu.locator('.tile').count() !== 8) bad.push(label + ' month card did not open the menu');
  await noBook('after the month card');
  if (await page.evaluate(() => JSON.parse(localStorage.getItem('hininja-plan-v1')).stay) !== 'm1') bad.push(label + ' month card stay');
  await page.locator('#belts a[data-stay="m2"]').click();
  await page.waitForTimeout(700);
  if (!/2 months, the belt program, \$2,998/.test(await menu.locator('.stay-line').textContent())) bad.push(label + ' belt card stay');
  await page.locator('#price').scrollIntoViewIfNeeded();
  await page.screenshot({ path: OUT + label + '-7-price.png' });
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
  await stayBtn('1 month').click();
  await menu.locator('.qp', { hasText: 'Strikes and Kicks form' }).click();
  if (await stayBtn('2 weeks').isEnabled()) bad.push(label + ' 2 weeks enabled with 3 weeks used');
  await button('Book my month');
  await page.fill('#planName', 'Quick Person'); await page.fill('#planEmail', 'quick.person@gmail.com'); await page.fill('#planArrive', '2027-02-01'); await page.click('[data-bed="yes"]');
  await menu.locator('button[data-pay="deposit"]').click();
  await page.waitForTimeout(1500);
  if (!posted || !/Week 1: Quick pick: PSC Self-Defense Program\nWeek 2: Quick pick: Strikes and Kicks form\nWeek 3: Fist Strikes \(Strikes\), Elbow \(Strikes\), Ridge Hand \(Strikes\)/.test(posted.message)) bad.push(label + ' quick posted ' + JSON.stringify(posted && posted.message));
  if (!checkout || !/src=ricktew-plan&months=1&p=2&pay=deposit&cur=thb$/.test(checkout)) bad.push(label + ' quick checkout ' + checkout);
  if (label === 'desktop') console.log(posted && posted.message);
  // the November friend promo (27 Oct 2026): shown while it runs, gone by itself after 30 November 2026, Thailand time
  for (const [when, on] of [['2026-11-15T12:00:00+07:00', true], ['2026-12-01T00:00:01+07:00', false]]) {
    const pctx = await browser.newContext({ viewport: vp, serviceWorkers: 'block' });
    const pp = await pctx.newPage();
    await pp.clock.setFixedTime(new Date(when));
    let pposted = null;
    await pp.route('**/functions/v1/ricktew-contact', r => { pposted = JSON.parse(r.request().postData()); r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{"ok":true}' }); });
    await pp.route('**/functions/v1/ricktew-shop/**', r => r.fulfill({ status: 200, contentType: 'text/html', body: '<p>stub checkout</p>' }));
    await pp.goto(BASE + '/hininja/');
    await pp.evaluate(() => localStorage.clear());
    await pp.reload();
    const shown = await pp.locator('.promo').isVisible() && await pp.locator('.promo-box').isVisible();
    if (shown !== on) bad.push(label + ' promo shown=' + shown + ' at ' + when);
    await pp.locator('#belts a[data-stay="m2"]').click();
    await pp.waitForTimeout(700);
    if ((await pp.locator('#planFriend').count() === 1) !== on) bad.push(label + ' friend field at ' + when);
    if (on) {
      await pp.locator('.hero').screenshot({ path: OUT + label + '-8-promo-hero.png' });
      await pp.fill('#planName', 'Promo Person'); await pp.fill('#planEmail', 'promo.person@gmail.com'); await pp.fill('#planArrive', '2027-02-01'); await pp.click('[data-bed="yes"]'); await pp.fill('#planFriend', 'Pat Friend');
      await pp.locator('#menu').screenshot({ path: OUT + label + '-8-promo-form.png' });
      await pp.locator('#menu button[data-pay="deposit"]').click();
      await pp.waitForTimeout(1500);
      if (!pposted || !/Stay: 2 months, the belt program, \$2,998 \(yellow belt first\)\nPaying: \$555 deposit to hold the spot \(refunded after departure if nothing is broken\), the full \$[0-9,]+ 2 weeks before arrival\nFriend, FREE \(booked in November\): Pat Friend, same dates, same stay\n/.test(pposted.message)) bad.push(label + ' promo posted ' + JSON.stringify(pposted && pposted.message));
    }
    await pctx.close();
  }
  await page.goto(BASE + '/hininja/');
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (ov > 0) bad.push(label + ' overflow ' + ov);
  for (const id of ['belts', 'mastery', 'where', 'day', 'price', 'rick']) {
    await page.locator('#' + id).scrollIntoViewIfNeeded();
    await page.screenshot({ path: OUT + label + '-s-' + id + '.png' });
  }
  const txt = await page.locator('body').innerText();
  if (/Big C|\bmall\b|island is yours|add-on/i.test(txt)) bad.push(label + ' old words: ' + (txt.match(/Big C|\bmall\b|island is yours|add-on/i) || [])[0]);
  await ctx.close();
}
await browser.close();
console.log(bad.length ? 'FINDINGS:\n' + bad.join('\n') : 'CLEAN');
