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
    const userLocation = docs.location;
    console.log(userLocation);
    const threshold = 5;
    //about 5-6 kilometers

    db.adventures.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      const filteredDocs = docs.filter((doc) => {
        const latDiff = Math.abs(
          doc.Startlocation.coordinates[0] - userLocation.latitude
        );
        const lonDiff = Math.abs(
          doc.Startlocation.coordinates[1] - userLocation.longitude
        );
        console.log(latDiff, lonDiff + "diff");
        return latDiff <= threshold && lonDiff <= threshold;
      });
      req.nearbyAdvs = filteredDocs;

      req.user = docs;
      console.log(filteredDocs + "eee");
      next();
    });
  });
});

router.get("/home", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "nearyou" });
});

router.get("/nearyou", (req, res) => {
  res.render("nearyou.ejs", { advs: req.nearbyAdvs });
});
router.get("/mapPage", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "map" });
});
router.get("/map", (req, res) => {
  let routeTo = { latitude: 0, longitude: 0 };
  if (req.query.id) {
    db.adventures.findOne({ _id: req.query.id }, (err, doc) => {
      if (doc.latitude != 0) {
        routeTo.latitude = doc.locations[0].latitude;
        routeTo.longitude = doc.locations[0].longitude;
        res.render("map.ejs", { nextLocation: routeTo });
      }
    });
  }
});
router.get("/shopPage", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "shop" });
});
router.get("/shop", (req, res) => {
  res.render("shop.ejs");
});
router.get("/profilePage", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "profile" });
});
router.get("/profile", (req, res) => {
  res.render("profile.ejs");
});

module.exports = router;
