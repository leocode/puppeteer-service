const htmlPdfRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['html'],
      properties: {
        html: { type: 'string' },
        viewport: {
          type: 'object',
          required: ['width', 'height'],
          properties: {
            width: { type: 'number' },
            height: { type: 'number' }
          }
        }
      }
    }
  }
}

const urlPngRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['url', 'viewport'],
      properties: {
        url: { type: 'string' },
        viewport: {
          type: 'object',
          required: ['width', 'height'],
          properties: {
            width: { type: 'number' },
            height: { type: 'number' }
          }
        }
      }
    }
  }
}

module.exports = {
  htmlPdfRequest,
  urlPngRequest
}