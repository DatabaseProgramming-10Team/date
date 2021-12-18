const express = require("express");
const app = express();
const date_router = require("./routes/date_router");
const date_calculator_router = require("./routes/date_calculator_router");
const port = 80;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public"));

app.use("/", login);
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
