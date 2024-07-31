var array = [];
var output = document.getElementById("output");
var arrayElement = 0;
const RMNotes = [1,5,10,20,50,100];
//start with an empty note drawer.
var RMAvailableNotes = [0,0,0,0,0,0];
var addAvailableSelection = document.getElementById("addAvailableSelection");
var sumOfAllNotes = 0;

function addName(){
    var name = document.getElementById("name_input").value;
    var count = 0;
    output.innerHTML = "Your array Looks Like this var array = [";
    array[arrayElement] = name;
    arrayElement++;
    array.forEach(function showArray(item){
        count++;
        output.innerHTML += "\"" + item + "\"";
        if(arrayElement == count){
            //nothing
        }else{
            output.innerHTML +=", ";
        }
    });
    output.innerHTML += "]<br><b>Your array has "+(arrayElement) + " items, and the last value's index is "+ (arrayElement-1)+"<b>";
}

function fillOptionsMenu(){
    RMNotes.forEach(function addNotesToSelect(RMNote){
        var opt = document.createElement("option");
        opt.value = RMNote;
        opt.innerHTML = "RM"+RMNote;
        addAvailableSelection.appendChild(opt);
    });
}

function addNotes(){
   var selectedNote = addAvailableSelection.value;
   var addToAvailableNotesInput = document.getElementById("addToAvailableNotesInput").value;
   var indexOfCurrentNoteFromRMNotes = RMNotes.indexOf(parseInt(selectedNote));

   addToAvailableNotesInput = parseInt(addToAvailableNotesInput);
   RMAvailableNotes[indexOfCurrentNoteFromRMNotes] += addToAvailableNotesInput; 
   output.innerHTML = "";
   RMAvailableNotes.forEach(function countAvailable(RMAvailableNote, indexOfRMAvailableNotes){

    var sumOfCurrentNote = 0;
    var RMNoteValue = RMNotes[indexOfRMAvailableNotes];
    sumOfCurrentNote = RMAvailableNote * RMNoteValue;
   
    output.innerHTML += "There is RM"+sumOfCurrentNote + " of "+RMNoteValue +"(RM) notes ("+sumOfCurrentNote/RMNoteValue+" Notes).<br>";

   });
   output.innerHTML += "<br>Sum of all available notes: RM"+sumOfAllNotes;

}

function removeNotes(){
    var selectedNote = addAvailableSelection.value;
    var addToAvailableNotesInput = document.getElementById("addToAvailableNotesInput").value;
    var indexOfCurrentNoteFromRMNotes = RMNotes.indexOf(parseInt(selectedNote));
    addToAvailableNotesInput = parseInt(addToAvailableNotesInput);
    RMAvailableNotes[indexOfCurrentNoteFromRMNotes] -= addToAvailableNotesInput;
    refillParagraph("sub")  
 }

 function refillParagraph(sumOrSub){
    output.innerHTML = "";
    RMAvailableNotes.forEach(function countAvailable(RMAvailableNote, indexOfRMAvailableNotes){
 
     var sumOfCurrentNote = 0;
     var RMNoteValue = RMNotes[indexOfRMAvailableNotes];
     sumOfCurrentNote = RMAvailableNote * RMNoteValue;
     if(sumOrSub == "sub"){sumOfAllNotes = sumOfAllNotes - sumOfCurrentNote;}
     else{sumOfAllNotes += sumOfCurrentNote;}
     
     output.innerHTML += "There is RM"+sumOfCurrentNote + " of "+RMNoteValue +"(RM) notes ("+sumOfCurrentNote/RMNoteValue+" Notes).<br><br>";
 
    });
    output.innerHTML += "<br>Sum of all available notes: RM"+sumOfAllNotes;
 }

function toggleTheme(){
    var changeThemesClass = document.getElementsByClassName("changeTheme");

    for(let i=0;i<changeThemesClass.length;i++){
        changeThemesClass[i].classList.toggle("dark-theme");
    };
}