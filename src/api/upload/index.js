const UploadHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'upload',
  version: '1.0',
  register: (server, { service, validator }) => {
    const uploadHandler = new UploadHandler(service, validator);
    server.route(routes(uploadHandler));
  },
};
