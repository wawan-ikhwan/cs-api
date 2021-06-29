module.exports = (handler) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: handler.postUploadImage,
    options: {
      auth: 'ormawaAuth',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
];
