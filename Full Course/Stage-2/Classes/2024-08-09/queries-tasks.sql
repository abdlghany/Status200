-- Create the Products table
CREATE TABLE Products (
    prod_id INT AUTO_INCREMENT PRIMARY KEY,
    Prod_name VARCHAR(20),
    Prod_description VARCHAR(100),
    Stock INT,
    Unitprice DECIMAL(10,2),
    Prod_category VARCHAR(20),
    Last_Sold DATE,
    Added_To_Stock DATE
);

-- Insert 50 example records into the Products table
INSERT INTO Products (Prod_name, Prod_description, Stock, Unitprice, Prod_category, Last_Sold, Added_To_Stock)
VALUES
    ('Laptop', '15-inch display, 256GB SSD', 50, 999.99, 'Electronics', '2024-08-01', '2024-07-25'),
    ('Smartphone', '128GB storage, 12MP camera', 120, 699.99, 'Electronics', '2024-08-05', '2024-07-30'),
    ('Headphones', 'Noise-cancelling, Bluetooth', 200, 149.99, 'Electronics', '2024-08-02', '2024-07-28'),
    ('Keyboard', 'Mechanical, RGB backlight', 80, 89.99, 'Accessories', '2024-08-03', '2024-07-27'),
    ('Mouse', 'Wireless, ergonomic design', 150, 49.99, 'Accessories', '2024-08-01', '2024-07-26'),
    ('Monitor', '24-inch, Full HD', 60, 179.99, 'Electronics', '2024-08-04', '2024-07-29'),
    ('Printer', 'Laser, wireless', 40, 199.99, 'Electronics', '2024-08-06', '2024-07-31'),
    ('Tablet', '10-inch display, 64GB', 90, 329.99, 'Electronics', '2024-08-03', '2024-07-25'),
    ('Charger', 'Fast charging, USB-C', 300, 29.99, 'Accessories', '2024-08-02', '2024-07-30'),
    ('Camera', 'Mirrorless, 24MP', 30, 799.99, 'Electronics', '2024-08-07', '2024-07-28'),
    ('Smartwatch', 'Heart rate monitor, GPS', 100, 199.99, 'Electronics', '2024-08-01', '2024-07-26'),
    ('Speaker', 'Bluetooth, waterproof', 70, 99.99, 'Electronics', '2024-08-05', '2024-07-27'),
    ('Router', 'Dual-band, Gigabit', 110, 59.99, 'Electronics', '2024-08-03', '2024-07-29'),
    ('Flash Drive', '64GB, USB 3.0', 500, 19.99, 'Accessories', '2024-08-04', '2024-07-30'),
    ('External HDD', '1TB, USB 3.0', 45, 79.99, 'Accessories', '2024-08-06', '2024-07-31'),
    ('Gaming Console', 'Next-gen, 512GB SSD', 25, 499.99, 'Electronics', '2024-08-02', '2024-07-25'),
    ('TV', '50-inch, 4K UHD', 35, 599.99, 'Electronics', '2024-08-01', '2024-07-26'),
    ('VR Headset', 'Immersive experience', 20, 299.99, 'Electronics', '2024-08-07', '2024-07-28'),
    ('Drone', '4K camera, GPS', 15, 899.99, 'Electronics', '2024-08-04', '2024-07-29'),
    ('Power Bank', '20000mAh, USB-C', 250, 39.99, 'Accessories', '2024-08-03', '2024-07-30'),
    ('Microphone', 'USB, studio quality', 55, 129.99, 'Accessories', '2024-08-02', '2024-07-31'),
    ('Webcam', '1080p, Autofocus', 75, 59.99, 'Accessories', '2024-08-01', '2024-07-25'),
    ('Smart Thermostat', 'Wi-Fi, Voice control', 65, 149.99, 'Electronics', '2024-08-06', '2024-07-26'),
    ('E-Reader', '6-inch, 8GB', 90, 129.99, 'Electronics', '2024-08-03', '2024-07-27'),
    ('Action Camera', '4K, waterproof', 35, 249.99, 'Electronics', '2024-08-07', '2024-07-28'),
    ('Security Camera', 'Wi-Fi, night vision', 120, 79.99, 'Electronics', '2024-08-05', '2024-07-29'),
    ('Projector', '1080p, Portable', 25, 399.99, 'Electronics', '2024-08-04', '2024-07-30'),
    ('Smart Light', 'Wi-Fi, RGB', 200, 29.99, 'Accessories', '2024-08-01', '2024-07-31'),
    ('Electric Kettle', '1.7L, Stainless Steel', 150, 49.99, 'Home', '2024-08-02', '2024-07-25'),
    ('Blender', '600W, 1.5L', 100, 89.99, 'Home', '2024-08-06', '2024-07-26'),
    ('Air Purifier', 'HEPA filter, 300 sq.ft.', 40, 199.99, 'Home', '2024-08-03', '2024-07-27'),
    ('Robot Vacuum', 'Wi-Fi, Self-charging', 60, 299.99, 'Home', '2024-08-05', '2024-07-28'),
    ('Electric Toothbrush', 'Rechargeable, 2 heads', 200, 39.99, 'Personal', '2024-08-01', '2024-07-29'),
    ('Hair Dryer', 'Ionic, 1875W', 90, 69.99, 'Personal', '2024-08-04', '2024-07-30'),
    ('Shaver', 'Electric, cordless', 120, 49.99, 'Personal', '2024-08-07', '2024-07-31'),
    ('Yoga Mat', '6mm, non-slip', 180, 19.99, 'Fitness', '2024-08-02', '2024-07-25'),
    ('Dumbbells', 'Adjustable, 20kg', 70, 99.99, 'Fitness', '2024-08-03', '2024-07-26'),
    ('Treadmill', 'Foldable, LCD display', 15, 499.99, 'Fitness', '2024-08-01', '2024-07-27'),
    ('Exercise Bike', 'Magnetic resistance', 20, 399.99, 'Fitness', '2024-08-05', '2024-07-28'),
    ('Jump Rope', 'Speed rope, adjustable', 250, 14.99, 'Fitness', '2024-08-06', '2024-07-29'),
    ('Resistance Bands', 'Set of 5, various strengths', 300, 24.99, 'Fitness', '2024-08-04', '2024-07-30'),
    ('Bicycle', 'Mountain bike, 21-speed', 30, 499.99, 'Fitness', '2024-08-07', '2024-07-31'),
    ('Helmet', 'Bicycle, adjustable size', 150, 49.99, 'Accessories', '2024-08-02', '2024-07-25'),
    ('Backpack', 'Water-resistant, 25L', 200, 59.99, 'Accessories', '2024-08-03', '2024-07-26'),
    ('Sleeping Bag', '3-season, compact', 75, 79.99, 'Outdoor', '2024-08-01', '2024-07-27'),
    ('Tent', '2-person, waterproof', 40, 129.99, 'Outdoor', '2024-08-05', '2024-07-28'),
    ('Camping Stove', 'Portable, propane', 60, 59.99, 'Outdoor', '2024-08-06', '2024-07-29'),
    ('Hiking Boots', 'Waterproof, high ankle', 100, 149.99, 'Outdoor', '2024-08-04', '2024-07-30'),
    ('Flashlight', 'LED, rechargeable', 150, 29.99, 'Outdoor', '2024-08-07', '2024-07-31');

------------ 
-- Task 1 --
------------ 
SELECT 
    Prod_name AS name, 
    Unitprice AS price, 
    Prod_description AS description
FROM 
    Products
WHERE 
    Last_Sold > '2024-07-15' 
    AND Stock >= 50;

------------ 
-- Task 2 --
------------
SELECT 
    SUM(Stock * Unitprice) AS 'Total Value'
FROM 
    Products;

------------ 
-- Task 3 --
------------ 
SELECT 
    Prod_category AS Category, 
    SUM(Stock) AS 'Total_Stock'
FROM 
    Products
GROUP BY 
    Prod_category
HAVING 
    Total_Stock > 600;

------------ 
-- Task 4 --
------------ 
SELECT 
    Prod_name AS name 
FROM 
    Products
WHERE 
    Prod_name LIKE '%camera%' 
    AND DATE(Last_Sold) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE();

------------ 
-- Task 5 --
------------ 
SELECT 
    Prod_name AS name
FROM 
    Products
WHERE 
    Unitprice BETWEEN 299.99 AND 499.99 
    AND Added_To_Stock < '2024-07-28';

