const navigationBar = getElementById("navigationBar");
const categories = getElementById("categories");
const domain = "http://ripoff.local:3000";
// 1-2 cities per state...
const stateCityData = {
    "Johor": ["Johor Bahru", "Muar"],
    "Kedah": ["Alor Setar", "Sungai Petani"],
    "Kelantan": ["Kota Bharu", "Kuala Krai"],
    "Melacca": ["Melaka City", "Alor Gajah"],
    "Negeri Sembilan": ["Seremban", "Port Dickson"],
    "Pahang": ["Kuantan", "Temerloh"],
    "Perak": ["Ipoh", "Taiping"],
    "Perlis": ["Kangar", "Arau"],
    "Sabah": ["Kota Kinabalu", "Sandakan"],
    "Sarawak": ["Kuching", "Miri"],
    "Selangor": ["Shah Alam", "Petaling Jaya"],
    "Terengganu": ["Kuala Terengganu", "Dungun"],
    "Kuala Lumpur": ["Kuala Lumpur City Centre", "Setapak"]
};
// Same thing for states.
const countryStateData = {
   "Malaysia":["Johor", "Kedah", "Kelantan", "Melacca", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur"]
};

/*
    to avoid having the navigation bar rewritten in every single HTML page, I've created a function that loads it when the HTML page Body finishes loading.
    &nbsp; = empty space.
*/

//listen to the page reload then display the errorMessage (if any.)
window.addEventListener("load", function() {
    //Loads navigation bar to pages anytime a page loads.
    loadNavigationBar();
    const message = localStorage.getItem("message");
    const messageColor = localStorage.getItem("messageColor");

    if (message) {
        passMessageToElement("errorMessage", message, messageColor, 1);
        //clear the message from localStorage after displaying it
        localStorage.removeItem("message");
        localStorage.removeItem("messageColor");
    }
    // if the user manages to reach the login page when they're already logged in, take them to the main page.
    if(this.window.location.href.includes("login.html") && this.localStorage.getItem("id")){
        this.window.location.assign("./index.html");
    }
   
});

function loadNavigationBar(){
    var navigationBarContents =
        '<ul class="nav-ul">'+
            '<div id="logoDiv" title="Home Page">'+
                '<li class="nav-li"><a href="./index.html"><img src="./img/ripoffLogo.png" alt="Ripoff Logo"></a></li>'+
               '<li class="nav-li"><a href="./index.html">Ripoff</a></li>'+
           '</div>'+
           '<div id="searchDiv">'+
               '<li class="nav-li"><input id="navigationSearch" type="text" placeholder="Search all products..."></li>'+
               '<li class="nav-li"><a href="javascript:search();" title="Search"><img src="./img/search.png" alt="Search Button" id="searchButton"></a></li>'+
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
        //run logKey Function whenever a "keydown" event happens to the search field.
        getElementById("navigationSearch").addEventListener("keydown", logKey);
    }
/* 
    Get categories from the database and display them in the index page using loadMainMenu().
*/
// return data from the server based on the urlExtension passed for example (./products?category_id=9) will return products that are in the specified category_id
function axiosQuery(urlExtension, callback){
    axios.get(domain + urlExtension )
            .then(function(response) {
                callback(response)
            })
            .catch(function(error) {
                console.error("Error fetching data from the server:", error);
            });
}

function loadMainMenu(){
    axiosQuery("/index", function(response){
        const responseCategories = response.data;
        responseCategories.forEach(function(category){
            const div = document.createElement("div");
            div.innerHTML = '<img src="'+category.category_image+'" alt="'+category.category_name+' Image">'+'<a>'+category.category_name+'</a>';
            div.id = "category";
            div.style.cursor = "pointer";
            div.title = "Shop for "+category.category_name;
            div.onclick = function() {
                // Display the selected category's products in another page, for example: ripoff.local/products.html?category=1
                window.location.assign("./products.html?category="+category.category_id);
            };
            categories.appendChild(div);
        });
    });
}
// On Enter keydown (when the user is typing in the searh input), run the search() function.
function logKey(e) {
    if(e.code === "Enter"){
        search();
    }
  }
//When the search button in the navigation bar is clicked or Enter key is clicked in the search input.
function search(){
    const searchValue = getValueOfElementById("navigationSearch");
    //There's no else because we don't want the browser to do anything if there's nothing in the search bar.
    if(searchValue && searchValue!= ""){
        window.location.assign("./products.html?search="+searchValue);
    }
}
// When the cart is clicked.
function cart(){
    // check if user is logged in then open the cart.
    if(localStorage.getItem("id")){
        window.location.assign("./cart.html")
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
const profileElements = ["username", "email","phone", "fName", "lName", "password", "oldPassword"];
function profile(){
    const username = getElementById("username");
    const email = getElementById("email");    
    const firstName = getElementById("fName");
    const lastName = getElementById("lName");
    const phone = getElementById("phone");
    // Set 'disabled' HTML attribute true for the listed elements
    disableElements(profileElements);

    // Load values from the localStorage into the input fields after the page loads (window.location.assign)
    username.innerText =  localStorage.getItem("name");
    firstName.value = localStorage.getItem("first_name");
    email.value =  localStorage.getItem("email");
    phone.value = localStorage.getItem("phone");
    lastName.value = localStorage.getItem("last_name");
}
// this function is being called from the HTML, which is why it has the variables again.
function activateField(fieldIndex){
    enableElement(profileElements[fieldIndex]);
    console.log("change"+fieldIndex);
    disableElement("change"+fieldIndex);
    console.log("change"+fieldIndex);
}
// saves the profile information when the user clicks Save in My Profile page after changing some info about them.
function saveProfile(){
    const id = localStorage.getItem("id");
    // Get all relevant element values.
    const userInfo = {
        password: getValueOfElementById("password"),
        oldPassword: getValueOfElementById("oldPassword"),
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
        if (!validateName(userInfo.oldPassword, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))) {
            return passMessageToElement("oldPasswordError", "Please enter a valid password", "red", 1);
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
            oldPassword:userInfo.oldPassword,
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
        //set the message before reloading the page..
        localStorage.setItem("message", response.data.message);
        localStorage.setItem("messageColor", "green");
        //reload the page
        window.location.assign("./user.html");
    })
    .catch(function(error) {
        passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
    });    
}
// Load <select> options in each of the select elements
function addAddressLoaded(){
    const countryDropdown = getElementById("country");
    const cityDropdown = getElementById("city");
    const stateDropdown = getElementById("state");

    // loop through countries and add them to the dropdown list one by one...
    for (const country in countryStateData) {
        // Create a new option element
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryDropdown.appendChild(option);
    }
    /*  whenever the value of the Country dropdown menu changes, this function will get called,
        gets the new selected country, change the states based on it.   */
    countryDropdown.addEventListener("change", function() {
        populateDropdownMenu(stateDropdown, countryDropdown.value, countryStateData, "state");
    });
    /*  whenever the value of the State dropdown menu changes, this function will get called,
        gets the new selected State, then change the cities based on it.    */
    stateDropdown.addEventListener("change", function() {
        populateDropdownMenu(cityDropdown, stateDropdown.value, stateCityData, "city");
    });
}
function ShowAddresses(){
    const viewAddresses = getElementById("viewAddresses");
    const addresses_profile_body = getElementById("addresses_profile_body");
    fetchAddresses(function(response){
        if(response){
            // hide "Show Addresses section" if callback was called.
            viewAddresses.style.display = "none";
            addresses_profile_body.style.display = "block";
        }
    });
}

function populateDropdownMenu(dropdownMenuToFill, valueChanged, dictionary, nameOfCreatedSelection){
    dropdownMenuToFill.innerHTML = '<option value="" disabled selected>Select a '+nameOfCreatedSelection+'</option>';
        if (valueChanged) {
            const elements = dictionary[valueChanged];
            elements.forEach(function(element) {
                const option = document.createElement("option");
                option.value = element; // set the value to the name of the element (city, state, nameOfCreatedSelection, etc...)
                option.textContent = element;
                dropdownMenuToFill.appendChild(option);
            });
            dropdownMenuToFill.disabled = false;
        }
        // Disable dropdown menu if no value is selected from the element selectionChangedId.
        else dropdownMenuToFill.disabled = true;  
}

function addAddress(){
    /* 
        HTML Input/Select IDs: address_label, street, country, state, city, zipcode
     */
    const addressInfo = {
        address_label: getValueOfElementById("address_label"),
        street: getValueOfElementById("street"),
        country: getValueOfElementById("country"),
        state: getValueOfElementById("state"),
        city: getValueOfElementById("city"),
        zipcode: getValueOfElementById("zipcode"),
    };
    //empty error messages 
    resetMessages(["address_labelError", "streetError", "countryError", "stateError", "cityError", "zipcodeError", "errorMessage"]);
        // Validate information, allow letters spaces and numbers only
    if (!validateName(addressInfo.address_label, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))) {
        return passMessageToElement("address_labelError", "Please enter a valid address label", "red", 1);
    }
    //Letters spaces numbers -,. only REGEX expression
    if (!validateName(addressInfo.street, new RegExp('^[a-zA-Z0-9]+(?:[-,. ][a-zA-Z0-9]+)*$'))) {
        return passMessageToElement("streetError", "Please enter a valid street name", "red", 1);
    }

    if (!addressInfo.country) {
        return passMessageToElement("countryError", "Please select a country", "red", 1);
    }

    if (!addressInfo.state) {
        return passMessageToElement("stateError", "Please select a state", "red", 1);
    }

    if (!addressInfo.city) {
        return passMessageToElement("cityError", "Please select a city", "red", 1);
    }
    //Zip code must have 5 numbers.
    if (addressInfo.zipcode.length != 5 || isNaN(addressInfo.zipcode) || !addressInfo.zipcode) {
        return passMessageToElement("zipcodeError", "Must contain 5 numbers", "red", 1);
    }
    
    // All validations passed, proceed with adding the address
    const parameters = {
        id: localStorage.getItem("id"),
        address_label: addressInfo.address_label,
        street:addressInfo.street,
        country: addressInfo.country,
        state: addressInfo.state,
        city: addressInfo.city,
        zipcode: addressInfo.zipcode
    };
    // if there's a localStorage address_id value that means the function is being called from editAddress.html page and the user is editing an existing address.
    if(localStorage.getItem('address_id')){
        parameters.address_id = localStorage.getItem('address_id');
    }
    axios.get(domain + "/addaddress", {
        params: parameters
    })
    .then(function(response) {
        //set the message before reloading the page..
        localStorage.setItem("message", response.data.message);
        localStorage.setItem("messageColor", "green");
        //reload the page
        if(localStorage.getItem('address_id')){
            localStorage.removeItem('address_id');
        }
        window.location.assign("./user.html");
    })
    .catch(function(error) {
        passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
    });    
}

function fetchAddresses(callback) {
    const parameters = { id: localStorage.getItem("id") };
    axios.get(domain + "/fetchAddresses", { params: parameters })
        .then(function (response) {
            if (response.data.message) {
                passMessageToElement("errorMessage", response.data.message, "red", 1);
                return;
            }
            const addresses = response.data;
            const addressesProfileBody = getElementById("addresses_profile_body");

            addresses.forEach(function (address) {
                const addressRows = [
                    { label: "Street", value: address.street },
                    { label: "City", value: address.city },
                    { label: "State", value: address.state },
                    { label: "Country", value: address.country },
                    { label: "Zipcode", value: address.zip_code }
                ];
                const table = document.createElement('table');
                // Disaply table header, which is the address label (Work, Home...etc.)
                const tableHeader = document.createElement('tr');
                tableHeader.innerHTML = "<label><b>"+address.label+"</b></label>";
                table.appendChild(tableHeader);

                addressRows.forEach(function (row) {
                    const tr = document.createElement('tr');
                    const labelTd = document.createElement('td');
                    const valueTd = document.createElement('td');
                    labelTd.innerHTML = `<label>${row.label}</label>`;
                    valueTd.innerHTML = `<label>${row.value}</label>`;
                    tr.appendChild(labelTd);
                    tr.appendChild(valueTd);
                    table.appendChild(tr);
                });
                // Add delete and edit buttons to each address.
                const updateRow = document.createElement('tr');
                const updateData1 = document.createElement('td');
                const updateData2 = document.createElement('td');
                //Pass the address id to the functions in order to determine which address 'Anchor' the user clicked.
                updateData1.innerHTML = "<label><a href='javascript:deleteAddress("+address.address_id+");'>Delete</a></label>";
                updateData2.innerHTML = "<label><a href='javascript:editAddress("+address.address_id+");'>Edit</a></label>";
                updateRow.appendChild(updateData1);
                updateRow.appendChild(updateData2);
                table.appendChild(updateRow);
                addressesProfileBody.appendChild(table);
                // add a horizontal rule only if it's not the last address, to seperate addresses.
                if(address != addresses[addresses.length-1]){
                    const hr = document.createElement('hr');
                    hr.style.width = "80%";
                    addressesProfileBody.appendChild(hr);
                } 
            });

            callback(true);
        })
        .catch(function (error) {
            passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
        });
}

function editAddress(address_id){
    localStorage.setItem("address_id", address_id);
    window.location.assign("./editaddress.html");
}

function editAddressLoaded(){
    // get all relevant elements from the HTML page
    const addressInfo = {
     address_label: getElementById("address_label"),
     street: getElementById("street"),
     country: getElementById("country"),
     state: getElementById("state"),
     city: getElementById("city"),
     zip_code: getElementById("zipcode"),
    };
     // loop through countries and add them to the dropdown list one by one...
     for (const country in countryStateData) {
        // Create a new option element
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        addressInfo.country.appendChild(option);
    }
    const parameters = {
        id: localStorage.getItem('id'),
        address_id: localStorage.getItem('address_id')
    };
    axios.get(domain + "/fetchAddress", {
        params: parameters
    })
    .then(function(response) {
        const dataFromDB = response.data[0];
        // set the values of the input/select elements in the page to their current values in the database.
        addressInfo.address_label.value = dataFromDB.label;
        addressInfo.street.value = dataFromDB.street;
        addressInfo.country.value = dataFromDB.country;
        //Simulate an onChange event, because the value changed in the line above this one.
        populateDropdownMenu(addressInfo.state, addressInfo.country.value, countryStateData, "state");
        addressInfo.state.value = dataFromDB.state;
        populateDropdownMenu(addressInfo.city, addressInfo.state.value, stateCityData, "city");
        addressInfo.city.value = dataFromDB.city;
        addressInfo.zip_code.value = dataFromDB.zip_code;
       
        addressInfo.country.addEventListener("change", function() {
            populateDropdownMenu(addressInfo.state, addressInfo.country.value, countryStateData, "state");
        });
       
        addressInfo.state.addEventListener("change", function() {
            populateDropdownMenu(addressInfo.city, addressInfo.state.value, stateCityData, "city");
        });
    })
    .catch(function(error) {
        passMessageToElement("errorMessage", "An error happened while connecting to the server.", "red", 1);
    });   
}

function deleteAddress(address_id){
    const parameters = { id: localStorage.getItem("id"),
        address_id: address_id
     };
     axios.get(domain + "/deleteAddress", { params: parameters })
     .then(function(response) {
        //set the message before reloading the page..(for example, address removed successfully)
        localStorage.setItem("message", response.data.message);
        localStorage.setItem("messageColor", "green");
        //reload the page
        window.location.assign("./user.html");
    })
    .catch(function(error) {
        passMessageToElement("errorMessage", "Error happened while connecting to the server.", "red", 1);
    });    
}

function sendCode(){
    // ids: email (input), code (input), newpassword (input), sendCodeButton (button)
    const email = getElementById('email');
    const code = getElementById('code');
    const newPassword = getElementById('newPassword');
    const sendCodeButton = getElementById('sendCodeButton');
    // Empty all messages before running the code
    resetMessages(["emailError", "codeError", "errorMessage", "passwordError"]);
    // Validate email
    if (!validateName(email.value, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))) {
        return passMessageToElement("emailError", "Invalid email format", "red", 1);
    }
    // if the email is correct, we send a code request to the server, the server should check the email against the existing emails in the database
    // then send the code if the email is correct, otherwise, display an error message.
    axiosQuery("/resetPassword?email="+email.value, function(response){
        if(response.data.message == "Email exists"){
            passMessageToElement("codeError", "Code sent, expires in 10 minutes", "green", 1);
            passMessageToElement("errorMessage", "Please enter the code and your new password then click 'Submit'", "gray", 1);
            code.disabled= false;
            newPassword.disabled = false;
            email.disabled = true;
            // make the button a submit button and change its onclick event
            sendCodeButton.innerHTML = "Submit"
            sendCodeButton.onclick = function() {
                verifyCode();
            };
        }
        else{
            passMessageToElement("emailError", "Email doesn't exist", "red", 1);
        }
    });
}

