const mysql = require("mysql2");
var selectCustPin = "SELECT customerpin FROM customers WHERE customeraccountno = ?";

const con = mysql.createConnection({
    host: "localhost",
    user: "abdalghany",
    password: "ohitsme",
    database:"atm"
  });

function connectToDB(){
    con.connect(function(err) {
      if (err) return err;
      // console.log("Connected!");
    });
}

function fetchPasswordFromDb2(userAccountNo, callback){
    con.query(selectCustPin, [userAccountNo], function(err, result, fields) {
        if (err) return callback(err, null);
        if (result && result.length > 0) {
          callback(null, result[0].customerpin);
        } else {
          callback(null, "User does not exist");
        }
    });
}

module.exports.fetchUserPassword2 = fetchPasswordFromDb2;
module.exports.connectToDB = connectToDB;