// This js file is designed to work with ./products.html & product.html
let images = [];
let currentImageIndex = 0;

// Singular product query for (product.html?product=product_id)
function fetchProduct(){
    const productId = getQueryParam('product');
    const urlExtension = "/product?product="+productId;

    const productImageContainer = getElementById('productImageContainer');
    const productNameHeader = getElementById('productName');
    const productVariationsUl = getElementById('productVariationsUl');
    const productDesc = getElementById('productDesc');
    const soldParagraph = getElementById('productSold');
    const variationPrice = getElementById('variationPrice');
    var maxAvailableQuantity = 0
    //if there's a productId fetch the data from the server and display it
    if(productId){
        axiosQuery(urlExtension, function(response){
            /* 
            ** executes 3 Queries and returns the results as follows **

            Query1 productImages = returned columns (image_id, image).

            Query2 products = returned columns (product_id, product_name, product_description, category_id, created_at, sold, product_is_active, category_name)

            Query3 variations = returned columns (product_id, variation_id, variation_name, variation_price, variation_stock, variation_is_active)
            response: [
                        [productImages (Query1)],
                        [products (Query2)],
                        [variations (Query3)]
                    ]
        */
            // Server returns Product not found if the rows of Query2 were 0.
            if(response.data.message != "Product not found"){
            const productImages = response.data[0];
            const products = response.data[1];
            const variations = response.data[2];
            // Left and right arrows for images
            const leftArrow = document.getElementsByClassName('leftArrow');
            const rightArrow = document.getElementsByClassName('rightArrow');
            // PRODUCT IMAGES
            productImages.forEach(function(image, index){
                // Create a new HTML element for each product image we have.
                const img = document.createElement("img");
                img.src= image.image;
                img.classList.add("productImage");
                // hide all images after the first one.
                img.style.display = "none";
                productImageContainer.appendChild(img);
                // add this image to the list of global images in this file (page).
                images[index] = img;
                // hide the arrows on the first loop pass 
                if(index == 0){
                    leftArrow[0].classList.add('display_none');
                    rightArrow[0].classList.add('display_none'); 
                }
                // display them if there's more than 1 image in the database. (index = 1 on the second pass.)
                else{
                leftArrow[0].classList.remove('display_none');
                rightArrow[0].classList.remove('display_none');
                }
            });

            // PRODUCTS: Since there's only 1 product, there's no need for a forEach loop.
            productNameHeader.innerText = products[0].product_name;
            productDesc.innerHTML = products[0].product_description
            categoryName.innerHTML += products[0].category_name
            // add a category link to its label
            categoryName.href = "./products.html?category="+products[0].category_id;
            // Sold Out image if the product is not active
            if(products[0].product_is_active == 0){
                const soldOutImage = document.createElement("img");
                soldOutImage.src = "./img/soldout.png";
                soldOutImage.classList.add("soldout-overlay");
                productImageContainer.appendChild(soldOutImage);
            }
            // No. of items sold
            if(products[0].sold){
                soldParagraph.innerHTML = products[0].sold + " Sold";
            }
            else{
                soldParagraph.innerHTML = "0 Sold"; /* Default value if no value returned from the DB */
            }

            // PRODUCT VARIATIONS.
            var variationsStock = 0;
            variations.forEach(function(variation){
                const li = document.createElement('li');
                const radio = document.createElement('input');
                const label = document.createElement('label');
                const addToCartButton = getElementById('addToCartButton');

                const variationId = variation.variation_id;
                const availableQuantity = variation.variation_stock;
                // Radio button that'll allow the user to select a variation
                radio.type ="radio";
                radio.name = "variation"; // all radio buttons will have the same name.
                radio.value = variationId; 
                radio.id = "variation"+variationId;
                radio.classList.add("productVariationButton", "display_none");
                // Change the displayed number of available pieces when the user selects a (different) variation
                radio.onchange = function() {
                    // change maxAvailableQuantity so that changeProductCount(1) doesn't incrase more than the max available
                    // the maxAvailableQuantity starts at 0 so that the user can't 
                    maxAvailableQuantity = availableQuantity;
                    // if the input's current value is bigger than the maxAvailableQuantity, assign it to max.
                    if(productCount.value > maxAvailableQuantity){
                        productCount.value = maxAvailableQuantity;
                    }
                    changeStockCount(maxAvailableQuantity, variation.variation_price);
                    // Change the button's variationId and stock quantity for the product that's being added to the cart.
                    addToCartButton.onclick = function(){
                        addToCart(variationId, maxAvailableQuantity);
                    }
                };
                li.appendChild(radio);
                // Label for the radio button
                label.innerText = variation.variation_name;
                label.setAttribute("for", "variation" + variationId);
                label.classList.add("label_radio");
                label.title = "Select "+variation.variation_name;

                li.appendChild(label);
                // add li to ul
                productVariationsUl.appendChild(li);
                //disable the radio button if the product is inactive or if it's out of stock (which makes the label disabled as well)
                if(variation.variation_is_active == 0 || availableQuantity == 0){
                    radio.disabled = true;
                    label.classList.add("disabledRadioButton");
                    addToCartButton.onclick = function(){
                        showToast("This item is out of stock.");
                    }
                }
                // if the radio button is not disabled (and not out of stock), and there's only 1 variation, auto select it.
                else if(variations.length == 1){
                    radio.checked = true;
                    // Variation is already auto-checked, so assigning maxAvailableQuantity automatically as well.
                    maxAvailableQuantity = availableQuantity;
                    // There's one variation.
                    variationsStock = maxAvailableQuantity;
                    addToCartButton.onclick = function(){
                        addToCart(variationId, maxAvailableQuantity);
                    } 
                }
                else{
                    // Increase variationsStock count if there's more than 1 variation and it's active and it's not out of stock
                    variationsStock += availableQuantity;
                }
                variationPrice.innerText = "RM" + variation.variation_price;
            });
            /* 
                Note to self: Keep these inside the callback function to make sure they run after the page loads db information, otherwise they don't work.
            */
            // Set the number of available 
            const variation_stock_paragraph = getElementById('variationStock');
            // variationsStock is the total stock available for this product that includes all variations that are active 
            variation_stock_paragraph.innerText = variationsStock + " pieces available.";
           

            // assign an onclick event for the + and the - buttons around the quantity input field.
            const leftProductCountButton = getElementById('leftProductCountButton');
            const rightProductCountButton = getElementById('rightProductCountButton');
            
            leftProductCountButton.onclick = function(){
                changeProductCount(0, 'productCount', maxAvailableQuantity);
            }
            rightProductCountButton.onclick = function(){
                if(maxAvailableQuantity == 0){
                    showToast("Please select a variation first!")
                }
                else{
                    changeProductCount(1, 'productCount', maxAvailableQuantity);
                }
            }
            // shows Image number 'currentImageIndex' which is Image[0] and hide the rest
            showImage(currentImageIndex);
            // Input field type="number" id="productCount"
            const productCount = getElementById('productCount');
            productCount.onchange = function(){
                // do not allow values less than 0 when the user changes this field's value manually
                // also do not allow values higher than the maxAvailableQuantity
                if(productCount.value > maxAvailableQuantity){
                    productCount.value = maxAvailableQuantity;
                }
                else if(productCount.value < 0){
                    productCount.value = 0;
                }
                else if(!productCount.value){
                    // do not allow an empty field, fill it with 0
                    productCount.value = 0;
                }
            }
        }
        else{
            // redirect the user back to the products page because this product does not exist.
            // (maybe the user manually entered a wrong product ID in the URL parameter?) Example: "/product.html?product=310" << will not show an empty product page now.
            window.location.assign("./products.html");
        }
        });
    }
    // if there's no productId, navigate to the products page because this product does not exist.
    else{
        window.location.assign("./products.html");
    }
}
// runs after the Add to cart button is clicked
function addToCart(variationId, maxItemCount){
    if(localStorage.getItem("id")){
        // if the user is logged in, and the maximum count of the selected variation is bigger or equals to the amount they're trying to add to cart
        // add to cart
        const productCountInput = getElementById('productCount');
        const productCountValue = productCountInput.value;
        // reset all text in the errorMessage paragraph to prepare for a new message (if any).
        resetMessages(['errorMessage']);
        if(productCountValue <= 0){
            // faintly colored error message to not draw the user's attention away from the product itself
            passMessageToElement("errorMessage", "Quantity can't be lower than 1.", "gray", 1);
            return;
        }
        else if(productCountValue <= maxItemCount){

        }
        // making sure that the value is not bigger than the maxItemCount available for the variation.
        else{
            productCountInput.value = maxItemCount;
            productCountValue = maxItemCount;
            console.log("You should never see this message in the log.");
        }
        // Now that we're sure that the maxItem count is valid, and the user is logged in, we can safely add the item to the user's cart
        const urlExtension = "/addToCart?variation_id="+variationId+"&quantity="+productCountValue+"&id="+localStorage.getItem('id');
        axiosQuery(urlExtension,
            function(response){
                if(response){
                    if(response.data.message){
                        showToast(response.data.message);
                    }
                }else{
                    passMessageToElement("errorMessage", "Please try again later.", "red", 1);
                }
            });
    }
    // if not logged in, redirect them to the login screen.
    else{
        window.location.assign("./login.html");
    }
}

