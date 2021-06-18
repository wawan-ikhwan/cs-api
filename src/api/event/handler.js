const { ClientError } = require('../../exceptions/ClientError');

class EventHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postEvent = this.postEvent.bind(this);
    this.getAllEvent = this.getAllEvent.bind(this);
    this.getEventById = this.getEventById.bind(this);
    this.putEventById = this.putEventById.bind(this);
    this.deleteEventById = this.deleteEventById.bind(this);
  }

  async postEvent(request, h) {
    try {
      this.validator.validateEvent(request.payload);

      return {
        status: 'success',
        message: 'request berhasil',
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

  async getAllEvent(request, h) {
    try {
      await this.service;

      return {
        status: 'success',
        message: 'request berhasil',
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

  async getEventById(request, h) {
    try {
      await this.service;

      return {
        status: 'success',
        message: 'request berhasil',
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

  async putEventById(request, h) {
    try {
      this.validator.validateEvent(request.payload);

      return {
        status: 'success',
        message: 'request berhasil',
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

  async deleteEventById(request, h) {
    try {
      await this.service;

      return {
        status: 'success',
        message: 'request berhasil',
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

module.exports = EventHandler;
