// Define the Mammal class
class Mammal {
    constructor(name, gender, breed, weight, height) {
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.weight = weight;
        this.height = height;
        this.isAlive = true;
        this.isSleeping = false;
    }

    // Methods for Mammal
    eat() {
        if (this.isAlive && !this.isSleeping) {
            console.log(`${this.name} is eating.`);
        } else {
            console.log(`${this.name} cannot eat right now.`);
        }
    }

    sleep() {
        if (this.isAlive) {
            this.isSleeping = true;
            console.log(`${this.name} is now sleeping.`);
        } else {
            console.log(`${this.name} cannot sleep.`);
        }
    }

    rest() {
        if (this.isAlive && !this.isSleeping) {
            console.log(`${this.name} is resting.`);
        } else {
            console.log(`${this.name} cannot rest right now.`);
        }
    }

    drink() {
        if (this.isAlive && !this.isSleeping) {
            console.log(`${this.name} is drinking.`);
        } else {
            console.log(`${this.name} cannot drink right now.`);
        }
    }
}

// Define the Dog subclass inheriting from Mammal
class Dog extends Mammal {
    static dogCount = 0; // Class property to count the number of Dog instances

    constructor(name, gender, breed, weight, height, size) {
        super(name, gender, breed, weight, height); // Inherit properties from Mammal
        this.size = size; // New property specific to Dog
        Dog.dogCount++; // Increment the count every time a Dog is created
    }

    // New method specific to Dog
    bark() {
        if (this.isAlive && !this.isSleeping) {
            console.log(`${this.name} is barking.`);
        } else {
            console.log(`${this.name} cannot bark right now.`);
        }
    }

    // Static method to get the count of Dog instances
    static getDogCount() {
        return Dog.dogCount;
    }
}

// Define the Cat subclass inheriting from Mammal
class Cat extends Mammal {
    static catCount = 0; // Class property to count the number of Cat instances

    constructor(name, gender, breed, weight, height, longhaired = false) {
        super(name, gender, breed, weight, height); // Inherit properties from Mammal
        this.longhaired = longhaired; // New property specific to Cat
        Cat.catCount++; // Increment the count every time a Cat is created
    }

    // New method specific to Cat
    meow() {
        if (this.isAlive && !this.isSleeping) {
            console.log(`${this.name} is meowing.`);
        } else {
            console.log(`${this.name} cannot meow right now.`);
        }
    }

    // New method specific to Cat
    purr() {
        if (this.isAlive && !this.isSleeping) {
            console.log(`${this.name} is purring.`);
        } else {
            console.log(`${this.name} cannot purr right now.`);
        }
    }

    // Static method to get the count of Cat instances
    static getCatCount() {
        return Cat.catCount;
    }
}

// Instantiate 6 Dog objects
const dog1 = new Dog("Woofie", "Male", "Golden Retriever", 30, 60, "average");
const dog2 = new Dog("Woofer", "Female", "Labrador", 28, 58, "average");
const dog3 = new Dog("WoofWoof", "Male", "Beagle", 20, 40, "small");
const dog4 = new Dog("WooferTheSecond", "Female", "Poodle", 18, 38, "small");
const dog5 = new Dog("Woofington", "Male", "Bulldog", 24, 50, "average");
const dog6 = new Dog("WoofyMcWoofFace", "Female", "Dalmatian", 32, 62, "tall");

// Instantiate 10 Cat objects
const cat1 = new Cat("Pooky", "Female", "Siamese", 4, 25, true);
const cat2 = new Cat("Whiskers", "Male", "Tabby", 5, 27);
const cat3 = new Cat("KittyCat", "Female", "Maine Coon", 6, 30, true);
const cat4 = new Cat("Kitten_GOAT", "Male", "Persian", 3, 22);
const cat5 = new Cat("Felix", "Male", "Sphynx", 4, 26);
const cat6 = new Cat("Tom", "Male", "Russian Blue", 5, 28);
const cat7 = new Cat("Garfield", "Male", "Exotic Shorthair", 7, 32);
const cat8 = new Cat("Mittens", "Female", "Bengal", 4.5, 24);
const cat9 = new Cat("Sylvester", "Male", "American Shorthair", 6, 31);
const cat10 = new Cat("Simba", "Male", "Abyssinian", 4, 25);
const cat11 = new Cat("Simba", "Male", "Abyssinian", 4, 25);
// Output the number of Cat and Dog objects created
//console.log(`No of cats = ${Cat.getCatCount()}`); // Outputs: No of cats = 10
//console.log(`No of dogs = ${Dog.getDogCount()}`); // Outputs: No of dogs = 6
cat11.meow();
cat11.sleep();
console.log(dog1.isSleeping);
