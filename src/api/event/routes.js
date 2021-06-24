module.exports = (handler) => [
  {
    method: 'POST',
    path: '/events',
    handler: handler.postEvent,
    options: {
      auth: 'ormawaAuth',
    },
  },
  {
    method: 'GET',
    path: '/events',
    handler: handler.getAllEvent,
  },
  {
    method: 'GET',
    path: '/events/{id}',
    handler: handler.getEventById,
  },
  {
    method: 'PUT',
    path: '/events/{id}',
    handler: handler.putEventById,
    options: {
      auth: 'ormawaAuth',
    },
  },
  {
    method: 'DELETE',
    path: '/events/{id}',
    handler: handler.deleteEventById,
    options: {
      auth: 'ormawaAuth',
    },
  },
];
