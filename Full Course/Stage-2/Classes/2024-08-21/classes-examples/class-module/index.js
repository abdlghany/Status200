import Cat from "./Cat.js";

const myCat = new Cat("Whiskers", "Male", "Sphynx");

console.log(myCat.dateOfBirth); // Outputs the current date
console.log(myCat.bald); // Outputs false

myCat.meow(); // Outputs "Whiskers is meowing!"
myCat.eat(); // Outputs "Whiskers is eating."
myCat.sleep(); // Outputs "Whiskers is sleeping."
