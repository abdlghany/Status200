
const navigationBar = getElementById("navigationBar");
const categories = getElementById("categories");


axios.get("http://ripoff.local:3000/index.html")
.then(function(response) {
    const responseCategories = response.data;
    responseCategories.forEach(function(category){
        const div = document.createElement("div");
        div.innerHTML = '<img src="'+category.category_image+'" alt="'+category.category_name+' Image">'+'<a>'+category.category_name+'</a>';
        div.id = "category";
        div.style.cursor = "pointer";
        div.onclick = function() {
            productListHeader.innerText = "Products in "+category.category_name;
            fetchProducts(category.category_id)
            
        };
        categories.appendChild(div);
    });
})
.catch(function(error) { 
    console.error("There was an error fetching categories:", error);
});
/*
to avoid having the navigation bar rewritten in every single HTML page, I've created a function that loads it when the HTML page Body finishes loading.
&nbsp; = empty space.
*/
// Fetch categories
function loadNavigationBar(){
    navigationBar.innerHTML = `
        <ul class="nav-ul">
            <div id="logoDiv">
                <li class="nav-li"><a href="./index.html"><img src="./img/ripoffLogo.png" alt="Ripoff Logo"></a></li>
                <li class="nav-li"><a href="./index.html">Ripoff</a></li>
            </div>
            <div id="searchDiv">
                <li class="nav-li"><input id="navigationSearch" type="text" placeholder="Search products..."></li>
                <li class="nav-li"><a href="javascript:search()"><img src="./img/search.png" alt="Search Button" id="searchButton"></a></li>
            </div>
            <div id="cartDiv">
                <li class="nav-li"><a href="./signup.html">Sign Up</a></li>
                <li class="nav-li"><p>&nbsp;|&nbsp;</p></li>
                <li class="nav-li"><a href="./login.html">Login</a></li>
                <li class="nav-li"><a href="javascript:cart()"><img src="./img/cart.png" alt="Cart Image" id="cartButton"></a></li>
            </div>
        </ul>
    `;
}

function search(){
    const navigationSearchValue = getValueOfElementById("navigationSearch");
    //There's no else because we don't want the browser to do anything if there's nothing in the search bar.
    if(navigationSearchValue && navigationSearchValue!= ""){

        window.location.replace("./search?keyword="+navigationSearchValue);
    }
    
}

function cart(){

}