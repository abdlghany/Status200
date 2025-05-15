# Subjects discussed in class

Two subject:

-   The `split()` function
-   HTTP requests / responses

### The `split()` Function in This Context

The `split()` function in JavaScript is used to divide a string into an array of substrings based on a specified separator. In the context of the code, it's being used to break down the `pathname` of a URL into its constituent parts.

### How `split()` is Applied in the Code

```javascript
const pathElements = pathname.split("/");
```

-   **Purpose**: The `split()` function is called on the `pathname` string to divide it into an array, using the `/` character as the separator.
-   **Result**: The `split()` function returns an array where each element corresponds to a segment of the URL path. For example, if the `pathname` is `/api/categories/1`, the resulting array will be `["", "api", "categories", "1"]`.

### Extracting the Category ID

```javascript
let categoryID = pathElements[3];
categoryID = parseInt(categoryID);
```

-   **Category ID Extraction**: The code attempts to extract the category ID by accessing the element at index 3 of the `pathElements` array (`pathElements[3]`).
-   **Behavior When Index Doesn't Exist**: If the index `3` does not exist in the `pathElements` array (for instance, if the URL was `/api/categories` without an ID), `categoryID` will be `undefined`.
-   **Converting to an Integer**: The `parseInt()` function is then used to convert `categoryID` to an integer. If `categoryID` is `undefined`, `parseInt(undefined)` will return `NaN` (Not a Number).

### Handling the NaN Case

The code checks if the result of `parseInt(categoryID)` is `NaN`:

```javascript
if (isNaN(categoryID)) {
    // Client requesting all categories
    response.write(JSON.stringify(categoriesArray));
}
```

-   **Check for NaN**: The `isNaN()` function is used to determine whether the value of `categoryID` is `NaN`.
-   **Implication**: If `categoryID` is `NaN`, it indicates that either no category ID was provided in the URL, or the provided ID was not a valid number. In this case, the code assumes the client is requesting all categories and responds with the full `categoriesArray`.

### HTTP requests / responses

Break down of the interaction between the XAMPP server, the Node.js server, and the Axios CDN request, giving a comprehensive view of how the requests and responses work together.

### Overview of the Setup

1. **XAMPP Server**: Hosts an HTML file that the user interacts with through a web browser. This HTML file includes JavaScript, which uses Axios (loaded via a CDN) to make HTTP requests to a Node.js server.

2. **Node.js Server**: Serves as an API that responds to requests for categories, products, and product details. It provides the data that the HTML file on the XAMPP server requests.

3. **Axios CDN**: A content delivery network (CDN) hosts the Axios library, which is loaded into the HTML file to enable making HTTP requests from the client side (browser).

### Step-by-Step Interaction

#### 1. **Loading the HTML File**

-   **Request**: The user navigates to the HTML file hosted on the XAMPP server using a browser. For example, `http://localhost/index.html`.
-   **Response**: The XAMPP server serves the HTML file to the browser.

#### 2. **Loading the Axios Library**

-   **Request**: The HTML file includes a `<script>` tag that points to the Axios library hosted on a CDN: `https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`.
-   **Response**: The browser sends a request to the CDN, and the CDN responds by sending the Axios library code to the browser. This allows the HTML file to use Axios for making HTTP requests.

#### 3. **Fetching Categories from Node.js Server**

-   **User Action**: The user clicks the "Start fetching categories" button in the browser.
-   **Request**: The JavaScript code in the HTML file uses Axios to send a GET request to `http://localhost:3000/api/categories`.
-   **Response**: The Node.js server processes this request:
    -   It checks the URL path and sees that the request is for categories.
    -   It sends back a JSON array of categories to the browser.
-   **Result**: The browser receives this data, and the JavaScript code dynamically updates the HTML to display the categories.

#### 4. **Fetching Products for a Category**

-   **User Action**: The user clicks on a category name displayed in the browser.
-   **Request**: The JavaScript code uses Axios to send a GET request to `http://localhost:3000/api/categories/{categoryID}/products`, where `{categoryID}` is the ID of the clicked category.
-   **Response**: The Node.js server processes this request:
    -   It extracts the `categoryID` from the URL.
    -   It filters the products based on this `categoryID` and sends back a JSON array of products belonging to that category.
-   **Result**: The browser receives this data, and the JavaScript code dynamically updates the HTML to display the products.

#### 5. **Fetching Product Details**

-   **User Action**: The user clicks on a product name displayed in the browser.
-   **Request**: The JavaScript code uses Axios to send a GET request to `http://localhost:3000/api/products/{productID}`, where `{productID}` is the ID of the clicked product.
-   **Response**: The Node.js server processes this request:
    -   It extracts the `productID` from the URL.
    -   It searches for the product with this ID and sends back the product details as a JSON object.
-   **Result**: The browser receives this data, and the JavaScript code dynamically updates the HTML to display the product details.

### Summary Table of Requests and Responses

| **Step** | **Request Origin**  | **Request URL**                                              | **Response Origin** | **Response Data**              |
| -------- | ------------------- | ------------------------------------------------------------ | ------------------- | ------------------------------ |
| 1        | Browser             | `http://localhost/index.html`                                | XAMPP Server        | HTML file                      |
| 2        | Browser             | `https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`       | Axios CDN           | Axios JS library               |
| 3        | Browser (via Axios) | `http://localhost:3000/api/categories`                       | Node.js Server      | JSON array of categories       |
| 4        | Browser (via Axios) | `http://localhost:3000/api/categories/{categoryID}/products` | Node.js Server      | JSON array of products         |
| 5        | Browser (via Axios) | `http://localhost:3000/api/products/{productID}`             | Node.js Server      | JSON object of product details |

### Conclusion

In this setup, the browser (client) interacts with two servers: the XAMPP server (which serves the initial HTML file) and the Node.js server (which provides the dynamic data through APIs). The Axios library, loaded from a CDN, enables the JavaScript running in the browser to make these HTTP requests. This interaction model is typical of modern web applications, where different servers and services work together to deliver content and data to users.
