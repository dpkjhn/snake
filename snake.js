var Segment = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20; // 10x10
  this.color = "#ffffff";
};

var Fruit = function(x, y) {
    this.piece = new Segment(x, y);
    this.piece.color = "#a0d62d";

    this.points = 5;
    this.isEaten =  false;

    this.canEat =  function(x, y) {
      if ((this.piece.x == x) && (this.piece.y == y)) {
        this.eaten = true;
      }
      return this.eaten;
    }
};

var Snake2 = function(maxX, maxY) {
  this.head = new Segment();

  this.speed = 1;
  this.acc = 3;
  this.dir = "LEFT";
  this.length = 1;
  this.body = [this.head]; // only one Segment

  this.grow = function() {
    var len = this.body.length;
    var tail = new Segment();

    switch (this.dir) {
      case "LEFT":
        tail.x = this.body[len - 1].x - tail.width;
        tail.y = this.body[len - 1].y;
        break;
      case "RIGHT":
        tail.x = this.body[len - 1].x + tail.width;
        tail.y = this.body[len - 1].y;
        break;
      case "UP":
        tail.x = this.body[len - 1].x;
        tail.y = this.body[len - 1].y - tail.width;
        break;
      case "DOWN":
        tail.x = this.body[len - 1].x;
        tail.y = this.body[len - 1].y + tail.width;
        break;
    }

    this.body.push(tail);
    this.length++;
    // console.log(this.body);
  }

  this.isDead = function() {
    // TODO:
    var head = this.body[0];

    // check if we hit the body
    for (var i = 1; i < this.body.length; i++) { //start from head +1
      if ((head.x == this.body[i].x) && (head.y == this.body[i].y)) {
        console.log("Crash!");
        return true;
      }
    }
    return false;
  }

  this.reset = function() {
    this.length = 1;
    this.speed = 1;
    this.acc = 3;
    // this.dir = "RIGHT"; // TODO: should be random
  }

  this.move = function() {
    var newHead = new Segment(); // will become the new head

    this.body[0].color = newHead.color; // reset to body colour
    newHead.color = "#993300"; // TODO: need to fix colour


    switch (this.dir) {
      case "LEFT":
        newHead.x = this.body[0].x - newHead.width;
        newHead.y = this.body[0].y;
        break;
      case "RIGHT":
        newHead.x = this.body[0].x + newHead.width;
        newHead.y = this.body[0].y;
        break;
      case "UP":
        newHead.x = this.body[0].x;
        newHead.y = this.body[0].y - newHead.width;
        break;
      case "DOWN":
        newHead.x = this.body[0].x;
        newHead.y = this.body[0].y + newHead.width;
        break;
    }

    this.body.unshift(newHead);
    this.body.pop(); // drop the tail


    return (!this.isDead()); // return if valid move
  }
};
