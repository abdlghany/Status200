
function getElementById(elementId){
    return document.getElementById(elementId);
}

function getValueOfElementById(elementId){
    return document.getElementById(elementId).value;
}
// default regex accepts letters and spaces only.
function validateName(name, regex = new RegExp('^[a-zA-Z]+(?:[ ][a-zA-Z]+)*$')){
    //remove extra empty spaces (even between words) (\s finds whitespace characters) and replcae replaces them with nothing. '/g/ finds all that match
    name = String(name).replace(/\s+/g, '');
    // Regular expression to match any alphabetical letters combo, capital or small, then (space or) then any alphabetical letters combo...making sure it doesn't end with
    //anything other than the specified characters using $, reference https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    if(!name && name != ""){
       return false
    }
    else if(name.length < 2){
        return false
    }
    else if(name.length > 50){
        return false;
    }
    else if(!regex.test(name)){
         return false
    }
    else{
        return true;
    }
}


function validatePhone(stringToValidate){
    if(stringToValidate != "" && stringToValidate.length <= 15 && !isNaN(stringToValidate) && stringToValidate.length > 7){
        return true
    }
    else return false
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