import http from "http";
import { URL } from "url";
import MysqlQueries  from "./mysqlQueries.js";

const db = new MysqlQueries();
db.connect();

const products = {
    category1:[{
        id:1,
        name: "Category 1 Product 1"
    },
    {
        id:2,
        name: "Category 1 Product 2"
    },
    {
        id:3,
        name: "Category 1 Product 3"
    },],

    category2:[{
        id:1,
        name: "Category 2 Product 1"
    },
    {
        id:2,
        name: "Category 2 Product 2"
    },
    {
        id:3,
        name: "Category 2 Product 3"
    },],

    category3: [{
        id:1,
        name: "Category 3 Product 1"
    },
    {
        id:2,
        name: "Category 3 Product 2"
    },
    {
        id:3,
        name: "Category 3 Product 3"
    },]
};
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
        var categories = "";
        db.select("SELECT category_id, category_name, category_description from categories",function(err, results){
            if(results){
                categories = results;
            }
            else{
                categories = "Server error, could not fetch categories.";
            }
            const id = parseInt(pathname.split("/")[3]);
            if(!isNaN(id)){
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(products["category"+id]));
                response.end();
            }
            else{
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(categories));
                response.end();
            }
        });
       
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