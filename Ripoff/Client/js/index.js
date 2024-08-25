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
            if(localStorage.getItem("id")){
                navigationBarContents += 
              '<li class="nav-li"><span>Welcome&nbsp;</span><a href="./user.html" title="My Profile"> '+localStorage.getItem("first_name")+'</li>'+
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
    if(localStorage.getItem("id")){

    }
    // if not logged in, redirect them to the login screen.
    else{
        window.location.assign("./login.html");
    }
}
//function when the user clicks the button logout in the navigation bar
function logout(){
    // remove all user data from local storage.
    localStorage.clear();
    // redirect the user to the homepage when they logout
    window.location.assign("./index.html");
}
// Function when the user clicks the button login in the login page.
function login(){
    // Get all relevant element's values.
    const username = getValueOfElementById("username");
    const password = getValueOfElementById("password");
    let isEmail = false;
    let isUsername = false;

    resetMessages(["usernameError", "passwordError", "errorMessage"]);

    // First check if the format matches an email format
    if (username.includes("@")) {
        // Validate using the E-mail Regex.
        isEmail = validateName(username, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    } else {
        // Validate using the default name regex
        isUsername = validateName(username);
    }

    if ((isEmail || isUsername) && validateName(password, /^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$/)) {
        axios.get(domain + "/login", {
            params: { username, password, isEmail }
        })
        .then(function(response) {
            const userData = response.data;
            if (userData.message) {
                passMessageToElement("errorMessage", userData.message, "red", 1);
            } else {
                ['id', 'name', 'email', 'phone', 'first_name', 'last_name'].forEach(function(field) {
                    localStorage.setItem(field, userData[0][field]);
                });

                // Redirect to the homepage
                window.location.assign("./index.html");
            }
        })
        .catch(function(error) {
            passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
            console.error(error);
        });
    } else {
        const messageType = !isEmail && !isUsername ? "usernameError" : "passwordError";
        const message = !isEmail && !isUsername ? "Please enter a valid username / email" : "Please enter a valid password";
        passMessageToElement(messageType, message, "red", 1);
    }
}

// Function when the user clicks the button Sign up in the user registration page.
function signup() {
    // Get all relevant element values.
    const userInfo = {
        username: getValueOfElementById("username"),
        password: getValueOfElementById("password"),
        email: getValueOfElementById("email"),
        firstName: getValueOfElementById("fName"),
        lastName: getValueOfElementById("lName"),
        phone: getValueOfElementById("phone"),
    };

    // Reset all error messages.
    resetMessages(["usernameError", "passwordError", "emailError", "phoneError", "fNameError", "lNameError", "errorMessage"]);

    // Validate information
    if (!validateName(userInfo.username)) {
        return passMessageToElement("usernameError", "Please enter a valid username", "red", 1);
    }

    if (!validateName(userInfo.password, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))) {
        return passMessageToElement("passwordError", "Please enter a valid password", "red", 1);
    }

    if (!validateName(userInfo.email, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))) {
        return passMessageToElement("emailError", "Invalid email format", "red", 1);
    }

    if (!validatePhone(userInfo.phone)) {
        return passMessageToElement("phoneError", "Must be between 7 and 15 numbers", "red", 1);
    }

    if (!validateName(userInfo.firstName)) {
        return passMessageToElement("fNameError", "Must be between 2 and 50 chars", "red", 1);
    }

    if (!validateName(userInfo.lastName)) {
        return passMessageToElement("lNameError", "Must be between 2 and 50 chars", "red", 1);
    }

    // All validations passed, proceed with the signup
    axios.get(domain + "/signup", {
        params: userInfo
    })
    .then(function(response) {
        passMessageToElement("errorMessage", response.data.message, "green", 1);
    })
    .catch(function(error) {
        passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
    });
}


