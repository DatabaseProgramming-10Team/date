const express = require("express");
const router = express.Router();
const template = require("../lib/template");
const db = require("../lib/db");

// const mysql = require("mysql");
// var url = require("url");

router.get("/", function (request, response) {
  let html = template.menu(
    "일정 계산기",
    template.date_calculator(),
    "",
    "홍길동"
  );
  response.send(html);
});

module.exports = router;
