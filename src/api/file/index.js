const FileHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'file',
  version: '1.0',
  register: (server, { service, validator }) => {
    const fileHandler = new FileHandler(service, validator);
    server.route(routes(fileHandler));
  },
};
