let colors = [
  "Aquamarine",
  "Chartreuse",
  "CornflowerBlue",
  "Cornsilk",
  "DarkOrchid",
  "DarkTurquoise",
  "DeepPink"
]; // array!


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  // array methods (functions)
  //array.push(); // to add
  //array.splice(index, quantity); // to take item(s) out!


  // add
  colors.push("gold");
  colors.push("olive");


  // remove
  colors.splice(3, 1); // index, only one item!
}


function draw() {
  background(220);


  for (let i = 0; i < colors.length; i++) {
    let rectH = 50;
    let x = 0;
    let y = 0 + i * rectH;


    noStroke();
    fill(colors[i]);
    rect(x, y, width, rectH);


    textSize(30);
    fill(255);
    text(colors[i], x + 20, y + 30);
  }
}