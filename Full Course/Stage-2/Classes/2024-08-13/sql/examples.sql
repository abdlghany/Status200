-- Create the customer table
CREATE TABLE customer (
    cust_id INT AUTO_INCREMENT PRIMARY KEY,
    cust_name VARCHAR(100),
    cust_city VARCHAR(100),
    cust_country VARCHAR(100)
);

-- Create the product table
CREATE TABLE product (
    prod_id INT AUTO_INCREMENT PRIMARY KEY,
    prod_name VARCHAR(100),
    unit_price DECIMAL(10, 2)
);

-- Create the orders table with a foreign key referencing the customer table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    cust_id INT,
    voucher DECIMAL(5, 2),
    shipper_id INT,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id)
);

-- Create the orderdetail table with foreign keys referencing orders and product tables
CREATE TABLE orderdetail (
    order_id INT,
    prod_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    PRIMARY KEY (order_id, prod_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (prod_id) REFERENCES product(prod_id)
);

-- Insert data into the customer table
INSERT INTO customer (cust_name, cust_city, cust_country) VALUES
('Alice Johnson', 'New York', 'USA'),
('Bob Smith', 'Los Angeles', 'USA'),
('Carlos Gonzalez', 'Mexico City', 'Mexico'),
('Diana Prince', 'London', 'UK'),
('Eva Green', 'Paris', 'France'),
('Frank Castle', 'Berlin', 'Germany'),
('Grace Kelly', 'Rome', 'Italy'),
('Hank Schrader', 'Madrid', 'Spain'),
('Irene Adler', 'Amsterdam', 'Netherlands'),
('Jack Reacher', 'Sydney', 'Australia'),
('Katherine Heigl', 'Toronto', 'Canada'),
('Leo Messi', 'Buenos Aires', 'Argentina'),
('Mia Farrow', 'Rio de Janeiro', 'Brazil'),
('Nina Simone', 'Johannesburg', 'South Africa'),
('Oscar Wilde', 'Dublin', 'Ireland'),
('Paul Atreides', 'Vienna', 'Austria'),
('Quinn Fabray', 'Brussels', 'Belgium'),
('Ralph Fiennes', 'Zurich', 'Switzerland'),
('Sandra Bullock', 'Singapore', 'Singapore'),
('Tom Hardy', 'Hong Kong', 'China');

-- Insert data into the product table
INSERT INTO product (prod_name, unit_price) VALUES
('Laptop', 999.99),
('Smartphone', 499.99),
('Headphones', 79.99),
('Keyboard', 49.99),
('Mouse', 29.99),
('Monitor', 199.99),
('Printer', 149.99),
('Webcam', 89.99),
('Smartwatch', 129.99),
('External Hard Drive', 119.99),
('USB Flash Drive', 19.99),
('Router', 89.99),
('Speakers', 149.99),
('Desk Chair', 229.99),
('Desk Lamp', 59.99),
('Tablet', 349.99),
('Smart TV', 699.99),
('Digital Camera', 499.99),
('Fitness Tracker', 89.99),
('Bluetooth Speaker', 59.99);

-- Insert data into the orders table
INSERT INTO orders (order_date, cust_id, voucher, shipper_id) VALUES
('2024-08-01', 1, 10.00, 1),
('2024-08-02', 2, 5.00, 2),
('2024-08-03', 3, 15.00, 1),
('2024-08-04', 4, 20.00, 3),
('2024-08-05', 5, 10.00, 2),
('2024-08-06', 6, 5.00, 1),
('2024-08-07', 7, 25.00, 3),
('2024-08-08', 8, 30.00, 2),
('2024-08-09', 9, 10.00, 1),
('2024-08-10', 10, 15.00, 3),
('2024-08-11', 11, 20.00, 2),
('2024-08-12', 12, 5.00, 1),
('2024-08-13', 13, 25.00, 3),
('2024-08-14', 14, 30.00, 2),
('2024-08-15', 15, 10.00, 1),
('2024-08-16', 16, 15.00, 3),
('2024-08-17', 17, 20.00, 2),
('2024-08-18', 18, 5.00, 1),
('2024-08-19', 19, 25.00, 3),
('2024-08-20', 20, 30.00, 2);

-- Insert data into the orderdetail table
INSERT INTO orderdetail (order_id, prod_id, quantity, price) VALUES
(1, 1, 1, 999.99),
(1, 2, 2, 499.99),
(2, 3, 1, 79.99),
(2, 4, 1, 49.99),
(3, 5, 3, 29.99),
(3, 6, 2, 199.99),
(4, 7, 1, 149.99),
(4, 8, 1, 89.99),
(5, 9, 2, 129.99),
(5, 10, 1, 119.99),
(6, 11, 3, 19.99),
(6, 12, 1, 89.99),
(7, 13, 2, 149.99),
(7, 14, 1, 229.99),
(8, 15, 1, 59.99),
(8, 16, 1, 349.99),
(9, 17, 1, 699.99),
(9, 18, 1, 499.99),
(10, 19, 1, 89.99),
(10, 20, 2, 59.99),
(11, 1, 1, 999.99),
(11, 2, 1, 499.99),
(12, 3, 2, 79.99),
(12, 4, 1, 49.99),
(13, 5, 1, 29.99),
(13, 6, 1, 199.99),
(14, 7, 1, 149.99),
(14, 8, 2, 89.99),
(15, 9, 1, 129.99),
(15, 10, 3, 119.99),
(16, 11, 2, 19.99),
(16, 12, 1, 89.99),
(17, 13, 3, 149.99),
(17, 14, 1, 229.99),
(18, 15, 1, 59.99),
(18, 16, 1, 349.99),
(19, 17, 1, 699.99),
(19, 18, 2, 499.99),
(20, 19, 1, 89.99),
(20, 20, 1, 59.99);

-- List of product names with their respective order quantities (no grouping by product)
SELECT 
    product.prod_name AS "Product Name", 
    orderdetail.quantity AS "Order Quantity"
FROM 
    product
JOIN 
    orderdetail ON orderdetail.prod_id = product.prod_id;

-- List of product names with their total order quantities (grouped by product)
SELECT 
    product.prod_name AS "Product Name", 
    SUM(orderdetail.quantity) AS "Total Order Quantity"
FROM 
    product
JOIN 
    orderdetail ON orderdetail.prod_id = product.prod_id
GROUP BY 
    product.prod_id;

-- List the top 3 best-selling products with their total order quantities
SELECT 
    product.prod_name AS "Product Name", 
    SUM(orderdetail.quantity) AS "Total Order Quantity"
FROM 
    product
JOIN 
    orderdetail ON orderdetail.prod_id = product.prod_id
GROUP BY 
    product.prod_id
ORDER BY 
    SUM(orderdetail.quantity) DESC
LIMIT 3;

-- List of products with their total order quantities, but only if the total quantity is greater than 4
SELECT 
    product.prod_name AS "Product Name", 
    SUM(orderdetail.quantity) AS "Total Order Quantity"
FROM 
    product
JOIN 
    orderdetail ON orderdetail.prod_id = product.prod_id
GROUP BY 
    product.prod_id
HAVING 
    SUM(orderdetail.quantity) > 4
ORDER BY 
    SUM(orderdetail.quantity) DESC;

-- List of products with total order quantities of 5 or more, but only for products that have individual sales of at least 2 units per order
SELECT 
    product.prod_name AS "Product Name", 
    SUM(orderdetail.quantity) AS "Total Order Quantity"
FROM 
    product
JOIN 
    orderdetail ON orderdetail.prod_id = product.prod_id
WHERE 
    orderdetail.quantity > 1
GROUP BY 
    product.prod_id
HAVING 
    SUM(orderdetail.quantity) >= 5
ORDER BY 
    SUM(orderdetail.quantity) DESC;
