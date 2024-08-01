// Variable declaration.
var userAccountNos = [19586553566, 19568442322];
var userAccountPins = [755960, 463899];
var userAccountUsername = ["User1", "User2"];
var userAccountBalance = [1500,8900];
var RMNotes = [1,5,10,20,50,100];
var loggedInUser = -1;
var userLoggedIn = false;

function loginF(){
    accountNoInput = parseInt(getValueById("accountNoInput"));
    accountPinInput= getValueById("pinNoInput");
    for(let i=0;i<userAccountNos.length;i++){
        resetMessages(["pinNoP","accountNoP"]);
        if(accountNoInput == userAccountNos[i]){
            loggedInUser = i;
            if(userAccountPins[loggedInUser] == accountPinInput){
                loggedInUser = true;
                showBalanceContent();
                showLogoutButton();
                break;
            }else{
                passMessageToElement("pinNoP","Please check your PIN No." + i);
            }
        }else{
    passMessageToElement("accountNoP","Please verify that your account No. is correct.");
   
        }
    }
    return false;
}
function withdrawF(){
   
    return false;
}
function depositF(){
    if(userLoggedIn){

    }
    else{
        passMessageToElement("loginMessageP","Please login to continue...");
    }
    return false;
}
function balanceF(){
    if(userLoggedIn){

    }
    else{
        passMessageToElement("loginMessageP","Please login to continue...");
    }
    return false;
}

function showWithdrawContent(){
    if(userLoggedIn){
        showContent("contentWithdraw");
    }
    else{
        passMessageToElement("loginMessageP","Please login to continue...");
    }
}
function showDepositContent(){
    if(userLoggedIn){
        showContent("contentDeposit");
    }
    else{
        passMessageToElement("loginMessageP","Please login to continue...");
    }
}
function showBalanceContent(){
    if(userLoggedIn){
        showContent("contentBalance");
    }
    else{
        passMessageToElement("loginMessageP","Please login to continue...");
    }
}
function showLoginMenu(){
    showContent("contentLogin");
    hideLogoutButton();
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
    showLoginMenu();
}