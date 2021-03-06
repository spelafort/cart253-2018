/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  //variable will control the random size increase or decrease of the dog
  var changeSizeRatioOfSausageDog = random(0.7,1.3)

  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  targetX = randomizeValueWithin(0,windowWidth/6, width);
  targetY = randomizeValueWithin(0,windowHeight/3, height);

  console.log('targetX is ' + targetX)
  console.log('target X should be bigger than ' + (windowWidth/6))

  console.log('targetY is ' + targetY)
  console.log('target X should be bigger than ' + (windowHeight/3))

  // And draw it (this means it will always be on top)
  //randomize size of sausage dog
  image(targetImage,targetX,targetY, targetImage.width*changeSizeRatioOfSausageDog, targetImage.height*changeSizeRatioOfSausageDog);

  setupUI();

}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(50);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    fleeDogFlee(10);
    text("WRONG, IT WAS ONLY EVER ALWAYS DOG",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width*random(0.7,1.3),targetImage.height*random(0.7,1.3));
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}

// setupUI()
//
//Sets up the 'have you seen me' poster for the Dog
function setupUI(){
  //draw outer rectangle
  stroke(77,235,161);
  strokeWeight(4);
  rectMode(CORNERS);
  fill(61,186,149);
  rect(0,0, (windowWidth/6), (windowHeight/3));

  //draw internal rectangle
  fill(183,209,163);
  strokeWeight(2);
  rect(0,0, (windowWidth/6), (windowHeight/4));

  //draw the Dog
  imageMode(CORNERS);
  image(targetImage,0,0,(windowWidth/7),(windowHeight/5));

  //have you seen me text
  fill(0, 0, 0);
  textSize(30);
  textAlign(CENTER);
  text('HV U C DOG?', (windowWidth/6)/2, ((windowHeight/3)-(windowHeight/4))/2+(windowHeight/4));

}

//randomizeValueWithin
//
//Randomizes within a given range
//Note that I have no idea why this function is still glitching out. This is very mysterious to me even after looking through all of this again!
function randomizeValueWithin(value,min,max)
{

  while(value<min)
  {
    value = random(min+(targetImage.width),max);

  }

  return value
}

//fleeDogFlee
//
//Sets the win screen
function fleeDogFlee(numDogs){
  background("#000000");
  //dog velocity

  //image(targetImage,0,0,windowWidth,windowHeight)

  for (var i = 0; i < numDogs; i++) {
    //dog position
    var x = random(0,width);
    var y = random(0,height);
    //dog velocity
    var vx = vx + 1;
    var vy = vy + 2;


    image(targetImage,x,y,windowWidth,windowHeight);
  }

  for (var i = 0; i < numDogs; i++) {
    var x = random(0,width);
    var y = random(0,height);
    image(targetImage,x,y,targetImage.width/10,targetImage.height/10);

  }

}
