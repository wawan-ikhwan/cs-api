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

      // const ormawaId = await this.service.insertOrmawa(request.payload); # isi service!!!!

      return h.response({
        status: 'success',
        message: 'Ormawa berhasil terdaftar!',
        data: {
          ormawaId: '235151', // edit soon
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
      // const ormawa = await this.service.getOrmawa();

      return {
        status: 'success',
        data: {
          ormawa: ['senifasilkom', 'bem'], // edit soon
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
      console.log(id);

      // const ormawa = await this.service.getOrmawaById(id);

      return {
        status: 'success',
        data: {
          ormawa: 'bem', // edit soon
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
