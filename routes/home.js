const express = require("express");
const app = exoress();
const router = express.Router();
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    // next();
    res.redirect("/login");
  }
};
router.get("/", isLoggedIn, (req, res) => {
  res.render("home.ejs");
});
app.set('js', 'text/javascript');

// Serve static files from the 'public' directory
app.use(express.static('public'));
module.exports = router;
