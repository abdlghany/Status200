const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
const db = require("mysql2").createConnection({
    host: "localhost",
    user: "root",
    database: "bootcamp-numbergame2",
});
const validator = require("validator");

let player = {};
let fullname;
let city;
let username;
let password;
let fieldToUpdate;
let game = {};
let gameNumber;
let gameAttemps;

function initialize() {
    // Welcome message
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("~                                      ~");
    console.log("~         Number Guessing Game!        ~");
    console.log("~                                      ~");
    console.log("~                Welcome               ~");
    console.log("~                                      ~");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("");
    topScores("auth");
}

function authMenu() {
    console.log("");
    console.log("----------------------------------------");
    console.log("-              Auth Menu               -");
    console.log("----------------------------------------");
    console.log("");
    console.log("Choose an option:");
    console.log("");
    console.log("(L) - login");
    console.log("(R) - register");
    console.log("");
    console.log("(X) - quit");

    // Ask for user choice
    readline.question("\nYour choice: ", (input) => {
        const choice = input.toLocaleLowerCase();

        if (choice === "l") {
            console.log("");
            console.log("----------------------------------------");
            console.log("-                Login                 -");
            console.log("----------------------------------------");
            return loginUsername();
        }
        if (choice === "r") {
            console.log("");
            console.log("----------------------------------------");
            console.log("-             Registration             -");
            console.log("----------------------------------------");
            return registerFullname();
        }
        if (choice === "x") {
            return quit();
        }

        console.error("\nYou can only choose `L`, `R` or `X`");
        authMenu();
    });
}

function registerFullname() {
    // Ask for user input
    readline.question("\nYour fullname: ", (input) => {
        fullname = input;
        if (!validator.isAlpha(fullname, "en-US", { ignore: " -" })) {
            console.error("\nFullname can:\n");
            console.error("- not be empty");
            console.error("- contain alphabet letters (a-z)");
            console.error("- contain spaces");
            console.error("- contain dashes");
            return registerFullname();
        }
        registerCity();
    });
}

function registerCity() {
    // Ask for user input
    readline.question("\nYour city: ", (input) => {
        city = input;
        if (!validator.isAlpha(city, "en-US", { ignore: " -" })) {
            console.error("\nCity can:\n");
            console.error("- not be empty");
            console.error("- contain alphabet letters (a-zA-Z)");
            console.error("- contain spaces");
            console.error("- contain dashes");
            return registerCity();
        }
        registerUsername();
    });
}

function registerUsername() {
    // Ask for user input
    readline.question("\nYour username (used also as nickname): ", (input) => {
        username = input;
        if (!validator.isAlphanumeric(username.toLowerCase(), "en-US")) {
            console.error("\nUsername can:\n");
            console.error("- not be empty");
            console.error("- contain alphabet letters (a-zA-Z)");
            console.error("- contain numbers (0-9)");
            return registerUsername();
        }
        db.query(
            `SELECT id FROM players WHERE username='${username.toLowerCase()}';`,
            (err, result) => {
                if (err) throw err;

                // Already a user with this username
                if (result.length > 0) {
                    console.error("\nUsername already taken\n");
                    return registerUsername();
                }
            }
        );
        registerPassword();
    });
}

function registerPassword() {
    // Ask for user input
    readline.question("\nYour password: ", (input) => {
        password = input;
        if (!validator.isAlphanumeric(password, "en-US")) {
            console.error("\nPassword can:\n");
            console.error("- not be empty");
            console.error("- contain alphabet letters (a-zA-Z)");
            console.error("- contain numbers (0-9)");
            return registerPassword();
        }
        db.query(
            `INSERT INTO players (fullname, city, username, password) VALUES ('${fullname}', '${city}', '${username}', '${password}')`,
            (err) => {
                if (err) throw err;
                console.log("\n\n# YOUR REGISTRATION WAS SUCCESSFUL\n");
                authMenu();
            }
        );
    });
}

