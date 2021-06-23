const OrmawaHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'ormawa',
  version: '1.0',
  register: (server, { service, validator }) => {
    const ormawaHandler = new OrmawaHandler(service, validator);
    server.route(routes(ormawaHandler));
  },
};
