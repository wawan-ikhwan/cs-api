const { Pool } = require('pg');
const { InternalServerErrorException } = require('../../exceptions/ServerError');
const { BadRequestException } = require('../../exceptions/ClientError');

class AuthService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async insertAuth(token) {
    const result = await this.pool.query({
      text: 'INSERT INTO authentication VALUES($1) RETURNING token',
      values: [token],
    });

    if (!result.rowCount) {
      throw new InternalServerErrorException();
    }
  }

  async updateAuth(oldToken, newToken) {
    const result = await this.pool.query({
      text: 'UPDATE authentication SET token = $1 WHERE token = $2 RETURNING token',
      values: [newToken, oldToken],
    });

    if (!result.rowCount) {
      throw new InternalServerErrorException();
    }
  }

  async verifyRefreshToken(token) {
    const result = await this.pool.query({
      text: 'SELECT token FROM authentication WHERE token = $1',
      values: [token],
    });

    if (!result.rowCount) {
      throw new BadRequestException();
    }
  }

  async deleteAuth(token) {
    const result = await this.pool.query({
      text: 'DELETE FROM authentication WHERE token = $1 RETURNING token',
      values: [token],
    });

    if (!result.rowCount) {
      throw new BadRequestException();
    }
  }
}

module.exports = AuthService;
