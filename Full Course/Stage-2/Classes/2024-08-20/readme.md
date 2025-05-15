# Object-Oriented Programming (OOP)

## Introduction

In programming, the way we structure and approach our code is guided by what we call **programming paradigms**. These paradigms shape how we think about solving problems and writing programs. Up to this point, we've been focusing on **Imperative Programming**, where we've learned _how_ to instruct the computer step-by-step to achieve specific outcomes. Now, we’re about to delve into a new "HOW"—through **Object-Oriented Programming (OOP)**.

### Programming Paradigms

A programming paradigm is a fundamental style of computer programming, representing a way to approach and structure your code. It defines the mindset and methodologies you use when writing programs, offering various tools and techniques to express your logic and solve problems effectively.

#### Paradigm 1: Imperative Programming (HOW)

-   **Focus:** Describes _how_ a program operates by providing detailed instructions and control flow.
-   **Characteristics:**
    -   Step-by-step instructions.
    -   Emphasis on controlling the state and flow of execution.
    -   Uses constructs like loops, conditionals, and variables to manipulate data.
-   **Examples of Languages:**
    -   JavaScript
    -   Python
    -   C++
    -   PHP
-   **Procedural Programming:**
    -   A subset of imperative programming.
    -   Follows a top-down approach with procedures (similar to functions) that break down tasks into smaller, manageable steps.

_So far, we've focused on learning this "HOW" through imperative and procedural programming. You've learned how to write code that explicitly instructs the computer step-by-step on what to do._

#### Paradigm 2: Declarative Programming (WHAT)

-   **Focus:** Describes _what_ the program should achieve, leaving the _how_ to the language or framework.
-   **Characteristics:**
    -   Specifies the desired outcomes without explicitly coding the step-by-step process.
    -   Often used in languages that abstract the details of execution.
    -   Emphasizes readability and expressiveness.
-   **Examples of Languages:**
    -   SQL
    -   HTML

_This paradigm is different from what we've practiced so far. Instead of focusing on "HOW" to achieve a result, it focuses on "WHAT" the result should be._

### Transitioning to a New "HOW"

#### Object-Oriented Programming (OOP)

Now, we’re going to explore a new way of thinking about the "HOW"—through **Object-Oriented Programming (OOP)**. While we continue to focus on _how_ to instruct the computer, OOP allows us to do so in a more organized and structured way. OOP enables us to model real-world entities as "objects" that have properties and behaviors, making our code more modular, reusable, and easier to manage.

---

# Object-Oriented Design

## Premise: Everything is an Object

In Object-Oriented Design, the fundamental idea is that everything in the program can be thought of as an **object**. These objects represent real-world entities or concepts, and they interact with one another to perform the tasks and functions of the program.

## What are Objects?

Objects can be anything you can think of—both tangible and intangible. They are the building blocks of an object-oriented system, and they can represent things like:

-   **Tangible Entities:** A car, a classroom, a person.
-   **Conceptual Entities:** A bank account, a process, a university course.
-   **Even Broader Concepts:** The entire universe, a system, an organization.

### Object Composition: Objects Within Objects

In Object-Oriented Design, objects can be composed of other objects, creating a hierarchy of parts that together form a more complex entity. This concept is known as **object composition**. It allows us to model real-world systems by breaking them down into smaller, manageable components that interact with each other.

For example, consider a **Car** object. A car is not just a single entity but a complex system composed of various parts, each of which can also be considered an object:

-   Car
    -   Motor
        -   Cylinders
            -   Pistons
                -   Rings
                -   Pins
    -   Steering Wheel
        -   Rim
            -   Outer Layer
                -   Leather
                -   Stitching
            -   Core
                -   Metal Frame
        -   Center Hub
            -   Horn Button
            -   Airbag
    -   Wheels
        -   Tire
            -   Rubber
            -   Tread Pattern
        -   Rim
            -   Alloy
            -   Spokes

Each of these components can be broken down further into even smaller objects, right down to the molecular level:

-   Tire
    -   Rubber
        -   Polymers
            -   Molecules
                -   Atoms

This nested structure illustrates how larger objects are composed of smaller, interrelated objects, each contributing to the overall functionality of the larger system. By understanding and modeling these relationships, we can create more accurate and maintainable representations of complex systems in our programs.

