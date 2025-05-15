const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let height;
let weight;
let decimals;

function getHeight() {
    readline.question("Enter your height in meters: ", function (input) {
        height = parseFloat(input);
        if (!validateInput(height, 50, 250, "Height")) {
            getHeight();
        } else {
            getWeight();
        }
    });
}

function getWeight() {
    readline.question("Enter your weight in kilograms: ", function (input) {
        weight = parseFloat(input);
        if (!validateInput(weight, 20, 300, "Weight")) {
            getWeight();
        } else {
            getDecimals();
        }
    });
}

function getDecimals() {
    readline.question("Decimals to use for the BMI score: ", function (input) {
        decimals = parseFloat(input);
        if (!validateInput(decimals, 0, 10, "Decimals")) {
            getDecimals();
        } else {
            calculateBMI();
        }
    });
}

function calculateBMI() {
    const bmi = weight / Math.pow(height / 100, 2);
    let classification = "";

    if (bmi < 18.5) {
        classification = "underweight";
    } else if (bmi < 25) {
        classification = "normal";
    } else if (bmi < 30) {
        classification = "overweight";
    } else {
        classification = "obese";
    }

    console.log("Your BMI score is: " + bmi.toFixed(decimals));
    console.log("Your BMI classification: " + classification);

    readline.close();
}

function validateInput(input, min, max, input_description) {
    if (isNaN(input)) {
        console.error(input_description + " must be a number");
        return false;
    }
    if (input < min || input > max) {
        input_description + " must be between " + min + " and " + max + ".";
        return false;
    }
    return true;
}

getHeight();
