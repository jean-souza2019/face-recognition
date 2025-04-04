const Joi = require('joi');

const createGroupSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  permission: Joi.string().required(),  
  status: Joi.boolean().valid(1).valid(0).required()
});

const updateGroupSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  permission: Joi.string().optional(),
  status: Joi.boolean().valid(1).valid(0).optional()
});

module.exports = { createGroupSchema, updateGroupSchema };
