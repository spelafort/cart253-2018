//Experiment in timed, turn-based movement

//where the player will start
var startX;
var startY;
//distance between points
var pointDistance = 50;
//player obj
var player;
//boolean to push player movement
var playerGoBoolean = false;
//countdown timer, 0 will push player movement
var timer = 10;


function setup() {
	//canvas can be any size and grid can be generated
	createCanvas(600, 600);
	//start at centre
	startX = width/2;
	startY = height/2;
	noStroke();
	//spawn a player object that will move through grids
	player = new Player(startX,startY,pointDistance,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW, playerGoBoolean);
}

function draw() {
	background(92,88,76);
	//call player functions
	player.drawDirectionArrows(timer);
	player.drawPlayer();
	player.moveAfterWait();
	//make sure player can't escape
	player.x = constrain(player.x,0,width);
	player.y = constrain(player.y,0,height);
	timerFunction();
	//make a numeric countdown in the direction flag
	fill(255,255,255,255);
	textAlign(CENTER, CENTER);
	textSize(15);
	text(timer, player.x+player.deltaX,player.y+player.deltaY);
}

function timerFunction(){
	//BASICALLY STOLE TIMER CODE FROM HERE SINCE IT WAS THE LEAST EXCITING THING TO MAKE FROM SCRATCH
	//uses the number of updates to determine time:
	// https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
	if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
		timer --;
	}
	if (timer === 0) {
		//send movement command to player
		player.nowGo = true;
		timer = 10;

	}
}
//to ensure that input isn't taken 1 billion times, call it from keyPressed
function keyPressed(){
	player.keyPressed();
}
