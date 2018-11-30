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
var enemyArray;

var grid;
var colorWheel;
//countdown timer, 0 will push player movement
var timer = 10;

var colors; //array to hold grid and colorwheel colors

var tilesReservedX = 0;
var tilesReservedY = 4;

var clickedColor;
var currentColorBehindPlayerArray;

var cBackgroundArray = [92,88,76,255];

function setup() {

var c1 = color(255,204,0,255);
var c2 = color(158,189,132,255);
var c3 = color(170,114,127,255); //THIS ONE CHANGE IT!!!!!
var c4 = color(214,102,98,255);
var c5 = color(194,194,106,255);
colors = [c1,c2,c3,c4,c5];
	//canvas can be any size and grid can be generated
	createCanvas(pointDistance*multiplier, pointDistance*multiplier/2);
	//start at centre
	startX = pointDistance;
	startY = height - pointDistance;
	noStroke();
	//spawn a player object that will move through grids
	enemy = new Enemy(pointDistance,pointDistance,pointDistance);
	player = new Player(startX,startY,pointDistance,83,87,65,68);
	grid = new Grid(random(1,1000),colors,pointDistance);
	colorWheel = new ColorWheel(width-2*pointDistance,height/2,60,60,colors);

	enemyArray = [enemy];
	player.playerColorCurrent = player.playerColorDefault;




}

function draw() {

	background(cBackgroundArray[0],cBackgroundArray[1],cBackgroundArray[2],cBackgroundArray[3]);
	grid.generateGrid(tilesReservedX,tilesReservedY);
	currentColorBehindPlayerArray = get(player.x,player.y);


	grid.compareLocations(enemyArray, player.x,player.y);


	//call player functions
	player.drawDirectionArrows(timer);
	player.drawPlayer();
	player.moveAfterWait();
	//make sure player can't escape
	player.x = constrain(player.x,0,width-pointDistance*tilesReservedY);
	player.y = constrain(player.y,0,height-pointDistance*tilesReservedX);

	//call enemy functions
	enemy.findVector(player.x,player.y,player.playerInvisible);
	enemy.drawEnemy();
	enemy.drawDirectionArrows(timer);
	enemy.moveAfterWait();
	enemy.x = constrain(enemy.x,0+pointDistance,width-pointDistance*tilesReservedX);
	enemy.y = constrain(enemy.y,0+pointDistance,height-pointDistance*tilesReservedY);


	grid.compareColors(player,currentColorBehindPlayerArray,cBackgroundArray);
	grid.drawWinTile();

	drawTimers();

	colorWheel.drawWheel(timer,pointDistance);

	if(mouseIsPressed && mouseX >= width-pointDistance*tilesReservedY){
		clickedColor = get(mouseX,mouseY);
		console.log(clickedColor);
		player.playerColorCurrent = clickedColor;
	}


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
		player.playerColorCurrent = player.playerColorDefault;
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

function drawTimers(){
	//make a numeric countdown in the direction flag
	fill(0,0,0,255);
	textAlign(CENTER, CENTER);
	textSize(15);
	timerFunction();
	//display timers for enemies and player
	text(timer, player.x+player.deltaX,player.y+player.deltaY);
	fill(255,255,255,255);
	if(player.playerInvisible === false){
		text(Math.floor(timer), enemy.x+enemy.deltaX,enemy.y+enemy.deltaY);
		text(Math.floor(timer), enemy.x+enemy.alphaX,enemy.y+enemy.alphaY);
		text(Math.floor(timer), enemy.x+enemy.gammaX,enemy.y+enemy.gammaY);
	}else if(player.playerInvisible === true){
		text("??", enemy.x+enemy.deltaX,enemy.y+enemy.deltaY);
		text("??", enemy.x+enemy.alphaX,enemy.y+enemy.alphaY);
		text("??", enemy.x+enemy.gammaX,enemy.y+enemy.gammaY);
	}
}



//to ensure that input isn't taken 1 billion times, call it from keyPressed
function keyPressed(){
	player.keyPressed();
}
