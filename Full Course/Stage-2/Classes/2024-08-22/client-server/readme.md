### **1. Set Up the Node.js Project**

1. **Open Command Prompt (cmd):**

    - Press `Win + R`, type `cmd`, and press `Enter` to open Command Prompt.

2. **Create a New Folder for the Node Project Using `mkdir`:**

    - Navigate to the directory where you want to create your Node.js project:

        ```sh
        cd C:\Projects\
        ```

        _**Remark:**_ if `C:\Projects` doesn't exist on your computer, create it or use something else that you prefer. Justy keep in mind that you're using a different folder than the one used in this document.<br><br>

    - Create a new folder named `my-node-project` using `mkdir`:
        ```sh
        mkdir my-node-project
        ```
    - Navigate into the newly created folder:
        ```sh
        cd my-node-project
        ```

3. **Open the Project in Visual Studio Code:**

    - Open the current folder in Visual Studio Code using:
        ```sh
        code .
        ```
    - This command will launch VSCode with your project folder open.

4. **Create `index.js` File:**

    - In VSCode, create a new file by clicking on the **New File** icon or pressing `Ctrl + N`.
    - Name this file `index.js`.
    - Copy the code provided inside [server/index.js](server/index.js) into this file and save it.

5. **Initialize the Project with `package.json`:**
    - In the VSCode terminal (you can open it with `Ctrl + `), run the following command:
        ```sh
        npm init --yes
        ```
    - This will generate a `package.json` file in your project folder with default settings.

### **3. Set Up the HTML File in XAMPP**

1. **Create a Folder Inside XAMPP's `htdocs` Using `mkdir`:**

    - In the Command Prompt, navigate to the XAMPP `htdocs` directory:

        ```sh
        cd C:\xampp\htdocs
        ```

        _**Remark:**_ if `C:\xampp\htdocs` doesn't exist on your computer, find the correct XAMPP folder with the htdocs folder inside it.<br><br>

    - Create a new folder named `my-website` using `mkdir`:
        ```sh
        mkdir my-website
        ```
    - Navigate into the newly created folder:
        ```sh
        cd my-website
        ```

2. **Open the Folder in VSCode:**

    - Open this folder in VSCode using:
        ```sh
        code .
        ```

3. **Create `index.html` File:**
    - In VSCode, create a new file named `index.html`.
    - Copy the code provided inside [client/index.html](client/index.html) into this file and save it.

### **4. Start XAMPP Web Server**

1. **Open XAMPP Control Panel:**
    - Locate and open the XAMPP Control Panel (usually a shortcut on your desktop or start menu).
2. **Start Apache Server:**
    - In the XAMPP Control Panel, find the Apache module.
    - Click the **Start** button next to Apache to start the web server.

### **5. Start the Node.js Server**

1. **Open VSCode Terminal (if not already open):**

    - If VSCode is already open in your `my-node-project` folder, open the terminal with `Ctrl + ``.

2. **Start the Node.js Server:**
    - In the terminal, run the following command to start your Node.js server:
        ```sh
        node index.js
        ```
    - The server should now be running, and you should see `Listening on port 3000...` in the terminal.

### **6. Test the Setup**

1. **Access the HTML File:**

    - Open your web browser.
    - Go to `http://localhost/my-website/`. You should see the HTML page with the "Categories" heading.

2. **Check the Node.js API:**
    - Open Developer Tools in your browser (usually F12).
    - Reload the page and check the Console. You should see the categories being logged, and they should be displayed on the page.

### **7. Troubleshooting**

-   **If the Node.js server isn’t starting:**
    -   Ensure there are no syntax errors in your `index.js`.
    -   Verify that Node.js is installed and the PATH is correctly set.
