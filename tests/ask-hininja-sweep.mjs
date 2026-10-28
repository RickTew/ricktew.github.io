/* Ask the Ninja on /hininja/ (28 Oct 2026), desktop and phone: the pill, three real questions,
   one miss, the Ask Kuno form against a STUBBED mailbox (nothing is sent), Escape and focus, no
   sideways scroll, and the pill never sitting on the Ninja Menu's own buttons at any scroll.
   Serve the repo first, then: BASE=http://localhost:8765 node tests/ask-hininja-sweep.mjs
   (OUT=<folder> keeps the screenshots). Exit 1 on any finding. */
import { createRequire } from 'module';
import os from 'os';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || '/Users/ricktew/Dev/NinjaVillage/node_modules/playwright');
const OUT = (process.env.OUT || os.tmpdir()) + '/';
const BASE = process.env.BASE || 'http://localhost:8765';
fs.mkdirSync(OUT, { recursive: true });
const bad = [];
const browser = await chromium.launch();
for (const [label, vp] of [['desktop', { width: 1280, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') bad.push(label + ' console: ' + m.text()); });
  page.on('pageerror', e => bad.push(label + ' pageerror: ' + e.message));
  let posted = null;
  await page.route('**/functions/v1/ricktew-contact', r => { posted = JSON.parse(r.request().postData()); r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{"ok":true}' }); });
  await page.goto(BASE + '/hininja/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(600);
  const pill = page.locator('#kunoLaunch'), panel = page.locator('#kunoPanel');
  if (!(await pill.isVisible())) bad.push(label + ' pill not visible on arrival');
  await page.screenshot({ path: OUT + label + '-0-pill.png' });

  // the pill never sits on the menu's own buttons, at any scroll
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 250) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
    const hit = await page.evaluate(() => {
      const l = document.getElementById('kunoLaunch');
      if (l.hidden || l.classList.contains('kuno-away')) return '';
      const r = l.getBoundingClientRect();
      for (const n of document.querySelectorAll('#menu .mc-bar, #menu button, #menu a, #menu input')) {
        const b = n.getBoundingClientRect();
        if (b.width && b.height && b.right > r.left && b.left < r.right && b.bottom > r.top && b.top < r.bottom) return n.textContent.trim().slice(0, 40);
      }
      return '';
    });
    if (hit) { bad.push(label + ' pill covers the menu button "' + hit + '" at scroll ' + y); break; }
  }
  // the same with the menu's ready bar showing: five picks, then walk the menu again
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('#menu .tile', { hasText: 'Stances' }).click();
  for (let i = 0; i < 5; i++) await page.locator('#menu .pick[aria-pressed="false"]').first().click();
  for (let y = 0; y < 2400; y += 150) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
    const hit = await page.evaluate(() => {
      const l = document.getElementById('kunoLaunch');
      if (l.hidden || l.classList.contains('kuno-away')) return '';
      const r = l.getBoundingClientRect();
      for (const n of document.querySelectorAll('#menu .mc-bar, #menu button, #menu a, #menu input')) {
        const b = n.getBoundingClientRect();
        if (b.width && b.height && b.right > r.left && b.left < r.right && b.bottom > r.top && b.top < r.bottom) return n.textContent.trim().slice(0, 40);
      }
      return '';
    });
    if (hit) { bad.push(label + ' pill covers the menu button "' + hit + '" at scroll ' + y + ' (ready)'); break; }
  }
  await page.evaluate(() => { localStorage.clear(); window.scrollTo(0, 0); });
  await page.reload();
  await page.waitForTimeout(500);
  // the pill steps aside over the menu, so open it from the FAQ, below the menu
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  if (await pill.evaluate(n => n.classList.contains('kuno-away'))) bad.push(label + ' pill away at the FAQ');

  // open, three real questions
  await pill.click();
  if (!(await panel.isVisible())) bad.push(label + ' panel did not open');
  if (await page.evaluate(() => document.activeElement && document.activeElement.id) !== 'kunoIn') bad.push(label + ' focus not in the question box');
  if (await page.locator('#kunoLog .kuno-chip').count() < 4) bad.push(label + ' welcome chips');
  const want = [['how much does it cost?', 'How much does it cost?'], ['where do I sleep', 'Where do I sleep?'], ['can I bring my kids', 'Can I bring my family or kids?']];
  for (const [q, title] of want) {
    await page.fill('#kunoIn', q); await page.press('#kunoIn', 'Enter');
    const got = await page.locator('#kunoLog .kuno-q').last().textContent();
    if (got !== title) bad.push(label + ` "${q}" answered "${got}"`);
  }
  const lastNext = await page.locator('#kunoLog .kuno-act .kuno-go').last().textContent();
  if (lastNext !== 'Ask Kuno about it') bad.push(label + ' kids next step: ' + lastNext);
  if (/\$2,222/.test(await page.locator('#kunoLog .kuno-n').nth(1).textContent()) === false) bad.push(label + ' price answer lacks $2,222');
  await page.screenshot({ path: OUT + label + '-1-answers.png' });

  // a miss, then Ask Kuno against the stubbed mailbox
  await page.fill('#kunoIn', 'do you have a sauna'); await page.press('#kunoIn', 'Enter');
  const missText = await page.locator('#kunoLog .kuno-n').last().textContent();
  if (!/I do not have that one written down/.test(missText)) bad.push(label + ' miss text: ' + missText.slice(0, 80));
  if (!(await page.evaluate(() => window.rtHiAskMisses && window.rtHiAskMisses.includes('do you have a sauna')))) bad.push(label + ' miss not logged');
  await page.locator('#kunoLog .kuno-go', { hasText: /^Ask Kuno$/ }).last().click();
  const mail = page.locator('#kunoLog .kuno-mail').last();
  if (await mail.locator('textarea').inputValue() !== 'do you have a sauna') bad.push(label + ' question not prefilled');
  await mail.locator('button[type=submit]').click();
  if (!/Name, an address to reply to/.test(await mail.locator('.kuno-err').textContent())) bad.push(label + ' empty form not refused');
  if (posted) bad.push(label + ' posted an empty form');
  await mail.locator('input[name=name]').fill('Test Person');
  await mail.locator('input[name=email]').fill('test.person@gmail.com');
  await page.screenshot({ path: OUT + label + '-2-askkuno.png' });
  await page.waitForTimeout(3000); // a person's pace: the mailbox drops anything sent under 3 s after the page loads
  await mail.locator('button[type=submit]').click();
  await page.waitForTimeout(800);
  if (!posted) bad.push(label + ' nothing posted');
  else {
    if (posted.subject !== 'hininja') bad.push(label + ' subject ' + posted.subject);
    if (!posted.message.startsWith('From the Ask the Ninja box on /hininja/:\n\ndo you have a sauna')) bad.push(label + ' message ' + JSON.stringify(posted.message.slice(0, 120)));
    if (!/Also asked in the box:\n- how much does it cost\?\n- where do I sleep\n- can I bring my kids/.test(posted.message)) bad.push(label + ' earlier questions missing: ' + JSON.stringify(posted.message));
    if (posted.website !== '' || typeof posted.elapsedMs !== 'number' || posted.elapsedMs < 3000) bad.push(label + ' walls ' + JSON.stringify({ website: posted.website, elapsedMs: posted.elapsedMs }));
    if (posted.source !== 'direct' || posted.name !== 'Test Person' || posted.email !== 'test.person@gmail.com') bad.push(label + ' fields ' + JSON.stringify(posted));
  }
  if (!/Sent\. Check your inbox for Kuno's reply\./.test(await mail.textContent())) bad.push(label + ' no confirmation');
  await page.screenshot({ path: OUT + label + '-3-sent.png' });

  // a next step to the page closes the box
  await page.fill('#kunoIn', 'when can I start'); await page.press('#kunoIn', 'Enter');
  // Escape closes and gives focus back to the pill
  await page.keyboard.press('Escape');
  if (await panel.isVisible()) bad.push(label + ' Escape did not close');
  if (!(await pill.isVisible())) bad.push(label + ' pill not back after close');
  if (await page.evaluate(() => document.activeElement && document.activeElement.id) !== 'kunoLaunch') bad.push(label + ' focus not back on the pill');
  await pill.click();
  await page.locator('#kunoLog a.kuno-go', { hasText: 'Build your Ninja Week' }).last().click();
  await page.waitForTimeout(400);
  if (await panel.isVisible()) bad.push(label + ' next-step link left the box open');
  // keyboard: Tab reaches the pill
  const ow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (ow > 0) bad.push(label + ' sideways scroll ' + ow + 'px');
  await ctx.close();
}
await browser.close();
if (bad.length) { console.log(bad.join('\n')); process.exit(1); }
console.log('CLEAN');
