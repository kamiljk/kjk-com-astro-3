export const collections = {
  docs: {
    schema: {
      created: {
        type: 'string',
        required: true,
      },
      epistemic_status: {
        type: 'string',
        required: true,
      },
      fmContentType: {
        type: 'string',
        required: true,
      },
      last_tended: {
        type: 'string',
        required: true,
      },
      maturity: {
        type: 'string',
        required: true,
      },
      pubDate: {
        type: 'string',
        required: true,
      },
      scale: {
        type: 'string',
        required: true,
      },
      source: {
        type: 'string',
        required: true,
      },
      title: {
        type: 'string',
        required: true,
      },
      definition: {
        type: 'string',
        required: false, // Change this to make the field optional
      },
    },
  },
};