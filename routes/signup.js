const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
const crypto = require("crypto");
router.use(bodyParser.json());
router.post("/", (req, res) => {
  // check username and password
  req.session.ID = crypto
    .createHash("sha256")
    .update(req.body.username + req.body.password)
    .digest("hex");
  req.session.user = req.body.username;
  db.users.insert({
    username: req.body.username,
    password: crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex"),
  });
});

module.exports = router;
