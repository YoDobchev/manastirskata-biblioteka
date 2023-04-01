const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");

router.get("/getNearbyAdventures", (req, res) => {
  const userLocation = req.body;

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
        res.status(500).send("Error finding nearby adventures");
      } else {
        res.send(nearbyAdventures);
      }
    }
  );
});

module.exports = router;
