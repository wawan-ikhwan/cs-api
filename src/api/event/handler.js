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
      const { credentialId } = request.auth.credentials;

      const eventId = await this.service.insertEvent(credentialId, request.payload);

      return h.response({
        status: 'success',
        message: 'Event berhasil disimpan',
        data: {
          eventId,
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

  async getAllEvent(request, h) {
    try {
      const { items = 10, page = 1 } = request.query;

      const events = await this.service.getEvents(items, page);

      return {
        status: 'success',
        data: {
          events,
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

  async getEventById(request, h) {
    try {
      const { id } = request.params;

      const event = await this.service.getEventById(id);

      return {
        status: 'success',
        data: {
          event,
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

  async putEventById(request, h) {
    try {
      const { id } = request.params;

      this.validator.validateEvent(request.payload);

      await this.service.updateEventById(id, request.payload);

      return {
        status: 'success',
        message: 'event berhasil diupdate',
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
      const { id } = request.params;

      await this.service.deleteEventById(id);

      return {
        status: 'success',
        message: 'event berhasil dihapus',
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
