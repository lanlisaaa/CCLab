let balls = [];
let img;
function preload() {
  img = loadImage("assets/emoji.png");
}
function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");
  background(220);

}


function draw() {
  background(220);


  // generate an object with 3% chance!
  if (random() < 0.03) {
    balls.push(new Ball(width / 2, height, random(5, 30)));
  }


  // update and display objects
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.checkMouse();
    b.checkOutOfCanvas();
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
    this.xSpeed = random(-4, 4);
    this.ySpeed = random(-15, -10);
    this.rotaionAngle = this.rotationAngle
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
    // fall
    this.ySpeed += 0.2;
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
      // while hovering we can detect mousePressed
      if (mouseIsPressed) {
        this.rad = 100;
        this.isDone = true;
        sound.play();
      }
    } else {
      // out
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
    imageMode(CENTER);
    image(img, 0, 0, this.rad * 2, this.rad * 2);
    pop();
  }
}
