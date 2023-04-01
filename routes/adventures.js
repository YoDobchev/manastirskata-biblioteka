const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
var jsonParser = bodyParser.json();

// Parse URL-encoded bodies (for form data)
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Handle GET request for joining an adventure
router.get("/joinAdventure", (req, res) => {
  // Update the user's current adventure in the database
  db.users.update(
    { username: req.session.user },
    {
      $set: {
        currentAdventure: {
          ID: req.query.adventureID,
          progressIndex: 0,
          tokens: 0,
        },
      },
    },
    (err) => {
      // Send appropriate response based on success or failure
      if (err) {
        res.send(404);
      } else {
        res.send(200);
      }
    }
  );
  // Find the updated user document and log it to the console
  db.findOne({ username: req.session.user }, (err, docs) => {
    console.log(docs);
  });
});

// Handle GET request for retrieving nearby adventures
router.get("/getNearbyAdventures", urlencodedParser, (req, res) => {
  // Get the user's location from the database
  db.users.findOne({ username: req.session.user }, (err, docs) => {
    userLocation = docs.location;
    console.log(userLocation);
    const threshold = 0.05; // about 5-6 kilometers

    // Find all adventures in the database
    db.adventures.find({}, (err, docs) => {
      // Filter adventures based on proximity to user
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
      // Send the filtered list of adventures as a JSON response
      res.json(filteredDocs);
    });
    // Note: This is an inefficient way to filter by proximity and should not be used in production
  });
});

// Handle POST request for creating a new adventure
router.post("/createAdventure", (req, res) => {
  // TODO: Implement adventure creation
});

module.exports = router;
