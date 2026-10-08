// Builds assets/cv/Flemming_van_der_Sande_CV.pdf from _cv/cv.html.
// Needs Playwright (npm install playwright). Run from the repo root: node _cv/build.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('file://' + path.resolve(__dirname, 'cv.html'), { waitUntil: 'load' });
    await page.pdf({
        path: path.resolve(__dirname, '../assets/cv/Flemming_van_der_Sande_CV.pdf'),
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
    });
    await browser.close();
})();
