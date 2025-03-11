class UserRepository {
  constructor(db) {
    this.db = db;
  }

  createUser({ name, login, password, permission, status, group_id = null }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, login, password, permission, status, group_id) VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.run(query, [name, login, password, permission, status, group_id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, login, password, permission, status, group_id, token_version: 0 });
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

  findUserById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = ?`;
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  incrementTokenVersion(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET token_version = token_version + 1 WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  updateUser(id, userData) {
    return new Promise((resolve, reject) => {
      this.findUserById(id)
        .then((existingUser) => {
          if (!existingUser) {
            return reject(new Error('User not found.'));
          }
          const updatedUser = {
            name: userData.name || existingUser.name,
            login: userData.login || existingUser.login,
            password: userData.password || existingUser.password,
            permission: userData.permission || existingUser.permission,
            status: userData.status || existingUser.status,
            group_id: typeof userData.group_id !== 'undefined' ? userData.group_id : existingUser.group_id,
            token_version: existingUser.token_version
          };

          const query = `UPDATE users SET name = ?, login = ?, password = ?, permission = ?, status = ?, group_id = ? WHERE id = ?`;
          this.db.run(query, [updatedUser.name, updatedUser.login, updatedUser.password, updatedUser.permission, updatedUser.status, updatedUser.group_id, id], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, ...updatedUser });
            }
          });
        })
        .catch(reject);
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  getFilteredUsers(filters) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM users WHERE 1=1';
      const params = [];
      if (filters.name) {
        query += ' AND name LIKE ?';
        params.push(`%${filters.name}%`);
      }
      if (filters.login) {
        query += ' AND login LIKE ?';
        params.push(`%${filters.login}%`);
      }
      if (filters.permission) {
        query += ' AND permission = ?';
        params.push(filters.permission);
      }
      if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
      }
      if (filters.group_id) {
        query += ' AND group_id = ?';
        params.push(filters.group_id);
      }
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = UserRepository;
