class Cat {
    constructor(name, gender, breed) {
        this.name = name; // Initialize name from the parameter
        this.gender = gender; // Initialize gender from the parameter
        this.breed = breed; // Initialize breed from the parameter
        this.dateOfBirth = new Date(); // Set dateOfBirth to the current date
        this.bald = false; // Set bald to default value of false
    }

    // Method to simulate the cat meowing
    meow() {
        console.log(`${this.name} is meowing!`);
    }

    // Method to simulate the cat eating
    eat() {
        console.log(`${this.name} is eating.`);
    }

    // Method to simulate the cat sleeping
    sleep() {
        console.log(`${this.name} is sleeping.`);
    }
}

export default Cat;
