import http from "http";
import { URL } from "url";
import MysqlQueries from "./mysqlQueries.js";

const db = new MysqlQueries();
db.connect();

const server = http.createServer(function(request, response) {
    // Set CORS headers
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Get path
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;

    // Route - GET categories
    if (request.url === "/" || request.url === "/index.html") {
        // order by category_id desc to show new categories first.
        db.select("SELECT * FROM categories ORDER BY category_id DESC", function(err, results) {
            if (err) {
                //if an error has happened, return code 500 with the error.
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Server error, could not fetch categories." }));
            } else if (results.length > 0) {
                // if results are more than 0, return them with code 200 (success*.)
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(results));
            } else {
                // if nothing was found, return 404 not found with an appropriate message.
                response.writeHead(404, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "No categories found." }));
            }
        });
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Not Found");
    }
});

server.listen(3000, function() {
    console.log("Listening on port 3000...");
});
