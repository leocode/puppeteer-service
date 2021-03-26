const puppeteer = require('puppeteer');
const { config } = require('./config');

const fastify = require('fastify')({
  logger: true,
});

const pdfRequest = {
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


fastify.post('/pdf', pdfRequest, async (request, reply) => {
  return { hello: request.body.html };
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
