/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload
var ball;

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(640,480);
  ball1 = new Ball(29,30,10,20,5,5);
  ball2 = new Ball(50,100,10,20,50,1);
  ball1.reset();
  ball2.reset();




}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  ball1.update();
  ball1.display();
  ball2.update();
  ball2.display();
}
