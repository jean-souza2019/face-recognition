const db = require('./config/database');
const UserRepository = require('./repositories/userRepository');
const UserUseCase = require('./usecases/userUseCase');
const AuthController = require('./controllers/authController');

const GroupRepository = require('./repositories/groupRepository');
const GroupUseCase = require('./usecases/groupUseCase');
const GroupController = require('./controllers/groupController');

const userRepository = new UserRepository(db);
const userUseCase = new UserUseCase(userRepository);
const authController = new AuthController(userUseCase);

const groupRepository = new GroupRepository(db);
const groupUseCase = new GroupUseCase(groupRepository);
const groupController = new GroupController(groupUseCase);

module.exports = {
  userRepository,
  userUseCase,
  authController,
  groupRepository,
  groupUseCase,
  groupController
};
