/* eslint-disable camelcase */
module.exports = {
  ormawaModel: ({
    id, email, nama, url_foto_user,
  }) => ({
    id, email, nama, urlFotoOrmawa: url_foto_user,
  }),
  eventModel: ({
    id,
    id_ormawa,
    judul,
    deskripsi,
    url_foto_pamflet,
    url_pendaftaran,
    waktu_acara,
    waktu_ditambah,
  }) => ({
    id,
    idOrmawa: id_ormawa,
    judul,
    deskripsi,
    urlFotoPamflet: url_foto_pamflet,
    urlPendaftaran: url_pendaftaran,
    waktuAcara: waktu_acara,
    waktuDitambah: waktu_ditambah,
  }),
};
