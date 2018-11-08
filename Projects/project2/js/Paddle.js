// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  ///NEW///
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;

  this.active = true;
  ///END NEW///
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if(!this.active){
    return
  }
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }else if (keyIsDown(this.leftKey)){
    this.vx = -this.speed;
  }else if (keyIsDown(this.rightKey)){
    this.vx = this.speed;
  }else {
    this.vy = 0;
    this.vx = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  if(!this.active){
    return
  }
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  if(!this.active){
    return
  }
  noStroke();
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
//FIX THIS
Paddle.prototype.paddleCollision = function(paddlearray){

  for (var i = 0; i < 2; i++) {
    if (this.x + this.w > paddlearray[i].x && this.x < paddlearray[i].x + paddlearray[i].w) {
      // Check if the ball overlaps the paddle on y axis
      if (this.y + this.h > paddlearray[i].y && this.y < paddlearray[i].y + paddlearray[i].h) {
        //paddlearray[i].vx = -paddlearray[i].vx;
        console.log("PADDLES COLLIDED!!!!!");
  }

}
}
}
