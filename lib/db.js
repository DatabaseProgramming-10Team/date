const mysql = require("mysql");
/*const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "timecombiDB",
});*/

const db = mysql.createConnection({
  host: 'localhost',
  user: 'minyoung',
  password: 'Rlaalsdudqkqh@2',
  database: 'timecombi'
});

db.connect();
module.exports = db;
