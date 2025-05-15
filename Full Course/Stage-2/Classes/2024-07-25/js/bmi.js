function calculateBMI() {
    // Empty error messages
    emptyError("errorName");
    emptyError("errorHeight");
    emptyError("errorWeight");
    emptyError("errorDecimals");

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
    var weightUnitSystem = document.getElementById(
        "inputWeightUnitSystem"
    ).value;

    // Get the number of decimals the user wants to use for the BMI score output
    var decimals = document.getElementById("inputDecimals").value;

    // Keep track of if there were any errors
    var errors = false;

    // Validate the name
    var error = validateName(name, "name");
    if (error !== false) {
        document.getElementById("errorName").innerHTML = error;
        errors = true;
    }

    // Validate the height
    if (heightUnitSystem == "inches") {
        error = validateInteger(height, 20, 100, "height in inches");
    } else {
        error = validateInteger(height, 50, 250, "height in centimeters");
    }
    if (error !== false) {
        document.getElementById("errorHeight").innerHTML = error;
        errors = true;
    }

    // Validate the weight
    if (weightUnitSystem == "pounds") {
        error = validateInteger(weight, 40, 400, "weight in pounds");
    } else {
        error = validateInteger(weight, 20, 200, "weight in kilograms");
    }
    if (error !== false) {
        document.getElementById("errorWeight").innerHTML = error;
        errors = true;
    }

    // Validate the number of decimals
    error = validateInteger(decimals, 0, 10, "decimals");
    if (error !== false) {
        document.getElementById("errorDecimals").innerHTML = error;
        errors = true;
    }

    // If there were any errors, stop the function
    if (errors) {
        return;
    }

    // Convert inches to centimetes
    if (heightUnitSystem == "inches") {
        // Convert inches to centimeters
        height = height * 2.54;
    }

    // Convert pounds to kilograms
    if (weightUnitSystem == "pounds") {
        // Convert pounds to kilograms
        weight = weight * 0.453592;
    }

    // Convert height centimeters to meters
    var meterHeight = height / 100;

    // Calculate BMI
    var bmi = weight / (meterHeight * meterHeight);

    // Round down calculated BMI to the mount of decimals the user wants
    var bmi_rounded = decimalRounder(bmi, decimals);

    // Initialize classification as an empty string
    var classification = "";
    var cssClassificationClass = "";

    // Determine the correct classification
    // If the BMI is less than 18.5, the classification is "Underweight"
    if (bmi_rounded < 18.5) {
        classification = "Underweight";
        cssClassificationClass = "danger";
    }
    // If the BMI is greater than or equal to 18.5 and less than 25, the classification is "Normal"
    else if (bmi_rounded >= 18.5 && bmi_rounded < 25) {
        classification = "Normal";
        cssClassificationClass = "okay";
    }
    // If the BMI is greater than or equal to 25 and less than 30, the classification is "Overweight"
    else if (bmi_rounded >= 25 && bmi_rounded < 30) {
        classification = "Overweight";
        cssClassificationClass = "warning";
    }
    // Otherwise the classification is "Obese"
    else {
        classification = "Obese";
        cssClassificationClass = "danger";
    }

    // Put together the output sentence
    var sentence =
        "<b>Your BMI score is <i>" +
        bmi_rounded +
        "</i><br><br>This classifies you as being <i>" +
        classification +
        "</i></b><br><br>Click again to calculate another BMI.";

    // Output the sentence as HTML on my page
    document.getElementById("outputBmiResult").innerHTML = sentence;

    // Add a class to the output to color the classification
    document
        .getElementById("outputBmiResult")
        .classList.add(cssClassificationClass);
}

function emptyError(targetId) {
    document.getElementById(targetId).innerHTML = "";
}
