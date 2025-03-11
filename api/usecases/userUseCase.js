const bcrypt = require('bcryptjs');

class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser({ name, login, password, permission = 'user', status = 'active', group_id = null }) {
    const userExists = await this.userRepository.findUserByLogin(login);
    if (userExists) {
      throw new Error('User already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({ name, login, password: hashedPassword, permission, status, group_id });
    return newUser;
  }

  async loginUser({ login, password }) {
    const user = await this.userRepository.findUserByLogin(login);
    if (!user) {
      throw new Error('User not found.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password.');
    }
    await this.userRepository.incrementTokenVersion(user.id);
    const updatedUser = await this.userRepository.findUserById(user.id);
    return updatedUser;
  }

  async getUsers(filters) {
    const users = await this.userRepository.getFilteredUsers(filters);
    return users;
  }

  async updateUser(id, userData) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const updatedUser = await this.userRepository.updateUser(id, userData);
    return updatedUser;
  }

  async deleteUser(id) {
    const result = await this.userRepository.deleteUser(id);
    return result;
  }
}

module.exports = UserUseCase;
