# RipOff
\
\
\
## Table of contents
\
- [What is RipOff?](#what-is-ripoff)
- [Screenshots](#screenshots)
- [Run this website](#run-this-website)
## What is RipOff?
\
Ripoff is a webshop that was made especially to rip people off and steal their money without sending them the products they ordered.
\
## Screenshots
\
#### Home page [index.html](Client/index.html)
\
![Home page picture](Screenshots/index.png)
\
#### Signup page [signup.html](Client/signup.html)
\
![Signup page picture](Screenshots/signup.png)
\
#### Login page [login.html](Client/login.html)
\
![login page picture](Screenshots/login.png)
\
#### Shopping Cart Page [cart.html](Client/cart.html)
\
##### Empty Shopping Cart
\
![Empty Cart Picture](Screenshots/emptyCart.png)
\
##### Full Shopping Cart
\
![Full Cart Picture](Screenshots/fullCart.png)
\
##### Empty order history
\
![Empty order history picture](Screenshots/emptyHistory.png)
\
##### Full order history
\
![Full order history picture](Screenshots/fullHistory.png)
\
### Products page [products.html](Client/products.html)
\
![Products page picture](Screenshots/products.png)
\
#### Sort menu
\
![Sort menu picture](Screenshots/sort.png)
\
#### Search example
\
![Search example picture](Screenshots/search.png)
\
### Singular product page [product.html](Client/product.html)
\
![Product page picture](Screenshots/product.png)
\
### User profile page [user.html](Client/user.html)
\
#### User profile without addresses shown
\
![User profile page picture](Screenshots/user.png)
\
#### User profile with addresses shown 
\
![User profile page with addresses picture](Screenshots/addresses.png)
\
### Add new address page [addaddress.html](Client/addaddress.html)
\
![Add new address page picture](Screenshots/addaddress.png)
\
### Edit address page [editaddress.html](Client/editaddress.html)
\
![Edit address page picture](Screenshots/editaddress.png)
\
\
\
## Run this website
\
- Install XAMPP, You can get XAMPP from [apachefriends.org/download.html](https://www.apachefriends.org/download.html)
\
- Install node.js from [https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)
\
- Clone this repo to /xampp/htdocs/HERE, then launch XAMPP startup the Apache and MySQL services, then Import the database [ripoff.sql](./Server/ripoff.sql) into your MySQL at [localhost/phpmyadmin](localhost/phpmyadmin)
\
- navigate to [/xampp/htdocs/Status200/Ripoff/Server/](/xampp/htdocs/Status200/Ripoff/Server/) and open a command prompt there, then run the command
```bash
node server.js
```
\
if you did everything correctly you should see
```bash
Listening on port 3000...
Connected to the database.
```
in your command prompt
\
- Congratulations! the server is now running and you can navigate to [localhost/Status200/Ripoff/Client](localhost/Status200/Ripoff/Client) to test it (The link might differ for you).
\
\
\
## Documentations for the used PDF Node Module.
\
### PDF Example
\
\
```js
import PDFDocument from'pdfkit';
import fs from 'fs';
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

<!-- 
  -- Reverse sort order in Products.html page
  -- red noti text
  -- Top sales in index
  -- 5 categories per row in home page
  -- add product price to product.html
 -->