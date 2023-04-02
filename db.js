const Datastore = require("nedb");
const path = require("path");

const db = {};
db.users = new Datastore({
  filename: path.join(__dirname, "users.db"),
  autoload: true,
});
db.adventures = new Datastore({
  filename: path.join(__dirname, "adventures.db"),
  autoload: true,
});

db.adventures.findOne({}, (err, docs) => {
  if (docs == null) {
    db.adventures.insert({
      name: `Monasite test nomer ${Math.floor(Math.random() * 20)}`,
      locations: [
        { latitude: 42.0343, longitude: 23.11483 },
        { latitude: 42.0267, longitude: 23.0971 },
        { latitude: 42.0227, longitude: 23.0903 },
        { latitude: 42.0312, longitude: 23.0808 },
      ],
    });
  }
});

module.exports = db;
