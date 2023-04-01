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
      console.log(filteredDocs + "eee");
      next();
    });
  });
});

router.get("/home", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "home" });
});

router.get("/map", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "map" });
});

router.get("/shop", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "shop" });
});

router.get("/profile", (req, res) => {
  res.render("home.ejs", { advs: req.nearbyAdvs, activePage: "profile" });
});

module.exports = router;
