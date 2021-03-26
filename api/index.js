const { config } = require('./config');
const { htmlToPdf } = require('./puppeteer');

const fastify = require('fastify')({
  logger: true,
});

const htmlPdfRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['html'],
      properties: {
        html: { type: 'string' },
      }
    }
  }
}

fastify.post('/html/pdf', htmlPdfRequest, async (request) => {
  const html = request.body.html;

  return htmlToPdf(html);
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
