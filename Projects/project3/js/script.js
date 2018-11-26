//Experiment in timed, turn-based movement: input using UP/DOWN/LEFT/RIGHT arrows, but the player
//only moves after the countdown is at zero (stressful turn-based); will add enemies next, and they will move
//at BOTH zero and half of the timer value. Basically the enemies will be able to outpace you, and so you will
//need to hide yourself by changing your colors

//where the player will start
var startX;
var startY;
//distance between points
var pointDistance = 50;
//size of canvas multiplier
var multiplier = 20
//player obj
var player;
//enemy object
var enemy;
//countdown timer, 0 will push player movement
var timerPlayer = 10;
var timerEnemy = 5;


function setup() {
	//canvas can be any size and grid can be generated
	createCanvas(pointDistance*multiplier, pointDistance*multiplier/2);
	//start at centre
	startX = width/2;
	startY = height/2;
	noStroke();
	//spawn a player object that will move through grids
	enemy = new Enemy(pointDistance,pointDistance,pointDistance);
	player = new Player(startX,startY,pointDistance,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);

}

function draw() {
	background(92,88,76);
	//call player functions
	player.drawDirectionArrows(timerPlayer);
	player.drawPlayer();
	player.moveAfterWait();
	//make sure player can't escape
	player.x = constrain(player.x,0,width);
	player.y = constrain(player.y,0,height);
	enemy.findVector(player.x,player.y);
	enemy.drawEnemy();
	enemy.drawDirectionArrows();
	enemy.moveAfterWait();
	enemy.x = constrain(enemy.x,0+pointDistance,width-pointDistance);
	enemy.y = constrain(enemy.y,0+pointDistance,height-pointDistance);



	timerFunction();
	//make a numeric countdown in the direction flag
	fill(255,255,255,255);
	textAlign(CENTER, CENTER);
	textSize(15);
	text(timerPlayer, player.x+player.deltaX,player.y+player.deltaY);
	text(Math.floor(timerEnemy), enemy.x+enemy.deltaX,enemy.y+enemy.deltaY);
	text(Math.floor(timerEnemy), enemy.x+enemy.alphaX,enemy.y+enemy.alphaY);
	text(Math.floor(timerEnemy), enemy.x+enemy.gammaX,enemy.y+enemy.gammaY);
	console.log('enemy x is ' + enemy.x);
	console.log('enemy y is ' + enemy.y);
}

function timerFunction(timePush, thingToPush){
	//BASICALLY STOLE TIMER CODE FROM HERE SINCE IT WAS THE LEAST EXCITING THING TO MAKE FROM SCRATCH
	//uses the number of updates to determine time:
	// https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
	var previousTime = timePush;
	if (frameCount % 60 == 0 && timePush > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
		timePush --;
	}
	if (timePush === 0) {
		//send movement command to player
		thingToPush.nowGo = true;
		//reset
		timePush = previousTime;

	}
}
//to ensure that input isn't taken 1 billion times, call it from keyPressed
function keyPressed(){
	player.keyPressed();
}
