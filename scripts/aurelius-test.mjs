import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const pageUrl = pathToFileURL(path.join(process.cwd(), 'Meet_Aurelius.html')).href;
const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.fetch = async () => new Response('', { status: 200 });
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'A new website' }).click();
  await page.getByRole('button', { name: 'More qualified leads' }).click();
  await page.getByRole('button', { name: 'This quarter' }).click();
  await page.getByRole('button', { name: '$40k–$100k' }).click();
  await page.getByLabel('Message Aurelius').fill('hello@anchor.test');
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.waitForTimeout(500);
  const result = await page.evaluate(() => ({
    messages: document.querySelectorAll('.aurelius-message').length,
    choices: [...document.querySelectorAll('.aurelius-choices button')].map((button) => button.textContent),
    status: document.querySelector('#aurelius-status')?.textContent,
    localLeadRecords: localStorage.getItem('anchor_leads'),
  }));
  if (result.messages < 10) failures.push('Aurelius conversation did not render each qualification step.');
  if (!result.choices.includes('Continue to private brief')) failures.push('Aurelius did not present a private-brief handoff after qualification.');
  if (!/submitted to Anchor/i.test(result.status || '')) failures.push('Aurelius did not confirm a successful server submission.');
  if (result.localLeadRecords) failures.push('Aurelius retained a submitted lead in browser storage.');
  if (errors.length) failures.push(...errors);
  await context.close();
} finally {
  await browser.close();
}

console.log(JSON.stringify({ test: 'Aurelius qualification flow', failures }, null, 2));
if (failures.length) process.exitCode = 1;
