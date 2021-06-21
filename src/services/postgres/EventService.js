const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { InternalServerErrorException } = require('../../exceptions/ServerError');
const { NotFoundException } = require('../../exceptions/ClientError');

class EventService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async insertEvent({
    judul, deskripsi, urlFotoPamflet, urlPendaftaran, waktuAcara,
  }) {
    const id = `event-${nanoid(16)}`;

    const waktuDibuat = new Date();

    const result = await this.pool.query({
      text: 'INSERT INTO events VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, 'TEST-ORMAWA-ID', judul, deskripsi, urlFotoPamflet, urlPendaftaran, waktuAcara, waktuDibuat],
    });

    if (!result.rows[0].id) {
      throw new InternalServerErrorException();
    }

    return result.rows[0].id;
  }

  async getEvents(items, page) {
    const result = await this.pool.query({
      text: 'SELECT * FROM events LIMIT $1 OFFSET ($2 - 1) * $1',
      values: [items, page],
    });

    return result.rows;
  }

  async getEventById(id) {
    const result = await this.pool.query({
      text: 'SELECT * FROM events WHERE id = $1',
      values: [id],
    });

    if (!result.rowCount) {
      throw new NotFoundException();
    }

    return result.rows[0];
  }

  async updateEventById(id, {
    judul, deskripsi, urlFotoPamflet, urlPendaftaran, waktuAcara,
  }) {
    const result = await this.pool.query({
      text: `UPDATE events 
      SET judul = $1, 
      deskripsi = $2, 
      url_foto_pamflet = $3, 
      url_pendaftaran = $4, 
      waktu_acara = $5 
      WHERE id = $6 RETURNING id`,
      values: [judul, deskripsi, urlFotoPamflet, urlPendaftaran, waktuAcara, id],
    });

    if (!result.rowCount) {
      throw new NotFoundException();
    }
  }

  async deleteEventById(id) {
    const result = await this.pool.query({
      text: 'DELETE FROM events WHERE id = $1 RETURNING id',
      values: [id],
    });

    if (!result.rowCount) {
      throw new NotFoundException();
    }
  }
}

module.exports = EventService;
