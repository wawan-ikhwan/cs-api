const redis = require('redis');

class CacheService {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_TLS_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.client.on('error', (error) => {
      console.log(error);
    });
  }

  quit() {
    return this.client.quit((err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  set(key, value, expiration = 3600) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', expiration, (err, ok) => {
        if (err) {
          return reject(err);
        }
        return resolve(ok);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          return reject(err);
        }
        if (reply == null) {
          return reject(new Error('Cache tidak ditemukan'));
        }
        return resolve(reply.toString());
      });
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, count) => {
        if (err) {
          return reject(err);
        }
        return resolve(count);
      });
    });
  }

  getOneTime(key) {
    return new Promise((resolve, reject) => {
      this.client.getset(key, '0', (err, reply) => {
        if (err) {
          return reject(err);
        }
        if (reply == null) {
          return reject(new Error('Cache tidak ditemukan'));
        }
        return resolve(Number(reply.toString()));
      });
    });
  }
}

module.exports = CacheService;
