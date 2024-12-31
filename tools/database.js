const { app } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 创建或打开数据库
let dbPath = path.join(__dirname, "database.sqlite");
if (app.isPackaged) {
  dbPath = path.join(app.getAppPath(), "../", "database.sqlite");
}
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to database");
  }
});

// 创建打印日志记录表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS print_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      socketId TEXT,
      clientType TEXT,
      printer TEXT,
      templateId TEXT,
      data TEXT,
      pageNum INTEGER,
      status TEXT,
      errorMessage TEXT
    )
  `);
});

module.exports = db;
