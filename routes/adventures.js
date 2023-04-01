const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");

var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/getNearbyAdventures", urlencodedParser, (req, res) => {
  db.users.findOne({ username: req.session.user }, (err, docs) => {
    userLocation = docs.location;
    console.log(userLocation);
    db.adventures.find(
      {
        Startlocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [userLocation.longitude, userLocation.latitude],
            },
            $maxDistance: 5000, // in meters
          },
        },
      },
      (err, nearbyAdventures) => {
        if (err) {
          console.log(err);
          res.status(200).send("Error finding nearby adventures");
        } else {
          res.send(JSON.stringify(nearbyAdventures));
        }
      }
    );
  });
});
router.post("createAdventure", (req, res) => {});


module.exports = router;
