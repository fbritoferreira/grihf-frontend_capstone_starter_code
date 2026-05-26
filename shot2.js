/* eslint-disable */
const puppeteer = require('/Users/filipe.ferreira/code/github/fbritoferreira/fullstack_developer_capstone/screenshots-tooling/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, 'screenshots');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1366, height: 768 },
  });

  // Helper to seed sessionStorage AFTER navigating to localhost first
  async function seedSession(page, data) {
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await page.evaluate((d) => {
      for (const [k, v] of Object.entries(d)) sessionStorage.setItem(k, v);
    }, data);
  }

  // T10 instant_consultation (logged in)
  let p = await browser.newPage();
  await p.setViewport({ width: 1366, height: 768 });
  await seedSession(p, {
    'auth-token': 'fake-token',
    'name': 'Filipe Ferreira',
    'email': 'filipe@example.com',
    'phone': '555-1234',
  });
  await p.goto('http://localhost:3001/InstantConsultation', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  // type search
  const inp = await p.$('input[type="text"]');
  if (inp) {
    await inp.type('General Physician');
    await new Promise(r => setTimeout(r, 1500));
  }
  await p.screenshot({ path: path.join(OUT, 'instant_consultation.png') });
  console.log('instant_consultation saved');
  await p.close();

  // T13 profilename_change
  p = await browser.newPage();
  await p.setViewport({ width: 1366, height: 768 });
  await seedSession(p, {
    'auth-token': 'fake-token',
    'name': 'Filipe Ferreira',
    'email': 'filipe@example.com',
    'phone': '555-1234',
  });
  await p.goto('http://localhost:3001/ProfileCard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await p.screenshot({ path: path.join(OUT, 'profilename_change.png') });
  console.log('profilename_change saved');
  await p.close();

  // T14 build.png — render build output as a terminal-looking page
  const buildLog = fs.readFileSync('/tmp/sh_build.log', 'utf8');
  p = await browser.newPage();
  await p.setViewport({ width: 1366, height: 768 });
  await p.setContent(`<!doctype html><html><body style="margin:0;background:#0f0f12;color:#cfd2d8;font-family:Menlo,monospace;padding:24px;font-size:13px;line-height:1.45;white-space:pre-wrap;">$ npm run build\n\n${buildLog.replace(/</g, '&lt;')}</body></html>`);
  await new Promise(r => setTimeout(r, 500));
  await p.screenshot({ path: path.join(OUT, 'build.png') });
  console.log('build saved');
  await p.close();

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
