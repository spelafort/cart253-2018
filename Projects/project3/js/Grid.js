//Grid objects

// Sets the properties with the provided arguments or defaults
function Grid(seed,colorArray) {
  this.seed = seed;
  this.colorArray = colorArray;
  this.tileSize = 50;

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
  //  console.log("player invisible is " + player.playerInvisible);
  }else if(playerColorArray[0] === cBackgroundArray[0] && playerColorArray[1] === cBackgroundArray[1] && playerColorArray[2] === cBackgroundArray[2] && playerColorArray[3] === cBackgroundArray[3]){
    player.playerInvisible = false;
    player.playerColorCurrent = player.playerColorDefault;

  }else{
    player.playerInvisible = false;
  //  console.log("player invisible is " + player.playerInvisible);
  }


}
Grid.prototype.compareLocations = function(enemyArray, playerX,playerY){
  for (var i = 0; i < enemyArray.length; i++) {
          if(enemyArray[i].x === playerX && enemyArray[i].y === playerY){
            background(0);
    textAlign(CENTER,TOP);
    noStroke();
    fill(255,255,255);
    textSize(66);
    text("GAME OVER",width/2,height/5);
          }
        }
}

Grid.prototype.drawWinTile = function(){
fill(random(0,255));
}