### Properties and Behaviors of Objects

Each object is a self-contained unit that has its own **properties** (attributes) and **behaviors** (methods). These properties define the state of an object, while behaviors define what an object can do.

For example:

-   A **person** object might have properties like `name`, `age`, and `height`, and behaviors like `speak()`, `walk()`, and `sleep()`.
-   A **car** object might have properties like `make`, `model`, and `color`, and behaviors like `start()`, `accelerate()`, and `brake()`.

### The Problem: Managing Multiple Objects

As you create more objects, you might notice that many objects share common properties and behaviors. For instance, you might have multiple `person` objects, each with the same properties (`name`, `age`, `height`) but different values for those properties. Writing out the properties and behaviors for each object individually can quickly become repetitive and error-prone.

### The Solution: Classes

To address this problem, we use **classes** in Object-Oriented Programming. A class is like a blueprint for creating objects. It defines the properties and behaviors that its objects will have, allowing us to create multiple objects based on the same blueprint without repeating code.

For example, instead of defining the `name`, `age`, and `height` for each person individually, we can define a `Person` class. Then, whenever we need to create a new person, we create an instance of the `Person` class, and that instance automatically has all the properties and behaviors defined in the class.

## Example: Class and Object

### Defining a Class: `Person`

```javascript
class Person {
    constructor(name, age, height) {
        this.name = name;
        this.age = age;
        this.height = height;
    }

    speak() {
        return `Hello, my name is ${this.name}.`;
    }

    walk() {
        return `${this.name} is walking.`;
    }

    sleep() {
        return `${this.name} is sleeping.`;
    }
}
```

### Creating Objects from the Class

```javascript
// Creating instances of the Person class
const person1 = new Person("Alice", 30, 165);
const person2 = new Person("Bob", 25, 175);

// Accessing properties and calling methods
console.log(person1.speak()); // Output: Hello, my name is Alice.
console.log(person2.walk()); // Output: Bob is walking.
```

### Understanding the Example

In this example, `Person` is a class that defines the blueprint for creating person objects. The `constructor` method is used to initialize the properties of an object when it is created. The properties `name`, `age`, and `height` are defined in this method.

The class also includes methods (`speak`, `walk`, `sleep`) that represent the behaviors of a person. When we create an object (like `person1` or `person2`) from the `Person` class, we can access these properties and call these methods to perform actions specific to that object.

### The Benefits of Using Classes

By using classes, we can easily create multiple objects with shared properties and behaviors without repeating code. This approach makes our code more modular, easier to manage, and less prone to errors. If we need to update the behavior of all `Person` objects, we can simply update the `Person` class, and the change will apply to all instances of that class.

---

# Moving Forward with OOP

Now that we’ve introduced the concept of classes and objects, we’ll dive deeper into Object-Oriented Programming principles such as **Encapsulation**, **Inheritance**, and **Polymorphism**. These principles will further enhance your understanding of how to structure and organize your code in a powerful and efficient way.

### 1. Encapsulation

**Encapsulation** is the principle of bundling the data (attributes) and methods (functions) that operate on the data into a single unit called a **class**. It also restricts direct access to some of the object's components, which helps prevent unintended interference and misuse of the methods and data. In JavaScript, encapsulation is often implemented using closures and private fields.

-   **Private fields:** In JavaScript, private fields are declared using the `#` symbol and are only accessible within the class.

**Example:**

```javascript
class BankAccount {
    #balance; // Private field

    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.#balance = balance;
    }

    deposit(amount) {
        this.#balance += amount;
    }

    withdraw(amount) {
        if (amount <= this.#balance) {
            this.#balance -= amount;
        } else {
            console.log("Insufficient funds");
        }
    }

    getBalance() {
        return this.#balance; // Accessing the private field via a public method
    }
}

const myAccount = new BankAccount("123456", 1000);
myAccount.deposit(500);
console.log(myAccount.getBalance()); // Output: 1500
console.log(myAccount.#balance); // Error: Private field '#balance' must be declared in an enclosing class
```

In this example, `#balance` is a private field, meaning it cannot be accessed directly from outside the `BankAccount` class. Instead, you interact with this field through public methods like `deposit()`, `withdraw()`, and `getBalance()`.

### 2. Static Properties and Methods

