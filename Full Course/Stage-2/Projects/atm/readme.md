# ATM

Example code for ATM project. This code is not optimal and could use some refinement.

## Kowledge available for this poject

-   HTML
    -   setup layout
    -   using ids and classes
-   CSS
    -   heneral styling of document
    -   show / hide HTML elements
-   JS
    -   retreive user input
    -   variables types
        -   string
        -   integer
        -   float
        -   array
        -   boolean
    -   concatination (glueing)
    -   inbuild functions
        -   parseInt()
        -   parseFloat()
        -   getElementById()
        -   getElementsByClass()
        -   indexOf()
        -   isNan()
        -   trim()
        -   toFixed()
        -   Math.round()
        -   Math.floor()
    -   modolu operator
    -   rertieve / set HTML object properties
        -   value
        -   innerHTML
        -   innerText
        -   style.cssProperty
    -   loops
        -   for
        -   while
    -   conditional
        -   if ... else
    -   functions
        -   function / input parameters
        -   return
            -   to return data
            -   to stop executing rest of code inisde a function
-   Using resources like ChatGPT to find solutions and or solve bugs. As long as the student is able to show (s)he understands the code used, it's fine to use code provided by these resources

## Requirements

-   Login using accountnumber and pincode
-   A withdraw screen
-   A deposit screen
-   A balance screen

### ATM

-   has notes of 100, 50, 20 and 10
-   has a certain amount of each denomination
-   fixed amount users can withdraw per day

### Users

-   have a name
-   have a accounnumber
-   have a pincode
-   have a credit
-   have a balance

### Witdraw

-   validate user input
    -   is the request amount not empty?
    -   is the request amount a number?
    -   is the request amount bigger than zero?
    -   is the requested amount an integer?
    -   does user have enough money (balance + credit)?
    -   does ATM have the notes to match the amount requested?
    -   does requested amount exceed daily ATM limit?
    -   keep track of earlier withdrawls too
-   determine most optimal amount of different type of notes that matches the request withdraw amount
-   update user balance after successful withdraw
-   update ATM note stash after successful withdraw
-   update user daily withdraw available amount after successful withdraw

### Deposit

-   validate user input
-   update user balance after successful deposit
-   update ATM note stash after successful deposit

### Balance

-   show "current" user balance

## Optional

-   use localStorage (not included in this code)
