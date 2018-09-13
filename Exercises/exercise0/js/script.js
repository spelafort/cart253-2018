// Exercise 0 - Spiritual Self-Portrait
// Pippin Barr
// 20 August 2018
//
// Uses p5's set of shape and colour functions to draw a head
// wearing a hat that Pippin claims is spiritually just like him.


// setup()
//
// Draws a beautiful face on the canvas and puts a hat on it!

function setup() {

  // Set up the canvas and give it a nice pink colour

  createCanvas(500,500);
  background(222,232,190);

  // Draw the head and body (or is it a chin?) in pink as well

  /*// No stroke because shapes look nicer without it I think
  noStroke();
  // Set the nice pink
  fill(255,190,190);
  // The ellipse mode will make it easier to align everything
  ellipseMode(CENTER);
  // Draw the head
  ellipse(250,250,200,200);
  // Draw the body
  ellipse(250,400,300,400);
  */

  smooth();
  // No stroke because shapes look nicer without it I think
  noStroke();

    fill(257,247,211);


  rect(100,66,300,500,1);
  // Set the nice pink
  fill(183,209,163);
  // The ellipse mode will make it easier to align everything
  ellipseMode(CENTER);
  // Draw the head
  ellipse(250,250,200,200,2);
  // Draw the body
  ellipse(250,500,300,400,1);

  fill(252,247,211);
    ellipse(200,250,50,50);
        ellipse(300,250,50,50);

        fill(205,140,82);
          ellipse(200,257,26,26);
              ellipse(300,257,26,26);

stroke(94,57,41);
strokeWeight(10);
noFill();
curve(240, 360, 222, 300, 266, 300, 290, 360);

        fill(190,54,37);
        noStroke();
        triangle(150,200,350,200,250,66);

                triangle(166,155,300,150,200,90);


                fill(42,54,59);
                textFont('Helvetica');

                textSize(42);
                textAlign(CENTER);
                text('my heart is cinders', 250, 400);





}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
