const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../db.js");
const crypto = require("crypto");

// Render login page
router.get("/", (req, res) => {
  res.render("login.ejs");
});

// Parse request body in JSON format
router.use(bodyParser.json());

// Handle login form submission
router.post("/", (req, res) => {
  // Hash the password using SHA256 algorithm
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  // Set the username in the session
  req.session.user = req.body.username;

  // Check if the username exists in the database
  db.users.findOne({ username: req.body.username }, (err, docs) => {
    if (!docs || err) {
      // If the username is not found or there is an error, send an error message
      res.send("Wrong username or password.");
    } else {
      // If the username is found, check if the password matches the hashed password
      if (docs.password == hashedPassword) {
        // If the password matches, generate a session ID using a combination of the password and a salt
        const sessionID = crypto
          .createHash("sha256")
          .update(req.body.password + "salt")
          .digest("hex");

        // Set the session ID in the session
        req.session.ID = sessionID;

        // Redirect to the home page
        res.redirect("/home");
      } else {
        // If the password does not match, send an error message
        res.send("Wrong username or password.");
      }
    }
  });
});

module.exports = router;
