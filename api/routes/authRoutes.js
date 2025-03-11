const express = require('express');
const validate = require('../validators/validate');
const { registerSchema, loginSchema, updateUserSchema } = require('../validators/authValidator');

module.exports = (authController) => {
  const router = express.Router();

  router.post('/register', validate(registerSchema), authController.register);
  router.post('/login', validate(loginSchema), authController.login);
  router.get('/users', authController.getUsers);
  router.put('/users/:id', validate(updateUserSchema), authController.updateUser);
  router.delete('/users/:id', authController.deleteUser);

  return router;
};
