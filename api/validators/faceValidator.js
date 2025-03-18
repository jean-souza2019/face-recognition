const Joi = require('joi');

const faceRegistrationSchema = Joi.object({
  login: Joi.string().required(),
  descriptor: Joi.array().items(Joi.number()).min(1).required()
});

const faceVerificationSchema = Joi.object({
  login: Joi.string().required(),
  descriptor: Joi.array().items(Joi.number()).min(1).required()
});

module.exports = { faceRegistrationSchema, faceVerificationSchema };
