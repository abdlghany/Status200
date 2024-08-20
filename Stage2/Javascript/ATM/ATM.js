//Start the server.js before changing anything here...this file is not the problem
// const RMNotes = [10, 20, 50, 100];
// var RMNotesAvailable = [10, 10, 10, 10];
const URL="http://atm.local:3000";
var RMNotesId = [];
var RMNotes = [];
var RMNotesAvailable = [];
// Main HTML Divisions'  IDs (Login, Withdraw, Deposit and Balance divs).
var contents = ["contentLogin", "contentWithdraw", "contentDeposit", "contentBalance"];
var balanceRevealed = false;
//a function that runs when the login button is clicked.
function loginF(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    var accountNoInput = getValueById("accountNoInput");
    var accountPinInput = getValueById("pinNoInput");
    resetMessages(["balanceAccountNoP", "withdrawP"]);

    if (accountNoInput && accountPinInput) {
        fetch(URL+'/api/fetch-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userAccountNo: accountNoInput,
                userAccountPin: accountPinInput,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.customerName) {
                // Using local storage to set the currently logged in user
                localStorage.setItem("loggedInUser", data.customerName);
                localStorage.setItem("loggedInUserId",data.customerId);
                showLogoutButton();
                setBalance(data.customerBalance);
                fillRMNotesArrays();
                showBalanceContent();
            } else {
                passMessageToElement("loginMessageP", "Please verify that your account No. and PIN are correct.", "red");
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            passMessageToElement("loginMessageP", "We're having a problem connecting to the database<br>Please try again later.", "red");
        });
    }
    return false; // Ensure the form does not submit
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
        passMessageToElement("withdrawP", "<br>Amount specified is not valid<br>Try Again!", "red");
    }else if(totalNotesAvailableSum < withdrawAmount){
        passMessageToElement("withdrawP", "Sorry your request cannot be fullfilled at this time<br>Because this machine contains a total of RM"+totalNotesAvailableSum.toLocaleString(), "orange");
    } 
    else if(getAccountBalance() >= withdrawAmount){
        withdrawAmount = parseInt(withdrawAmount);
        var notesToDispense = []; // store the number of notes to dispense for each note pass
        for (let x=RMNotes.length-1; x >= 0; x--) {
            if (tempRMNotesAvailable[x] > 0) {
                //convert to the nearest lower integer (lower [or equal to] than the result of the division);
                var noteCount = parseInt(Math.floor(withdrawAmount / RMNotes[x]));
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
            //toLocaleString() converts a number to a string with comma seperators every 3 numbers
            // (default machine behaviour since i didn't specifiy which locale it should use
            //toLocaleString('en-US') for example will return US locale formatting on every machine that runs this code.) 
            passMessageToElement("withdrawP","Your withdrawl of RM"+ogWithdrawAmount.toLocaleString()+" is successful<br><br> You will get:<br>"+
            getArrayContentsMessage(notesToDispense, "<br><br>") + "Your balance is now: RM"+getAccountBalance().toLocaleString(), "green");
            //applying changes to the available note count based on the temp variable.
            for(let x = 0; x<tempRMNotesAvailable.length;x++){
                RMNotesAvailable[x] = tempRMNotesAvailable[x];
                // console.log(x +" Notes available: "+RMNotesAvailable[x]+", "+x+" tempRMNotes Available: " + tempRMNotesAvailable[x]);
            }
            //refresh the view to show the user that notes' quantity have indeed changed in the ATM
            setTimeout(function (){
                showWithdrawContent();
              }, 1000);
            
        } else {
            //refresh the view (to make sure the note count did not change).
            setTimeout(function (){
                showWithdrawContent();
              }, 1000);
            passMessageToElement("withdrawP", "Sorry, this machine doesn't support notes other than " + getArrayContentsMessage(RMNotes, " "), "orange");
            
        }
    }
    else{
        passMessageToElement("withdrawP", "Sorry your current balance ("+getAccountBalance().toLocaleString()+") is lower than the amount you're trying to withdraw ("+withdrawAmount.toLocaleString()+").<br>"+"stop being poor bro.", "red")
    }
    return false;
}
//function that runs when the Withdraw button inside the withdraw section is clicked.
function depositF(){
    var depositAmount = getValueById("depositInput");
    var ogDepositAmount = parseInt(depositAmount);
    var tempRMNotesAvailable = [];
    if(depositAmount <= 0 || depositAmount == "" || isNaN(depositAmount)){
        passMessageToElement("depositP", "<br>Amount specified is not valid<br>Try Again!", "red");
    }
    else{
        for(let x=RMNotes.length-1; x>= 0; x--){
            //using this loop to fill the temp variable to avoid creating another loop especially for it.
            //did not use push() because the array is being traversed in reverse
            tempRMNotesAvailable[x] = RMNotesAvailable[x];
            if(depositAmount > 0){
                var noteCount = parseInt(Math.floor(depositAmount / RMNotes[x]));
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
            //refresh the view to show the user that notes' quantity have indeed changed in the ATM after 1 second of waiting.
            setTimeout(function (){
                showDepositContent();
                passMessageToElement("depositP","Your deposit of RM"+ogDepositAmount.toLocaleString()+" has been added to your account funds.<br><br>Your current balance is: "+ getAccountBalance().toLocaleString(), "green");
              }, 1000);
            
        }
        else{
            //refresh the view (to make sure the note count did not change).
            setTimeout(function (){
                showDepositContent();
                passMessageToElement("depositP", "Sorry This machine only accepts "+ getArrayContentsMessage(RMNotes, " ")+ "Notes", "orange"); 
              }, 1000);
            
        }
    }
    return false;
}
//funtion to show the current user's balance, it runs when the button "Reveal your balance" is clicked.
function balanceF(){
    if(!balanceRevealed){
        passMessageToElement("balanceAccountNoP", "Your Balance is: RM<b>" + getAccountBalance().toLocaleString()+"</b>")
        passMessageToElement("balanceButton","Hide Your Balance","black");
        balanceRevealed = true;
    }else{
        passMessageToElement("balanceAccountNoP",);
        passMessageToElement("balanceButton","Reveal Your Balance", "black");
        balanceRevealed = false;
    }
    
    return false;
}
// shows the section "withdraw". if the user is logged in.
function showWithdrawContent(){
    if(loggedInUser()){
        showContent(1);
        //RESET THE OTHER VIEW'S MESSAGE PARAGRAPH WHEN THE USER CLICKS ON THIS VIEW.
        passMessageToElement("depositP");
        changeValue("withdrawInput");
        passMessageToElement("availableNotesWP");
        fillRMNotesArrays();
        setTimeout(function (){
            for(let x = 0; x<RMNotes.length; x++){
                document.getElementById("availableNotesWP").innerHTML += "There are: "+RMNotesAvailable[x] + " of RM"+ RMNotes[x]+"<br><br>";
            }
        }, 500);
    }
    else{
        passMessageToElement("loginMessageP","Please login to withdraw cash...", "red");
    }
}
//shows the section "deposit". if the user is logged in.
function showDepositContent(){
    if(loggedInUser()){
        showContent(2);
        //RESET THE OTHER VIEW'S MESSAGE PARAGRAPH WHEN THE USER CLICKS ON THIS VIEW.
        passMessageToElement("withdrawP");
        changeValue("depositInput");
        passMessageToElement("availableNotesDP");
        fillRMNotesArrays();
        setTimeout(function (){
            for(let x = 0; x<RMNotes.length; x++){
                document.getElementById("availableNotesDP").innerHTML += "There are: "+RMNotesAvailable[x] + " of RM"+ RMNotes[x]+"<br><br>";
                  }
            }, 500);
    }
    else{
        passMessageToElement("loginMessageP","Please login to deposit cash...", "red");
    }
}
//shows the section Check Balance. if the user is logged in.
function showBalanceContent(){
    if(loggedInUser()){
        showContent(3);
        passMessageToElement("withdrawP");
        passMessageToElement("depositP");
        passMessageToElement("balanceAccountNoP");
        // Display the message Welcome (username); where username  = the name of the currently logged in user.
        fillUsernameFields(loggedInUser());
        passMessageToElement("balanceButton","Reveal Your Balance", "black");
        balanceRevealed = false;
    }
    else{
        passMessageToElement("loginMessageP","Please login to view Balance...", "red");
    }
}
//shows login menu when the user logs out.
function showLoginMenu(){
    if(loggedInUser()){
        showBalanceContent();
        showLogoutButton();
    }
    else{
    showContent(0);
    passMessageToElement("loginMessageP");
    hideLogoutButton();
    //reset the message to default (basically no username)
    fillUsernameFields("(Username)");
    }    
}
//hide all sections except that one passed as a parameter. using class names (content) in HTML.
function showContent(contentID){
    var ElementById = document.getElementById(contents[contentID]);
    for(let i =0; i<contents.length; i++){
        if(i != contentID){
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
//changes an element's innerHTML to a specified user message. assign a default value to 'message' as none to easily empty them elements,
// 'color' as 'white' because background is a dark color.
function passMessageToElement(elementId, message = "", color = "white"){
    var element = document.getElementById(elementId);
    element.innerHTML = message;    
    element.style.color= color;    
}
//resets all paragraph's innerHTML from a passed array that contains the id's of those paragraphs.
function resetMessages(messageFieldIds){
    messageFieldIds.forEach(function resetMessage(messageFieldId){
        passMessageToElement(messageFieldId);
    })
}
//Function that logs the user out when they click "logout". by removing the local storage key 'loggedInUser' and its value.
function logoutF(){
    localStorage.removeItem("loggedInUser");
    changeValue("accountNoInput");
    changeValue("pinNoInput");
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
//a function that fills out the user's name in the welcome message after they login.
function fillUsernameFields(username){
    var usernameFields = document.getElementsByClassName("username");
    for(let x = 0; x<usernameFields.length; x++){
        usernameFields[x].innerHTML = "Welcome "+username;
    }
}
//Updating the account's balance with (amount).
function updateAccountBalance(amount) {
    var newAmount = parseInt(parseInt(localStorage.getItem("Balance"))+parseInt(amount));
    localStorage.setItem("Balance", newAmount);
    var customerId = localStorage.getItem("loggedInUserId");
    if(!customerId){
        console.log("Customer ID was not fond in local storage. ATM.js error");
    }else{
        fetch(URL+'/api/update-balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                    customerId: customerId,
                    customerBalance: newAmount,
                }),
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                //do nothing, Balance update was successful.
                console.log("Successfully updated the user's balance in the database.");
            }
            else{
                console.error('Error updating user balance in the database: ', error);
            }
        })
        .catch(error => {
            console.error('Error updating user balance in the database: ', error);
        });
        updateRMNoteCount();
    }
    
}
//fetch the logged in user's balance from the array.
function getAccountBalance(){
    return localStorage.getItem("Balance");
}

function setBalance(balance){
    localStorage.setItem("Balance", balance);
}
function loggedInUser(){
    //return null if the item doesn't exist (user isn't logged in) and the user's index if the user is logged in.
    return localStorage.getItem("loggedInUser");
}

function changeValue(elementId, newValue = ""){
    document.getElementById(elementId).value = newValue;
}

function fillRMNotesArrays(){
    fetch(URL+'/api/fetch-notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.cash_id) {
            RMNotesId = [];
            RMNotes = [];
            RMNotesAvailable = [];
            for(let i = 0; i<data.cash_id.length; i++){
                //saving the values to a local variable to use easily
                RMNotesId.push(data.cash_id[i]);
                RMNotes.push(data.notes[i]);
                RMNotesAvailable.push(data.count[i]);
            }
        } else {//The below are 2 different paragraphs.
            var message = "Error fetching Notes' data from the database"
            passMessageToElement("availableNotesWP", message, "red");            
            passMessageToElement("availableNotesDP", message, "red");            

        }
    })
    .catch(error => {
        var message = "We're having a problem connecting to the database<br>Please try again later.<br>" + error;
        passMessageToElement("availableNotesWP", message, "red");
        passMessageToElement("availableNotesDP", message, "red");
    });
}

function updateRMNoteCount(){
    for(let i = 0; i<RMNotesId.length;i++){
        setTimeout(function (){
            fetch(URL+'/api/update-notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },body: JSON.stringify({
                        RMNotesId: RMNotesId[i],
                        RMNotesAvailable: RMNotesAvailable[i],
                    }),
            })
            .then(response => response.json())
            .then(data => {
                if(data){
                    //do nothing, RM Note count update was successful.
                }
                else{
                    console.error('Error updating RM Note count in the database: ', error);
                }
            })
            .catch(error => {
                console.error('Error updating RM Note count in the database: ', error);
            });
        }, 1000); 
}
}