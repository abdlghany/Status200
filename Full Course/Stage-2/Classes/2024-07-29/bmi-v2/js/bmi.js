function calculateBMI() {
    // Reset button
    document.getElementById("outputBmiResult").innerHTML = "Calulate BMI";
    document.getElementById("outputBmiResult").classList = "";

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

    name = name.trim();
    height = parseInt(height);
    weight = parseInt(weight);
    decimals = parseInt(decimals);

    var errorsName = nameValidator(name, "name");
    if (heightUnitSystem == "inches") {
        var errorsHeight = numberValidator(height, 20, 100, "height inches");
    } else {
        var errorsHeight = numberValidator(
            height,
            50,
            250,
            "height centimeters"
        );
    }
    if (weightUnitSystem == "pounds") {
        var errorsWeight = numberValidator(weight, 60, 300, "weight pounds");
    } else {
        var errorsWeight = numberValidator(weight, 30, 150, "weight kgs");
    }

    var errorsDecimals = numberValidator(decimals, 1, 10, "decimals");

    var areThereErrors = false;

    if (errorsName != "") {
        document.getElementById("errorName").innerHTML = errorsName;
        areThereErrors = true;
    }
    if (errorsHeight != "") {
        document.getElementById("errorHeight").innerHTML = errorsHeight;
        areThereErrors = true;
    }
    if (errorsWeight != "") {
        document.getElementById("errorWeight").innerHTML = errorsWeight;
        areThereErrors = true;
    }
    if (errorsDecimals != "") {
        document.getElementById("errorDecimals").innerHTML = errorsDecimals;
        areThereErrors = true;
    }

    if (areThereErrors == true) {
        return;
    }

    // Convert inches to centimetes
    if (heightUnitSystem == "inches") {
        // Convert inches to centimeters
        height = height * 2.54;
    }

    // Convert weight to kilograms
    if (weightUnitSystem == "pounds") {
        // Convert inches to centimeters
        weight = weight / 2.2;
    }

    // Convert height centimeters to meters
    var meterHeight = height / 100;

    // Calculate BMI
    var bmi = weight / (meterHeight * meterHeight);

    // Round down calculated BMI to the mount of decimals the user wants
    var bmi_rounded = decimalRounder(bmi, decimals);

    // Initialize classification as an empty string
    var classification = "";
    var classificationClass = "";

    // Determine the correct classification
    // If the BMI is less than 18.5, the classification is "Underweight"
    if (bmi_rounded < 18.5) {
        classification = "Underweight";
        classificationClass = "danger";
    }
    // If the BMI is greater than or equal to 18.5 and less than 25, the classification is "Normal"
    else if (bmi_rounded >= 18.5 && bmi_rounded < 25) {
        classification = "Normal";
        classificationClass = "okay";
    }
    // If the BMI is greater than or equal to 25 and less than 30, the classification is "Overweight"
    else if (bmi_rounded >= 25 && bmi_rounded < 30) {
        classification = "Overweight";
        classificationClass = "warning";
    }
    // Otherwise the classification is "Obese"
    else {
        classification = "Obese";
        classificationClass = "danger";
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

    // Change class of element
    document.getElementById("outputBmiResult").classList = classificationClass;
}

function switchHeightHelpText() {
    var heightUnitSystem = document.getElementById(
        "inputHeightUnitSystem"
    ).value;

    if (heightUnitSystem == "inches") {
        var message = "inches: min 20, max 100";
    } else {
        var message = "centimeters: min 50, max 250";
    }

    document.getElementById("heightUnitSystemHelper").innerHTML = message;
}

function switchWeightHelpText() {
    var heightUnitSystem = document.getElementById(
        "inputWeightUnitSystem"
    ).value;

    if (heightUnitSystem == "pounds") {
        var message = "pounds: min 60, max 300";
    } else {
        var message = "kg: min 30, max 150";
    }

    document.getElementById("weightUnitSystemHelper").innerHTML = message;
}
