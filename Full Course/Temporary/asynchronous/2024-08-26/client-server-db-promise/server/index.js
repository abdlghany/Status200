// Import the HTTP module to create a server
import http from "http";

// Import the URL module to parse request URLs
import { URL } from "url";

// import mysql2 module
import mysql from "mysql2";

// Create a connection with the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "bootcamp-client-server",
});

// Verify if connection was established successfully
db.connect((err) => {
	// Handle any errors
	if (err) {
		// Set response status code to 404 (Not Found)
		response.statusCode = 500;

		// Respond with a "Server Error");" message
		response.write("Server Error");
	}
});

// Create an HTTP server
const server = http.createServer((request, response) => {
	// Set CORS headers to allow cross-origin requests
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type");

	// Parse the URL from the incoming request
	const url = new URL(request.url, `http://${request.headers.host}`);

	// Extract the pathname from the URL
	const pathname = url.pathname;

	// Split the pathname to extract an ID if present
	const pathElements = pathname.split("/");

	// Route - GET welcome message
	if (request.url === "/") {
		// Response with a welcome message
		response.write("Welcome to my API");
		response.end();
	}
	// Route - GET all categories or products in a specific category
	else if (pathname.startsWith("/api/categories")) {
		// Extract the category ID from the pathElements array
		let categoryID = pathElements[3];

		// Convert the category ID to an integer
		categoryID = parseInt(categoryID);

		// Client requesting all categories
		if (isNaN(categoryID)) {
			// Create a query to select all categories
			let query = "SELECT * FROM categories";

			// Execute the query
			executeQuery(query)
				.then((result) => {
					returnResponse(response, 200, JSON.stringify(result));
				})
				.catch((err) => {
					console.log(err);
					returnResponse(response, 500, "Server Error");
				});
		}
		// Client requesting products in a specific category
		else {
			// Create a query to select all products in the specified category
			let query = "SELECT * FROM products WHERE category_id=" + categoryID;

			// Execute the query
			executeQuery(query)
				.then((result) => {
					returnResponse(response, 200, JSON.stringify(result));
				})
				.catch((err) => {
					console.log(err);
					returnResponse(response, 500, "Server Error");
				});
		}
	}
	// Route - GET product details
	else if (pathname.startsWith("/api/products")) {
		// Extract the product ID from the pathElements array
		let productID = pathElements[3];

		// Convert the product ID to an integer
		productID = parseInt(productID);

		// Create a query to select the product with the specified ID
		let query = "SELECT * FROM products WHERE id=" + productID;

		// Execute the query
		executeQuery(query)
			.then((result) => {
				// Success
				returnResponse(response, 200, JSON.stringify(result[0]));
			})
			.catch((err) => {
				// Error
				console.log(err);
				returnResponse(response, 500, "Server Error");
			});
	}
	// Route - invalid or unknown routes
	else {
		// Error - requested URL is not supported
		returnResponse(response, 404, "Not Found");
	}
});

function returnResponse(response, status, message) {
	// Set response status code
	response.statusCode = status;

	// Respond with the message
	response.write(message);

	// Close the response
	response.end();
}

function executeQuery(query) {
	return new Promise((resolve, reject) => {
		// Execute the query
		db.query(query, (err, result) => {
			// Handle any errors
			if (err) {
				reject(err);
			}

			// Return the result
			resolve(result);
		});
	});
}

// Start the server and listen on port 3000
server.listen(3000);

// Log that the server is running
console.log("Listening on port 3000...");
