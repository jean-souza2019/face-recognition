class UserRepository {
  constructor(db) {
    this.db = db;
  }

  createUser({ nome, login, senha, permissao, status, grupo_id = null }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (nome, login, senha, permissao, status, grupo_id) VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.run(query, [nome, login, senha, permissao, status, grupo_id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, nome, login, senha, permissao, status, grupo_id });
        }
      });
    });
  }

  findUserByLogin(login) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE login = ?`;
      this.db.get(query, [login], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = UserRepository;
