import mysql from "mysql2";

class MysqlQueries{
    #connection ;
    #config = {
        host: "localhost",
        user: "abdalghany",
        password: "ohitsme",
        database:"shoppractice"
      };
    constructor(){
        this.#connection  = mysql.createConnection(this.#config);
    }
    connect() {
        this.#connection.connect(function(err) {
            if (err) {
                console.error("Error connecting to the database:", err.message);
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
                console.log("Disconnected from the database.");
            }
        });
    }

    createTable(query) {
        this.#connection.query(query, function(err, result) {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
                console.log("Table created successfully:", result);
            }
        });
    }

    insert(query, values) {
        this.#connection.query(query, values, function(result) {
            if (err) {
                console.error("Error inserting data:", err.message);
            } else {
                console.log("Data inserted successfully:", result);
            }
        });
    }

    select(query, values, callback) {
        this.#connection.query(query, values, function(err, results) {
            if (err) {
                console.error("Error selecting data:", err.message);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
    select(query, callback) {
        this.#connection.query(query, function(err, results) {
            if (err) {
                console.error("Error selecting data:", err.message);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    update(query, values) {
        this.#connection.query(query, values, function(err, result) {
            if (err) {
                console.error("Error updating data:", err.message);
            } else {
                console.log("Data updated successfully:", result);
            }
        });
    }

    delete(query, values) {
        this.#connection.query(query, values, function(err, result) {
            if (err) {
                console.error("Error deleting data:", err.message);
            } else {
                console.log("Data deleted successfully:", result);
            }
        });
    }
}

export default MysqlQueries;
/* 
-- creating the table:
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT,
    parent_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Inserting dummy categories data:
INSERT INTO categories (category_name, category_description, parent_id) VALUES
('Electronics', 'Devices and gadgets', NULL),
('Home Appliances', 'Appliances for home use', NULL),
('Clothing', 'Men and women apparel', NULL),
('Books', 'Various genres of books', NULL),
('Furniture', 'Household and office furniture', NULL),
('Sports Equipment', 'Gear and equipment for sports', NULL),
('Toys', 'Toys and games for children', NULL),
('Beauty Products', 'Cosmetics and skincare', NULL),
('Groceries', 'Food and household items', NULL),
('Automotive', 'Car accessories and tools', NULL);

-- creating another table 'products':
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    product_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
-- inserting some dummy products data:
INSERT INTO products (product_name, product_description, product_price, category_id, product_quantity) VALUES
('Smartphone', 'Latest model with 128GB storage', 699.99, 1, 50),
('Laptop', '15-inch display, 8GB RAM, 512GB SSD', 999.99, 1, 30),
('Washing Machine', 'Front load, 7kg capacity', 449.99, 2, 20),
('Refrigerator', 'Double door with frost-free technology', 799.99, 2, 15),
('T-Shirt', '100% cotton, available in various sizes', 19.99, 3, 100),
('Jeans', 'Slim fit, denim material', 49.99, 3, 75),
('Novel', 'Bestselling fiction novel', 14.99, 4, 200),
('Office Chair', 'Ergonomic chair with lumbar support', 149.99, 5, 25),
('Dining Table', 'Wooden table with 4 chairs', 299.99, 5, 10),
('Basketball', 'Official size and weight', 29.99, 6, 40),
('Running Shoes', 'Lightweight and comfortable', 89.99, 6, 60),
('Action Figure', 'Collectible action figure from popular series', 24.99, 7, 50),
('Dollhouse', 'Wooden dollhouse with furniture', 79.99, 7, 30),
('Lipstick', 'Long-lasting matte lipstick', 12.99, 8, 150),
('Moisturizer', 'Hydrating facial cream', 29.99, 8, 100),
('Cereal', 'Whole grain cereal, 500g pack', 4.99, 9, 200),
('Pasta', '500g pack of Italian pasta', 3.99, 9, 250),
('Car Seat Cover', 'Leather cover for car seats', 49.99, 10, 80),
('Car Battery', 'Maintenance-free car battery', 129.99, 10, 25),
('Smartwatch', 'Fitness tracker with heart rate monitor', 199.99, 1, 60);

products (product_id, product_name, product_description, product_price, category_id, product_quantity, created_at, updated_at)
products (AUTO, VARCHAR, text, decimal, int, int, timestamp (auto), timestamp (auto));

categories (category_id, category_name, category_description, parent_id, created_at, updated_at)
categories (AUTO, VARCHAR, text, int, timestamp (auto), timestamp (auto))
*/