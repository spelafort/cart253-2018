function Ball(x,y,vx,vy,size,speed) {
  this.size = size;
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
}

Ball.prototype.update = function () {
  // Move the ball here
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;

  if (this.x < 0 || this.x > width) {
    this.reset();
  }

  if (this.y < 0 || this.y > height) {
    this.vy = -this.vy;
  }

}

Ball.prototype.display = function () {
  // Display the ball here
  rect(this.x,this.y,this.size,this.size);
}

Ball.prototype.reset = function () {
  // Reset the ball here
  this.x = width/2;
  this.y = height/2;
  this.vx = -this.speed;
  this.vy = -this.speed;
}
