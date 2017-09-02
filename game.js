var maxX = 400;
var maxY = 400;

var s2;
var fruit;
var score = 100;
var speed = 2;

function setup() {
  createCanvas(maxX, maxY);

  frameRate(speed);
  // console.log(s2.body.length);
  fruit = placeFruit();
  s2 = placeSnake();
}

function randomConstrain(lim1, lim2, mul) {
  // console.log("lim1 " + lim1 + "lim2 " + lim2);
  return constrain(mul * Math.floor(Math.random() * (lim2 / mul + 1)), lim1, lim2);
}

function draw() {
  background(51);
  frameRate(speed);

  drawFruit(fruit);
  drawSnake();

  if (fruit.canEat(s2.body[0].x, s2.body[0].y)) {
    console.log(`eat -> (" + fruit.piece.x + "," + fruit.piece.y + ")`);
    console.log(`score ` + score);
    s2.grow();
    fruit = placeFruit(); // probably inefficient
    speed++;
    score += fruit.points;
  }
}

function placeSnake() {
  var snake = new Snake2(maxX, maxY);
  snake.body[0].x = randomConstrain(40, maxX - 40, snake.body[0].width);
  snake.body[0].y = randomConstrain(40, maxY - 40, snake.body[0].width);

  return snake;
}

function placeFruit() {
  var fruit = new Fruit();

  fruit.piece.x = randomConstrain(40, maxX - 40, fruit.piece.width);
  fruit.piece.y = randomConstrain(40, maxY - 40, fruit.piece.width);

  // fruit.piece.x = fruit.piece.width * constrain(Math.floor(Math.random()*(maxX/fruit.piece.width + 1)), 10, maxX - 20);
  // fruit.piece.y = fruit.piece.width * constrain(Math.floor(Math.random()*(maxY/fruit.piece.width + 1)), 10, maxY - 20);

  console.log("fruit -> (" + fruit.piece.x + "," + fruit.piece.y + ")");

  return fruit;
}

function drawFruit(fruit) {
  fill(color(fruit.piece.color));
  rect(fruit.piece.x, fruit.piece.y, fruit.piece.width, fruit.piece.width);
}

function keyPressed() {
  // console.log("key: " + keyCode);
  switch (keyCode) {
    case LEFT_ARROW:
      s2.dir = (s2.dir == "RIGHT") ? "RIGHT" : "LEFT";
      break;
    case RIGHT_ARROW:
      s2.dir = (s2.dir == "LEFT") ? "LEFT" : "RIGHT";
      break;
    case UP_ARROW:
      s2.dir = (s2.dir == "DOWN") ? "DOWN" : "UP";
      break;
    case DOWN_ARROW:
      s2.dir = (s2.dir == 'UP') ? "UP" : "DOWN";
      break;
    case 69: // e
      s2.grow();
      break;
  }
  return false;

}

function isDead() {
  // if (s2.isDead() || s.body[0].x )
}

function drawSnake() {
  for (var i = 0; i < s2.body.length; i++) {
    // console.log(s2.body[i]);
    fill(color(s2.body[i].color));
    rect(s2.body[i].x, s2.body[i].y, s2.body[i].width, s2.body[i].width);
    // console.log("(" + s2.body[i].x + "," + s2.body[i].y + ")");
  }
  if (!s2.move()) {
    textSize(30);
    text("Crash!!", 300, 180);
    noLoop();
  }
}
