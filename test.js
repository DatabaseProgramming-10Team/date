var express = require("express");
var app = express();
var date_router = require("./routes/date_router");
var date_calculator_router = require("./routes/date_calculator_router");
var account_router = require("./routes/account_router");
var mysql = require("mysql");
var port = 80;
var bodyParser = require("body-parser");
var startTemplate = require("./lib/startTemplate.js");
var parseurl = require("parseurl");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public"));

app.use(
  session({
    secret: "account info",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "djeun",
  password: "password",
  database: "timecombiDB",
});

db.connect();

app.get("/", function (request, response) {
  if (request.session.email == null) {
    let html = startTemplate.loginHTML();
    response.send(html);
  } else {
    response.redirect(`/date`);
  }
});

app.use("/account", account_router);

app.use("/date", date_router);
app.use("/date_calculator", date_calculator_router);

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`start ${port}!`);
});
