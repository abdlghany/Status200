const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let firstOperand;
let secondOperand;
let operator;
let result;
function getFirstOperand(){
    readline.question("Enter the first Operand: ", function (input) {
        if(validateInput(input)){
            firstOperand = parseFloat(input);
            getSecondOperand();
        }
        else{
            console.error("Please enter a valid number between -1000 and 1000");
            getFirstOperand();
        }
    });
}

function getSecondOperand(){
    readline.question("Enter the second Operand: ", function (input) {
        if(validateInput(input)){
            secondOperand = parseFloat(input);
            getOperation();
        }
        else{
            console.error("Please enter a valid number between -1000 and 1000");
            getSecondOperand();
        }
    });
}

function getOperation() {
    readline.question("Select one of the available operations (+ - * / %) by writing it: ", function (input) {
        var message;
        if (input == "+"){
            operator = input;
            result = firstOperand + secondOperand;
            printResult();
        }
        else if(input == "-"){
            operator = input;
            result = firstOperand - secondOperand;
            printResult();
        }
        else if(input == "/"){
            if(secondOperand == 0){
                console.error("You cannot divide by zero.")
                getSecondOperand();
            }
            else{
                operator = input;
                result = firstOperand / secondOperand;
                printResult();
            }
        }
        else if(input == "*"){
            operator = input;
            result = firstOperand * secondOperand;
            printResult();
            
        }
        else if(input == "%"){
            operator = input;
            result = firstOperand % secondOperand;
            printResult();
        }
        else{
            console.error("Please enter a valid operator!")
            getOperation();
        }
    });
}

function printResult(){
    var message = "Result: " + firstOperand.toFixed(2) + operator + secondOperand.toFixed(2) + " = "+(result).toFixed(2);
    console.log(message);
    readline.close();
}
function validateInput(input){
    if(!isNaN(input) && input <= 1000 && input > -1000)return true;
    else return false;
}
function initiate(){
    console.log("Welcome to my calculator app");
    console.log("----------------------");
}
initiate();
getFirstOperand();
