const EventHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'event',
  version: '1.0',
  register: (server, { service, validator }) => {
    const eventHandler = new EventHandler(service, validator);
    server.route(routes(eventHandler));
  },
};
