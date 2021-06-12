/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('events', {
    id: { type: 'VARCHAR(16)' },
    name: { type: 'TEXT' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('events');
};
