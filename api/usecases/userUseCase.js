const bcrypt = require('bcryptjs');

class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser({ nome, login, senha, permissao = 'user', status = 'active', grupo_id = null }) {
    const userExists = await this.userRepository.findUserByLogin(login);
    if (userExists) {
      throw new Error('Usuário já existe.');
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await this.userRepository.createUser({ nome, login, senha: hashedPassword, permissao, status, grupo_id });
    return newUser;
  }

  async loginUser({ login, senha }) {
    const user = await this.userRepository.findUserByLogin(login);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      throw new Error('Senha incorreta.');
    }
    return user;
  }
}

module.exports = UserUseCase;
