function decmilaRounder(value, decimals){
    //10 to the power of the number the user passed to this function to define how many decimal numbers we return
    var powerOf = Math.pow(10, decimals);
    //using the method 'round' after multiplying by 10
    //then dividing by 10 to get our number back with 1 decimal point (the round will round the number to the nearest integer) Ex. round(0.55 * 10)
    // = 5, then we divide by 10, we get 0.5
    return Math.round(value * powerOf) / powerOf;
}