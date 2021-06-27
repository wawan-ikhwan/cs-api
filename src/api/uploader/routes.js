module.exports = (handler) => [
  {
    method: 'POST',
    path: '/files',
    handler: handler.postFile, // upload file
  },
  {
    method: 'GET',
    path: '/files',
    handler: handler.getFile,
  },
];
