const readline = require("readline").createInterface({

    input: process.stdin,
    output: process.stdout,
});

let height;
let weight;
let decimals;

function getHeight() {
    readline.question("Enter your height in cm: ", function (input) {
        height = input;
        if(!isNaN(height)  && height >= 0 && height){
            height = parseInt(input)/100;
            getWeight();
        }
        else{
            console.error("Please enter a valid height: ");
            getHeight();
        }
        
    });
}

function getWeight() {
    readline.question("Enter your weight in kilograms: ", function (input) {
        weight = input;
        if(!isNaN(weight) && weight >=0 && weight){
            weight = parseFloat(weight);
            getDecimals()  
        }
        else{
            console.error("Please enter a valid weight: ");
            getWeight();
        }
        
        
    });
}
function getDecimals() {
    readline.question("Enter  how many decimals you want the output to have (0-10): ", function (input) {
        decimals = input;
        if(decimals >= 0 && decimals < 11 && decimals){
            decimals = parseInt(input);
            calculateBMI();
        }
        else{
            console.error("Please enter a valid decimal value between 0 and 10: ");
            getDecimals();
        }
    }); 
}

function calculateBMI() {
    let bmi = weight / Math.pow(height, 2);
    bmi = bmi.toFixed(decimals);
    bmiClassification(bmi, "kg", "m");
    readline.close();
}

function bmiClassification(bmi, weightUnit, heightUnit){
    var classification = "";
    if(bmi < 18.5){
        classification = "underweight";
    }
    else if(bmi < 25){
        classification = "normal";
    }
    else if(bmi < 30){
        classification =  "overweight";
    }
    else{
        classification = "obese";
    }
    console.log("Your BMI is: "+ bmi +weightUnit+"/"+heightUnit+"^2 ");
    console.log("Your BMI shows that you're " + classification);
    return false
}
getHeight();