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
	else if (pathname.startsWith("/api/categories")) {
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
