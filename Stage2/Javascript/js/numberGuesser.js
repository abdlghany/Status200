/* DATABASE TABLES:

CREATE TABLE `guessinggame`.`users` (`user_id` INT NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(50) NOT NULL , `nickname` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`user_id`)); 
CREATE TABLE `guessinggame`.`games` (`game_id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `score` INT NOT NULL , `start_time` DATETIME NOT NULL , `end_time` DATETIME NOT NULL , PRIMARY KEY (`game_id`), INDEX `users.user_id` (`user_id`)); 

users(user_id, user_name, nickname, password);
users(int, varchar, varchar, varchar);

games(game_id, user_id, score, start_time, end_time);
games(int, int, int, datetime,datetime);

MYSQL datetime format YYYY-MM-DD HH:MI:SS
*/

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "abdalghany",
    password: "ohitsme",
    database:"guessinggame"
});
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

var max = 100;
var min = 1;
var NumberToGuess = 0;
var numberOfGuesses = 0;
var gameStartDateTime;
//to start at index 0;

function registerUsername(){
    readline.question("Please enter a username: ", function (input) {
        input = input.trim();
        if(validateInputString(input)){
            registerPassword(input);
        }
        else{
            console.log("Please enter a valid username (50 characters or less).");
            registerUsername();
        }
    });
}

function registerPassword(username){
    readline.question("Please enter a password: ", function (input) {
        input = input.trim();
        if(validateInputString(input) || validateInputNumber(input)){
            connection.query("SELECT user_name as username, password from users where user_name = ? AND password = ?",[username, input], function(err, results){
                if(err){
                    console.error("Error while connecting to the database!");
                }
                else if(results[0]){
                    console.clear();
                    console.error("Your account already exists, please use the login function, or register using a new username.");
                    greet();
                }//account does not exist and no errors happened when querying the user details.
                else{
                    registerNickName(username, input);
                }
            });
        }
        else{
            console.log("Please enter a valid password (50 characters or less).");
            registerPassword(username);
        }
    });
}

function registerNickName(username, password){
    readline.question("Please enter a nickname: ", function (input) {
        input = input.trim();
        if(validateInputString(input)){
            registerToDB(username, password, input);
        }
        else{
            console.log("Please enter a valid nickname (50 characters or less).");
            registerNickName(username, password);
        }
    });
}

function registerToDB(username, password, nickname){
connection.query("INSERT INTO users VALUES (NULL,?,?,?)",[username, nickname, password], function(err, results){
    if(err){
        console.error("Something went wrong when accessing the database! " + err);
    }
    else if(results){
        console.log("Your account has been registered successfully.");
        //automatically login the user when they create an account for seamless experience.
        login(username, password);
    }
});
}

function getLoginInformation(username){
    var message = "Please enter your username: ";
    if(username){
        message = "Please enter your password: ";
    }
    readline.question(message, function (input) {
        input = input.trim();
        // if the input is not username, means it's password, so if username does not exist, means the input is "password"
        if( (!username && validateInputString(input)) || (username && (validateInputNumber(input) || validateInputString(input)))){
            if(username){
                login(username, input);
            }else{
                getLoginInformation(input);
            }
        }
        else if(username){
            console.log("Please enter a valid password (50 characters or less).");
            getLoginInformation(username);
        }
        else{
            console.log("Please enter a valid username (50 characters or less).");
            getLoginInformation();
        }
            
    });
}

function login(username, password){
    connection.query("SELECT user_id as id, user_name as username, password, nickname from users where user_name = ? AND password = ?",[username, password], function(err, results){
        if(err){console.error("Something went wrong when accessing the database!");}
        else if(results[0]){
            console.log("\nLogin Successful...\nWelcome "+results[0].nickname+"!");
            mainMenu(parseInt(results[0].id));
        }
        else{
            console.clear();
            console.error("Wrong username or password, plaese try again or register a new account.");
            greet();
        }
    });
}

function summary(userId){
    connection.query("SELECT score, TIMESTAMPDIFF(SECOND, start_time, end_time) AS difference_in_seconds from games where user_id = ?", [userId], function (err, results){
        if(err){console.error("Error while fetching your summary data. ", err);}
        else if(results){
            var averageScore = 0;
            var totalPlaytime  = 0;
            if(results.length == 0){
                console.error("You have no game history yet, please play a game first then view summary!");
            }
            else{
                for(let i = 0; i< results.length; i++){
                    averageScore += parseInt(results[i].score);
                    totalPlaytime  += parseInt(results[i].difference_in_seconds);
                }
                averageScore /= results.length;
                console.log("\n-------------------------- Summary --------------------------\nTotal games played: "+results.length + " game(s).\nYour average overall score: "+ averageScore.toFixed(2) + " attempt(s).");
                if(totalPlaytime > 60){
                    console.log("Total Playtime: "+ parseFloat(totalPlaytime/60).toFixed(2) + " minutes");
                }
                else if(totalPlaytime > 3600){
                    console.log("Total Playtime: "+ parseFloat(totalPlaytime/60/60).toFixed(2) + " hours");
                }
                else{
                    console.log("Total Playtime: "+totalPlaytime + " seconds");
                }
            }
        }
        else{
            console.error("Seems like you have no game history, please play a game first then view summary!");
        }
        mainMenu(userId);
    });
}

