// This js file is designed to work with ./products.html & product.html
let images = [];
let currentImageIndex = 0;
var maxAvailableQuantity = 0
// return query parameter.
function getQueryParam(parameter) {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter);
}

// Singular product query
function fetchProduct(){
    const productId = getQueryParam('product');
    const urlExtension = "/product?product="+productId;
    const productImageContainer = getElementById('productImageContainer');
    const productDetailsDiv = getElementById('productDetails');
    const productNameHeader = getElementById('productName');
    const productVariationsUl = getElementById('productVariationsUl');
    const productDesc = getElementById('productDesc');
    //if there's a productId fetch the data from the server and display it
    if(productId){
        axiosQuery(urlExtension, function(response){
            /* 
            **casually execute 3 Queries and return the results as follows**

            Query1 productImages = returned columns (image_id, image).

            Query2 products = returned columns (product_id, product_name, product_description, category_id, created_at, sold, product_is_active, category_name)

            Query3 variations = returned columns (product_id, variation_id, variation_name, variation_price, variation_stock, variation_is_active)

            response: [
                        [productImages (Query1)],
                        [products (Query2)],
                        [variations (Query3)]
                    ]
        */
            const productImages = response.data[0];
            const products = response.data[1];
            const variations = response.data[2];

            // IMAGES
            productImages.forEach(function(image, index){
                const leftArrow = document.getElementsByClassName('leftArrow');
                const rightArrow = document.getElementsByClassName('rightArrow');
                const img = document.createElement("img");
                img.src= image.image;
                img.classList.add("productImage");
                // hide all images after the first one.
                img.style.display = "none";
                productImageContainer.appendChild(img);
                // add this image to the list of global images in this file.
                images[index] = img;
                //this will hide the arrows on the first loop pass 
                if(index == 0){
                    leftArrow[0].classList.add('display_none');
                    rightArrow[0].classList.add('display_none'); 
                }
                //then display them if there's more than 1 image in the database. (index = 1 on the second pass.)
                else{
                leftArrow[0].classList.remove('display_none');
                rightArrow[0].classList.remove('display_none');
                }
            });

            // PRODUCTS: Since there's only 1 product, there's no need for a forEach loop.
            productNameHeader.innerText = products[0].product_name;
            //ADD SUPPORT FOR 1 IMAGE (HIDE THEM ARROWS FROM THE VIEW).
            productDesc.innerHTML = products[0].product_description
            categoryName.innerHTML += products[0].category_name
            categoryName.href = "./products.html?category="+products[0].category_id;
            if(products[0].product_is_active == 0){
                const soldOutImage = document.createElement("img");
                soldOutImage.src = "./img/soldout.png";
                soldOutImage.classList.add("soldout-overlay");
                productImageContainer.appendChild(soldOutImage);
            }

            // VARIATIONS.
            var variationsStock = 0;
            variations.forEach(function(variation, index){
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

                    changeStockCount(maxAvailableQuantity);
                    // Change the button's variationId and stock quantity
                    addToCartButton.onclick = function(){
                        addToCart(variationId, maxAvailableQuantity);
                    }
                };
                li.appendChild(radio);
                // Label for the radio button
                label.innerText = variation.variation_name;
                label.setAttribute("for", "variation" + variationId);
                label.classList.add("label_radio");

                li.appendChild(label);
                // add li to ul
                productVariationsUl.appendChild(li);
                //disable the radio button if the product is inactive or if it's out of stock
                if(variation.variation_is_active == 0 || availableQuantity == 0){
                    radio.disabled = true;
                    label.classList.add("disabledRadioButton");
                    console.log(radio.classList.value);
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
            });
            /* 
                Note to self: Keep these inside the callback function to make sure they run after the page loads db information, otherwise they don't work.
            */
            // Set the number of available 
            const variation_stock_paragraph = getElementById('variation_stock');
            // variationsStock is the total stock available for this product that includes all variations that are active 
            variation_stock_paragraph.innerText = variationsStock + " pieces available.";

            // assign an onclick event for the + and the - buttons around the quantity input field.
            const leftProductCountButton = getElementById('leftProductCountButton');
            const rightProductCountButton = getElementById('rightProductCountButton');
            
            leftProductCountButton.onclick = function(){
                changeProductCount(0, 'productCount');
            }
            rightProductCountButton.onclick = function(){
                changeProductCount(1, 'productCount');
            }
            //shows Image number 'currentImageIndex' which is Image 1 and hide the rest
            showImage(currentImageIndex);
            const productCount = getElementById('productCount');
            productCount.onchange = function(){
                //do not allow values less than 0 when the user changes this field's value manually, also do not allow values higher than the maxAvailableQuantity
                if(productCount.value > maxAvailableQuantity){
                    productCount.value = maxAvailableQuantity;
                }
                else if(productCount.value < 0){
                    productCount.value = 0;
                }
                else if(!productCount.value){
                    // do not allow an empty field, fill it witl 0
                    productCount.value = 0;
                }
            }
        });
    }
    // if there's no productId, navigate to the products page because this product does not exist.
    else{
        window.location.assign("./products.html");
    }
}

