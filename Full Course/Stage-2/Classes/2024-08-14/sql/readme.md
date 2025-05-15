# Files

-   [examples.sql](examples.sql) example queries made during class
-   [tasks.sql](tasks.sql) answers of tasks given during class
-   [assignment.sql](assignment.sql) answers for the _Unit 15: Query writing!_ assignment

# Tasks

1. List all products (id, name) that haven't been sold in the last year
2. List all customers in Berlin or Rome that didn't order
3. Count the number of products with the term "web" that haven't been ordered

**PS.** The dataset provided in tasks.sql doesn't have any products that match the query for task 3. To test add a product, for example:

```SQL
INSERT INTO product (prod_name, unit_price) VALUES ('WebTablet', 499.99);
```

# Assigment

1. A list of teachers that don't teacher any courses.
2. A list of students enrolled in any computer science course
3. A list of courses with a minimal of 2 enrollments
4. The number of students that didn't sign up for a course.
5. All courses scheduled for last year up till now.
6. A list of all students per teacher! Who is in their class?

# Theory

## SQL Statements

In the context of databases, the terms DML, DDL, and DCL refer to different types of SQL commands that serve specific purposes:

### 1. **DML (Data Manipulation Language):**

-   **Purpose:** DML commands are used to manipulate the data stored in the database. These commands deal with the actual data and are used to perform operations like retrieving, inserting, updating, and deleting data.
-   **Common DML Commands:**
    -   **`SELECT`**: Retrieves data from one or more tables.
    -   **`INSERT`**: Adds new rows of data to a table.
    -   **`UPDATE`**: Modifies existing data within a table.
    -   **`DELETE`**: Removes rows of data from a table.

### 2. **DDL (Data Definition Language):**

-   **Purpose:** DDL commands are used to define and manage the structure of the database objects like tables, indexes, and schemas. These commands affect the schema or structure of the database. Used by a DBA (Database Admin).
-   **Common DDL Commands:**
    -   **`CREATE`**: Creates new database objects such as tables, indexes, views, or databases.
    -   **`ALTER`**: Modifies the structure of an existing database object, such as adding a column to a table.
    -   **`DROP`**: Deletes database objects, such as tables or databases.
    -   **`TRUNCATE`**: Removes all data from a table but keeps the table structure intact.

### 3. **DCL (Data Control Language):**

-   **Purpose:** DCL commands are used to control access to the data in the database. These commands manage permissions and ensure security by determining who can access or manipulate the data. Used by a DBA (Database Admin).
-   **Common DCL Commands:**
    -   **`CREATE USER:`** Creates a new user in the database system. You can specify the user's name, authentication method, and other attributes.
    -   **`GRANT`**: Assigns specific privileges to a user, such as the ability to `SELECT`, `INSERT`, `UPDATE`, or DELETE data.
    -   **`REVOKE`**: Removes previously granted privileges from users.

### Summary:

-   **DML** focuses on the data itself, allowing you to retrieve and modify it.
-   **DDL** focuses on the structure of the database, defining how data is stored.
-   **DCL** focuses on access control, determining who can do what with the data.

## SQL JOINS

-   The content below is focussed on MySQL and might slightly differ from the content presented during class. For example: `LEFT OUTER JOIN` can be written as `LEFT JOIN` in MySQL

### 1. **JOIN (INNER JOIN):**

-   **Purpose:** Combines rows from two tables where the specified condition is met.
-   **Result:** Returns only the rows that have matching values in both tables.
-   **Example:**

    ```sql
    SELECT *
    FROM table1
    JOIN table2
    ON table1.id = table2.id;
    ```

-   **Explanation:** If `table1` and `table2` have a matching `id`, those rows are returned. Rows without a match in either table are not included.

### 2. **LEFT JOIN (LEFT OUTER JOIN):**

-   **Purpose:** Combines rows from two tables, including all rows from the left table and the matched rows from the right table.
-   **Result:** Returns all rows from the left table, and the matched rows from the right table. If there is no match, `NULL` values are returned for columns from the right table.
-   **Example:**

    ```sql
    SELECT *
    FROM table1
    LEFT JOIN table2
    ON table1.id = table2.id;
    ```

-   **Explanation:** All rows from `table1` are included. If `table2` has matching `id` values, those rows are combined. If there’s no match, `NULL` is returned for `table2` columns.

### 3. **RIGHT JOIN (RIGHT OUTER JOIN):**

-   **Purpose:** Combines rows from two tables, including all rows from the right table and the matched rows from the left table.
-   **Result:** Returns all rows from the right table, and the matched rows from the left table. If there is no match, `NULL` values are returned for columns from the left table.
-   **Example:**

    ```sql
    SELECT *
    FROM table1
    RIGHT JOIN table2
    ON table1.id = table2.id;
    ```

-   **Explanation:** All rows from `table2` are included. If `table1` has matching `id` values, those rows are combined. If there’s no match, `NULL` is returned for `table1` columns.

### 4. **CROSS JOIN:**

-   **Purpose:** Produces a Cartesian product of the two tables, meaning it returns every possible combination of rows from the two tables.
-   **Result:** Every row from `table1` is combined with every row from `table2`.
-   **Example:**

    ```sql
    SELECT *
    FROM table1
    CROSS JOIN table2;

    -- Same as:
    SELECT * FROM table1, table2;
    ```

-   **Explanation:** If `table1` has 3 rows and `table2` has 4 rows, the result will have 3 x 4 = 12 rows.

### 5. **SELF JOIN:**

-   **Purpose:** A join in which a table is joined with itself.
-   **Result:** Combines rows within the same table where a specified condition is met.
-   **Example:**

    ```sql
    SELECT a.*
    FROM employees a
    JOIN employees b
    ON a.manager_id = b.id;
    ```

-   **Explanation:** Useful for hierarchical data or comparing rows within the same table. In this example, it finds employees and their respective managers.

### Summary:

-   **INNER JOIN:** Matches and returns rows from both tables where conditions are met.
-   **LEFT JOIN:** Returns all rows from the left table, with `NULL` for non-matching rows from the right table.
-   **RIGHT JOIN:** Returns all rows from the right table, with `NULL` for non-matching rows from the left table.
-   **CROSS JOIN:** Returns every combination of rows from both tables.
-   **SELF JOIN:** Joins a table to itself to compare rows within the same table.

These are the types of JOINs that actually exist in MySQL.
