// This function is exported as "info()" and can be accessed outside this module
function logInfo(message) {
    console.log(message);
}

// This function is exported as "error()" and can be accessed outside this module
function logError(message) {
    console.error(message);
}

// These functions are not exported and are not available outside this module
// These functions are only available to other functions within this module
function someOtherFunctionA() {
    console.log("This is some other function A");
}
function someOtherFunctionB() {
    console.log("This is some other function B");
}
function someOtherFunctionC() {
    console.log("This is some other function C");
}

// Export properties and methods that you want to make available outside this module
module.exports.info = logInfo;
module.exports.error = logError;
