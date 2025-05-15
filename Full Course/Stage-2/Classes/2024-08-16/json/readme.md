# Introduction

In JavaScript, arrays and objects are both used to store collections of data, but they serve different purposes and have distinct characteristics:

### Array (Array Object):

-   **Purpose:** Arrays are used to store an ordered collection of items. Each item in an array is called an element, and elements are accessed by their numeric index.
-   **Syntax:** Arrays are created using square brackets `[]`.
-   **Access:** Elements are accessed by their position (index) in the array, with the first element at index `0`.
-   **Example:**
    ```javascript
    let fruits = ["apple", "banana", "cherry"];
    console.log(fruits[1]); // Outputs "banana"
    ```
-   **Best For:** When you need to store a list of items in a specific order and access them by their index.

### Object (Key-Value Object):

-   **Purpose:** Objects are used to store a collection of key-value pairs. Each key (also called a property) is associated with a value.
-   **Syntax:** Objects are created using curly braces `{}`.
-   **Access:** Properties (keys) are accessed using either dot notation or bracket notation.
-   **Example:**
    ```javascript
    let person = {
        name: "John",
        age: 30,
        isStudent: true,
    };
    console.log(person.name); // Outputs "John"
    console.log(person["name"]); // Outputs "John"
    ```
-   **Best For:** When you need to store data that is associated with specific keys (descriptive names) rather than positions.

### Key Differences:

-   **Index vs. Key:** Arrays use numeric indices to access elements, while objects use named keys to access values.
-   **Order:** Array elements maintain a specific order. Object properties do not have a guaranteed order, although in practice, most environments iterate over them in the order they were added.
-   **Use Case:** Arrays are typically used for lists, while objects are used for more complex data structures where each piece of data has a descriptive name.

In summary, use an array when you need an ordered list, and use an object when you need to map keys to values.

## Trick: determine what type of object you're working with

In case you don't know if the object is an array object or a key-value object.

```js
if (Array.isArray(value)) {
    console.log("It is an array");
} else {
    console.log("It is an object");
}
```

# JSON

JSON (JavaScript Object Notation) is a lightweight data format used for storing and exchanging data between a server and a client. It is easy for humans to read and write, and it's simple for machines to parse and generate.

### Key Points:

-   **Structure:** JSON represents data as key-value pairs, similar to how objects are structured in JavaScript. It uses curly braces `{}` for objects and square brackets `[]` for arrays.
-   **Data Types:** JSON supports several data types, including strings, numbers, booleans, arrays, objects, and null.
-   **Language-Independent:** Although it is based on JavaScript syntax, JSON is language-independent and can be used with most programming languages.

### Example:

```json
{
    "title": "Introduction to Programming",
    "author": "Jane Smith",
    "publishedYear": 2020,
    "isAvailable": true,
    "genres": ["Education", "Technology"],
    "publisher": {
        "name": "TechBooks Publishing Ltd.",
        "location": "San Francisco"
    }
}
```

In this example:

-   `"title"` is a string.
-   `"author"` is a string.
-   `"publishedYear"` is a number.
-   `"isAvailable"` is a boolean.
-   `"genres"` is an array.
-   `"publisher"` is an object containing more key-value pairs.

### JSON String vs. JSON Object

In JavaScript, JSON data can be represented in two main forms:

1. **JSON String:** This is a plain text representation of a JSON object. It looks like a string in JavaScript and needs to be parsed into an object before it can be used. JSON strings are often received from APIs or stored in files.

    Example:

    ```javascript
    const jsonString = `{
        "title": "Introduction to Programming",
        "author": "Jane Smith",
        "publishedYear": 2020,
        "isAvailable": true,
        "genres": ["Education", "Technology"],
        "publisher": {
            "name": "TechBooks Publishing Ltd.",
            "location": "San Francisco"
        }
    }`;
    ```

    Here, `jsonString` is just a string in JavaScript. To work with the data inside it, you need to parse it into a JSON object.

2. **JSON Object:** This is the JavaScript object that you can interact with directly. You can access its properties, loop through arrays, and perform other operations as you would with any JavaScript object.

    Example:

    ```javascript
    const jsonObject = {
        title: "Introduction to Programming",
        author: "Jane Smith",
        publishedYear: 2020,
        isAvailable: true,
        genres: ["Education", "Technology"],
        publisher: {
            name: "TechBooks Publishing Ltd.",
            location: "San Francisco",
        },
    };
    ```

    Here, `jsonObject` is a JavaScript object that you can immediately work with.

### Converting Between JSON String and JSON Object

-   **Parsing a JSON String:** To convert a JSON string into a JavaScript object, use `JSON.parse()`.

    Example:

    ```javascript
    const parsedObject = JSON.parse(jsonString);
    console.log(parsedObject.title); // Outputs: Introduction to Programming
    ```

-   **Stringifying a JSON Object:** To convert a JavaScript object into a JSON string, use `JSON.stringify()`.

    Example:

    ```javascript
    const jsonStringified = JSON.stringify(jsonObject);
    console.log(jsonStringified);
    ```

    This is useful when you want to send data to an API or save it as text.

