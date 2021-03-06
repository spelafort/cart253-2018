/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/
////////////// NEW ///////////
// time variable for makewaves function
let t = 0;

// Track whether the game is over
var gameOver = false;

////////////// END NEW ///////////
//Images of prey and player
var playerImage;
var preyImage;
var waveImage;

//Time variables for movePrey function
var tx;
var ty;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 50;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 33;
var preyVX;
var preyVY;
var preyMaxSpeed = 3;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

function preload(){
  //loads images in preload for prey and player
  preyImage = loadImage("assets/images/Seal2.png");
  playerImage = loadImage("assets/images/Shark2.png");
  waveImage = loadImage("assets/images/wave.png");
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  //Randomize time variables for movePrey function at runtime
  tx = random(0,2);
  ty = random(0,3);

  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();
}

function makeWaves(){
  //mostly stolen from official p5 example library; I understand the code if not all of the math
  //make a x and y grid of waves
  for (let x = 0; x <= width; x = x + 60) {
    for (let y = 0; y <= height; y = y + 60) {
      // starting point of each circle depends on shark
      let xAngle = map(playerX, 0, width, -4 * PI, 2 * PI, true);
      let yAngle = map(playerY, 0, height, -4 * PI, 2 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 20 * cos(2 * PI * t + angle);
      let myY = y + 20 * sin(2 * PI * t + angle);

      image(waveImage, myX, myY, 6,6); // draw particle
    }
  }

  t = t + 0.01; // update time
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(0,84,112,222);
  makeWaves();

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth(0.1);
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  // Check for sprinting
  if (keyIsDown(SHIFT) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW))) {
    //Logs out to console
    console.log("you're running");
    //calls the update health method thrice, quadrupling player health reduction
    updateHealth(3);

    //Checks current value is greater than zero; player needs a speed to sprint
    if(abs(playerVX) > 0){
      playerVX = 4*playerVX;
    }
    if(abs(playerVY) > 0){
      playerVY = 4*playerVY;
    }


  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth(loss) {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - loss,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  /*if (random() < 0.05) {
    /// Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(random(),0,1,-preyMaxSpeed,preyMaxSpeed);
  }*/

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }


  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if player is close
  if (d < playerRadius*2 + preyRadius*2) {

//test boundary condition so that prey wraps properly; should be controlled only by perlin noise past boundary
if(preyX < 0.1*width == false || preyX > 0.9*width == false || preyY < 0.1*height == false ||preyY > 0.9*height == false){
    //matches prey to player trajectory in a desparate attempt to flee
    if(playerVX > 0 && preyVX < 0){
      preyVX = -preyVX*2;
      preyVX = constrain(preyVX,-preyMaxSpeed, preyMaxSpeed);
    }else if(playerVX <0 && preyVX > 0){
      preyVX = -preyVX*2;
      preyVX = constrain(preyVX,-preyMaxSpeed, preyMaxSpeed);
    }else if(playerVX > 0 && preyVX > 0){
      preyVX = preyVX*2;
      preyVX = constrain(preyVX,-preyMaxSpeed, preyMaxSpeed);
    } else if(playerVY < 0 && preyVY < 0){
      preyVX = preyVX*2;
      preyVX = constrain(preyVX,-preyMaxSpeed, preyMaxSpeed);
    }

    if(playerVY > 0 && preyVY < 0){
      preyVY = -preyVY*2;
      preyVY = constrain(preyVY,-preyMaxSpeed, preyMaxSpeed);
    }else if(playerVY <0 && preyVY > 0){
      preyVY = -preyVY*2;
      preyVY =  constrain(preyVY,-preyMaxSpeed, preyMaxSpeed);
    }else if(playerVY > 0 && preyVY > 0){
      preyVY = preyVY*2;
      preyVY = constrain(preyVY,-preyMaxSpeed, preyMaxSpeed);
    } else if(playerVY < 0 && preyVY < 0){
      preyVY = preyVY*2;
      preyVY = constrain(preyVY,-preyMaxSpeed, preyMaxSpeed);
    }
  }
  }else{

  tx += random(0,0.01);
  ty += random(0,0.01);

  //set velocity based on perlin noise
  preyVX = constrain(preyVX+map(noise(tx),0,1,-0.001,0.001),-preyMaxSpeed, preyMaxSpeed);
  preyVY = constrain(preyVY+map(noise(ty),0,1,-0.001,0.001),-preyMaxSpeed, preyMaxSpeed);
}

// Update prey position based on velocity
preyX += preyVX;
preyY += preyVY;
constrain(preyVY,-preyMaxSpeed, preyMaxSpeed);
constrain(preyVX,-preyMaxSpeed, preyMaxSpeed);
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {

  fill(preyFill,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
    tint(255,255);
  image(preyImage,preyX-preyRadius,preyY-preyRadius,preyRadius*2,preyRadius*2);

}

// drawPlayer()
//
// Draw the player as an image with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
  tint(255,playerHealth);
  image(playerImage, playerX-playerRadius, playerY-playerRadius, playerRadius*2,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "Chubby shark ate " + preyEaten + " seals\n";
  gameOverText += "before he died alone in pizzatown."
  text(gameOverText,width/2,height/2);
}
