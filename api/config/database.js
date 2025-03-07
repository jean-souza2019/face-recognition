const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err.message);
    throw err;
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Tabela de Grupos de Acesso
    db.run(
      `CREATE TABLE IF NOT EXISTS access_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        permissao TEXT NOT NULL,
        status TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela access_groups:", err.message);
        } else {
          console.log("Tabela access_groups pronta.");
        }
      }
    );
    // Tabela de Usuários
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        login TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        permissao TEXT NOT NULL,
        status TEXT NOT NULL,
        grupo_id INTEGER,
        FOREIGN KEY (grupo_id) REFERENCES access_groups(id)
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela users:", err.message);
        } else {
          console.log("Tabela users pronta.");
        }
      }
    );
  }
});

module.exports = db;
