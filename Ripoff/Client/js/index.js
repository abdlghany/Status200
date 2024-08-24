
const navigationBar = getElementById("navigationBar");
const categories = getElementById("categories");

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
/* 
    Get categories from the database and display them in the index page.
*/
function fetchCategories(){
    axios.get("http://ripoff.local:3000/index")
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

function signup(){
    //get all relevant element's values.
    const username = getValueOfElementById("username");
    const password = getValueOfElementById("password");
    const email = getValueOfElementById("email");    
    const firstName = getValueOfElementById("fName");
    const lastName = getValueOfElementById("lName");
    const phone = getValueOfElementById("phone");

    // reset all messages by their ID's (hide them and turn their text values into an empty string)
    resetMessages(["usernameError","passwordError", "emailError", "phoneError", "fNameError", "lNameError", "errorMessage"]);

    if(validateName(username)){
        //password accepts numbers, letters and spaces. 
        if(validateName(password, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))){
            // match letters, numbers and ._%+- before the @ and letters numbers .- after it but before the dot, and at least 2 letters after the dot.
            if(validateName(email, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))){
                if(validatePhone(phone)){
                    if(validateName(firstName)){
                        if(validateName(lastName)){
                            axios.get('http://ripoff.local:3000/signup', {
                                params: {
                                username: username,
                                password: password,
                                email: email,
                                phone: phone,
                                firstName: firstName,
                                lastName: lastName
                              }
                            })
                              .then(function (response) {
                                passMessageToElement("errorMessage", response.data.message, "red", 1);
                              })
                              .catch(function (error) {
                                
                              });
                        }
                        else
                        // wrong last name format
                        passMessageToElement("lNameError", "Must be between 2 and 50 chars", "red", 1);
                    }
                    else
                    // wrong first name format
                    passMessageToElement("fNameError", "Must be between 2 and 50 chars", "red", 1);
                }
                else
                // wrong phone format
                passMessageToElement("phoneError", "Must be between 7 and 15 numbers", "red", 1);
            }
            else
            // wrong email format
            passMessageToElement("emailError", "Invalid email format", "red", 1);
        }
        // wrong password format
        else{
            passMessageToElement("passwordError", "Please enter a valid password", "red", 1);
        }
    }
    // wrong username format
    else{
        passMessageToElement("usernameError", "Please enter a valid username", "red", 1);
    }
}