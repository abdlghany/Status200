var contents = ["mainPage", "birds", "nocturnal", "safari", "reptiles"]
var moreIsShown = false;
function showContent(contentIndex){
    var content = document.getElementById(contents[contentIndex]);
    var subtitle = document.getElementById("subtitle");
    subtitle.innerHTML = contents[contentIndex].toString().toUpperCase();
    document.getElementById(contents[contentIndex]).style.display = "block";
    pageLoaded(contentIndex);
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