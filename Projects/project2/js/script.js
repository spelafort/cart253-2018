//Rebuilt OOP exercise
//
// Written with JavaScript OOP.
//NOTE: I decided not to remake my exercise 4 entirely, since it was a bit of a hack job.
//My original idea was to spawn new paddles on collision, but due to some collision detection problems
//I gave up on that and just spawned 'masks' in exercise 4. I'm just going back to my original idea.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

///NEW///
var paddles = [];
///END NEW///

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

  ///NEW///
//assign initial paddles to paddle array
  paddles[0] = rightPaddle;
  paddles[1] = leftPaddle;


  ///END NEW///
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  ///NEW////
  var paddlesLength = paddles.length;
  console.log("right now there are " + paddlesLength + " paddles!");
  for (var i = 0; i < paddlesLength; i++) {
    paddles[i].handleInput();
    paddles[i].update();
    paddles[i].display();
    ball.handleCollision(paddles[i], paddles);
    //ball.letBallPass(paddles);

    //create 'goal posts' (vertical lines that it's your goal to cross)
    stroke(255,0,0);
    strokeWeight(4);
    line(width*0.9*0.5, 0, width*0.9*0.5, height);
    line(width*1.1*0.5, 0, width*1.1*0.5, height);

    ////END NEW////
  }

  /*
  leftPaddle.handleInput();
  rightPaddle.handleInput();
  leftPaddle.update();
  rightPaddle.update();
  leftPaddle.display();
  rightPaddle.display();
  ball.handleCollision(rightPaddle, paddles);
  */

  ball.update();

  if (ball.isOffScreen(paddles)) {
    ball.reset(paddles);

  }


  ball.display();

  //check if paddle has reached goalpost
  if(paddles[0].x <= width*1.1*0.5){
    //right paddle has reached goalpost

  }else if(paddles[1].x > width*0.9*0.5){


  }
}
