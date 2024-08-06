// index 0 is the homepage, the order of the other pages will depend on the layout of the homepage and how are they ordered in it...
var contents = ["mainPage", "birds", "nocturnal", "safari", "reptiles"]
var currentIndex;
var moreIsShown = false;
function showContent(contentIndex){
    var subtitle = document.getElementById("subtitle");
    if(contentIndex != 0){
        subtitle.innerHTML = contents[contentIndex].toString().toUpperCase();
    }
    else{
        subtitle.innerHTML = "";
    }
    document.getElementById(contents[contentIndex]).style.display = "block";
    pageLoaded(contentIndex);
    currentIndex = contentIndex;
}
function pageLoaded(dontHide){
    showLess();
    //hide all pages except the dontHide index.
    for(let i = 0 ; i < contents.length; i++){
        if(i != dontHide){
            document.getElementById(contents[i]).style.display = "none";
        }
    }
}
function nextContent(){
if(currentIndex < contents.length-1){
    showContent(currentIndex+1);
}else{
    //DO NOTHING.
}
}
function previousContent(){
    if(currentIndex > 0){
        showContent(currentIndex-1);
    }else{
        //DO NOTHING.
    }
}


function showMore(){
    if(moreIsShown){showLess()}
    else{
    var showElements = document.getElementsByClassName("showMore");
    for (let i = 0; i<showElements.length; i++){
        showElements[i].style.display = "inline-block";
    }
    var showMoreB = document.getElementsByClassName("showMoreB");
    for (let i = 0; i<showMoreB.length; i++){
        showMoreB[i].innerHTML = "Show Less";
    }
    moreIsShown = true;
}
}

function showLess(){
    var showElements = document.getElementsByClassName("showMore");
    for (let i = 0; i<showElements.length; i++){
        showElements[i].style.display = "none";
    }
    var showMoreB = document.getElementsByClassName("showMoreB");
    for (let i = 0; i<showMoreB.length; i++){
        showMoreB[i].innerHTML = "Show More";
    }
    moreIsShown = false;
}