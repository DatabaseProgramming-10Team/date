const express = require("express");
const router = express.Router();
const template = require("../lib/template");

// const mysql = require("mysql");
// var url = require("url");

router.get("/", function (request, response) {
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

module.exports = router;
