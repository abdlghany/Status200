const navigationBar = getElementById("navigationBar");
const categories = getElementById("categories");
const domain = "http://ripoff.local:3000";

/*
    to avoid having the navigation bar rewritten in every single HTML page, I've created a function that loads it when the HTML page Body finishes loading.
    &nbsp; = empty space.
*/

function loadNavigationBar(){
    var navigationBarContents =
        '<ul class="nav-ul">'+
            '<div id="logoDiv" title="Home Page">'+
                '<li class="nav-li"><a href="./index.html"><img src="./img/ripoffLogo.png" alt="Ripoff Logo"></a></li>'+
               '<li class="nav-li"><a href="./index.html">Ripoff</a></li>'+
           '</div>'+
           '<div id="searchDiv">'+
               '<li class="nav-li"><input id="navigationSearch" type="text" placeholder="Search products..."></li>'+
               '<li class="nav-li"><a href="javascript:search()"><img src="./img/search.png" alt="Search Button" id="searchButton"></a></li>'+
          '</div>'+
           '<div id="cartDiv">';
            if(localStorage.getItem("userId")){
                navigationBarContents += 
              '<li class="nav-li"><span>Welcome&nbsp;</span><a href="./user.html" title="My Profile"> '+localStorage.getItem("firstName")+'</li>'+
              ' <li class="nav-li"><p class="separator"> | </p></li>'+
               ' <li class="nav-li"><a href="javascript:logout()" title="Logout of your account">Logout</a></li>';
            }
            else{
                navigationBarContents += 
               ' <li class="nav-li"><a href="./signup.html">Sign Up</a></li>'+
               ' <li class="nav-li"><p class="separator">|</p></li>'+
               ' <li class="nav-li"><a href="./login.html">Login</a></li>';
            }
            navigationBarContents += 
           ' <li class="nav-li"><a href="javascript:cart()"><img src="./img/cart.png" alt="Cart Image" id="cartButton" title="Shopping Cart"></a></li>'+
           ' </div>'+
        '</ul>';
        navigationBar.innerHTML = navigationBarContents;
    }
