// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 400; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0, 100, 150);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.w = 2;
    this.h = 10;




  }
  // methods (functions): particle's behaviors
  update() {
    this.move();
    this.reappear();
    // (add) 
  }
  move() {
    this.x++
    this.y -= 1
  }
  reappear() {
    if (this.x < 0 || this.x > width) {
      this.x = 0;
    }
    if (this.y < 0 || this.y > height) {
      this.y = height / 2
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(255)
    ellipse(0, 0, this.w, this.h);
    rect(-5, -1, this.h, this.w);
    pop();
    if (mouseIsPressed) {
      this.writeText();
    }
  }
  writeText() {
    fill(120)
    text("Pilots don't die, they just fly higher", mouseX, mouseY)
  }
}
