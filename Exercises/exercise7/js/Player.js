//defines the 'player' class of objects

// Point
//
// Sets the properties with the provided arguments or defaults
function Player(x,y,distance,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.distance = distance;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;

  this.active = true;
}
Player.prototype.handleInput = function(pointsArray,distance) {
console.log('handleInput is being run')
  if (keyIsDown(this.upKey)) {
    this.y -= this.distance;
    console.log('up key pressed');
  }
  else if (keyIsDown(this.downKey)) {
    this.y += this.distance;
    console.log('down key pressed');
  }else if (keyIsDown(this.leftKey)){
    this.x -= this.distance;
    console.log('left key pressed');
  }else if (keyIsDown(this.rightKey)){
    this.x += this.distance;
    console.log('right key pressed');
  }
}

Player.prototype.drawPlayer = function(){
  fill(255);
  ellipse(this.x,this.y,pointDistance/4);

}
