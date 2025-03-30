module.exports = function runMigrations(db, callback) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS access_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        permission TEXT NOT NULL,
        status TEXT NOT NULL
      )`);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        permission TEXT NOT NULL,
        status TEXT NOT NULL,
        group_id INTEGER,
        token_version INTEGER DEFAULT 0,
        FOREIGN KEY (group_id) REFERENCES access_groups(id)
      )`);

    db.run(`
      CREATE TABLE IF NOT EXISTS face_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        descriptor TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`);

    console.log('Migration completed.');

    if (callback) callback();
  });
};
