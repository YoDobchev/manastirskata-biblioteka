const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
const crypto = require("crypto");
router.use(bodyParser.json());
router.post("/", (req, res) => {
  // check username and password

  db.users.findOne({ username: req.body.username }, (err, doc) => {
    console.log(req.body.username);
    console.log(doc);
    if (doc === null) {
      req.session.ID = crypto
        .createHash("sha256")
        .update(req.body.username + req.body.password)
        .digest("hex");
      req.session.user = req.body.username;
      console.log("ok");
      db.users.insert({
        username: req.body.username,
        password: crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("hex"),
        location: { latitude: 0, longitude: 0 },
        currentAdventure: null,
      });
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
