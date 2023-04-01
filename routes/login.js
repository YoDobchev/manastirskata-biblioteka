const express = require("express");
const router = express.Router();
let bodyParser = require("body-parser");
const db = require("../db.js");
let crypto = require("crypto");
router.get("/", (req, res) => {
  console.log("kek");
  res.render("login.ejs");
});

router.use(bodyParser.json());
router.post("/", (req, res) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  req.session.user = req.body.username;


  // check username and password
  db.users.findOne({ username: req.body.username }, (err, docs) => {
    if (!docs || err) {
      res.send("wrong password bro:(");
    } else {
      if (docs.password == hashedPassword) {
        req.session.ID = crypto
          .createHash("sha256")
          .update(req.body.password + req.body.password)
          .digest("hex");

        res.redirect("/home");
      }
    }
  });
});

module.exports = router;
