//JITTERBUG: A FAKE GAME BECOME REAL
//
//JITTERBUG asks you to pay attention to many things at once. You need to move,
//dodge enemies, remember the timing, remember the color of the tile you're on, and
//balance the twitchiness of realtime (color wheel and countdown) with the planning And
//tension of a turn-based game. Made using p5.js and p5.play libraries (latter mostly to get sprite animation working)

//distance between points
var pointDistance = 50;
//size of canvas multiplier, aka the number of columns that COULD fit on the screen
var multiplier =20;
//number of columns reserved for moving color wheel
var numberReservedColumns = 4;

//player objects
var player;
var playerSprite;
var playerAnimation;
//where the player will start
var startX;
var startY;

//enemy objects
//number of enemies total
var enemiesTotal;
var enemyArray;
var enemySpriteArray;
var enemyAnimationArray;

//win tile object
var winTileX;
var winTileY;
var winTileSprite;
var wineTileAnimation;
//total number of tiles
var tilesTotal

//grid object
var grid;

//array to hold colors
var colors;
//colorwheel object
var colorWheel;
//last color clicked by player
var clickedColor;
//color behind player
var currentColorBehindPlayerArray;
//background color
var cBackgroundArray = [92,88,76,255];

//countdown timer, 0 will push player movement
var timer = 10;

//various gamestates
var titleScreen = true;
var gameOn = false;
var gameWin = false;
var gameLose = false;

//font variables
var josefin;

function preload() {
  jose = loadFont("assets/fonts/jose.ttf");
  music = new Audio("assets/sounds/Minnie.m4a");
  move1 = new Audio("assets/sounds/DM-CGS-46 copy.wav");
  move2 = new Audio("assets/sounds/DM-CGS-47 copy.wav");
  winSound = new Audio("assets/sounds/win.wav");
  loseSound = new Audio("assets/sounds/lose.wav");
}

function setup() {
  tilesTotal = Math.floor(width/pointDistance)+ Math.floor(height/pointDistance);
  textFont('jose');
  enemiesTotal = Math.floor(random(1,6));
  //declare arrays so they are defined as arrays
  enemySpriteArray = [];
  enemyAnimationArray = [];
  enemyArray = [];

  //assign all the colors to specific variables, and then the variables to the array;
  var c1 = color(255,204,0,255);
  var c2 = color(158,189,132,255);
  var c3 = color(170,114,127,255);
  var c4 = color(214,102,98,255);
  var c5 = color(194,194,106,255);
  colors = [c1,c2,c3,c4,c5];

  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth,windowHeight);
  // Style it so that it sits behind the main HTML in a fixed position that ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  //start player at bottom left corner
  startX = pointDistance;
  startY = height - pointDistance;

  //set goal to be opposite corner of the grid (ish)
  winTileX = Math.floor((width/pointDistance)-numberReservedColumns-1)*pointDistance;
  winTileY = pointDistance*Math.floor(random(1,4));
  winTileX = constrain(winTileX,pointDistance,width-pointDistance*numberReservedColumns);
  winTileY = constrain(winTileY,pointDistance,height-pointDistance);

  //spawn a player object that will move through grids
  player = new Player(startX,startY,pointDistance,83,87,65,68);
  player.playerColorCurrent = player.playerColorDefault;
  //player sprite with animation using p5.play Library; assign all of this stuff to player object
  playerSprite = createSprite(player.x,player.y,pointDistance,pointDistance);
  player.sprite = playerSprite;
  playerSprite.rotation = 0;
  playerAnimation = playerSprite.addAnimation('playerwalk', 'assets/images/jbug_0.png','assets/images/jbug_6.png');
  player.animation = playerAnimation;
  playerAnimation.offY = -4;

  //make the grid object
  grid = new Grid(random(1,1000),colors,pointDistance);
  //make win tile a sprite, send info to grid
  winTileSprite = createSprite(winTileX,winTileY,pointDistance);
  wineTileAnimation = winTileSprite.addAnimation('smoke', 'assets/images/house_0.png','assets/images/house_11.png');
  grid.winTileX = winTileX;
  grid.winTileY = winTileY;
  //make the color wheel
  colorWheel = new ColorWheel(width-2*pointDistance,height/2,60,60,colors);

  //create enemies
  for(var i = 0; i < enemiesTotal; i++){
    //don't get too close to player at the start
    enemyArray[i] = new Enemy(Math.floor(random(multiplier/6,multiplier - numberReservedColumns - 1))*pointDistance,Math.floor(random(1,(height/pointDistance) - 1))*pointDistance,pointDistance);
  }
  //for each enemy, make a sprite and animation and store it
  for(var i = 0; i < enemyArray.length; i++){
    enemySpriteArray[i] = createSprite(enemyArray[i].x,enemyArray[i].y,pointDistance,pointDistance);
    enemyArray[i].sprite = enemySpriteArray[i];
    enemySpriteArray[i].rotation = 0;
    enemyAnimationArray[i] = enemySpriteArray[i].addAnimation('enemywalk', 'assets/images/spider_0.png','assets/images/spider_2.png');
  }


}

