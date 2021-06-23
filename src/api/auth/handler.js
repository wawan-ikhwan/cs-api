const { ClientError } = require('../../exceptions/ClientError');

class AuthHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postAuth = this.postAuth.bind(this);
    this.putAuth = this.putAuth.bind(this);
    this.deleteAuth = this.deleteAuth.bind(this);
  }

  async postAuth(request, h) {
    try {
      this.validator.validateLogin(request.payload);
      await this.service;

      return {
        status: 'success',
        message: 'post auth berhasil',
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

  async putAuth(request, h) {
    try {
      this.validator.validateUpdateToken(request.payload);
      await this.service;

      return {
        status: 'success',
        message: 'put auth berhasil',
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

  async deleteAuth(request, h) {
    try {
      this.validator.validateLogout(request.payload);
      await this.service;

      return {
        status: 'success',
        message: 'delete auth berhasil',
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

module.exports = AuthHandler;
