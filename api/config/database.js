const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    const runMigrations = require('./migration');
    const runSeeder = require('./seeder');

    runMigrations(db, () => {
      runSeeder(db);
    });
  }
});

module.exports = db;
