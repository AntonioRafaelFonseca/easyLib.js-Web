/**
 * EasyLib.js
 * © 2026 António Fonseca
 * Released under the MIT License
 */

globalThis.canvasWidth = undefined
globalThis.canvasHeight = undefined
let canvasH = undefined
let canvasW = undefined
function createCanvas(width, height, parent) {
  // remove canvas antigo, se existir
  const oldCanvas = document.querySelector('.mainCanvas');
  if (oldCanvas) {
    oldCanvas.remove(); // <- isso substitui document.deleteElement
  }

  // cria e adiciona o novo canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'mainCanvas';
  canvas.width = width;
  canvas.height = height;
  parent.appendChild(canvas);

  globalThis.canvas = canvas;
  globalThis.ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  globalThis.canvasWidth = width;
  globalThis.canvasHeight = height;
  canvasH = height
  canvasW = width

  canvas.onmousemove = updateMouse;
  canvas.onmousedown = () => { press = true; mouse.pressed = press; }
  canvas.onmouseup = () => { press = false; mouse.pressed = press; }
}

//-----------------drawings------------------
function fillBackground(color) {
  drawRect(0, 0, canvasWidth, canvasHeight, null, color)
}

function drawRect(x, y, w, h, border = null, fill = null) {
  if (border) {
    ctx.strokeStyle = `rgba(${border[0]}, ${border[1]}, ${border[2]}, ${border[3]})`
  }
  if (fill) {
    ctx.fillStyle = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})`
  }
  ctx.fillRect(x, y, w, h)
}


function drawCircle(x, y, r, border = null, fill = null) {
  if (border) {
    ctx.strokeStyle = `rgba(${border[0]}, ${border[1]}, ${border[2]}, ${border[3]})`
  }
  if (fill) {
    ctx.fillStyle = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})`
  }
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (border) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}

function drawLine(x1, y1, x2, y2, border = null) {
  if (border) {
    ctx.strokeStyle = `rgba(${border[0]}, ${border[1]}, ${border[2]}, ${border[3]})`
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}
//custom shapes----------------------------------------------------------------|

function startShape() {
  ctx.beginPath();
}
function endShape(fill = null, border = null) {
  if (border) {
    ctx.strokeStyle = `rgba(${border[0]}, ${border[1]}, ${border[2]}, ${border[3]})`
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})`
    ctx.fill();
  }
}
function addCustomPoint(x, y) {
  ctx.lineTo(x, y)
}

//----------------math-----------------
function random(minimum, maximum, decimal) {
  if (!maximum) {
    var max = minimum;
    var min = 0;
  } else {
    var max = maximum;
    var min = minimum;
  }
  var r = Math.random()
  if (decimal || decimal == 0) {
    return limitDecimal(map(r, 0, 1, min, max), decimal);
  } else {
    return map(r, 0, 1, min, max)
  }
}

function map(variable, floor, celing, min, max) {
  var result = ((variable - floor) / (celing - floor)) * (max - min) + min;
  return result;
}

function round(num) {
  return Math.round(num)
}

function limitDecimal(num, decimal) {
  n = Number.parseFloat(num).toFixed(decimal)
  return n
}

//-----------------inputs----------------

let mouseX;
let mouseY;
let press;


let mouse =
{
  x: 0,
  y: 0,
  pressed: false
};

function mouseMove(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}

function updateMouse(e) {
  mouseMove(e);
  mouse = { x: mouseX, y: mouseY, pressed: press }
}


//-----------Vector---------------
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vec = [x, y];
  }
  update() {
    this.vec = [this.x, this.y];
  }
  add(x, y) {
    this.x += x;
    this.y += y;
    this.update();
  }
  sub(x, y) {
    this.x -= x;
    this.y -= y;
    this.update();
  }
  mult(x, y) {
    this.x *= x;
    this.y *= y;
    this.update();
  }
  div(x, y) {
    this.x /= x;
    this.y /= y;
    this.update();
  }
  //---------------------------
  addVec(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.update();
  }
  subVec(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.update();
  }
  divVec(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    this.update();
  }
  multVec(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this.update();
  }
  //---------------------------
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    let mag = this.magnitude();
    this.x /= mag;
    this.y /= mag;
    this.update();
  }
  distance(vector) {
    return Math.sqrt((vector.x - this.x) * (vector.x - this.x) + (vector.y - this.y) * (vector.y - this.y));
  }
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  angle(vector) {
    return Math.atan2(vector.y - this.y, vector.x - this.x);
  }
}


function vector(x, y) {
  return new Vector(x, y)
}


//---------------time--------------
async function sleepFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let intervalID;
function setFPS(fps) {
  interval = 1000 / fps
  clearInterval(intervalID);
  intervalID = setInterval(main, interval)
}

function start(mainf)
{
  if(intervalID)
  {
    clearInterval(intervalID)
  }
  let interval = 1000 / 30;
  intervalID = setInterval(mainf, interval);
}