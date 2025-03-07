class GroupRepository {
  constructor(db) {
    this.db = db;
  }

  createGroup({ nome, permissao, status }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO access_groups (nome, permissao, status) VALUES (?, ?, ?)`;
      this.db.run(query, [nome, permissao, status], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, nome, permissao, status });
        }
      });
    });
  }

  getAllGroups() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM access_groups`;
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = GroupRepository;
