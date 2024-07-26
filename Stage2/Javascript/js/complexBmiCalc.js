//setting default units to cm and kg.
var selectedHeightUnit = "cm";
var selectedWeightUnit = "kg";
//setting default value to nothing
var message = "";
//devault value is 1 for BMI calculations.
var decimal = 1;
function calculateBMI(){
    //make sure the changeUnits function works even if the user didn't change the unit but changed something else or clicked the button.
    selectedHeightUnit = changeUnits(getValueOfElement("heightUnit"), "heightLabel");
    selectedWeightUnit = changeUnits(getValueOfElement("weightUnit"), "weightLabel");
    //trimming the name to get rid of spaces at the start and at the end.
    var name = getValueOfElement("name").trim();
    //multiplying by 1 to make sure the value gets converted to a number (can use parseInt instead).
    var weight = getValueOfElement("weight")*1;
    var height = getValueOfElement("height")*1;
    //assign value to 0
    var bmi = 0;
    //check if variable name isn't null or empty
    if(name){
        if(validateName(name)){
            message = "Please insert a valid name!<br>Your name cannot contain numbers or symbols<br>or be less than 2 characters or more than 100.";
        }
        //check if weight variable isn't null or empty
        else if(!weight){
           message = "Weight field is required!<br>Cannot be 0";
        }
        else{
             //check if the weight is valid, if not, give error message
            if (!isValueBetween(weight,151,0)){
              message = "Please insert a valid weight!<br>between 1kg and 150kg.";
            }
            else if(!height){
              message = "Height field is required!<br>Cannot be 0";
            }
            else {
                    if (isValueBetween(decimal, -1, 10)) {
                        if (selectedHeightUnit == "inch") {     
                            // Check if the height is valid in inches
                            if (!isValueBetween(height, 15, 101)) {
                                message = "Please insert a valid height!<br>Between 16 Inches and 100 Inches." + height;
                            } else {
                                // Converting height from inch to m
                                height = height / 100 * 2.54;
                                bmi = decimalRounder(weight / Math.pow(height, 2), decimal);
                                message = bmiClassification(name, bmi, "kg", "m");
                            }
                        } else {
                            // Check if the height is valid in cm
                            if (!isValueBetween(height, 251, 39)) {
                                message = "Please insert a valid height!<br>Between 40cm and 250cm." + + height;
                            } else {
                                // Converting height from cm to m
                                height = height / 100;
                                bmi = decimalRounder(weight / Math.pow(height, 2), decimal);
                                message = bmiClassification(name, bmi, "kg", "m");
                            }
                        }
                    } else {
                        message = "Please insert a valid decimal.<br>Between 0 and 9";
                    }
            }            
            }
    }
    else{
        message = "Name field is required!"
    }
    passMessageToElement("messageP", message);
    return false;
}

function decimalChanged(){
    decimal = getValueOfElement("decimal")*1;
    if(decimal){
        //do nothing becuase the user has changed the default value.
    }else{
        //default value
        decimal = 1;
    }
}
