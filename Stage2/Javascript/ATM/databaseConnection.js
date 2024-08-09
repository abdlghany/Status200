var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "abdalghany",
  password: "ohitsme"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

              

