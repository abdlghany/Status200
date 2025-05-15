// Import the http module
import http from "http";

// Import the URL module
import { URL } from "url";

// Products array for demonstration
// In a real-world application, this data would
// be fetched from a database
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

// Create a server object
const server = http.createServer(function (request, response) {
    // Parse the URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Get the pathname
    const pathname = url.pathname;

    // Route: Home
    if (request.url === "/") {
        // Set the response header
        response.write("Hello World");

        // Close the response
        response.end();
    }
    // Route: /api/products/{?id}
    else if (pathname.startsWith("/api/products")) {
        // Get the id from the URL
        const id = parseInt(pathname.split("/")[3]);

        // Check if the id is not a number
        if (isNaN(id)) {
            // Set the response header
            response.writeHead(200, { "Content-Type": "application/json" });

            // Write the products array to the response
            response.write(JSON.stringify(products));

            // Close the response
            response.end();
        }
        // Check if the id is a number
        else {
            // Find the product with the id
            let product = null;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == id) {
                    product = products[i];
                }
            }

            // Product is found
            if (product) {
                // Set the response header
                response.writeHead(200, { "Content-Type": "application/json" });

                // Write the product to the response
                response.write(JSON.stringify(product));

                // Close the response
                response.end();
            }
            // Product is not found
            else {
                // Set the response status code
                response.statusCode = 404;

                // Write "Not Found" to the response
                response.write("Not Found");

                // Close the response
                response.end();
            }
        }
    }
    // Route: invalid / undefined
    else {
        // Set the response status code
        response.statusCode = 404;

        // Write "Not Found" to the response
        response.write("Not Found");

        // Close the response
        response.end();
    }
});

// Listen on port 3000
server.listen(3000);

// Log message to Console to know the server is running
console.log("Listening on port 3000 ...");
