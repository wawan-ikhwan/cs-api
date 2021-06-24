module.exports = (handler) => [
  {
    method: 'POST',
    path: '/ormawa',
    handler: handler.postOrmawa, // daftar ormawa
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
