let lifeline
let balls = []
let img1
let sound
function preload() {
  img1 = loadImage("assets/nightBridge1.jpeg");
  sound = loadSound("assets/heartbeat1.mp3")
}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");

  lifeline = new LifeLine();

  for (let x = 47; x <= 900; x += 75) {
    let y = random(100, 500);
    let txts = [];
    let randomness = floor(random(6)); // 0, 1, 2
    if (randomness == 0) {
      txts = [
        "ARE YOU STILL MAD AT ME",
        "i don't know who to be"
      ];
    }
    else if (randomness == 1) {
      txts = [
        "fly above the clouds☁️",
        "HAUNTED BY VOICES,YOURS OR MINE?"
      ];
    }

    else if (randomness == 2) {
      txts = [
        "go back to school",
        " the osmanthus flowers are blooming again..."
      ];
    }

    else if (randomness == 3) {
      txts = [
        "none of really know until we...",
        "Have you ever regretted giving birth to me?"
      ];
    }

    else if (randomness == 4) {
      txts = [
        "🦋dAnCe wiTh the wInD🦋",
        "what does it feel like to decay?"
      ];
    }
    else if (randomness == 5) {
      txts = [
        "I'm free",
        "I should let go, shouldn't I?..."
      ];
    }
    balls.push(new Ball(x, y, random(5, 45), txts));
  }
}





function draw() {
  background(50, 10);
  lifeline.update();
  lifeline.display();
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.checkMouse();
    b.display();

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
    text("I've been waiting for you all this time", width - 300, height / 3 - 80)
    text("Before you arrive at your final destination...", width - 300, 240)
    text("Do you want to take one last look at your past?", width - 300, 390)
    pop()
  }



  drawLine1() {
    circle(this.x, 450, this.size)
  }
  drawLine2() {
    circle(this.x, 300, this.size)
  }
}
class Ball {
  constructor(x, y, rad, txts) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.txts = txts
    //
    this.xSpeed = random(-5, 5);
    this.ySpeed = 1;
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
    this.x += this.xSpeed
    this.x -= this.ySpeed
  }
  fall() {
    this.ySpeed += 0.1
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
        sound.play()
        this.x = mouseX;
        this.y = mouseY;
        for (let i = 0; i < 50; i++) {
          let x = floor(random(img1.width));
          let y = floor(random(img1.height));
          let clr = img1.get(x, y);
          let r = red(clr) * map(frameCount, 0, 300, 0.0, 1.0);
          let g = green(clr) * 1.0;
          let b = blue(clr) * 1.0;
          noStroke();
          scale(1.1)
          fill(r, g, b);
          circle(x, y, random(3, 15));
        }

      }
    }
    else {
      this.r = 50
      this.g = 50
      this.b = 50
      // out
      // white

    }
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height / 2) {
      this.isDone = true;
      text(Congrats, width / 2, height / 2)
    }
  }

  display() {

    push();
    translate(this.x, this.y);
    stroke(255)
    fill(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2); // *** diameter
    noStroke()
    textSize(15)
    this.displayText(60, 0);
    pop()
    push()
    this.moveByKey()
    pop();
  }
  displayText(x, y) {
    push();
    translate(x, y);
    for (let i = 0; i < this.txts.length; i++) {
      let txt = this.txts[i];
      let txtX = 0;
      let txtY = i * 70;
      text(txt, txtX, txtY);
      pop()
    }
    if (frameCount > 630) {
      sound.stop()
    }
  }

  moveByKey() {
    if (keyIsPressed) {

      if (key == "w" || keyCode === UP_ARROW || key == "a" || keyCode === LEFT_ARROW || key == "s" || keyCode === DOWN_ARROW || key == "d" || keyCode === RIGHT_ARROW) { // up arrow or 'w'
        scale(2)
        tint(120, 120, 120)
        image(img1, 0, 0)
      }

    }
  }
}