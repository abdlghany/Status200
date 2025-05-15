// Import the readline module
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Set some variables to store the operator, operands and the available operators
let operator;
let operands = [];
let operators = ["+", "-", "*", "/", "%", "^"];

function initialize() {
    // Print the available operators
    console.log("Available operators:");
    console.log("====================");

    // Loop through the operators and print them
    for (let i = 0; i < operators.length; i++) {
        console.log(i + 1 + ": " + operators[i]);
    }
    console.log("====================");
    console.log("");

    // Call the function to get the operator
    getOperator();
}

function getOperator() {
    // Ask the user to tell which operator they want to use
    readline.question("Which operatordo you want to use: ", function (input) {
        // Store the operator
        operator = input;
        // Input is invalid
        if (!validateInput(operator, 1, operators.length, "Operator")) {
            // Aask the user again
            getOperator();
        } else {
            // Call the function to get the operands
            getOperands();
        }
    });
}

function getOperands() {
    // Ask the user to give the operands
    readline.question(
        "Give operand " + (operands.length + 1) + " (must be a number): ",
        function (input) {
            // Store the operand
            const operand = parseFloat(input);
            // Input is invalid
            if (
                !validateInput(
                    operand,
                    -1000,
                    1000,
                    "Operand " + (operands.length + 1)
                )
            ) {
                // Ask the user again
                getOperands();
            } else {
                // Special validation for division by 0
                // and the input is the second operand
                if (
                    operands.length === 1 &&
                    operand === 0 &&
                    operators[operator - 1] == "/"
                ) {
                    // Print an error message
                    console.error("You cannot divide by 0");

                    // Ask the user again
                    getOperands();
                } else {
                    // All is fine, store the operand in the array
                    operands.push(operand);

                    // If we have less than 2 operands, ask the user for the next one
                    if (operands.length < 2) {
                        // Ask the user for the next operand
                        getOperands();
                    } else {
                        // Call the function to calculate the result
                        calculate();
                    }
                }
            }
        }
    );
}

function calculate() {
    let result;

    // Calculate the result based on the operator
    if (operators[operator - 1] == "+") {
        result = operands[0] + operands[1];
    }
    if (operators[operator - 1] == "-") {
        result = operands[0] - operands[1];
    }
    if (operators[operator - 1] == "*") {
        result = operands[0] * operands[1];
    }
    if (operators[operator - 1] == "/") {
        result = operands[0] / operands[1];
    }
    if (operators[operator - 1] == "%") {
        result = operands[0] % operands[1];
    }
    if (operators[operator - 1] == "^") {
        result = Math.pow(operands[0], operands[1]);
    }

    // Print the result
    console.log(
        operands[0] +
            " " +
            operators[operator - 1] +
            " " +
            operands[1] +
            " = " +
            result
    );

    // Close the readline interface
    readline.close();
}

function validateInput(input, min, max, input_description) {
    // Check if the input is a number
    if (isNaN(input)) {
        // Print an error message
        console.error(input_description + " must be a number");

        // Return false
        return false;
    }
    // Check if the input is between the min and max values
    if (input < min || input > max) {
        // Print an error message
        console.error(
            input_description + " must be between " + min + " and " + max + "."
        );

        // Return false
        return false;
    }

    // Return true
    return true;
}

// Start the program
initialize();
