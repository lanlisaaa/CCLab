function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
}

function draw() {
    background(230, 10);
    let r, g, b;
    r = map(mouseX, 0, width, 255, 0);
    g = 0;
    b = map(mouseY, 0, height, 0, 255);
    let dia;
    dia = map(mouseX, width, 0, 10, 240)
    noStroke();
    fill(r, g, b);
    circle(width / 2, height / 2, dia + sin(frameCount * 0.05) * 20);

    if (frameCount > 300) {
        push()
        let x = width / 2
        let y = width / 2
        angle = map(frameCount, 0, 90, 800, 0)
        let cosValue = cos(angle * 0.7) * 500
        let sinValue = sin(angle * 0.5) * 500
        Opacity = random(80, 50)
        fill(random(255, 120), 0, 0, Opacity)
        textSize(40)
        text("help", x + sinValue, y + cosValue)
    }

    if (mouseIsPressed) {
        pop()
        for (let i = 0; i < 300; i++) {
            push();
            translate(width / 2, height / 2);
            rotate(i * 60.05);
            noFill();
            stroke(255, 0, 255, 100);
            ellipse(60, 0, 200, random(120)); // x: 100
            pop();
        }
        push();
        translate(width / 2, height / 2);
        rotate(frameCount * 0.05);
        rectMode(CENTER);
        noFill();
        stroke(255, 0, 255, 50);
        rect(0, 0, 160, 100);
        pop();
        push()
        let x = 0
        let y = 0
        let sinValue = sin(frameCount * 10000) * 400
        let cosValue = cos(frameCount * 2000) * 200
        dia = map(sin(frameCount), -1, 1, 0, 100)
        noStroke()
        r = map(dia, 0, 400, 120, 255)
        g = 0
        b = map(dia, 0, 400, 255, 0)
        fill(r, g, b)
        translate(350, 350)
        rotate(sinValue)
        arc(x + sinValue, y + cosValue, dia, dia, 0, 45)
        pop()
    }
}