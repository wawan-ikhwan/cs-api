const { ClientError } = require('../../exceptions/ClientError');

class FileHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postFile = this.postFile.bind(this);
    this.getAllFiles = this.getAllFiles.bind(this);
    this.getFileById = this.getFileById.bind(this);
  }

  async postFile(request, h) {
    this.service.postFile();

    try {
      return h.response({
        status: 'success',
        message: 'File berhasil diupload!',
        data: {
          fileId: 'wd121r2',
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

  async getAllFiles(request, h) {
    try {
      const files = await this.service.getAllFiles();
      return {
        status: 'success',
        data: {
          files,
        },
      };
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

  async getFileById(request, h) {
    try {
      const { id } = request.params;

      const file = await this.service.getFileById(id);
      console.log(file);

      return h.redirect(file);
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

module.exports = FileHandler;
