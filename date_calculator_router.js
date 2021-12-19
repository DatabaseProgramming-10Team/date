const express = require("express");
const router = express.Router();
const calTemplate = require("../lib/calTemplate");
const template = require("../lib/template");
const mysql = require("mysql");
const url = require("url");
const cookie = require('cookie');
const http = require('http');
const qs = require('querystring');
const path = require('path');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'minyoung',
  password: 'Rlaalsdudqkqh@2',
  database: 'timecombi'
});

router.get("/", function (req, res) {
        var _url = req.url;
        var queryData = url.parse(_url, true).query;
        var pathname = url.parse(_url, true).pathname;

        if(queryData.email === undefined){
                let html = template.menu("일정 계산기", calTemplate.cal(""), "홍길동");
                res.send(html);
        }else{
                db.query(`SELECT friend2, name FROM friendTBL left JOIN userTBL ON friend2 = email WHERE friend1=?`, [queryData.email], function (error, users) {
                   console.log(users);

                        db.query('SELECT g_id, g_name, COUNT(*) as cnt FROM memberTBL RIGHT JOIN groupTBL ON m_id = g_id WHERE (g_owner=? OR m_email=?) GROUP BY g_id;', [queryData.email, queryData.email], function (error, groups) {
let html = template.menu("일정 계산기", calTemplate.cal(calTemplate.groupList(groups), calTemplate.friendList(users)), "홍길동");
                res.send(html);

                });
        });
        }
});

module.exports = router;
