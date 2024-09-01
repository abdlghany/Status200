import mysql from "mysql2";
// Enable multiple Query Statements in 1 call.
class MysqlQueries{
    #connection ;
    #config = {
        host: "localhost",
        user: "abdalghany",
        password: "ohitsme",
        database:"ripoff",
        multipleStatements: true
      };
    constructor(){
        this.#connection  = mysql.createConnection(this.#config);
    }
    connect() {
        this.#connection.connect(function(err) {
            if (err) {
                console.error("Error connecting to the database", err.message);
            } else {
                console.log("Connected to the database.");
            }
        });
    }

    disconnect() {
        this.#connection.end(function(err) {
            if (err) {
                console.error("Error disconnecting from the database:", err.message);
            } else {
            }
        });
    }
    beginTransaction(){
        this.#connection.beginTransaction(function(err){
            if(err){
                console.err("Error beginning a transaction");
            }
        });
    }
    commit(){
        this.#connection.commit(function(err){
            if(err){
                console.err("Error beginning a transaction");
            }
        });
    }
    createTable(query) {
        this.#connection.query(query, function(err, result) {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
            }
        });
    }

    query(query, values, callback){
        this.#connection.query(query,values, function(err, results){
            if (err) {
                console.error("Error querying data:", err.message);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
    rollback(){
        this.#connection.rollback(function(err){
            if(err) {
                console.error("Error querying data:", err.message);
                callback(err, null);
            }
        });
    }

}

export default MysqlQueries;
/*
MYSQL statements that I used to create the tables: 

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_image VARCHAR(255),
    category_description TEXT
);
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    phone VARCHAR(15),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    is_active tinyint(1)
);
CREATE TABLE Users_addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    street VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    zip_code CHAR(5),
    label VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_description TEXT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Sold INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
CREATE TABLE Products_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_location VARCHAR(255) NOT NULL,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE Products_variations (
    variation_id INT AUTO_INCREMENT PRIMARY KEY,
    variation_price DECIMAL(10, 2) NOT NULL,
    variation_stock INT(50) DEFAULT 0,
    variation_name VARCHAR(50) NOT NULL,
    product_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE Order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    variation_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (variation_id) REFERENCES Products_variations(variation_id)
);
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    order_pdf TEXT,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Shopping_cart (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    in_cart BOOLEAN DEFAULT TRUE,
    variation_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (variation_id) REFERENCES Products_variations(variation_id)
);

-- mysql statements that I used to populate the tables:

INSERT INTO categories (category_name, category_description, category_image) VALUES
('Electronics', 'Devices and gadgets', './img/categories/electronics.png'),
('Home Appliances', 'Appliances for home use', './img/categories/home_appliances.png'),
('Clothing', 'Men and women apparel', './img/categories/clothes.png'),
('Books', 'Various genres of books', './img/categories/Books.png'),
('Furniture', 'Household and office furniture', './img/categories/furniture.png'),
('Sports Equipment', 'Gear and equipment for sports', './img/categories/sports_equipment.png'),
('Toys', 'Toys and games for children', './img/categories/toys.png'),
('Beauty Products', 'Cosmetics and skincare', './img/categories/beauty_products.png'),
('Groceries', 'Fresh food and household items', './img/categories/groceries.png'),
('Accessories', 'Various accessories for all of your needs.', './img/categories/accessories.png');
 -- Example of products_variations Insertion
 INSERT INTO `products_variations`(`variation_id`, `variation_price`, `variation_stock`, `variation_name`, `product_id`, `is_active`);
 INSERT INTO `products_variations` VALUES (NULL,180.00,65,'Black',20,1);
Categories (category_id, category_name, category_image, category_description);

Users (user_id, user_name, password, email, phone, first_name, last_name);

Users_addresses (address_id, user_id, street, city, state, country, zip_code, label);



-- Query that selects all relevant products information to show in the selected category (in products.html)
-- Explanation: Selects columns from relevant tables joining used tables based on columns, select 1 image from each product Grouping by product_id to select 1 image per product 
-- Select the lowest price per variation per product to display in the Products.html page, to show the user the lowest price per product (variations might have different prices based on quantity.)

SELECT DISTINCT 
p.product_id,
p.product_name,
p.sold,
ci.category_name,
ci.category_id,
pi.image_location,
p.created_at,
pv.variation_price,
p.is_active
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
        WHERE pv2.product_id = p.product_id
    )
ORDER BY
p.is_active DESC;

-- 3 Queries that selects all products information from all products tables, returns the desired product information for (product.html?product_id=id)
-- The first one (returns 2 variations for product_id=1: 1,1 1,2 Black, White 15, 10 399.99, 399.99 1,1 )
--                                  product_id,var_id, var_name, stock, price, is_active?

SELECT 
p.product_id,
pv.variation_id,
pv.variation_name,
pv.variation_price,
pv.variation_stock,
pv.is_active AS variation_is_active
FROM Products p
LEFT JOIN Products_variations pv ON p.product_id = pv.product_id
WHERE p.product_id = ?
ORDER BY p.product_id, pv.variation_id;

-- output example for product_id = 1:
-- product_id 	product_name 	                                         product_description 	                            category_id 	created_at 	  Sold 	product_is_active 	category_name 	
-- 1 	        'Asus Prime B450M-A II Motherboard, AM4 Socket, maA...' 'Brand    ASUS CPU socket    Socket 1 Compatible ...' 	1 	'2024-08-27 08:06:40' 	0 	        1 	         Electronics
SELECT 
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
ORDER BY product_is_active DESC;

-- Example output of the below query: image_id, image_location,             product_id
--                                      1           ./img/products/1/1.png      1
--                                      2           ./img/products/1/2.png      1
-- Images are stored as follows: ./img/products/[product_id]/[1++].[extension], extensions (png, jpeg)

SELECT image_id, image_location as image, product_id 
FROM products_images 
WHERE product_id = ? ORDER BY image_id;

*/
