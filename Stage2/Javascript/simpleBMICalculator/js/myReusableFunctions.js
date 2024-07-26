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
function isValueBetween(value, x ,y){
    if (value > x && value < y){
        return true;
    }
    else if (value < x && value > y){
        return true;
    }
    else {
        return false;
    }
}
//function that returns a message with the bmi classification
function bmiClassification(name, bmi, weightUnit, heightUnit){
    var classification = "";
    if(bmi < 18.5){
        classification = "underweight";
    }
    else if(bmi < 25){
        classification = "normal";
    }
    else if(bmi < 30){
        classification = "overweight";
    }
    else{
        classification = "obese";
    }
    return "Dear "+name+", Your BMI is: <b>"+ bmi +weightUnit+"/"+heightUnit+"<sup>2</sup></b> " + "<br/>Your BMI shows that you're <b>" + classification + "</b>";
}
//a function that changes units based on user selection
function changeUnits(selectedUnit){
    //get the currently selected unit whenever the user changes their selection.
    var message = "";
    if(selectedUnit == "inch"){
        message = "Enter your height ("+selectedUnit+")<span class=\"red\">*</span>";
    }else if(selectedUnit =="cm"){
        message = "Enter your height ("+selectedUnit+")<span class=\"red\">*</span>";
    }else{
        //default value.
        selectedUnit ="cm";
        message = "Enter your height (cm)(default)<span class=\"red\">*</span>";
       
    }
    passMessageToElement("heightLabel", message);
    return selectedUnit;
}

function validateName(name){
     // Regular expression to match any alphabetical letter, capital or small, then (space or ' or -) and so on...making sure it doesn't end with
         //anything other than the specified characters using $, reference https://www.w3schools.com/jsref/jsref_obj_regexp.asp
         var regex = /^[a-zA-Zا-ي]+(?:[' -][a-zA-Zا-ي]+)*$/;
         if(!regex.test(name) || name.length < 2 || name.length > 100){
             return true;
         }else{
            return false;
         }
}