function  mainMenu(userId){
    //wait for scoreboard to finish printing before showing the main menu.
    scoreBoard("SELECT users.user_id as id, users.user_name as name, users.nickname as nickname, games.score as score from users join games on games.user_id = users.user_id ORDER BY score, nickname ASC",
        "\n-------------------------- Scoreboard (lower is better) --------------------------\n", function(){
            scoreBoard("SELECT users.user_id as id, users.user_name as name, users.nickname as nickname, AVG(games.score) as score from users join games on games.user_id = users.user_id group by id, name, nickname ORDER BY score, nickname ASC",
                "\n-------------------------- Averages Scoreboard (lower is better) --------------------------\n", function(){  
        readline.question(
            `\n-------------------------- Main Menu --------------------------\n1: Summary of your past games\n2: Start new game\nu: Update account information\nd: Delete account\nc: Clear screen\nx: Quit\n--------------------------\nYour selection: `, function (input) {
                input = input.trim().toLowerCase();
                if(validateInputString(input) || validateInputNumber(input)){
                    if(input == 1){
                        console.clear();
                        summary(userId);
                    }
                    else if(input == 2){
                        initiateGame(userId);
                    }
                    else if(input == "u"){
                        updateAccountDetails(userId);
                    }
                    else if(input == "d"){
                        changeAccountStatus(userId, "GAMES", function (gamesStatus){
                            if(gamesStatus){
                              changeAccountStatus(userId, "users", function(usersStatus){
                                if(usersStatus){
                                    console.clear();
                                    console.log("\nAccount deleted successfully.");
                                    console.log("Sorry to see you go...Hope you enjoyed, Goodbye.\n");
                                    greet();
                                }
                                else{
                                    console.error("Failed to delete your account, try again later.");
                                    mainMenu(userId);
                                }
                              });
                            }
                            else{
                                console.error("Failed to delete your account, try again later.");
                                mainMenu(userId);
                            }
                        });  
                    }
                    else if(input == "c"){
                        console.clear();
                        mainMenu(userId);
                    }
                    else if(input == "x"){
                        console.log("Hope you enjoyed, Goodbye!");
                        connection.end();
                        readline.close();
                    }
                }
                else{
                    console.error("Please select a valid option!");
                    mainMenu(userId);
                }
        });
    });});

}
function updateAccountDetails(userId){
    readline.question("Select which of your account information you'd like to change: \nu: Username\nn: Nickname\np: Password\nx: Back to Main Menu\nYour selection: ", function(input){
        input = input.trim().toLowerCase();
        if(validateInputString(input)){
            if(input == "u"){
                updateAccountInfo(userId, "user_name", "Username");
            }
            else if(input == "n"){
                updateAccountInfo(userId, "nickname", "Nickname");
            }
            else if(input == "p"){
                updateAccountInfo(userId, "password", "Password");
            }
            else if(input == "x"){
                mainMenu(userId);
            }
            else{console.error("Please select a valid option.");}
        }
        else{
        console.error("Please select a valid option.");
        }
    });
}

function updateAccountInfo(userId, dbColumnName, columnName){
    readline.question("Enter your new "+columnName+": ", function(newRowValue){
        newRowValue = newRowValue.trim().toLowerCase();
        if(validateInputString(username)){
            connection.query("UPDATE USERS SET "+dbColumnName+" = ? where user_id = ?",[username, userId], function(err, results){
                if(err){
                    console.error("An error happened while updating your "+columnName+", please try again later. " + err);
                }
                else if(results){
                    console.log(columnName+" updated successfully.\nYour new "+columnName+" is "+newRowValue+".");
                }
                else{
                    console.error("Something went wrong, please try again later.");
                }
            });
        }else{
            console.log("Please enter a valid username (50 characters or less).");
        }
    });
}

function changeAccountStatus(userId, table, callback){
    connection.query("DELETE FROM "+table+" WHERE user_id = ?",[userId], function (err, results){
        if(err){
            console.error("An error happened while connecting to the database. " + err);
            callback(false); // callback will return a value once the query has finished executing, return will not work here because of async -abd
        }
        else if(results){
            callback(true);
        }
        else{
            console.log("An error happened while deleting your account, please try again later.");
            callback(false);
        }
    });
}

