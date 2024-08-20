import Cat from './onlyCat.js';

const { fchown, read } = require("fs");
var Cats = [];
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getName(){
    readline.question("What would you like your cat's name to be? ", function(input){
        input = input.trim().toLowerCase();
        if(input && input != "" && input.length <= 10){
            getGender(input);
        }
        else{
            console.error("Please enter a valid name, Maximun of 10 characters allowed.");
            getName();
        }
    });
}

function getGender(name){
    readline.question("What is your cat's gender? (Male/Female) ", function(input){
        input = input.trim().toLowerCase();
        if(input && input != ""){
            if(input == "m" || input == "male" ){
                getBreed(name, "M");
            }
            else if(input == "f" || input == "female"){
                getBreed(name, "F");
            }else{
                console.error("Please enter a valid gender!");
                getGender(name)
            }
            
        }
        else{
            console.error("Please enter a valid gender!");
            getGender(name);
        }
    });
}

function getBreed(name, gender){
    readline.question("What is your cat's breed? ", function(input){
        input = input.trim().toLowerCase();
        if(input && input != "" && input.length <= 20){
            getColor(name, gender, input);
        }
        else{
            console.error("Please enter a valid breed, Maximum of 20 characters allowed.");
            getBreed(name, gender);
        }
    });
}

function getColor(name, gender, breed){
    readline.question("What is your cat's color? ", function(input){
        input = input.trim().toLowerCase();
        if(input && input != "" && input.length <= 10){
            Cats.push(new Cat(name, gender, breed, input, new Date()));
            console.log("Cat has been registered successfully!!");
            mainMenu();
        }
        else{
            console.error("Please enter a valid color, Maximum of 10 characters allowed.");
            getColor(name, gender, breed);
        }
    });
}
function mainMenu(){
    readline.question("What Would you like to do?\n 1. Add new cat \n 2. Command an existing cat.\n x. Quit\nYour selection: ", function(input){
        input = input.trim().toLowerCase();
         if(input && input != ""){
            if(input == 1){
                console.clear();
                getName();
            }
            else if(input == 2){
                console.clear();
                playWithCat();
            }
            else if(input == "x"){
                console.log("See you soon!");
                readline.terminal = false;
                readline.close();
                
            }
            else{
                console.clear();
                console.error("Please select a valid option.");
                mainMenu();
            }

        }else{
            console.error("Please select a valid option.");
            mainMenu();
        }
    });
}

function playWithCat(){
    if(Cats.length != 0){
    var existingCatsMessage = "";
    for(let i = 0; i < Cats.length; i++){
        existingCatsMessage += (i+1) + ". " + Cats[i].name + "\n";
    }
    readline.question("Please select one of the available cats:\n" + existingCatsMessage, function (input){
        input = input.trim().toLowerCase();
        if(input && input != "" && !isNaN(input)){
            if(Cats.length >= input && input > -1){
                var catIndex = parseInt(input)-1;
                console.clear();
                console.log(Cats[catIndex].name + " Has been selected.");
                catCommands(catIndex);
            }
        }
    });
    }
    else{
        console.clear();
        console.error("Sorry there are no available cats at the moment, Please register a cat.");
        mainMenu();
    }

}
function catCommands(index){
    readline.question("What would you like the cat to do? \n1. Meow\n2. Bite\n3. Eat\n4. Sleep\n5. Wake Up\n6. Die\n7. Play\n8. Hurt the cat...\n9. Purr\nx. Back to main menu\nYour selection: ", function(input){
        input = input.trim().toLowerCase();
        if(input && input != ""){
            if(input == 1){
                console.clear();
                Cats[index].meow();
                catCommands(index);
            }
            else if(input == 2){
                console.clear();
                Cats[index].bite();
                catCommands(index);
            }
            else if(input == 3){
                console.clear();
                Cats[index].eat();
                catCommands(index);
            }
            else if(input == 4){
                console.clear();
                Cats[index].sleep();
                catCommands(index);
            }
            else if(input == 5){
                console.clear();
                Cats[index].wakeUp();
                catCommands(index);
            }
            else if(input == 6){
                console.clear();
                readline.question("Please enter your name: ", function(input){
                    if(input && accountHolders.includes(input)){
                        Cats[index].die(new Date());
                    }
                    else{
                        console.error("Sorry you don't have permission to kill "+Cats[index].name+".");
                    }
                });
                
                catCommands(index);
            }
            else if(input == 7){
                console.clear();
                Cats[index].play();
                catCommands(index);
            }
            else if(input == 8){
                console.clear();
                Cats[index].hurt();
                catCommands(index);
            }
            else if(input == 9){
                console.clear();
                Cats[index].purr();
                catCommands(index);
            }
            else if(input == "x"){
                console.clear();
                mainMenu();
            }
            else{
                console.clear();
                console.error("Please select a valid option...");
                catCommands(index);
            }
        }else{
            console.clear();
            console.error("Please select a valid option");
            catCommands(index);
        }
    });
}

mainMenu();