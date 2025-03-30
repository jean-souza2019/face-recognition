require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = async function seedDatabase(db) {
  const {
    DEFAULT_USER_NAME,
    DEFAULT_USER_LOGIN,
    DEFAULT_USER_PASSWORD,
    DEFAULT_USER_PERMISSION,
    DEFAULT_USER_STATUS,
    DEFAULT_GROUP_NAME,
    DEFAULT_GROUP_PERMISSION,
    DEFAULT_GROUP_STATUS
  } = process.env;

  const hashedPassword = await bcrypt.hash(DEFAULT_USER_PASSWORD, 10);

  db.serialize(() => {
    db.get(`SELECT id FROM access_groups WHERE name = ?`, [DEFAULT_GROUP_NAME], (err, row) => {
      if (err) return console.error(err.message);

      if (row) {
        insertUser(row.id);
      } else {
        db.run(
          `INSERT INTO access_groups (name, permission, status) VALUES (?, ?, ?)`,
          [DEFAULT_GROUP_NAME, DEFAULT_GROUP_PERMISSION, DEFAULT_GROUP_STATUS],
          function (err) {
            if (err) return console.error(err.message);
            insertUser(this.lastID);
          }
        );
      }
    });

    function insertUser(groupId) {
      db.get(`SELECT * FROM users WHERE login = ?`, [DEFAULT_USER_LOGIN], (err, row) => {
        if (err) return console.error(err.message);
        if (row) return console.log("User already exists. Skipping seeding.");

        db.run(
          `INSERT INTO users (name, login, password, permission, status, group_id) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            DEFAULT_USER_NAME,
            DEFAULT_USER_LOGIN,
            hashedPassword,
            DEFAULT_USER_PERMISSION,
            DEFAULT_USER_STATUS,
            groupId
          ],
          (err) => {
            if (err) return console.error(err.message);
            console.log("Default user inserted.");
          }
        );
      });
    }
  });
};
