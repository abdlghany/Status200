/**
 *
 * Inside your browser javascript
 *
 * - In this example the path looks like:
 *
 * - http://localhost/product.html?id=102
 *
 */

// Get the full URL
const currentURL = window.location.href;

// Create a URL object from the full URL
const url = new URL(currentURL);

// Extract the query string part
const params = new URLSearchParams(url.search);

// Get the value of the "id" parameter
const productId = params.get("id");

// Should output "102"
console.log(productId);
