const jwt = require('jsonwebtoken');

class AuthController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async register(req, res) {
    const { name, login, password, permission, status, group_id } = req.body;
    try {
      await this.userUseCase.registerUser({ name, login, password, permission, status, group_id });
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { login, password } = req.body;
    try {
      const user = await this.userUseCase.loginUser({ login, password });
      const token = jwt.sign(
        { id: user.id, login: user.login, role: user.permission, tokenVersion: user.token_version },
        'my_secret_key',
        { expiresIn: '1h' }
      );
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const filters = req.query;
      const users = await this.userUseCase.getUsers(filters);
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = await this.userUseCase.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      await this.userUseCase.deleteUser(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
