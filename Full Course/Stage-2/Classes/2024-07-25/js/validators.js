/**
 *
 *  These validation function return false if the value is valid
 *  and a error description if it is not
 *
 */

function validateName(string, fieldDescription) {
    // Trim any trailing or leading spaces in the string
    string = string.trim();

    // Check if the string is empty
    if (string === "") {
        return fieldDescription + " must contain at least one character.";
    }

    // ADVANCED - Don't loose time on trying to understand this.
    // It checks if the string contains any special characters
    // that are not letters or spaces.
    if (string.match(/[^a-zA-Z ]/)) {
        return fieldDescription + " can only contain letters and spaces.";
    }

    // A name must be at least 2 characters long (spaces not included)
    if (string.replace(/ /g, "").length < 2) {
        return fieldDescription + " must contain at least 2 letters.";
    }

    // All seems fine
    return false;
}

function validateInteger(numberToVerify, minValue, maxValue, fieldDescription) {
    // Convert the value to a number
    numberToVerify = parseInt(numberToVerify);

    // Check if the value is a number
    if (isNaN(numberToVerify)) {
        return fieldDescription + " must be a number.";
    }

    // Check if the value is smaller than the minimum value
    if (numberToVerify < minValue) {
        return fieldDescription + "  must be greater than " + minValue + ".";
    }

    // Check if the value is greater than the maximum value
    if (numberToVerify > maxValue) {
        return fieldDescription + " must be smaller than " + maxValue + ".";
    }

    // All seems fine
    return false;
}