function draw() {
  if(titleScreen === true){
    // Prepare our typography and type title page
    //also describe how to play the damn thing
    background(0);
    textAlign(CENTER,TOP);
    noStroke();
    fill(255,0,0);
    textSize(66);
    text("JITTERBUG",width/2,height/6);
    fill(255);
    textSize(35);
    text("(turn based and wheel time)", width/2, 175);
    textSize(20);
    text("You are a bug racing towards home; you move after _10_ seconds, your enemies after _5_ seconds", width/2,250);
    text("You must concentrate to change your color and match your tile to throw them off", width/2,275);
      text("And careful: you can't move once you've changed colors-- click on white to reset", width/2,385);
    text("[[WASD to choose a direction, mouse to click the colorwheel]]", width/2,333);
    text("Music_by_Eric_Schafenacker", width/2,height-100);
    fill(255,0,0);
    text("PRESS ENTER TO CONTINUE", width/2,433);

    //check for enter to start game
    if (keyCode === ENTER && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
    }else if(keyCode === 49 && gameOn === false){
      enemiesTotal =1;
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
    }else if(keyCode === 50 && gameOn === false){
      enemiesTotal =2;
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();

    }else if(keyCode === 51 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =3;
    }else if(keyCode === 52 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =4;
    }else if(keyCode === 53 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =5;
    }else if(keyCode === 54 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =6;
    }else if(keyCode === 55 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =7;
    }else if(keyCode === 56 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =8;
    }else if(keyCode === 57 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =9;
    }else if(keyCode === 48 && gameOn === false){
      gameOn = true;
      titleScreen = false;
      gameWin = false;
      gameLose = false;
      music.play();
      enemiesTotal =0;
    }

  }else if(gameOn === true){

    //set background and clear background
    background(cBackgroundArray[0],cBackgroundArray[1],cBackgroundArray[2],cBackgroundArray[3]);

    //generate grid itself and run its functions
    grid.generateGrid(1,numberReservedColumns);
    currentColorBehindPlayerArray = get(player.x,player.y);
    //grid.compareLocations(enemyArray, player.x,player.y);
    grid.compareColors(player,currentColorBehindPlayerArray,cBackgroundArray);

    //call player functions
    player.drawDirectionArrows(timer);
    player.drawPlayer();
    player.moveAfterWait();
    //make sure player can't escape
    player.x = constrain(player.x,pointDistance,width-pointDistance*numberReservedColumns);
    player.y = constrain(player.y,pointDistance,height-pointDistance);
    playerSprite.position.x = player.x;
    playerSprite.position.y = player.y;

    //call enemy functions for each enemy
    for(var i = 0; i < enemyArray.length; i++){
      enemyArray[i].findVector(player.x,player.y,player.playerInvisible);
      enemyArray[i].drawEnemy();
      enemyArray[i].drawDirectionArrows(timer);
      enemyArray[i].moveAfterWait();
      enemyArray[i].x = constrain(enemyArray[i].x,pointDistance,width-pointDistance*numberReservedColumns);
      enemyArray[i].y = constrain(enemyArray[i].y,pointDistance,height-pointDistance);
    }

    for(var i = 0; i < enemySpriteArray.length; i++){
      enemySpriteArray[i].position.x = enemyArray[i].x;
      enemySpriteArray[i].position.y = enemyArray[i].y;
    }

    //make timers for player and enemies
    drawTimers();
    //draw the color wheel
    colorWheel.drawWheel(timer,pointDistance,numberReservedColumns);

    //change color if player clicks on the color wheel
    if(mouseIsPressed && mouseX >= width-pointDistance*numberReservedColumns){
      clickedColor = get(mouseX,mouseY);
      player.playerColorCurrent = clickedColor;
    }

    //draw sprites last
    winTileSprite.position.x = winTileX;
    winTileSprite.position.y = winTileY;
    drawSprites();

    for (var i = 0; i < enemyArray.length; i++) {
      if(enemyArray[i].x === player.x && enemyArray[i].y === player.y){
        gameLose = true;
        titleScreen = false;
        gameOn = false;
        gameWin = false;

      }
    }

    if(abs(winTileX - player.x) <= 5 && abs(winTileY - player.y) <= 5){
      gameLose = false;
      titleScreen = false;
      gameOn = false;
      gameWin = true;
    }


  }else if(gameWin === true){
    winSound.play();
    titleScreen = false;
    gameOn = false;
    gameLose = false;
    background(0);
    textAlign(CENTER,TOP);
    noStroke();
    fill(255,255,255);
    textSize(66);
    text("YOU WIN! PRESS ENTER TO RESTART.",width/2,height/5);
    drawSprites();
    if (keyCode === ENTER){
    resetGame();
    gameOn = true;

    }


  }else if(gameLose === true){
    loseSound.play();
    titleScreen = false;
    gameOn = false;
    gameWin = false;

    background(0);
    textAlign(CENTER,TOP);
    noStroke();
    fill(255,255,255);
    textSize(66);
    text("GAME OVER. PRESS ENTER TO RESTART.",width/2,height/5);

    if (keyCode === ENTER){
    resetGame();
    gameOn = true;

    }
    drawSprites();
  }
}

