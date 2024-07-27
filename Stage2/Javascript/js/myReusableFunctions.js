function decimalRounder(value, decimals){
    //10 to the power of the number the user passed to this function to define how many decimal numbers we return
    var powerOf = Math.pow(10, decimals);
    //using the method 'round' after multiplying by 10
    //then dividing by 10 to get our number back with 1 decimal point (the round will round the number to the nearest integer) Ex. round(0.55 * 10)
    // = 5, then we divide by 10, we get 0.5
    return Math.round(value * powerOf) / powerOf;
}
/* function to change an element's inner HTML */
function passMessageToElement (elementID, message){
    document.getElementById(elementID).innerHTML = message;
    return null
}
/* function to get the value of an elemeny by ID */
function getValueOfElement(ElementID){
    elementValue = document.getElementById(ElementID).value;
    return elementValue;
}
//a Function to toggle the theme (black, white) ;
function switchTheme(){
    document.getElementById("mainBody").classList.toggle("darkTheme");
}
//function that checks if the value is between 2 numbers
function isValueBetween(value, x, y) {
    return (value > Math.min(x, y) && value < Math.max(x, y));
}
//function that returns a message with the bmi classification
function bmiClassification(name, bmi, weightUnit, heightUnit){
    var classification = "";
    if(bmi < 18.5){
        classification = "red\">underweight";
    }
    else if(bmi < 25){
        classification = "green\">normal</span>";
    }
    else if(bmi < 30){
        classification =  "orange\">overweight</span>";
    }
    else{
        classification = "red\">obese</span>";
    }
    return "Dear "+name+", Your BMI is: <b>"+ bmi +weightUnit+"/"+heightUnit+"<sup>2</sup></b> " + "<br/>Your BMI shows that you're <b><span style=\"color:" + classification + "</span>.</b>";
}
//a function that changes units based on user selection
function changeUnits(selectedUnit, labelId, inputName){
    //default value
    var unit = "unit";
    if(labelId.includes("height")){
        unit = "height";
    }
    else if(labelId.includes("weight")){
        unit= "weight";
    }
    //get the currently selected unit whenever the user changes their selection.
    var message = "Enter your "+unit+" ("+selectedUnit+")<span class=\"red\">*</span>";
    passMessageToElement(labelId, message);
    //change the input's placeholder based on the current selected unit.
    document.getElementsByName(inputName)[0].placeholder= selectedUnit;
    return selectedUnit;
}
function validateName(name){
        //remove extra empty spaces between the words (\s finds whitespace characters) and replcae replaces them with nothing. '/g/ finds all that match
        name = name.replace(/\s+/g, '');
        // Regular expression to match any alphabetical letter, capital or small, then (space or ' or -) and so on...making sure it doesn't end with
         //anything other than the specified characters using $, reference https://www.w3schools.com/jsref/jsref_obj_regexp.asp
         var regex = /^[a-zA-Zا-ي]+(?:[ ][a-zA-Zا-ي]+)*$/;
         if(!regex.test(name) || name.length < 2 || name.length > 100){
             return true;
         }else{
            return false;
         }
}
function resetMessages(){
    const messageFields = ["nameMessage","heightMessage","weightMessage","messageP", "decimalMessage"]
    //reset all message fields.
    messageFields.forEach(function(field){
    passMessageToElement(field, "");
    document.getElementById(field).style.display = "none";
    });
}

function toggleMessagefield(messageField) {
    var field = document.getElementById(messageField);
    if (field.innerHTML.trim() !== "") {
        field.style.display = "block";
    } else {
        field.style.display = "none";
    }
}

function formatNumberWithDecimals(number, decimals) {
    //convert the number to string then split the number where there's a decimal point.
    var parts = number.toString().split(".");
    //integer part is the part that's before the decimal point.
    var integerPart = parts[0];
    //after the decimal point, second element of the array.
    var fractionalPart = parts[1] || "";
    //add a 0 for every missing decimal.
    while (fractionalPart.length < decimals) {
        fractionalPart += "0";
    }
    // if it's 0, return integer only, if it's not 0, return int + fractional
    if(decimals != 0){
    return integerPart + "." + fractionalPart;
    }
    else{
        return integerPart;
    }
}