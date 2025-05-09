const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set high resolution (1920x1080, retina quality)
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  for (let i = 1; i <= 15; i++) {
    const filePath = `file://${path.resolve(__dirname, `${i}.html`)}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: `slide-${i}.png`,
      fullPage: true,
      omitBackground: false
    });
    console.log(`Exported slide-${i}.png`);
  }

  await browser.close();
})();
