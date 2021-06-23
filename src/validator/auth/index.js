const Joi = require('joi');
const { BadRequestException } = require('../../exceptions/ClientError');

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().required(),
});

const logoutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  validateLogin: (payload) => {
    const validation = loginSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
  validateLogout: (payload) => {
    const validation = logoutSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
  validateUpdateToken: (payload) => {
    const validation = updateTokenSchema.validate(payload);
    if (validation.error) {
      throw new BadRequestException(validation.error.message);
    }
  },
};