function getNumber(userId){
    readline.question("Your guess: ", function (input) {
        if(validateInput(input)){
            input = parseInt(input);
            numberOfGuesses++;
            if(input == NumberToGuess){
                console.log("Correct! Congratulations You won after "+numberOfGuesses+" attempts.\nThe correct answer is: "+NumberToGuess);
                //stop the timer.
               const gameEndDateTime = getCurrentDateTime();
                connection.query("INSERT INTO GAMES VALUES (NULL, ?, ?,?,?)", [userId, numberOfGuesses, gameStartDateTime, gameEndDateTime], function(err, results){
                    if(err){
                        console.error("Error while saving your progress. "+err);
                    }
                    else if(results){
                        console.log("Progress saved successfully!");
                    }
                    else{
                        console.error("Error while saving your progress. "+err);
                    }
                    again(userId);
                });
            }
            else if(input > NumberToGuess){
                console.error("Lower!");
                getNumber(userId);
            }
            else if (input < NumberToGuess){
                console.error("Higher!");
                getNumber(userId);
            }
        }
        else{
            console.error("Please enter a valid number between "+min+" and "+max);
            getNumber(userId);
        }
    });
}

function again(userId){
    readline.question("\nWould you like to play again\n(yes/no)\nYour selection: ", function (input) {
        if(input.toLowerCase() =="yes" || input =="y" || input =="Y"){
            initiateGame(userId);
        }
        else {
            console.clear();
            mainMenu(userId);
        }
});
}
function initiateGame(userId){
     //reset the number of guesses.
    numberOfGuesses = 0;
    console.clear();
    //generate a new "random" number.
    generateNumber();
    //start the timer.
    gameStartDateTime = getCurrentDateTime();
    //get the input from the user.
    getNumber(userId);
}
function generateNumber(){
     NumberToGuess = Math.floor(Math.random()* (max - min + 1)) + min;
     console.log("I have selected a number between "+min+" and "+max+"\nCan you guess what it is?");
}

function validateInput(input){
    if(!isNaN(input) && input <= max && input >= min && input != "") return true;
    else return false;
}

function validateInputString(stringToValidate){
    if(stringToValidate != "" && stringToValidate.length <= 50 && isNaN(stringToValidate)){return true}
    else return false
}

function validateInputNumber(stringToValidate){
    if(stringToValidate != "" && stringToValidate.length <= 50 && !isNaN(stringToValidate)){return true}
    else return false
}

function greet(){
    readline.question("\nWould you like to register a new account? (Register/R)\nOr Login? (Login/L)\nYour slection:\n", function (input) {
        input = input.toLowerCase().trim();
        if(validateInputString(input)){
            if(input == "register" || input == "r"){
                registerUsername();
            }
            else if(input == "login" || input == "l"){
                getLoginInformation();
            }else{
                console.error("Please select a valid option");
                greet();
            }
        }else{
            console.error("Please select a valid option");
            greet();
        }
    });
}
//return DateTime MYSQL formatted and ready to be inserted:
function getCurrentDateTime(){
    const now = new Date();
    const year = now.getFullYear();
    //console.log(year);
    const month = String(now.getMonth() + 1).padStart(2, "0"); //add 0 to months if it's a single digit month (max 2 digits)
    //console.log(month);
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds);
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
}
function scoreBoard(query, message, callback){
connection.query(query, function(err, results){
    if(results[0]){
        var noOfLoops = 5;
        if(results.length < noOfLoops){ noOfLoops = results.length;}
        for(let i = 0; i < noOfLoops; i++){
            var score = parseInt(results[i].score).toFixed(2);
            message += parseInt(i+1) +". "+results[i].name + " (" +results[i].nickname + "): "+score + "\n"
        }
        console.log(message);
    }
    else{/* Do not show anything if there's no data. */}
    callback(true);
});
}
console.clear();
console.log("-------------------- Welcome to the number guessing Game! --------------------\n");
greet();

// Below commented code is to test the Math.random() limits, to select a valid formula for min-max based on variables
/* Note to future self: Comment the 3 function calls above this comment and uncomment 
the code below to test, change the values of min-max from the top as needed. */

/* var biggestNumber = min-1;
var smallestNumber = max+1;
function testRandoms(){
    for(let i = 0; i<max;i++){
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
  if(biggestNumber < number){
    biggestNumber = number;
  }
  if(smallestNumber > number){
    smallestNumber = number;
  }
}
console.log("Biggest number got out of "+max + " tries: " +biggestNumber);
console.log("Smallest number got out of "+max + " tries: " +smallestNumber);
readline.close();
}

testRandoms();
 */