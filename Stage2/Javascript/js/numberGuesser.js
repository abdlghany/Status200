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

function validateInput(input){
    if(!isNaN(input) && input <= max && input >= min && input != "") return true;
    else return false;
}

function generateNumber(){
     NumberToGuess = Math.floor(Math.random()* (max - min + 1)) + min;
     numberOfGamesPlayed++;
     numberOfGuesses[numberOfGamesPlayed] = 0;
     console.log("I have selected a number between "+min+" and "+max+"\nCan you guess what it is?");
}

function validateNumber(number){
    if(!isNaN(number)&& number != "") return true;
    else return false;
}

function newMin(){
    readline.question("Enter a new \"min\" value: ", function (newMin) {
        if(validateNumber(newMin)){
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
        if(validateNumber(newMax)){
            max = parseInt(newMax);
        }
        else{
            console.error("Please enter a valid number");
            newMax();
        }
    });
}
//generate a new "random" number.
generateNumber();
//welcome message at the start of the game only.
console.log("Welcome to the number guessing Game!");
//get the input from the user.
getNumber();

// Below commented code is to test the Math.random() limits, to select a valid formula for min-max based on variables
//Comment the 3 function calls above me and uncomment the code below to test, change the values of min-max from the top as needed.

// var biggestNumber = min-1;
// var smallestNumber = max+1;
// function testRandoms(){
//     for(let i = 0; i<max;i++){
//         var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
//   if(biggestNumber < number){
//     biggestNumber = number;
//   }
//   if(smallestNumber > number){
//     smallestNumber = number;
//   }
// }
// console.log("Biggest number got out of "+max + " tries: " +biggestNumber);
// console.log("Smallest number got out of "+max + " tries: " +smallestNumber);
// readline.close();
// }

// testRandoms();


