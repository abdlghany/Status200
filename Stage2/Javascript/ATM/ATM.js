function loginF(){
    return null;
}
function withdrawF(){
    return null;
}
function depositF(){
    return null;
}
function balanceF(){
    return null;
}

function showWithdrawContent(){
    showContent("contentWithdraw");
}
function showDepositContent(){
    showContent("contentDeposit");
}
function showBalanceContent(){
    showContent("contentBalance");
}
function showLoginMenu(){
    showContent("contentLogin");
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