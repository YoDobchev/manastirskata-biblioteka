const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home.ejs", { activePage: "home" });
});

router.get("/map", (req, res) => {
  res.render("home.ejs", { activePage: "map" });
});

router.get("/shop", (req, res) => {
  res.render("home.ejs", { activePage: "shop" });
});

router.get("/profile", (req, res) => {
  res.render("home.ejs", { activePage: "profile" });
});

module.exports = router;
