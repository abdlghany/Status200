const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let height;
let weight;

function getHeight() {
    readline.question("Enter your height in meters: ", function (input) {
        height = parseFloat(input);
        getWeight();
    });
}

function getWeight() {
    readline.question("Enter your weight in kilograms: ", function (input) {
        weight = parseFloat(input);
        calculateBMI();
    });
}

function calculateBMI() {
    const bmi = weight / Math.pow(height, 2);
    console.log("Your BMI score is: " + bmi.toFixed(2));
    readline.close();
}

// Start script by calling the function getHeight();
getHeight();
