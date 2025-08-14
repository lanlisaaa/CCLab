let lifeline;
let balls = []
let img1
let sound1
function preload() {
  img1 = loadImage("assets/nightBridge.jpeg");
  sound1 = loadSound("assets/heartbeat.mp3")
}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");

  lifeline = new LifeLine();

  for (let x = 47; x <= 900; x += 100) {
    let y = random(100, 500);
    let sentences = [];
    let randomness = floor(random(3)); // 0, 1, 2
    if (randomness == 0) {
      sentences = [
        "hello",
        "Hi",
        ":D",
      ];
    } else if (randomness == 1) {
      sentences = [
        "a",
        "b",
        "c",
      ];
    } else if (randomness == 2) {
      sentences = [
        "5",
        "6",
        "7",
      ];
    }

    balls.push(new Ball(x, y, random(5, 35), sentences));
  }

}


function draw() {
  //background(50, 10);
  lifeline.update();
  lifeline.display();
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.checkMouse();
    b.display();
    b.moveByKey()
  }

  //image(img1, 0, 0);
  /*
  let clr = img1.get(mouseX, mouseY);
  noStroke();
  fill(clr);
  circle(mouseX, mouseY, 30);
  */

  for (let i = 0; i < 50; i++) {
    let x = floor(random(img1.width));
    let y = floor(random(img1.height));
    let clr = img1.get(x, y);
    let r = red(clr) * map(1.0);
    let g = green(clr) * 0.0;
    let b = blue(clr) * 0.1;
    noStroke();
    fill(r, g, b);
    circle(x, y, random(3, 15));
  }

}

// CLASS: Blueprint, plan, design
class LifeLine {
  // very special function
  constructor() {
    // variables --> Properties
    this.x = 0;
    this.y = height / 3;
    this.size = 5;
    this.ySpeed = sin(frameCount * 1000) * 100
    this.yAcc = 0
  }
  // functions --> methods
  update() {
    this.beat();
    this.slow();
    this.bounce();
  }
  beat() {
    this.x++
  }

  slow() {
    if (this.x < width / 1.5) {
      this.ySpeed = this.ySpeed + 0.1045
      this.y -= this.ySpeed
    }
  }



  bounce() {
    if (this.y > height / 3 + 100 || this.y < height / 3 - 100) {
      this.ySpeed = this.ySpeed * -1;
    }
  }


  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(0, 225, 0)
    ellipse(0, 0, this.size, this.size);
    pop()
    push()
    noStroke()
    fill(225, 225, 0)
    this.drawLine1()
    pop()
    push()
    noStroke()
    fill(0, 225, 225)
    this.drawLine2()
    pop()
    push()
    stroke(255)
    this.writeText1()
    this.writeText2()
    this.writeText3()
    pop()

    if (frameCount > 960) {
      this.image()
    }
    if (0 < frameCount < 960) {
      sound1.play()
    }
  }
  drawLine1() {
    circle(this.x, 450, this.size)
  }
  drawLine2() {
    circle(this.x, 300, this.size)
  }
  writeText1() {
    text("I've been waiting for you all this time", width - 300, height / 3 - 80)
  }
  writeText2() {
    text("Before you arrive at your final destination...", width - 300, 240)
  }
  writeText3() {
    text("Do you want to take one last look at your past?", width - 300, 390)
  }
  image() {
    push()
    scale(2)
    tint(200, 0, 0, 50)
    image(img1, 0, 0)
    pop()
  }
}

class Ball {
  constructor(x, y, rad, txts) {
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
    //
    this.txts = txts;
    this.rotationAngle = 0
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
      this.r = map(mouseX, 0, 1000, 0, 255);
      this.g = map(mouseY, 0, 600, 255, 0);
      this.b = random(mouseX, 0, 1000, 255, 0); // yellow
      // while hovering we can detect mousePressed

      if (mouseIsPressed) {
        noStroke()
        this.r = 50;
        this.g = 50;
        this.b = 50; // red

        // dragging
        this.x = mouseX;
        this.y = mouseY;
      }
    } else {
      // out
      this.r = 50;
      this.g = 50;
      this.b = 50; // white
      this.isDone = true
    }
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > 390) {
      this.isDone = true;
    }
  }
  moveByKey() {
    if (keyIsPressed) {
      // it won't detect capital letters.

      if (key == "w" || keyCode === UP_ARROW) { // up arrow or 'w'
        this.y -= this.speed;
        this.rotationAngle = radians(270);
      }
      if (key == "a" || keyCode === LEFT_ARROW) { // left arrow or 'a'
        this.x -= this.speed;
        this.rotationAngle = radians(180);
      }
      if (key == "s" || keyCode === DOWN_ARROW) { // down arrow or 's'
        this.y += this.speed;
        this.rotationAngle = radians(90);
      }

      if (key == "d" || keyCode === RIGHT_ARROW) { // right arrow or 'd'
        this.x += this.speed;
        this.rotationAngle = radians(0);
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2 + sin(frameCount * 0.1) * 2); // *** diameter
    this.displayText(50, 0);
    pop()
    push()
    rotation(this.rotationAngle)
    image(img1, 0, 0)
    //text("dying is an art", 20, 0);
    //text("I love you", 20, 30);
    pop()
  }
  displayText(x, y) {
    push();
    translate(x, y);

    fill(0, 255, 0);
    for (let i = 0; i < this.txts.length; i++) {
      let txt = this.txts[i];
      let txtX = 0;
      let txtY = i * 30;
      text(txt, txtX, txtY);
    }

    pop();
  }

}