export const viewport = {
  type: 'object',
  required: ['width', 'height'],
  properties: {
    width: { type: 'number' },
    height: { type: 'number' },
  },
};

export const htmlPdfRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['html'],
      properties: {
        html: { type: 'string' },
      },
    },
  },
};

export const htmlPngRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['html', 'viewport'],
      properties: {
        html: { type: 'string' },
        viewport,
      },
    },
  },
};

export const urlPngRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['url', 'viewport'],
      properties: {
        url: { type: 'string' },
        viewport,
      },
    },
  },
};

export const urlPdfRequest = {
  schema: {
    body: {
      type: 'object',
      required: ['url'],
      properties: {
        url: { type: 'string' },
      },
    },
  },
};
