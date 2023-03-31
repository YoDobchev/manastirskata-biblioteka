const express = require("express");
const router = express.Router();
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    // next();
    res.redirect("/login");
  }
};
router.get("/home", isLoggedIn, (req, res) => {
  res.render("home.ejs", {activePage: 'home'});
});

router.get("/map", isLoggedIn, (req, res) => {
  res.render("home.ejs", {activePage: 'map'});
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("home.ejs", {activePage: 'shop'});
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("home.ejs", {activePage: 'profile'});
});

module.exports = router;
