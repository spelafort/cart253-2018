//where the grid will start
var startX;
var startY;
//distance between points
var pointDistance = 50;
var player;
var playerGoBoolean = false;

var timer = 10;


function setup() {
   //canvas can be any size and grid can be generated
	createCanvas(600, 600);

	startX = width/2;
	startY = height/2;

	noStroke();

	//spawn a player object that will move through grids
	player = new Player(startX,startY,pointDistance,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW, playerGoBoolean);



 }

 function draw() {
background(92,88,76);
fill(0,0,255);
textAlign(CENTER, CENTER);
textSize(100);
text(timer, width/2, height/2);

   player.drawPlayer();
	 player.moveAfterWait();
   player.drawDirectionArrows(timer);
	 player.x = constrain(player.x,0,width);
	 player.y = constrain(player.y,0,height);
	 timerFunction();





 }

 function timerFunction(){
	 //STOLE TIMER CODE FROM HERE: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
	 if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
	 timer --;
 }
 if (timer === 0) {
	 player.nowGo = true;
	 timer = 10;

 }
 }

 function keyPressed(){
	 player.keyPressed();
 }
