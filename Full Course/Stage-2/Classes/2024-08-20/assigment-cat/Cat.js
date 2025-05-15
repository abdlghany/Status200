class Cat {
    // Public properties
    name;
    gender;
    breed;
    color;

    // Private property (with # prefix)
    #age;
    #bald;
    #isAlive;
    #isAsleep;

    constructor(name, gender, breed, colors) {
        // Set properties
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.color = colors;

        // Private property (with  # prefix)
        this.#age = Math.floor(Math.random() * 10) + 1;
        this.#bald = false;
        this.#isAlive = true;
        this.#isAsleep = false;
    }

    /* 
        Getters 
    */
    getAge() {
        return this.#age;
    }

    getBald() {
        return this.#bald;
    }

    getIsAlive() {
        return this.#isAlive;
    }

    getIsAsleep() {
        return this.#isAsleep;
    }

    /*
        Setters
    */
    setIsAsleep(state) {
        this.#isAsleep = state;
    }

    setIsAlive(state) {
        this.#isAlive = state;
    }

    /*
        Public methods
    */
    meow() {
        console.log(`\n>>> ${this.name} says MEOW!`);
    }

    sleep() {
        this.#isAsleep = true;
        console.log(`\n>>> ${this.name} went to sleep ... zzzzzz!`);
    }

    eat() {
        console.log(`\n>>> ${this.name} is eating a delicious meal ... mmmmm!`);
    }

    wakeup() {
        this.#isAsleep = false;
        console.log(`\n>>> ${this.name} woke up ... ahhhhhhh!`);
    }

    scratch() {
        console.log(`\n>>> ${this.name} is scratcing the couch ... no stop!`);
    }

    die() {
        this.#isAlive = false;
        console.log(`\n>>> ${this.name} passed away ... SAD!`);
    }
}

/*
    Learned way to export single property / function / class

    To load in other module: const Cat = require("./module.js");
*/
// module.exports Cat;

/*
    Another way.

    To load in other module: import Cat from "./module.js"
*/
export default Cat;
