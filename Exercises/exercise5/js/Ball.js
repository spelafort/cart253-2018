// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle, paddlearray) {

  //Check if paddle is Left or Right paddle (original paddles), in which case make it bounce
  if(paddle == paddlearray[0] || paddle == paddlearray[1]){
    if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
      // Check if the ball overlaps the paddle on y axis
      if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
        // If so, move ball back to previous y position (by subtracting current velocity)
        this.y -= this.vy;
        // Reverse x velocity to bounce
        this.vx = -this.vx;

        ///NEW///
        //spawn a new paddle that won't move
        paddles.push(new Paddle(this.x,this.y,paddle.w,paddle.h,0,random(1,100),random(1,100)));
        //check if collision paddle is left or right paddle
        if(paddle.x <= width/2){
          paddle.x = paddle.x + paddle.w;
          // move ball back to in front of new paddle position
          this.x = paddle.x + paddle.w;

        } else if (paddle.x >= width/2){
          paddle.x = paddle.x - paddle.w;
          // move ball back to in front of new paddle position
          this.x = paddle.x - paddle.w;

        }
      }
    }
  }
  //if it's not original paddles, then delete this paddle on collision
  else {
    if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
      // Check if the ball overlaps the paddle on y axis
      if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
        // If so, delete current paddle
        paddle.w = 0;
        paddle.h = 0;
        paddle.active = false;
        this.vx = -this.vx;

      }
    }
  }
}
///END NEW///

// reset()
//
Ball.prototype.reset = function (paddlearray) {
  ///NEW ///
  //set ball to middle between two paddles
  this.x = (paddlearray[0].x+paddlearray[1].x)/2;
  this.y = (paddlearray[0].y+paddlearray[1].y)/2;
  this.vx = -this.vx
  this.vy = random(1,10);

  ///END NEW///
}