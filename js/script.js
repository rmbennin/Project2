//game variables
var game; //phaser game object
var background; //background
var player1Name, player2Name, name, score; //player info
var chef, ingredient; //sprites
var randNum, randX; //random numbers

function generateRand(){
	randX = 1 + Math.floor(Math.random() * 1000);
	randNum = 1 + Math.floor(Math.random() * 7);
}


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

function addIngredientToScreen(){
	
	switch(randNum){
		case 1:
			ingredient = game.add.sprite(randX, -70, "blackOlive");
			break;
		case 2:
			ingredient = game.add.sprite(randX, -70, "greenPepper");
			break;
		case 3:
			ingredient = game.add.sprite(randX, -70, "mushroom");
			break;
		case 4:
			ingredient = game.add.sprite(randX, -70, "pepperoni");
			break;
		case 5:
			ingredient = game.add.sprite(randX, -70, "pineapple");
			break;
		case 6:
			ingredient = game.add.sprite(randX, -70, "redPepper");
			break;
		case 7:
			ingredient = game.add.sprite(randX, -70, "yellowPepper");
			break;
	} //end switch
	
	ingredient.acceleration.y = 40;
    ingredient.body.collideWorldBounds = true;
} //end addIngredientToScreen function

// ==================================================LEVELS==================================================

function backgroundAndSprite(){
	
	blankScreen();
	generateRand();
			
	game = new Phaser.Game(1000, 600, Phaser.AUTO, "gameCanv", 
							{
								preload: preload, 
								create: create, 
								update: update 
							}
            );
	
} //end backgroundAndSprite function

//load in game assets
function preload() {
	game.load.atlasJSONHash("chef", "assets/sprites/chef-spritesheet.png", "assets/sprites/chef-spritesheet.json");
	game.load.image("blackOlive", "assets/ingredients/blackOlives.png");
	game.load.image("greenPepper", "assets/ingredients/greenPepper.png");
	game.load.image("mushroom", "assets/ingredients/mushrooms.png");
	game.load.image("pepperoni", "assets/ingredients/pepperoni.png");
	game.load.image("pineapple", "assets/ingredients/pineapple.png");
	game.load.image("redPepper", "assets/ingredients/redPepper.png");
	game.load.image("yellowPepper", "assets/ingredients/yellowPepper.png");
	//game.load.image("background", "assets/background.jpg");
}

function create() {
	
	//background = game.add.tileSprite(0, 0, 1000, 600, "background");
		
    //chef sprite
    chef = game.add.sprite(450, 340, "chef");
    chef.animations.add("walk");
    chef.animations.play("walk", 7, true);
    chef.anchor.setTo(.5, 0); //center flip area
    chef.body.collideWorldBounds = true;
	
	addIngredientToScreen();
	
} //end create function

function update(){
	    
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        chef.x -= 2; //move left
        chef.scale.x = 1; //face left
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        chef.x += 2; //move right
        chef.scale.x = -1; //face right
    }

    //check for collision with ingredient
    game.physics.collide(
         chef, 
         ingredient, 
         collisionHandler, 
         null, 
         this
    );
	
	if(ingredient.y >= 400){
		gameOverOne();
	}
		
} //end update function

function collisionHandler(chef, ingredient) {
	//add one to score
    score = $("#score p").html();
	score = parseInt(score);
    score ++;
	$("#score p").html(score);
	
    ingredient.kill();
	
	generateRand();
	addIngredientToScreen();
} //end collisionHandler function

function easyLevel(){
	backgroundAndSprite();
} //end easyLevel function

function mediumLevel(){
	backgroundAndSprite();
} //end mediumLevel function

function hardLevel(){
	backgroundAndSprite();
} //end hardLevel function

function backgroundAndSpriteTwo(){
	$("#playerOneCanv").css({"background":"url(assets/background.jpg)", "background-position":"left"});
	$("#playerTwoCanv").css({"background":"url(assets/background.jpg)", "background-position":"right"});
} //end backgroundAndSpriteTwo function

function twoPlayerLevel(){
	blankScreen();
	backgroundAndSpriteTwo();
	
	$("#gameContent").html("<h2>two player level</h2>"); //filler
} //end twoPlayerLevel function

// ==================================================SCOREBOARD==================================================

function scoreboard(){
	
	$.getJSON("js/scores.json", function(data){
				
		//top score
		$("#first .userName").html(data.topScores[0].name);
		$("#first td:last-child").html(data.topScores[0].score);
		
		//second place
		$("#second .userName").html(data.topScores[1].name);
		$("#second td:last-child").html(data.topScores[1].score);
		
		//third place
		$("#third .userName").html(data.topScores[2].name);
		$("#third td:last-child").html(data.topScores[2].score);
		
		//fourth place
		$("#fourth .userName").html(data.topScores[3].name);
		$("#fourth td:last-child").html(data.topScores[3].score);
		
		//fifth place
		$("#fifth .userName").html(data.topScores[4].name);
		$("#fifth td:last-child").html(data.topScores[4].score);
	});
	
} //end scoreboard function

function checkScoreboard(){
	$.getJSON("js/scores.json", function(data){
		if(score >= data.topScores[0].score){
			data.topScores[0].name = name;
			data.topScores[0].score = score;
			$("#gameContent").html("<h2>New High Score!</h2>");
		} else if(score >= data.topScores[1].score){
			data.topScores[1].name = name;
			data.topScores[1].score = score;
			$("#gameContent").html("<h2>New High Score!</h2>");
		} else if(score >= data.topScores[2].score){
			data.topScores[2].name = name;
			data.topScores[2].score = score;
			$("#gameContent").html("<h2>New High Score!</h2>");
		} else if(score >= data.topScores[3].score){
			data.topScores[3].name = name;
			data.topScores[3].score = score;
			$("#gameContent").html("<h2>New High Score!</h2>");
		} else if(score >= data.topScores[4].score){
			data.topScores[4].name = name;
			data.topScores[4].score = score;
			$("#gameContent").html("<h2>New High Score!</h2>");
		} else {
			$("#gameContent").html("<h2>No New High Score</h1>");
		}
	});
} //end checkScoreboard function

// ==================================================GAME OVER SCREENS==================================================

function gameOverOne(){
	
	chef.kill();
	ingredient.kill();
		
	/*$.get("gameOver_onePlayer.html", function(data){
		$("#gameContent").html(data);
	});*/
	
	checkScoreboard();
	scoreboard();
	
	return false;
	
} //end gameOverOne function

$("#goToLevelsScreen").click(levelsScreen);
$("#goToNameScreen").click(nameScreen);
$("#goToBlankScreen").click(blankScreen);
$("#goToTwoPlayer").click(blankScreen);