function changeStockCount(newCount, newPrice){
    const variation_stock = getElementById('variationStock');
    const variationPrice = getElementById('variationPrice');
    variation_stock.innerText = newCount + " pieces available.";
    variationPrice.innerHTML = "RM"+newPrice;
}

// Fetch and display products for the selected category (for products.html?category_id=category_id)
function fetchProducts() {
    //get query parameters
    const categoryId = getQueryParam('category');
    var searchValue = getQueryParam('search');
    var order_by = getQueryParam('order_by');
    // get relevant HTML elements from products.html
    const productsDiv = getElementById("products");
    const categoryNameHeader = getElementById("categoryName");
    const allProducts = getElementById("allProducts");
    // if there's no order_by parameter, order by created_at
    if(order_by){
        // if the current order by is the same as last order_by, invert the direction of the column (DESC -> ASC).
        if(order_by == localStorage.getItem("last_order_by")){
            if(localStorage.getItem("direction") == "DESC"){
                localStorage.setItem("direction", "ASC");
            }
            else{
                localStorage.setItem("direction", "DESC");
            }
        }
        // if the user did not select the same order_by (to make sure "direction" is defined).
        else{
            localStorage.setItem("direction", "DESC");
        }
        localStorage.setItem("last_order_by", order_by);
    }
    else{
        order_by = "created_at";
    }
    if(!localStorage.getItem("direction")){
        localStorage.setItem("direction", "DESC");
    }
    // Always use order_by and direction when requesting, even if it doesn't exist in the current URL parameters.
    var urlExtension = "/products?order_by=" + order_by + "&direction=" + localStorage.getItem("direction");
    // check if categoryId exists then request the category from the server
    if (categoryId) {
        urlExtension += "&category_id=" + categoryId;   
    }
    // if categoryId does not exist, make 'all products' bold.
    else{
        allProducts.classList.add("bold");
    }
    if(searchValue){
        urlExtension += "&search=" + searchValue;
        searchValue = searchValue.toLowerCase()
    }
    axiosQuery("/index",function(response){
        const responseCategories = response.data;
        const side_menu_categories = getElementById("side_menu_categories");
       
        responseCategories.forEach(function(category){
            const li = document.createElement("li");
            if(category.category_id == categoryId){
                li.classList.add("bold");
            }
            li.innerHTML = "<a href='./products.html?category="+ category.category_id+"'>"+ category.category_name+"</a>";
            side_menu_categories.appendChild(li);

        });
        
    });
    
    axiosQuery(urlExtension, function(response){
        const responseProducts = response.data;
        const navigationSearch = getElementById("navigationSearch");
                /* 
                    responseproducts.product's values include: id, name, sold, category_name, category_id, image, created_at, price, is_active
                 */
                if(!responseProducts.message){
                    if(categoryId){
                        categoryNameHeader.textContent = responseProducts[0].category_name;
                    }
                    // if the search bar is used.
                    else if(searchValue){
                        categoryNameHeader.textContent = "Showing search results for '"+ searchValue+"'";
                        navigationSearch.value = searchValue;
                    }
                    else{
                        categoryNameHeader.textContent = "All Products";
                    }
                    // Loop through products and display them in productsDiv one by one
                    responseProducts.forEach(function(product) {
                        const productDiv = document.createElement("div");
                        // get the first 2 words of a product's name and set them as img alt if it fails to load.
                        var productName = product.name.split(' ');
                        productName = productName[0]+" "+ productName[1] + " image" 
                        productDiv.innerHTML = "<img src='"+ product.image+"' alt='"+ productName+"'><div class='product_text'><p class='product_name'>"+ product.name+"</p><div class='product_footer'><p class='product_price'>RM"+ product.price+"</p><p class='product_sold'>"+product.sold+" Sold</p></div></div>";
                        productDiv.style.cursor = "pointer";
                        // product(S)Div below me (parent of productDiv).
                        productsDiv.appendChild(productDiv);
                        productDiv.title = "View product";
                        productDiv.classList.add("product");
                        productDiv.onclick = function(){
                            window.location.assign("./product.html?product="+product.id);
                        };
                        //use image sold out on top of the product picture to indicate that it's been sold out.
                        if (product.is_active === 0) {
                            productDiv.innerHTML += "<img src='./img/soldout.png' class='soldout-overlay'>";
                        }
                        const sortBy = getElementById("sortBy");
                        if(getQueryParam('order_by'))
                            sortBy.value = getQueryParam('order_by');
                        else sortBy.value = "";
                    });
                }
                else if(responseProducts.message == "No search results"){
                    categoryNameHeader.textContent = "There are no results for your search '"+ searchValue+"'";
                    navigationSearch.value = searchValue; // keep the search bar filled with the search value
                }
                else{
                    // Redirect the user to 'All Products' page if the server returned 'category not found', if a certain category was deleted and someone has it favorited (?)
                    // (maybe the user manually entered a wrong category ID in the URL parameter?) Example case: "/products.html?category=200" << will not show an empty category page now.
                    window.location.assign("./products.html");
                }
    });
}
// Sory by <select> in Products.html page
function sortBy() {
    const urlParameters = new URLSearchParams(window.location.search);
    const sortByValue = getValueOfElementById("sortBy");
    // Remove existing order_by parameter.
    urlParameters.delete("order_by");
    // Set the new order_by parameter.
    window.location.assign("./products.html?" + urlParameters.toString()+"&order_by="+ sortByValue);
}

function showImage(index) {
    images.forEach(function(img, i){
        if(i == index){
            img.style.display = "block";
        }
        else{
            img.style.display = "none";
        }
    });
}

function prevImage() {
    if (currentImageIndex > 0){
        currentImageIndex -= 1
    }
    // go to the last picture
    else{
        
        currentImageIndex = images.length - 1;
    }
    showImage(currentImageIndex);
}

function nextImage() {
    if (currentImageIndex < images.length - 1){
        currentImageIndex += 1;
    }
    // return to the first picture
    else{
        currentImageIndex = 0;
    }
    showImage(currentImageIndex);
}