const Database = require("better-sqlite3");

const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    address TEXT NOT NULL
)
`);

db.exec(`
CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT
);
`);
module.exports = db;