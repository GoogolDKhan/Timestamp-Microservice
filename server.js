// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let resObj = {};

app.get("/api/:input", (req, res) => {
  let input = req.params.input;

  if (/\d{5,}/.test(input)) {
    /* timestamp 1451001600000*/
    input = parseInt(input);
    resObj["unix"] = new Date(input).getTime();
    resObj["utc"] = new Date(input).toUTCString();
  } else {
    /* Date String 2015-12-25, 25 December 2015 */
    resObj["unix"] = new Date(input).getTime();
    resObj["utc"] = new Date(input).toUTCString();
  }

  if (!resObj["unix"] || !resObj["utc"]) {
    res.json({ error: "Invalid Date" });
  }

  res.json(resObj);
});

app.get("/api", (req, res) => {
  resObj["unix"] = new Date().getTime();
  resObj["utc"] = new Date().toUTCString();

  res.json(resObj);
});

// BODY PARSER

let bodyParser = require("body-parser");

app.post("/api/", bodyParser.urlencoded({ extended: false }), (req, res) => {
  let input = req.body.input;
  let getUrl = "/api/" + input;

  res.redirect(getUrl);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
