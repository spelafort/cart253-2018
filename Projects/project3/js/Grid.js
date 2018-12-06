//Grid objects

// Sets the properties with the provided arguments or defaults
function Grid(seed,colorArray) {
  this.seed = seed;
  this.colorArray = colorArray;
  this.tileSize = 50;

  this.dt = 1;

  this.playerIsCamo = true;

  this.winTileX;
  this.winTileY;
}

//take player input
Grid.prototype.generateGrid = function(tilesReservedX,tilesReservedY) {
  noStroke();
  t = 0;
  t2 = 0;
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

  //noLoop();
}
Grid.prototype.giveMeColorFromXY = function(aa,bb) {
  var xx = aa/this.tileSize;
  var yy = bb/this.tileSize;

  t = xx*this.dt + yy*(width/this.tileSize)*this.dt;
  c = this.colorArray[floor(map(noise(t),0,1,0,this.colorArray.length))];
  return c;
}


Grid.prototype.compareColors = function(player, colorBehindPlayer,cBackgroundArray){
  var r = red(player.playerColorCurrent);
  var b = blue(player.playerColorCurrent);
  var g = green(player.playerColorCurrent);
  var playerColorArray = [r,g,b,255];
  //console.log("player color is " + playerColorArray + " and background color is " + colorBehindPlayer +  " and that means player invisible boolean is " + player.playerInvisible);
  if(playerColorArray[0] === colorBehindPlayer[0] && playerColorArray[1] === colorBehindPlayer[1] && playerColorArray[2] === colorBehindPlayer[2]){
    player.playerInvisible = true;
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
  //  console.log("player invisible is " + player.playerInvisible);
  }


}
