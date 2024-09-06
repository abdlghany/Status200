import mysql from "mysql2";
// Enable multiple Query Statements in 1 call.
class MysqlQueries{
    #connection ;
    #config = {
        host: "localhost",
        user: "root",
        password: "",
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
MYSQL statements that I used to create the tables (there may have been a few adjustments to them later on): 

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

*/
