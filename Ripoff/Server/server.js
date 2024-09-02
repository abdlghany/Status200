import http from "http";
import { URL } from "url";
import MysqlQueries from "./mysqlQueries.js";
import createNewReceipt from "./pdfGenerator.js";
import { send, sendPDF } from './emailSender.js';
const db = new MysqlQueries();
db.connect();
var passwordResetCodes = {};
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
        const query = "SELECT * FROM categories ORDER BY category_id DESC";
        db.query(query, function(err, results) {
            if (err) {
                //if an error has happened, return code 500 with the error.
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Server error, could not fetch categories." }));
            } else if (results.length > 0) {
                // if results are more than 0, return them with code 200 (success*.)
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(results));
            } else {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "No categories found." }));
            }
        });
    } 
    // Route GET Signup
    else if (pathname === "/signup" && queryParams) {
        doesAccountExist(queryParams.get('username'), queryParams.get('email'), function(result) {
            if (result === "success") {
                //Table: Users (user_id, user_name, password, email, phone, first_name, last_name, is_Active)
                const query = "INSERT INTO USERS VALUES (NULL, ?, ?, ?, ?, ?, ?, 1)";
                const parameters = [
                    queryParams.get('username'),
                    queryParams.get('password'),
                    queryParams.get('email'),
                    queryParams.get('phone'),
                    queryParams.get('firstName'),
                    queryParams.get('lastName')
                ];
                db.query(query, parameters, function(err, results) {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ error: "Server error, could not fetch categories." }));
                    } else if (results.affectedRows > 0) {
                        //console.log("New user registered: " + queryParams.get('username'));
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Account successfully created! Please log in to use your account." }));
                    } else {
                        response.writeHead(200, { "Content-Type": "application/json" });
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
            query += "WHERE email = ? AND password = ? AND is_active = 1 LIMIT 1"
        }
        else{
            // set a query that'll select based on username.
            query += "WHERE user_name = ? AND password = ? AND is_active = 1 LIMIT 1"
        }

        db.query(query, [queryParams.get("username"), queryParams.get("password")], function(err, results){
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
                response.end(JSON.stringify({ message: "Inactive account or Wrong Username or Password." }));
            }
        });
    }
    else if (pathname === "/save" && queryParams) {
        doesEmailExist(queryParams.get('id'), queryParams.get('email'), function(result) {
            if (result === "success") {
                var query = "UPDATE USERS SET email = ?, first_name = ?, last_name = ?, phone = ? ";
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
                db.query(query, parameters, function(err, results) {
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
        var query; var parameters;
        // if address_id exists in the queryParams that means the user is editing an existing address, therefore I used the appropriate query and parameters to do so
        if(queryParams.get('address_id')){
            //Table: users_addresses (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`)
         query = "UPDATE users_addresses SET street = ?, city = ?, state = ?, country = ?, zip_code = ?, label = ? WHERE address_id = ?";
         parameters = [
            queryParams.get('street'),
            queryParams.get('city'),
            queryParams.get('state'),
            queryParams.get('country'),
            queryParams.get('zipcode'),
            queryParams.get('address_label'),
            queryParams.get('address_id')
        ];
        // otherwise the user is adding a new address to the list of their addresses! so the query is insert and not update.
        }else{
            //Table: users_addresses (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`)
         query = "INSERT INTO users_addresses VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
         parameters = [
            queryParams.get('id'),
            queryParams.get('street'),
            queryParams.get('city'),
            queryParams.get('state'),
            queryParams.get('country'),
            queryParams.get('zipcode'),
            queryParams.get('address_label')
        ];
        }
        db.query(query, parameters, function(err, results) {
            if (err) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Server error, could not add your address." }));
            } else if (results.affectedRows > 0) {
                response.writeHead(200, { "Content-Type": "application/json" });
                if(queryParams.get('address_id')) 
                    response.end(JSON.stringify({ message: "Address updated successflly!" }));
                else 
                    response.end(JSON.stringify({ message: "Address added successflly!" }));
            } else {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "An error occurred while adding your address, please try again." }));
            }
        });
    }
    else if (pathname === "/fetchAddresses" && queryParams) {
        //Table: users_addresses (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`)
        // order by address_id to show them in they order they were added
        const query = "SELECT * FROM users_addresses WHERE user_id = ? ORDER BY address_id";
        const parameters = [
            queryParams.get("id")
        ];
        db.query(query,parameters, function(err, results) {
            if (err) {
                //if an error has happened, return code 500 with the error.
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Server error, could not fetch addresses." }));
            } else if (results.length > 0) {
                // if results are more than 0, return them with code 200 (success*.)
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(results));
            } else {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "You don't have any addresses yet, please add an address first." }));
            }
        });
    }
    else if (pathname === "/deleteAddress" && queryParams) {
        //Table: users_addresses (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`)
        const query = "DELETE FROM users_addresses WHERE user_id = ? AND address_id = ?";
        const parameters = [
            queryParams.get('id'),
            queryParams.get('address_id')
        ];
        db.query(query, parameters, function(err, results) {
            if (err || results.length == 0) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Server error, could not remove your address." }));
                // if there are affectedRows, that means the deletion is successful.
                return;
            } 
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Address removed successflly!" }));
        });
        }
        else if (pathname === "/fetchAddress" && queryParams) {
            //Table: users_addresses (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`)
            const query = "SELECT * FROM users_addresses WHERE user_id = ? AND address_id = ?";
            const parameters = [
                queryParams.get("id"),
                queryParams.get("address_id")
            ];
            db.query(query,parameters, function(err, results) {
                if (err || results.length == 0) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Address Not found." }));
                    return;
                }
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(results));
            });
        }
        else if (pathname === "/products") {
            var parameters = [];
                var query = [`SELECT DISTINCT 
                                p.product_id as id,
                                p.product_name as name,
                                p.sold as sold,
                                ci.category_name as category_name,
                                ci.category_id as category_id,
                                pi.image_location as image,
                                p.created_at as created_at,
                                pv.variation_price as price,
                                p.is_active as is_active
                            FROM Products p
                            JOIN Categories ci ON p.category_id = ci.category_id
                            JOIN (SELECT 
                                        product_id, 
                                        MIN(image_location) AS image_location
                                    FROM 
                                        Products_images
                                    GROUP BY 
                                        product_id
                                    ) pi ON p.product_id = pi.product_id
                            JOIN 
                                Products_variations pv ON p.product_id = pv.product_id
                            WHERE pv.variation_price = (
                                        SELECT MIN(pv2.variation_price)
                                        FROM Products_variations pv2
                                        WHERE pv2.product_id = p.product_id) `];

            // if parameters have category_id, add it to the query
            if(queryParams.get("category_id")){
                query.push(`AND ci.category_id = ? `);
                parameters.push(queryParams.get("category_id"));
            }
            // if search Parameters contain Search, then add this to the query.
            if(queryParams.get("search")){
                query.push('AND (LOWER(p.product_name) LIKE LOWER("%'+queryParams.get("search")+'%") OR LOWER(p.product_description) LIKE LOWER("%'+queryParams.get("search")+'%")) ')
            }
            // if searchParameters contain order_by
            if(queryParams.get("order_by")){
                // if parameters have order_by, add it to the query
                var direction = "DESC";
                if(queryParams.get("direction")){
                    // if there's a direction in the parameters, use the line below this comment, otherwise use default = DESC
                    direction = queryParams.get("direction");
                }
                query.push("ORDER BY is_active DESC, " + queryParams.get("order_by") + " "+ direction);
            }else{
              query.push("ORDER BY is_active DESC ");  
            }
            var finalQuery = "";
            for(let i = 0; i< query.length; i++){
                finalQuery += query[i];
            }
            //console.log(finalQuery);
            db.query(finalQuery,parameters, function(err, results) {
                if (err) {
                    console.error(err);
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Internal Server Error. Please contact the site admin" }));
                    return;
                }else if(results.length == 0){
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Product not found" }));
                    return;
                }
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(results));
            });
        }
        else if (pathname === "/product" && queryParams) {
            // returned columns (image_id, image, product_id).
            var query = `SELECT image_id, image_location as image FROM products_images WHERE product_id = ? ORDER BY image_id;`;
            // returned columns (product_id, product_name, product_description, category_id, created_at, sold, product_is_active, category_name)
            query += `SELECT 
                        p.product_id,
                        p.product_name,
                        p.product_description,
                        p.category_id,
                        p.created_at,
                        p.Sold,
                        p.is_active AS product_is_active,
                        ci.category_name
                      FROM Products p
                      LEFT JOIN  Categories ci ON p.category_id = ci.category_id
                      WHERE p.product_id = ?
                      ORDER BY product_is_active DESC;`;
            // returned columns (product_id, variation_id, variation_name, variation_price, variation_stock, variation_is_active)
            query+= `SELECT 
                        p.product_id,
                        pv.variation_id,
                        pv.variation_name,
                        pv.variation_price,
                        pv.variation_stock,
                        pv.is_active AS variation_is_active
                      FROM Products p
                      LEFT JOIN Products_variations pv ON p.product_id = pv.product_id
                      WHERE p.product_id = ?
                      ORDER BY p.product_id, pv.variation_id;`;
            const parameters = [
                queryParams.get("product"),
                queryParams.get("product"),
                queryParams.get("product")
            ];
            //console.log("query:", query, "Parameters: ", parameters);
            db.query(query,parameters, function(err, results) {
                if (err || results.length == 0) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Address Not found." }));
                    return;
                }
                //console.log("results:", results);
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(results));
            });
        }
        else if (pathname === "/addToCart" && queryParams) {
            /* Table: Shopping_cart (cart_item_id, user_id, in_cart, variation_id, quantity)*/
            const query = "INSERT INTO shopping_cart VALUES (NULL, ?, 1, ?, ?)";
            // queryParams: "/addToCart?variation_id=?&quantity=?&id=?;
            const parameters = [
                queryParams.get("id"),
                queryParams.get("variation_id"),
                queryParams.get("quantity")
            ];
            db.query(query,parameters, function(err, results) {
                if (err || results.length == 0) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    console.log("Inserting into shopping cart failed at: " + Date.now());
                    response.end(JSON.stringify({ message: "Internal server error, try again later" }));
                    return;
                }
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: queryParams.get("quantity") +" Items added successfully" }));
            });
        }
        else if (pathname === "/fetchCartItems" && queryParams) {
            /* "/fetchCartItems?id=?"
                returned columns: (user_id, variation_id, total_variation_quantity, product_id, variation_name, variation_price, variation_stock, name, image)
            */
            const query = `SELECT sc.user_id,
                                  sc.variation_id,
                                  SUM(sc.quantity) as total_variation_quantity,
                                  pv.product_id,
                                  pv.variation_name,
                                  pv.variation_price,
                                  pv.variation_stock,
                                  p.product_name,
                                  pi.image_location AS image
                           FROM Shopping_cart sc
                           JOIN Products_variations pv ON sc.variation_id = pv.variation_id
                           JOIN Products p ON pv.product_id = p.product_id
                           LEFT JOIN Products_images pi ON pi.image_id = (
                                  SELECT MIN(image_id) 
                                  FROM Products_images
                                  WHERE product_id = p.product_id)
                           WHERE sc.user_id = ? AND sc.in_cart = TRUE
                           GROUP BY
                                  sc.user_id,
                                  sc.variation_id,
                                  pv.product_id,
                                  pv.variation_name,
                                  pv.variation_price,
                                  pv.variation_stock,
                                  p.product_name,
                                  image
                           HAVING total_variation_quantity > 0
                           ORDER BY sc.cart_item_id DESC;
                                  ;`;
            const parameters = [
                queryParams.get("id")
            ];
            db.query(query,parameters, function(err, results) {
                if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    console.log("Fetching cart items (/fetchCartItems) failed at: " + Date.now());
                    response.end(JSON.stringify({ message: "Internal server error '/fetchCartItems', try again later" }));
                    return;
                }
                else if(results.length == 0){
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({message: "empty cart"}));
                    return;
                }
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(results));
            });
        }
        else if (pathname === "/updateCartItemCount" && queryParams){
            /* Table: Shopping_cart (cart_item_id, user_id, in_cart, variation_id, quantity) */
            const query = "UPDATE shopping_cart SET in_cart = FALSE WHERE user_id = ? AND variation_id = ?;"; // remove item from cart (do not delete the row(s).)
            //queryParams: updateCartItemCount?variation_id=?&id=?&quantity=?;
            const parameters = [
                queryParams.get("id"),
                queryParams.get("variation_id")
            ];
            db.query(query,parameters, function(err, results) {
                if (err || results.affectedRows == 0) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    console.log("Updating shopping cart for user_id "+queryParams.get("id")+" failed at: " + Date.now());
                    response.end(JSON.stringify({ message: "Internal server error, try again later" }));
                    return;
                }
                /* Table: Shopping_cart (cart_item_id, user_id, in_cart, variation_id, quantity)*/
                const query2 = "INSERT INTO shopping_cart VALUES (NULL, ?, 1, ?, ?)";
                const parameters2 = [
                    queryParams.get("id"),
                    queryParams.get("variation_id"),
                    queryParams.get("quantity")
                ];
                db.query(query2, parameters2, function(err, results){
                    if(err || results.length == 0){
                        response.writeHead(500, { "Content-Type": "application/json" });
                        console.log("Inserting Into shopping cart (updateCartItemCount) for user_id "+queryParams.get("id")+" failed at: " + Date.now());
                        response.end(JSON.stringify({ message: "Internal server error '/updateCartItemCount', try again later" }));
                        return;
                    }
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Item quantity successfully updated to "+queryParams.get("quantity") }));

                });
            });
        }
        /*  
            --- THIS IS WHERE THE FUN BEGINS ---
            --- Here we go... ---
            Resources:
            MYSQL Start transaction:
            https://dev.mysql.com/doc/refman/8.4/en/commit.html
        */
            else if (pathname === "/order" && queryParams) {
                // extract variaion_ids and quantities from the params.
                const variation_ids = [];
                const quantities = [];
                var id ="";
                queryParams.forEach(function(value, key){
                    if(key.includes("variation_id")){
                        variation_ids.push(value)
                    }
                    else if(key.includes("quantity")){
                        quantities.push(value)
                    }
                    else if(key.includes("userId")){
                        id = parseInt(value);
                    }
                });
                
                 /* 
                    console.log("Variation IDs:", variation_ids);
                    console.log("Quantities:", quantities);
                    console.log(id);
                        Console Log output:
                            Variation IDs: [ '30', '12', '46', '43', '58' ]
                            Quantities: [ '9', '1', '3', '3', '2' ]
                            1
                */
                // get the order_total value based on variations selected and quantities and the user_id and if the item is in their cart:
                var priceQueryParameters = [];
                var totalPriceQueryParameters = [id];
                var pricesQuery = "SELECT variation_price as price from products_variations where ("
                var totalPriceQuery = "SELECT SUM(pv.variation_price * sc.quantity) as total_price FROM products_variations pv "; 
                totalPriceQuery +=    "JOIN shopping_cart sc ON sc.variation_id = pv.variation_id WHERE sc.user_id = ? AND sc.in_cart = 1 AND (";
                // looping through variation_ids and adding them to the query one by one.
                for(let i = 0; i<variation_ids.length; i++){
                     totalPriceQuery += " sc.variation_id = ? ";
                     pricesQuery += " variation_id = ? "
                    // if it's the last item, do not add OR
                    if(i != variation_ids.length-1){
                        totalPriceQuery += "OR";
                        pricesQuery += "OR";
                    }
                    totalPriceQueryParameters.push(variation_ids[i]);
                    priceQueryParameters.push(variation_ids[i]);
                };
                totalPriceQuery += ") AND sc.quantity != 0";
                pricesQuery +=")";
                var orderQueryparameters = [];
                var orderId;
                db.beginTransaction();
                // get the last order_id to increase it by 1 and get the new order_id for both tables.
                const order_idQuery = "SELECT order_id as order_id FROM orders ORDER BY order_id DESC LIMIT 1";
                db.query(order_idQuery, function(err, results) {
                    //Rollingback to make sure no changes are applies if any statement fails within the transaction
                    if(err){console.error("err:", err); db.rollback();}
                    // we got our new order_id, which is 1 more than the highest order_id in the orders table.
                    if(results){
                        orderId = parseInt(results[0].order_id + 1);
                        // Now we get total_price
                        var totalPrice;
                        db.query(totalPriceQuery, totalPriceQueryParameters, function(err2, totalPriceResults) {
                            if(err2){console.error("err2:", err2); db.rollback();}
                            if(totalPriceResults){
                                totalPrice = parseFloat(totalPriceResults[0].total_price);
                                /*  we got total_price, we have everything we need to insert into orders
                                        but first, we must get the price for order_details 
                                 */
                                var prices = [];
                                db.query(pricesQuery, priceQueryParameters, function(err3, priceResults){
                                    if(err3){console.error("err3:", err3); db.rollback();}
                                    if(priceResults){
                                        for(let i = priceResults.length-1; i>=0; i--){
                                            prices.push(priceResults[i].price);
                                        }
                                         /* We got all the needed columns to insert into order_details now, and we can begin inserting to both tables */
                                         /* TABLE: orders(order_id, user_id, datetime, total_price, order_status, order_pdf, payment_method)  */
                                        const pdfLocation = "./orderReceipts/order"+orderId+".pdf";
                                        const orderQuery = `INSERT INTO orders VALUES (?, ?, NOW(), ?, 'completed', ?, 'FPX Online Banking')`;
                                        orderQueryparameters.push(orderId, id, totalPrice, pdfLocation);
                                        db.query(orderQuery, orderQueryparameters, function(err4, ordersResults){
                                            if(err4){console.error("err4:", err4); db.rollback();}
                                            if(ordersResults){
                                                  //TABLE: order_details(order_detail_id, order_id, variation_id, quantity, price)
                                                var order_detailsQuery = "INSERT INTO ORDER_DETAILS VALUES";
                                                var order_detailsQueryParameters = [];
                                                // remove items from cart (do not delete from database):
                                                var updateCartQuery = "UPDATE shopping_cart SET in_cart = FALSE WHERE user_id = ? AND ("
                                                var updateCartQueryParameters = [id];
                                                // deduct from the available variation stock based on the order quantity
                                                var updateProductsvariations = "";
                                                var updateProductsvariationsParameters = [];
                                                // update number of sold items for this product
                                                var updateSoldProducts = "";
                                                var updateSoldProductsParameters = [];
                                                for(let i = 0; i<variation_ids.length; i++){
                                                    // Push the appropriate amount of parameters, and repeat the queries as needed.
                                                    order_detailsQueryParameters.push(orderId, variation_ids[i], quantities[i], prices[i]);
                                                    updateCartQueryParameters.push(variation_ids[i]);
                                                    updateProductsvariationsParameters.push(quantities[i], variation_ids[i]);
                                                    updateSoldProductsParameters.push(quantities[i], variation_ids[i]);
                                                    order_detailsQuery += " (NULL, ?,?,?,?)";
                                                    updateCartQuery += " variation_id = ? ";
                                                    updateProductsvariations += "UPDATE products_variations SET variation_stock = variation_stock - ? WHERE variation_id = ?;";
                                                    updateSoldProducts += "UPDATE products set sold = sold + ? WHERE product_id = (SELECT product_id from products_variations WHERE variation_id = ?);";
                                                    // add a comma + OR if it's not the last index.
                                                    if(i != (variation_ids.length-1)){
                                                        order_detailsQuery += ",";
                                                        updateCartQuery += "OR";
                                                    }
                                                    else{
                                                        updateCartQuery += ")";
                                                    }
                                                }
                                                // set variation inactive (out of stock) if it's out of stock after the order was placed
                                                updateProductsvariations += "UPDATE products_variations SET is_active = 0 WHERE variation_stock = 0;";
                                                // set product inactive (out of stock) if all of it's variations are inactive.
                                                updateProductsvariations += "UPDATE products SET is_active = 0 WHERE product_id IN (SELECT pv.product_id FROM products_variations pv GROUP BY pv.product_id HAVING SUM(pv.is_active) = 0);";
                                                db.query(order_detailsQuery, order_detailsQueryParameters, function(err5, order_detailsResults){
                                                    if(err5){console.error("err5:", err5); db.rollback();}
                                                    if(order_detailsResults){
                                                        db.query(updateCartQuery, updateCartQueryParameters, function(err6, updateCartResults){
                                                            if(err6){console.error("err6:", err6); db.rollback();}
                                                            if(updateCartResults){
                                                                db.query(updateProductsvariations, updateProductsvariationsParameters, function(err7, updateProductsVariationsResults){
                                                                    if(err7){console.error("err7:", err7); db.rollback();}
                                                                    if(updateProductsVariationsResults){
                                                                        db.query(updateSoldProducts, updateSoldProductsParameters, function(err8, updateSoldProductsResults){
                                                                            if(err8){console.error("err8:", err8); db.rollback();}
                                                                            if(updateSoldProductsResults){
                                                                                db.commit();
                                                                                //Finally...we generate PDF Invoice and send an email to the user and a success message back to the front-end.
                                                                                createNewPDF(orderId, prices, quantities, totalPrice, variation_ids, id, function(){
                                                                                    db.query("SELECT email from users where user_id = ?", [id], function(err9, emailResults){
                                                                                        if(emailResults){
                                                                                            const to = emailResults[0].email;
                                                                                            const subject = "Here's your order No."+orderId+ " receipt"; // FINISH THIS...
                                                                                            const text = "Attached is the receipt for your latest order on RipOff, Hope you enjoyed your purchase!";
                                                                                            const filename = '../Client/orderReceipts/Order'+orderId+'.pdf';
                                                                                            sendPDF(to, subject, text, filename, function(result){
                                                                                                if(result){
                                                                                                    response.writeHead(200, { "Content-Type": "application/json" });
                                                                                                    response.end(JSON.stringify({ message: "Your order was successfully placed!"}));
                                                                                                }
                                                                                                else{
                                                                                                    response.writeHead(200, { "Content-Type": "application/json" });
                                                                                                    response.end(JSON.stringify({ message: "Order placed successfully, but we had a problem Emailing you the receipt."}));
                                                                                                }
                                                                                        });
                                                                                        }
                                                                                    });
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else if (pathname === "/orderHistory" && queryParams) {
                /* "/orderHistory?id=?"
                    returned columns: (order_id, product, variation, price, quantity, date, total_order_price, status, receipt)
                */
                const query = `SELECT 
                                    od.order_id,
                                    p.product_name as product,
                                    pv.variation_name AS variation,
                                    od.price,
                                    od.quantity,
                                    o.datetime AS date,
                                    o.total_price AS total_order_price,
                                    o.order_status as status,
                                    o.order_pdf AS receipt
                                FROM 
                                    Order_details od
                                JOIN 
                                    Orders o ON od.order_id = o.order_id
                                JOIN 
                                    Products_variations pv ON od.variation_id = pv.variation_id
                                JOIN 
                                    products p ON p.product_id = pv.product_id
                                WHERE 
                                    o.user_id = ?
                                ORDER BY 
                                    date DESC;
                                      `;
                const parameters = [
                    queryParams.get("id")
                ];
                db.query(query,parameters, function(err, results) {
                    if (err || results.length == 0) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        console.log("Fetching cart items (/orderHistory) failed at: " + Date.now());
                        response.end(JSON.stringify({ message: "Internal server error '/orderHistory', try again later" }));
                        return;
                    }

                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify(results));
                });
            }
            else if (pathname === "/resetPassword" && queryParams) {
               //Table: Users (user_id, user_name, password, email, phone, first_name, last_name, is_Active)
                const query = "SELECT user_id, email from users where email = ?;";
                // queryParams: "/resetPassword?email=?";
                const parameters = [
                    queryParams.get("email")
                ];
                db.query(query,parameters, function(err, results) {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        console.log("Inserting into shopping cart failed at: " + Date.now());
                        response.end(JSON.stringify({ message: "Internal server error, try again later" }));
                        return;
                    }else if(results.length == 0){
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message:"Email does not exists" }));
                        return
                    }
                        // Generate a user-specific key and save it in the variable passwordResetCodes (Dictionary).
                        const code = generateAndStoreCode("ID-"+results[0].user_id);
                        sendEmail(results[0].email, "Password reset requested", "Your password reset code is: "+ code + " Please do not share this code with anyone else.");
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message:"Email exists" }));
                });
            }
            else if (pathname === "/submitResetPassword" && queryParams) {
                var savedCode = 0;
                const code = queryParams.get("code");
                //Table: Users (user_id, user_name, password, email, phone, first_name, last_name, is_Active)
                 const query = "SELECT user_id from users where email = ?;";
                 // queryParams: "/resetPassword?email=?";
                 const parameters = [
                     queryParams.get("email")
                 ];
                 db.query(query,parameters, function(err, results) {
                     if (err) {
                         response.writeHead(500, { "Content-Type": "application/json" });
                         console.log("Inserting into shopping cart failed at: " + Date.now());
                         response.end(JSON.stringify({ message: "Internal server error, try again later" }));
                         return;
                     }else if(results.length == 0){
                         response.writeHead(200, { "Content-Type": "application/json" });
                         // the user changed the email they initially used to get the code
                         response.end(JSON.stringify({ message:"Email does not exists" }));
                         return
                     }
                     // get the user code that was saved (for 10 mins) earlier
                     if(passwordResetCodes["ID-"+results[0].user_id]){
                        savedCode = passwordResetCodes["ID-"+results[0].user_id];
                        if(code == savedCode){
                            const query2 = "UPDATE users set password = ? where user_id = ?";
                            const parameters2 = [
                                queryParams.get("newPassword"),
                                results[0].user_id
                            ]
                            // Email is correct, code is correct, we insert the new password into the database.
                            db.query(query2, parameters2, function(err2, results2){
                                if(err2 || results2.length == 0){
                                    response.writeHead(500, { "Content-Type": "application/json" });
                                    console.log("Resetting user password failed at: " + Date.now());
                                    response.end(JSON.stringify({ message: "Internal server error, try again later" }));
                                    return;
                                }
                                response.writeHead(200, { "Content-Type": "application/json" });
                                response.end(JSON.stringify({ message:"password changed successfully" }));
                            });
                        }
                        else{
                            // wrong code entered by the user.
                            response.writeHead(200, { "Content-Type": "application/json" });
                            response.end(JSON.stringify({ message:"Wrong code" }));
                        }
                     }
                     else{
                        // if the code doesn't exist, that means it has expired.
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message:"code expired" }));
                     }
                 });
             }
            else {//request isn't any of the previous pathnames     
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end("Not Found");
            }
});

function createNewPDF(orderId, prices, quantities, totalPrice, variation_ids, id, callback){
    // get the user email to use in the PDF.
    getUserEmail(id, function(email){
        // get products names and variations to use in the PDF.
        getProductsNamesAndVariations(variation_ids, function({products, variations}) {
            var Products = products;
            for(let i = 0; i < Products.length; i++) {
                // get the first 4 words of every product name (because some products might have really long names)
                const splitProduct = Products[i].split(" ");
                Products[i] = "";  // Initialize as an empty string to build the new product name
                splitProduct.forEach(function(prod, index) {
                    // limit the name to 4 words
                    if(index <= 3) {
                        Products[i] += prod;
                        if(index != 3){
                            Products[i] += " ";
                        }
                    }
                });
                // add 3 dots to indicate that this is not the end of the product name if the name was truncated
                if(splitProduct.length >= 4) {
                    Products[i] += "...";
                }
            }
            const receipt = new createNewReceipt(orderId, getReceiptDate(), email, products, variations, prices, quantities, totalPrice);
            receipt.newReceipt(function(){
                // if we reach here, everything should be good to go.
                callback();
            });
        });    
    });
}

function getUserEmail(id, callback){
    db.query("SELECT email from users where user_id = ?;", [id], function(err, results){
        if(err){console.error("getting email error: ", err);}
        if(results){
            // return the email after the query executes
            callback(results[0].email);
        }
    });
}

function getProductsNamesAndVariations(variation_ids, callback){
    var products = [];
    var variations = [];
    var productsVariationsQuery = "SELECT p.product_name as name, pv.variation_name as variation FROM products_variations pv JOIN products p ON p.product_id = pv.product_id WHERE";
    var productsVariationsParameters = [];
    // loop through variaion ID's to create the query and populate the parameters array.
    variation_ids.forEach(function(value, index){
        productsVariationsQuery += " pv.variation_id = ? ";
        if(index != parseInt(variation_ids.length-1)){
            productsVariationsQuery += "OR";
        }
        productsVariationsParameters.push(value);
    });
    db.query(productsVariationsQuery, productsVariationsParameters, function(err, results){
        if(err){console.error("getting products names and variation names error: ", err);}
        if(results){
            results.forEach(function(result){
                products.push(result.name);
                variations.push(result.variation);
            });
        }
        callback({products, variations});
    });
    
}

function doesAccountExist(username, email = "", callback){
    db.query("SELECT * FROM USERS WHERE user_name = ? OR email = ? LIMIT 1", [username, email], function(err, results){
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
    db.query("SELECT * FROM USERS WHERE email = ? AND user_id != ? LIMIT 1", [email, id], function(err, results){
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

function getReceiptDate(){
    var date = new Date();
    var day = date.getDate().toString();
    var month = parseInt(date.getMonth()+1).toString();
    var year = date.getFullYear();

    if(day.length == 1){
        day = "0"+day.toString();
    }
    if(month.length == 1){
        month = "0"+month.toString();
    }
    return(day + "/" + month + "/" + year);
}

function sendEmail(to, subject, message){
    send(to,
        subject,
        message, function(status){
            if(status){
                //console.log(subject, " Email sent successfully.");
            }
            else{
                console.error(subject, " Email failed to send");
            }
        });
}

function generateAndStoreCode(userId) {
    // Generateing a random 6-digit number
    const code = Math.floor(100000 + Math.random() * 900000);
    passwordResetCodes[userId] = code;
    // Set a timeout to delete the code after 10 minutes (600,000 milliseconds)
    setTimeout(() => {
        delete passwordResetCodes[userId];
    }, 600000);
    return code;
}

server.listen(3000, function() {
    console.log("Listening on port 3000...");
});
