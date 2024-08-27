// This js file is designed to work with ./products.html?category="+category.category_id only
function getQueryParam(parameter) {
    // return query parameter.
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter);
}

// Fetch and display products for the selected category
function fetchProducts() {
    const categoryId = getQueryParam('category');
    // check if categoryId exists then request the category from the server
    if (categoryId) {
        axios.get(domain + "/products?category_id=" + categoryId)
            .then(function(response) {
                const responseProducts = response.data;
                const productsDiv = getElementById("products");
                const categoryNameHeader = getElementById("categoryName");
                if(responseProducts[0]){
                    categoryNameHeader.textContent = responseProducts[0].category_name;
                }
                else categoryNameHeader.textContent = "Products";

                responseProducts.forEach(function(product) {
                    const productDiv = document.createElement("div");
                    productDiv.innerHTML = `<h2>${product.product_name}</h2><p>${product.product_description}</p>`;
                    productsDiv.appendChild(productDiv);
                });
            })
            .catch(function(error) {
                console.error("There was an error fetching products:", error);
            });
    } else {
        console.error("No category specified.");
    }
}

fetchProducts();