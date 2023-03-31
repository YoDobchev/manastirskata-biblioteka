const express = require("express");
const router = express.Router();
// router.get("/login", (req, res) => {
//   console.log("kek");
//   res.render("login.ejs");
// });
router.get("/login", (req, res) => {
  res.render("home.ejs");
});
router.post("/login", (req, res) => {
  // check username and password
  if (username === "myuser" && password === "mypassword") {
    req.session.loggedIn = true;
    res.redirect("/dashboard");
  } else {
    res.send("Invalid login");
  }
});
module.exports = router;
