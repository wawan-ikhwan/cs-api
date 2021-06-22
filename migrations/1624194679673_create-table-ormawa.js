/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */

exports.up = (pgm) => {
  pgm.createTable('ormawa', {
    id: { type: 'VARCHAR(50)', notNull: true, primaryKey: true },
    email: { type: 'VARCHAR(50)', notNull: true, unique: true },
    password: { type: 'TEXT', notNull: true },
    nama: { type: 'TEXT', notNull: true },
    url_foto_user: { type: 'TEXT', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('ormawa');
};
