const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  version: '2.0',
  register: (server, { service, validator }) => {
    const authHandler = new AuthHandler(service, validator);
    server.route(routes(authHandler));
  },
};
