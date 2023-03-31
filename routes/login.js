const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
router.get("/", (req, res) => {
  console.log("kek");
  res.render("login.ejs");
});
router.use(bodyParser.json());
router.post("/", (req, res) => {
  // check username and password
  if (req.body.username === "myuser" && req.body.password === "mypassword") {
    req.session.loggedIn = true;
    res.redirect("/home");
  } else {
    res.send("Invalid login");
  }
});
module.exports = router;
