function onload() {
  const parent = document.querySelector('.output')
  createCanvas(500, 500, parent);
  CircleX = canvasW/2
  CircleY = canvasH/2
  circle = vector(CircleX, CircleY)
  speed = vector(random(-10, 10), random(-10, 10))
}

function main()
{
  fillBackground([255, 255, 255, 0.5]);
  drawCircle(circle.x, circle.y, 5, [0, 0, 0, 1], [72, 45, 210, 1]);
  circle.addVec(speed)

  if(circle.x < 0 || circle.x > canvasW || circle.y < 0 || circle.y > canvasH)
  {
    circle = vector(CircleX, CircleY)
    speed = vector(random(-10, 10), random(-10, 10))
  }
}