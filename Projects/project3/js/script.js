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

var grid;
//countdown timer, 0 will push player movement
var timer = 10;
var c1 = color(255,204,0);
var c2 = color(158,189,132);
var c3 = color(238,196,122);
var c4 = color(214,102,98);
var c5 = color(194,194,106);

var colors = [c1,c2,c3,c4,c5];


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
	grid = new Grid(pointDistance,colors, pointDistance);




}

function draw() {
	/*if (keyCode === this.camoKey){
    console.log('right key pressed');
    this.playerCamo = true;
  }else{
    this.playerCamo = false;
  }*/
	background(92,88,76);
	grid.generateGrid(0,3);
	//call player functions
	player.drawDirectionArrows(timer);
	player.drawPlayer();
	player.moveAfterWait();
	//make sure player can't escape
	player.x = constrain(player.x,0,width);
	player.y = constrain(player.y,0,height);

	//call enemy functions
	enemy.findVector(player.x,player.y,player.playerCamo);
	enemy.drawEnemy();
	enemy.drawDirectionArrows(timer);
	enemy.moveAfterWait();
	enemy.x = constrain(enemy.x,0+pointDistance,width-pointDistance);
	enemy.y = constrain(enemy.y,0+pointDistance,height-pointDistance);

	//make a numeric countdown in the direction flag
	fill(255,255,255,255);
	textAlign(CENTER, CENTER);
	textSize(15);
	timerFunction();
	//display timers for enemies and player
	text(timer, player.x+player.deltaX,player.y+player.deltaY);
	text(Math.floor(timer), enemy.x+enemy.deltaX,enemy.y+enemy.deltaY);
	text(Math.floor(timer), enemy.x+enemy.alphaX,enemy.y+enemy.alphaY);
	text(Math.floor(timer), enemy.x+enemy.gammaX,enemy.y+enemy.gammaY);

}

function timerFunction(){
	//BASICALLY STOLE TIMER CODE FROM HERE SINCE IT WAS THE LEAST EXCITING THING TO MAKE FROM SCRATCH
	//uses the number of updates to determine time:
	// https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
	if (frameCount % 60 === 0 && timer > 0){ // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
		timer--;
	}

	if(frameCount%(5*60) === 0){
		console.log('enemy goes now');
		enemy.nowGo = true;
		//setTimeout(swapBoolean(enemy.nowGo),60)
		//setInterval(swapBoolean(enemy.nowGo),999);
	}else if(timer === 0){
		player.nowGo = true;
		timer = 10;
	}else{
		//enemy.nowGo = false;
		//enemy.nowGo = false;
	}
}

function swapBoolean(y){
	console.log('swapBoolean has been called');
	if(y === true){
			y = false;
	}else if(y === false){
			y = true;

		}
}



//to ensure that input isn't taken 1 billion times, call it from keyPressed
function keyPressed(){
	player.keyPressed();
}
