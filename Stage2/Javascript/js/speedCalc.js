function calculateSpeed(){
    //variable declaration
    var distance = getValueOfElement("distance_input")*1;
    var time = getValueOfElement("time_input")*1;
    var speed = distance / time;
    var errorMessage = ""
    var speedMessage = ""
    //rounding the speed to 2 decimal points no matter how many it currently has.
    speed = formatNumberWithDecimals(decimalRounder(speed,2),2);
    //validating the 2 input fields as required 
    errorMessage += numberFieldValidator(distance, "distance", 0);
    errorMessage += numberFieldValidator(time, "time", 1);
    if(errorMessage){
        passMessageToElement("output_p", errorMessage);
        return
    }
    var speedMessage = speedValidator(speed, distance, time);
    passMessageToElement("output_p",speedMessage );

}

function speedValidator(speed, distance, time){
if (speed == ""){
    return ""
}
else if (speed > 100){
    return "Too Fast! Your speed is "+speed+" km/hour. This is calculated by dividing the distance ("+distance+" km) by the time ("+time+" hours).<br>";
}
else if (speed < 10){
    return "Too Slow! Your speed is "+speed+" km/hour. This is calculated by dividing the distance ("+distance+" km) by the time ("+time+" hours).<br>";
}
else{
    return "Nice Speed! Your speed is "+speed+" km/hour. This is calculated by dividing the distance ("+distance+" km) by the time ("+time+" hours).<br>";
}
}

function numberFieldValidator(value, name, min){
    // the or  == 0 is here to make sure min value 0 as a distance works. "distance must be greater or equal to zero"
    //otherwise it'll default to "" when zero is entered by a user
    if(value != "" || value == 0){
        if(isNaN(value)){
            return "Only numbers are allowed in "+name + " field<br>"
        }
        else if(value < min){
            return name + " field's minimum value is " + min+ " <br>"
        }
        else{
            return ""
        }
    }
    else{
        return name + " cannot be empty!"+ "<br>"
    }
}