const { config } = require('./config');
const { htmlToPdf, urlToPng } = require('./puppeteer');
const { htmlPdfRequest, urlPngRequest } = require('./schemas');

const fastify = require('fastify')({
  logger: true,
});

fastify.post('/html/pdf', htmlPdfRequest, async (request) => {
  const html = request.body.html;

  return htmlToPdf(html);
});

fastify.post('/url/png', urlPngRequest, async (request) => {
  const url = request.body.url;
  const viewport = request.body.viewport;

  return urlToPng(url, viewport);
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