function timerFunction(){
  //BASICALLY STOLE TIMER CODE FROM HERE SINCE IT WAS THE LEAST EXCITING THING TO MAKE FROM SCRATCH
  //uses the number of updates to determine time:
  // https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  if (frameCount % 60 === 0 && timer > 0){ // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer--;
  }

  if(frameCount%(5*60) === 0){
    //make all enemies go on countdown
    move1.play();
    for(var i = 0; i < enemyArray.length; i++){
      enemyArray[i].nowGo = true;
    }
    //setTimeout(swapBoolean(enemy.nowGo),60)
    //setInterval(swapBoolean(enemy.nowGo),999);
  }else if(timer === 0){
    //make player go on countdown times 2
    //make sure player can't go if player is hidden
    move2.play();
    player.nowGo = true;
    timer = 10;
    player.playerColorCurrent = player.playerColorDefault;
  }
}

function drawTimers(){
  //make a numeric countdown in the direction flag
  fill(0,0,0,255);
  textAlign(CENTER, CENTER);
  textSize(15);
  timerFunction();
  //display timers for enemies and player
  if(abs(player.deltaX) > 0 || abs(player.deltaY) > 0){
    text(timer, player.x+player.deltaX,player.y+player.deltaY);
  }
  fill(255,255,255,255);
  if(player.playerInvisible === false){
    for(var i = 0; i < enemyArray.length; i++){
      if(abs(enemyArray[i].deltaX) > 0 || abs(enemyArray[i].deltaY) > 0){
        text(Math.floor(timer), enemyArray[i].x+enemyArray[i].deltaX,enemyArray[i].y+enemyArray[i].deltaY);
      }
      if(abs(enemyArray[i].alphaX) > 0 || abs(enemyArray[i].alphaY) > 0){
        text(Math.floor(timer), enemyArray[i].x+enemyArray[i].alphaX,enemyArray[i].y+enemyArray[i].alphaY);
      }
      if(abs(enemyArray[i].gammaX) > 0 || abs(enemyArray[i].gammaY) > 0){
        text(Math.floor(timer), enemyArray[i].x+enemyArray[i].gammaX,enemyArray[i].y+enemyArray[i].gammaY);
      }
    }

  }else if(player.playerInvisible === true){
    //if enemies are confused about where you are, show that instead
    for(var i = 0; i < enemyArray.length; i++){
      console.log('PLAYER IS INVISIBLE')
      text("?", enemyArray[i].x+enemyArray[i].deltaX,enemyArray[i].y+enemyArray[i].deltaY);
      text("?", enemyArray[i].x+enemyArray[i].alphaX,enemyArray[i].y+enemyArray[i].alphaY);
      text("?", enemyArray[i].x+enemyArray[i].gammaX,enemyArray[i].y+enemyArray[i].gammaY);
    }
  }
}

//resets game elements on restart
function resetGame(){
  //reset enemies
  for(var i = 0; i < enemiesTotal; i++){
    enemyArray[i].x = random(multiplier/6,multiplier - numberReservedColumns - 1)*pointDistance;
    enemyArray[i].y= Math.floor(random(1,(height/pointDistance) - 1)*pointDistance,pointDistance);
  }
  //reset player
  player.x = startX;
  player.y = startY;
  //reset house
  //set goal to be opposite corner of the grid (ish)
  winTileX = Math.floor((width/pointDistance)-numberReservedColumns-1)*pointDistance;
  winTileY = pointDistance*Math.floor(random(1,4));
  winTileX = constrain(winTileX,pointDistance,width-pointDistance*numberReservedColumns);
  winTileY = constrain(winTileY,pointDistance,height-pointDistance);
}

//to ensure that input isn't taken 1 billion times, call it from keyPressed
function keyPressed(){
  player.keyPressed();
}
