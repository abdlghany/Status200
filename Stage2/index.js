const mysql = require("mysql2");
var query = "SELECT * from teachers order by TeacherID DESC";
var query2 = "INSERT INTO `teachers` VALUES (NULL,?,?,?)";
var query3 = "DELETE FROM TEACHERS WHERE TeacherID = 28"
var lastid;
var firstName = "First Name is: ";
var lastName = "Last Name is: ";
var subject = "Subject is: "
const con = mysql.createConnection({
    host: "localhost",
    user: "abdalghany",
    password: "ohitsme",
    database:"status200college"
  });
  con.query(query ,function(err, results) {
    if (results) {
      console.log(results);
      lastid = results[0].TeacherID;
      firstName += lastid;
      lastName += lastid;
      subject += lastid;
      console.log("Last ID: "+lastid);
    }
  });
  con.query(query2, [firstName, lastName, subject], function(err, results) {
    if (results) {
      console.log(results);
    }
  });
  con.query(query3, function(err, results) {
    if (results) {
      console.log(results);
    }
  });
  con.end();
