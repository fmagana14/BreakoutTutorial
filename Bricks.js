import Brick from "./Brick.js";

class Bricks {
  constructor(cols, rows, width, height, padding, offsetTop, offsetLeft, color) {
    this.cols = cols;
    this.rows = rows;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    this.color = color;
    this.bricks = [];
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = c * (this.width + this.padding) + this.offsetLeft;
        const brickY = r * (this.height + this.padding) + this.offsetTop;
        console.log('bricksMade');
        this.bricks[c][r] = new Brick(
          brickX,
          brickY,
          this.width,
          this.height,
          this.color,
        );
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

export default Bricks;
