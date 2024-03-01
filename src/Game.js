import Ball from './Ball.js';
import Bricks from './bricks.js';
import Paddle from './paddle.js';
import GameLabel from './gamelabel.js';

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const ball = new Ball(canvas.width / 2, canvas.height - 30);
const bricks = new Bricks();
const paddle = new Paddle(paddleX, canvas.height - paddleHeight);
const gameLabel = new GameLabel();

// **************************************************************
// Functions
// **************************************************************

const collisionDetection = () => {
  for (let c = 0; c < bricks.cols; c += 1) {
    for (let r = 0; r < bricks.rows; r += 1) {
      const b = bricks.getBrick(c, r);
      if (b.status === 1) {
        if (
          ball.x > b.x
          && ball.x < b.x + b.width
          && ball.y > b.y
          && ball.y < b.y + b.height
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          gameLabel.score += 1;
          if (gameLabel.score === bricks.rows * bricks.cols) {
            alert('YOU WIN, CONGRATS!');
            gameLabel.score = 0;
            document.location.reload();
          }
        }
      }
    }
  }
};

const ballmovement = () => {
  if (
    ball.x + ball.dx > canvas.width - ball.radius
    || ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }

  // Bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (ball.y + ball.dy < ball.radius) {
    // hit the top
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    // hit the bottom
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      // Hit the paddle
      ball.dy = -ball.dy;
    } else {
      // Lose a life
      gameLabel.lives -= 1;
      if (!gameLabel.lives) {
        // Game Over
        // eslint-disable-next-line no-alert
        alert('GAME OVER'); // * Could be good as a constant
        ball.x = 200;
        ball.y = 200;
        document.location.reload();
      } else {
        // Start the over you hit the bottom
        // ** Set the position of ball and paddle
        // ** And set the speed and direction of the ball
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
};

// --------------------------------------------------------------
// Game Loop
// --------------------------------------------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle.render(ctx);
  bricks.render(ctx);
  ball.render(ctx);
  gameLabel.render(ctx);
  collisionDetection();
  ballmovement();

  // Move Ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for arrow keys
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // Draw the screen again
  requestAnimationFrame(draw);
}

// --------------------------------------------------------------
// Event Listeners
// --------------------------------------------------------------

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
}

// **************************************************************
// Register Events
// **************************************************************

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// **************************************************************
// Starts program entry point
// **************************************************************

draw();