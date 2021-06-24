const { ClientError } = require('../../exceptions/ClientError');

class OrmawaHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postOrmawa = this.postOrmawa.bind(this); // daftar ormawa
    this.getAllOrmawa = this.getAllOrmawa.bind(this);
    this.getOrmawaById = this.getOrmawaById.bind(this);
  }

  async postOrmawa(request, h) { // daftar ormawa
    try {
      this.validator.validateOrmawa(request.payload);

      const ormawaId = await this.service.insertOrmawa(request.payload);

      return h.response({
        status: 'success',
        message: 'Ormawa berhasil terdaftar!',
        data: {
          ormawaId,
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

  async getAllOrmawa(request, h) {
    try {
      const ormawa = await this.service.getOrmawa();

      return {
        status: 'success',
        data: {
          ormawa, // edit soon
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

  async getOrmawaById(request, h) {
    try {
      const { id } = request.params;

      const ormawa = await this.service.getOrmawaById(id);

      return {
        status: 'success',
        data: {
          ormawa, // edit soon
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
}

module.exports = OrmawaHandler;
