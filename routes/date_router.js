const express = require("express");
const router = express.Router();
const template = require("../lib/template");

// router.use("/public", express.static(__dirname + "/public"));

// const mysql = require("mysql");
var url = require("url");

// const dotenv = require("dotenv");
// dotenv.config();
// const mysql = require("mysql");
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
// });

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "timecombidb",
  dateStrings: "date",
});

router.get("/", function (request, response) {
  db.query("SELECT * from usertbl", function (error, users) {
    console.log(users);
    let html = template.menu(
      "내 일정",
      template.date(
        template.datelist([
          { color: "color1", dateName: "저녁약속", time: "12:00~13:00" },
        ])
      ),
      "홍길동"
    );
    response.send(html);
  });
});

router.get("/:checkDate", function (request, response) {
  var checkDate = request.params.checkDate;
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var list = [];
  db.query(
    `select * from eventtbl WHERE start_date=?`,
    [checkDate],
    function (error, dates) {
      console.log(dates);
      let html = template.menu(
        "내 일정",
        template.date(template.datelist(dates)),
        "홍길동"
      );
      console.log("새로고침");
      response.send(html);
    }
  );
});

router.get("/:checkDate/schedulelist", function (request, response) {
  var checkDate = request.params.checkDate;
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var list = [];
  db.query(
    `select * from eventtbl WHERE start_date=?`,
    [checkDate],
    function (error, dates) {
      console.log(dates);
      let html = template.datelist(dates);
      response.send(html);
    }
  );
});

module.exports = router;
