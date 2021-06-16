const EventHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'event',
  version: '1.0',
  register: async (server, { service, validator }) => {
    const eventHandler = new EventHandler(service, validator);
    await server.route(routes(eventHandler));
  },
};
