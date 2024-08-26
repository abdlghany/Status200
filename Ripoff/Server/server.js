import http from "http";
import { URL } from "url";
import MysqlQueries from "./mysqlQueries.js";
import { clearScreenDown } from "readline";

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
    const queryParams = url.searchParams;
    // Route - GET categories
    if (request.url === "/" || request.url === "/index") {
        //Table: Categories (category_id, category_name, category_image, category_description)
        // Order by category_id desc to show new categories first.
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
    } 
    // Route GET Signup
    else if (pathname === "/signup" && queryParams) {
        doesAccountExist(queryParams.get('username'), queryParams.get('email'), function(result) {
            if (result === "success") {
                //Table: Users (user_id, user_name, password, email, phone, first_name, last_name)
                const query = "INSERT INTO USERS VALUES (NULL, ?, ?, ?, ?, ?, ?)";
                const parameters = [
                    queryParams.get('username'),
                    queryParams.get('password'),
                    queryParams.get('email'),
                    queryParams.get('phone'),
                    queryParams.get('firstName'),
                    queryParams.get('lastName')
                ];
                db.insert(query, parameters, function(err, results) {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ error: "Server error, could not fetch categories." }));
                    } else if (results.affectedRows > 0) {
                        //console.log("New user registered: " + queryParams.get('username'));
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Account successfully created! Please log in to use your account." }));
                    } else {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "An error occurred while registering your account, please try again." }));
                    }
                });
            } else {
                let message = "Username is already in use.";
                if (result === "email") {
                    message = "Email is already in use.";
                } else if (result === "DBError") {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    message = "An error occurred while registering your account to the database, please try again.";
                } else {
                    response.writeHead(200, { "Content-Type": "application/json" });
                }
                response.end(JSON.stringify({ message }));
            }
        });
    }    
    else if(pathname === "/login" && queryParams){
        // Table: Users (user_id, user_name, password, email, phone, first_name, last_name)
        var query = "SELECT user_id as id, user_name as name, email, phone, first_name, last_name FROM users ";
        // Check if isEmail is true, then use email in the WHERE clause, else use user_name
        if(queryParams.get("isEmail") == "true"){
            // Set a query that'll select based on Email.
            query += "WHERE email = ? and password = ? LIMIT 1"
        }
        else{
            // set a query that'll select based on username.
            query += "WHERE user_name = ? and password = ? LIMIT 1"
        }

        db.select(query, [queryParams.get("username"), queryParams.get("password")], function(err, results){
            if (err) {
                //if an error has happened, return code 500 with the error.
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Server error, could not check your information." }));
            } else if (results.length > 0) {
                // if results are more than 0, return them with code 200 (success*.)
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(results));
            } else {
                // if nothing was found, return 200 not found with an appropriate message.
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Wrong Username or Password." }));
            }
        });
    }
    else if (pathname === "/save" && queryParams) {
        doesEmailExist(queryParams.get('id'), queryParams.get('email'), function(result) {
            if (result === "success") {
                let query = "UPDATE USERS SET email = ?, first_name = ?, last_name = ?, phone = ? ";
                var parameters = [queryParams.get('email'), queryParams.get('firstName'), queryParams.get('lastName'), queryParams.get('phone')];
                // Either there's a password change, get the password and old password (current), then put user_id.
                var message = "No changes";
                if (queryParams.get('password')) {
                    query += ", password = ? WHERE password = ? AND user_id = ?";
                    parameters.push(queryParams.get('password'));
                    parameters.push(queryParams.get('oldPassword'));
                    parameters.push(queryParams.get('id'));
                    message = "No changes, check if your current password is correct.";
                }
                // Or there's no password so just search for user_id becuase there's no password to be checked/updated
                else{
                    query += " WHERE user_id = ?";
                    parameters.push(queryParams.get('id'));
                }
                db.insert(query, parameters, function(err, results) {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ error: "Server error, could not fetch categories." }));
                    } else if (results.changedRows === 0) {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        // Disaply a custom message if no rows were changed after the query runs successfully.
                        response.end(JSON.stringify({ message: message }));
                    } else if (results.affectedRows > 0) {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Saved successfully!" }));
                    } else {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "An error happened while updating your information, please try again." }));
                    }
                });
            } else if (result === "DBError") {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "An error happened while registering your account to the database, please try again." }));
            } else {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Email is already in use." }));
            }
        });
    }
    else if (pathname === "/addaddress" && queryParams) {
                //Table: users_addresses (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`)
                const query = "INSERT INTO users_addresses VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
                const parameters = [
                    queryParams.get('id'),
                    queryParams.get('street'),
                    queryParams.get('city'),
                    queryParams.get('state'),
                    queryParams.get('country'),
                    queryParams.get('zipcode'),
                    queryParams.get('address_label')
                ];
                db.insert(query, parameters, function(err, results) {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ error: "Server error, could not add your address." }));
                    } else if (results.affectedRows > 0) {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Address added successflly!" }));
                    } else {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "An error occurred while adding your address, please try again." }));
                    }
                });
                }
     //request isn't any of the previous pathnames           
    else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Not Found");
    }
});

function doesAccountExist(username, email = "", callback){
    db.select("SELECT * FROM USERS WHERE user_name = ? OR email = ? LIMIT 1", [username, email], function(err, results){
        if(err){callback("DBError")}
        else if(results.length > 0){
           // console.log(results);
            if (username == results[0].user_name){
                //console.log("user_name", results[0].user_name);
                callback("username");
            }
            else{
                //console.log("email", results[0].email);
                callback("email");
            }
        }
        else{
            callback("success");
        }
    });
}
function doesEmailExist(id, email = "", callback){
    db.select("SELECT * FROM USERS WHERE email = ? AND user_id != ? LIMIT 1", [email, id], function(err, results){
        if(err){callback("DBError")}
        else if(results.length > 0){
            if (email == results[0].email){
                callback("email");
            }
        }
        else{
            callback("success");
        }
    });
}
server.listen(3000, function() {
    console.log("Listening on port 3000...");
});
