const { ClientError } = require('../../exceptions/ClientError');

class EventHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postEvent = this.postEvent.bind(this);
  }

  async postEvent(request, h) {
    try {
      this.validator.validateEvent(request.payload);

      return {
        status: 'success',
        message: 'data benar',
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

  }

  async getEventById(request, h) {

  }

  async putEventById(request, h) {

  }

  async deleteEventById(request, h) {

  }
}

module.exports = EventHandler;
