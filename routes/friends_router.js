var express = require("express");
var router = express.Router();
var template = require("../lib/template");
var startTemplate = require("../lib/startTemplate");
var friendsTemplate = require("../lib/friendsTemplate");
var mysql = require("mysql");
var qs = require("querystring");
var url = require("url");
const db = require("../lib/db");

var session = require("express-session");
var FileStore = require("session-file-store")(session);
router.use(
  session({
    secret: "account info",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

router.get("/", function (request, response) {
  let email = request.session.email;
  let friendList = "";
  let groupList = "";

  db.query(
    `SELECT * FROM userTBL WHERE email = '${email}'`,
    function (error, user) {
      let name = user[0].name;

      db.query(
        `SELECT * FROM friendTBL WHERE friend1 = '${email}'`,
        function (error, friend) {
          if (error) {
            console.log(error);
            throw error;
          }
          for (let i = 0; i < friend.length; i++) {
            friendList += friendsTemplate.friendList(friend[i].friend2);
          }

          db.query(
            `SELECT * FROM groupTBL WHERE g_owner = '${email}'`,
            function (error, group) {
              if (error) {
                console.log(error);
                throw error;
              }
              for (let i = 0; i < group.length; i++) {
                groupList += friendsTemplate.groupList(group[i].g_id);
              }

              let html = template.menu(
                "친구",
                friendsTemplate.friends(friendList, groupList),
                name
              );
              response.send(html);
            }
          );
        }
      );
    }
  );
});

router.post("/deleteSelected", function (request, response) {
  console.log(request.body);

  /*let email = request.session.email; 

    selected.forEach((friendEmail) => {
        db.query(`DELETE FROM friendTBL WHERE (friend1 = '${email}' AND friend2 = '${friendEmail}') OR
        (friend2 = '${email}' AND friend1 = '${friendEmail}')`, function(error, ){
            if(error){
                console.log(error); 
                throw error;
            }
        });
    });
    response.redirect(`/friends`); 
    */
});

module.exports = router;
