//Grid objects

// Sets the properties with the provided arguments or defaults
function Grid(seed,colorArray) {
  //random seed
  this.seed = seed;
  this.colorArray = colorArray;
  this.tileSize = 50;

  this.dt = 1;
  //is player camo'd
  this.playerIsCamo = true;
  //position of house
  this.winTileX;
  this.winTileY;
}

//make the grid
Grid.prototype.generateGrid = function(tilesReservedX,tilesReservedY) {
  noStroke();
  t = 0;
  t2 = 0;
  //use bidirectional noise, which can later be divided out based on grid position
  noiseSeed(this.seed);
  for (let y = 1; y < height/this.tileSize - tilesReservedX; y++) {
    for (let x = 1; x < width/this.tileSize -tilesReservedY; x++) {
      var c = this.colorArray[floor(map(noise(t,t2),0,1,0,this.colorArray.length))];
      fill(c);
      ellipse(x*this.tileSize,y*this.tileSize,this.tileSize,this.tileSize);
      t += this.dt;
      t2 += this.dt;
    }
  }
}
//reverse engineer the color
Grid.prototype.giveMeColorFromXY = function(aa,bb) {
  var xx = aa/this.tileSize;
  var yy = bb/this.tileSize;

  t = xx*this.dt + yy*(width/this.tileSize)*this.dt;
  c = this.colorArray[floor(map(noise(t),0,1,0,this.colorArray.length))];
  return c;
}

//compares the color of player with the tile the player is on
Grid.prototype.compareColors = function(player, colorBehindPlayer,cBackgroundArray){
  var r = red(player.playerColorCurrent);
  var b = blue(player.playerColorCurrent);
  var g = green(player.playerColorCurrent);
  var playerColorArray = [r,g,b,255];

  if(playerColorArray[0] === colorBehindPlayer[0] && playerColorArray[1] === colorBehindPlayer[1] && playerColorArray[2] === colorBehindPlayer[2]){
    player.playerInvisible = true;
    //stop animation so player can see that they've become invisible to enemies
    player.animation.stop();
  }else if(playerColorArray[0] === cBackgroundArray[0] && playerColorArray[1] === cBackgroundArray[1] && playerColorArray[2] === cBackgroundArray[2] && playerColorArray[3] === cBackgroundArray[3]){
    player.playerInvisible = false;
    player.playerColorCurrent = player.playerColorDefault;
    player.animation.play();

  }else if(playerColorArray[0] === 255 && playerColorArray[1] === 255 && playerColorArray[2] === 255 && playerColorArray[3] === 255){
    player.playerInvisible = false;
    player.playerColorCurrent = player.playerColorDefault;
    player.animation.play();

  }else{
    player.playerInvisible = false;
    player.animation.play();

  }


}
