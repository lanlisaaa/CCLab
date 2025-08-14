
let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new LanDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LanDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 100
    this.xSpeed = sin(frameCount * 0.01) * 50
    this.ySpeed = random(-50, 50)
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    this.move();
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  move() {
    push()
    this.x += sin(frameCount * 0.05) * 2;
    this.y += cos(frameCount * 0.05) * 2;
    pop()
  }


  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    circle(0, 0, this.dia);

    this.drawMic();
    this.drawEyes();




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
  drawEyes() {
    push()
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(0);
    rect(-10 - sin(frameCount * 0.05) * 10, 0, 20, 10)
    rect(20 - sin(frameCount * 0.05) * 10, 0, 20, 10)
    pop()
  }
  drawMic() {
    push()
    noStroke()
    fill(50)
    rect(15, 40 + sin(frameCount * 0.05) * 10, 20, 35)
    fill(random(255), random(255), random(255))
    circle(25, 35 + sin(frameCount * 0.05) * 10, 30)
    pop()
  }
}