const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let firstOperand;
let secondOperand;
let operators = {1:"+", 2:"-", 3:"/", 4:"*", 5:"%"};

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
    readline.question("Select one of the available operations\n1 for: +\n2 for: -\n3 for: /\n4 for: *\n5 for: %\n", function (input) {
        if(operators[input]){
            if(operators[input] == "/" && secondOperand == 0){
                console.error("Cannot divide by 0");
                getSecondOperand();
            }else{
                var result = eval(firstOperand + operators[input] + secondOperand);
                console.log("Result: " + firstOperand.toFixed(2) + operators[input] + secondOperand.toFixed(2) + " = "+(result).toFixed(2));
                readline.close();
            }
        }
        else{
            console.error("Please enter a valid operator!")
            getOperation();
        }
    });
}

function validateInput(input){
    if(!isNaN(input) && input <= 1000 && input > -1000 && input != "") return true;
    else return false;
}

function initiate(){
    console.log("Welcome to my calculator app\n----------------------");
}

initiate();
getFirstOperand();