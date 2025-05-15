// Author Class
class Author {
    constructor(name, nationality) {
        this.name = name;
        this.nationality = nationality;
    }

    getDetails() {
        return `${this.name} (${this.nationality})`;
    }
}

// Book Class
class Book {
    constructor(title, genre, author) {
        this.title = title;
        this.genre = genre;
        this.author = author; // Composition: a book "has an" author
    }

    getDetails() {
        return `"${this.title}" is a ${
            this.genre
        } book written by ${this.author.getDetails()}.`;
    }
}

// Example Usage
const GeorgeOrwell = new Author("George Orwell", "British");
const StephenKing = new Author("Stephen King", "American");
const Book1984 = new Book("1984", "Dystopian", GeorgeOrwell);
const AnimalFarm = new Book("Animal Farm", "Social Drama", GeorgeOrwell);
const TheShining = new Book("The Shining", "Horror", StephenKing);

console.log(Book1984.getDetails());
console.log(AnimalFarm.getDetails());
console.log(TheShining);