// My Profile, when the user clicks on their name in the navigation bar.
function profile(){
    const profileElements = ["username", "email","phone", "fName", "lName", "password"];
    const username = getElementById("username");
    const email = getElementById("email");    
    const firstName = getElementById("fName");
    const lastName = getElementById("lName");
    const phone = getElementById("phone");
    // Set 'disabled' HTML attribute true for the listed elements
    disableElements(profileElements);

    // Load values from the localStorage into the input fields after the page loads (window.location.assign)
    username.value =  localStorage.getItem("name");
    firstName.value = localStorage.getItem("first_name");
    email.value =  localStorage.getItem("email");
    phone.value = localStorage.getItem("phone");
    lastName.value = localStorage.getItem("last_name");
}
function activateField(fieldIndex){
    const profileElements = ["username", "email","phone", "fName", "lName", "password"];
    enableElement(profileElements[fieldIndex]);
}
// saves the profile information when the user clicks Save in My Profile page after changing some info about them.
function saveProfile(){
    const id = localStorage.getItem("id");
    // Get all relevant element values.
    const userInfo = {
        password: getValueOfElementById("password"),
        email: getValueOfElementById("email"),
        firstName: getValueOfElementById("fName"),
        lastName: getValueOfElementById("lName"),
        phone: getValueOfElementById("phone"),
    };
    var isPassword = false;
    if(userInfo.password != ""){
        if (!validateName(userInfo.password, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))) {
            return passMessageToElement("passwordError", "Please enter a valid password", "red", 1);
        }
        isPassword = true;
    }
    
    if (!validateName(userInfo.email, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))) {
        return passMessageToElement("emailError", "Invalid email format", "red", 1);
    }

    if (!validatePhone(userInfo.phone)) {
        return passMessageToElement("phoneError", "Must be between 7 and 15 numbers", "red", 1);
    }

    if (!validateName(userInfo.firstName)) {
        return passMessageToElement("fNameError", "Must be between 2 and 50 chars", "red", 1);
    }

    if (!validateName(userInfo.lastName)) {
        return passMessageToElement("lNameError", "Must be between 2 and 50 chars", "red", 1);
    }
    var parameters = {};
    if(isPassword){
        parameters = {
            id: id,
            password: userInfo.password,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone: userInfo.phone
        };
    }
    else
    {
        parameters = {
            id: id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone: userInfo.phone
        };
    }
    // All validations passed, proceed with the signup
    axios.get(domain + "/save", {
        params: parameters
    })
    .then(function(response) {
        localStorage.setItem("email", userInfo.email);
        localStorage.setItem("first_name", userInfo.firstName);
        localStorage.setItem("phone", userInfo.phone);
        localStorage.setItem("last_name", userInfo.lastName);
        window.location.assign("./user.html");
        passMessageToElement("errorMessage", response.data.message, "green", 1);
    })
    .catch(function(error) {
        passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
    });
    
}

