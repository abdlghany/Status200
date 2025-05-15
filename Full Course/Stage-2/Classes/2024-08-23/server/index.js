// Import the HTTP module to create a server
import http from "http";

// Import the URL module to parse request URLs
import { URL } from "url";

// Categories - dummy data
// For demonstration purposes, in real-world applications,
// this data would be fetched from a database.
const categoriesArray = [
	{ id: 1, name: "Electronics" },
	{ id: 2, name: "Books" },
	{ id: 3, name: "Clothing" },
];

// Products - dummy data
// For demonstration purposes, in real-world applications,
// this data would be fetched from a database.
const productsArray = [
	{ id: 1, category_id: 1, name: "Smartphone" },
	{ id: 2, category_id: 1, name: "Laptop" },
	{ id: 3, category_id: 1, name: "Headphones" },
	{ id: 4, category_id: 2, name: "Fiction Book" },
	{ id: 5, category_id: 2, name: "Non-fiction Book" },
	{ id: 6, category_id: 3, name: "T-shirt" },
	{ id: 7, category_id: 3, name: "Jeans" },
];

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

	// Route - GET welcome message
	if (request.url === "/") {
		// Response with a welcome message
		response.write("Welcome to my API");
	}
	// Route - GET all categories or products in a specific category
	else if (pathname.startsWith("/api/categories")) {
		// Split the pathname to extract the category ID if present
		const pathElements = pathname.split("/");

		// Extract the category ID from the pathElements array
		let categoryID = pathElements[3];

		// Convert the category ID to an integer
		categoryID = parseInt(categoryID);

		// Client requesting all categories
		if (isNaN(categoryID)) {
			// Respond with the categories data in JSON format
			response.write(JSON.stringify(categoriesArray));
		}
		// Client requesting products in a specific category
		else {
			// Create an empty array to store the filtered products
			let products = [];

			// Loop through the products array
			for (let i = 0; i < productsArray.length; i++) {
				// Filter products by the category ID
				if (productsArray[i].category_id === categoryID) {
					// Add the product to the products array
					products.push(productsArray[i]);
				}
			}

			// Respond with the filtered products in JSON format
			response.write(JSON.stringify(products));
		}
	}
	// Route - GET product details
	else if (pathname.startsWith("/api/products")) {
		// Split the pathname to extract the product ID
		const pathElements = pathname.split("/");

		// Extract the product ID from the pathElements array
		let productID = pathElements[3];

		// Convert the product ID to an integer
		productID = parseInt(productID);

		// Create an empty object to store the product details
		let product = {};

		// Loop through the products array
		for (let i = 0; i < productsArray.length; i++) {
			// Find the product that matches the product ID
			if (productsArray[i].id === productID) {
				// Assign the product details to the product object
				product = productsArray[i];
			}
		}

		// Respond with the product details in JSON format
		response.write(JSON.stringify(product));
	}
	// Route - invalid or unknown routes
	else {
		// Set response status code to 404 (Not Found)
		response.statusCode = 404;

		// Respond with a "Not Found" message
		response.write("Not Found");
	}

	// Close the response
	response.end();
});

// Start the server and listen on port 3000
server.listen(3000);

// Log that the server is running
console.log("Listening on port 3000...");
