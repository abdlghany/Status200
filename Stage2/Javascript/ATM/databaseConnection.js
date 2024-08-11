var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "abdalghany",
  password: "ohitsme",
  database:""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM TABLENAME", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
