// Variable declaration.
var userAccountNos = [19586553566, 19568442322];
var userAccountPins = [755960, 463899];
var userAccountUsername = ["User1", "User2"];
var userAccountBalance = [1500,8900];
var RMNotes = [1,5,10,20,50,100];
var RMNotesAvailable = [10,10,10,10,10,10];
var loggedInUser = -1;
var userLoggedIn = false;

function loginF(){
    accountNoInput = parseInt(getValueById("accountNoInput"));
    accountPinInput= getValueById("pinNoInput");
    if(accountNoInput && accountPinInput){
    for(let i=0;i<userAccountNos.length;i++){
        resetMessages(["pinNoP","accountNoP", "balanceAccountNoP"]);
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
}else{
    if(accountNoInput){
        passMessageToElement("pinNoP","PIN No. field cannot be empty.");
    }
    else{
        passMessageToElement("accountNoP","Account No. field cannot be empty.");
    }
}
    return false;
}
function withdrawF(){
   
    return false;
}
function depositF(){

    return false;
}
function balanceF(){
    passMessageToElement("balanceAccountNoP", "Your Balance is: RM<b>" + userAccountBalance[loggedInUser].toFixed(2)+"</b>")
    return false;
}

function showWithdrawContent(){
    if(userLoggedIn){
        showContent("contentWithdraw");
    }
    else{
        passMessageToElement("loginMessageP","Please login to withdraw...");
    }
}
function showDepositContent(){
    if(userLoggedIn){
        showContent("contentDeposit");
    }
    else{
        passMessageToElement("loginMessageP","Please login to deposit...");
    }
}
function showBalanceContent(){
    if(userLoggedIn){
        showContent("contentBalance");
    }
    else{
        passMessageToElement("loginMessageP","Please login to view Balance...");
    }
}
function showLoginMenu(){
    showContent("contentLogin");
    passMessageToElement("loginMessageP","");
    hideLogoutButton();
    usernameFields = document.getElementsByClassName("username");
    for(let x = 0; x<usernameFields.length;x++){
        usernameFields[x].innerHTML = "Welcome "+"(Username)";
    }
}
function showContent(contentID){
    var allContents = document.getElementsByClassName("content");
    for(let i =0; i<allContents.length;i++){
        allContents[i].classList.remove("displayBlock");
        allContents[i].classList.add("displayNone");
    }
    document.getElementById(contentID).classList.add("displayBlock");
    document.getElementById(contentID).classList.remove("displayNone");
}
function showLogoutButton(){
    document.getElementById("logoutButton").classList.add("displayBlock");
    document.getElementById("logoutButton").classList.remove("displayNone");
}
function hideLogoutButton(){
    document.getElementById("logoutButton").classList.remove("displayBlock");
    document.getElementById("logoutButton").classList.add("displayNone");
}
function getValueById(ID){
    return document.getElementById(ID).value;
}
function passMessageToElement(elementId, message){
    document.getElementById(elementId).innerHTML = message;
}
function resetMessages(messageFieldIds){
    messageFieldIds.forEach(function resetMessage(messageFieldId){
        passMessageToElement(messageFieldId,"");
    })
}
function logoutF(){
    loggedInUser = -1;
    userLoggedIn = false;
    document.getElementById("accountNoInput").value = ""
    document.getElementById("pinNoInput").value = ""
    showLoginMenu();
}