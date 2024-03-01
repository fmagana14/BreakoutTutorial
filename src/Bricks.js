import Brick from "./Brick.js";

class Bricks {
  constructor(rows = 3, cols = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.setup();
  }

  setup() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brick = new Brick();
        brick.x = c * (brick.width + 10) + 30;
        brick.y = r * (brick.height + 10) + 30;
        this.bricks[c][r] = brick;
      }
    }
  }

  getBrick(c, r) {
    return this.bricks[c][r];
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
