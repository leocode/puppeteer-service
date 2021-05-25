const { config } = require('./config');
const { htmlToPdf, urlToPng, urlToPdf, htmlToPng } = require('./puppeteer');
const { htmlPdfRequest, urlPngRequest, urlPdfRequest, htmlPngRequest } = require('./schemas');

const fastify = require('fastify')({
  logger: true,
});

fastify.post('/html/pdf', htmlPdfRequest, async (request) => {
  const html = request.body.html;

  return htmlToPdf(html);
});

fastify.post('/html/png', htmlPngRequest, async (request) => {
  const html = request.body.html;
  const viewport = request.body.viewport;

  return htmlToPng(html, viewport);
});

fastify.post('/url/png', urlPngRequest, async (request) => {
  const url = request.body.url;
  const viewport = request.body.viewport;

  return urlToPng(url, viewport);
});

fastify.post('/url/pdf', urlPdfRequest, async (request) => {
  const url = request.body.url;

  return urlToPdf(url);
});

(async () => {
  try {
    await fastify.listen(config.port, '0.0.0.0');

    fastify.log.info(`Puppeteer service API listening on ${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
