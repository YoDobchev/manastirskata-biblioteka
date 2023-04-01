const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/joinAdventure", (req, res) => {
  db.users.update(
    { username: req.session.user },
    {
      currentAdventure: {
        ID: req.query.adventureID,
        progressIndex: 0,
        tokens: 0,
      },
    },
    (err) => {
      if (err) {
        res.send(404);
      } else {
        res.send(200);
      }
    }
  );
});

router.get("/getNearbyAdventures", urlencodedParser, (req, res) => {
  db.users.findOne({ username: req.session.user }, (err, docs) => {
    userLocation = docs.location;
    console.log(userLocation);
    const threshold = 0.05;
    //about 5-6 kilometers

    db.adventures.find({}, (err, docs) => {
      const filteredDocs = docs.filter((doc) => {
        const latDiff = Math.abs(
          doc.Startlocation.coordinates[0] - userLocation.latitude
        );
        const lonDiff = Math.abs(
          doc.Startlocation.coordinates[1] - userLocation.longitude
        );
        console.log(latDiff, lonDiff);
        return latDiff <= threshold && lonDiff <= threshold;
      });
      res.json(filteredDocs);
    });
    //NEVER USE THIS IN PRODUCTION!!! MONGO HAS A WAY MORE EFFICIENT WAY TO DO THIS, BUT THIS IS JUST FOR A HACKATHON
  });
});

router.post("createAdventure", (req, res) => {});

module.exports = router;
