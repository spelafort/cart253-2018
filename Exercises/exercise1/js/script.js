// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.

//text Y location
var textY;
// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of a carrot
var carrotImage;
// The current position of the carrot
var carrotImageX = 0;
var carrotImageY = 200;

// The image of a carrot
var birdImage;
// The current position of the carrot
var birdImageX;
var birdImageY;

// The image of a carrot
var clownDown;
// The current position of the carrot
var clownDownX;
var clownDownY;


// preload()
//
// Load the three images we're using before the program starts

function preload() {
  //load upside down clown
  clownDown = loadImage("assets/images/clowndown.png");
  //load right side up clown
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  //load carrot
  carrotImage = loadImage("assets/images/carrot.png");
  //load bird
  birdImage = loadImage("assets/images/bird.png");

  //I replaced all images for the sake of patriotism but didn't change the file names. Bad practice!
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);

  clownDownX = 0;
  clownDownY = 0;
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {
  //set up text
  fill(0,0,0);
  textFont('Helvetica');
  textSize(42);
  textAlign(CENTER);


  //randomize text
  textY = mouseY + 1;
  if((textY/2) === 0)
  {
      text('on a last chance power drive', 250, textY);
  } else
  {
    text('The highways jammed with broken heroes', 250, textY);
  }



  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  //move the carrot
  carrotImageX += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);
  //Display carrot image
  image(carrotImage,carrotImageX,carrotImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // Display the bird image
  image(birdImage,mouseX,mouseY);

  // A bird in the hand is worth two in the bush
  var birdImageX = mouseX;
  var birdImageY = mouseY;

  //Display the upside down clown image
  image(clownDown, clownDownX, clownDownY);
  // Calculate the distance in X and in Y
  var xDistanceDown = mouseX - clownDownX;
  var yDistanceDown = mouseY - clownDownY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownDownX = clownImageY + xDistance/1000;
  clownDownY = clownImageX + yDistance/1000;



}
