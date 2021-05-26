const puppeteer = require('puppeteer-core');

const inBrowser = async (cb) => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
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

    return await page.pdf({ format: 'A4', printBackground: true });
  })
}

const htmlToPng = async (html, viewport) => {
  return await inBrowser(async browser => {
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport(viewport);

    return await page.screenshot({ type: 'png' });
  })
}

const urlToPng = async (url, viewport) => {
  return await inBrowser(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport(viewport);

    return await page.screenshot({ type: 'png' });
  })
}

const urlToPdf = async (url) => {
  return await inBrowser(async browser => {
    const page = await browser.newPage();
    await page.goto(url);

    return await page.pdf({ format: 'A4', printBackground: true });
  })
}

module.exports = {
  htmlToPdf,
  htmlToPng,
  urlToPng,
  urlToPdf,
}