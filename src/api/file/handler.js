const { ClientError } = require('../../exceptions/ClientError');

class FileHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postFile = this.postFile.bind(this);
    this.getPageIndex = this.getPageIndex.bind(this);
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

  async getPageIndex(request, h) {
    const bucket = await this.service.getPageIndex();
    console.log(request);
    console.log(h);
    return {
      status: 'success',
      data: {
        message: 'Ini adalah page index',
        bucket,
      },
    };
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
      let { id } = request.params;
      console.log(id);
      if (id == null) {
        return 'oke';
      }
      id = id.replace('/', '%2F');

      const file = await this.service.getFileById(id);

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
        message: 'server error',
      }).code(500);
    }
  }
}

module.exports = FileHandler;
