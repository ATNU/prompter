//PREPARE THE SCRIPT
function partMaker(uploadFileName){
//Hide the <div id="results">
var resultsDiv = document.getElementById('desk2');
resultsDiv.style.display="none";
	
//Obtain the XML of the play
var Connect = new XMLHttpRequest();
Connect.open("GET", uploadFileName, false); //
Connect.setRequestHeader('Content-Type','text/xml');
Connect.send();
TheXML = Connect.responseXML; //note that this is a global variable
console.log(TheXML);

//Count number of acts
var collectionofActs = TheXML.querySelectorAll('[type="act"]');
//console.log(collectionofActs);
var numberofActs = collectionofActs.length;
//console.log(numberofActs);

//Append an act div for each act to the 'part'
var i;
for (i = 0; i <numberofActs; i++){
	var anAct = document.createElement('Div');
	var actNumber = i+1;
	anAct.id ='act '+ actNumber;
	document.getElementById('part').appendChild(anAct);
	}  
  
//Pull out all the lines (<sp> tags) from the XML
var allSP = TheXML.getElementsByTagName("sp");
var i;
var numberOfSP = allSP.length;

//Loop through each <sp> of the xml to generate the script for the part
for (i = 0; i < numberOfSP; i++) {
	var theSP = allSP[i];
	//console.log(theSP);
	//console.log(theSP.children);
	//console.log(theSP.children.length);

	//find the act of the <sp>
	var parentAct = $( theSP ).closest('[type~="act"]');
	//console.log(parentAct);
	var nextSiblingsOfAct = $( parentAct ).nextAll('div');
	//console.log(nextSiblingsOfAct);
	var numberofActSiblings = nextSiblingsOfAct.length;
	//console.log(numberofActSiblings);
	var thisActNumber = numberofActs - numberofActSiblings;

	//Place the <div class="sp"> in the correct act's <div> ready to receive additional elements from XML's <sp>
	var theSPDiv = document.createElement("div");
	theSPDiv.className = "sp";
	document.getElementById("act "+thisActNumber).appendChild(theSPDiv);

	//Subloop through each element in XML's <sp>
		for (j=0;j<theSP.children.length;j++){
		//Series of ifs to cover all elements of a <sp> in TEI, appending each as HTML to my <div id="part">
			if (theSP.children[j].tagName === 'speaker'){
				//Get the text of <speaker>
				var theSpeaker = theSP.children[j].textContent;
				theSpeaker = theSpeaker.trim();
				//console.log(theSpeaker);
				//create a <div class="speaker">
				var theSpeakerDiv = document.createElement("div");
				theSpeakerDiv.className = "speaker";
				//create a text node and put the text of <speaker> from the XML in it
				var theSpeakerTextNode = document.createTextNode(theSpeaker);
				//put the text node into the <div class="speaker">
				theSpeakerDiv.appendChild(theSpeakerTextNode);
				theSPDiv.appendChild(theSpeakerDiv);
			}
			if (theSP.children[j].tagName === 'p'){
				//Get the text of <p>
				var theP = theSP.children[j].textContent;
				//console.log(theP);	
				//create a <div class="speech">
				var thePDiv = document.createElement("div");
				thePDiv.className = "speech";
				//create a text node from the value of the XML's <p> and put it into the <div class="speech"> 
				var thePTextNode = document.createTextNode(theP);
				thePDiv.appendChild(thePTextNode);
				theSPDiv.appendChild(thePDiv);

			}
			if (theSP.children[j].tagName === 'l'){
				//Get the text of <l>
				var theL = theSP.children[j].textContent;
				//console.log(theL);	
				//create a <div class="verse-line">
				var theLDiv = document.createElement("div");
				theLDiv.className = "verse-line";
				//create a text node from the value of the XML's <p> and put it into the <div class="speech"> 
				var theLTextNode = document.createTextNode(theL);
				theLDiv.appendChild(theLTextNode);
				theSPDiv.appendChild(theLDiv);
			}
		  
		  
		}//end of subloop for <sp>'s possible elements

	}//end of loop through all <sp> in source XML: part <div> is now complete 


}//end of function

