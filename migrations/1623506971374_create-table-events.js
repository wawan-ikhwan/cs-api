/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */

exports.up = (pgm) => {
  pgm.createTable('events', {
    id: { type: 'VARCHAR(50)', notNull: true, primaryKey: true },
    id_ormawa: { type: 'VARCHAR(50)', notNull: true },
    judul: { type: 'TEXT', notNull: true },
    deskripsi: { type: 'TEXT', notNull: true },
    url_foto_pamflet: { type: 'TEXT', notNull: true },
    url_pendaftaran: { type: 'TEXT', notNull: true },
    waktu_acara: { type: 'TIMESTAMP', notNull: true },
    waktu_ditambah: { type: 'TIMESTAMP', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('events');
};
