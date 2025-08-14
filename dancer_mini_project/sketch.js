let dancer;


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  dancer = new MoonDancer();
}


function draw() {
  background(100);


  dancer.update();
  dancer.display();
}




// CLASS: Blueprint, plan, design
class MoonDancer {
  // very special function
  constructor() {
    // variables --> Properties
    this.x = width / 2;
    this.y = height / 2;
    this.dia = 100;
  }
  // functions --> methods
  update() {
    this.circle();
  }

  circle() {
    this.x = width / 2 - random(-5, 5)
    this.y = height / 2 + sin(frameCount * 0.01) * 100
  }
  display() {
    push();
    translate(this.x, this.y);
    circle(0, 0, this.dia);


    this.drawEye(-30, -10);
    this.drawEye(30, -10);


    this.drawArm(40, 20, 45, random(-10, 10));
    this.drawArm(-40, 20, 45, random(170, 190));
    pop();
  }
  drawEye(x, y) {
    push();
    let xAdj = sin(frameCount * 0.1) * 5;
    fill(0);
    ellipse(x + xAdj, y, 10, 20);
    pop();
  }
  drawArm(x, y, len, angle) {
    push();
    translate(x, y);
    rotate(radians(angle));


    strokeWeight(10);
    line(0, 0, len, 0);
    pop();
  }
}