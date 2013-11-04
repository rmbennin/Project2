/*

	Developer Name: Rachelle Bennington;
    Date Created: October 14, 2013;

*/

//game variables
var game; //phaser game objects
var background; //background
var player1Name, player2Name, name, score, score1, score2; //player info
var chef, ingredient; //sprites
var randNum, randX; //random numbers
var difficulty; //difficulty of level
var count, counter; //countdown two player level

function generateRand(){
	randX = 1 + Math.floor(Math.random() * 1024);
	randNum = 1 + Math.floor(Math.random() * 7);
}

var firstName, secondName, thirdName, fourthName, fifthName;
//var firstScore, secondScore, thirdScore, fourthScore, fifthScore;

// ==================================================BLANK SCREEN==================================================

function blankScreen(){
	$("#gameContent").html("");
} //end blankScreen function

// ==================================================NAMES SCREEN==================================================

function nameScreen(){
	
	player1Name = "";
	score = 0;
	
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
	
	$("html, body").animate({ scrollTop: $(document).height() }, 5000);
		
} //end twoPlayerLevel function

$("#twoPlayerNext").click(generateTwoPlayerNames);

function generateTwoPlayerNames(){
	
	player1Name = $("#form-1-name").val();
	$("#1-userName").html(player1Name);
	
	player2Name = $("#form-2-name").val();
	$("#2-userName").html(player2Name);
	
	count = $("#secondsWanted").val();
	count = parseInt(count);
	
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
	
	switch(difficulty){
		case "easy":
			ingredient.body.gravity.y = .5;
			break;
		case "medium":
			ingredient.body.gravity.y = 1;
			break;
		case "hard":
			ingredient.body.gravity.y = 1.5;
			break;	
	} //end switch
	
    ingredient.body.collideWorldBounds = true;
} //end addIngredientToScreen function

function addIngredientToScreenTwo(){
	
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
	
	ingredient.body.gravity.y = .7;
    ingredient.body.collideWorldBounds = true;
} //end addIngredientToScreen function

// ==================================================GAME==================================================

function backgroundAndSprite(levelDifficulty){
		
	difficulty = levelDifficulty;
	
	blankScreen();
	generateRand();
			
	game = new Phaser.Game(1024, 512, Phaser.AUTO, "gameCanv", 
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
	game.load.image("background", "assets/background.jpg");
}

function create() {
	
	background = game.add.tileSprite(0, 0, 1024, 512, "background");
	
    //chef sprite
    chef = game.add.sprite(450, 320, "chef");
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
	
	if(ingredient.y >= 355){
		quitGame();
	}
		
} //end update function

function quitGame(){
	ingredient.kill();
	chef.kill();
	game.destroy();
	//checkScoreboard();
	
	gameOverOne();
} //end quitGame function

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

// ==================================================LEVELS==================================================

function easyLevel(){
	backgroundAndSprite("easy");
} //end easyLevel function

function mediumLevel(){
	backgroundAndSprite("medium");
} //end mediumLevel function

function hardLevel(){
	backgroundAndSprite("hard");
} //end hardLevel function

function twoPlayerLevel(){
	blankScreen();
	backgroundAndSpriteTwo();
} //end twoPlayerLevel function

// ==================================================TWO PLAYER STUFF==================================================

function backgroundAndSpriteTwo(){
	
	counter = setInterval(timer, 1000); //1000 will  run it every 1 second
	
	function timer(){
		count = count-1;
		if (count <= 0){
			clearInterval(counter);
			quitGameTwo();
		} //end if
		
		if(count < 10){
			$("#time").html("0:" + count + "0");
		} else {
			$("#time").html("0:" + count);
		}
		
	}
		
	blankScreen();
	generateRand();
			
	game = new Phaser.Game(1024, 512, Phaser.AUTO, "gameCanv", 
							{
								preload: preloadTwo, 
								create: createTwo, 
								update: updateTwo
							}
            );
			
} //end backgroundAndSprite function

//load in game assets
function preloadTwo() {
	game.load.atlasJSONHash("chef", "assets/sprites/chef-spritesheet.png", "assets/sprites/chef-spritesheet.json");
	game.load.image("blackOlive", "assets/ingredients/blackOlives.png");
	game.load.image("greenPepper", "assets/ingredients/greenPepper.png");
	game.load.image("mushroom", "assets/ingredients/mushrooms.png");
	game.load.image("pepperoni", "assets/ingredients/pepperoni.png");
	game.load.image("pineapple", "assets/ingredients/pineapple.png");
	game.load.image("redPepper", "assets/ingredients/redPepper.png");
	game.load.image("yellowPepper", "assets/ingredients/yellowPepper.png");
	game.load.image("background", "assets/background.jpg");
}

function createTwo() {
	
	background = game.add.tileSprite(0, 0, 1024, 512, "background");
		
    //chef sprite - player 1
    chef1 = game.add.sprite(100, 320, "chef");
    chef1.animations.add("walk");
    chef1.animations.play("walk", 7, true);
    chef1.anchor.setTo(.5, 0); //center flip area
    chef1.body.collideWorldBounds = true;
	
	//chef sprite - player 2
    chef2 = game.add.sprite(600, 320, "chef");
    chef2.animations.add("walk");
    chef2.animations.play("walk", 7, true);
    chef2.anchor.setTo(.5, 0); //center flip area
    chef2.body.collideWorldBounds = true;
	
	addIngredientToScreenTwo();
	
} //end create function

function updateTwo(){
	    
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        chef2.x -= 2; //move left
        chef2.scale.x = 1; //face left
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        chef2.x += 2; //move right
        chef2.scale.x = -1; //face right
    }
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
        chef1.x -= 2; //move left
        chef1.scale.x = 1; //face left
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
        chef1.x += 2; //move right
        chef1.scale.x = -1; //face right
    }

    //check for collision with ingredient (player one)
    game.physics.collide(
         chef1, 
         ingredient, 
         collisionHandlerOne, 
         null, 
         this
    );
	
	//check for collision with ingredient (player two)
    game.physics.collide(
         chef2, 
         ingredient, 
         collisionHandlerTwo, 
         null, 
         this
    );
	
	if(ingredient.y >= 355){
		ingredient.kill();
		generateRand();
		addIngredientToScreenTwo();
	}
		
} //end update function

