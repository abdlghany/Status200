/**
 *
 * Node.js server template
 *
 * INFO: Example routes can be changed to suit your needs.
 *
 */

// Import the HTTP module (do not change)
import http from "http";

// Import the URL module (do not change)
import { URL } from "url";

// Create a server object  (do not change)
const server = http.createServer((request, response) => {
    // Set response headers (do not change)
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Parse the URL (do not change)
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Get the pathname (do not change)
    const pathname = url.pathname;

    // Route - GET welcome
    if (pathname === "/") {
        // Create a welcome message
        const message = { message: "Welcome to my API" };

        // Tell client response is JSON string
        response.writeHead(200, { "Content-Type": "application/json" });

        // Response
        response.write(JSON.stringify(message));

        // Close response
        response.end();
    }
    // Example route - GET all categories
    else if (pathname === "/api/categories") {
        // Fetch categories from database
        // SELECT * FROM categories;

        // Dummy data
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

        // Tell client response is JSON string
        response.writeHead(200, { "Content-Type": "application/json" });

        // Response
        response.write(JSON.stringify(categories));

        // Close response
        response.end();
    } else if (pathname === "/api/category") {
        /**
         * Example route
         *
         * GET category by id using URL Query Parameters
         *
         * http://localhost:3000/api/category?id=1
         */
        // Get id from the URL Query Parameters
        const id = parseInt(url.searchParams.get("id"));

        // Fetch category from database
        // SELECT * FROM categories WHERE id = id;

        // Dummy data
        const category = {
            id: id,
            name: `Category ${id}`,
        };

        // Tell client response is JSON string
        response.writeHead(200, { "Content-Type": "application/json" });

        // Response
        response.write(JSON.stringify(category));

        // Close response
        response.end();
    } else if (pathname.startsWith("/api/categories")) {
        /**
         * Example route
         *
         * GET category by id using URL Route Parameters
         *
         * http://localhost:3000/api/categories/1
         */
        // Get id from the URL
        const id = parseInt(pathname.split("/")[3]);

        // Fetch category from database
        // SELECT * FROM categories WHERE id = id;

        // Dummy data
        const category = {
            id: id,
            name: `Category ${id}`,
        };

        // Tell client response is JSON string
        response.writeHead(200, { "Content-Type": "application/json" });

        // Response
        response.write(JSON.stringify(category));

        // Close response
        response.end();
    }
    // Route - invalid
    else {
        // Create a message
        const message = { message: "Not Found" };

        // Tell client response is JSON string
        response.writeHead(404, { "Content-Type": "application/json" });

        // Response
        response.write(JSON.stringify(message));

        // Close response
        response.end();
    }
});

// Start the server  (do not change)
server.listen(3000);

// Output message to console (do not change)
console.log("Listening on port 3000...");
