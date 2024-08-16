function sayHello(name){
    console.log("Hello " + name);
}


const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Ask the user a question
readline.question("What is your name? ", function (name) {
    console.log("Hello, " + name + "!");

    readline.close();
});