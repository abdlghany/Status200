const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "abdalghany",
    password: "ohitsme",
    database:"PlayerDB"
});
var NAME = "";
var CITY = "";
var IDS = [];

/* var create_table_players = "CREATE TABLE players (player_id INT NOT NULL AUTO_INCREMENT , player_name VARCHAR(30) NOT NULL , player_city VARCHAR(20) NOT NULL , PRIMARY KEY (`player_id`))";
var create_table_games = "CREATE TABLE games (game_id INT NOT NULL AUTO_INCREMENT , player_id INT NOT NULL , score INT NOT NULL , PRIMARY KEY (game_id), FOREIGN KEY (player_id) REFERENCES players(player_id)); ";
//create the players table
connection.query(create_table_players, function(err, results){
console.log(results);
});
//create the games table
connection.query(create_table_games, function(err, results){
    console.log(results);
}); */


const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getPlayerName(){
    readline.question("What is your name?", function (name) {
        if(isNaN(name) && name && name != ""){
            if(name.length > 30){
                console.error("Your name cannot have more than 30 letters!");
            }else{
                NAME = name;
                getPlayerCity();
            }
        }
        else{
            console.error("Your name cannot be empty!");
            getPlayerName();
        }
    });
}
function getPlayerCity(){
    readline.question("What city are you from?", function (city) {
        if(isNaN(city) && city && city != ""){
            if(city.length > 20){
                console.error("Your city name cannot have more than 20 letters!");
            }else{
                CITY = city;
                populatePlayersTable();
            }
        }
        else{
            console.error("Your city's name cannot be empty!");
            getPlayerCity();
        }
    });
}

function populatePlayersTable(){
    connection.query("INSERT INTO players values (NULL,?,?)",[NAME, CITY], function(err, results){
        if(results.affectedRows > 0){
            console.log("Name saved successfully!");
            getLastSavedID();
        }
        });
}
function getLastSavedID(){
    connection.query("SELECT player_id as id from players order by player_id DESC limit 1", function(err, results){
        if(results){
            startGame(results[0].id);
        }
        });
    
}
function startGame(id){
    readline.question("What score would you like to have?\n", function (score) {
        score = parseInt(score);
        console.log("Nice score! : "+score);
        if(!isNaN(score) && score != "" && score > 0){
            connection.query("insert into GAMES values(NULL, ?, ?)",[id, score], function(err, results){
                if(results.affectedRows > 0){
                    console.log("Score updated sucessfully!");
                    showPlayerNames();
                }
                else if (results.affectedRows == 0){
                    insertIntoGames(score, id);
                }
                else if(err){
                    console.log("An error happened while saving your score!");
                    showPlayerNames();
                }
                });
        }else{
            console.log("Your score must be a number that's higher than 0!");
            startGame(id);
        }
    });
}
function insertIntoGames(score, id){
    connection.query("INSERT INTO GAMES VALUES (NULL, ?,?)",[id,score], function(err, results){
        if(results){
            console.log("Score inserted sucessfully!");
            showPlayerNames();
        }
        else if (err){
            console.error("Error while saving your score!");
            startGame();
        }
        });
}
function endGame(){
    connection.end();
    readline.close();
}

function showPlayerNames(){
    connection.query("SELECT players.player_id as id, players.player_name as name, players.player_city as city, games.score as score from players join games on players.player_id = games.player_id", function(err, results){
        for(let i = 0; i<results.length; i++){
            console.log("\nID: " +results[i].id + " Name: "+results[i].name + " City: "+ results[i].city + " score: "+results[i].score);
            IDS.push(results[i].id);
        }
        });
    readline.question("\nWrite your ID if you see your name below or (No) if you don't.", function (answer) {
        if(answer.toLocaleLowerCase() == "no" || answer == "n" || answer == "N" ){
            getPlayerName();
        }
        else if(IDS.includes(parseInt(answer))){
            startGame(answer);
        }
        else{
            console.log("Please Enter a valid ID from the list.");
            showPlayerNames();
        }
    });
}

function showPastScores(){
    connection.query("SELECT players.player_id as id, players.player_name as name, players.player_city as city,games.score as score from players join games on players.player_id = games.player_id", function(err, results){
        for(let i = 0; i<results.length; i++){
            console.log("\nID: " +results[i].id + " Name: "+results[i].name + " City: "+ results[0].city + " Score: "+ results[i].score);
            runApp();
        }
        });
}

function deleteARecord(){
    //TO BE FILLED
}
function runApp(){
// Ask the user a question
readline.question("\nWould you like to play a game? (Y/N/)\nOR I to view past scores\nOR D to delete an existing score\n", function (answer) {
    if(answer.toLocaleLowerCase() == "yes" || answer == "y" || answer == "Y" ){
        showPlayerNames();
    }
    else if(answer.toLocaleLowerCase() == "i"){
        showPastScores();
    }
    else if(answer.toLocaleLowerCase() == "d"){
        deleteARecord();
    }
    else{
        console.log("Goodbye!");
        endGame();
    }
});
}


runApp();


