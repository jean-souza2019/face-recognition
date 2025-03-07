const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

module.exports = () => {
  const router = express.Router();

  router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.login}! Esta é a área protegida.` });
  });

  return router;
};
