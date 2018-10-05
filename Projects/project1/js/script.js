/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

//Defines player object

var player = {
  // Player position, size, velocity
  playerX:200,
  playerY:200,
  playerRadius :25,
  playerVX :0,
  playerVY :0,
  playerMaxSpeed :5,
  // Player health
  playerHealth :2,
  playerMaxHealth :255,
  // Player fill color
  playerFill :50,
  // Load the player image

  display: function () {
    image(this.playerImage, this.playerX, this.playerY)
  },
};


//Defines prey object

var prey = {
  // Prey position, size, velocity
  preyX:0,
  preyY:0,
  preyRadius :25,
  preyVX:0,
  preyVY:0,
  preyMaxSpeed :4,
  // Prey health
  preyHealth :100,
  preyMaxHealth : 100,
  // Prey fill color
  preyFill : 200,

  // Amount of health obtained per frame of "eating" the prey
  eatHealth : 10,
  // Number of prey eaten during the game
  preyEaten : 0,

};


// setup()
//
// Sets up the basic elements of the game
function preload() {
  player.playerImage =loadImage("assets/images/clown.png");

}
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  prey.preyX = width/random(1.1,5);
  prey.preyY = height/random(1.1,2);
  prey.preyVX = -prey.preyMaxSpeed;
  prey.preyVY = prey.preyMaxSpeed;
  prey.preyHealth = prey.preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  player.playerX = 4*width/5;
  player.playerY = height/2;
  player.playerHealth = player.playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
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
    player.playerVX = -player.playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player.playerVX = player.playerMaxSpeed;
  }
  else {
    player.playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    player.playerVY = -player.playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    player.playerVY = player.playerMaxSpeed;
  }
  else {
    player.playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  player.playerX += player.playerVX;
  player.playerY += player.playerVY;

  // Wrap when player goes off the canvas
  if (player.playerX < 0) {
    player.playerX += width;
  }
  else if (player.playerX > width) {
    player.playerX -= width;
  }

  if (player.playerY < 0) {
    player.playerY += height;
  }
  else if (player.playerY > height) {
    player.playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  player.playerHealth = constrain(player.playerHealth - 0.5,0,player.playerMaxHealth);
  // Check if the player is dead
  if (player.playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(player.playerX,player.playerY,prey.preyX,prey.preyY);
  // Check if it's an overlap
  if (d < player.playerRadius + prey.preyRadius) {
    // Increase the player health
    player.playerHealth = constrain(player.playerHealth + prey.eatHealth,0,player.playerMaxHealth);
    // Reduce the prey health
    prey.preyHealth = constrain(prey.preyHealth - prey.eatHealth,0,prey.preyMaxHealth);

    // Check if the prey died
    if (prey.preyHealth === 0) {
      // Move the "new" prey to a random position
      prey.preyX = random(0,width);
      prey.preyY = random(0,height);
      // Give it full health
      prey.preyHealth = prey.preyMaxHealth;
      // Track how many prey were eaten
      prey.preyEaten++;
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
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    prey.preyVX = map(random(),0,1,-prey.preyMaxSpeed,prey.preyMaxSpeed);
    prey.preyVY = map(random(),0,1,-prey.preyMaxSpeed,prey.preyMaxSpeed);
  }

  // Update prey position based on velocity
  prey.preyX += prey.preyVX;
  prey.preyY += prey.preyVY;

  // Screen wrapping
  if (prey.preyX < 0) {
    prey.preyX += width;
  }
  else if (prey.preyX > width) {
    prey.preyX -= width;
  }

  if (prey.preyY < 0) {
    prey.preyY += height;
  }
  else if (prey.preyY > height) {
    prey.preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
    setupPrey();
  fill(prey.preyFill,prey.preyHealth);
  ellipse(prey.preyX,prey.preyY,prey.preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  player.display();
  /*fill(player.playerFill,player.playerHealth);
  ellipse(player.playerX,player.playerY,player.playerRadius*2);*/
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + prey.preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
