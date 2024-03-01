import Sprite from "./Sprite.js";

class Paddle extends Sprite {
  constructor(x, y, width = 75, height = 10, color = "#2aaeed") {
    super(x, y, width, height, color);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
