
let particles = []; // empty array!


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");




  for (let i = 0; i < 100; i++) {
    // inc & index
    particles[i] = new Particle(random(width), height);


    // you can use array method: push() here.
    //particles.push(  new Particle() );
  }
}


function draw() {
  background(220);


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.display();
  }
}


//


class Particle {
  constructor(initX, initY) {
    this.x = initX;
    this.y = initY;
    this.dia = random(10, 30);
    this.xSpeed = 0;
    this.ySpeed = random(-2.0, -0.5);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  display() {
    circle(this.x, this.y, this.dia);
  }
}
