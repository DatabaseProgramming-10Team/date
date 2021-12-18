var http = require("http");
var server = http.createServer(app);
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var path = require("path");
// var sanitizeHtml = require("sanitize-html");
var mysql = require("mysql");

var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "time combi",
});

db.connect();

app.get("/date", function (req, res) {
  var _url = req.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var list = "";
  if (queryData.email === undefined) {
    fs.readdir("./data", function (error, filelist) {
      var html = template.menu;
      //+ template.date(list);
      res.send(html);
    });
  } else {
    db.query(
      `SELECT * FROM eventTBL WHERE user_email=? AND start_date <= ? AND end_date >= ?`,
      [queryData.email, queryData.day, queryData.day],
      function (error, users) {
        console.log(users);
        list = "";
        for (let i = 0; i < users.length; i++) {
          if (users[i].isRepeat == 1) {
          } else {
            list += users[i];
          }
        }

        fs.readdir("./data", function (error, filelist) {
          var html = template.date(users);
          res.send(html);
        });
      }
    );
  }
});

app.post("/date/create_process", function (req, res) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var ev = qs.parse(body);
    db.query(
      `INSERT INTO eventTBL VALUES(?, ?, ?, ? ,? ,?, ?, ?, ?)`,
      [
        3,
        "minyoung@gmail.com",
        ev.title,
        ev.start_date,
        ev.last_date,
        ev.start_time,
        ev.last_time,
        0,
        ev.color,
      ],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end();
      }
    );
  });
});

app.post("/date/update_process", function (req, res) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query(
      `UPDATE eventTBL SET event_name=? WHERE event_no=?`,
      [post.title, post.no],
      function (error, result) {
        response.writeHead(302, { Location: `/` });
        response.end();
      }
    );
  });
});

app.post("/date/delete_process", function (req, res) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query(
      `DELETE FROM eventTBL WHERE event_no=?`,
      [post.no],
      function (error, result) {
        response.writeHead(302, { Location: `/` });
        response.end();
      }
    );
  });
});

app.listen(80, function () {
  console.log("실행중");
});
