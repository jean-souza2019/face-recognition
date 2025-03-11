class GroupRepository {
  constructor(db) {
    this.db = db;
  }

  createGroup({ name, permission, status }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO access_groups (name, permission, status) VALUES (?, ?, ?)`;
      this.db.run(query, [name, permission, status], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, permission, status });
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

  getFilteredGroups(filters) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM access_groups WHERE 1=1';
      const params = [];
      if (filters.name) {
        query += ' AND name LIKE ?';
        params.push(`%${filters.name}%`);
      }
      if (filters.permission) {
        query += ' AND permission = ?';
        params.push(filters.permission);
      }
      if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
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

  updateGroup(id, { name, permission, status }) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE access_groups SET name = ?, permission = ?, status = ? WHERE id = ?`;
      this.db.run(query, [name, permission, status, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, name, permission, status });
        }
      });
    });
  }

  deleteGroup(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM access_groups WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = GroupRepository;
