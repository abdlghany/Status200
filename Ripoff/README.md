Final assignment: Web-shop

Functional requirements:
- create a user account, login
- Login, forgot pw, chnage pw, change username (can't have duplicate emails).
- account information needs to be secure.
- Able to view & order products / services
- using filters to choose products / services
- order(customerNo, order_id, order_details, products in this order)
- order confirmation -> PDF To EMAIL
- store bill in DB (No real transactions)
- shopping cart, past purchases, show products in your basket.....
-----------
Technical requirements:
- WAMPSERVER, Mysql, Mysql packages
- Design a database
- No hard coding information, no duplicate JS code.
- Node.js / Axios / JSON.
----------
Timeline: Now -> 07/09/2024
Submission: All of your code (HTML, CSS, JS, SQL, MP4 Video that contains a demo of the website and the code design)
Notes: CSS design matters, "do not design an ugly website".

// Email validator usage (as per documentation):
// var validator = require("email-validator");
// validator.validate("test@email.com"); // true


# PDF Example
- (from the documentation of pdfkit Nodejs module)
```js
const PDFDocument = require('pdfkit');
const fs = require('fs');
```
### Create a document
```js
const doc = new PDFDocument();
```
- Pipe its output somewhere, like to a file or HTTP response
```js
doc.pipe(fs.createWriteStream('output.pdf'));
```
- Embed a font, set the font size, and render some text
```js
doc
  .font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100);
```
- Add an image, constrain it to a given size, and center it vertically and horizontally
```js
doc.image('path/to/image.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});
```
- Add some text with annotations
```js
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');
```
### Finalize PDF file
```js
doc.end();
```
- Simulate a mouse click:
```js
window.location.href = "http://www.w3schools.com";
```
- Simulate an HTTP redirect:
```js
window.location.replace("http://www.w3schools.com");
```

<!-- 
  -- Reverse sort order in Products.html page
  -- red noti text
  -- Top sales in index
  -- 5 categories per row in home page
 -->


 <!-- 
 START TRANSACTION;


SELECT products_variations.variation_id, shopping_cart.quantity
INTO @variation_id0, @quantity0 
FROM products_variations
join shopping_cart on shopping_cart.variation_id = products_variations.product_id
WHERE shopping_cart.variation_id = 43 AND shopping_cart.in_cart = 1;

SELECT variation_id, @quantity2
INTO @variation_id2, @quantity2 
FROM products_variations 
WHERE variation_id = 2;


SELECT  SUM(pv.variation_price * sc.quantity) INTO @total_price
FROM Products_variations pv
JOIN shopping_cart sc ON sc.variation_id = pv.variation_id
WHERE pv.variation_id = @variation_id0 OR pv.variation_id = @variation_id2;

COMMIT;

  -->