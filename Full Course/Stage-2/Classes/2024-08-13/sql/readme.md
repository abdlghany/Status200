# SQL Queries

## Files

-   [examples.sql](examples.sql): example queries used in morning session
-   [tasks.sql](tasks.sql): queries from tasks (see below) giving during class. It includes the create table and insert test data queries needed for the tasks.

## Tasks

1. List of all orders along with their total order values
2. Retrieve all products that have been ordered at least twice
3. Find all products with a unit price over 200 dollars that have been ordered by customers in Amsterdam or Rome
4. Count the number of sales per country
5. Retrieve the total value of orders per city where the total exceeds 1000 dollars, applying any voucher discounts.

#### Visual representation of the "Tasks" database

<img src="db-diagram.png" width="600">

## Theory

### AS Keyword in SQL

The `AS` keyword in SQL is used to rename a column or a table with an alias. This alias is temporary and only exists for the duration of the query. It helps make the output of your query more readable or to shorten long column names.

-   **Use "AS" for Fields (Columns):**

    -   You can use AS to assign a temporary name to a column in your result set. For example

        ```sql
        SELECT first_name AS 'First Name', last_name AS 'Last Name'
        FROM customers;
        ```

        This query renames the `first_name` column to "First Name" and the `last_name` column to "Last Name" in the output.

-   **Use "AS" for Tables:**

    -   You can also use `AS` to rename a table in a query, which is particularly useful when dealing with multiple tables or subqueries. For example:
        ```sql
        SELECT c.first_name, o.order_date
        FROM customers AS c
        JOIN orders AS o ON c.customer_id = o.customer_id;
        ```
        Here, the `customers` table is given the alias `c` and the `orders` table the alias `o`, making the query easier to write and read.
