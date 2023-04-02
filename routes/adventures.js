const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("createAdventure", (req, res) => {});
router.get("/joinAdventure", (req, res) => {
  if (
    db.users.findOne({ username: req.session.user }, (err, doc) => {
      if (!doc.currentAdventure) {
        db.users.update(
          { username: req.session.user },
          {
            $set: { currentAdventure: { id: req.query.id, progressIndex: 0 } },
          },
          {},
          () => {
            res.send(200);
          }
        );
      }
    })
  );
});

module.exports = router;
