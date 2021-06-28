module.exports = (handler) => [
  {
    method: 'POST',
    path: '/ormawa',
    handler: handler.postOrmawa, // daftar ormawa
    options: {
      auth: 'ownerAuth',
    },
  },
  {
    method: 'GET',
    path: '/ormawa',
    handler: handler.getAllOrmawa,
  },
  {
    method: 'GET',
    path: '/ormawa/{id}',
    handler: handler.getOrmawaById,
  },
];
