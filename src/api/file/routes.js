module.exports = (handler) => [
  {
    method: 'POST',
    path: '/files',
    handler: handler.postFile,
  },
  {
    method: 'GET',
    path: '/files',
    handler: handler.getAllFiles,
  },
  {
    method: 'GET',
    path: '/files/{id}',
    handler: handler.getFileById,
  },
];