function loginUsername() {
    // Ask for user input
    readline.question("\nUsername: ", (input) => {
        username = input;
        if (!validator.isAlphanumeric(username.toLowerCase(), "en-US")) {
            console.error("\nUsername can:\n");
            console.error("- not be empty");
            console.error("- contain alphabet letters and numbers (a-zA-Z0-9)");
            return loginUsername();
        }
        loginPassword();
    });
}

function loginPassword() {
    // Ask for user input
    readline.question("\nPassword: ", (input) => {
        password = input.toLowerCase();
        if (!validator.isAlphanumeric(password, "en-US")) {
            console.error("\nUsername can:\n");
            console.error("- not be empty");
            console.error("- contain alphabet letters and numbers (a-zA-Z0-9)");
            return loginPassword();
        }
        db.query(
            `SELECT * FROM players WHERE username='${username}' AND password='${password}';`,
            (err, result) => {
                if (err) throw err;

                if (result.length === 0) {
                    console.error("\nLogin failed. Try again\n");
                    return authMenu();
                }
                if (result.length > 1) {
                    console.error("\nUSomething went wrong. Try again\n");
                    return authMenu();
                }

                player = result[0];
                console.log("\n\n# WELCOME");
                playerMenu();
            }
        );
    });
}

function playerMenu() {
    game = {};
    gameAttemps = 0;
    gameNumber = 0;

    console.log("");
    console.log("----------------------------------------");
    console.log("-            Player Menu               -");
    console.log("----------------------------------------");
    console.log("");
    console.log(`Choose an option ${player.username}:`);
    console.log("");
    console.log("(1) - my game history");
    console.log("(2) - start new game");
    console.log("(3) - top scores");
    console.log("");
    console.log("(U) - update profile");
    console.log("(D) - delete acocunt");
    console.log("");
    console.log("(X) - quit");

    // Ask for user choice
    readline.question("\nYour choice: ", (input) => {
        if (input == "1") {
            console.log("");
            console.log("----------------------------------------");
            console.log("-               History                -");
            console.log("----------------------------------------");
            return playerHistory();
        }
        if (input == "2") {
            console.log("");
            console.log("----------------------------------------");
            console.log("-               New Game               -");
            console.log("-                                      -");
            console.log("-         New Number Generated         -");
            console.log("-                                      -");
            console.log("-          Between 1 and 100           -");
            console.log("----------------------------------------");
            return initGame();
        }
        if (input == "3") {
            console.log("");
            return topScores();
        }
        if (input.toLocaleLowerCase() === "u") {
            console.log("");
            console.log("----------------------------------------");
            console.log("-            Update Profile            -");
            console.log("----------------------------------------");
            return playerUpdateProfile();
        }
        if (input.toLocaleLowerCase() === "d") {
            console.log("");
            console.log("----------------------------------------");
            console.log("-            Delete Account            -");
            console.log("----------------------------------------");
            return playerDeleteAccount();
        }
        if (input.toLocaleLowerCase() === "x") {
            return quit();
        }

        console.error("\nYou can only choose `L`, `R` or `X`");
        return playerMenu();
    });
}

function playerHistory() {
    console.log("");
    db.query(
        `SELECT ga.created_at, count(gu.id) AS attempts
        FROM games AS ga
        RIGHT JOIN guesses AS gu ON gu.game_id=ga.id
        WHERE ga.player_id=${player.id}
        GROUP BY ga.id, ga.created_at
        HAVING count(gu.id) > 0
        ORDER BY ga.created_at DESC;
    `,
        (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                console.log("You haven't played any games yet.");
                return playerMenu();
            } else {
                const totalAttemps = results.reduce((a, b) => {
                    return a + b.attempts;
                }, 0);
                const averageAttemps = totalAttemps / results.length;

                console.log(
                    `It takes you ${averageAttemps.toFixed(
                        2
                    )} attempt(s) on average to guess the number\n`
                );

                results.forEach((result) => {
                    // Create a Date object
                    let date = new Date(result.created_at);

                    // Extract the components you need
                    let day = date.toDateString(); // This will give "Sat Aug 17 2024"
                    let time = date.toTimeString().split(" ")[0]; // This will give "13:52:01"

                    // Combine the components
                    let formattedDateTime = `${day} ${time}`;

                    console.log(
                        `${formattedDateTime}: ${result.attempts} attemp(s)`
                    );
                });
                return playerMenu();
            }
        }
    );
}

