const express = require("express");
var Datastore = require("nedb");
const app = express();
const session = require("express-session");
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use(
  session({
    secret: "my-secret-key", // replace with a secret key of your own
    resave: false,
    saveUninitialized: false,
  })
);
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use("/home", require("./routes/home.js"));
app.use("/login", require("./routes/login.js"));
