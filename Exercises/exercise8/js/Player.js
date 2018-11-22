//Player objects

// Sets the properties with the provided arguments or defaults
function Player(x,y,distance,downKey,upKey,leftKey,rightKey,nowGo) {
  this.x = x;
  this.y = y;
  this.distance = distance;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.nowGo = false;

  this.active = true;
}

//take player input
Player.prototype.handleInput = function(nowGo,distance) {
  if (keyIsDown(this.upKey)) {
    //this.y -= this.distance;
    console.log('up key pressed');
    this.drawDirectionArrows(nowGo,false,true,false,false);
  }
  else if (keyIsDown(this.downKey)) {
    //this.y += this.distance;
    console.log('down key pressed');
    this.drawDirectionArrows(nowGo,true,false,false,false);
  }else if (keyIsDown(this.leftKey)){
    //this.x -= this.distance;
    console.log('left key pressed');
    this.drawDirectionArrows(nowGo,false,false,true,false);
  }else if (keyIsDown(this.rightKey)){
    //this.x += this.distance;
    console.log('right key pressed');
    this.drawDirectionArrows(nowGo,false,false,false,true);
  }
}
//draw the player object
Player.prototype.drawPlayer = function(){
  fill(255);
  ellipse(this.x,this.y,this.distance);
}

//draw markers for where it's going, to be used before a 'move' timer has counted down
Player.prototype.drawDirectionArrows = function(nowGo, down,up,left,right){
  fill(255,0,0);

  if(down === true && nowGo === false){
    console.log('draw flag down');
      ellipse(this.x,this.y + this.distance,this.distance/2);
  }else if (up === true && nowGo === false){
      ellipse(this.x,this.y - this.distance,this.distance/2);
      console.log('draw flag up');
  }else if (left === true && nowGo === false){
      ellipse(this.x - this.distance, this.y,this.distance/2);
      console.log('draw flag left');
  }else if (right === true && nowGo === false){
      ellipse(this.x+this.distance,this.y,this.distance/2);
      console.log('draw flag right');
  }

}
