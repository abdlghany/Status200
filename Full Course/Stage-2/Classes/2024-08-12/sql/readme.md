# Database relationships

**customers**, **orders**, **order_details**, and **products**.

### Primary Key (PK):

A Primary Key is a unique identifier for each record (row) in a table. No two records can have the same primary key. It helps you uniquely identify each record.

-   **customers** table: Each customer might have a unique ID (e.g., `customer_id`). This `customer_id` is the Primary Key for the **customers** table.
-   **products** table: Each product might have a unique ID (e.g., `product_id`). This `product_id` is the Primary Key for the **products** table.
-   **orders** table: Each order might have a unique ID (e.g., `order_id`). This `order_id` is the Primary Key for the **orders** table.
-   **order_details** table: This table keeps track of which products are in which orders, and might have its own unique ID (e.g., `order_detail_id`). This `order_detail_id` is the Primary Key for the **order_details** table.

### Foreign Key (FK):

A Foreign Key is a field in one table that links to the Primary Key of another table. It establishes a relationship between the two tables.

-   In the **orders** table, you might have a field called `customer_id` that stores the ID of the customer who made the order. This `customer_id` is a Foreign Key that links to the Primary Key (`customer_id`) in the **customers** table.
-   In the **order_details** table, you might have two Foreign Keys:
    -   `order_id` linking to the Primary Key (`order_id`) in the **orders** table, indicating which order this detail belongs to.
    -   `product_id` linking to the Primary Key (`product_id`) in the **products** table, indicating which product is included in the order.

### Example:

-   **customers**:
    | customer_id (PK) | customer_name |
    |------------------|---------------|
    | 1 | Alice |
    | 2 | Bob |

-   **orders**:
    | order_id (PK) | customer_id (FK) | order_date |
    |---------------|------------------|------------|
    | 101 | 1 | 2024-08-12 |
    | 102 | 2 | 2024-08-11 |

-   **products**:
    | product_id (PK) | product_name | product_price |
    |-----------------|--------------|---------------|
    | 201 | Laptop | 745.99 |
    | 202 | Smartphone | 510.45 |

-   **order_details**:
    | order_detail_id (PK) | order_id (FK) | product_id (FK) | quantity |
    |----------------------|---------------|-----------------|----------|
    | 1 | 101 | 201 | 1 |
    | 2 | 102 | 202 | 2 |

In this example:

-   The **customers** table has a Primary Key `customer_id`.
-   The **orders** table has a Foreign Key `customer_id` linking to the **customers** table.
-   The **order_details** table has two Foreign Keys: `order_id` linking to the **orders** table and `product_id` linking to the **products** table.

### Database Diagram

<img src="db-diagram.png" width="600" />

# Example Queries

### 1. List All Orders with Customer Names

This query retrieves a list of all orders along with the names of the customers who placed them.

```sql
SELECT orders.order_id, customers.customer_name, orders.order_date
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id;
```

### 2. List All Products in Each Order

This query shows which products are in each order, along with their prices.

```sql
SELECT orders.order_id, products.product_name, products.product_price, order_details.quantity
FROM order_details
JOIN orders ON order_details.order_id = orders.order_id
JOIN products ON order_details.product_id = products.product_id;
```

### 3. Calculate the Total Price of Each Order

This query calculates the total price for each order by multiplying the quantity of each product by its price and summing it up for each order.

```sql
SELECT orders.order_id, SUM(products.product_price * order_details.quantity) AS total_order_price
FROM order_details
JOIN orders ON order_details.order_id = orders.order_id
JOIN products ON order_details.product_id = products.product_id
GROUP BY orders.order_id;
```

### 4. Find Orders Placed by a Specific Customer (e.g., "Alice")

This query retrieves all orders placed by a customer named "Alice."

```sql
SELECT orders.order_id, orders.order_date
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
WHERE customers.customer_name = 'Alice';
```

### 5. List All Customers Who Ordered a Specific Product (e.g., "Laptop")

This query shows all customers who have ordered a product called "Laptop."

```sql
SELECT DISTINCT customers.customer_name
FROM order_details
JOIN orders ON order_details.order_id = orders.order_id
JOIN customers ON orders.customer_id = customers.customer_id
JOIN products ON order_details.product_id = products.product_id
WHERE products.product_name = 'Laptop';
```
