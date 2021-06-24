const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  version: '2.0',
  register: (server, {
    authService, ormawaService, tokenManager, validator,
  }) => {
    const authHandler = new AuthHandler(authService, ormawaService, tokenManager, validator);
    server.route(routes(authHandler));
  },
};
