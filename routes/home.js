const express = require("express");
const router = express.Router();
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    // res.redirect("/login");
  }
};
router.get("/", isLoggedIn, (req, res) => {
  res.render("home.ejs");
});

module.exports = router;
