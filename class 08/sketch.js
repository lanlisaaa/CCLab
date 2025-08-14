//array
//let numbers = []; // empty array!
let numbers = [1, 3, 5, 10, 100]; // array!


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}


function draw() {
  background(220);


  textSize(50);


  // the first index is 0
  text(numbers[0], 100, 100);


  // the last index
  let lastIndex = numbers.length - 1;
  text(numbers[lastIndex], 100, 150);
  // arr.length --> get the total number of array!


  // use values!
  let result = numbers[1] + numbers[3]
  text(result, 100, 200);


  // reassign values!
  numbers[0] = 255;
  text(numbers[0], 100, 250);




  noLoop();
}
