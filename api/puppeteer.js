const puppeteer = require('puppeteer');

const inBrowser = async (cb) => {
  const browser = await puppeteer.launch({
    // https://github.com/buildkite/docker-puppeteer/blob/master/example/integration-tests/index.test.js
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  const result = await cb(browser);

  await browser.close();

  return result;
}

const htmlToPdf = async (html) => {
  return await inBrowser(async browser => {
    const page = await browser.newPage();
    await page.setContent(html);

    return await page.pdf({ format: 'A4' });
  })
}

module.exports = {
  htmlToPdf,
}