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
        game.drawImage(me.image, this.framePosition.col * me.width, this.framePosition.row * me.height, me.width, me.height, (this.scale.x * this.x) - me.width/2, this.scale.y * this.y, me.width, me.height);
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

Sprite.prototype.removeSprite = function() {
	
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