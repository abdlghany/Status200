# MySQL

## Create a Database in phpMyAdmin

The content of this file is focussed on creating your first database, add tables and insert data.

Its focussed on using XAMPP on Windows, but could be applied to other setups with some modifications in the steps related to XAMPP.

#### Prerequisites

-   **XAMPP Installed:** Ensure you have XAMPP installed on your Windows machine.
-   **XAMPP Running:** The Apache and MySQL services should be running in XAMPP.

#### Steps to Create a Database in phpMyAdmin

1. **Start XAMPP Control Panel:**

    - Open the XAMPP Control Panel. You can find it in the directory where XAMPP is installed (e.g., `C:\xampp\xampp-control.exe`).
    - Start the **Apache** and **MySQL** services by clicking the "Start" buttons next to each.

2. **Open phpMyAdmin:**

    - Once the services are running, open your web browser.
    - In the address bar, type `http://localhost/phpmyadmin/` and press **Enter**.
    - This will open the phpMyAdmin interface.

3. **Create a New Database:**

    - In phpMyAdmin, look at the left sidebar and click on the **"New"** link.
    - You will see a section labeled **"Create database"** in the main area.

4. **Enter Database Name:**

    - In the "Database name" field, enter the name for your new database (e.g., `bootcamp`).
    - **Note:** Database names should be unique and generally avoid spaces and special characters.

5. **Select Collation (Optional):**

    - You can select a collation from the dropdown list. Collation determines the character set and how text is sorted.
    - If you’re unsure, you can leave it at the default (usually `utf8_general_ci`).

6. **Create the Database:**

    - Click the **"Create"** button.
    - phpMyAdmin will create the database, and you’ll see a confirmation message.

7. **Verify Database Creation:**
    - The new database should now appear in the left sidebar under "Databases."
    - Click on the database name to view its structure and manage tables.

#### Additional Tips

-   **Adding Tables:** After creating your database, you can start adding tables by clicking on the database name and then filling out the table creation form.
-   **Managing Users:** You can manage database users and permissions under the "User accounts" tab in phpMyAdmin.

#### Troubleshooting

-   **Can’t Access phpMyAdmin?** Ensure Apache and MySQL are both running in XAMPP. If MySQL fails to start, check if another service is using port 3306 and stop it.
-   **Database Creation Error:** Ensure the database name is unique and follows naming conventions. Avoid using reserved words or special characters.

## Create tables

1. **Locate the `create.sql` File:**

    - Ensure you have the [create.sql](create.sql) file provided in your class. This file contains SQL statements to create tables in your newly created database.
    - Place this file in an easily accessible location on your computer.

2. **Open phpMyAdmin:**

    - Navigate to `http://localhost/phpmyadmin/` in your web browser.
    - Select your newly created database from the left sidebar by clicking on its name.

3. **Access the SQL Tab:**

    - In the top menu, click on the **"SQL"** tab. This opens an SQL editor where you can execute SQL commands.

4. **Copy SQL Statements from `create.sql`:**

    - Open the [create.sql](create.sql) file in a text editor (like Notepad).
    - Copy the entire SQL code provided in the file.

5. **Paste and Execute the SQL Code:**

    - Paste the copied SQL code into the SQL editor in phpMyAdmin.
    - After pasting, review the code to ensure it's pasted correctly.

6. **Execute the SQL Statements:**

    - Click the **"Go"** button at the bottom right of the SQL editor to execute the statements.
    - phpMyAdmin will process the SQL code and create the tables as defined in your CREATE statements.

7. **Verify Table Creation:**
    - Once the SQL execution is complete, you’ll see a success message.
    - The tables should now appear under your database in the left sidebar.
    - You can click on each table name to view its structure and data.

## Insert data in the created tables

1. **Locate the `insert.sql` File:**

    - Ensure you have the [insert.sql](insert.sql) file, which contains SQL statements for inserting data into your tables.
    - Place this file in an easily accessible location on your computer.

2. **Open phpMyAdmin:**

    - Navigate to `http://localhost/phpmyadmin/` in your web browser.
    - Select the database where you want to insert the data from the left sidebar by clicking on its name.

3. **Access the SQL Tab:**

    - In the top menu, click on the **"SQL"** tab. This will open the SQL editor where you can run SQL commands.

4. **Copy SQL Statements from `insert.sql`:**

    - Open the [insert.sql](insert.sql) file in a text editor (such as Notepad).
    - Copy the entire SQL code that is provided in the file.

5. **Paste and Execute the SQL Code:**

    - Paste the copied SQL code into the SQL editor in phpMyAdmin.
    - Review the pasted code to ensure it’s correct and corresponds to the structure of your tables.

6. **Execute the SQL Statements:**

    - Click the **"Go"** button at the bottom right of the SQL editor to run the insert statements.
    - phpMyAdmin will process the SQL code and insert the data into your tables.

7. **Verify Data Insertion:**
    - After the SQL execution is complete, you’ll see a success message.
    - You can verify that the data has been inserted by clicking on the table names in the left sidebar and viewing their contents.
