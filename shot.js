/* eslint-disable */
const puppeteer = require('/Users/filipe.ferreira/code/github/fbritoferreira/fullstack_developer_capstone/screenshots-tooling/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1366, height: 768 },
  });

  async function shot(name, fn) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    try {
      await fn(page);
      const file = path.join(OUT, `${name}.png`);
      await page.screenshot({ path: file });
      console.log('Saved', name);
    } catch (e) {
      console.error(`Failed ${name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  const BASE = 'http://localhost:3001';

  // T1 navbar_design — landing page showing navbar
  await shot('navbar_design', async (p) => {
    await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
  });

  // T2 signup_form_design — /SignUp page rendered
  await shot('signup_form_design', async (p) => {
    await p.goto(BASE + '/SignUp', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
  });

  // T3 login_form_design — /Login page rendered
  await shot('login_form_design', async (p) => {
    await p.goto(BASE + '/Login', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
  });

  // T4 readme.md_file — GitHub README rendered page
  await shot('readme.md_file', async (p) => {
    await p.goto('https://github.com/fbritoferreira/StayHealthy', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2500));
  });

  // T5 signup_validation — submit empty form to trigger validation
  await shot('signup_validation', async (p) => {
    await p.goto(BASE + '/SignUp', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    // try to submit empty
    const btn = await p.$('button[type="submit"], input[type="submit"], form button');
    if (btn) await btn.click();
    await new Promise(r => setTimeout(r, 1000));
  });

  // T6 login_validation
  await shot('login_validation', async (p) => {
    await p.goto(BASE + '/Login', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    const btn = await p.$('button[type="submit"], input[type="submit"], form button');
    if (btn) await btn.click();
    await new Promise(r => setTimeout(r, 1000));
  });

  // T7 logout_button — after fake login (set localStorage), navbar should show Logout
  await shot('logout_button', async (p) => {
    await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await p.evaluate(() => {
      sessionStorage.setItem('auth-token', 'fake-token');
      sessionStorage.setItem('name', 'Filipe Ferreira');
      sessionStorage.setItem('email', 'filipe@example.com');
      sessionStorage.setItem('phone', '555-1234');
    });
    await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
  });

  // T8 docsearch_output — InstantConsultation with search input visible
  await shot('docsearch_output', async (p) => {
    await p.goto(BASE + '/InstantConsultation', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    // try typing in search input
    const inp = await p.$('input[type="text"]');
    if (inp) {
      await inp.type('General Physician');
      await new Promise(r => setTimeout(r, 1500));
    }
  });

  // T9 notification_integration — login as user, navbar shows Welcome / Notification
  await shot('notification_integration', async (p) => {
    await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await p.evaluate(() => {
      sessionStorage.setItem('auth-token', 'fake-token');
      sessionStorage.setItem('name', 'Filipe Ferreira');
      sessionStorage.setItem('email', 'filipe@example.com');
      sessionStorage.setItem('phone', '555-1234');
      sessionStorage.setItem('doctorData', JSON.stringify({ name: 'Dr. Smith', speciality: 'Cardiologist' }));
      sessionStorage.setItem('appointmentData', JSON.stringify([{
        name: 'Dr. Smith',
        speciality: 'Cardiologist',
        appointmentDate: '2026-06-01',
        appointmentTime: '10:00',
      }]));
    });
    await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
  });

  // T10 instant_consultation
  await shot('instant_consultation', async (p) => {
    await p.evaluate(() => {
      sessionStorage.setItem('auth-token', 'fake-token');
      sessionStorage.setItem('name', 'Filipe Ferreira');
    });
    await p.goto(BASE + '/InstantConsultation', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
  });

  // T11 disable_review-button — ReviewForm page with disabled review button
  await shot('disable_review-button', async (p) => {
    await p.goto(BASE + '/ReviewForm', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
  });

  // T12 review_form — same with form open
  await shot('review_form', async (p) => {
    await p.goto(BASE + '/ReviewForm', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    const giveReviewBtn = await p.$('button');
    if (giveReviewBtn) {
      try { await giveReviewBtn.click(); } catch (e) {}
    }
    await new Promise(r => setTimeout(r, 1500));
  });

  // T13 profilename_change
  await shot('profilename_change', async (p) => {
    await p.evaluate(() => {
      sessionStorage.setItem('auth-token', 'fake-token');
      sessionStorage.setItem('name', 'Filipe Ferreira');
      sessionStorage.setItem('email', 'filipe@example.com');
      sessionStorage.setItem('phone', '555-1234');
    });
    await p.goto(BASE + '/ProfileCard', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
  });

  // T15 seo — GitHub commits page (version control)
  await shot('seo', async (p) => {
    await p.goto('https://github.com/fbritoferreira/StayHealthy/commits/main', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2500));
  });

  await browser.close();
  console.log('all done');
})().catch(e => { console.error(e); process.exit(1); });
