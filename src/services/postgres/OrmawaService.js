const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { InternalServerErrorException } = require('../../exceptions/ServerError');
const { NotFoundException, BadRequestException, UnauthorizedException } = require('../../exceptions/ClientError');

class OrmawaService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async insertOrmawa({
    email, password, nama, urlFotoOrmawa,
  }) {
    await this.verifyEmail(email);

    const id = nanoid(8);
    const hashedpassword = await bcrypt.hash(password, 10);

    const result = await this.pool.query({
      text: 'INSERT INTO ormawa VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, email, hashedpassword, nama, urlFotoOrmawa],
    });

    if (!result.rows[0].id) {
      throw new InternalServerErrorException();
    }

    return result.rows[0].id;
  }

  async verifyOrmawa(email, password) {
    const result = await this.pool.query({
      text: 'SELECT id, password FROM ormawa WHERE email = $1',
      values: [email],
    });

    if (!result.rowCount) {
      throw new UnauthorizedException('Kredensial Salah!');
    }

    const { id, password: hashedpassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedpassword);

    if (!match) {
      throw new UnauthorizedException('Kredensial Salah!');
    }

    return id;
  }

  async verifyEmail(email) {
    const result = await this.pool.query({
      text: 'SELECT email FROM ormawa WHERE email = $1',
      values: [email],
    });

    if (result.rowCount) {
      throw new BadRequestException('email sudah dipakai!');
    }
  }

  async getOrmawa() {
    const result = await this.pool.query('SELECT id, email, nama, url_foto_user AS foto FROM ormawa');

    return result.rows.map(({
      id, email, nama, foto,
    }) => ({
      id, email, nama, urlFotoOrmawa: foto,
    }));
  }

  async getOrmawaById(idOrmawa) {
    const result = await this.pool.query({
      text: 'SELECT id, email, nama, url_foto_user AS foto FROM ormawa WHERE id = $1',
      values: [idOrmawa],
    });

    if (!result.rowCount) {
      throw new NotFoundException();
    }

    return result.rows.map(({
      id, email, nama, foto,
    }) => ({
      id, email, nama, urlFotoOrmawa: foto,
    }))[0];
  }
}

module.exports = OrmawaService;
