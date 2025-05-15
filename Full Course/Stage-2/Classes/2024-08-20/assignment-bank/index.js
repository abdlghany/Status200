import AccountHolder from "./AccountHolder.js";
import rl from "readline";

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function start() {
    readline.question(
        "\nWhat would you like to do:\n0. View Account Information\n1. View Balance\n2. View ID\n3. Change Pin Code\n4. View Private Information\nx. Quit\nYour selection: ",
        function (input) {
            if (input) {
                if (input == 0) {
                    console.clear();
                    console.log(accountholder.showAccount());
                    start();
                } else if (input == 1) {
                    console.clear();
                    console.log("Your balance is: " + accountholder.balance);
                    start();
                } else if (input == 2) {
                    console.clear();
                    console.log(
                        "Your ID No. is: " + accountholder.identityCardNo
                    );
                    start();
                } else if (input == 3) {
                    console.clear();
                    changePinCode();
                } else if (input == 4) {
                    console.clear();
                    showPrivateAccount();
                } else if (input == "x") {
                    console.log("Goodbye!");
                    readline.close();
                } else {
                    console.clear();
                    console.error("Please select a valid option.");
                    start();
                }
            } else {
                console.clear();
                console.error("Please select a valid option.");
                start();
            }
        }
    );
}

function showPrivateAccount() {
    readline.question(
        "Please enter your name or 'x' to go back: ",
        function (input) {
            if (input && isNaN(input)) {
                if (input == "x") {
                    console.clear();
                    start();
                } else {
                    console.clear();
                    console.log(accountholder.showPrivateAccount(input));
                    start();
                }
            } else {
                console.clear();
                console.error("Please enter a valid name.");
                showPrivateAccount();
            }
        }
    );
}

function changePinCode() {
    console.clear();
    readline.question("Please enter your new PIN Code: ", function (input) {
        if (input && !isNaN(input)) {
            accountholder.pinCode = input;
            start();
        } else {
            console.clear();
            console.error("Please enter a valid PIN Code (numbers only).");
            changePinCode();
        }
    });
}
const accountholder = new AccountHolder(
    "Dada",
    "M",
    "18500085966",
    "RM",
    15000
);

start();
