require('dotenv').config();

const { token } = require('@hapi/jwt');
const { nanoid } = require('nanoid');
const CacheService = require('../src/services/redis/CacheService');

module.exports = (async () => {
  const cacheService = new CacheService();

  const id = nanoid(16);
  const generated = token.generate({ id }, process.env.OWNER_TOKEN_KEY);
  await cacheService.set(id, '1', 60 * 10);

  console.log(generated);

  cacheService.client.quit();
  return generated;
})();
