let img;
function preload() {
  img = loadImage("assets/sprite.png");
  //loadImage("filepath")
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  noCursor();
  background(255);
}

function draw() {
  let r = map(mouseX, 0, width, 0, 255);
  let g = 0;
  let b = map(mouseY, 0, height, 0, 255);
  let x = random(width)
  let y = random(height)
  let size = random(10, 50)
  //tint(r, g, b);
  // //tint()--color and opacity change
  push()
  blendMode(MULTIPLY)
  //blendMode(MULTIPLY);

  tint(255, 10);//blend mode:values are cumulative
  imageMode(CENTER);
  image(img, mouseX, mouseY, size, size);
  //(img,x,y,(w),(h))
  pop()
}