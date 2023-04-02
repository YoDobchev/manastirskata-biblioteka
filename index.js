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
  res.redirect("/home");
});
app.listen(port, () => {
  console.log(`Nebuluous listening on ${port}`);
});
app.post("/locationEvent", isLoggedIn, (req, res) => {
  console.log("someone called location event");
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
        let progressIndex = docs.currentAdventure.progressIndex;
        console.log(docs.currentAdventure);
        db.adventures.findOne(
          { _id: docs.currentAdventure.id },
          (err, docsad) => {
            if (!err && docsad != null) {
              console.log(
                distanceBetweenPoints(
                  req.body.latitude,
                  req.body.longitude,
                  docsad.locations[progressIndex].latitude,
                  docsad.locations[progressIndex].longitude
                )
              );
              if (
                distanceBetweenPoints(
                  req.body.latitude,
                  req.body.longitude,
                  docsad.locations[progressIndex].latitude,
                  docsad.locations[progressIndex].longitude
                ) < 200
              ) {
                db.users.update(
                  { username: req.session.user },
                  { $inc: { progressIndex: 1 } },
                  { new: true },
                  (err, doc) => {
                    console.log(doc);
                  }
                );
                progressIndex++;
              }
              console.log(docsad);
              console.log("progrIndex " + progressIndex);
              nextGoal = docsad.locations[progressIndex];
              oldDist = Math.hypot(
                oldLocation.latitude - nextGoal.latitude,
                oldLocation.longitude - nextGoal.longitude
              );
              newDist = Math.hypot(
                newLocation.latitude - nextGoal.latitude,
                newLocation.longitude - nextGoal.longitude
              );
              // console.log(newDist, oldDist);
              // if (newDist < oldDist) {
              //   db.users.update(
              //     { username: req.session.user },
              //     { $inc: { tokens: (newDist - oldDist) * 13 } },
              //     { new: true },
              //     (err, doc) => {
              //       console.log(doc);
              //       console.log(
              //         "if this is correct this should print" +
              //           doc.currentAdventure.progressIndex
              //       );
              //     }
              //   );
              // }
              db.users.findOne({ username: req.session.user }, (err, docs) => {
                res.json({ tokens: docs.tokens, nextGoal: nextGoal });
              });
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
  // res.json({ delta: newDist - oldDist });
});

function distanceBetweenPoints(lat1, lon1, lat2, lon2) {
  var R = 6371e3; // Earth's radius in meters
  var phi1 = (lat1 * Math.PI) / 180;
  var phi2 = (lat2 * Math.PI) / 180;
  var deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  var deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  var a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = R * c; // Distance in meters

  return distance;
}

app.use("/login", require("./routes/login.js"));
app.use("/signup", require("./routes/signup.js"));
app.use("/", isLoggedIn, require("./routes/adventures.js"));
app.use("/", isLoggedIn, require("./routes/home.js"));
