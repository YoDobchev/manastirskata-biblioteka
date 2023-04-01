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
app.use(express.static(__dirname + "/public"));
const isLoggedIn = (req, res, next) => {
  if (req.session.ID) {
    next();
  } else {
    // next();

    res.redirect("/login");
  }
};
app.get("/", isLoggedIn, (req, res) => {
  console.log(req.query.hello);
  res.redirect("/home");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.post("/locationEvent", isLoggedIn, (req, res) => {
  let oldLocation;
  let newDist;
  let oldDist;
  console.log(req.body);
  db.users.findOne({ username: req.session.user }, (err, docs) => {
    if (!err) {
      if (docs.currentAdventure != null) {
        oldLocation = docs.location;
        let newLocation = req.body;
        let nextGoal;
        db.adventures.findOne(
          { ID: docs.currentAdventure.ID },
          (err, docsad) => {
            nextGoal = docsad.locations[docs.currentAdventure.progressIndex];
            oldDist = Math.hypot(
              oldLocation.latitude - nextGoal.latitude,
              oldLocation.longitude - nextGoal.longitude
            );
            newDist = Math.hypot(
              newLocation.latitude - nextGoal.latitude,
              newLocation.longitude - nextGoal.longitude
            );
            console.log(newDist, oldDist);
            if (newDist < oldDist) {
              db.users.updateOne(
                { username: req.session.user },
                { $inc: { tokens: newDist - oldDist } }
              );
            }
          }
        );
      }
    }
  });
  db.users.update(
    { username: req.session.user },
    { $set: { location: req.body } },
    {},
    (err) => {}
  );
  res.json({ delta: newDist - oldDist });
});
app.use("/login", require("./routes/login.js"));
app.use("/signup", require("./routes/signup.js"));
app.use("/", isLoggedIn, require("./routes/adventures.js"));
app.use("/", isLoggedIn, require("./routes/home.js"));
