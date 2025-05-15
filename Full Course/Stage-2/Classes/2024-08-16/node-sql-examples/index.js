// Import mysql2 package / module
const mysql = require("mysql2");

// Create a connection with the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bootcamp-school",
});

// Verify if connection was established successfully
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        // console.log("Connected to the MySQL database successfully!");
    }
});

// Get all teachers that don't teacher any courses.
// connection.query(
//     `
//     SELECT
//         t.TeacherID AS "Teacher ID",
//         t.FirstName AS "First Name",
//         t.LastName AS "Last Name",
//         t.Subject
//     FROM Teachers AS t
//     LEFT JOIN Courses AS c ON t.TeacherID = c.TeacherID
//     WHERE c.CourseID IS NULL;
// `,
//     function (err, results, fields) {
//         if (err) throw err;
//         console.log(results);
//     }
// );

// Insert new teacher
// connection.query(
//     `
//     INSERT INTO Teachers (TeacherID, FirstName, LastName, Subject)
//     VALUES (11, "Karel", "van Zijl", "Bootcamp");
// `,
//     function (err, results, fields) {
//         if (err) throw err;
//         console.log(results);
//     }
// );

// Update newly inserted teacher (id = 11)
// connection.query(
//     `
//     UPDATE Teachers
//     SET Subject="Coding Bootcamp"
//     WHERE TeacherID=11;
// `,
//     function (err, results, fields) {
//         if (err) throw err;
//         console.log(results);
//     }
// );

// Delete teacher with id 11
// connection.query(
//     `
//     DELETE
//     FROM Teachers
//     WHERE TeacherID=11;
// `,
//     function (err, results, fields) {
//         if (err) throw err;
//         console.log(results);
//     }
// );

// Get all teachers
// connection.query(`SELECT * FROM Teachers;`, function (err, results, fields) {
//     if (err) throw err;
//     console.log(results);
// });
