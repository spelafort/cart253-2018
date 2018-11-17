var startX = 50;
var startY = 50;
var pointDistance = 50;
var numPointsRow;
var numPointsColumn;
var colorArray = [];
var arrayOfPoints = [];

function setup() {
	createCanvas(800, 600);
	background(92,88,76);
	noStroke();
	numPointsRow = width/pointDistance;
	numPointsColumn = height/pointDistance;
	putColors(94,57,41,colorArray);
	console.log('color array index 0 is ' + colorArray[0])
	putColors(183,209,163,colorArray);
	console.log('color array index 1 is ' + colorArray[1])
	putColors(228,113,106,colorArray);
	console.log('color array index 2 is ' + colorArray[2])



}

function draw(){
	//draw rows on the basis of screen height
	while(startY < height) {
	drawGridRow(startY);
	startY = startY + pointDistance;
}
}

//function to draw a row on the basis of screen width
function drawGridRow(startY){
	fill(setFill(true,false,false,colorArray),setFill(false,true,false,colorArray),setFill(false,false,true,colorArray));
	var pointsDrawn = 0;
  var x = startX;
  while (pointsDrawn < numPointsRow-1) {
		f
		fill(setFill(true,false,false,colorArray),setFill(false,true,false,colorArray),setFill(false,false,true,colorArray));
    ellipse(x,startY,pointDistance);
    x += pointDistance;
    pointsDrawn++;
	}
}

//function that will populate an array with some super cool colors
function putColors(r,g,b,colorArray){
var color = [r,g,b];
colorArray.push(color);
}

//function that randomly picks a color and determines fill for a specific row, making sure not to mix and match RGB values
function setFill(r,g,b, colorArray){
	//first, choose a color of the three possibilities at random, returning either 0, 1, or 2
firstOrder = Math.floor(random(1,3))
	console.log('first order is ' + firstOrder);

	if(r === true){
		return colorArray[firstOrder][0];
	}else if(g === true){
		return colorArray[firstOrder][1];
	}else if(b === true){
		return colorArray[firstOrder][2];
	}
}
