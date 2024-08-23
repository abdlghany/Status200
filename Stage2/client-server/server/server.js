import http from "http";
import { URL } from "url";
import MysqlQueries  from "./mysqlQueries.js";
import { CLIENT_RENEG_LIMIT } from "tls";

const db = new MysqlQueries();
db.connect();

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
    else if (pathname.startsWith("/categories")) {
        // /categories/ means that a category has been clicked, so fetch and show it's products.
        if(pathname.startsWith("/categories/")){
            const categoryId = parseInt(pathname.split("/")[2]);
            var products = "";
            db.select("SELECT product_id, product_name, product_description, product_price, product_quantity from products where category_id = ?",[categoryId],function(err, results){
                if(results){
                    products = results;
                }
                else{
                    products = "Server error, could not fetch products.";
                }
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(products));
                response.end();
            });
        }
        else{
            var categories = "";
            db.select("SELECT category_id, category_name, category_description from categories",function(err, results){
                response.writeHead(200, { "Content-Type": "application/json" });
                if(results){
                    categories = results;
                }
                else{
                    categories = "Server error, could not fetch categories.";
                }
                response.write(JSON.stringify(categories));
                response.end();
            });
        }
        
       
    }
    // Route - invalid
    else {
        // Set response status code
        response.statusCode = 404;

        // Response
        response.write("Not Found");
    } 
    //db.disconnect();
});

server.listen(3000);

console.log("Listening on port 3000...");