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
db.adventures.insert({
  Startlocation: {
    type: "Point",
    coordinates: [42.0230861, 23.0854894],
  },
});
module.exports = db;