function addToCart(variationId, maxItemCount){
    if(localStorage.getItem("id")){
        // if the user is logged in, and the maximum count of the selected variation is bigger or equals to the amount they're trying to add to cart, add to cart
        const productCountInput = getElementById('productCount');
        const productCountValue = productCountInput.value;
        //reset all text in the errorMessage paragraph to prepare for a new message (if any).
        resetMessages(['errorMessage']);
        if(productCountValue <= 0){
            // faintly colored error message to not draw the user's attention away from the product
            passMessageToElement("errorMessage", "Quantity can't be lower than 1.", "gray", 1);
        }
        else if(productCountValue <= maxItemCount){

        }
        // again ,just being 100% sure that the value is not bigger than the maxItemCount available for the variation.
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
function changeStockCount(newCount){
    const variation_stock = getElementById('variation_stock');
    variation_stock.innerText = newCount + " pieces available.";
}
// Increase or decrease the number of variations in a product quantity input field (before adding to cart)
function changeProductCount(change, elementId){
    // if change == 0 decrease, otherwise increase
    const inputField = getElementById(elementId);
    // input "type = Number"  that has a default value of '0' so it doesn't require any further validation.
    var inputFieldValue = parseInt(getValueOfElementById(elementId));
    if(change == 0){
        if(inputFieldValue > 0){
            inputFieldValue -= 1;
        }  
    }
    else {
        if(inputFieldValue >= maxAvailableQuantity){
            // do no increase anymore, assign the maxItemCount instead
            inputFieldValue = maxAvailableQuantity;
        }
        else{
            inputFieldValue += 1;
        }
        
    }
    inputField.value = inputFieldValue;
}

// Fetch and display products for the selected category
function fetchProducts() {
    //get query parameters
    const categoryId = getQueryParam('category');
    const searchValue = getQueryParam('search');
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
                /* 
                    responseproducts.product's values include: id, name, sold, category_name, category_id, image, created_at, price, is_active
                 */
                if(categoryId){
                    categoryNameHeader.textContent = responseProducts[0].category_name;
                }
                else if(searchValue){
                    categoryNameHeader.textContent = "Search results for '"+ searchValue.toLowerCase()+"'";
                    const navigationSearch = getElementById("navigationSearch");
                    navigationSearch.value = searchValue.toLowerCase();
                    if(responseProducts.message == "Product not found"){
                        categoryNameHeader.textContent = "There are no results for your search '"+ searchValue.toLowerCase()+"'";
                        return
                    }
                }
                else categoryNameHeader.textContent = "All Products";
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


//querySelectorAll Returns all element descendants of the element that matches selectors
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
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message; 
    toast.className = "show"; // display the toast by adding the "show" class
    setTimeout(function(){
        toast.className = toast.className.replace("show", ""); // Remove the "show" class after 2 seconds
    }, 3000);
}