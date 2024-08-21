const EventEmitter  = require("events");
/* Using 3 different classes */
class Cat extends EventEmitter{
    log(message){
        this.emit("cat", '\x1b[31m'+'Cat: '+message+'\x1b[0m')
    }
}

class Chicken extends EventEmitter{
    log(message){
        this.emit("chicken", '\x1b[32m' + 'Chicken: '+message + '\x1b[0m');
    }
}

class Dog extends EventEmitter{
    log(message){
        this.emit("dog", '\x1b[34m' + 'Dog: '+message + '\x1b[0m');
    }
}
const dog = new Dog();
const cat = new Cat();
const chicken = new Chicken();

dog.addListener("dog", function(argument){
    console.log(argument);
});

cat.addListener("cat", function(argument){
    console.log(argument);

});

chicken.addListener("chicken", function(argument){
    console.log(argument);
});

console.log("\nIt's a ridiculously sunny summer afternoon in the middle of nowhere... A chicken, a cat, and a dog are somehow stuck together in the same chaotic neighborhood.");
chicken.log("HAAAALP! I'M BEING CHASED BY THAT CRAZY DOG AGAIN...");
console.log("NARRATOR: The chicken pulls off an Olympic-level sprint until the cat, in all its sassy glory, steps in and puts an end to the madness, then says:");
cat.log("DUDE, CHILL! LEAVE THE CHICKEN ALONE, BROOOOOOOO!");
dog.log("I am absolutely devastated by the cat's betrayal. I shall never share a bed with her again. Tonight, I sleep in solitude!");
console.log("NARRATOR: Despite the drama, the chicken, cat, and dog somehow end up having a fancy tea party... Then they all awkwardly part ways and head back to their respective cribs.");
cat.log("I still can't wrap my head around the fact that you were seriously considering chicken for lunch today...");
dog.log("What can I say? I'm a dog, I have a thing for chicken... It’s kind of my thing.");
chicken.log("(talking to itself) Well, thankfully the cat swooped in! But I did trip and face-plant into the mud... So yeah, shower time before bed for me.");
cat.log("Ugh, fine... Let's just hit the hay already...");
dog.log("Ugh, WHATEVER.");
console.log("And that's the story, folks.\n\n\n");

/* Using 1 class */
class AnimalFarm extends EventEmitter{
    log(talker, message){
        this.emit(talker, message)
    }
}

const animalFarm = new AnimalFarm();
var listeners = ["dog", "cat", "chicken", "narrator"];
// red, green, blue, white
var colors = ['\x1b[34m', '\x1b[31m', '\x1b[32m', '\x1b[0m']
for(let i = 0; i< colors.length; i++){
    animalFarm.addListener(listeners[i], function(argument){console.log(colors[i] + listeners[i]+": "+argument + colors[colors.length-1]);});
}

animalFarm.log("narrator","It's a ridiculously sunny summer afternoon in the middle of nowhere... A chicken, a cat, and a dog are somehow stuck together in the same chaotic neighborhood.");
animalFarm.log("chicken","HAAAALP! I'M BEING CHASED BY THAT CRAZY DOG AGAIN...");
animalFarm.log("narrator","The chicken pulls off an Olympic-level sprint until the cat, in all its sassy glory, steps in and puts an end to the madness, then says:");
animalFarm.log("cat","DUDE, CHILL! LEAVE THE CHICKEN ALONE, BROOOOOOOO!");
animalFarm.log("dog","I am absolutely devastated by the cat's betrayal. I shall never share a bed with her again. Tonight, I sleep in solitude!");
animalFarm.log("narrator","Despite the drama, the chicken, cat, and dog somehow end up having a fancy tea party... Then they all awkwardly part ways and head back to their respective cribs.");
animalFarm.log("cat","I still can't wrap my head around the fact that you were seriously considering chicken for lunch today...");
animalFarm.log("dog","What can I say? I'm a dog, I have a thing for chicken... It’s kind of my thing.");
animalFarm.log("chicken","(talking to itself) Well, thankfully the cat swooped in! But I did trip and face-plant into the mud... So yeah, shower time before bed for me.");
animalFarm.log("cat","Ugh, fine... Let's just hit the hay already...");
animalFarm.log("dog","Ugh, WHATEVER.");
animalFarm.log("narrator","And that's the story, folks.");
