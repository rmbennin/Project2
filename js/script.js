var player1Name, player2Name, game, pepperoni, chef;
var keys = {};

// ==================================================BLANK SCREEN==================================================

function blankScreen(){
	$("#gameContent").html("");
} //end blankScreen function

// ==================================================NAMES SCREEN==================================================

function nameScreen(){
	
	$.get("initialAboveGameContent.html", function(data){
		$("#aboveGame").html(data);
	});
	
	$.get("initialGameContent.html", function(data){
		$("#game").html(data);
	});
			
	$.get("nameScreen.html", function(data){
		$("#gameContent").html(data);
	});
	
} //end nameScreen function

$("#nextButton").click(generateName);
		
function generateName(){
	
	player1Name = $("#form-name").val();
	$("#userName").html(player1Name);
	levelsScreen();
	
} //end generateName function

function namesTwoPlayerLevel(){
		
	$.get("twoPlayerAboveGameContent.html", function(data){
		$("#aboveGame").html(data);
	});
	
	$.get("twoPlayerGameContent.html", function(data){
		$("#game").html(data);
	});
	
	$.get("namesTwoPlayerScreen.html", function(data){
		$("#gameContent").html(data);
	});
		
} //end twoPlayerLevel function

$("#twoPlayerNext").click(generateTwoPlayerNames);

function generateTwoPlayerNames(){
	
	player1Name = $("#form-1-name").val();
	$("#1-userName").html(player1Name);
	
	player2Name = $("#form-2-name").val();
	$("#2-userName").html(player2Name);
	
	twoPlayerLevel();
	
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
$("#twoPlayerLevel").click(namesTwoPlayerLevel);


// ==================================================INGREDIENTS==================================================

function generateIngredient(){
		
	pepperoni = new Sprite(61, 46, "assets/ingredients/pepperoni.png");
	pepperoni.addAnimation("fall", [0]);
	pepperoni.play("fall");
	pepperoni.x = 400;
	pepperoni.y = 100;
	
} //end generateIngredient function

// ==================================================LEVELS==================================================

function backgroundAndSprite(){
	blankScreen();
	$("#gameCanv").css("background", "url(assets/background.jpg)");
	
	var canvas = document.getElementById("gameCanv");
	game = canvas.getContext("2d");
	
	chef = new Sprite(194, 225, "assets/chef-spritesheet.png");
	chef.addAnimation("walk", [ 3, 2, 1, 0, 1, 2 ]);
	chef.play("walk");
	chef.x = 500;
	chef.y = 370;
	
	generateIngredient();
	
	requestAnimationFrame(update);
	
	score = $("#score p").html();
	score = parseInt(score);
	
} //end backgroundAndSprite function
document.addEventListener("keydown", function(event){
	keys[event.keyCode] = true;
}) //end onkeydown function

document.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
}) //end onkeydown function	
function update(){
	
	game.clearRect(0, 0, 1000, 600);
	chef.update();
	pepperoni.update();
	
	if(chef.hitTest(pepperoni) ) {
		score ++;
		$("#score p").html(score);
		pepperoni.removeSprite();
	} //end if statement
	
	//check for collision
    game.physics.collide(
         sprite,
         group, 
         collisionHandler, 
         null, 
         this
    );
	
	if(keys[37]) {
		chef.x --;
		chef.scale.x = 1;
	} else if(keys[39]){
		chef.x ++;
		chef.scale.x = -1;
	} //end if else statement
	
	requestAnimationFrame(update);
} //end update function

function collisionHandler(chef, ingredient) {
    hairball.kill();   
} //end collisionHandler function
	
function backgroundAndSpriteTwo(){
	
	$("#playerOneCanv").css({"background":"url(assets/background.jpg)", "background-position":"left"});
	$("#playerTwoCanv").css({"background":"url(assets/background.jpg)", "background-position":"right"});
		
} //end backgroundAndSpriteTwo function

function easyLevel(){
	
	backgroundAndSprite();
	
	$("#gameContent").html("<h2>easy level</h2>"); //filler
		
} //end easyLevel function

function mediumLevel(){
	
	backgroundAndSprite();
	
	$("#gameContent").html("<h2>medium level</h2>"); //filler
	
} //end mediumLevel function

function hardLevel(){
	
	backgroundAndSprite();
	
	$("#gameContent").html("<h2>hard level</h2>"); //filler
	
} //end hardLevel function

function twoPlayerLevel(){
	
	blankScreen();
	backgroundAndSpriteTwo();
	
	$("#gameContent").html("<h2>two player level</h2>"); //filler
					
} //end twoPlayerLevel function

// ==================================================GAME OVER SCREENS==================================================

$("#goToLevelsScreen").click(levelsScreen);
$("#goToNameScreen").click(nameScreen);
$("#goToBlankScreen").click(blankScreen);
$("#goToTwoPlayer").click(blankScreen);