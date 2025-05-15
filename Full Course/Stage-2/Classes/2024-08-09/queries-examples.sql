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
('Williams', 'Olivia', 'New York', '1988-09-15', 'F'),
('Jones', 'Noah', 'Houston', '1992-11-05', 'M'),
('Brown', 'Sophia', 'Phoenix', '1986-02-19', 'F'),
('Davis', 'Liam', 'Philadelphia', '1983-03-22', 'M'),
('Miller', 'Isabella', 'San Antonio', '1991-07-13', 'F'),
('Wilson', 'James', 'San Diego', '1991-10-30', 'M'),
('Moore', 'Mia', 'Dallas', '1991-01-14', 'F'),
('Taylor', 'Lucas', 'San Jose', '1991-08-27', 'M');


/**
    Get all customers:

    - Output:
        - Birthdate (date_of_birth)
    - Conditions:
        - first_name is Mia or James
*/
SELECT date_of_birth AS birthdate 
FROM customers 
WHERE first_name IN ('Mia', 'James');


/**
    Get all customers:

    - Output:
        - Name (first_name and surname)
        - Hometown
        - Year Born
    - Conditions:
        - Born between 1-1-1985 and 31-12-1995
        - Either live in NY, LA, or Houston
*/
SELECT 
    CONCAT(first_name, ' ', surname) AS Name, 
    city AS Hometown, 
    YEAR(date_of_birth) AS 'Year Born'
FROM customers
WHERE 
    YEAR(date_of_birth) BETWEEN 1985 AND 1995
    AND city IN ('New York', 'Los Angeles', 'Houston');


/**
    Get all customers:

    - Output:
        - "Customers Named James" (number of customers)
    - Conditions:
        - first_name is James
*/
SELECT COUNT(*) AS "Customers Named James"
FROM customers
WHERE first_name = 'James';


/**
    Get all customers:

    - Output:
        - gender
        - # (number of people per gender)
*/
SELECT gender, COUNT(*) AS "Number of people per gender"
FROM customers
GROUP BY gender;


/**
    Get all customers:

    - Output:
        - city
        - # (number of customers per city)
*/
SELECT city, COUNT(*) AS "#"
FROM customers
GROUP BY city;


/**
    Get all customers:

    - Output:
        - city
        - # (number of customers per city)
    - Conditions:
        - Have less than 3 customers in a city
*/
SELECT city, COUNT(*) AS "#"
FROM customers
GROUP BY city
HAVING COUNT(*) < 3;


/**
    List showing the number of people of each gender, grouped by the year they were born, with the most recent years listed first.

    - Output:
        - birthdate
        - gender
        - Number of people
    - Order:
        - birthdate (descending)
        - gender (ascending)
*/
SELECT 
    YEAR(date_of_birth) AS birthdate,
    gender, 
    COUNT(*) AS "Number of people"
FROM customers
GROUP BY birthdate, gender
ORDER BY birthdate DESC, gender ASC;
