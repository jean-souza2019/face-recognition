
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  login: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  permission: Joi.string().optional(),
  status: Joi.string().optional(),
  group_id: Joi.number().optional()
});

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  login: Joi.string().min(3).max(50).optional(),
  password: Joi.string().min(6).optional(),
  permission: Joi.string().optional(),
  status: Joi.string().optional(),
  group_id: Joi.number().optional()
});

const userQuerySchema = Joi.object({
  name: Joi.string().optional(),
  login: Joi.string().optional(),
  permission: Joi.string().optional(),
  status: Joi.string().optional(),
  group_id: Joi.number().optional()
});

module.exports = { registerSchema, loginSchema, updateUserSchema, userQuerySchema };
