/* DATABASE TABLES:

CREATE TABLE `guessinggame`.`users` (`user_id` INT NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(50) NOT NULL , `nickname` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`user_id`)); 
CREATE TABLE `guessinggame`.`games` (`game_id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `score` INT NOT NULL , `start_time` DATETIME NOT NULL , `end_time` DATETIME NOT NULL , PRIMARY KEY (`game_id`), INDEX `users.user_id` (`user_id`)); 

users(user_id, user_name, nickname, password);
users(int, varchar, varchar, varchar);

games(game_id, user_id, score, start_time, end_time);
games(int, int, int, datetime,datetime);

MYSQL datetime format YYYY-MM-DD HH:MI:SS
*/

const { connect } = require("http2");
const mysql = require("mysql2");
const { clearScreenDown } = require("readline");
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
var numberOfGuesses = [];
//to start at index 0;
var numberOfGamesPlayed = -1;
var LoggedInUserID = -1;
function registerUsername(){
    readline.question("Please enter your username: ", function (input) {
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
    readline.question("Please enter your password: ", function (input) {
        input = input.trim();
        if(validateInputString(input) || validateInputNumber(input)){
            connection.query("SELECT user_name as username, password from users where user_name = ? AND password = ?",[username, input], function(err, results){
                if(err){
                    console.error("Error while connecting to the database!");
                }
                else if(results[0]){
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
    readline.question("Please enter your nickname: ", function (input) {
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
connection.query("INSERT INTO users VALUES (NULL,?,?,?,1)",[username, nickname, password], function(err, results){
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

function loginUsername(){
    readline.question("Please enter your username: ", function (input) {
        input = input.trim();
        if(validateInputString(input)){
            loginPassword(input);
        }
        else{
            console.log("Please enter a valid username (50 characters or less).");
            loginUsername();
        }
    });
}

function loginPassword(username){
    readline.question("Please enter your password: ", function (input) {
        input = input.trim();
        if(validateInputString(input) || validateInputNumber(input)){
            login(username, input);
        }
        else{
            console.log("Please enter a valid password (50 characters or less).");
            loginPassword();
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
            console.error("Wrong username or password, plaese try again or register a new account.");
            greet();
        }
    });
}
function summary(userId){
    connection.query("SELECT score, TIMESTAMPDIFF(MINUTE, start_time, end_time) AS difference_in_minutes from games where user_id = ?", [userId], function (err, results){
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
                    totalPlaytime  += parseInt(results[i].difference_in_minutes);
                }
                averageScore /= results.length;
                console.log("\nTotal games you've played: "+results.length + "\nYour average overall score: "+ averageScore + " attempts.");
                if(totalPlaytime > 60){
                    console.log("Total Playtime: "+ parseFloat(totalPlaytime/60).toFixed(2) + " hours");
                }
                else{
                    console.log("Total Playtime: "+totalPlaytime + " minutes");
                }
            }
            
        }
        else{
            console.error("Seems like you have no game history, please play a game first then view summary!");
        }
        mainMenu();
    });
}

function  mainMenu(userId){
    readline.question(
        `\n--------------------\nMain Menu\n--------------------
1: Summary of your past games
2: Start new game
u: Update account information
d: Delete account
x: Quit
--------------------\nYour selection: `, function (input) {
            input = input.trim().toLowerCase();
            if(validateInputString(input) || validateInputNumber(input)){
                if(input == 1){
                    summary(userId);
                }
                else if(input == 2){

                }
                else if(input == "u"){
                    updateAccountDetails(userId);
                }
                else if(input == "d"){
                    changeAccountStatus(userId, "GAMES", function (gamesStatus){
                        if(gamesStatus){
                          changeAccountStatus(userId, "users", function(usersStatus){
                            if(usersStatus){
                                console.log("Account deleted successfully.");
                                console.log("Sorry to see you go...Hope you enjoyed, Goodbye\n");
                                greet();
                            }
                            else{
                                console.error("Failed to delete your account, try again later.");
                                mainMenu();
                            }
                          });
                        }
                        else{
                            console.error("Failed to delete your account, try again later.");
                            mainMenu();
                        }
                    });  
                }
                else if(input == "x"){
                    console.log("Hope you enjoyed, Goodbye!");
                    connection.end();
                    readline.close();
                }
            }
            else{
                console.error("Please select a valid option!");
                mainMenu();
            }
    });
}
function updateAccountDetails(userId){
    readline.question("Select which of your account information you'd like to change: \nu: Username\nn: Nickname\np: Password\nx: Back to Main Menu", function(input){
        input = input.trim().toLowerCase();
        if(validateInputString(input)){
            if(input == "u"){
                newAccountInfo(userId, "user_name", "Username");
            }
            else if(input == "n"){
                newAccountInfo(userId, "nickname", "Nickname");
            }
            else if(input == "p"){
                newAccountInfo(userId, "password", "Password");
            }
            else if(input == "x"){
                mainMenu();
            }
            else{console.error("Please select a valid option.");}
        }
        else{
        console.error("Please select a valid option.");
        }
    });
}

function newAccountInfo(userId, dbColumnName, columnName){
    readline.question("Enter your new "+columnName+": ", function(newUsername){
        newUsername = newUsername.trim().toLowerCase();
        if(validateInputString(username)){
            connection.query("UPDATE USERS SET "+dbColumnName+" = ? where user_id = ?",[username, userId], function(err, results){
                if(err){console.error("An error happened while updating your "+columnName+", please try again later. " + err);}
                else if(results){console.log(columnName+" updated successfully");}
                else{}
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

function getNumber(){
    readline.question("Your guess: ", function (input) {
        if(validateInput(input)){
            input = parseInt(input);
            numberOfGuesses[numberOfGamesPlayed]++;
            if(input == NumberToGuess){
                console.log("Correct! Congratulations You won after "+numberOfGuesses[numberOfGamesPlayed]+" attempts.\nThe correct answer is: "+NumberToGuess);
                again();
            }
            else if(input > NumberToGuess){
                console.error("Try Lower!");
                getNumber();
            }
            else if (input < NumberToGuess){
                console.error("Try Higher!");
                getNumber();
            }
        }
        else{
            console.error("Please enter a valid number between "+min+" and "+max);
            getNumber();
        }
    });
}

function again(){
    var averageNoOfAttempts = 0;
    var numberOfGuessesMessage = "(";
            for(let i = 0; i< numberOfGuesses.length;i++){
                if(i == numberOfGuesses.length-1){
                    numberOfGuessesMessage += numberOfGuesses[i];
                }
                else{
                    numberOfGuessesMessage += numberOfGuesses[i]+", ";
                }
                averageNoOfAttempts += numberOfGuesses[i];
            }
    console.log("\nNumber of attempts it took you to win each past try: " + numberOfGuessesMessage+")" + " Total games played: "+(numberOfGamesPlayed+1));
    console.log("Average attempt count for all of your games so far: " + (averageNoOfAttempts / numberOfGuesses.length).toFixed(2));
    readline.question("\nWould you like to play again or to change min/max values? \nOptions are (yes/no/min/max) or anything else to Exit.\nYour choice: ", function (input) {
        if(input.toLowerCase() =="yes" || input =="y" || input =="Y"){
            generateNumber();
            getNumber();
        }
        else if(input.toLowerCase() == "min"){
            newMin();
        }
        else if(input.toLowerCase() == "max"){
            newMax();
        }
        else {
            console.log("Thanks for playing, see you soon!");
            readline.close();
        }
});
}

function generateNumber(){
     NumberToGuess = Math.floor(Math.random()* (max - min + 1)) + min;
     numberOfGamesPlayed++;
     numberOfGuesses[numberOfGamesPlayed] = 0;
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

function newMin(){
    readline.question("Enter a new \"min\" value: ", function (newMin) {
        if(validateInputNumber(newMin)){
            min = parseInt(newMin);
        }
        else{
            console.error("Please enter a valid number");
            newMin();
        }
    });
}

function newMax(){
    readline.question("Enter a new \"max\" value: ", function (newMax) {
        if(validateInputNumber(newMax)){
            max = parseInt(newMax);
        }
        else{
            console.error("Please enter a valid number");
            newMax();
        }
    });
}

function greet(){
    readline.question("--------------------\nWelcome to the number guessing Game!\n\nWould you like to register a new account? (register/R)\nOr Login? (login/L):\n", function (input) {
        input = input.toLowerCase().trim();
        if(validateInputString(input)){
            if(input == "register" || input == "r"){
                registerUsername();
            }
            else if(input == "login" || input == "l"){
                loginUsername();
            }
        }else{
            console.error("Please enter a valid option");
            greet();
        }
    });
}

function getCurrentDateTime(){
    //return DateTime MYSQL formatted and ready to be inserted:
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

greet();

function testDateTime(){
    const currentDatetime = getCurrentDateTime();
    const pastDateTime = "2024-08-16 23:08:15"

    //console.log(currentDate ,currentTime, pastDate, pastTime );
    connection.query("INSERT INTO GAMES VALUES (NULL, 1, ?,?,?)", [6,pastDateTime, currentDatetime], function(err, results){
        if(err){
            console.error("Error ", err);
        }
        if(results){
            console.log("Progress saved successfully!");
        }
        
    });
    
}

// testDateTime();


/* //generate a new "random" number.
generateNumber();
//get the input from the user.
getNumber(); */

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