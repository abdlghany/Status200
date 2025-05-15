const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bootcamp-school",
});

// Create JSON string
console.log("Create a JSON string");
console.log("----------------------------------------------------");
var jsonString =
    '{"name": "Karel", "age": 49, "isStudent": true, "subjects": ["Math", "Coding"]}';
console.log("Variable: jsonString");
console.log("Type of", typeof jsonString);
console.log("Value:\n\n", jsonString);
console.log("\n\n");

// Convert JSON string to object
console.log("Convert a JSON string to an object");
console.log("----------------------------------------------------");
var jsonObject = JSON.parse(jsonString);
console.log("Variable: jsonObject");
console.log("Type of:", typeof jsonObject);
console.log("Value:\n\n", jsonObject);
console.log("\n\n");

// Get Teachers
connection.query(`SELECT * FROM Teachers;`, (err, teachers) => {
    // Throw err of there is an error
    if (err) throw err;

    // Parse through results and show Teacher info in command line
    // Using for Loop
    console.log("Parsing through array with object\nusing for loop.");
    console.log("----------------------------------------------------");
    for (let i = 0; i < teachers.length; i++) {
        console.log(`${teachers[i].FirstName} ${teachers[i].LastName}`);
    }
    console.log("\n\n");

    // Parse through results and show Teacher info in command line
    // Using forEach loop
    console.log("Parsing through array with object\nusing forEach loop.");
    console.log("----------------------------------------------------");
    teachers.forEach((teacher) => {
        console.log(`${teacher.FirstName} ${teacher.LastName}`);
    });
    console.log("\n\n");

    // Parsing through first object in the array (index 0)
    // Using for ... in loop
    console.log(
        "Parsing through first object in the array (index 0)\nusing for ... in loop."
    );
    console.log("----------------------------------------------------");
    for (key in teachers[0]) {
        console.log(`${key}: ${teachers[0][key]}`);
    }
    console.log("\n\n");

    // Parsing through array and each object
    // Using forEach and for ... in loop
    console.log(
        "Parsing through array and each object\nusing forEach and for ... in loop"
    );
    console.log("----------------------------------------------------");
    teachers.forEach((teacher) => {
        for (key in teacher) {
            console.log(`${key}: ${teacher[key]}`);
        }
        console.log("");
    });
    console.log("\n\n");

    // close connection
    connection.end();

    // close app
    process.exit();
});
