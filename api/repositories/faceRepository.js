
class FaceRepository {
  constructor(db) {
    this.db = db;
  }

  createFaceData(userId, descriptor) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO face_data (user_id, descriptor) VALUES (?, ?)`;
      const descriptorStr = JSON.stringify(descriptor);
      this.db.run(query, [userId, descriptorStr], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, user_id: userId, descriptor });
        }
      });
    });
  }

  getFaceDataByUser(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM face_data WHERE user_id = ?`;
      this.db.all(query, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          rows.forEach(row => {
            row.descriptor = JSON.parse(row.descriptor);
          });
          resolve(rows);
        }
      });
    });
  }

  getLatestFaceDataByUser(userId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM face_data WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`;

      this.db.get(query, [userId], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          row.descriptor = JSON.parse(row.descriptor);
          resolve(row);
        }
      });
    });
  }
}

module.exports = FaceRepository;
