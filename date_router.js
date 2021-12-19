const express = require("express");
const router = express.Router();
const template = require("../lib/template");
const mysql = require('mysql');
const url = require('url');
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

router.get("/:c", function (req, res) {
        var checkDate = req.params.checkDate;
        var _url = req.url;
        var queryData = url.parse(_url, true).query;
        var pathname = url.parse(_url, true).pathname;
        var list = [];

        db.query(`SELECT * FROM eventTBL WHERE user_email=? AND start_date <= ? AND end_date >= ?`, ["minyoung@gmail.com", checkDate, checkDate], function (error, users, fields) {
                 console.log(users);
                 for(let i = 0; i < users.length; i++){
                        if(users[i].isRepeat == 1){

                                //요일 비교 코드
                                //db.query('SELECT * FROM eventTBL WHERE event_no > 0', function (error, result) {
                                //if (error) { throw error; }

                                list.push(users[i]);
                        }
 }
                console.log(list);
                let html = template.menu("내 일정", template.date(template.datelist(list)),"홍>길동");

                res.send(html);

        });
});

router.post('/create_process', function(request, response) {
        var ev = request.body;
        console.log(ev);
        var start_time = ''
        var last_time = ''
        var isRepeat = 0;
        var repeat = '';

        if('종일' in ev){
                start_time = '12:00';
                last_time = '24:00';
        }else{
                start_time = ev.start_time;
                last_time = ev.last_time;
        }

        if('월' in ev) repeat += '월'
        if('화' in ev) repeat += '화'
        if('수' in ev) repeat += '수'
        if('목' in ev) repeat += '목'
        if('금' in ev) repeat += '금'
        if('토' in ev) repeat += '토'
        if('일' in ev) repeat += '일'

        if(repeat.length != 0) {
isRepeat = 1;
                db.query('SELECT COUNT(*) AS count FROM eventTBL WHERE event_no > 0', function (error, result) {
                        if (error) { throw error; }
                        var cnt = result[0].count;

                        db.query(`INSERT INTO repeatEventTBL(event_no, re_day) VALUES( ?, ?)`,[ cnt+1, repeat], function (error, result) {
                                if (error) { throw error; }
                        });
                });
        }

        db.query(`INSERT INTO eventTBL(user_email, event_name, start_date, end_date, start_time, end_time, isRepeat, color) VALUES(?, ?, ? ,? ,?, ?, ?, ?)`,
                ['minyoung@gmail.com', ev.title, ev.start_date, ev.last_date, start_time, last_time, isRepeat, ev.color], function (error, result) {
                if (error) { throw error; }
                response.writeHead(302, { Location: `/date` });
                response.end();
        });
  });

router.post('/update_process', function(request, response) {
        //db.query(`INSERT INTO eventTBL(user_email, event_name, start_date, end_date, start_time, end_time, isRepeat, color) VALUES(?, ?, ? ,? ,?, ?, ?, ?) WHERE event.id=?`,
          //      ['minyoung@gmail.com', ev.title, ev.start_date, ev.last_date, start_time, last_time, isRepeat, ev.color, parseInt(request.body.id)], function (error, result) {
            //    if (error) { throw error; }
               response.writeHead(302, { Location: `/date` });
                response.end();
        //});
});
router.post('/delete_process', function(request, response) {
      db.query(`DELETE FROM repeatEventTBL WHERE event_no=?`, [parseInt(request.body.id)], function (error, result) {
        if (error) { throw error; }

              db.query(`DELETE FROM eventTBL WHERE event_no=?`, [parseInt(request.body.id)], function (error, result) {
                if (error) { throw error; }
              });

        response.writeHead(302, { Location: `/date` });
        response.end();
    });
});

module.exports = router;
