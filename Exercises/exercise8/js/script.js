//where the grid will start
var startX = 50;
var startY = 50;
//distance between points
var pointDistance = 50;
var player;
var playerGoBoolean = false;

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
   player.handleInput(playerGoBoolean,pointDistance);
   player.drawDirectionArrows(playerGoBoolean,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW)




 }
