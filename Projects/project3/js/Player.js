//Player objects

// Sets the properties with the provided arguments or defaults
function Player(x,y,distance,downKey,upKey,leftKey,rightKey,sound) {
  //position
  this.x = x;
  this.y = y;
  //describes change in X and Y values for player movement
  this.deltaX = 0;
  this.deltaY = 0;

  //input
  this.distance = distance;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;

  //directional markers and 'go now' boolean
  this.flagsActive = false;
  this.nowGo = false;

  //player color data
  this.playerColorDefault = color(255,255,255,255);
  this.playerColorCurrent = color(255,255,255,255);

  //is the player visible to enemies?
  this.playerInvisible = false;

  //player sprite data
  this.sprite;
  this.animation;

  //player sound
  this.sound = sound;

}

//take player input
Player.prototype.keyPressed = function() {
  if (keyCode === this.upKey) {
    this.sound.play();
    //activate directional arrows
    this.flagsActive = true;
    //store change in X and Y relative to the 'grid'
    this.deltaY += -this.distance;
  }
  else if (keyCode === this.downKey) {
    this.sound.play();
    this.flagsActive = true;
    this.deltaY += this.distance;
  }else if (keyCode === this.leftKey){
    this.sound.play();
    this.flagsActive = true;
    this.deltaX += -this.distance;
  }else if (keyCode === this.rightKey){
    this.sound.play();
    this.flagsActive = true;
    this.deltaX += this.distance;
  }


  //make sure that change in X and Y does not go further than one point on the grid
  this.deltaX = constrain(this.deltaX, -this.distance, this.distance)
  this.deltaY = constrain(this.deltaY, -this.distance, this.distance)
}
//draw the player object
Player.prototype.drawPlayer = function(){
  console.log(this.playerColorCurrent);
  //draw player tile
  stroke(this.playerColorDefault);
  strokeWeight(3);
  fill(this.playerColorCurrent);
  ellipse(this.x,this.y,this.distance);
  noStroke();

//draw player sprite and animation at proper rotation
  if(this.deltaX > 0 && this.deltaY === 0){
    this.sprite.rotation = 90;
  }else if(this.deltaX > 0 && this.deltaY > 0){
    this.sprite.rotation = 120;
  }else if(this.deltaX > 0 && this.deltaY < 0){
    this.sprite.rotation = 45;
  }else if(this.deltaX === 0 && this.deltaY < 0){
    this.sprite.rotation = 0;
  }else if(this.deltaX === 0 && this.deltaY > 0){
    this.sprite.rotation = 180;
  }else if(this.deltaX < 0 && this.deltaY < 0){
    this.sprite.rotation = -45;
  }else if(this.deltaX < 0 && this.deltaY === 0){
    this.sprite.rotation = -90;
  }else if(this.deltaX < 0 && this.deltaY > 0){
    this.sprite.rotation = -120;
  }





}

//draw markers for where it's going, to be used before a 'move' timer has counted down
Player.prototype.drawDirectionArrows = function(timeLeft){
  if(this.flagsActive === true && this.deltaX != 0 || this.deltaY != 0){
    //map opacity of flag to countdown
      fill(this.playerColorDefault,map(timeLeft,0,10,255,50));
      //draw movement flags
      ellipse(this.x+this.deltaX,this.y+this.deltaY,this.distance/2);
      stroke(this.playerColorDefault,map(timeLeft,0,10,255,50));
      strokeWeight(4);
      line(this.x,this.y,this.x+this.deltaX,this.y+this.deltaY);
      noStroke();

  }
}

//push player movement in whatever direction chosen, then reset booleans to do it again
Player.prototype.moveAfterWait = function(){
  //make sure player is actually on a tile; had to do this to solve a weird bug
  if(this.x % this.distance != 0 || this.y % this.distance != 0){
    this.x = Math.floor(this.x/this.distance)*this.distance;
    this.y = Math.floor(this.y/this.distance)*this.distance;
  }
  //if color is default, player can move
  if(player.playerColorCurrent === player.playerColorDefault){
  if(this.nowGo === true){
    this.x += this.deltaX;
    this.y += this.deltaY;
    this.nowGo = false;
    this.flagsActive = false;
    this.deltaX = 0;
    this.deltaY = 0;
  }
  //if player color is not default, player can't move
}else if(player.playerColorCurrent != player.playerColorDefault){
this.deltaX = 0;
this.deltaY = 0;
}

}
