//Player objects

// Sets the properties with the provided arguments or defaults
function Player(x,y,distance,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  //describes change in X and Y values for player movement
  this.deltaX = 0;
  this.deltaY = 0;

  this.distance = distance;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;

  this.flagsActive = false;
  this.nowGo = false;
  this.playerCamo = false;

}

//take player input
Player.prototype.keyPressed = function() {
  if (keyCode === this.upKey) {
    console.log('up key pressed');
    //activate directional arrows
    this.flagsActive = true;
    //store change in X and Y relative to the 'grid'
    this.deltaY += -this.distance;
  }
  else if (keyCode === this.downKey) {
    console.log('down key pressed');
    this.flagsActive = true;
    this.deltaY += this.distance;
  }else if (keyCode === this.leftKey){
    console.log('left key pressed');
    this.flagsActive = true;
    this.deltaX += -this.distance;
  }else if (keyCode === this.rightKey){
    console.log('right key pressed');
    this.flagsActive = true;
    //this.x += this.distance;
    this.deltaX += this.distance;
  }
  //make sure that change in X and Y does not go further than one point on the grid
  this.deltaX = constrain(this.deltaX, -this.distance, this.distance)
  this.deltaY = constrain(this.deltaY, -this.distance, this.distance)
}
//draw the player object
Player.prototype.drawPlayer = function(){
  fill(255,0,0);
  ellipse(this.x,this.y,this.distance);
}

//draw markers for where it's going, to be used before a 'move' timer has counted down
Player.prototype.drawDirectionArrows = function(timeLeft){
  if(this.flagsActive === true && this.deltaX != 0 || this.deltaY != 0){
    //map opacity of flag to countdown
      fill(255,0,0,map(timeLeft,0,10,255,50));
      //draw movement flags
      ellipse(this.x+this.deltaX,this.y+this.deltaY,this.distance/2);
  }
}

//push player movement in whatever direction chosen, then reset booleans to do it again
Player.prototype.moveAfterWait = function(){
  if(this.nowGo === true && (this.deltaX != 0 || this.deltaY != 0)){
    this.x += this.deltaX;
    this.y += this.deltaY;
    this.nowGo = false;
    this.flagsActive = false;
    this.deltaX = 0;
    this.deltaY = 0;
  }
}
