const Joi = require('joi');
const { BadRequestException } = require('../../exceptions/ClientError');

const uploadSchema = Joi.object({
  'content-type': Joi.string().valid(
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
  ).required(),
}).unknown();

module.exports = {
  validateUpload: (payload) => {
    const validation = uploadSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
};
