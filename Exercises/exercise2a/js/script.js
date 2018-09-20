/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

//water image
var waterImage;
var waterImageX;
var lighthouseImage;

//avatar boat image
var boatImage;

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 120;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// setup()
//
// Make the canvas, position the avatar and anemy

function preload() {
  //load water images
  waterImage = loadImage("assets/images/waves.jpg");
  boatImage = loadImage("assets/images/boat.png");
  lighthouseImage = loadImage("assets/images/Lighthouse.png");

  //set X for water coordinates
  waterImageX = 0;
}

function setup() {
  // Create our playing area
  createCanvas(500,500);



  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  console.log('avatar size is ' + avatarSize);

  // A pink background
  //background(100,100,250, 200);

  //create tiling water background
  imageMode(CENTER);
  image(waterImage,waterImageX,250);
  waterImageX += 1;



  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");

    //reset water
    image(waterImage,250,250);
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }



  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    //reset water
    image(waterImage,250,250);
    waterImageX = 0
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX - 250 > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    //reset water
    image(waterImage,250,250);
    waterImageX = 0
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    // Randomize avatar speed and size
    avatarSize = random(10,150);
    avatarSpeed = random(10,15);
    console.log('avatar size is ' + avatarSize);
    console.log('avatar speed is ' + avatarSpeed);

    // The speed and velocity of our avatar circle
    //var avatarSpeed = avatarSpeed + random(-10,10);

  }

  // Display the current number of successful in the console
  console.log(dodges);

  // The player is red
  fill(255,0,0,250);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize*2,avatarSize);
  //draw player as boatImage
  imageMode(CENTER);
  image(boatImage, avatarX+100, avatarY, boatImage.width/2, boatImage.height/2);

  // Spotlight is yellow
  fill(255,255,0, 100);
  // Draw spotlight
  //
  triangle(enemyX, enemyY, enemyY, enemyX, 86, 75);



  // Spotlight is yellow
  fill(255,255,0);
  ellipse(enemyX,enemyY,enemySize,enemySize);
  imageMode(CORNER);
  image(lighthouseImage,enemyX-120,enemyY -20);
  //rotate(360, [z]);

  //tell me more about your dodges
  fill(255,255,255);
  textFont('Helvetica');
  textAlign(CENTER);
  if(dodges <= 3)
  {
      textSize(42);
      text(dodges + ' DODGES GOOD JOB', 250, 50);
  } else if (dodges > 3 && dodges <= 7)
  {
    textSize(25);
    text(dodges + ' DODGES! WOW LOOK AT YOU DODGE', 250, 60);
  } else if (dodges >7 && dodges < 10)
  {
    textSize(20);
    text(dodges + '  DODGES AND I AM CRYING AT THE DODGES', 250, 250);
  } else if (dodges >= 10)
  {
    background(0,0,0);
    textSize(66);
    text('YOU WIN', 250, 250);
  }



}
