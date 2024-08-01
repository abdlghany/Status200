// Variable declaration (dummy data).
var userAccountNos = [19586553566, 19568442322, 19568489352];
var userAccountPins = [755960, 463899, 896327];
var userAccountUsername = ["John Doe", "Doe Johnny", "Infinite money"];
var userAccountsBalance = [1500, 8900, 9999999];
const RMNotes = [10, 20, 50, 100];
var RMNotesAvailable = [10, 10, 10, 10];
var loggedInUser = -1;
var userLoggedIn = false;
//a function that runs when the login button is clicked
function loginF(){
    var accountNoInput = parseInt(getValueById("accountNoInput"));
    var accountPinInput= getValueById("pinNoInput");
    resetMessages(["pinNoP","accountNoP", "balanceAccountNoP", "withdrawP"]);
    if(accountNoInput && accountPinInput){
        for(let i=0; i<userAccountNos.length; i++){
            if(accountNoInput == userAccountNos[i]){
                loggedInUser = i;
                if(userAccountPins[loggedInUser] == accountPinInput){
                    userLoggedIn = true;
                    showBalanceContent();
                    showLogoutButton();
                    usernameFields = document.getElementsByClassName("username");
                    for(let x = 0; x<usernameFields.length;x++){
                        usernameFields[x].innerHTML = "Welcome "+userAccountUsername[loggedInUser];
                    }
                    break;
                }else{
                    passMessageToElement("accountNoP","Please verify that your account No. and PIN are correct.");
                }
            }else{
        passMessageToElement("accountNoP","Please verify that your account No. and PIN are correct.");
            }
        }
    }
    else if(accountNoInput){
            passMessageToElement("pinNoP","PIN No. field cannot be empty.");
    }
    else{
            passMessageToElement("accountNoP","Account No. field cannot be empty.");
    }
    return false;
}
//a function that runs when the user clicks the button Withdraw in the 'withdraw' section
function withdrawF(){
    var withdrawAmount = getValueById("withdrawInput");
    //saving the variable in another one so that we can modify it's value freely
    var ogWithdrawAmount = withdrawAmount;
    //check if the amount is valid, bigger than 0 and
    if(isNaN(withdrawAmount) || withdrawAmount == "" || withdrawAmount <= 0){
        passMessageToElement("withdrawP", "<br>Amount specified is not valid<br>Try Again!");
    } else if(userAccountsBalance[loggedInUser] >= withdrawAmount){
        withdrawAmount = parseInt(withdrawAmount);
        var notesToDispense = []; // store the number of notes to dispense for each note pass
        for (let x=RMNotes.length-1; x >= 0; x--) {
            if (RMNotesAvailable[x] > 0) {
                //convert to the nearest lower integer (lower than the result of the division);
                var noteCount = Math.floor(withdrawAmount / RMNotes[x]);
                if (noteCount > 0) {
                    if (noteCount > RMNotesAvailable[x]) {
                        noteCount = RMNotesAvailable[x];
                    }
                    RMNotesAvailable[x] -= noteCount;
                    withdrawAmount -= noteCount * RMNotes[x];
                    notesToDispense.push("RM"+RMNotes[x]+": "+ +noteCount);
                }
            }
        }
        if (withdrawAmount === 0) {
            userAccountsBalance[loggedInUser] -= ogWithdrawAmount;
            passMessageToElement("withdrawP","Your withdrawl of RM"+ogWithdrawAmount+" is successful<br><br> You will get:<br>"+
            getArrayContentsMessage(notesToDispense, "<br><br>") + "Your balance is now: RM"+userAccountsBalance[loggedInUser]); 
            //refresh the view
            showWithdrawContent();
        } else {
            passMessageToElement("withdrawP", "Sorry, there aren't enough notes to fulfill your request.<br><br>Available notes are " + getArrayContentsMessage(RMNotes, " "));
        }
    }
    else{
        passMessageToElement("withdrawP", "Sorry your current balance ("+userAccountsBalance[loggedInUser]+") is lower than the amount you're trying to withdraw ("+withdrawAmount+").<br>"+"stop being poor bro.")
    }
    return false;
}
//function that runs when the Withdraw button inside the withdraw section is clicked.
function depositF(){
    var depositAmount = getValueById("depositInput");
    var ogDepositAmount = parseInt(depositAmount);
    if(depositAmount <= 0 || depositAmount == "" || isNaN(depositAmount)){
        passMessageToElement("depositP", "<br>Amount specified is not valid<br>Try Again!");
    }
    else{
        for(let x=RMNotes.length-1;x>= 0;x--){
            if(depositAmount > 0){
                var noteCount = Math.floor(depositAmount / RMNotes[x]);

                if (noteCount > 0) {
                    RMNotesAvailable[x] += noteCount;
                    depositAmount -= noteCount * RMNotes[x];
                }
            }
        }
        if(depositAmount == 0){
            document.getElementById("depositP").innerHTML ="Your deposit of RM"+ogDepositAmount+" has been added to your account funds.<br><br>";
            userAccountsBalance[loggedInUser] += ogDepositAmount;
        }
        else{
            passMessageToElement("depositP", "Sorry This machine only accepts "+ getArrayContentsMessage(RMNotes, " ")+ "Notes")
        }
    }
    return false;
}
//funtion to show the current user's balance, it runs when the button "Reveal your balance" is clicked.
function balanceF(){
    passMessageToElement("balanceAccountNoP", "Your Balance is: RM<b>" + userAccountsBalance[loggedInUser].toFixed(2)+"</b>")
    return false;
}
// shows the section "withdraw". if the user is logged in.
function showWithdrawContent(){
    if(userLoggedIn){
        showContent("contentWithdraw");
        document.getElementById("withdrawInput").value = "";
       passMessageToElement("availableNotesP", "");
        for(let x = 0; x<RMNotes.length;x++){
      document.getElementById("availableNotesP").innerHTML += "There are: "+RMNotesAvailable[x] + " of RM"+ RMNotes[x]+"<br><br>";
        }
    }
    else{
        passMessageToElement("loginMessageP","Please login to withdraw cash...");
    }
}
//shows the section "deposit". if the user is logged in.
function showDepositContent(){
    if(userLoggedIn){
        showContent("contentDeposit");
        document.getElementById("depositInput").value = "";
        passMessageToElement("depositP","");
    }
    else{
        passMessageToElement("loginMessageP","Please login to deposit cash...");
    }
}
//shows the section Check Balance. if the user is logged in.
function showBalanceContent(){
    if(userLoggedIn){
        showContent("contentBalance");
        passMessageToElement("balanceAccountNoP","");
    }
    else{
        passMessageToElement("loginMessageP","Please login to view Balance...");
    }
}
//shows login menu when the user logs out.
function showLoginMenu(){
    showContent("contentLogin");
    passMessageToElement("loginMessageP","");
    hideLogoutButton();
    usernameFields = document.getElementsByClassName("username");
    for(let x = 0; x<usernameFields.length;x++){
        usernameFields[x].innerHTML = "Welcome "+"(Username)";
    }
}
//hide all sections except that one passed as a parameter. using class names (content) in HTML.
function showContent(contentID){
    var allContents = document.getElementsByClassName("content");
    var ElementById = document.getElementById(contentID);
    for(let i =0; i<allContents.length;i++){
        allContents[i].classList.remove("displayBlock");
        allContents[i].classList.add("displayNone");
    }
    ElementById.classList.add("displayBlock");
    ElementById.classList.remove("displayNone");
}
//Shows the logout button when the user logs in
function showLogoutButton(){
    document.getElementById("logoutButton").classList.add("displayBlock");
    document.getElementById("logoutButton").classList.remove("displayNone");
}
//hides logout button when the user logs out.
function hideLogoutButton(){
    document.getElementById("logoutButton").classList.remove("displayBlock");
    document.getElementById("logoutButton").classList.add("displayNone");
}
//gets the value of an element when the id is passed as a parameter.
function getValueById(ID){
    return document.getElementById(ID).value;
}
//changes an element's innerHTML to a specified user message.
function passMessageToElement(elementId, message){
    document.getElementById(elementId).innerHTML = message;
}
//resets all paragraph's innerHTML from a passed array that contains the id's of those paragraphs.
function resetMessages(messageFieldIds){
    messageFieldIds.forEach(function resetMessage(messageFieldId){
        passMessageToElement(messageFieldId,"");
    })
}
//Function that logs the user out when they click "logout".
function logoutF(){
    loggedInUser = -1;
    userLoggedIn = false;
    document.getElementById("accountNoInput").value = ""
    document.getElementById("pinNoInput").value = ""
    showLoginMenu();
}
//loops through the array values and returns them along with whataver message is passed to the variable "afterTheArray".
function getArrayContentsMessage(arrayToLoop, afterTheArray){
    var message = "";
    for(let i = 0; i<arrayToLoop.length;i++){
        message +=  arrayToLoop[i]+afterTheArray;
        }
        return message;
}