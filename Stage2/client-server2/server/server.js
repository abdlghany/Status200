import http from "http";
import { URL } from "url";

// Categories - dummy data
// For demonstration purposes, in real-world applications,
// this data would be fetched from a database.
const categoriesArray = [
	{ id: 1, name: "Electronics" },
	{ id: 2, name: "Books" },
	{ id: 3, name: "Clothing" },
];

const productsArray = [
	{ id: 1, category_id: 1, name: "Smartphone" },
	{ id: 2, category_id: 1, name: "Laptop" },
	{ id: 3, category_id: 1, name: "Headphones" },
	{ id: 4, category_id: 2, name: "Fiction Book" },
	{ id: 5, category_id: 2, name: "Non-fiction Book" },
	{ id: 6, category_id: 3, name: "T-shirt" },
	{ id: 7, category_id: 3, name: "Jeans" },
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
	else if (pathname.startsWith("/api/categories")) {
		// Response
		response.write(JSON.stringify(categoriesArray));
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

// parseInt(pathname.split("/")[3]);