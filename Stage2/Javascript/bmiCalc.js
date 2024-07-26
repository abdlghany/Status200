
{/* function to change an element's inner HTML */}
function passMessageToElement (elementID, message){
    document.getElementById(elementID).innerHTML = message;
    return null
}
{/* function to get the value of an elemeny by ID */}
function getValueOfElement(ElementID){
    elementValue = document.getElementById(ElementID).value
    return elementValue;
}
function calculateBMI(){
// reset text paragraphs after every button click. (elementID, message to pass)
passMessageToElement("errorMessage", "");
passMessageToElement("bmi", "");
var classification;
//trimming the name to get rid of spaces at the start and at the end.
var name = getValueOfElement("name").trim();
var weight = getValueOfElement("weight")*1;
var height = getValueOfElement("height")/100;
var decimal = getValueOfElement("decimal")*1;
// this 'awesome' varaible will calculate bmi and round it to 1 number after the decimal point. 

//check if variable name isn't null or empty
if(name){
     // Regular expression to match any alphabetical letter, capital or small, then (space or ' or -) and so on...making sure it doesn't end with
     //anything other than the specified characters using $, reference https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    var regex = /^[a-zA-Zا-ي]+(?:[' -][a-zA-Zا-ي]+)*$/;
    if(!regex.test(name) || name.length < 2 || name.length > 100){
        passMessageToElement("errorMessage",  "Please input a valid name!<br>Your name cannot contain numbers or symbols<br>or be less than 2 characters or more than 100.");
    }
    //check if weight variable isn't null or empty
    else if(!weight){
        passMessageToElement("errorMessage",  "Weight field is required!<br>Cannot be 0");
    }
    else{
         //check how much the person's weight is, reject input if higher than 635 or lower than 1
        if (weight > 635 || weight < 1){
            passMessageToElement("errorMessage",  "Please input a valid weight!<br>between 1kg and 635kg."); 
        }
        else if(!height){
            passMessageToElement("errorMessage",  "Height field is required!<br>Cannot be 0");
        }
        else{
             //check if person is bigger than 2.7meters or shorter than 0.5meters
            if (height > 2.7 || height < 0.55){
                passMessageToElement("errorMessage",  "Please input a valid height!<br>between 55cm and 270cm.");
            }
            //after passing all the checks, do the bmi calculations and display ouput to the user.
            else if(decimal >= 0 && decimal <21){
                var bmi = decmilaRounder(weight / Math.pow(height,2), decimal);
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
                passMessageToElement("bmi", "Dear "+name+", Your BMI is: <b>"+ bmi + "kg/m<sup>2</sup></b> " + "<br/>Your BMI shows that you're <b>" + classification + "</b>");
              
                }
                else{ 
                    passMessageToElement("errorMessage","Please insert a valid decimal.<br>Between 0 and 20")
                }
               
            }
        }
}
else{
    passMessageToElement("errorMessage",  "Name field is required!");
}
return false;
}