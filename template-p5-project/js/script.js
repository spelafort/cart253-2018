
var angleX = 0.0;
var angleY = 0.0;

function setup() {
  createCanvas(500,500,WEBGL);
  background(26,208,214);
}

function draw() {
  noStroke();
  rotateX(angleX);
//  background(0);
  fill(244,252,232);
  rotateY(angleY);
  box(60);
  translate(50,0,50); // Translation in 3D!
  rotateY(angleY*10);
  fill(135,214,155);
  box(30);
  translate(25,0,25)
  fill(78,150,137);
  rotateY(angleY*100);
  box(15);
  angleX += 0.01;
  angleY -= 0.01;
}
