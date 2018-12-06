//ColorWheel objects

// Sets the properties with the provided arguments or defaults
function ColorWheel(x,y,w,h,colorArray) {
  this.colorArray = colorArray;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.velocity = pointDistance/15;
}

//take player input when clicked
ColorWheel.prototype.drawWheel = function(timer,pointDistance,numberReservedColumns) {
  //make it move, because I'm a jerk
  if(this.y >= height - this.h-pointDistance || this.y <= this.h+pointDistance){
    this.velocity = -this.velocity;
  }
  this.y += this.velocity;

  //set background color to white
  fill(255,255,255,255);
  noStroke();
  rectMode(CENTER);
  rect(this.x,this.y,numberReservedColumns*pointDistance-pointDistance,height*4);
  ellipse(this.x,this.y,this.w*2,this.h*2);

  //fill in the other colors, and make them rotate because I am a HUGE jerk
  //shout out to Pippin for doing this mathy math
  noFill();
  strokeCap(SQUARE);
    for (var i = 0; i < this.colorArray.length; i++){
      stroke(this.colorArray[i]);
      strokeWeight(60);

        arc(this.x,this.y,this.w,this.h,map(this.y,0,height,1,2)*i*TWO_PI/this.colorArray.length,(map(this.y,0,height,1,2)*i+1)*TWO_PI/this.colorArray.length);
    }


}
