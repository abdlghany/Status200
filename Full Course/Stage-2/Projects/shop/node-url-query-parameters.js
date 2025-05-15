/**
 *
 * Inside your node server javascript
 *
 * - In this example the path looks like:
 *
 * - http://localhost:3000/api/products?id=102&name=Karel
 *
 */

// Import the HTTP module
import http from "http";

// Import the URL module
import { URL } from "url";

// Create a server object
const server = http.createServer(function (request, response) {
    // Parse the URL
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Get id from the URL Query Parameters
    const id = parseInt(url.searchParams.get("id"));

    // Get name from the URL Query Parameters
    const name = url.searchParams.get("name");

    // Output the id and name
    console.log(id, name);

    // Should output 102, "Karel"
});
