# HTTP Module

-   This is a core module of Node.

-   We can use it to create a web server that listens to HTTP requests on a given port.

-   With this we can create a back-end server that listens to our client application, for example a website or a mobile app.

-   Module [documentation](https://nodejs.org/docs/latest/api/http.html)

### Load the HTTP module

```js
const http = require("http");
```

or

```js
import http from "http";
// Don't forget to make sure you package.json has "type": "module" in it.
```

### Create a server

```js
import http from "http";

const server = http.createServer();
```

-   `createServer()` is one of the functions defined in the http module. It allows us to create a web server.

**_NOTE:_**

-   This server is an _EventEmitter_. It has all the capabilities of EventEmitter which we saw earlier. Try (IntelliSense):
    -   server.emit()
    -   server.addListener()
    -   server.on() - which is an alias of addListener
-   In the [documentation](https://nodejs.org/docs/latest/api/http.html) of the module
    -   Click on `http.createServer([options][, requestListener])`
    -   Click on `<http.Server>` where it says "Returns: <http.Server>"
    -   Click on `<net.Server>` where it says "Extends: <net.Server>"
    -   Here you'll see it extends `<EventEmitter>`
-   Summed up:
    -   http.createServer() returns a class http.Server
    -   http.Server class extends net.Server class
        -   note that this is another module the _http_ module depends on
    -   net.Server class extends the EventEmitter class
        -   note that this is another module the _net_ module depends on

### Setup the server

#### Create a server that listen on port 3000.

```js
import http from "http";

const server = http.createServer();

server.listen(3000);

console.log("Listening on port 300...");
```

-   When we run this application this server will listen on port 3000
-   Everytime there is a new connection or request to the server, the server raises an event.
-   We can use the `addListener()` method or `on()` which is an alias for addListener().

#### Register a listener / handler.

```js
import http from "http";

const server = http.createServer();

server.addListener("connection", (socket) => {
    console.log("New connection...");
});

server.listen(3000);

console.log("Listening on port 3000...");
```

-   How do you know teh event raised is called "connection" and that the callback function receives something called "socket"?
    -   The documentation
    -   IntelliSense if installed

##### Test what we have so far

-   Run the script

    -   In the terminal it shows "Listening on port 3000..."

-   Open http://localhost:3000 in the browser

    -   In the terminal it shows "New connection..."

#### Change handler

Normally we dont't use this addListener() method. It's very low level. Instead we do this:

```js
import http from "http";

const server = http.createServer((req, res) => {
    if (request.url === "/") {
        response.write("Hello World");
        response.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000...");
```

##### Test again

-   Run the script

    -   In the terminal it shows "Listening on port 3000..."

-   Open http://localhost:3000 in the browser

    -   Now it show "Hello World" in the browser

#### Routing

Routes are simply different URLs that your server can respond to. Each route is a specific path or address that the server recognizes and handles.

Imagine a house with different rooms. Each room has a different purpose—one for the kitchen, another for the bedroom, and so on. Routes are like these different rooms, but instead of being physical locations, they are URLs.

**Example:**

-   `/` - The home page (like the front door).
-   `/about` - The about page (like the kitchen).
-   `/contact` - The contact page (like the bedroom).

**Add a route**

```js
import http from "http";

const products = [
    {
        id: 1,
        name: "Product 1",
    },
    {
        id: 2,
        name: "Product 2",
    },
    {
        id: 3,
        name: "Product 3",
    },
];

const server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.write("Hello World");
        response.end();
    }

    if (request.url === "/api/products") {
        // response.writeHead(200, { "Content-Type": "application/json" });
        const response = JSON.stringify(products);
        response.write(response);
        response.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000...");
```

-   This new route `/api/products/` tells the back-end service the website want a list of products from teh database.
-   The back-end service queries the database and sends back the results to the client. In this case a JSON string.
-   The client receives this JSON string and can convert it to an obect, manipulate the HTML and show the products.

#### Parameters

**URL Query Parameters**

`http://localhost:3000/api/products?product_id=2`

Give me the details of a product with ID 2. The id the client is looking for is passed in the URL using `?product_id=2`. Checkout:

-   [example-query-parameters.js](example-query-parameters.js) an example on how to work with `URL query parameters`

**Route parameters**

`http://localhost:3000/api/products/2`

Give me the details of a product with ID 2. The id the client is looking for is passed in the URL using /api/products/`2`. Checkout:

-   [example-route-parameters.js](example-route-parameters.js) an example on how to work with `route parameters`

## Node server template

-   [server-template.js](server-template.js) a template you can use for setting up a node http server

```js
import http from "http";
import { URL } from "url";

// Categories - dummy data
// For demonstration purposes, in real-world applications,
// this data would be fetched from a database.
const categories = [
    {
        id: 1,
        name: "Category 1",
    },
    {
        id: 2,
        name: "Category 2",
    },
    {
        id: 3,
        name: "Category 3",
    },
];

const server = http.createServer((request, response) => {
    // Set CORS headers
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Get path
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;

    // Route - GET welcome
    if (request.url === "/") {
        // Response
        response.write("Welcome to my API");
    }
    // Route - GET all categories
    else if (pathname.startsWith("/api/categories/")) {
        // Tell client response is JSON string
        response.writeHead(200, { "Content-Type": "application/json" });

        // Response
        response.write(JSON.stringify(categories));
    }
    // Route - invalid
    else {
        // Set response status code
        response.statusCode = 404;

        // Response
        response.write("Not Found");
    }

    // Close response
    response.end();
});

server.listen(3000);

console.log("Listening on port 3000...");
```

## Final thoughts on node http module

-   In real world applications we would rarely use this approach to setup a webserver.
    -   You can imagine the code inside the callback becoming difficult to read with a large applications.
    -   Nevertheless it's a easy way to start building your first API and work with HTTP requests and responses between a client and a server.
-   Instead we would use a framework called express, which helps us to keep a clean code structure while handling imcomming requests.
    -   express is build on top of this http module.
-   More on this in Stage 3.

---

# HTTP Methods (Out of course scope for now)

When creating a server that handles different routes, it's also important to understand the different types of HTTP methods that can be used to interact with those routes. The most common ones are GET and POST, but there are others like PUT, DELETE, PATCH, and OPTIONS.

1. **GET**

    - Used to request data from a specified resource.
    - It’s the most common and simple method; usually, it doesn’t change anything on the server.
    - When you open a website in a browser, you are making a GET request to that server.

2. **POST**

    - Used to send data to a server to create or update a resource.
    - Unlike GET, POST requests might change data on the server (e.g., submitting a form).
    - It's often used when sending complex data, like form submissions or file uploads.

3. **PUT**

    - Used to update a resource on the server.
    - If the resource does not exist, PUT can create it.

4. **DELETE**

    - Used to delete a specified resource from the server.

5. **PATCH**

    - Used to apply partial modifications to a resource.

6. **OPTIONS**
    - Used to describe the communication options for the target resource.
    - It is often used in preflight requests when dealing with CORS (Cross-Origin Resource Sharing).

### Handling GET and POST Requests

```js
import http from "http";

const server = http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/") {
        response.write("Hello World");
        response.end();
    } else if (request.method === "GET" && request.url === "/api/products") {
        // Get all products from database
        // Return all products
        response.write(
            JSON.stringify([
                { id: 1, name: "Product 1" },
                { id: 2, name: "Product 2" },
                { id: 3, name: "Product 3" },
            ])
        );
        response.end();
    } else if (request.method === "POST" && request.url === "/api/products") {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        request.on("end", () => {
            // Create new product in databse
            // Return new product

            response.write(JSON.stringify({ id: 4, name: "Product 4" }));
            response.end();
        });
    } else {
        response.statusCode = 404;
        response.write("Not Found");
        response.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000...");
```

### Final Thoughts on HTTP Methods

-   Understanding HTTP methods is crucial as it allows you to properly design and interact with APIs.
-   In real-world applications, you'll often need to handle different methods for the same route. For instance, `GET /api/products` could return a list of products, while `POST /api/products` could allow you to add a new product.
