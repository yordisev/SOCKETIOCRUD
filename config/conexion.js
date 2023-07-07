const mysql = require("mysql");

const db_connection = mysql
  .createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_apislim',
    password: '',
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;