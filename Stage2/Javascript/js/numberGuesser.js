const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

var max = 100;
var min = 0;
var NumberToGuess = 0;
var numberOfGuesses = [];
var numberOfGamesPlayed = -1;

function getNumber(){
    readline.question("Your guess: ", function (input) {
        if(validateInput(input)){
            numberOfGuesses[numberOfGamesPlayed]++;
            if(input == NumberToGuess){
                console.log("Correct! Congratulations You won after "+numberOfGuesses[numberOfGamesPlayed]+" attempts.\nThe correct answer is: "+NumberToGuess);
                printInfo();
                again();
            }
            else if(input > NumberToGuess){
                console.error("Too High!");
                getNumber();
            }
            else if (input < NumberToGuess){
                console.error("Too Low!");
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
    readline.question("Would you like to play again? (yes/no): ", function (input) {
        if(input.toLowerCase() =="yes" || input =="y" || input =="Y"){
            generateNumber();
            getNumber();
        }
        else {
            console.log("Thanks for playing, see you soon!");
            readline.close();
        }
});
}

function printInfo(){
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
            console.log("Number of attempts it took you to win each past try: " + numberOfGuessesMessage+")" + " Total games played "+(numberOfGamesPlayed+1)+"\n");
            console.log("Average attempt count for all of your games so far: " + (averageNoOfAttempts / numberOfGuesses.length).toFixed(2));
}

function validateInput(input){
    if(!isNaN(input) && input <= max && input >= min && input != "") return true;
    else return false;
}

function generateNumber(){
     NumberToGuess = Math.floor(Math.random()*(max));
     console.log("I have selected a number between "+min+" and "+max+"\nCan you guess what it is?");
     numberOfGamesPlayed++;
     numberOfGuesses[numberOfGamesPlayed] = 0;
}


//generate a new "random" number.
generateNumber();
//welcome message at the start of the game only.
console.log("Welcome to the number guessing Game!");
//get the input from the user.
getNumber();

// var biggestNumber = min-1;
// var smallestNumber = max+1;
// function testRandoms(){
//     for(let i = 0; i<max;i++){
//         var number = Math.floor(Math.random() * (max+1));
  
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