function quitGameTwo(){	
	ingredient.kill();
	chef1.kill();
	chef2.kill();
	game.destroy();
	
	gameOverTwo();
} //end quitGame function

function collisionHandlerOne(chef, ingredient) {
	//add one to score
    score1 = $("#1-userScore").html();
	score1 = parseInt(score1);
    score1 ++;
	$("#1-userScore").html(score1);
	
    ingredient.kill();
	
	generateRand();
	addIngredientToScreenTwo();
} //end collisionHandler function

function collisionHandlerTwo(chef, ingredient) {
	//add one to score
    score2 = $("#2-userScore").html();
	score2 = parseInt(score2);
    score2 ++;
	$("#2-userScore").html(score2);
	
    ingredient.kill();
	
	generateRand();
	addIngredientToScreenTwo();
} //end collisionHandler function

// ==================================================SCOREBOARD==================================================

/*function scoreboard(){
	
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
			//push other scores/names down
			fifthName = fourthName;
			fifthScore = fourthScore;
			fourthName = thirdName;
			fourthScore = thirdScore;
			thirdName = secondName;
			thirdScore = secondScore;
			secondName = firstName;
			secondScore = firstScore;		
			
			firstScore = player1Name;
			firstScore = score;
			
			$("#first .userName").html(data.topScores[0].name);
			$("#first td:last-child").html(data.topScores[0].score);
			
			$("#gameContent").html("<h2 style='margin-top: -80px; color: #000;'>New High Score!</h2>");
		} else if(score >= data.topScores[1].score){
			//push other scores/names down
			fifthName = fourthName;
			fifthScore = fourthScore;
			fourthName = thirdName;
			fourthScore = thirdScore;
			thirdName = secondName;
			thirdScore = secondScore;
			
			secondName = player1Name;
			secondScore = score;
			
			$("#gameContent").html("<h2 style='margin-top: -80px; color: #000;'>New High Score!</h2>");
		} else if(score >= data.topScores[2].score){
			//push other scores/names down
			fifthName = fourthName;
			fifthScore = fourthScore;
			fourthName = thirdName;
			fourthScore = thirdScore;
			
			thirdName = player1Name;
			thirdScore = score;
			
			$("#gameContent").html("<h2 style='margin-top: -80px; color: #000;'>New High Score!</h2>");
		} else if(score >= data.topScores[3].score){
			//push other scores/names down
			fifthName = fourthName;
			fifthScore = fourthScore;
			
			fourthName = player1Name;
			fourthScore = score;
						
			$("#gameContent").html("<h2 style='margin-top: -80px; color: #000;'>New High Score!</h2>");
		} else if(score >= data.topScores[4].score){
			fifthName = player1Name;
			fifthScore = score;
			
			$("#gameContent").html("<h2 style='margin-top: -80px; color: #000;'>New High Score!</h2>");
		} else {
			$("#gameContent").html("<h2 style='margin-top: -80px; color: #000;'>No New High Score</h1>");
		}
		
	});
	
} //end checkScoreboard function*/

// ==================================================GAME OVER SCREENS==================================================

function gameOverOne(){
	$.get("gameOver_onePlayer.html", function(data){
		$("#gameContent").append(data);
	});
} //end gameOverOne function

function gameOverTwo(){
	
	$.get("gameOver_twoPlayer.html", function(data){
		$("#gameContent").append(data);
		
		if(score1 > score2){
			$("#winningPlayer").html(player1Name + " wins!");
		} else if(score2 > score1){
			$("#winningPlayer").html(player2Name + " wins!");
		} else if(score1 == score2){
			$("#winningPlayer").html("It's a tie!");
		} //end if else
	});
	
} //end gameOverOne function

$("#goToLevelsScreen").click(levelsScreen);
$("#goToNameScreen").click(nameScreen);
$("#goToBlankScreen").click(blankScreen);