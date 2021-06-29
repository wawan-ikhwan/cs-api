const { ClientError } = require('../../exceptions/ClientError');

class UploadHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postUploadImage = this.postUploadImage.bind(this);
  }

  async postUploadImage(request, h) {
    try {
      const { data } = request.payload;
      this.validator.validateUpload(data.hapi.headers);

      const urlFoto = await this.service.insertFile(data, data.hapi);

      return h.response({
        status: 'success',
        message: 'Foto berhasil disimpan',
        data: {
          urlFoto,
        },
      }).code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.code);
      }

      return h.response({
        status: 'fail',
        message: 'Server error',
      }).code(500);
    }
  }
}

module.exports = UploadHandler;