function initGame() {
    gameNumber = Math.floor(Math.random() * 100) + 1;
    gameAttemps = 0;
    game = {};
    db.query(
        `INSERT INTO games (player_id, random) VALUES (${player.id}, ${gameNumber});`,
        (err, result) => {
            if (err) throw err;
            db.query(
                `SELECT * FROM games WHERE player_id=${player.id} ORDER BY id DESC LIMIT 1`,
                (err, result) => {
                    if (err) throw err;
                    game = result[0];
                    return playerPlayGame();
                }
            );
        }
    );
}

function playerPlayGame() {
    readline.question("\nEnter your guess: ", (input) => {
        if (!validator.isInt(input, { gt: 0, lt: 101 })) {
            console.error("\nPlease enter a number between 1 and 100:\n");
            return playerPlayGame();
        }
        gameAttemps++;
        const number = parseInt(input);
        return db.query(
            `INSERT INTO guesses (game_id, guess) VALUES (${game.id}, ${number})`,
            (err) => {
                if (err) throw err;
                if (number < gameNumber) {
                    console.log("Too low! Try again.");
                    return playerPlayGame();
                }
                if (number > gameNumber) {
                    console.log("Too high! Try again.");
                    return playerPlayGame();
                }
                if (number === gameNumber) {
                    console.log("\n************************");
                    console.log("  ********************  ");
                    console.log("    ****************    ");
                    console.log("      ************      ");
                    console.log("        ********        ");
                    console.log("");
                    console.log("    CONGRATULATIONS     ");
                    console.log("");
                    console.log("        ********        ");
                    console.log("      ************      ");
                    console.log("    ****************    ");
                    console.log("  ********************  ");
                    console.log("************************");
                    console.log("");
                    console.log(
                        "You've guessed the number in " +
                            gameAttemps +
                            " attempt(s)."
                    );
                    console.log("");

                    db.query(
                        `SELECT ga.created_at, count(gu.id) AS attempts
                        FROM games AS ga
                        RIGHT JOIN guesses AS gu ON gu.game_id=ga.id
                        WHERE ga.player_id=${player.id}
                        GROUP BY ga.id, ga.created_at
                        HAVING count(gu.id) > 0
                        ORDER BY ga.created_at DESC;
                    `,
                        (err, results) => {
                            if (err) throw err;
                            const totalAttemps = results.reduce((a, b) => {
                                return a + b.attempts;
                            }, 0);
                            const averageAttemps =
                                totalAttemps / results.length;

                            console.log(
                                `It takes you ${averageAttemps.toFixed(
                                    2
                                )} attemp(s) on average to guess the number\n`
                            );
                            return playerMenu();
                        }
                    );
                }
            }
        );
    });
}

function topScores(next) {
    db.query(
        `
        SELECT p.id, p.username, COUNT(gu.id) AS attempts
        FROM players AS p
        RIGHT JOIN games AS ga ON ga.player_id=p.id
        RIGHT JOIN guesses AS gu ON gu.game_id=ga.id
        GROUP BY ga.id, p.id
        ORDER BY attempts ASC;
    `,
        (err, results) => {
            if (err) throw err;
            let bestAttempts = 999999999;
            let bestPlayer = null;
            let bestCounter = 0;

            console.log("----------------------------------------");
            console.log("-            Top Scores                -");
            console.log("----------------------------------------");
            console.log("");

            results.forEach((result) => {
                if (result.id != bestPlayer && bestCounter < 10) {
                    bestAttempts = result.attempts;
                    bestPlayer = result.id;
                    bestCounter++;
                    console.log(
                        `${bestAttempts} attempt(s) - ${result.username}`
                    );
                }
            });

            db.query(
                `
                SELECT p.id, p.username, COUNT(gu.guess) / COUNT(DISTINCT ga.id) AS average
                FROM games AS ga
                JOIN guesses AS gu ON gu.game_id=ga.id
                JOIN players p ON p.id=ga.player_id
                GROUP BY p.id, p.username;
            `,
                (err, results) => {
                    if (err) throw err;
                    console.log("");
                    console.log("----------------------------------------");
                    console.log("-          Top Average Score           -");
                    console.log("----------------------------------------");
                    console.log("");

                    let bestCounter = 0;
                    results.forEach((result) => {
                        if (bestCounter < 10) {
                            bestCounter++;
                            avg = parseFloat(result.average);
                            console.log(
                                `${avg.toFixed(2)} avg attempt(s) - ${
                                    result.username
                                }`
                            );
                        }
                    });

                    if (next === "auth") {
                        return authMenu();
                    }
                    return playerMenu();
                }
            );
        }
    );
}

