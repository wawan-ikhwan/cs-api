module.exports = (handler) => [
  {
    method: 'POST',
    path: '/auth',
    handler: handler.postAuth,
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: handler.putAuth,
  },
  {
    method: 'DELETE',
    path: '/auth',
    handler: handler.deleteAuth,
  },
];
