const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const db = require("../db");

router.use(urlencodedParser, (req, res, next) => {
  db.users.findOne({ username: req.session.user }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    req.user = docs;
    const userLocation = docs.location;
    console.log(JSON.stringify(docs));
    const threshold = 5;
    //about 5-6 kilometers

    db.adventures.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      const filteredDocs = docs.filter((doc) => {
        const latDiff = Math.abs(
          doc.locations[0].latitude - userLocation.latitude
        );
        const lonDiff = Math.abs(
          doc.locations[0].longitude - userLocation.longitude
        );
        return latDiff <= threshold && lonDiff <= threshold;
      });
      req.nearbyAdvs = filteredDocs;
      next();
    });
  });
});

router.get("/home", (req, res) => {
  res.render("home.ejs", {
    advs: req.nearbyAdvs,
    activePage: "nearyou",
    user: req.user,
  });
});

router.get("/nearyou", (req, res) => {
  res.render("nearyou.ejs", { advs: req.nearbyAdvs, user: req.user });
});
router.get("/mapPage", (req, res) => {
  res.render("home.ejs", {
    advs: req.nearbyAdvs,
    activePage: "map",
    user: req.user,
  });
});
router.get("/map", (req, res) => {
  res.render("map.ejs");
});
router.get("/shopPage", (req, res) => {
  res.render("home.ejs", {
    advs: req.nearbyAdvs,
    activePage: "shop",
    user: req.user,
  });
});
router.get("/shop", (req, res) => {
  res.render("shop.ejs");
});
router.get("/profilePage", (req, res) => {
  res.render("home.ejs", {
    advs: req.nearbyAdvs,
    activePage: "profile",
    user: req.user,
  });
});
router.get("/profile", (req, res) => {
  res.render("profile.ejs", { user: req.user });
});

module.exports = router;
