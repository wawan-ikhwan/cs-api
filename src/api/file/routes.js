module.exports = (handler) => [
  {
    method: 'POST',
    path: '/upload',
    handler: handler.postFile,
  },
  {
    method: 'GET',
    path: '/files',
    handler: handler.getPageIndex,
  },
  {
    method: 'GET',
    path: '/files/',
    handler: handler.getAllFiles,
  },
  {
    method: 'GET',
    path: '/files/{id}',
    handler: handler.getFileById,
  },
];
