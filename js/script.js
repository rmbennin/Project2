var player1Name, player2Name, chef;
var keys = {};

function Sprite(swidth, sheight, sheetUrl) {
                
    var me = this;
    
    this.animations = [];
    this.x = 0;
    this.y = 0;
    this.curFrame = 0;
    this.width = 0;
    this.height = 0;
    this.delay = 20;
    this.dcount = 0;
    this.perLine = 0;
    this.rows = 0;
    this.framePosition = {col:0, row:0};
    this.curAnimation = "";
    this.scale = { x: 1, y: 1 };
    this.name = "";
    
    this.image = new Image();
    this.image.src = sheetUrl;
    
    this.image.addEventListener("load", function() {
        //calc number of frames per line
        me.perLine = Math.floor( me.image.width / swidth );
        //calc number of lines
        me.rows = Math.floor( me.image.height / sheight );
    });
    
    me.width = swidth;
    me.height = sheight;
    
    this.update = function() {
        
        //position
        
        //draw
        this.dcount ++;
        if(this.dcount >= this.delay) {
            this.dcount = 0;
            this.curFrame ++;
            
            if(this.curFrame >= me.animations[me.curAnimation].length) {
                this.curFrame = 0;
            }
            
            //set row & col position
            this.framePosition.row = Math.floor( me.animations[me.curAnimation][me.curFrame] / me.perLine );
            this.framePosition.col = me.animations[me.curAnimation][me.curFrame] % me.perLine;
        }
        
        game.save();
        game.scale(me.scale.x, me.scale.y);
        game.drawImage(chef.image, this.framePosition.col * me.width, this.framePosition.row * me.height, me.width, me.height, (this.scale.x * this.x) - me.width/2, this.scale.y * this.y, me.width, me.height);
        game.restore();
    }
}

Sprite.prototype.addAnimation = function(name, frames) {
    
    this.animations[name] = frames;
}

Sprite.prototype.play =  function(name) {
    //console.log(this.name);
    //console.log(this.animations)
    this.dcount = this.delay;
    this.curFrame = 0;
    this.curAnimation = name;
}

// Does a hit test against another sprite. Returns true if they are overlapping
Sprite.prototype.hitTest = function(other) {
	
    //bottom right versus top left
    //top left versus bottom right
     if (this.x + this.width < other.x || 
         this.y + this.height < other.y || 
         this.x > other.x + other.width || 
         this.y < other.y + other.height) 
     {
        return false; 
     }
    
    return true;
   
} //end hitTest

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

// ==================================================LEVELS==================================================

function backgroundAndSprite(){
	
	blankScreen();
	$("#gameCanv").css("background", "url(assets/background.jpg)");
	
	var canvas = document.getElementById("gameCanv");
	game = canvas.getContext("2d");
	
	chef = new Sprite(194, 225, "assets/chef-spritesheet.png");
	chef.addAnimation("walk", [ 3, 2, 1, 0, 1, 2 ]);
	chef.play("walk");
	chef.x = 0;
	chef.y = 0;
	
	requestAnimationFrame(update);
	
	score = $("#score").html();
	score = parseInt(score);
	
	document.addEventListener("keydown", function(event){
		keys[event.keyCode] = true;
	}) //end onkeydown function
	
	document.addEventListener("keyup", function(event){
		keys[event.keyCode] = false;
	}) //end onkeydown function
		
	function update(){
		
		game.clearRect(0, 0, 1000, 600);
		chef.update();
		//secondSprite.update();
		
		/*if(chef.hitTest(secondSprite) ) {
			score ++;
			$("#score").html(score);
		} //end if statement*/
		
		if(keys[37]) {
			chef.x --;
			chef.scale.x = -1;
		} else if(keys[39]){
			chef.x ++;
			chef.scale.x = 1;
		} //end if else statement
		
		requestAnimationFrame(update);
	} //end update function
	
} //end backgroundAndSprite function

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