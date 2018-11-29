//ColorWheel objects

// Sets the properties with the provided arguments or defaults
function ColorWheel(colorArray) {
  this.colorArray = colorArray;
}

//take player input
ColorWheel.prototype.drawWheel = function() {
  noFill();
	stroke('#fae');
	strokeWeight(4);
	arc(50, 55, 60, 60, HALF_PI, PI);
	arc(50, 55, 70, 70, PI, PI + QUARTER_PI);
	arc(50, 55, 80, 80, PI + QUARTER_PI, TWO_PI);
}