//TRIM LONG CHARACTER LISTS
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

//GENERATE LIST OF SPEECH HEADINGS
function charList(){
var allSpeechHeadings = document.getElementsByClassName("speaker");
var varheadingList =[];
	//alert (allSpeechHeadings.length);

	for(var i=0;i<allSpeechHeadings.length;i++){
	var speechHeading = allSpeechHeadings[i].innerHTML;
	varheadingList.push(speechHeading);
	}
	//console.log(varheadingList);
var dramatisPersonae = varheadingList.filter( onlyUnique );
//console.log(dramatisPersonae);
dramatisPersonae.sort();
var myDiv = document.getElementById("selectionMenu");

//Create and append select list
var selectList = document.createElement("select");
selectList.id = "mySelect";
selectList.multiple = "multiple";
selectList.size = dramatisPersonae.length;
myDiv.appendChild(selectList);

//Create and append the options
for (var i = 0; i < dramatisPersonae.length; i++) {
    var option = document.createElement("option");
    option.value = dramatisPersonae[i];
    option.text = dramatisPersonae[i];
    selectList.appendChild(option);
	}

//Removes Loading... placeholder	
var patienceDiv = document.getElementById('patience');
patienceDiv.style.display="none";
	
}//end of function

function displayPart(){
//Generates an array with all the speech headings used for generating parts
selectedPersonae = [];
var selVerbs = document.getElementById('mySelect');
var vb;
var count = 0;
for (vb=0; vb<selVerbs.options.length; vb++) {
		if (selVerbs.options[vb].selected) {
			selectedPersonae[count] = selVerbs.options[vb].value;
			count++;
		};
	}
var chosenHeadings=selectedPersonae;

//Hides all lines
var speeches = document.getElementsByClassName("sp");
for (var i=0;i<speeches.length;i++){
	var badspeech = speeches[i];
	badspeech.style.display = "none";
}

//Reveals the <div id="part"> ready to receive lines
var thePartDiv = document.getElementById("part");
thePartDiv.style.display="block";

//Reveals speaker's lines
var mySpans = document.getElementsByClassName("speaker");
var numberOfSpeeches = mySpans.length;
//Loops through all the <div class="sp"> in the part
for(var i=0;i<numberOfSpeeches;i++){
	//Loops through all <speaker> divs to find those that match
	for(var j=0;j<chosenHeadings.length;j++){
		if (mySpans[i] == undefined){}//attempt to avoid issues with too many headings	
		else if(mySpans[i].innerHTML == chosenHeadings[j]){
			//console.log(mySpans[i]);
			var parent = mySpans[i].parentNode;
			//console.log(parent);
			parent.style.display = "block"; //reveals all speaker divs
				if($( parent ).is(':first-child')){}else{ //this statement accounts for the first line of the play or act
				var cueline = parent.previousSibling;
				//console.log(cueline);
				$(cueline).find('div:first').remove();
				//break - necessary for testing this part of the loop
				var cue = cueline.innerHTML;
				//console.log(cue);
				
				//remove all tags from cueline
				var text = $("<div/>").html(cue).text();
				//console.log(text);

				//convert text into array
				var stringText = text.toString();
				//console.log(stringText);
				var textArray = stringText.split(" "); //this creates an array with a lot of empty values at start and end
				//console.log(textArray);
				var arrayLength = textArray.length;

				//clean array
				var newArray = textArray.filter(Boolean);
				//console.log(newArray);
				newArray = newArray.filter(item => item !== '\n'); //trims out problematic  '\n' elements 		
				//console.log(newArray);
				let forDeletion = [";\n", ",\n", ".\n","-\n","!\n","?\n","&\n","(\n",")\n",":\n","~\n","}\n","]\n"]; //removes punctuation
				newArray = newArray.filter(item => !forDeletion.includes(item));
				//console.log(newArray);

				//find the cue words in the new array
				var pointA = newArray.length-1;
				var a = newArray[pointA];
				//console.log(a);
				var pointB = newArray.length-2;
				var b = newArray[pointB];
				//console.log(b);
				var pointC = newArray.length-3;
				var c = newArray[pointC];
				//console.log(c);
				var pointD = newArray.length-4;
				var d = newArray[pointD];
				//console.log(d);

				//update the cue line to match the cue words according to the type of cue selected
				var cueSize = document.querySelector('input[name="size"]:checked').value;
				if(cueSize === "1"){
					var thecue = '-------- '+a;}
				if(cueSize === "2" && b != undefined){
					var thecue = '-------- '+b+' '+a;}
				if(cueSize === "2" && b === undefined){
					var thecue = '-------- '+a;}
				if(cueSize === "4" && b != undefined && c != undefined && d != undefined){
					var thecue = '-------- '+d+' '+c+' '+b+' '+a;}
				if(cueSize === "4" && b ===undefined && c===undefined && d===undefined){
					var thecue = '-------- '+a;}
				if(cueSize === "4" && b !=undefined && c===undefined && d===undefined){
					var thecue = '-------- '+b+' '+a;}
				if(cueSize === "4" && b !=undefined && c!=undefined && d===undefined){
					var thecue = '-------- '+c+' '+b+' '+a;}
				
				if (cueSize === "full"){
					var thecue=stringText}
				//console.log(thecue);

				cueline.innerHTML = thecue;
				cueline.style.display = "block";//reveals cueline
				}				
			} 
		}	

	}
	
//Adds titles to acts
var numberofActs = $("[id~='act']").length;
//console.log(numberofActs);
var i;
for (i = 0; i <numberofActs; i++){
	var actNumber = i+1;
	var actTitle = document.createElement('Div');
	actTitle.innerHTML = 'Act '+ actNumber;
	actTitle.className = 'actTitle';
	var actToBeEntitled = 'act '+ actNumber;
	document.getElementById(actToBeEntitled).prepend(actTitle);
	}
	
var deskDiv = document.getElementById('desk');
deskDiv.style.display="none";

//Reveal the <div id="desk2"> and the <div id="results"> child
var resultsDiv = document.getElementById('results');
resultsDiv.style.display="block";
var desk2Div = document.getElementById('desk2');
desk2Div.style.display="block";

}//end of function

