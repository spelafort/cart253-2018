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
  //enemy color is black
  this.enemyColor = color(0,0,0);
  //stores enemy sprite and animation
  this.sprite;
  this.animation;
  //make the enemy go or stop
  this.nowGo = false;
}

Enemy.prototype.findVector = function(playerX,playerY,playerCamo){
if(!playerCamo){
  if (playerX < this.x && playerY < this.y) {
    //player is up and to the left of enemy
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
    this.deltaX = this.distance;
    this.deltaY = -this.distance;
    this.alphaX = 0;
    this.alphaY = -this.distance;
    this.gammaX = this.distance;
    this.gammaY = 0;
  }else if (playerX < this.x && playerY > this.y){
    //player is down and to the left of enemy
    this.deltaX = -this.distance;
    this.deltaY = this.distance;
    this.alphaX = 0;
    this.alphaY = this.distance;
    this.gammaX = -this.distance;
    this.gammaY = 0;
  }else if (playerX > this.x && playerY > this.y){
    //player is down and to the right of enemy
    this.deltaX = this.distance;
    this.deltaY = this.distance;
    this.alphaX = this.distance;
    this.alphaY = 0;
    this.gammaX = 0;
    this.gammaY = this.distance;
  }else if (playerX === this.x && playerY > this.y){
    //player is directly below enemy
    this.deltaX = 0;
    this.deltaY = this.distance;
    this.alphaX = 0;
    this.alphaY = this.distance;
    this.gammaX = 0;
    this.gammaY = this.distance;
  }else if (playerX === this.x && playerY < this.y){
    //player is directly above enemy
    this.deltaX = 0;
    this.deltaY = -this.distance;
    this.alphaX = 0;
    this.alphaY = -this.distance;
    this.gammaX = 0;
    this.gammaY = -this.distance;
  }else if (playerY === this.y && playerX < this.x){
    //player is directly to left of enemy
    this.deltaX = -this.distance;
    this.deltaY = 0;
    this.alphaX = -this.distance;
    this.alphaY = 0;
    this.gammaX = -this.distance;
    this.gammaY = 0;
  }else if (playerY === this.y && playerX > this.x){
    //player is directly to left of enemy
    this.deltaX = this.distance;
    this.deltaY = 0;
    this.alphaX = this.distance;
    this.alphaY = 0;
    this.gammaX = this.distance;
    this.gammaY = 0;
  }else if (playerY === this.y && playerX === this.x){
    //player is directly on top of enemy
    this.deltaX = 0;
    this.deltaY = 0;
    this.alphaX = 0;
    this.alphaY = 0;
    this.gammaX = 0;
    this.gammaY = 0;
  }
}else if(playerCamo === true){
    //who knows where player is? just randomly go somewhere, you dummy
    var randomArray = [this.distance,-this.distance,0,0];
    this.deltaX = randomArray[Math.floor(random(0,4))];
    this.deltaY = randomArray[Math.floor(random(0,4))];
    this.alphaX = randomArray[Math.floor(random(0,4))];
    this.alphaY = randomArray[Math.floor(random(0,4))];
    this.gammaX = randomArray[Math.floor(random(0,4))];
    this.gammaY = randomArray[Math.floor(random(0,4))];
  }
  //rotate sprite according to vector
  if(!playerCamo){
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
}
//draw the enemy object
Enemy.prototype.drawEnemy = function(timer){
  //make sure player is actually on a tile; had to do this to solve a weird bug
  if(this.x % this.distance != 0 || this.y % this.distance != 0){
    this.x = Math.floor(this.x/this.distance)*this.distance;
    this.y = Math.floor(this.y/this.distance)*this.distance;
  }
  fill(this.enemyColor);
  ellipse(this.x,this.y,this.distance);



}

//draw markers for where it's going, to be used before a 'move' timer has counted down
Enemy.prototype.drawDirectionArrows = function(timeLeft){
  //map opacity of flag to countdown
  fill(this.enemyColor);
  if(this.deltaX != 0 || this.deltaY != 0){

    //draw movement flags
    ellipse(this.x+this.deltaX,this.y+this.deltaY,this.distance/2);
    stroke(this.enemyColor);
    strokeWeight(4);
    line(this.x,this.y,this.x+this.deltaX,this.y+this.deltaY);
    noStroke();
  }
  if(this.alphaX != 0 || this.alphaY != 0){
    //draw movement flags
    ellipse(this.x+this.alphaX,this.y+this.alphaY,this.distance/2);
    stroke(this.enemyColor);
    strokeWeight(4);
    line(this.x,this.y,this.x+this.alphaX,this.y+this.alphaY);
    noStroke();
  }
  if(this.gammaX != 0 || this.gammaY != 0){
    //draw movement flags
    ellipse(this.x+this.gammaX,this.y+this.gammaY,this.distance/2);
    stroke(this.enemyColor);
    strokeWeight(4);
    line(this.x,this.y,this.x+this.gammaX,this.y+this.gammaY);
    noStroke();
  }
}

//push enemy movement in whatever direction chosen, then reset booleans to do it again
Enemy.prototype.moveAfterWait = function(){
  if(this.nowGo === true){
    var diceRoll = random(0,1.2);
    if(diceRoll < 0.4){
      this.x += this.deltaX;
      this.y += this.deltaY;
      this.resetAll();
    }else if(diceRoll < 0.8 && diceRoll > 0.4){
      this.x += this.alphaX;
      this.y += this.alphaY;
      this.resetAll();
    }else if(diceRoll < 1.2 && diceRoll > 0.8){
      this.x += this.gammaX;
      this.y += this.gammaY;
      this.resetAll();
    }
  }

}
//reset enemy after a 'go'
Enemy.prototype.resetAll = function(){
  this.nowGo = false;
  this.deltaX = 0;
  this.deltaY = 0;
  this.alphaX = 0;
  this.alphaY = 0;
  this.gammaX = 0;
  this.gammaY = 0;
}
