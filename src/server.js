require('dotenv').config();

const hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const tokenManager = require('./tokenmanager');

// ormawa
const ormawaPlugin = require('./api/ormawa');
const OrmawaService = require('./services/postgres/OrmawaService');
const ormawaValidator = require('./validator/ormawa');

// event
const eventPlugin = require('./api/event');
const EventService = require('./services/postgres/EventService');
const eventValidator = require('./validator/event');

// auth
const authPlugin = require('./api/auth');
const authValidator = require('./validator/auth');
const AuthService = require('./services/postgres/AuthService');

// uploader
const uploaderPlugin = require('./api/uploader');
// const uploaderValidator = require('./validator/uploader');
// const UploaderService = require('./services/postgres/UploaderService');

module.exports = (async () => {
  const eventService = new EventService();
  const ormawaService = new OrmawaService();
  const authService = new AuthService();
  // const uploaderService = new UploaderService();

  const server = hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy('ormawaAuth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 60,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: { credentialId: artifacts.decoded.payload.ormawaId },
    }),
  });

  await server.register([
    {
      plugin: ormawaPlugin,
      options: {
        service: ormawaService,
        validator: ormawaValidator,
      },
    },
    {
      plugin: eventPlugin,
      options: {
        service: eventService,
        validator: eventValidator,
      },
    },
    {
      plugin: authPlugin,
      options: {
        authService,
        ormawaService,
        tokenManager,
        validator: authValidator,
      },
    },
    {
      plugin: uploaderPlugin,
      options: {
        service: null,
        validator: null,
      },
    },
  ]);

  await server.start();
  console.log(`Server sudah jalan ${server.info.uri}`);
  return server;
})();
