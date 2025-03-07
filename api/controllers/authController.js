const jwt = require('jsonwebtoken');

class AuthController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    const { nome, login, senha, permissao, status, grupo_id } = req.body;
    try {
      await this.userUseCase.registerUser({ nome, login, senha, permissao, status, grupo_id });
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { login, senha } = req.body;
    try {
      const user = await this.userUseCase.loginUser({ login, senha });
      // Gera um token JWT válido por 1 hora
      const token = jwt.sign({ id: user.id, login: user.login }, 'minha_chave_secreta', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
