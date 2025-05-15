class Cat {
    // Private fields must be declared at the top of the class
    #breed;
    #weight;
    #height;
    #longhaired;

    // Constructor method
    constructor(name, gender, breed, weight, height, longhaired = false) {
        this.name = name; // Public property
        this.gender = gender; // Public property
        this.#breed = breed; // Private property
        this.#weight = weight; // Private property
        this.#height = height; // Private property
        this.#longhaired = longhaired; // Private property
    }

    // Public method
    meow() {
        if (this.#isAlive()) {
            console.log(`${this.name} is meowing.`);
        } else {
            console.log(`${this.name} is not meowing right now.`);
        }
    }

    // Getter and Setter for breed (private property)

    set breed(newBreed) {
        this.#breed = newBreed;
    }

    // Getter and Setter for weight (private property)
    get weight() {
        return this.#weight;
    }

    set weight(newWeight) {
        this.#weight = newWeight;
    }

    // Getter and Setter for height (private property)
    get height() {
        return this.#height;
    }

    set height(newHeight) {
        this.#height = newHeight;
    }

    // Getter and Setter for longhaired (private property)
    get longhaired() {
        return this.#longhaired;
    }

    set longhaired(isLonghaired) {
        this.#longhaired = isLonghaired;
    }

    // Private method
    #isAlive() {
        // Simplified check (you could expand this logic)
        return true;
    }
}

// Create an instance of the Cat class
const myCat = new Cat("Whiskers", "Female", "Siamese", 4.5, 25, false);

// Accessing public properties
console.log(`Cat's Name: ${myCat.name}`); // Outputs: Cat's Name: Whiskers
console.log(`Cat's Gender: ${myCat.gender}`); // Outputs: Cat's Gender: Female

// Attempting to access private properties directly (will throw an error)
try {
    console.log(`Cat's Breed (direct): ${myCat.#breed}`); // SyntaxError: Private field '#breed' must be declared in an enclosing class
} catch (e) {
    console.log("Can't access private property directly:", e.message);
}

// Using getters to access private properties
console.log(`Cat's Breed: ${myCat.breed}`); // Outputs: Cat's Breed: Siamese
console.log(`Cat's Weight: ${myCat.weight}`); // Outputs: Cat's Weight: 4.5
console.log(`Cat's Height: ${myCat.height}`); // Outputs: Cat's Height: 25
console.log(`Is Longhaired: ${myCat.longhaired}`); // Outputs: Is Longhaired: false

// Public method that internally uses a private method
myCat.meow(); // Outputs: Whiskers is meowing.
