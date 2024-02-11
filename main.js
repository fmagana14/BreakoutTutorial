/* eslint-disable max-classes-per-file */
/* eslint-disable eol-last */
// canvas sizing
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// ball movement
const ballRadius = 10;
// paddle sizing
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 80;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const paddleYStart = canvas.height - paddleHeight;
const PI2 = Math.PI * 2;
const gameOverMessage = 'GAME OVER';
const objectColor = '#264653';
// brick array

class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Bricks {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        this.bricks[c][r] = new Brick(
          brickX,
          brickY,
          brickWidth,
          brickHeight,
          objectColor);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}
// paddle class
class Paddle {
  constructor(x, y, width, height, color = '#2a9d8f') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// score class
class GameLabel {
  constructor(text, x, y, color, font = '16px Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

// game class
class Game {
  constructor() {
    this.ball = new Ball(0, 0, 2, -2, ballRadius, objectColor);
    this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, objectColor);
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.scoreLable = new GameLabel('Score: ', 8, 20);
    this.livesLable = new GameLabel('Lives: ', canvas.width - 65, 20);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();
  }

  setup() {
    this.livesLable.value = 3;

    this.resetBallAndPaddle();
  }

  resetBallAndPaddle() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 3;
    this.ball.dy = -3;
    this.paddle.x = paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x
            && this.ball.x < brick.x + brickWidth
            && this.ball.y > brick.y
            && this.ball.y < brick.y + brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
  
            this.scoreLable.value += 1;
            if (this.scoreLable.value === this.bricks.cols * this.bricks.rows) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.x += 7;
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionWithCanvasAndPaddle() {
    if (
      this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLable.value -= 1;
        if (this.livesLable.value < 1) {
          alert(gameOverMessage);
          this.ball.x = 200;
          this.ball.y = 200;
          document.location.reload();
        } else {
          this.resetBallAndPaddle();
        }
      }
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.collisionDetection();
    this.scoreLable.render(ctx);
    this.livesLable.render(ctx);
    this.collisionWithCanvasAndPaddle();
    this.ball.move();
    this.movePaddle();

    requestAnimationFrame(this.draw);
    // fix above me!!
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// Starts Program
draw();
