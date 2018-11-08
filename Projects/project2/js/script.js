//Project 2: Object Oriented Pong Breakout Speed Racer Zelda Batman
//
//Game changes the goal of pong to one of moving towards the center faster than your opponent
//the 'positive' actions remaint he same (hit and bounce and try to score), but movement is the Only
// score. Music provided by my friend Eric.
// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
///NEW///
var gameStarted;
var gameEnded;
//sound variables
var bounce;
var moveBack;
var deletePaddle;
var music;

var victory;
var launchBall;
//font variable
var arcade;

var paddles = [];
///END NEW///

// preload()
//
// Creates the ball and paddles
function preload() {
  arcade = loadFont("assets/fonts/arcade.ttf");
  music = new Audio("assets/sounds/earl.mp3");
  bounce = new Audio("assets/sounds/bounce.wav");
  moveBack = new Audio("assets/sounds/moveBack.wav");
  deletePaddle = new Audio("assets/sounds/delete.wav");
  victory = new Audio("assets/sounds/victory.wav");
  launchBall = new Audio("assets/sounds/launchBall.wav");


}

// setup()
//
// Creates the ball and paddles
function setup() {
  music.play();
  createCanvas(1000,500);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5, bounce,deletePaddle,moveBack);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,97,100);

  ///NEW///
  gameStarted = false;
  gameEnded = false;
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
  gameHandler();

}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    paddles[0].x -= 50;

  }else if (keyCode === RIGHT_ARROW){
    paddles[0].x += 50;
  }else if (keyCode === ENTER && gameStarted === false && gameEnded === false){
    console.log("enter has been pressed.")
    gameStarted = true;
    launchBall.play();
  }else if (keyCode === ENTER && gameStarted === true && gameEnded === true){
    gameStarted = false;
    gameEnded = false;
    paddles[0].x = width-10;
    paddles[1].x = 0;
    paddles[0].y = height/2;
    paddles[1].y = height/2;
    ball.reset(paddles);
    //get rid of excess paddles by shrinking them to null size
    for(var i = 2; i < paddles.length; i++){

      paddles[i].w = 0;
      paddles[i].h = 0;
    }
  }
}

function gameHandler(){
  if(gameStarted == false && gameEnded === false){
    // Prepare our typography
    background(0);
    textFont("arcade");
    textAlign(CENTER,TOP);
    noStroke();
    fill(255,0,0);
    textSize(66);
    text("_PRACEOUT_",width/2,height/5);
    fill(255);
    textSize(35);
    text("Pong!_Breakout!_Racer!", width/2, 175);
    textSize(25);
    text("Race_towards_your_finish_line_by_hitting_the_ball_or_scoring_points", width/2,225);
    text("Like_seamonkies_you_reproduce_to_protect_yourself", width/2,275);
    text("Left_paddle_=_WASD_Right_paddle_=_arrows", width/2,333);
    text("_[Music_by_Eric_Schafenacker]_", width/2,385);
    fill(255,0,0);
    text("_PRESS_ENTER_TO_CONTINUE_", width/2,433);
  }else if(gameStarted == true && gameEnded == false){
    background(0);
    ///NEW////
    for (var i = 0; i < paddles.length; i++) {
      paddles[i].handleInput();
      paddles[i].update();
      paddles[i].display();
      ball.handleCollision(paddles[i], paddles);

      //create 'goal posts' (vertical lines that it's your goal to cross)
      stroke(255,0,0);
      strokeWeight(4);
      line(width*0.9*0.5, 0, width*0.9*0.5, height);
      line(width*1.1*0.5, 0, width*1.1*0.5, height);

      //check if paddle has reached goalpost
      if(paddles[0].x <= width*1.1*0.5){
        //right paddle has reached goalpost
        background(0);
        noStroke();
        textSize(30);
        text("Right_paddle_wins_Press_enter_to_continue",width/2,height/2);
        victory.play();
        gameEnded = true;

      }else{
        paddles[0].w = 10;
        paddles[0].h = 60;
      }
      if(paddles[1].x > width*0.9*0.5){
        //left paddle has reached goalpost
        background(0);
        noStroke();
        textSize(30);
        text("Left_paddle_wins_Press_enter_to_continue",width/2,height/2);
        victory.play();
        gameEnded = true;


      }else{
        //leave the paddles usual size
        paddles[1].w = 10;
        paddles[1].h = 60;
      }


    }

    for(var i = 2; i < paddles.length; i++){
      //handle collision for paddles
      paddles[i].paddleCollision(paddles);
    }
    ball.update();
    if (ball.isOffScreen(paddles)) {
      ball.reset(paddles);
      launchBall.play();
    }
    ball.display();
      ////END NEW////


  }
}
