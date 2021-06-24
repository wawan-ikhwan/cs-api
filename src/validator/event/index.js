const Joi = require('joi');
const { BadRequestException } = require('../../exceptions/ClientError');

const eventSchema = Joi.object({
  judul: Joi.string().required(),
  deskripsi: Joi.string().required(),
  urlFotoPamflet: Joi.string().required(),
  urlPendaftaran: Joi.string().required(),
  waktuAcara: Joi.date().iso().required(),
});

module.exports = {
  validateEvent: (payload) => {
    const validation = eventSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
};
