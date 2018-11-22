//where the grid will start
var startX = 50;
var startY = 50;
//distance between points
var pointDistance = 50;
var player;
var playerGoBoolean = false;

var timer = 10;


function setup() {
   //canvas can be any size and grid can be generated
	createCanvas(600, 600);
	noStroke();

	//spawn a player object that will move through grids
	player = new Player(startX,startY,pointDistance,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW, playerGoBoolean);



 }

 function draw() {
   background(92,88,76);

   player.drawPlayer();
   player.handleInput();
   player.drawDirectionArrows(playerGoBoolean,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
	 player.moveAfterWait();
	 timerFunction();

	 console.log('change in X is ' + player.deltaX);




 }

 function timerFunction(){
	 //STOLE TIMER CODE FROM HERE: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
	 if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
	 timer --;
 }
 if (timer == 0) {
	 player.nowGo = true;
	 timer = 10;

 }
 }