function ShowAddresses(){
    const viewAddresses = getElementById("viewAddresses");
    const addresses_table = getElementById("addresses_table");
    const countryDropdown = getElementById("country");
    const cityDropdown = document.getElementById("city");
    // hide Show Addresses section.
    viewAddresses.style.display = "none";
    addresses_table.style.display = "block";
    // 3 cities per country, because...well....
    const countryCityData = {
        "Afghanistan": ["Kabul", "Kandahar", "Herat"],
        "Albania": ["Tirana", "Durrës", "Vlorë"],
        "Algeria": ["Algiers", "Oran", "Constantine"],
        "Andorra": ["Andorra la Vella", "Escaldes-Engordany"],
        "Argentina": ["Buenos Aires", "Córdoba", "Rosario"],
        "Australia": ["Sydney", "Melbourne", "Brisbane"],
        "Austria": ["Vienna", "Graz", "Salzburg"],
        "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília"],
        "Canada": ["Toronto", "Vancouver", "Montreal"],
        "China": ["Beijing", "Shanghai", "Guangzhou"],
        "Colombia": ["Bogotá", "Medellín", "Cali"],
        "Croatia": ["Zagreb", "Split", "Dubrovnik"],
        "Cuba": ["Havana", "Santiago de Cuba", "Camagüey"],
        "Denmark": ["Copenhagen", "Aarhus", "Odense"],
        "Egypt": ["Cairo", "Alexandria", "Giza"],
        "France": ["Paris", "Lyon", "Marseille"],
        "Germany": ["Berlin", "Munich", "Frankfurt"],
        "Greece": ["Athens", "Thessaloniki", "Patras"],
        "Hungary": ["Budapest", "Debrecen", "Szeged"],
        "India": ["Delhi", "Mumbai", "Bangalore"],
        "Indonesia": ["Jakarta", "Surabaya", "Bali"],
        "Ireland": ["Dublin", "Cork", "Limerick"],
        "Italy": ["Rome", "Milan", "Florence"],
        "Japan": ["Tokyo", "Osaka", "Kyoto"],
        "Kenya": ["Nairobi", "Mombasa", "Kisumu"],
        "Malaysia": ["Kuala Lumpur", "Penang", "Johor Bahru", "Selangor"],
        "Mexico": ["Mexico City", "Guadalajara", "Monterrey"],
        "Netherlands": ["Amsterdam", "Rotterdam", "Utrecht"],
        "New Zealand": ["Auckland", "Wellington", "Christchurch"],
        "Nigeria": ["Lagos", "Abuja", "Kano"],
        "Norway": ["Oslo", "Bergen", "Stavanger"],
        "Pakistan": ["Islamabad", "Karachi", "Lahore"],
        "Peru": ["Lima", "Cusco", "Arequipa"],
        "Philippines": ["Manila", "Cebu City", "Davao City"],
        "Poland": ["Warsaw", "Kraków", "Wrocław"],
        "Portugal": ["Lisbon", "Porto", "Braga"],
        "Romania": ["Bucharest", "Cluj-Napoca", "Timișoara"],
        "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk"],
        "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam"],
        "South Africa": ["Johannesburg", "Cape Town", "Durban"],
        "South Korea": ["Seoul", "Busan", "Incheon"],
        "Spain": ["Madrid", "Barcelona", "Valencia"],
        "Sweden": ["Stockholm", "Gothenburg", "Malmö"],
        "Switzerland": ["Zurich", "Geneva", "Bern"],
        "Taiwan": ["Taipei", "Kaohsiung", "Taichung"],
        "Thailand": ["Bangkok", "Chiang Mai", "Phuket"],
        "Turkey": ["Istanbul", "Ankara", "Izmir"],
        "Ukraine": ["Kyiv", "Lviv", "Odesa"],
        "United Kingdom": ["London", "Manchester", "Birmingham"],
        "United States": ["New York", "Los Angeles", "Chicago"],
        "Uruguay": ["Montevideo", "Salto", "Paysandú"],
        "Venezuela": ["Caracas", "Maracaibo", "Valencia"]
    };
    // loop through countries and add them to the dropdown list one by one...
    for (const country in countryCityData) {
        // Create a new option element
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
       
        countryDropdown.appendChild(option);
    }
    /*
        whenever the value of the Country dropdown menu changes, this function will get called,
        gets the new selected country, change the cities based on it
    */
    countryDropdown.addEventListener("change", function(){
        const selectedCountry = getValueOfElementById("country");
        cityDropdown.innerHTML = '<option value="" disabled selected>Select a city</option>';
        if (selectedCountry) {
            const cities = countryCityData[selectedCountry];
            cities.forEach(function(city) {
                const option = document.createElement("option");
                option.value = city; // set the value to the city's name
                option.textContent = city;
                cityDropdown.appendChild(option);
            });
            cityDropdown.disabled = false;
        }
        // Disable city dropdown menu if no country is selected.
        else cityDropdown.disabled = true;
    });

}