function verifyCode(){
    const email = getValueOfElementById('email').trim();
    const code = getValueOfElementById('code').trim();
    const newPassword = getValueOfElementById('newPassword').trim();
    resetMessages(["emailError", "codeError", "errorMessage", "passwordError"]);

    // Validate email again in case the user tries to be funny and change their email somehow even tho the email field is disabled.
    if (!validateName(email, new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))) {
        return passMessageToElement("emailError", "Nice try changing the email format", "red", 1);
    }
    //Code  code must have 6 numbers.
    if (code.length != 6 || isNaN(code) || !code) {
        return passMessageToElement("codeError", "Must be 6 numbers", "red", 1);
    }
    if (!validateName(newPassword, new RegExp('^[a-zA-Z0-9]+(?:[ ][a-zA-Z0-9]+)*$'))) {
        return passMessageToElement("passwordError", "Please enter a valid password", "red", 1);
    }
    // if the user input passes all validations, then it's time to request the password change from the server
    const urlExtension = "/submitResetPassword?email="+email+"&code="+code+"&newPassword="+newPassword;
    axiosQuery(urlExtension, function(response){
        if(response.data.message == "Email does not exist"){
            passMessageToElement("emailError", "How did you manage to change the email?", "red", 1);
        }
        else if(response.data.message == "Wrong code"){
            passMessageToElement("codeError", "Please verify that the code is correct", "red", 1);
        }
        else if(response.data.message == "code expired"){
            passMessageToElement("errorMessage", "Code has expired, please refresh the page and try again.", "red", 1);
        }
        else if(response.data.message == "password changed successfully"){
            passMessageToElement("errorMessage", "Password has been changed, please <a href='./login.html'>login using the new password</a>", "green", 1);
        }
    });
}