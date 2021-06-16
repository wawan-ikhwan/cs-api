require('dotenv').config();

const hapi = require('@hapi/hapi');

(async () => {
  const server = hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register();

  await server.start();
  console.log(`Server sudah jalan ${server.info.uri}`);
})();
