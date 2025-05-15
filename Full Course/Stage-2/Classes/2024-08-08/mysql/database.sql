-- Create the customers table with columns for customer ID, surname, first name, city, date of birth, and gender
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    surname VARCHAR(50),
    first_name VARCHAR(50),
    city VARCHAR(50),
    date_of_birth DATE,
    gender CHAR(1)
);

-- Insert 10 customers into the customers table with various data for each column
INSERT INTO customers (surname, first_name, city, date_of_birth, gender) VALUES
('Smith', 'John', 'New York', '1985-04-12', 'M'),
('Johnson', 'Emma', 'New York', '1990-06-25', 'F'),
('Williams', 'Olivia', 'Chicago', '1988-09-15', 'F'),
('Jones', 'Noah', 'Houston', '1992-11-05', 'M'),
('Brown', 'Sophia', 'Phoenix', '1986-02-19', 'F'),
('Davis', 'Liam', 'Philadelphia', '1983-03-22', 'M'),
('Miller', 'Isabella', 'San Antonio', '1991-07-13', 'F'),
('Wilson', 'James', 'San Diego', '1989-10-30', 'M'),
('Moore', 'Mia', 'Dallas', '1993-01-14', 'F'),
('Taylor', 'Lucas', 'San Jose', '1984-08-27', 'M');

-- Retrieve all columns and rows from the customers table
SELECT * FROM customers;

-- Retrieve the city column for all customers
SELECT city FROM customers;

-- Retrieve the first name and surname columns for all customers
SELECT first_name, surname FROM customers;

-- Retrieve a concatenated string of the first name and city, 
-- along with the year of birth for all customers
SELECT CONCAT(first_name, " lives in ", city) AS customer, YEAR(date_of_birth) AS dob FROM customers;

-- Retrieve all columns and rows from the customers table where the city is "New York"
SELECT * FROM customers WHERE city="New York";

-- Retrieve a concatenated string of the first name and city, 
-- along with the year of birth for all customers where the city is "New York"
SELECT CONCAT(first_name, " lives in ", city) AS customer, YEAR(date_of_birth) AS dob FROM customers WHERE city="New York";

-- Retrieve the surname, city, and gender columns for customers whose city is either New York, San Diego, or San Jose
SELECT surname, city, gender FROM customers WHERE city IN ('New York', 'San Diego', 'San Jose');

-- Retrieve the surname, city, and gender columns for male customers whose city is either New York, San Diego, or San Jose 
SELECT surname, city, gender WHERE city IN ('New York', 'San Diego', 'San Jose') AND gender='M';

-- Retrieve the total number of customers in the customers table
SELECT COUNT(*) AS total_customers FROM customers;

-- Count number of females born after 1986
SELECT COUNT(*) FROM customers WHERE gender='F' AND YEAR(date_of_birth) > '1986';

-- Retrieve the average age of all customers
SELECT AVG(YEAR(CURDATE()) - YEAR(date_of_birth)) AS avg_age FROM customers;