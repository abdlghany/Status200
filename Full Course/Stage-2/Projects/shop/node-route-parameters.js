/**
 *
 * Inside your node server javascript
 *
 * - In this example the path looks like:
 *
 * - http://localhost:3000/api/products/102
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

    // Get the pathname
    const pathname = url.pathname;

    // Get the id from the URL
    const id = parseInt(pathname.split("/")[3]);

    // Output the id
    console.log(id);

    // Should output 102
});
