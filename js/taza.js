let cups = [];
let maxCups = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  noSmooth();
}

function draw() {
  // fondo
  background(255, 253, 208);

  // texto 
  fill(184, 164, 122);
  let base = min(width, height);              
  textSize(base * 0.06);                     
  text("I need coffee", width / 2, height / 2);

  //tazas 
  for (let i = 0; i < cups.length; i++) {
    drawCup(cups[i]);
  }
}

function mouseDragged() {
  
  let xNorm = constrain(mouseX / width, 0, 1);
  let yNorm = constrain(mouseY / height, 0, 1);
  let base = min(width, height);
  let size = random(50, 100);
  let sizeNorm = size / base;

  
  let style = floor(map(constrain(mouseY, 0, height), 1, height, 0, 3));

  // colores
  let cupColor = color(random(100, 255), random(100, 255), random(0, 220));
  let handleColor = color(random(180, 255), random(50, 200), random(120, 255));
  let lineColor = color(random(0, 120), random(0, 120), random(150, 255));

  // push 
  cups.push({
    xNorm, yNorm, sizeNorm, style,
    cupColor, handleColor, lineColor
  });

  if (cups.length > maxCups) {
    cups.splice(0, cups.length - maxCups);
  }
}

function drawCup(c) {
  
  let base = min(width, height);
  let x = c.xNorm * width;
  let y = c.yNorm * height;
  let size = c.sizeNorm * base;

  push();
  translate(x, y);

  // línea
  stroke(c.lineColor);
  strokeWeight(map(size, base * 0.05, base * 0.3, 2, 6));
  let lx1 = -size * 0.6;
  let lx2 = size * 0.6;
  let ly = size * 0.6;
  if (c.style === 2) { // curva
    line(lx1 - (base * 0.01), ly + (base * 0.008), lx2 + (base * 0.01), ly - (base * 0.008));
  } else {
    line(lx1, ly, lx2, ly + random(-6, 6));
  }

  // asa
  noFill();
  stroke(c.handleColor);
  strokeWeight(map(size, 40, 110, 6, 20));
  let side = (c.style === 1) ? -1 : 1; // asa a la izquierda o derecha
  let ax = side * (size * 0.6);
  let ay = random(-size * 0.15, size * 0.25);
  arc(ax, ay, size * 0.8, size * 0.8, side * -HALF_PI, side * HALF_PI);

  // cuerpo
  noStroke();
  fill(c.cupColor);
  let w = size;
  let h = size;
  if (c.style === 1) h *= 1.3;      // más alto
  if (c.style === 2) w *= 1.3;      // más ancho
  let r = random(0, min(24, w * 0.2)); // radio de esquina relativo al tamaño
  rect(0, 0, w, h, r);

  pop();
}

function windowResized() {
  
  resizeCanvas(windowWidth, windowHeight);
  
}
