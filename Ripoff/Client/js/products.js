// This js file is designed to work with ./products.html & product.html
// return query parameter.
function getQueryParam(parameter) {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter);
}
// Fetch and display products for the selected category
function fetchProducts() {
    const categoryId = getQueryParam('category');
    const searchValue = getQueryParam('search');
    var order_by = getQueryParam('order_by');
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
    fetchCategories(function(response){
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
    productsQuery(urlExtension, categoryId, searchValue);
}
// Sory by <select> in Products.html page
function sortBy() {
    const urlParameters = new URLSearchParams(window.location.search);
    const sortByValue = getValueOfElementById("sortBy");
    // Remove existing order_by parameter.
    urlParameters.delete("order_by");
    // Set the new order_by parameter.
    window.location.assign("./products?" + urlParameters.toString()+"&order_by="+ sortByValue);
}

function productsQuery(urlExtension, categoryId, searchValue){
    axios.get(domain + urlExtension )
            .then(function(response) {
                const responseProducts = response.data;
                /* 
                    responseproducts.product's values include: id, name, sold, category_name, category_id, image, created_at, price, is_active
                 */
                const productsDiv = getElementById("products");
                const categoryNameHeader = getElementById("categoryName");
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

                responseProducts.forEach(function(product) {
                    const productDiv = document.createElement("div");
                    // get the first 2 words of a product's name and set them as img alt if it fails to load.
                    var productName = product.name.split(' ');
                    productName = productName[0]+" "+ productName[1] + " image" 
                    productDiv.innerHTML = "<img src='"+ product.image+"' alt='"+ productName+"'><div class='product_text'><p class='product_name'>"+ product.name+"</p><div class='product_footer'><p class='product_price'>RM"+ product.price+"</p><p class='product_sold'>"+product.sold+" Sold</p></div></div>";
                    productDiv.style.cursor = "pointer";
                    productsDiv.appendChild(productDiv);
                    productDiv.title = "View product";
                    productDiv.classList.add("product");
                    productDiv.onclick = function(){
                        window.location.href = "./product.html?product="+product.id;
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
            })
            .catch(function(error) {
                console.error("There was an error fetching products:", error);
            });
}

fetchProducts();