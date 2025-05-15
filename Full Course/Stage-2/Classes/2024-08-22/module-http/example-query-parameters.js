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
        category_id: 1,
    },
    {
        id: 2,
        name: "Product 2",
        category_id: 2,
    },
    {
        id: 3,
        name: "Product 3",
        category_id: 2,
    },
];

// Create a server object
const server = http.createServer(function (request, response) {
    // Parse the URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Get the pathname
    const pathname = url.pathname;

    // Route: Home
    if (pathname === "/") {
        response.write("Hello World");
        response.end();
    }
    // Route: /api/products?product_id=2
    else if (pathname === "/api/products") {
        // Get the product_id from the query parameters
        const productId = parseInt(url.searchParams.get("product_id"));

        // Check if the product_id is provided and is a number
        if (!isNaN(productId)) {
            // Find the product with the provided product_id
            const product = products.find(
                (product) => product.id === productId
            );

            // Product found
            if (product) {
                // Set the response header
                response.writeHead(200, { "Content-Type": "application/json" });

                // Write the product to the response
                response.write(JSON.stringify(product));
            } else {
                // Set the response status code
                response.statusCode = 404;

                // Write "Not Found" to the response
                response.write("Not Found");
            }
        } else {
            // Set the response header
            response.writeHead(200, { "Content-Type": "application/json" });

            // Write all products to the response if no product_id is provided
            response.write(JSON.stringify(products));
        }

        // Close the response
        response.end();
    }
    // Route not found
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
