/**
 *
 *  These validation function return
 *
 *  - empty string if the input is valid
 *  - error message if the input is invalid
 */

function nameValidator(name, fieldName) {
    // Check if the name is empty
    if (name == "") {
        return "Please enter your " + fieldName + "<br>";
    }
    // Check if the name contains only letters and spaces
    if (name.match(/[^a-zA-Z ]/)) {
        return fieldName + " can only contain letters and spaces.<br>";
    }
    // Check if the name contains at least 2 letters
    if (name.replace(/ /g, "").length < 2) {
        return fieldName + " must contain at least 2 letters.<br>";
    }
    // If the name is valid, return an empty string
    return "";
}

function numberValidator(value, min, max, string) {
    // Check if the value is empty
    if (value == 0) {
        return "Please enter your " + string + ".<br>";
    }
    // Check if the value is a number
    if (isNaN(value)) {
        return string + " must be a number.<br>";
    }
    // Check if the value is greater than min provided as parameter
    if (value < min) {
        return string + " must be greater than " + min + ".<br>";
    }
    // Check if the value is smaller than max provided as parameter
    if (value > max) {
        return string + " must be smaller than " + max + ".<br>";
    }
    // If the value is valid, return an empty string
    return "";
}

function emptyError(fieldName) {
    // Set the error message to an empty string
    // For an element with the id fieldName
    document.getElementById(fieldName).innerText = "";
}
