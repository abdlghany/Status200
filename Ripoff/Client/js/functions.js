/* 
    A collection of reusable functions.
*/
function getElementById(elementId){
    return document.getElementById(elementId);
}

function getValueOfElementById(elementId){
    return document.getElementById(elementId).value;
}
/* 
    default regex accepts letters and spaces only. 
    (Examples of acceptable usernames: "aaaaa aaaa aaaaaa aaa", "abhdabsdhmdaks", " ") a         b          c
 */
function validateName(name, regex = new RegExp('^[a-zA-Z]+(?:[ ][a-zA-Z]+)*$')){
    //remove extra empty spaces (even between words) (\s finds whitespace characters) and replcae replaces them with nothing. '/g/ finds all that match
    name = String(name).replace(/\s+/g, '');
    name = name.trim();
    /*   
        Regular expression to match any alphabetical letters combo, capital or small, then (space or) then any alphabetical letters combo...
        making sure it doesn't end withanything ot her than the specified characters using $
        reference https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    */
    return name.length > 1 && name.length <= 50 && regex.test(name);
   // returns true or false.
}

function validatePhone(stringToValidate) {
    return stringToValidate.length >= 7 && stringToValidate.length <= 15 && !isNaN(stringToValidate);
} 

// passes a message to the element. default values are default hex color value for messages #E0E0E0, and 0 opacity (hidden message)
function passMessageToElement (elementID, message, color = "#E0E0E0", opacity = 0){
    const element = getElementById(elementID);
    element.innerHTML = message;
    element.style.color = color;
    element.style.opacity = opacity;
    return null;
}

function resetMessages(messageFields){
    //reset all message fields using a foreach loop to loop through them all.
    messageFields.forEach(function(field){
    passMessageToElement(field, ""); // run with default values.
    });
}

function disableElements(elementsIds){
    elementsIds.forEach(function(elementId){
        getElementById(elementId).disabled = true;
    });
}
function disableElement(elementId){
    if(getElementById(elementId)){
        getElementById(elementId).style.display = "none";
    }
    
}
function enableElement(elementId){
    getElementById(elementId).disabled = false;
    getElementById(elementId).focus();
}
// Increase or decrease the number of variations in a product quantity input field (before/after bineg added to cart)
function changeProductCount(change, elementId, max){
    // if change == 0 decrease, otherwise increase // 1
    const inputField = getElementById(elementId);
    // input "type = Number"  that has a default value of '0' so it doesn't require any further validation.
    var inputFieldValue = parseInt(inputField.value);
    if(change == 0){
        if(inputFieldValue > 0){
            inputFieldValue -= 1;
        }  
    }
    else if(inputFieldValue >= max){
        // do no increase anymore, assign the max instead
        inputFieldValue = max;
    }
    else{
        // 
        inputFieldValue += 1;
    }
    inputField.value = inputFieldValue;
}
 // Shows notification messages in front of other content, for a duration of time.
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message; 
    toast.className = "show"; // display the toast by adding the "show" class
    setTimeout(function(){
        toast.className = toast.className.replace("show", ""); // Remove the "show" class after 2 seconds
    }, 3000); // 3 seconds
}

// return query parameter value.
function getQueryParam(parameter) {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter);
}

function formatNumber(num) {
    // Ensure the number has two decimal points
    let formattedNumber = num.toFixed(2);
    /*  12,987,520.00
        Add thousands separators
        \B matches a position that is not a word boundary
        (?=(\d{3})+(?!\d)) is a positive lookahead to find positions followed by groups of three digits.
        /g ensures that every 3 numbers, there's a separator.
    */
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber;
}
// return data from the server based on the urlExtension passed for example 
// (./products?category_id=9) will return products that are in the specified category_id
function axiosQuery(urlExtension, callback){
    axios.get(domain + urlExtension )
            .then(function(response) {
                callback(response)
            })
            .catch(function(error) {
                console.error("Error fetching data from the server:", error);
            });
}