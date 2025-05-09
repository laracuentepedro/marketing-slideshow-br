const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set a large enough viewport to ensure the slide fits
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

  for (let i = 1; i <= 15; i++) {
    const filePath = `file://${path.resolve(__dirname, `${i}.html`)}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    // Wait for the .slide element to be present
    await page.waitForSelector('.slide');
    const slide = await page.$('.slide');
    if (!slide) {
      console.error(`.slide element not found in ${i}.html`);
      continue;
    }
    const boundingBox = await slide.boundingBox();
    if (!boundingBox) {
      console.error(`Could not get bounding box for slide ${i}`);
      continue;
    }
    // Pad slide number to 2 digits
    const slideNum = String(i).padStart(2, '0');
    await page.screenshot({
      path: `slide-${slideNum}.png`,
      clip: boundingBox,
      omitBackground: false
    });
    console.log(`Exported slide-${slideNum}.png (cropped to .slide)`);
  }

  await browser.close();
})();
