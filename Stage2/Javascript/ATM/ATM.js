// Variable declaration (dummy data).
var userAccountNos = [19586553566, 19568442322, 19568489352];
var userAccountPins = [755960, 463899, 896327];
var userAccountUsername = ["John Doe", "Doe Johnny", "Infinite money"];
var userAccountsBalance = [1500, 8900, 9999999];
const RMNotes = [10, 20, 50, 100];
var RMNotesAvailable = [10, 10, 10, 10];
//Main Division's IDs (Login, Withdraw, Deposit and Balance pages).
var contents = ["contentLogin", "contentWithdraw", "contentDeposit", "contentBalance"]
//a function that runs when the login button is clicked.
function loginF(){
    var accountNoInput = parseInt(getValueById("accountNoInput"));
    var accountPinInput= getValueById("pinNoInput");
    resetMessages(["pinNoP","accountNoP", "balanceAccountNoP", "withdrawP"]);
    if(accountNoInput && accountPinInput){
        for(let i=0; i<userAccountNos.length; i++){
            if(accountNoInput == userAccountNos[i]){
                //using local storage to set the currently logged in user.
                localStorage.setItem("loggedInUser", i);
                if(userAccountPins[i] == accountPinInput){
                    showBalanceContent();
                    showLogoutButton();
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
    var totalNotesAvailableSum = 0;
    var tempRMNotesAvailable = [];
    for(let i=0; i<RMNotes.length; i++){
        var noteValue = parseInt(RMNotes[i]);
        var notesAvailable = parseInt(RMNotesAvailable[i]);
        totalNotesAvailableSum += (noteValue * notesAvailable);
        tempRMNotesAvailable.push(RMNotesAvailable[i]);
    }
    var withdrawAmount = parseInt(getValueById("withdrawInput"));
    //saving the variable in another one so that we can modify it's value freely
    var ogWithdrawAmount = parseInt(withdrawAmount);
    //check if the amount is valid, bigger than 0 and
    if(isNaN(withdrawAmount) || withdrawAmount == "" || withdrawAmount <= 0){
        passMessageToElement("withdrawP", "<br>Amount specified is not valid<br>Try Again!");
    }else if(totalNotesAvailableSum < withdrawAmount){
        passMessageToElement("withdrawP", "Sorry your request cannot be fullfilled at this time<br>Because this machine contains a total of RM"+totalNotesAvailableSum);
    } 
    else if(getAccountBalance() >= withdrawAmount){
        withdrawAmount = parseInt(withdrawAmount);
        var notesToDispense = []; // store the number of notes to dispense for each note pass
        for (let x=RMNotes.length-1; x >= 0; x--) {
            if (tempRMNotesAvailable[x] > 0) {
                //convert to the nearest lower integer (lower [or equal to] than the result of the division);
                var noteCount = Math.floor(withdrawAmount / RMNotes[x]);
                if (noteCount > 0) {
                    if (noteCount > tempRMNotesAvailable[x]) {
                        noteCount = tempRMNotesAvailable[x];
                    }
                    tempRMNotesAvailable[x] -= noteCount;
                    withdrawAmount -= noteCount * RMNotes[x];
                    notesToDispense.push("RM"+RMNotes[x]+": "+ +noteCount);
                }
            }
        }
        if (withdrawAmount === 0) {
            //applying changes to the user's account based on the original withdraw amount they entered.
            updateAccountBalance(ogWithdrawAmount*(-1));
            passMessageToElement("withdrawP","Your withdrawl of RM"+ogWithdrawAmount+" is successful<br><br> You will get:<br>"+
            getArrayContentsMessage(notesToDispense, "<br><br>") + "Your balance is now: RM"+getAccountBalance());
            //applying changes to the available note count based on the temp variable.
            for(let x = 0; x<RMNotesAvailable.length;x++){
                RMNotesAvailable[x] = tempRMNotesAvailable[x];
            }
            //refresh the view
            showWithdrawContent();
        } else {
            passMessageToElement("withdrawP", "Sorry, this machine doesn't support notes other than " + getArrayContentsMessage(RMNotes, " "));
            //refresh the view (to make sure the note count did not change).
            showWithdrawContent();
        }
    }
    else{
        passMessageToElement("withdrawP", "Sorry your current balance ("+getAccountBalance()+") is lower than the amount you're trying to withdraw ("+withdrawAmount+").<br>"+"stop being poor bro.")
    }
    return false;
}
//function that runs when the Withdraw button inside the withdraw section is clicked.
function depositF(){
    var depositAmount = getValueById("depositInput");
    var ogDepositAmount = parseInt(depositAmount);
    var tempRMNotesAvailable = [];
    if(depositAmount <= 0 || depositAmount == "" || isNaN(depositAmount)){
        passMessageToElement("depositP", "<br>Amount specified is not valid<br>Try Again!");
    }
    else{
        for(let x=RMNotes.length-1; x>= 0; x--){
            //using this loop to fill the temp variable to avoid creating another loop especially for it.
            //did not use push() because the array is being traversed in reverse
            tempRMNotesAvailable[x] = RMNotesAvailable[x];
            if(depositAmount > 0){
                var noteCount = Math.floor(depositAmount / RMNotes[x]);
                if (noteCount > 0) {
                    tempRMNotesAvailable[x] += noteCount;
                    depositAmount -= noteCount * RMNotes[x];
                }
            }
        }
        if(depositAmount == 0){
            updateAccountBalance(ogDepositAmount);
            //applying changes to the available note count based on the temp variable.
            for(let x = 0; x<RMNotesAvailable.length;x++){
                RMNotesAvailable[x] = tempRMNotesAvailable[x];
            }
            passMessageToElement("depositP","Your deposit of RM"+ogDepositAmount+" has been added to your account funds.<br><br>Your current balance is: "+ getAccountBalance());
        }
        else{
            passMessageToElement("depositP", "Sorry This machine only accepts "+ getArrayContentsMessage(RMNotes, " ")+ "Notes")
        }
    }
    return false;
}
//funtion to show the current user's balance, it runs when the button "Reveal your balance" is clicked.
function balanceF(){
    passMessageToElement("balanceAccountNoP", "Your Balance is: RM<b>" + getAccountBalance().toFixed(2)+"</b>")
    return false;
}
// shows the section "withdraw". if the user is logged in.
function showWithdrawContent(){
    if(loggedInUser()){
        showContent(contents[1]);
        document.getElementById("withdrawInput").value = "";
        passMessageToElement("availableNotesP", "");
        for(let x = 0; x<RMNotes.length; x++){
      document.getElementById("availableNotesP").innerHTML += "There are: "+RMNotesAvailable[x] + " of RM"+ RMNotes[x]+"<br><br>";
        }
    }
    else{
        passMessageToElement("loginMessageP","Please login to withdraw cash...");
    }
}
//shows the section "deposit". if the user is logged in.
function showDepositContent(){
    if(loggedInUser()){
        showContent(contents[2]);
        passMessageToElement("withdrawP", "");
        document.getElementById("depositInput").value = "";
        passMessageToElement("depositP","");
    }
    else{
        passMessageToElement("loginMessageP","Please login to deposit cash...");
    }
}
//shows the section Check Balance. if the user is logged in.
function showBalanceContent(){
    if(loggedInUser()){
        showContent(contents[3]);
        passMessageToElement("withdrawP", "");
        passMessageToElement("balanceAccountNoP","");
        // Display the message Welcome (username); where username  = the name of the currently logged in user.
        fillUsernameFields(userAccountUsername[loggedInUser()]);
    }
    else{
        passMessageToElement("loginMessageP","Please login to view Balance...");
    }
}
//shows login menu when the user logs out.
function showLoginMenu(){
    if(loggedInUser()){
        showBalanceContent();
        showLogoutButton();
    }
    else{
    showContent(contents[0]);
    passMessageToElement("loginMessageP","");
    passMessageToElement("accountNoP","");
    hideLogoutButton();
    //reset the message to default (basically no username)
    fillUsernameFields("(Username)");
    }    
}
//hide all sections except that one passed as a parameter. using class names (content) in HTML.
function showContent(contentID){
    var ElementById = document.getElementById(contentID);
    for(let i =0; i<contents.length; i++){
        if(i != contents.indexOf(contentID)){
            document.getElementById(contents[i]).classList.add("displayNone");
        document.getElementById(contents[i]).classList.remove("displayBlock");
    }
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
    localStorage.removeItem("loggedInUser");
    document.getElementById("accountNoInput").value = ""
    document.getElementById("pinNoInput").value = ""
    showLoginMenu();
}
//loops through the array values and returns them along with whataver message is passed to the variable "afterTheArray".
function getArrayContentsMessage(arrayToLoop, afterTheArray){
    var message = "";
    for(let i = 0; i<arrayToLoop.length; i++){
        message +=  arrayToLoop[i]+afterTheArray;
        }
        return message;
}
function fillUsernameFields(username){
    var usernameFields = document.getElementsByClassName("username");
    for(let x = 0; x<usernameFields.length; x++){
        usernameFields[x].innerHTML = "Welcome "+username;
    }
}

function updateAccountBalance(amount) {
    userAccountsBalance[loggedInUser()] += amount;
}

function getAccountBalance(){
    return userAccountsBalance[loggedInUser()];
}

function loggedInUser(){
    //return null if the item doesn't exist (user isn't logged in) and the user's index if the user is logged in.
    return localStorage.getItem("loggedInUser");
}