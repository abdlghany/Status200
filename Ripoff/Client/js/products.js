// This js file is designed to work with ./products.html?category="+category.category_id only
function getQueryParam(parameter) {
    // return query parameter.
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter);
}

// Fetch and display products for the selected category
function fetchProducts(order_by) {
    const categoryId = getQueryParam('category');
    if(!order_by){
        order_by = "created_at";
    }
    // check if categoryId exists then request the category from the server
    var urlExtension = "/products?order_by="+order_by;
    if (categoryId) {
        urlExtension += "&category_id=" + categoryId;   
    }
    productsQuery(urlExtension, categoryId);
}

function productsQuery(urlExtension, categoryId){
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
                else categoryNameHeader.textContent = "All Products";

                responseProducts.forEach(function(product) {
                    const productDiv = document.createElement("div");
                    var productName = product.name.split(' ');
                    productName = productName[0]+" "+productName[1] + " image"
                    productDiv.innerHTML = "<img src='"+product.image+"' alt='"+productName+"'><div class='product_text'><p class='product_name'>"+product.name+"</p><div class='product_footer'><p class='product_price'>RM"+product.price+"</p><p class='product_sold'>"+product.sold+" Sold</p></div></div>";

                    productDiv.style.cursor = "pointer";
                    productsDiv.appendChild(productDiv);
                    productDiv.title = "View product";
                    productDiv.classList.add("product");
                    productDiv.onclick = function(){
                        window.location.href = "./product.html?product="+product.id;
                    };
                });
            })
            .catch(function(error) {
                console.error("There was an error fetching products:", error);
            });
}

fetchProducts();