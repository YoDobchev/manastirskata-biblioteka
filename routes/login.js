const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  console.log("kek");
  res.render("login.ejs");
});

router.post("/", (req, res) => {
  // check username and password
  if (username === "myuser" && password === "mypassword") {
    req.session.loggedIn = true;
    res.redirect("/dashboard");
  } else {
    res.send("Invalid login");
  }
});
module.exports = router;
