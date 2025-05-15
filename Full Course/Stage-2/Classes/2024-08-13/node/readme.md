# Task

### Code from class

See [game.js](game.js)

### Number Guessing Game

1. **Welcome message**

    - Show a welcome message. This welcome message is only shown 1 time when the program is started. It doesn't show when the user decided to play another game _(see point 9)_.

2. **Generate a Random Number:**

    - The program will generate a random number between a specified range (e.g., 1 to 100).
    - This can be done using `Math.random()` and `Math.floor()`.

3. **User Input:**

    - The program will prompt the user to guess the number.
    - The input should be validated to ensure it is a number within the specified range.

4. **Provide Feedback:**

    - After each guess, the program should tell the user if their guess is too high, too low, or correct.
    - If the guess is incorrect, the user should be prompted to guess again.

5. **Track Number of Attempts:**

    - The program should keep track of the number of attempts the user makes to guess the correct number.

6. **End Game:**

    - When the user guesses the correct number, the program should congratulate them and display the number of attempts it took.
    - The program should then ask if the user wants to play again or exit. By typing `yes`, the game restarts.
      Remember: No welcome message is shown.

7. **Replay or Exit:**

    - If the user chooses to play again, the game should start over, but the program should continue to remember the number of attempts from previous games.
    - If the user chooses to exit, the program should display a final message and terminate.

8. **Remember Attempts:**

    - The program should store the number of attempts made in each game session.
    - These attempts should be remembered across multiple games within the same session.

9. **Calculate and Display Average Attempts:**

    - After each game session (i.e., after the user guesses the correct number), the program should calculate the average number of attempts it took to guess the correct number across all games in the session.
    - This average should be displayed to the user as part of the end game message.

### Key Concepts Reinforced

-   **Input Validation:** Ensures the user enters a valid number within the range.
-   **Loops and Conditionals:** Used for repeatedly prompting the user and providing feedback.
-   **Random Number Generation:** Introduces the concept of randomness in programming.
-   **Recursion:** The program uses recursion by calling `guessNumber()` repeatedly until the user guesses the correct number.
-   **Basic String Handling:** The program will require handling and comparing strings for the "play again" feature.

# Example code

See [random_number.js](random_number.js)

## Code explanation

This is a game where the computer randomly picks a number between 1 and 100. Your job is to guess that number. The game will tell you if your guess is too high, too low, or correct. It also keeps track of how many guesses (attempts) you made and shows your average attempts after each round.

### Detailed Explanation

1. **Setting Up the Game:**

    ```javascript
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    ```

    - The `readline` module allows you to interact with the user through the terminal. It helps the program ask questions and get input from the user.

2. **Variables:**

    ```javascript
    let randomNumber;
    let attempts = 0;
    let attemptHistory = [];
    ```

    - `randomNumber`: This will store the random number that the computer picks for you to guess.
    - `attempts`: This keeps track of how many guesses you’ve made in the current game.
    - `attemptHistory`: This array stores the number of attempts it took for each round, so we can calculate the average later.

3. **Starting the Game:**

    ```javascript
    function initializeGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;

        if (attemptHistory.length === 0) {
            console.log("Welcome to the Number Guessing Game!");
            console.log("I have selected a number between 1 and 100.");
            console.log("Can you guess what it is?");
            console.log("");
        } else {
            console.log("");
        }

        guessNumber();
    }
    ```

    - `randomNumber = Math.floor(Math.random() * 100) + 1;`: This line generates a random number between 1 and 100.
    - If this is the first time you're playing (i.e., the `attemptHistory` is empty), the program gives you a welcome message and instructions. Otherwise, it skips the welcome message.

4. **Guessing the Number:**

    ```javascript
    function guessNumber() {
        readline.question("Enter your guess: ", function (input) {
            const guess = parseInt(input);
            attempts++;
    ```

    - The program asks you to enter your guess.
    - It then converts your input from text (a string) into a number using `parseInt`.
    - Each time you guess, it increases the `attempts` count by 1.

5. **Validating Your Guess:**

    ```javascript
    if (isNaN(guess) || guess < 1 || guess > 100) {
        console.error("Please enter a number between 1 and 100.");
        console.log("");
        guessNumber();
    }
    ```

    - The program checks if your input is a valid number between 1 and 100.
    - If you enter something invalid (like a letter or a number out of range), it asks you to try again.

