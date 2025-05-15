function calculateBMI() {
    // Get name of the user
    var name = document.getElementById("inputName").value;

    // Get height of the user
    var height = document.getElementById("inputHeight").value;

    // Get the used unit system
    var heightUnitSystem = document.getElementById(
        "inputHeightUnitSystem"
    ).value;

    // Get weight of the user
    var weight = document.getElementById("inputWeight").value;

    // Get the used system for weight
    // var weightUnitSystem = document.getElementById(
    //     "inputWeightUnitSystem"
    // ).value;

    // Get the number of decimals the user wants to use for the BMI score output
    var decimals = document.getElementById("inputDecimals").value;

    // Convert inches to centimetes
    if (heightUnitSystem == "inches") {
        // Convert inches to centimeters
        height = height * 2.54;
    }

    // Convert height centimeters to meters
    var meterHeight = height / 100;

    // Calculate BMI
    var bmi = weight / (meterHeight * meterHeight);

    // Round down calculated BMI to the mount of decimals the user wants
    var bmi_rounded = decimalRounder(bmi, decimals);

    // Initialize classification as an empty string
    var classification = "";

    // Determine the correct classification
    // If the BMI is less than 18.5, the classification is "Underweight"
    if (bmi_rounded < 18.5) {
        classification = "Underweight";
    }
    // If the BMI is greater than or equal to 18.5 and less than 25, the classification is "Normal"
    else if (bmi_rounded >= 18.5 && bmi_rounded < 25) {
        classification = "Normal";
    }
    // If the BMI is greater than or equal to 25 and less than 30, the classification is "Overweight"
    else if (bmi_rounded >= 25 && bmi_rounded < 30) {
        classification = "Overweight";
    }
    // Otherwise the classification is "Obese"
    else {
        classification = "Obese";
    }

    // Put together the output sentence
    var sentence =
        "<b>" +
        name +
        ", your BMI score is <i>" +
        bmi_rounded +
        "</i><br><br>This classifies you as being <i>" +
        classification +
        "</i></b><br><br>Click again to calculate another BMI.";

    // Output the sentence as HTML on my page
    document.getElementById("outputBmiResult").innerHTML = sentence;
}
