/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint('events', 'unique_event', {
    unique: [
      'judul',
      'deskripsi',
      'url_foto_pamflet',
      'url_pendaftaran',
      'waktu_acara',
    ],
    foreignKeys: {
      columns: 'id_ormawa',
      referencesConstraintName: 'fk_ormawa.id_events.id_ormawa',
      references: 'ormawa(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });
  pgm.addConstraint('ormawa', 'unique_ormawa', {
    unique: ['email'],
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('events', 'unique_event');
  pgm.dropConstraint('events', 'fk_ormawa.id_events.id_ormawa');
  pgm.dropConstraint('ormawa', 'unique_ormawa');
};
