const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    db.run(
      `CREATE TABLE IF NOT EXISTS access_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        permission TEXT NOT NULL,
        status TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating access_groups table:", err.message);
        } else {
          console.log("access_groups table ready.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        permission TEXT NOT NULL,
        status TEXT NOT NULL,
        group_id INTEGER,
        token_version INTEGER DEFAULT 0,
        FOREIGN KEY (group_id) REFERENCES access_groups(id)
      )`,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
        } else {
          console.log("users table ready.");
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS face_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        descriptor TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,
      (err) => {
        if (err) {
          console.error("Error creating face_data table:", err.message);
        } else {
          console.log("face_data table ready.");
        }
      }
    );
  }
});

module.exports = db;
