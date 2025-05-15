const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let randomNumber;
let attempts = 0;
let attemptHistory = [];

function initializeGame() {
    // Welcome message
    console.log("Welcome to the Number Guessing Game!");
    console.log("I have selected a number between 1 and 100.");
    console.log("Can you guess what it is?");

    // Start the guessing game
    startGame();
}

function startGame() {
    // Generate a random number between 1 and 100
    randomNumber = Math.floor(Math.random() * 5) + 1;

    // Add empty line
    console.log("");
    console.log("----------------------------------------------");
    console.log("Random number generated. Let's start guessing!");
    console.log("----------------------------------------------");

    // Start guessing
    guessNumber();
}

function guessNumber() {
    // Empty line for readablity
    console.log("");

    // Ask the user to enter a guess
    readline.question("Enter your guess: ", function (input) {
        // Convert the input to a number
        const guess = parseInt(input);

        // Increment the number of attempts
        attempts++;

        // Validate the input
        if (isNaN(guess) || guess < 1 || guess > 100) {
            // Provide feedback if the input is invalid
            console.error("Please enter a number between 1 and 100.");
            guessNumber();
        } else {
            // Provide feedback based on the guess
            if (guess < randomNumber) {
                console.log("Too low! Try again.");
                guessNumber();
            } else if (guess > randomNumber) {
                console.log("Too high! Try again.");
                guessNumber();
            } else {
                console.log("");
                console.log("Congratulations!!!");
                console.log(
                    "You've guessed the number in " + attempts + " attempts."
                );

                // Store the number of attempts in the history array
                attemptHistory.push(attempts);

                // Calculate the average attempts
                const averageAttempts = calculateAverage(attemptHistory);
                console.log(
                    "Your average number of attempts is: " +
                        averageAttempts.toFixed(2)
                );

                // Ask the user if they want to play again
                playAgain();
            }
        }
    });
}

function calculateAverage(attemptsArray) {
    const sum = attemptsArray.reduce(function (a, b) {
        return a + b;
    }, 0);
    return sum / attemptsArray.length;
}

function playAgain() {
    // Empty line for readablity
    console.log("");

    // Ask the user if they want to play again
    readline.question(
        "Do you want to play again? (yes/no): ",
        function (input) {
            if (input.toLowerCase() === "yes") {
                // Reset the number of attempts and start a new game
                attempts = 0;
                startGame();
            } else {
                // Exit the game
                console.log("Thanks for playing! Goodbye.");
                readline.close();
            }
        }
    );
}

// Start the game
initializeGame();
