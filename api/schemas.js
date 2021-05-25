const viewport = {
  type: 'object',
  required: ['width', 'height'],
  properties: {
    width: { type: 'number' },
    height: { type: 'number' }
  }
};

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

const htmlPngRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['html', 'viewport'],
      properties: {
        html: { type: 'string' },
        viewport,
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
        viewport,
      }
    }
  }
}

const urlPdfRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['url'],
      properties: {
        url: { type: 'string' },
      }
    }
  }
}

module.exports = {
  htmlPdfRequest,
  htmlPngRequest,
  urlPngRequest,
  urlPdfRequest,
}