function playerUpdateProfile() {
    console.log("");
    console.log("Profile:");
    console.log("");
    console.log(`- Name: ${player.fullname}`);
    console.log(`- City: ${player.city}`);
    console.log(`- Username: ${player.username}`);
    console.log(`- Password: ******`);
    console.log("");
    console.log("Choose an option:");
    console.log("");
    console.log("(1) - change name");
    console.log("(2) - change city");
    console.log("(3) - change username");
    console.log("(4) - change password");
    console.log("");
    console.log("(M) - back to player menu");
    console.log("");
    console.log("(X) - quit");

    // Ask for user choice
    readline.question("\nYour choice: ", (input) => {
        if (input == "1") {
            fieldToUpdate = "fullname";
            return playerUpdateField();
        }
        if (input == "2") {
            fieldToUpdate = "city";
            return playerUpdateField();
        }
        if (input == "3") {
            fieldToUpdate = "username";
            return playerUpdateField();
        }
        if (input == "4") {
            fieldToUpdate = "password";
            return playerUpdateField();
        }
        if (input.toLowerCase() === "m") {
            return playerMenu();
        }
        if (input.toLowerCase() === "x") {
            return quit();
        }

        console.error("\nYou can only choose `1`, `2`, `3`, `4`, `M` or `X`");
        return authMenu();
    });
}

function playerUpdateField() {
    console.log("");
    console.log("----------------------------------------");
    console.log(`- Update ${fieldToUpdate}`);
    console.log("----------------------------------------");
    console.log("");
    readline.question("Enter new " + fieldToUpdate + ": ", (input) => {
        let value;
        if (fieldToUpdate === "fullname" || fieldToUpdate === "city") {
            value = input;
            if (!validator.isAlpha(value, "en-US", { ignore: " -" })) {
                console.error("\n" + fieldToUpdate + " can:\n");
                console.error("- not be empty");
                console.error("- contain alphabet letters (a-z)");
                console.error("- contain spaces");
                console.error("- contain dashes");
                return playerUpdateField();
            }
        } else {
            value = input;
            let validateValue = value;
            if (fieldToUpdate === "username") {
                validateValue = value.toLowerCase();
            }
            if (!validator.isAlphanumeric(validateValue, "en-US")) {
                console.error("\n" + fieldToUpdate + " can:\n");
                console.error("- not be empty");
                console.error("- contain alphabet letters (a-zA-Z)");
                console.error("- contain numbers (0-9)");
                return playerUpdateField();
            }
            value = input;
        }
        db.query(
            `UPDATE players SET ${fieldToUpdate}='${value}' WHERE id=${player.id};`,
            (err) => {
                if (err) throw err;
                player[fieldToUpdate] = value;
                console.log("\n\n# UPDATE SUCCESSFUL\n");
                return playerUpdateProfile();
            }
        );
    });
}

function playerDeleteAccount() {
    // Ask for user choice
    readline.question(
        "\nAre you sure you want to delete your account (yes/no)? ",
        (input) => {
            if (input.toLocaleLowerCase() !== "yes") {
                return playerMenu();
            }
            db.query(`DELETE FROM players WHERE id=${player.id};`, (err) => {
                if (err) throw err;
                player = {};
                console.log("\n\n# Your account has been deleted\n");
                return authMenu();
            });
        }
    );
}

function quit() {
    readline.close();
    db.end();
    process.exit();
}

initialize();
