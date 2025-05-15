// Import the necessary modules
import http from "http";
import { URL } from "url";
import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
	host: "localhost",
	user: "root",
	database: "bootcamp-client-server",
};

// Create a connection pool with the database
const pool = mysql.createPool(dbConfig);

// Helper function to execute SQL queries
async function executeQuery(query, params = []) {
	try {
		const [results] = await pool.execute(query, params);
		return results;
	} catch (err) {
		throw new Error(`Database query failed: ${err.message}`);
	}
}

// Helper function to handle responses
function sendResponse(response, statusCode, data, contentType = "application/json") {
	response.statusCode = statusCode;
	response.setHeader("Content-Type", contentType);
	response.write(contentType === "application/json" ? JSON.stringify(data) : data);
	response.end();
}

// Route handlers
async function handleRoot(request, response) {
	sendResponse(response, 200, { message: "Welcome to my API" });
}

async function handleGetCategories(request, response) {
	try {
		const categories = await executeQuery("SELECT * FROM categories");
		sendResponse(response, 200, categories);
	} catch (err) {
		console.error(err);
		sendResponse(response, 500, { error: "Server Error" });
	}
}

async function handleGetProductsInCategory(request, response, categoryID) {
	try {
		const products = await executeQuery("SELECT * FROM products WHERE category_id = ?", [categoryID]);
		sendResponse(response, 200, products);
	} catch (err) {
		console.error(err);
		sendResponse(response, 500, { error: "Server Error" });
	}
}

async function handleGetProductDetails(request, response, productID) {
	try {
		const [product] = await executeQuery("SELECT * FROM products WHERE id = ?", [productID]);
		if (product) {
			sendResponse(response, 200, product);
		} else {
			sendResponse(response, 404, { error: "Product not found" });
		}
	} catch (err) {
		console.error(err);
		sendResponse(response, 500, { error: "Server Error" });
	}
}

async function handleNotFound(request, response) {
	sendResponse(response, 404, { error: "Not Found" });
}

// Create an HTTP server
const server = http.createServer(async (request, response) => {
	// Set CORS headers
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type");

	// Parse the URL and extract the pathname and ID (if present)
	const url = new URL(request.url, `http://${request.headers.host}`);
	const pathElements = url.pathname.split("/");
	const route = pathElements[1];
	const id = parseInt(pathElements[3]);

	// Route handling
	switch (route) {
		case "":
			await handleRoot(request, response);
			break;
		case "api":
			switch (pathElements[2]) {
				case "categories":
					if (isNaN(id)) {
						await handleGetCategories(request, response);
					} else {
						await handleGetProductsInCategory(request, response, id);
					}
					break;
				case "products":
					if (!isNaN(id)) {
						await handleGetProductDetails(request, response, id);
					} else {
						await handleNotFound(request, response);
					}
					break;
				default:
					await handleNotFound(request, response);
			}
			break;
		default:
			await handleNotFound(request, response);
	}
});

// Start the server and listen on port 3000
server.listen(3000, () => {
	console.log("Server is listening on port 3000...");
});
