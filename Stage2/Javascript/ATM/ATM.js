// Variable declaration (dummy data).
var userAccountNos = [19586553566, 19568442322];
var userAccountPins = [755960, 463899];
var userAccountUsername = ["John Doe", "Doe Johnny"];
var userAccountsBalance = [1500, 8900];
const RMNotes = [10, 20, 50, 100];
var RMNotesAvailable = [10, 10, 10, 10];
var loggedInUser = -1;
var userLoggedIn = false;

function loginF(){
    accountNoInput = parseInt(getValueById("accountNoInput"));
    accountPinInput= getValueById("pinNoInput");
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

function withdrawF(){
    var withdrawAmount = document.getElementById("withdrawInput").value;
    var ohWithdrawAmount = withdrawAmount;
    var userBalance = userAccountsBalance[loggedInUser];
    if(isNaN(withdrawAmount) || withdrawAmount == "" || withdrawAmount <= 0){
        passMessageToElement("withdrawP", "<br>Amount specified is not valid<br>Try Again!");
    } else if(userBalance >= withdrawAmount){
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
            document.getElementById("withdrawP").innerHTML ="Your withdrawl of RM"+ohWithdrawAmount+" is successful<br><br>";
            for(let i = 0; i<notesToDispense.length;i++){
            document.getElementById("withdrawP").innerHTML +="You will get " + notesToDispense[i]+"<br><br>";
            }
            userAccountsBalance[loggedInUser] -= ohWithdrawAmount;
            document.getElementById("withdrawP").innerHTML += "Your balance is now: RM"+userAccountsBalance[loggedInUser];
            //refresh the view
            showWithdrawContent();
        } else {
            passMessageToElement("withdrawP", "Sorry, there aren't enough notes to fulfill your request.<br><br>Available notes are ");
            for(let i = 0; i<RMNotes.length;i++){
                document.getElementById("withdrawP").innerHTML += RMNotes[i]+" "
            }
        }
    }
    else{
        passMessageToElement("withdrawP", "Sorry your current balance ("+userBalance+") is lower than the amount you're trying to withdraw ("+withdrawAmount+").<br>"+"stop being poor bro.")
    }
    return false;
}

function depositF(){
    var depositAmount = document.getElementById("depositInput").value;
    var ogDepositAmount = depositAmount;
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
            userAccountsBalance[loggedInUser] += parseInt(ogDepositAmount);
        }
        else{
            passMessageToElement("depositP", "Sorry This machine only accepts ")
            for(let i=0; i<RMNotes.length; i++){
                document.getElementById("depositP").innerHTML += RMNotes[i];
            }
            document.getElementById("depositP").innerHTML+= " Notes"
        }
    }
    return false;
}

function balanceF(){
    passMessageToElement("balanceAccountNoP", "Your Balance is: RM<b>" + userAccountsBalance[loggedInUser].toFixed(2)+"</b>")
    return false;
}

function showWithdrawContent(){
    if(userLoggedIn){
        showContent("contentWithdraw");
        var availableNotesP = document.getElementById("availableNotesP");
        document.getElementById("withdrawInput").value = "";
        availableNotesP.innerHTML = "";
        for(let x = 0; x<RMNotes.length;x++){
            availableNotesP.innerHTML += "There are: "+RMNotesAvailable[x] + " of RM"+ RMNotes[x]+"<br><br>";
        }
    }
    else{
        passMessageToElement("loginMessageP","Please login to withdraw cash...");
    }
}

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

function showBalanceContent(){
    if(userLoggedIn){
        showContent("contentBalance");
        passMessageToElement("balanceAccountNoP","");
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