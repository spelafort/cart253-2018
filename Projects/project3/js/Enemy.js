//Enemy objects

// Sets the properties with the provided arguments or defaults
function Enemy(x,y,distance) {
  this.x = x;
  this.y = y;
  this.distance = distance;
  //describes change in X and Y values for enemy movement
  this.deltaX = 0;
  this.deltaY = 0;
  this.alphaX = 0;
  this.alphaY = 0;
  this.gammaX = 0;
  this.gammaY = 0;

  this.nowGo = false;
  this.timerStarted = false;
}

Enemy.prototype.findVector = function(playerX,playerY){
  if (playerX < this.x && playerY < this.y) {
    //player is up and to the left of enemy
    //console.log('player is up and to the left of enemy');
    //store change in X and Y relative to the 'grid'
    this.deltaX = -this.distance;
    this.deltaY = -this.distance;
    this.alphaX = -this.distance;
    this.alphaY = 0;
    this.gammaX = 0;
    this.gammaY = -this.distance;
  }
  else if (playerX > this.x && playerY < this.y) {
    //player is up and to the right of enemy
    //console.log('player is up and to the right of enemy');
    this.deltaX = this.distance;
    this.deltaY = -this.distance;
    this.alphaX = 0;
    this.alphaY = -this.distance;
    this.gammaX = this.distance;
    this.gammaY = 0;
  }else if (playerX < this.x && playerY > this.y){
    //player is down and to the left of enemy
    //console.log('player is down and to the left of enemy');
    this.deltaX = -this.distance;
    this.deltaY = this.distance;
    this.alphaX = 0;
    this.alphaY = this.distance;
    this.gammaX = -this.distance;
    this.gammaY = 0;
  }else if (playerX > this.x && playerY > this.y){
    //player is down and to the right of enemy
    //console.log('player is down and to the right of enemy');
    this.deltaX = this.distance;
    this.deltaY = this.distance;
    this.alphaX = this.distance;
    this.alphaY = 0;
    this.gammaX = 0;
    this.gammaY = this.distance;
  }else if (playerX === this.x && playerY > this.y){
    //player is directly below enemy
    this.deltaX = 0
    this.deltaY = this.distance;
    this.alphaX = 0
    this.alphaY = this.distance;
    this.gammaX = 0;
    this.gammaY = this.distance;
  }else if (playerX === this.x && playerY < this.y){
    //player is directly above enemy
    this.deltaX = 0
    this.deltaY = -this.distance;
    this.alphaX = 0
    this.alphaY = -this.distance;
    this.gammaX = 0;
    this.gammaY = -this.distance;
  }else if (playerY === this.y && playerX < this.x){
    //player is directly to left of enemy
    this.deltaX = -this.distance;
    this.deltaY = 0
    this.alphaX = -this.distance;
    this.alphaY = 0
    this.gammaX = -this.distance;
    this.gammaY = 0
  }else if (playerY === this.y && playerX > this.x){
    //player is directly to left of enemy
    this.deltaX = this.distance;
    this.deltaY = 0
    this.alphaX = this.distance;
    this.alphaY = 0
    this.gammaX = this.distance;
    this.gammaY = 0
  }else if (playerY === this.y && playerX === this.x){
    //player is directly on top of enemy
    this.deltaX = 0
    this.deltaY = 0
    this.alphaX = 0
    this.alphaY = 0
    this.gammaX = 0
    this.gammaY = 0
  }else{
    //who knows where player is? just randomly go somewhere
    this.deltaX = this.distance;
    this.deltaY = this.distance;
    this.alphaX = this.distance;
    this.alphaY = this.distance;
    this.gammaX = this.distance;
    this.gammaY = this.distance;
  }
  /*console.log('player X read as ' + playerX + ' and player Y read as ' + playerY);
  console.log('delta X is ' + this.deltaX + ' and delta Y is ' + this.deltaY);
  console.log('alpha X is ' + this.alphaX + ' and alpha Y is ' + this.alphaY);
  console.log('gamma X is ' + this.gammaX + ' and gamma Y is ' + this.gammaY);
  //make sure that change in X and Y does not go further than one point on the grid
  /*this.deltaX = constrain(this.deltaX, -this.distance, this.distance)
  this.deltaY = constrain(this.deltaY, -this.distance, this.distance)
  this.alphaX = constrain(this.alphaX, -this.distance, this.distance)
  this.alphaY = constrain(this.alphaY, -this.distance, this.distance)
  this.gammaX = constrain(this.gammaX, -this.distance, this.distance)
  this.gammaY = constrain(this.gammaY, -this.distance, this.distance)*/
}
//draw the player object
Enemy.prototype.drawEnemy = function(timer){
  fill(0,0,255);
  ellipse(this.x,this.y,this.distance/1.2);
}

//draw markers for where it's going, to be used before a 'move' timer has counted down
Enemy.prototype.drawDirectionArrows = function(timeLeft){
  //map opacity of flag to countdown
  fill(0,255,255,100);
  if(this.deltaX != 0 || this.deltaY != 0){

    //draw movement flags
    ellipse(this.x+this.deltaX,this.y+this.deltaY,this.distance/2);
  }
  if(this.alphaX != 0 || this.alphaY != 0){
    //draw movement flags
    ellipse(this.x+this.alphaX,this.y+this.alphaY,this.distance/2);
  }
  if(this.gammaX != 0 || this.gammaY != 0){
    //draw movement flags
    ellipse(this.x+this.gammaX,this.y+this.gammaY,this.distance/2);
  }
}

//push enemy movement in whatever direction chosen, then reset booleans to do it again
Enemy.prototype.moveAfterWait = function(){
  if(this.nowGo === true){
    var diceRoll = random(0,1.2);
    if(diceRoll << 0.4){
      this.x += this.deltaX;
      this.y += this.deltaY;
      this.resetAll();
    }else if(diceRoll << 0.8 && diceRoll >> 0.4){
      this.x += this.alphaX;
      this.y += this.alphaY;
      this.resetAll();
    }else if(diceRoll << 1.2 && diceRoll >> 0.8){
      this.x += this.gammaX;
      this.y += this.gammaY;
      this.resetAll();
    }
  }

}

Enemy.prototype.resetAll = function(){
  this.nowGo = false;
  this.deltaX = 0;
  this.deltaY = 0;
  this.alphaX = 0;
  this.alphaY = 0;
  this.gammaX = 0;
  this.gammaY = 0;
}
