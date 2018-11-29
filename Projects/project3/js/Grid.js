//Grid objects

// Sets the properties with the provided arguments or defaults
function Grid(seed,colorArray,tileSize) {
  this.seed = seed;
  this.colorArray = colorArray;
  this.tileSize = 50;

  this.xx;
  this.yy;
  this.dt = 1;

  this.playerIsCamo = true;
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
Grid.prototype.giveMeColorFromXY = function(xx,yy) {
  t = xx*this.dt + yy*(width/this.tileSize)*this.dt;
  c = this.colorArray[floor(map(noise(t),0,1,0,this.colorArray.length))];
  return c;
}

Grid.prototype.compareColors = function(playerColor, backgroundColor,playerInvisible){
  if(playerColor === backgroundColor){
    playerInvisible = true;
  }else{
    playerInvisible = false;
  }
}
