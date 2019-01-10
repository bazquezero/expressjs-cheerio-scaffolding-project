const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const scrapLoginPage = () => new Promise(async (resolve, reject) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com');
    await page.screenshot({ path: 'screenshots/screen01.png' });
    await page.type('input#email', 'mail@example.com');
    await page.type('input#pass', 'password');
    await page.screenshot({ path: 'screenshots/screen02.png' });
    // await page.click('#login_form label.uiButton input[type="submit"]')
    const pageContent = await page.content();
    const $ = cheerio.load(pageContent);
    resolve($.html());
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    reject(e);
  }
});

module.exports = Object.assign({}, {
  scrapLoginPage,
});
