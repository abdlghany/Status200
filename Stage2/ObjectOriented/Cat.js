const { fchown, read } = require("fs");
var Cats = [];
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Cat {
    constructor(name, gender, breed, color, dateOfBirth) {
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.color = color;
        this.dateOfBirth = dateOfBirth;
        this.dateofDeath = "";
        this.isAlive = true;
        this.isAsleep = false;
        this.isEating = false;
        this.isAngry = false;
    }

    meow() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't meow.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't meow.");
        } else if (this.isAngry) {
            console.warn(this.name + " is meowing angrily, do be careful!");
        } else {
            console.warn(this.name + " is meowing.");
        }
    }

    bite() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't bite.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't bite.");
        } else if (this.isAngry) {
            console.warn(this.name + " is biting angrily, I'd tred lightly if I were you!");
        } else {
            console.warn(this.name + " is biting.");
        }
    }

    eat() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't eat.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't eat.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to eat.");
        } else {
            console.warn(this.name + " is eating.");
            this.isEating = true;
        }
    }

    sleep() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't sleep.");
        } else if (this.isAsleep) {
            console.error(this.name + " is already sleeping.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to sleep, but tries to anyway...you got lucky this time buddy.");
            this.isAsleep = true;
            this.isAngry = false;
            this.isEating = false;
        } else {
            console.warn(this.name + " is sleeping.");
            this.isAsleep = true;
            this.isEating = false;
        }
    }

    wakeUp() {
        if (this.isAlive) {
            if (this.isAsleep) {
                this.isAsleep = false;
                console.warn(this.name + " is now awake!");
            } else {
                console.error(this.name + " is already awake, can't be more awake.");
            }
        }else{
            console.error(this.name + "is dead :( can't wake up from that...");
        }
    }

    die(DateOfDeath) {
        if (this.isAlive) {
            this.isAlive = false;
            this.dateofDeath = DateOfDeath;
            const ageInMilliseconds = Math.abs(this.dateofDeath - this.dateOfBirth);
            const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
            if(ageInSeconds > 60){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60) + " minute(s)");
            }else if(ageInSeconds > 3600){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60) + " hour(s)");
            }
            else if(ageInSeconds > 86400){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60/24) + " day(s)");
            }
            else if(ageInSeconds > 2592000){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30) + " month(s)");
            }
            else if(ageInSeconds > 31104000){
                console.warn(this.name + " has died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30/12) + " year(s)");
            }else{
                console.warn(this.name + " has died :( at the age of: " + ageInSeconds + " second(s)");
            }
        } else {
            if(ageInSeconds > 60){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60) + " minute(s)");
            }else if(ageInSeconds > 3600){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60) + " hour(s)");
            }
            else if(ageInSeconds > 86400){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60/24) + " day(s)");
            }
            else if(ageInSeconds > 2592000){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30) + " month(s)");
            }
            else if(ageInSeconds > 31104000){
                console.warn(this.name + " has already died :( at the age of: " + parseInt(ageInSeconds/60/60/24/30/12) + " year(s)");
            }else{
                console.warn(this.name + " has already died :( at the age of: " + ageInSeconds + " second(s)");
            }
        }
    }

    play() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't play.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't play.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to play and might scratch you!");
        } else {
            console.warn(this.name + " is playing with you...");
        }
    }

    purr() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't purr.");
        } else if (this.isAsleep) {
            console.error(this.name + " is sleeping, can't purr.");
        } else if (this.isAngry) {
            console.warn(this.name + " is too angry to purr.");
        } else {
            console.warn(this.name + " is purring.");
        }
    }

    hurt() {
        if (!this.isAlive) {
            console.error(this.name + " is dead :( can't get hurt anymore.");
        } else if (this.isAngry) {
            console.warn("OH YOU'VE DONE IT NOW...." + this.name.toUpperCase() + " IS EVEN ANGRIER! RUN!");
        } else {
            this.isAngry = true;
            this.isAsleep = false;
            this.isEating = false;
            console.warn(this.name + " is now angry.");
        }
    }
}

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
                Cats[index].die(new Date());
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