CREATE TABLE customer (
    cust_id INT AUTO_INCREMENT PRIMARY KEY,
    cust_name VARCHAR(100),
    cust_city VARCHAR(100),
    cust_country VARCHAR(100)
);

CREATE TABLE product (
    prod_id INT AUTO_INCREMENT PRIMARY KEY,
    prod_name VARCHAR(100),
    unit_price DECIMAL(10, 2)
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    cust_id INT,
    voucher DECIMAL(5, 2),
    shipper_id INT,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id)
);

CREATE TABLE orderdetail (
    order_id INT,
    prod_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    PRIMARY KEY (order_id, prod_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (prod_id) REFERENCES product(prod_id)
);