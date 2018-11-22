//Player objects

// Sets the properties with the provided arguments or defaults
function Player(x,y,distance,downKey,upKey,leftKey,rightKey,nowGo) {
  this.x = x;
  this.y = y;

  this.deltaX = 0;
  this.deltaY = 0;

  this.distance = distance;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;

  this.flagsActive = false;
  this.nowGo = false;
}

//take player input
Player.prototype.handleInput = function() {


  if (keyIsDown(this.upKey)) {
    console.log('up key pressed');
    flagsActive = true;
    this.deltaY += -this.distance;
  }
  else if (keyIsDown(this.downKey)) {
    console.log('down key pressed');
    flagsActive = true;
    this.deltaY += this.distance;
  }else if (keyIsDown(this.leftKey)){
    console.log('left key pressed');
    flagsActive = true;
    this.deltaX += -this.distance;
  }else if (keyIsDown(this.rightKey)){
    console.log('right key pressed');
    flagsActive = true;
    //this.x += this.distance;
    this.deltaX += this.distance;
  }
  constrain(this.deltaY, -this.distance, this.distance)
  constrain(this.deltaX, -this.distance, this.distance)
}
//draw the player object
Player.prototype.drawPlayer = function(){
  fill(255);
  ellipse(this.x,this.y,this.distance);
}

//draw markers for where it's going, to be used before a 'move' timer has counted down
Player.prototype.drawDirectionArrows = function(){
  if(this.flagsActive){
    fill(255,0,0);
    ellipse(this.x+this.deltaX,this.y + this.deltaY,this.distance/2);
  }
}

Player.prototype.moveAfterWait = function(){
  if(this.nowGo){
    this.x += this.deltaX;
    this.y += this.deltaY;
    nowGo = false;
    flagsActive = false;
  }
}
