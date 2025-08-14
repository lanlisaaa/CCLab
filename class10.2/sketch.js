let balls = [];


function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");
  background(220);


  // generate an object
  for (let x = 100; x <= 900; x += 100) {
    let y = height / 2;
    balls.push(new Ball(x, y, 40));
  }


}


function draw() {
  background(220);


  // update and display objects
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.checkMouse();
    b.display();
  }
}


class Ball {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    //
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-1, 1) * 5;
    //
    this.r = 255;
    this.g = 255;
    this.b = 255;
    //
    this.isDone = false;
    this.lifespan = 1.0; // 100%
    this.lifeReduction = random(0.005, 0.012); // 0.5% to 1.2%
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  age() {
    if (this.lifespan > 0) {
      // alive!
      this.lifespan -= this.lifeReduction;
    } else {
      // dead...
      this.lifespan = 0;
      this.isDone = true;
    }
    // this.lifespan = constrain(this.lifespan, 0, 1);
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.r = 255;
      this.g = 255;
      this.b = 0; // yellow
      // while hovering we can detect mousePressed
      if (mouseIsPressed) {
        this.r = 255;
        this.g = 0;
        this.b = 0; // red


        this.x = mouseX;
        this.y = mouseY;
      }
    } else {
      // out
      this.r = 255;
      this.g = 255;
      this.b = 255; // white
    }
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2); // *** diameter
    pop();
  }
}
