const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "timecombiDB",
});
db.connect();
module.exports = db;
