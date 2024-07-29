var selectedHeightUnit = "cm";
var selectedWeightUnit = "kg";
var message = "";
var decimal = 1;

function calculateBMI(){
    selectedHeightUnit = changeUnits(getValueOfElement("heightUnit"), "heightLabel", "height");
    selectedWeightUnit = changeUnits(getValueOfElement("weightUnit"), "weightLabel", "weight");
    //variable declaration
    var weightHelperMessage = "";
    var heightHelperMessage = "";
    var name = getValueOfElement("name").trim();
    var weight = getValueOfElement("weight")*1;
    var height = getValueOfElement("height")*1;
    var bmi = 0;
    var messageField = "";

    if (selectedWeightUnit == "pound") {
        weightHelperMessage = "2 to 330 pounds";
        weight /= 2.2;
    }else{
        weightHelperMessage = "1 to 150 kgs";
    }
    if (selectedHeightUnit == "inch") {
        heightHelperMessage = "16 to 100 Inches";
    }
    else{
        heightHelperMessage = "40 to 250 cm";
        }
    passMessageToElement("weightHelper",weightHelperMessage);
    passMessageToElement("heightHelper",heightHelperMessage);
    decimalChanged();
    resetMessages(["nameMessage","heightMessage","weightMessage","messageP", "decimalMessage"]);

    if (name) {
        nameback = validateName(name);
        if (nameback != "") {
            messageField = "nameMessage";
            message = nameback;
        } else if (!weight) {
            messageField = "weightMessage";
            message = "Weight field is required!<br>Cannot be 0 or contain spaces";
        } else {
            // Check if the weight is valid (in kg)
            if (!isValueBetween(weight, 0.9, 150.1)) {
                messageField = "weightMessage";
                if(selectedWeightUnit == "pound"){
                    message = "Please insert a valid weight!<br>Between 2 pounds and 330 pounds."; 
                }
                else{
                    message = "Please insert a valid weight!<br>Between 1kg and 150kg.";    
                    }
            }
             else if (!height) {
                messageField = "heightMessage";
                message = "Height field is required!<br>Cannot be 0 or contain spaces";
            } else {
                if (isValueBetween(decimal, -1, 10)) {
                    if (selectedHeightUnit == "inch") {
                        // Check if the height is valid in inches
                        if (!isValueBetween(height, 15.9, 100.1)) {
                            messageField = "heightMessage";
                            message = "Please insert a valid height!<br>Between 16 Inches and 100 Inches.";
                        } else {
                            // Convert height from inches to meters
                            height = height * 2.54 / 100;
                            bmi = formatNumberWithDecimals(decimalRounder(weight / Math.pow(height, 2), decimal),decimal);
                            message = bmiClassification(name, bmi, "kg", "m");
                            messageField = "messageP";
                        }
                    } else {
                        // Check if the height is valid in cm
                        if (!isValueBetween(height, 39.9, 250.1)) {
                            messageField = "heightMessage";
                            message = "Please insert a valid height!<br>Between 40cm and 250cm.";
                        } else {
                            // Convert height from cm to meters
                            height = height / 100;
                            bmi = formatNumberWithDecimals(decimalRounder(weight / Math.pow(height, 2), decimal),decimal);
                            message = bmiClassification(name, bmi, "kg", "m");
                            messageField = "messageP";
                        }
                    }
                } else {
                    messageField = "decimalMessage";
                    message = "Please insert a valid decimal.<br>Between 0 and 9";
                }
            }
        }
    } else {
        messageField = "nameMessage";
        message = "Name field is required!";
    }
    passMessageToElement(messageField, message);
    toggleMessagefield(messageField);
    return false;
}

function decimalChanged(){
    decimal = getValueOfElement("decimal")*1;
    try {
        decimal = parseInt(decimal);
    } catch (error) {

    }
    if (decimal && decimal != 0) {
        // Do nothing because the user has changed the default value and it's not invalid or null or 0.
    } else if (decimal == 0) {
        // Do nothing.
    } else {
        // Default to 1 if nothing exists instead of giving the user an error.
        decimal = 1;      
    }
}