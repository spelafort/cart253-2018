// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

//Paddle constructor

//Sets the properties with the provided arguments or defaults
//FIXED 5
//FIXED 8
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  //FIXED 32
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  //FIXED 12
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
//FIXED 7
Paddle.prototype.handleInput = function() {
  //FIXED 20/21/22/23
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = -this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  //FIXED 15
  //FIXED 24
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
//FIXED 6
//FIXED 13
Paddle.prototype.display = function() {
  console.log(this.x,this.y,this.w,this.h);
//FIXED 14
//FIXED 26
fill(255);
  rect(this.x,this.y,this.w,this.h);
}
