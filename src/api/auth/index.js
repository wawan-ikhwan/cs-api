const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  version: '1.0',
  register: async (server, { service }) => {
    const authHandler = new AuthHandler(service);
    await server.route(routes(authHandler));
  },
};