function restart(uploadFileName){
//Reveal the loading div
var loadingDiv = document.getElementById('patience');	
loadingDiv.style.display="block";
	
//wipe the <div id="part">
var partDiv = document.getElementById('part');
while(partDiv.firstChild){
    partDiv.removeChild(partDiv.firstChild);
}

//wipe the select menu
var charSelectMenu = document.getElementById('mySelect');
charSelectMenu.parentNode.removeChild(charSelectMenu);

//set display:none for the whole desk2 area
var resultsDiv = document.getElementById('desk2');
resultsDiv.style.display="none";
//run the onload scripts again	
partMaker(uploadFileName);
charList();
//Reveal the <div id="selection"> 
var selectionDiv = document.getElementById('desk');
selectionDiv.style.display="table";

//Hide the loading div
loadingDiv.style.display="none";

}//end of function

//PASSES NAME OF PLAY TO PHP IN A NEW WINDOW
function fullPlay(myURL){
    var my_data = myURL;
    window.open('full-play.php?my_data='+my_data);
}//end of function

//PRINTS THE PART
function printer (){
   var name=window.prompt("Please tell the Prompter whose Part this is:","----");
   var playName = TheXML.querySelector('title').textContent;
   var html="<html>";
   html+="<head>";
   html+="<link rel=\"stylesheet\" type=\"text/css\" href=\"http://prompter.jharrimansmith.net/print.css\">";
   html+="</head>";
   html+="<body>"
   html+="<div id=\"partTitle\"><h1>The part of <i>"+name+"</i> in <i>"+playName+"</i></h1></div>";
   html+= document.getElementById("part").innerHTML;
   html+="</body>"
   html+="</html>";
   

   var printWin = window.open('','','left=0,top=0,scrollbars=0,status  =0');
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
   printWin.print();
} 