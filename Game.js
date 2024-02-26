import Background from './background.js';
// import all classes except game label
class Game {
  constructor(CanvasId) {
    this.canvas = document.getElementById(CanvasId);
    this.ctx = canvas.getContext('2d');
 
    this.ballRadius = 10;
    // paddle sizing
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 80;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleYStart = this.canvas.height - this.paddleHeight;
    this.gameOverMessage = 'GAME OVER';
    this.objectColor = '#264653';

    this.ball = new Ball(0, 0, 2, -2, this.ballRadius, this.objectColor);
    // eslint-disable-next-line max-len
    this.paddle = new Paddle(
      this.paddleXStart,
      this.paddleYStart,
      this.paddleWidth,
      this.paddleHeight,
      this.objectColor,
    );
    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetTop: this.brickOffsetTop,
      offsetLeft: this.brickOffsetLeft,
      color: this.objectColor,
    });
    //
    this.scoreLable = new GameLabel('Score: ', 8, 20);
    this.livesLable = new GameLabel('Lives: ', this.canvas.width - 65, 20);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();

    this.draw();
  }

  setup() {
    this.livesLable.value = 3;

    this.resetBallAndPaddle();

    document.addEventListener(
      'keydown',
      (e) => {
        this.keyDownHandler(e);
      },
      false
    );
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener(
      'mousemove',
      this.mouseMoveHandler.bind(this),
      false
    );
  }

  resetBallAndPaddle() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 3;
    this.ball.dy = -3;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x &&
            this.ball.x < brick.x + this.brickWidth &&
            this.ball.y > brick.y &&
            this.ball.y < brick.y + this.brickHeight
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
    if (
      this.rightPressed &&
      this.paddle.x < this.canvas.width - this.paddle.width
    ) {
      this.paddle.x += 7;
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionWithCanvasAndPaddle() {
    if (
      this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius ||
      this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (
      this.ball.y + this.ball.dy >
      this.canvas.height - this.ball.radius
    ) {
      if (
        this.ball.x > this.paddle.x &&
        this.ball.x < this.paddle.x + this.paddle.width
      ) {
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
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
    // fix mouse handler only keys work
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
    // console.log('***game.draw()****', this);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.collisionDetection();
    this.scoreLable.render(this.ctx);
    this.livesLable.render(this.ctx);
    this.collisionWithCanvasAndPaddle();
    this.ball.move();
    this.movePaddle();

    // requestAnimationFrame(this.draw.bind(this)); ***one way of doing it***
    // fix above me!!
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