**Static properties and methods** are tied to the class itself rather than to any particular instance of the class. They are used for data and behaviors that are shared among all instances of a class or for utility functions that do not require access to instance-specific data.

**Example:**

#### Defining a Class: `Person`

```javascript
class Person {
    static instanceCount = 0; // Static property to count instances
    static species = "Homo sapiens"; // Static property for species

    constructor(name, age, height) {
        this.name = name;
        this.age = age;
        this.height = height;
        Person.instanceCount++; // Increment the static instance count each time a new instance is created
    }

    static getInstanceCount() {
        return `There are ${this.instanceCount} instances of the Person class.`;
    }

    static describeSpecies() {
        return `All persons belong to the species ${this.species}.`;
    }

    speak() {
        return `Hello, my name is ${this.name}.`;
    }

    walk() {
        return `${this.name} is walking.`;
    }

    sleep() {
        return `${this.name} is sleeping.`;
    }
}
```

#### Creating Objects from the Class

```javascript
// Creating instances of the Person class
const person1 = new Person("Alice", 30, 165);
const person2 = new Person("Bob", 25, 175);
const person3 = new Person("Charlie", 28, 180);

// Accessing properties and calling methods
console.log(person1.speak()); // Output: Hello, my name is Alice.
console.log(person2.walk()); // Output: Bob is walking.

// Accessing static properties and methods
console.log(Person.species); // Output: Homo sapiens
console.log(Person.describeSpecies()); // Output: All persons belong to the species Homo sapiens.
console.log(Person.getInstanceCount()); // Output: There are 3 instances of the Person class.
```

#### Understanding the Example

In this example, `Person` is a class that defines both static properties and methods, as well as instance-specific properties and methods:

-   **Static Properties**: `instanceCount` tracks how many instances of the class have been created, while `species` is a shared property across all instances.
-   **Static Methods**: `getInstanceCount()` returns the total number of `Person` instances, and `describeSpecies()` provides information about the species. These methods can be called directly on the class itself without creating an instance.
-   **Instance Properties and Methods**: `name`, `age`, and `height` are properties specific to each `Person` instance, while `speak()`, `walk()`, and `sleep()` are behaviors that each instance can perform.

Using static properties and methods allows you to manage and share data or behaviors across all instances of a class without needing to create multiple copies. This helps in situations like counting instances or sharing information common to all instances, such as species in this case.

### 3. Inheritance

**Inheritance** allows a new class to inherit attributes and methods from an existing class. The class that is inherited from is called the **parent class** (or **superclass**), and the class that inherits is called the **child class** (or **subclass**). Inheritance promotes code reusability and establishes a natural hierarchy between classes.

**Example:**

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

class Cat extends Animal {
    speak() {
        console.log(`${this.name} meows.`);
    }
}

const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");

dog.speak(); // Output: Buddy barks.
cat.speak(); // Output: Whiskers meows.
```

In this example, `Dog` and `Cat` are subclasses of the `Animal` class. They inherit the `name` property and the `speak()` method from `Animal`, but each subclass provides its own implementation of `speak()`.

Certainly! We can add an example of composition involving the `Book` and `Author` classes in the "Moving Forward with OOP" section right after the discussion on inheritance. Here's how you can integrate it:

### 4. Composition

#### Building Complex Objects from Simpler Ones

**Composition** is a design principle in Object-Oriented Programming where objects are composed of other objects, creating a "has-a" relationship. This allows for creating complex objects by combining simpler, smaller objects. Composition is often used when an object is made up of multiple parts, each with its own properties and behaviors.

#### Example: `Book` and `Author` Classes

Let’s consider a `Book` class and an `Author` class. A book is composed of an author, meaning each book object will have an author object as one of its properties.

```javascript
class Author {
    constructor(name, nationality) {
        this.name = name;
        this.nationality = nationality;
        this.books = []; // A list to store books connected to the author
    }

    addBook(book) {
        this.books.push(book);
    }

    getDetails() {
        return `${this.name}, ${this.nationality}`;
    }

    getBooks() {
        return this.books.map((book) => book.title).join(", ");
    }
}

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        author.addBook(this); // Add this book to the author's list of books
    }

    getBookInfo() {
        return `${this.title} by ${this.author.getDetails()}`;
    }
}
```

#### Creating Book and Author Objects

Now, let's create a few books and their respective authors:

```javascript
// Creating author objects
const stephenKing = new Author("Stephen King", "American");
const jkRowling = new Author("J.K. Rowling", "British");

