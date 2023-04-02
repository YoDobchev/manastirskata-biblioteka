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
        {
          latitude: 42.031016,
          longitude: 23.079602,
          clue: "In the resting place of commuters loud and big, colored circles and cans of hues make quite a gig.",
        },
        {
          latitude: 42.031013,
          longitude: 23.07960297,
          clue: "Where do students go for a sip and a sit, in a green campus full of wit?",
        },
        {
          latitude: 42.0310139722,
          longitude: 23.079599,
          clue: "Where books are kept and knowledge flows, a place where bicycles come and go, a spot to park, a place to stay, where two-wheeled rides take a break for the day.",
        },
      ],
    });
  }
});

module.exports = db;