JSON is commonly used for APIs and configurations due to its simplicity and compatibility with various systems.

### How is this used in the real world?

**Client**

1. A client sends a JSON string to a server. This JSON string contains data. For example:
    - Account registration data (nickname, username, password)
    - A product category ID
    - Authentication data (username, login)

**Server / API**

2. Receives the JSON string
3. Converts the JSON string to an object
4. Processes the data in the object
    - Create a new user account
    - Get all products within a certain category
    - Verifies a username and a password
5. Creates a new object containing response data for the client
    - Creating the account failed or was successful
    - An array with products objects
    - Login was successful or not
6. Converts this object to a JSON string
7. Responds to the client, passing the response JSON string

**Client**

7. Receives the JSON string
8. Converts the JSON string to an object
9. Processes the data in the object
    - was the registration succesfull
    - put product data in HTML
    - was the login succesful
10. Outputs result in the browser
    - Tells if registration was a success or not
    - Show a list of products
    - Redirects user to profile page if login was a success, else shows a warning

---

# Practice

### Task 1: Create Your Own JSON

Create a simple JSON object that represents their your profile. It should include:

-   Their name (string)
-   Age (number)
-   Whether they are a student (boolean)
-   A list of their favorite programming languages (array of strings)
-   A nested object for their contact information with fields for email and phone number.

Example:

```json
{
    "name": "John Doe",
    "age": 20,
    "isStudent": true,
    "favoriteLanguages": ["JavaScript", "Python"],
    "contact": {
        "email": "john.doe@example.com",
        "phone": "123-456-7890"
    }
}
```

### Task 2: Parse and Access JSON Data

Provide a sample JSON object and ask them to write a small Node.js script that:

1. Parses the JSON string into a JavaScript object.
2. Accesses and prints specific values from the object (e.g., the name, one of the favorite languages, or the city).

Example JSON:

```json
{
    "name": "Sarah",
    "age": 22,
    "isStudent": true,
    "skills": ["React", "Node.js"],
    "address": {
        "city": "San Francisco",
        "zip": "94105"
    }
}
```

Sample Node.js Script:

```javascript
const jsonData = `{
    "name": "Sarah",
    "age": 22,
    "isStudent": true,
    "skills": ["React", "Node.js"],
    "address": {
        "city": "San Francisco",
        "zip": "94105"
    }
}`;

const parsedData = JSON.parse(jsonData);

console.log("Name:", parsedData.name);
console.log("First skill:", parsedData.skills[0]);
console.log("City:", parsedData.address.city);
```

### Task 3: Looping Through JSON Arrays

Extend the previous script to loop through an array within the JSON object, such as the `skills` array, and print each skill.

Example:

```javascript
const jsonData = `{
    "name": "Sarah",
    "age": 22,
    "isStudent": true,
    "skills": ["React", "Node.js", "HTML", "CSS"],
    "address": {
        "city": "San Francisco",
        "zip": "94105"
    }
}`;

const parsedData = JSON.parse(jsonData);

console.log("Skills:");
parsedData.skills.forEach((skill) => {
    console.log(skill);
});
```

### Task 4: Converting a JSON Object to a String

Ask the students to convert the JavaScript object back into a JSON string using `JSON.stringify()`.

Example:

```javascript
const jsonObject = {
    name: "Sarah",
    age: 22,
    isStudent: true,
    skills: ["React", "Node.js", "HTML", "CSS"],
    address: {
        city: "San Francisco",
        zip: "94105",
    },
};

const jsonString = JSON.stringify(jsonObject);

console.log("JSON String:", jsonString);
```

### Task 5: Nested Looping Through JSON Objects

Give them a more complex JSON object with nested arrays and objects, and ask them to loop through both the outer and inner elements.

Example JSON:

```json
{
    "project": "Website Development",
    "team": [
        {
            "name": "Alice",
            "role": "Frontend Developer",
            "skills": ["HTML", "CSS", "JavaScript"]
        },
        {
            "name": "Bob",
            "role": "Backend Developer",
            "skills": ["Node.js", "Express", "MySQL"]
        }
    ]
}
```

Sample Node.js Script:

```javascript
const jsonData = `{
    "project": "Website Development",
    "team": [
        {
            "name": "Alice",
            "role": "Frontend Developer",
            "skills": ["HTML", "CSS", "JavaScript"]
        },
        {
            "name": "Bob",
            "role": "Backend Developer",
            "skills": ["Node.js", "Express", "MySQL"]
        }
    ]
}`;

const parsedData = JSON.parse(jsonData);

parsedData.team.forEach((member) => {
    console.log(`Name: ${member.name}`);
    console.log(`Role: ${member.role}`);
    console.log("Skills:");
    member.skills.forEach((skill) => {
        console.log(` - ${skill}`);
    });
    console.log(""); // Add a blank line for readability
});
```