6. **Providing Feedback:**

    ```javascript
    else {
        if (guess < randomNumber) {
            console.log("Too low! Try again.");
            console.log("");
            guessNumber();
        } else if (guess > randomNumber) {
            console.log("Too high! Try again.");
            console.log("");
            guessNumber();
        } else {
            console.log("");
            console.log("Congratulations!!!");
            console.log(
                "You've guessed the number in " + attempts + " attempts."
            );
    ```

    - The program compares your guess with the correct number:
        - If your guess is too low, it tells you "Too low! Try again."
        - If your guess is too high, it tells you "Too high! Try again."
        - If you guess correctly, it congratulates you and tells you how many attempts it took.

7. **Storing and Calculating Attempts:**

    ```javascript
    attemptHistory.push(attempts);

    const averageAttempts = calculateAverage(attemptHistory);
    console.log(
        "Your average number of attempts is: " + averageAttempts.toFixed(2)
    );
    console.log("");
    ```

    - After you guess the number correctly, the program stores your attempts in the `attemptHistory` array.
    - It then calculates the average number of attempts across all rounds you’ve played using the `calculateAverage` function.
    - The average is displayed with two decimal places.

8. **Calculating the Average:**

    ```javascript
    function calculateAverage(attemptsArray) {
        const sum = attemptsArray.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sum / attemptsArray.length;
    }
    ```

    - This function adds up all the attempts from each game (using `reduce` to sum them up) and then divides by the number of games to find the average.

9. **Playing Again or Quitting:**

    ```javascript
    function playAgain() {
        readline.question(
            "Do you want to play again? (yes/no): ",
            function (input) {
                if (input.toLowerCase() === "yes") {
                    attempts = 0;
                    initializeGame();
                } else {
                    console.log("Thanks for playing! Goodbye.");
                    readline.close();
                }
            }
        );
    }
    ```

    - After the game, the program asks if you want to play again.
    - If you say "yes", it resets the `attempts` counter to 0 and starts a new game.
    - If you say "no", the program thanks you and ends the session.

10. **Starting the First Game:**
    ```javascript
    initializeGame();
    ```
    - Finally, the `initializeGame()` function is called to start the game for the first time.

### Summary

In simple terms, this code creates a fun game where you try to guess a random number the computer has picked. It keeps track of how many guesses you needed, shows you your progress, and lets you play again if you want. Each round, it also calculates how well you’re doing by showing your average number of attempts across all the games you’ve played.

# The `reduce` method

The `reduce` method is a powerful array method in JavaScript that processes each element in an array and reduces it to a single value (e.g., sum, product, average). It applies a callback function to an accumulator and each element in the array (from left to right), reducing the array to a single output value.

### Components of `reduce`

1. **Callback Function (`(a, b) => a + b`)**:

    - The callback function takes two arguments:
        - `a` (also called the accumulator): This is the accumulated value from the previous iteration.
        - `b` (also called the current value): This is the current element in the array that is being processed.
    - The function `a + b` adds the current value `b` to the accumulator `a`.

2. **Initial Value (`0`)**:
    - This is the initial value of the accumulator (`a`) before the `reduce` method starts iterating through the array. In this case, it's set to `0` because we're summing the values, so we start with zero.

### How It Works

Let's break down the process with an example. Suppose `attemptsArray` is `[3, 5, 2]`, which represents the number of attempts in three different games.

-   **Iteration 1**:

    -   `a` (initial value) = 0
    -   `b` (first element in array) = 3
    -   Result after this iteration: `0 + 3 = 3`

-   **Iteration 2**:

    -   `a` (result from previous iteration) = 3
    -   `b` (second element in array) = 5
    -   Result after this iteration: `3 + 5 = 8`

-   **Iteration 3**:
    -   `a` (result from previous iteration) = 8
    -   `b` (third element in array) = 2
    -   Result after this iteration: `8 + 2 = 10`

After all iterations, the `reduce` method returns `10`, which is the sum of all elements in `attemptsArray`.

### Final Output

-   The `reduce` method returns the sum of all numbers in the array, which is then stored in the `sum` variable.

So, in the code

```JS
const sum = attemptsArray.reduce(function(a, b) {
    return a + b
}, 0);

return sum / attemptsArray.length;
```

the `reduce` method iterates through the `attemptsArray`, adds up all the elements, and stores the total sum in the `sum` variable. This sum is then used to calculate the average number of attempts.
