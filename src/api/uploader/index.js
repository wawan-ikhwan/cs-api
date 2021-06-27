const UploaderHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'uploader',
  version: '1.0',
  register: (server, { service, validator }) => {
    const uploaderHandler = new UploaderHandler(service, validator);
    server.route(routes(uploaderHandler));
  },
};
