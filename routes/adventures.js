const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const db = require("../db.js");
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("createAdventure", (req, res) => {});

module.exports = router;
