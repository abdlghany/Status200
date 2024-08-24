const doc = require("pdfkit");

function getElementById(elementId){
    return document.getElementById(elementId);
}

function getValueOfElementById(elementId){
    return document.getElementById(elementId).value;
}

function validateName(name){
    //remove extra empty spaces (even between words) (\s finds whitespace characters) and replcae replaces them with nothing. '/g/ finds all that match
    name = name.replace(/\s+/g, '');
    // Regular expression to match any alphabetical letters combo, capital or small, then (space or) then any alphabetical letters combo...making sure it doesn't end with
     //anything other than the specified characters using $, reference https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    var regex = /^[a-zA-Z]+(?:[ ][a-zA-Z]+)*$/;
    
    if(name.length < 2){
        return "Name can't have less than 2 characters."
    }
    else if(name.length > 50){
        return "Name can't have more than 50 characters.";
    }
    else if(!regex.test(name)){
         return "Please insert a valid name!<br>Only letters and spaces are allowed"
    }
    else{
        return false;
    }
}

// passes a message to the element.
function passMessageToElement (elementID, message="", color = ""){
    document.getElementById(elementID).innerHTML = message;
    document.getElementById(elementID).style.color = color;
    return null;
}