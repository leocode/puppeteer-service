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

module.exports = {
  htmlPdfRequest
}