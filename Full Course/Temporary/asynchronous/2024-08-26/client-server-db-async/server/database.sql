CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);


INSERT INTO categories (id, name) VALUES
(1, 'Electronics'),
(2, 'Books'),
(3, 'Clothing');


INSERT INTO products (id, category_id, name) VALUES
(1, 1, 'Smartphone'),
(2, 1, 'Laptop'),
(3, 1, 'Headphones'),
(4, 2, 'Fiction Book'),
(5, 2, 'Non-fiction Book'),
(6, 3, 'T-shirt'),
(7, 3, 'Jeans');
