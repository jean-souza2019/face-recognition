const Joi = require('joi');

const createGroupSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  permission: Joi.string().required(),
  status: Joi.string().required()
});

const updateGroupSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  permission: Joi.string().optional(),
  status: Joi.string().optional()
});

module.exports = { createGroupSchema, updateGroupSchema };
