// Create readline interface
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Import mysql2 package / module
const mysql = require("mysql2");

// Create a connection with the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bootcamp-numbergame",
});

// Verify if connection was established successfully
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        // console.log("Connected to the MySQL database successfully!");
    }
});

console.log(`
    Hi there, what would you like to do?
    ----------------------------------------------------
    (1) Create tables
    (2) Insert data
    (3) Update data (player with ID 1)
    (4) Delete data (player with ID 1)
    (5) Show all players with the number of games played

    (x) Quit
    ----------------------------------------------------
`);

readline.question(
    `
    Enter the number of your choice: 
`,
    (input) => {
        if (input == 1) {
            createTables();
        }
        if (input == 2) {
            insertData();
        }
        if (input == 3) {
            updateData();
        }
        if (input == 4) {
            deleteData();
        }
        if (input == 5) {
            showData();
        }
        if (input.toLocaleLowerCase() == "x") {
            quitApp();
        }
    }
);

const createTables = () => {
    // Create players table
    connection.query(
        `
        CREATE TABLE Players (
            player_id INT AUTO_INCREMENT PRIMARY KEY,
            player_name VARCHAR(100),
            player_city VARCHAR(100)
        );
    `,
        (err, results) => {
            if (err) throw err;
            console.log(results);
        }
    );

    // Create games table
    connection.query(
        `
        CREATE TABLE Games (
            game_id INT AUTO_INCREMENT PRIMARY KEY,
            player_id INT,
            game_score INT DEFAULT 0,
            FOREIGN KEY (player_id) 
                REFERENCES Players(player_id) 
                ON DELETE CASCADE
        );  
    `,
        (err, results) => {
            if (err) throw err;
            console.log(results);
            quitApp();
        }
    );
};

const insertData = () => {
    // Insert player data
    connection.query(
        `
        INSERT INTO Players (player_name, player_city)
        VALUES 
            ("Karel van Zijl", "Kuala Lumpur"),
            ("John Doe", "Malacca"),
            ("Jane Doe", "George Town");
    `,
        (err, results) => {
            if (err) throw err;
            console.log(results);
        }
    );

    // Insert games date
    connection.query(
        `
        INSERT INTO Games (player_id, game_score)
        VALUES 
            (1, 5),
            (1, 8),
            (1, 4),
            (2, 2),
            (2, 6),
            (2, 10),
            (2, 8),
            (2, 7);
    `,
        (err, results) => {
            if (err) throw err;
            console.log(results);
            quitApp();
        }
    );
};

const updateData = () => {
    connection.query(
        `
        UPDATE Players
        SET player_city="Den Haag"
        WHERE player_id=1;
    `,
        (err, result) => {
            if (err) throw err;
            console.log(result);
            quitApp();
        }
    );
};

const deleteData = () => {
    connection.query(
        `
        DELETE 
        FROM Players
        WHERE player_id=1;
    `,
        (err, result) => {
            if (err) throw err;
            console.log(result);
            quitApp();
        }
    );
};

const showData = () => {
    // Get all players and their total number of games player
    connection.query(
        `
    SELECT 
        p.player_name AS Player, 
        p.player_city AS City,
        COUNT(g.game_id) AS "Games played"
    FROM Players AS p
    LEFT JOIN Games AS g ON g.player_id=p.player_id
    GROUP BY p.player_id, p.player_city;
`,
        function (err, results) {
            if (err) throw err;
            console.log(results);
            quitApp();
        }
    );
};

const quitApp = () => {
    console.log(`Close connection & exit program`);
    connection.end();
    process.exit();
};