/* 
    Get categories from the database and display them in the index page.
*/
function fetchCategories(){
    axios.get(domain+"/index")
    .then(function(response) {
        const responseCategories = response.data;
        responseCategories.forEach(function(category){
            const div = document.createElement("div");
            div.innerHTML = '<img src="'+category.category_image+'" alt="'+category.category_name+' Image">'+'<a>'+category.category_name+'</a>';
            div.id = "category";
            div.style.cursor = "pointer";
            div.title = "Shop for "+category.category_name;
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
//When the search button in the navigation bar is clicked.
function search(){
    const navigationSearchValue = getValueOfElementById("navigationSearch");
    //There's no else because we don't want the browser to do anything if there's nothing in the search bar.
    if(navigationSearchValue && navigationSearchValue!= ""){
        window.location.assign("./search?keyword="+navigationSearchValue);
    }
    
}
// When the cart is clicked.
function cart(){
    // check if user is logged in then open the cart.
    if(localStorage.getItem("userId")){

    }
    // if not logged in, redirect them to the login screen.
    else{
        window.location.assign("./login.html");
    }
}
//function when the user clicks the button logout in the navigation bar
function logout(){
    // remove user data from local storage.
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("lastName");
    // redirect the user to the homepage when they logout
    window.location.assign("./index.html");
}
// Function when the user clicks the button login in the login page.
function login(){
    // Get all relevant element's values.
    const username = getValueOfElementById("username");
    const password = getValueOfElementById("password");
    // set isEsername and isEmail false.
    var isUsername = false;
    var isEmail = false;

    resetMessages(["usernameError","passwordError", "errorMessage"]);
    // First check if the format matches an email format
    if(username.includes("@"))
       // Validate using the E-mail Regex.
       isEmail = validateName(username, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))
    // if Username does not contain @ (means it's not an email) validate using normal name regex (default to the function validateName regex)
    else isUsername = validateName(username);
    if(isEmail || isUsername) {if(validateName(password, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))){
        axios.get(domain+"/login", {
            params: {
            username: username,
            password: password,
            isEmail: isEmail
          }
        })
          .then(function (response) {
            const userData = response.data;
            if(userData.message){
                passMessageToElement("errorMessage", userData.message, "red", 1);
            }
            else{
                localStorage.setItem("userId", userData[0].id);
                localStorage.setItem("userName", userData[0].name);
                localStorage.setItem("email", userData[0].email);
                localStorage.setItem("phone", userData[0].phone);
                localStorage.setItem("firstName", userData[0].first_name);
                localStorage.setItem("lastName", userData[0].last_name);
                
                // Hide Sign Up | Login from the navigation bar, and show Logout
                window.location.assign("./index.html");
            }
          })
          .catch(function (error) {
            passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
            console.error(error);
          });
    }
    // Invalid password format.
    else passMessageToElement("passwordError", "Please enter a valid password", "red", 1);
    }
    // Invalid username or Email format.
    else passMessageToElement("usernameError", "Please enter a valid username / email", "reg", 1);

}

// Function when the user clicks the button Sign up in the user registration page.
function signup(){
    // Get all relevant element's values.
    const username = getValueOfElementById("username");
    const password = getValueOfElementById("password");
    const email = getValueOfElementById("email");    
    const firstName = getValueOfElementById("fName");
    const lastName = getValueOfElementById("lName");
    const phone = getValueOfElementById("phone");

    // Reset all messages by their ID's (hide them and turn their text values into an empty string)
    resetMessages(["usernameError","passwordError", "emailError", "phoneError", "fNameError", "lNameError", "errorMessage"]);

    if(validateName(username)){
        // Password accepts numbers, letters and spaces. 
        if(validateName(password, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))){
            // Match letters, numbers and ._%+- before the @ and letters numbers .- after it but before the dot, and at least 2 letters after the dot.
            if(validateName(email, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))){
                if(validatePhone(phone)){
                    if(validateName(firstName)){
                        if(validateName(lastName)){
                            axios.get(domain+"/signup", {
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
                                passMessageToElement("errorMessage", response.data.message, "green", 1);
                              })
                              .catch(function (error) {
                                passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
                              });
                        }
                        else
                        // Wrong last name format
                        passMessageToElement("lNameError", "Must be between 2 and 50 chars", "red", 1);
                    }
                    else
                    // Wrong first name format
                    passMessageToElement("fNameError", "Must be between 2 and 50 chars", "red", 1);
                }
                else
                // Wrong phone format
                passMessageToElement("phoneError", "Must be between 7 and 15 numbers", "red", 1);
            }
            else
            // Wrong email format
            passMessageToElement("emailError", "Invalid email format", "red", 1);
        }
        // Wrong password format
        else{
            passMessageToElement("passwordError", "Please enter a valid password", "red", 1);
        }
    }
    // Wrong username format
    else{
        passMessageToElement("usernameError", "Please enter a valid username", "red", 1);
    }
}

// My Profile, when the user clicks on their name in the navigation bar.
function profile(){
    const profileElements = ["username", "email","phone", "fName", "lName"];
    const username = getElementById("username");
    const email = getElementById("email");    
    const firstName = getElementById("fName");
    const lastName = getElementById("lName");
    const phone = getElementById("phone");
    // Set 'disabled' HTML attribute true for the listed elements
    disableElements(profileElements);

    // Load values from the localStorage into the input fields after the page loads (window.location.assign)
    username.value =  localStorage.getItem("userName");
    firstName.value = localStorage.getItem("firstName");
    email.value =  localStorage.getItem("email");
    phone.value = localStorage.getItem("phone");
    lastName.value = localStorage.getItem("lastName");
}
function activateField(fieldIndex){
    const profileElements = ["username", "email","phone", "fName", "lName"];
    enableElement(profileElements[fieldIndex]);
}
// saves the profile information when the user clicks Save in My Profile page.
function saveProfile(){
    const id = localStorage.getItem("userId");
    
}