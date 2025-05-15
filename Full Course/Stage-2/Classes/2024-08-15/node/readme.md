# Node Package Manager (NPM)

## Intro

NPM is a command line tool as well as a registry of third party libraries (modules build by other people) that we can add to our Node applications.

For pretty much any functionality that you want to add to you application there is most likely a free, open source library (package or node module, whatever you want to call it) avialable on the NPM registry

Checkout https://npmjs.com, you will see it is used by more than **17 million developers** worldwide, and has more than **2 million packages**.

-   All these packages are free
-   All these packages can easily be added to your application
-   You can also share your own Node modules with others and publish them on NPM

#### NPM command line tool

We can add packages to our application using the NPM command line tool.

NPM is comes with Node. When you install Node, you also get NPM.

-   Open up your terminal
-   Run the following command:

    ```bash
    npm -v

    # This should output something like:
    # 10.8.1
    ```

-   Run the following command:

    ```bash
    node -v

    # This should output something like:
    # v20.16.0
    ```

NOTICE: The version of Node is different from the version of NPM. This is because these two programs are developed independently.

## Package.json

### Task

All these tasks should be done using the command prompt.

-   Navigate to you `Users` folder
-   Create a new folder called `Projects` inside your "_Users_" folder
-   Create a new folder `npm-demo` inside the newly created "_Projects_" folder.
-   Navigate to the new folder `npm-demo`

We're going to use this `npm-demo` folder throughout this session.

### NPM init

Before you can add any Node packages to your application, you need to create a file that is called `package.json`.

Package.json is basically a json file that includes some basic information about your application:

-   name
-   version
-   authors
-   other metadata

NOTICE: All Node application should have this package.json file.

EXTRA: [more information about JSON](#json).

## Install a Node package

We're going to install a third party library, or third party Node package called `mysql2` to our application.

-   Go to https://npmjs.com
-   Search for `mysql` and choose the package called `mysql2`
-   This should bring you to the [mysql2](https://www.npmjs.com/package/mysql2) package page
-   On the MySQL2 package page, navigate to `Installation`
-   Copy the code
    ```bash
    npm install --save mysql2
    ```
    or
    ```bash
    npm i --save mysql2
    ```

REMARK: in the latests versions of Node, you don't have to use `--save`. You can also shorten `install` and use **npm i mysql2**

#### What is happening

Open this node project in VSCode using the command prompt: `code .`

-   open package.json
    ```json
    {
        "name": "npm-demo",
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "description": "",
        "dependencies": {
            "mysql2": "^3.11.0"
        }
    }
    ```
    A new property _dependencies_ as added and inside we can se we've installed mysql2 version 3.11.0.
-   Notice that a new folder called `node_modules` was created.
    -   All third party packages will be installed in this folder.
    -   Inside this folder you'll we see a whole bunch of packages that have been installed. One of them is called `mysql2`

_So why were all these other packages installed, didn't we just ask to install mysql2 only?_

-   Open the package.json file inside the mysql2 folder.
    -   _Reminder_: all node applications have a package.json
-   Here you'll see that the mysql2 package has some dependencies itself

    ```json
    {
        "dependencies": {
            "aws-ssl-profiles": "^1.1.1",
            "denque": "^2.1.0",
            "generate-function": "^2.3.1",
            "iconv-lite": "^0.6.3",
            "long": "^5.2.1",
            "lru-cache": "^8.0.0",
            "named-placeholders": "^1.1.3",
            "seq-queue": "^0.0.5",
            "sqlstring": "^2.3.2"
        }
    }
    ```

    This means the mysql2 package itself depends on some other third party packages.

    NPM will install these packages too during the installation of mysql2, because without these other packages, the mysql2 package won't work... _it is dependent on those packages_

## Using a package

### From yesterday

`const some_module = require("somemodule");`

Order in which Node searches for the module:

1. Looks if it is a core module (like path, os and fs)
2. File or folder in this application
3. Looks inside the node_modules folder

_REMARK_: when you use a reference to a file or folder like `./` or `../` with or without a filename, Node assumes you're looking for a file relative to the folder. For example:

`require("./somemodule");`

1. First: Node will assume there's a file called _something.js_ in the same folder
2. Second: if no file is found, Node assumes the require refers to a folder and will look for a file ./somemodule/_index.js_

### Use package

Lets start using the installed mysql2 package.

#### Create your _main module_ file

-   In our package.json the "main" property is set to _index.js_. This means that index.js in our Node application will be the main module.
-   Create a file called `index.js`

#### Import mysql2 package in your Node app

```JS
// Import the mysql2 package
const mysql = require("mysql2");
```

#### Start using mysql2 package in your app

DOCUMENTATION: since we're new to this package we need some help. Well maintained Node packages usually provide documentation detailing on how to use the package.
In this case you can find it on the [mysql2 NPM page](https://www.npmjs.com/package/mysql2#documentation).

Asssuming you have loaded the documentation, you'll see that there's a "Quickstart" section. Go there and copy the code from the "First Query" section.

_REMARK: make sure you use the code mentioned in the **Callback** tab._

**Create a database connection** (connection details might differ from the example below)

```JS
// Import the mysql2 package
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bootcamp",
});
```

**Run your first query**

```JS
// Implement the mysql2 package
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bootcamp",
});

// A simple SELECT query
connection.query("SELECT * FROM `customer`", function (err, results, fields) {
    // results contains rows returned by server
    console.log(results);

    // close connection
    connection.end();
});
```

This will output something like (based on dataset used in class yesterday):

```json
[
    {
        "cust_id": 1,
        "cust_name": "Alice Johnson",
        "cust_city": "New York",
        "cust_country": "USA"
    },
    {
        "cust_id": 2,
        "cust_name": "Bob Smith",
        "cust_city": "Los Angeles",
        "cust_country": "USA"
    },
    {
        "cust_id": 3,
        "cust_name": "Carlos Gonzalez",
        "cust_city": "Mexico City",
        "cust_country": "Mexico"
    },
    {
        "cust_id": 4,
        "cust_name": "Diana Prince",
        "cust_city": "London",
        "cust_country": "UK"
    },
    {
        "cust_id": 5,
        "cust_name": "Eva Green",
        "cust_city": "Paris",
        "cust_country": "France"
    }
]
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
    "name": "Alice",
    "age": 25,
    "isStudent": false,
    "skills": ["HTML", "CSS", "JavaScript"],
    "address": {
        "city": "New York",
        "zip": "10001"
    }
}
```

In this example:

-   `"name"` is a string.
-   `"age"` is a number.
-   `"isStudent"` is a boolean.
-   `"skills"` is an array.
-   `"address"` is an object containing more key-value pairs.

JSON is commonly used for APIs and configurations due to its simplicity and compatibility with various systems.
