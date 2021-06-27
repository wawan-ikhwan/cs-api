const Joi = require('joi');
const { BadRequestException } = require('../../exceptions/ClientError');

const ormawaSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().required(),
  nama: Joi.string().required(),
  urlFotoOrmawa: Joi.string().required(),
});

module.exports = {
  validateOrmawa: (payload) => {
    const validation = ormawaSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
};