// Creating book objects with the respective authors
const book1 = new Book("The Shining", stephenKing);
const book2 = new Book("It", stephenKing);
const book3 = new Book("Harry Potter and the Philosopher's Stone", jkRowling);
const book4 = new Book("Harry Potter and the Chamber of Secrets", jkRowling);
const book5 = new Book("Harry Potter and the Prisoner of Azkaban", jkRowling);

// Accessing book information
console.log(book1.getBookInfo()); // Output: The Shining by Stephen King, American

// Finding all books by an author
console.log(stephenKing.getBooks()); // Output: The Shining, It
console.log(jkRowling.getBooks()); // Output: Harry Potter and the Philosopher's Stone, Harry Potter and the Chamber of Secrets, Harry Potter and the Prisoner of Azkaban
```

#### Understanding the Example

In this example, the `Book` class is composed of an `Author` object. This means that each book has an associated author, and you can easily access the author's details through the book. Composition allows you to model real-world relationships between objects, making your code more modular and easier to maintain.

By using composition, you can create more complex objects by combining simpler ones, rather than inheriting from a single parent class. This flexibility allows for more accurate modeling of relationships in your code.

#### Extra info about this example

This example has some added functionality which wasn't used in class: we extend the Author class to include a list of books authored by them. This allows us to easily track and retrieve all books connected to a specific author.

**Key Components:**

-   `books` **Array**: This array is added to the `Author` class to store all the books associated with that author. Every time a new book is created, it's added to this array, enabling easy retrieval of all books by that author.
-   `addBook()` **Method**: This method is responsible for adding a 1 object to the 1 array in the 1 class. It's automatically called in the `Book` constructor, ensuring that every new book is connected to its author.
-   `getBooks()` **Method**: This method returns a string listing the titles of all books associated with the author. By using the 1 function, it extracts the title of each book from the `books` array and then joins them into a single string.

These components together allow you to quickly and efficiently find all books related to a specific author, making the code more modular and easier to manage.

---

# Out of course scope

### 3. Polymorphism

**Polymorphism** means "many shapes" and refers to the ability of different classes to be treated as instances of the same class through inheritance. It allows a single method or function to work with objects of different classes as long as they share a common interface or base class.

Polymorphism in JavaScript is often demonstrated through **method overriding**.

**Example:**

```javascript
function makeAnimalSpeak(animal) {
    animal.speak();
}

const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");

makeAnimalSpeak(dog); // Output: Buddy barks.
makeAnimalSpeak(cat); // Output: Whiskers meows.
```

In this example, the `makeAnimalSpeak()` function can take any object that is an instance of a subclass of `Animal` and call its `speak()` method. The function treats `Dog` and `Cat` objects as `Animal` objects, but each object's `speak()` method is executed according to its specific implementation.

### 4. Abstraction

**Abstraction** is the principle of hiding the complex implementation details of an object and exposing only the essential features. This helps to reduce complexity and allows the programmer to focus on interactions at a higher level of abstraction without worrying about the inner workings.

In JavaScript, abstraction can be implemented by using abstract classes and interfaces (though JavaScript doesn’t have native support for abstract classes, this can be simulated using ES6 classes and methods).

**Example:**

```javascript
class Shape {
    constructor() {
        if (this.constructor === Shape) {
            throw new Error(
                "Abstract class 'Shape' cannot be instantiated directly."
            );
        }
    }

    area() {
        throw new Error("Method 'area()' must be implemented.");
    }

    perimeter() {
        throw new Error("Method 'perimeter()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }

    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area()); // Output: 200
console.log(rectangle.perimeter()); // Output: 60

const circle = new Circle(10);
console.log(circle.area()); // Output: 314.159...
console.log(circle.perimeter()); // Output: 62.831...
```

In this example, `Shape` is an abstract class that cannot be instantiated directly. The methods `area()` and `perimeter()` are abstract and must be implemented by any concrete subclass, like `Rectangle` and `Circle`. The details of how `area()` and `perimeter()` are calculated are hidden from any code that uses the `Shape` interface, allowing it to interact with shapes at a higher level of abstraction.
