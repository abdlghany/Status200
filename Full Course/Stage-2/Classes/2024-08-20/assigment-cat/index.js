import Cat from "./Cat.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const catBreeds = [
    "Ragdoll",
    "Maine Coon",
    "British Shorthair",
    "Scottish Fold",
    "Sphynx",
    "Siamese",
    "Persian",
    "Bengal",
    "Burmese",
    "Russian Blue",
];

const catColors = ["Gray", "White", "Black", "Brown"];

let activeCat = {};

let newCat = {
    name: "",
    gender: "",
    breed: "",
    color: "",
};

function getRandomArrayValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const cats = [
    new Cat(
        "Franky",
        "male",
        getRandomArrayValue(catBreeds),
        getRandomArrayValue(catColors)
    ),
    new Cat(
        "Marie",
        "female",
        getRandomArrayValue(catBreeds),
        getRandomArrayValue(catColors)
    ),
    new Cat(
        "Tommy",
        "male",
        getRandomArrayValue(catBreeds),
        getRandomArrayValue(catColors)
    ),
    new Cat(
        "Jenny",
        "female",
        getRandomArrayValue(catBreeds),
        getRandomArrayValue(catColors)
    ),
];

function chooseCatMenu() {
    console.log(`\nAvailable cats:\n`);
    cats.forEach((cat, index) => {
        if (cat.getIsAlive()) {
            console.log(`(${index + 1}) - ${cat.name} (${cat.breed})`);
        }
    });
    console.log(`\n(A) Add a cat`);
    console.log(`\n(X) quit program`);
    rl.question(`\nSelect the cat you want to play with: `, (input) => {
        if (input.toLowerCase() == "x") {
            return quit();
        }
        if (input.toLowerCase() == "a") {
            return createCat();
        }

        input = parseInt(input);

        if (input < 0 || input > cats.length) {
            console.error(`Invalid option. Try again`);
            return chooseCatMenu();
        }
        if (!cats[input - 1].getIsAlive()) {
            console.error(`Invalid option. Try again`);
            return chooseCatMenu();
        }

        activeCat = cats[input - 1];

        console.log(`\nCat info`);
        console.log(`==========`);
        console.log(`Name: ${activeCat.name}`);
        console.log(`Gender: ${activeCat.gender}`);
        console.log(`Breed: ${activeCat.breed}`);
        console.log(`Color: ${activeCat.color}`);
        console.log(`Age: ${activeCat.getAge()}`);
        console.log(`Bald: ${activeCat.getBald()}`);
        console.log(`Alive: ${activeCat.getIsAlive()}`);
        console.log(`Sleeping: ${activeCat.getIsAsleep()}`);

        chooseactivityMenu();
    });
}

function chooseactivityMenu() {
    console.log(`\nAvailable activities for ${activeCat.name}:\n`);
    if (!activeCat.getIsAlive()) {
        console.log(`\n${activeCat.name} is dead, please choose another cat`);
        activeCat = {};
        return chooseCatMenu();
    } else if (activeCat.getIsAsleep()) {
        console.log(`(1) wakeup`);
        console.log(`(6) die`);
    } else {
        console.log(`(2) sleep`);
        console.log(`(3) meow`);
        console.log(`(4) eat`);
        console.log(`(5) scratch`);
        console.log(`(6) die`);
    }
    console.log(` `);
    console.log(`(0) choose another cat`);
    rl.question(`\nSelect an activity: `, (input) => {
        input = parseInt(input);
        if (input == 0) {
            activeCat = {};
            return chooseCatMenu();
        }
        if (activeCat.getIsAsleep() && [1, 6].indexOf(input) == -1) {
            console.error(
                `\nOption ${input} is not available for cat ${activeCat.name}`
            );
            return chooseactivityMenu();
        }
        if (!activeCat.getIsAsleep && [2, 3, 4, 5, 6].indexOf(input) == -1) {
            console.error(
                `\nOption ${input} is not available for cat ${activeCat.name} is sleeping`
            );
            return chooseactivityMenu();
        }
        if (input == 1) {
            activeCat.setIsAsleep(false);
        }
        if (input == 2) {
            activeCat.setIsAsleep(true);
        }
        if (input == 3) {
            activeCat.meow();
        }
        if (input == 4) {
            activeCat.eat();
        }
        if (input == 5) {
            activeCat.scratch();
        }
        if (input == 6) {
            activeCat.setIsAlive(false);
        }
        return chooseactivityMenu();
    });
}

function createCat() {
    rl.question(`\nName of the cat: `, (input) => {
        newCat.name = input;
        rl.question(`Gender of the cat: `, (input) => {
            newCat.gender = input;
            rl.question(`Breed of the cat: `, (input) => {
                newCat.breed = input;
                rl.question(`Color of the cat: `, (input) => {
                    newCat.color = input;
                    cats.push(
                        new Cat(
                            newCat.name,
                            newCat.gender,
                            newCat.breed,
                            newCat.color
                        )
                    );
                    console.log(`\nCat ${newCat.name} is born`);
                    newCat = {
                        name: "",
                        gender: "",
                        breed: "",
                        color: "",
                    };
                    chooseCatMenu();
                });
            });
        });
    });
}

function quit() {
    rl.close();
    process.exit();
}

chooseCatMenu();
