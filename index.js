const express = require("express");
var Datastore = require("nedb");
const app = express();
const session = require("express-session");
const port = 3000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json({ limit: "1mb" });

app.use(jsonParser);
app.set("view engine", "ejs");
const db = require("./db.js");
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "ijfrjeogphgp4hgpo",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.session.ID) {
    next();
  } else {
    // next();

    res.redirect("/login");
  }
};
app.get("/", isLoggedIn, (req, res) => {
  res.redirect("/home");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.post("/locationEvent", isLoggedIn, (req, res) => {
  console.log(req.body);
  db.users.update(
    { username: req.session.user },
    { $set: { location: req.body } },
    {},
    (err) => {}
  );
});
app.use("/login", require("./routes/login.js"));
app.use("/signup", require("./routes/signup.js"));
app.use("/", isLoggedIn, require("./routes/adventures.js"));
app.use("/", isLoggedIn, require("./routes/home.js"));
