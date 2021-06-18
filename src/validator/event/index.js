const Joi = require('joi');
const { BadRequestException } = require('../../exceptions/ClientError');

const eventSchema = Joi.object({
  judul: Joi.string().required(),
  deskripsi: Joi.string().required(),
  url_foto_pamflet: Joi.string().required(),
  url_pendaftaran: Joi.string().required(),
  waktu_acara: Joi.date().required(),
});

module.exports = {
  validateEvent: (payload) => {
    const validation = eventSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
};
