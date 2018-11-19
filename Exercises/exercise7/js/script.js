//Grid project
//NOTES + DESCRIPTION: I wanted to experiment with making a colored grid for a turn-based game. The player movement
//is very basic at the moment. All I really wanted to do was to make the grid of 'hexes' scale to screen size and pick
// a specific color from an array. Since I need to stick to RGB values, this was actually more difficult than I'd imagined
// and involved using a second order array and a few functions to make sure that the RGB values aren't mixed up.
//where the grid will start
var startX = 50;
var startY = 50;
//distance between points
var pointDistance = 50;
//number of points in a row or a column
var numPointsRow;
var numPointsColumn;
//second order array that will store all the rgb values for the grid
var colorArray = [];
//array that will store the coordinates of the points
var arrayOfPoints = [];
//tells you the status of the grid
var numPointsAlreadyDrawn = 0;
//variable to store player object
var player;

function setup() {
	//canvas can be any size and grid can be generated
	createCanvas(600, 600);
	background(92,88,76);
	noStroke();
	//determine how long a row and column will be on the basis of distance between points and screen size
	numPointsRow = width/pointDistance -1;
	numPointsColumn = height/pointDistance -1;

	//runs the script that will send three specific colors to a second order array, making sure not to mix up their rgb values
	putColors(94,57,41,colorArray);
	putColors(183,209,163,colorArray);
	putColors(228,113,106,colorArray);

	player = new Player(startX,startY,pointDistance,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);

}

function draw(){
	background(92,88,76);
	startY = 50;
	//draw rows on the basis of screen height
	while(startY < height) {
		drawGridRow(startY);
		startY = startY + pointDistance;
	}

	player.x = constrain(player.x,arrayOfPoints[0].x,arrayOfPoints[arrayOfPoints.length-1].x)
	player.y = constrain(player.y,arrayOfPoints[0].y,arrayOfPoints[arrayOfPoints.length-1].y)

	player.handleInput(arrayOfPoints,pointDistance);
	player.drawPlayer();

/* for debugging
	for (var i = 0; i < arrayOfPoints.length; i++) {
		console.log('array length is '+ arrayOfPoints.length + ' values at index ' + i + ' is ' + arrayOfPoints[i].x + ' , ' + arrayOfPoints[i].y);
	} */

}

//function to draw a row on the basis of screen width
function drawGridRow(startY){
	//draws a row, making sure that the r,g,b numbers aren't mixed and matched by using the setfill function to call specific values from 2^ order array
	//fill(setFill(true,false,false,colorArray,startX),setFill(false,true,false,colorArray,startX),setFill(false,false,true,colorArray,startX));
	var pointsDrawn = 0;
	var x = startX;
	while (pointsDrawn < numPointsRow) {
		arrayOfPoints[numPointsAlreadyDrawn] = new Point(x,startY);
		//makes sure each point is potentially a different color
		fill(setFill(true,false,false,colorArray,numPointsAlreadyDrawn,0,arrayOfPoints[arrayOfPoints.length]),setFill(false,true,false,colorArray,numPointsAlreadyDrawn,0,arrayOfPoints[arrayOfPoints.length]),setFill(false,false,true,colorArray,numPointsAlreadyDrawn,0,arrayOfPoints[arrayOfPoints.length]));
		ellipse(x,startY,pointDistance);
		x += pointDistance;
		pointsDrawn++;
		numPointsAlreadyDrawn++;
	}
}

//function that will populate an array with some super cool colors
function putColors(r,g,b,colorArray){
	var color = [r,g,b];
	colorArray.push(color);
}

//function that randomly picks a SINGLE color from a list and determines fill for a specific point, making sure not to mix and match RGB values
function setFill(r,g,b,colorArray,n,n1,n2){
		//first, choose a color of the three possibilities at random by returning either 0, 1, or 2
		firstOrder = Math.floor(n,n1,n2,1,3));
		//returns either r,g,or b value so that they can be used for the fill function
	if(r === true){
		return colorArray[firstOrder][0];
	}else if(g === true){
		return colorArray[firstOrder][1];
	}else if(b === true){
		return colorArray[firstOrder][2];
	}
}
