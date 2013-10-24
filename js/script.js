// ==================================================NAMES SCREEN==================================================

function nameScreen(){
			
	$.get("nameScreen.html", function(data){
		$("#gameContent").html(data);
	});
	
} //end nameScreen function

$("#nextButton").click(generateName);
		
function generateName(){
	
	$("#userName").html($("#form-name").val());
	levelsScreen();
	
} //end generateName function

// ==================================================LEVELS SCREEN==================================================

function levelsScreen(){
			
	$.get("levelsScreen.html", function(data){
		$("#gameContent").html(data);
	});
	
} //end levelsScreen function
	
$("#easyLevel").click(easyLevel);
$("#mediumLevel").click(mediumLevel);
$("#hardLevel").click(hardLevel);
$("#twoPlayerLevel").click(twoPlayerLevel);

// ==================================================LEVELS==================================================

function easyLevel(){
		
	$("#gameContent").html("<h2>easy level</h2>");
	
} //end easyLevel function

function mediumLevel(){
	
	$("#gameContent").html("<h2>medium level</h2>");
	
} //end mediumLevel function

function hardLevel(){
	
	$("#gameContent").html("<h2>hard level</h2>");
	
} //end hardLevel function

function twoPlayerLevel(){
	
	$("#gameContent").html("<h2>two player level</h2>");
	
} //end twoPlayerLevel function