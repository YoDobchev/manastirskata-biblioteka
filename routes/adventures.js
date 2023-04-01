const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
var jsonParser = bodyParser.json();

// Parvar urlencodedParser = bodyParser.urlencoded({ extended: false
router.get("/joinAdventure", (req, res) => {
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
      if (err) {
        res.send(404);
      } else {
        res.send(200);
      }
    }
  );
  db.findOne({ username: req.session.user }, (err, docs) => {
    console.log(docs);
  });
});
module.exports = router;
