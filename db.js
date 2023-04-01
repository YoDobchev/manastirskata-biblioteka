const Datastore = require("nedb");
const path = require("path");

const db = new Datastore({
  filename: path.join(__dirname, "myDb.db"),
  autoload: true,
});
db.users = new Datastore({
  filename: path.join(__dirname, "users.db"),
  autoload: true,
});
db.adventures = new Datastore({
  filename: path.join(__dirname, "adventures.db"),
  autoload: true,
});

module.exports = db;
