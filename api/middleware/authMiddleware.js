const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
const db = require('../config/database');

const userRepository = new UserRepository(db);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token not provided.' });

  jwt.verify(token, 'my_secret_key', async (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });

    try {
      const user = await userRepository.findUserById(payload.id);
      if (!user) {
        return res.status(403).json({ error: 'User not found.' });
      }
      if (user.token_version !== payload.tokenVersion) {
        return res.status(403).json({ error: 'Token expired or invalid.' });
      }
      req.user = payload;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Error validating token.' });
    }
  });
};

module.exports = authenticateToken;
