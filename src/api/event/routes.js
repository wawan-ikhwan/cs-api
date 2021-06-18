module.exports = (handler) => [
  {
    method: 'POST',
    path: '/events',
    handler: handler.postEvent,
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
  },
  {
    method: 'DELETE',
    path: '/events/{id}',
    handler: handler.deleteEventById,
  },
];
