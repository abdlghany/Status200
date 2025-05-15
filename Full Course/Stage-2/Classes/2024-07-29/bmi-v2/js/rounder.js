function decimalRounder(value, decimals) {
    // Approach A
    // var factor = Math.pow(10, decimals);
    // var valueInRequestedDecimals = Math.round(value * factor) / factor;

    // Approach B
    // This approach always puts out the requested number of decimals.
    // Also when the value is 20 it will output 20.00 if decimals is set to 2
    var valueInRequestedDecimals = value.toFixed(decimals);

    return valueInRequestedDecimals;
}
