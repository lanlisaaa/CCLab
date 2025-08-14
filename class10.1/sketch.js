let balls = [];


function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");
}


function draw() {
  background(220);


  // generate an object
  balls.push(new Ball(width / 2, height / 2, 30));


  // update and display objects
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.checkOutOfCanvas();
    b.age();
    b.display();
  }


  // remove objects that are done! FLIP THE FOR LOOP!!!
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    if (b.isDone) {
      balls.splice(i, 1);
    }
  }


  // LIMIT!
  while (balls.length > 1000) {
    balls.splice(0, 1); // (index, howMany?)
  }


  // display the number of objects
  text(balls.length, 10, 20);
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
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);


    // opacity based on the life!
    noStroke();
    fill(255, 255 * this.lifespan);


    // size based on the lifespan!
    let dia = 1;
    if (this.lifespan > 0.6) {
      // grow!
      dia = map(this.lifespan, 1, 0.6, 1, this.rad * 2);
    } else {
      // shrink!
      dia = map(this.lifespan, 0.6, 0, this.rad * 2, 0);
    }


    circle(0, 0, dia); // *** diameter


    //fill(255, 0, 0);
    //text(this.lifespan.toFixed(2), 20, 10);


    pop();
  }
}
