const { fchown, read } = require("fs");

class Cat{
    constructor(name, gender, breed, color, dateOfBirth){
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.color = color;
        this.dateOfBirth = dateOfBirth;
        this.isAlive = true;
        this.isAsleep = false;
        this.isEating = false;
        this.isAngry = false;
    }

    meow(){
        if(!this.isAsleep && this.isAlive){
            console.log(this.name + " is meowing.");
        }
        else if(!this.isAlive)
            {
                console.error(this.name + " is dead :( can't meow.");
            }
            else{
                console.error(this.name + " is sleeping, can't meow.");
            }
    }
    bite(){
        if(!this.isAsleep && this.isAlive){
            console.log(this.name + " is biting.");
        }
        else if(!this.isAlive)
            {
                console.error(this.name + " is dead :( can't bite.");
            }
            else{
                console.error(this.name + " is sleeping, can't bite.");
            }
    }
    eat(){
        if(!this.isAsleep && this.isAlive){
            console.log(this.name + " is eating.");
            this.isEating = true;
        }
        else if(!this.isAlive)
        {
            console.error(this.name + " is dead :( can't eat.");
        }
        else{
            console.error(this.name + " is sleeping, can't eat.");
        }
    }
    sleep(){
        if(!this.isAsleep && this.isAlive){
            console.log(this.name + " is sleeping.");
            this.isAsleep = true;
        }
        else if(!this.isAlive)
        {
            console.error(this.name + " is dead :( can't sleep.");
        }
        else{
            console.error(this.name + " is already sleeping, can't sleep again.");
        }
    }
    wakeUp(){
        if(this.isAlive){
            if(this.isAsleep){
                this.isAsleep = false;
                console.log(this.name + " is now awake!");
            }
            else{
                console.error(this.name + " is already awake, can't wake up more.");
            }
        }
    }
    die(dateOfDeath){
        if(this.isAlive){
            this.isAlive = false;
            const birthDate = new Date(this.dateOfBirth);
            const deathDate = new Date(dateOfDeath);
            const ageInMilliseconds = Math.abs(deathDate - birthDate);
            const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
           
            console.log(this.name + " has died at the age of: " + (ageInSeconds) + " seconds");
        }else{}
        console.log(this.name + " is already dead... lifespan: " +ageInSeconds + " seconds" );
    }
    play(){
        if(!this.isAsleep && this.isAlive){
            console.log(this.name + " is playing with you...");
        }
        else if(!this.isAlive)
        {
            console.error(this.name + " is dead :( can't play.");
        }
        else if(this.inAngry){
            console.log(this.name + " is Angry and refuses to play. You got scratched.");
        }
        else{
            console.error(this.name + " is sleeping, can't play.");
        }
    }
    purr(){
        if(!this.isAsleep && this.isAlive){
            console.log(this.name + " is purring.");
        }
        else if(!this.isAlive)
        {
            console.error(this.name + " is dead :( can't purr.");
        }
        else if(this.inAngry){
            console.log(this.name + " is Angry and refusing to purr.");
        }
        else{
            console.error(this.name + " is sleeping, can't purr.");
        }
    }
    hurt(){
        if(this.inAngry){
            this.inAngry = true;
            console.log("OH YOU'VE DONE IT NOW....THE CAT IS NOW ANGRIER!!!!!!!!!!!!!!! RUN BRUV.");
        }
        else{
            this.inAngry = true;
            this.isAsleep = false;
            console.log("The cat is now angry.");
        }
    }
}

var Cats = [];
function getCurrentDateTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds);
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getName(){
    readline.question("What would you like your cat's name to be?", function(input){
        input = input.trim().toLowerCase();
        if(input && input != ""){
            getGender(input);
        }
        else{
            console.error("Please enter a valid name");
            getName();
        }
    });
}

function getGender(name){
    readline.question("What is your cat's gender? (Male/Female)", function(input){
        input = input.trim().toLowerCase();
        if(input && input != ""){
            if(input == "m" || input == "male" ){
                getBreed(name, "Male");
            }
            else if(input == "f" || input == "female"){
                getBreed(name, "Female");
            }else{
                console.error("Please enter a valid gender!");
                getGender(name)
            }
            
        }
        else{
            getGender(name);
        }
    });
}

function getBreed(name, gender){
    readline.question("What is your cat's breed?", function(input){
        input = input.trim().toLowerCase();
        if(input && input != ""){
            getColor(name, gender, input);
        }
        else{
            console.error("Please enter a valid breed");
            getBreed(name, gender);
        }
    });
}

function getColor(name, gender, breed){
    readline.question("What is your cat's color?", function(input){
        input = input.trim().toLowerCase();
        if(input && input != ""){
            Cats.push(new Cat(name, gender, breed, input, getCurrentDateTime()));
            console.log("Cat has been registered successfully!!");
            mainMenu();
        }
        else{
            console.error("Please enter a valid color");
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
                console.log("See you soon!  ");
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
                Cats[index].die(getCurrentDateTime());
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
        }
    });
}


mainMenu();