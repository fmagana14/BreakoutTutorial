class Lives {
  constructor(x, y, lives = 3) {
    this.x = x;
    this.y = y;
    this.lives = lives;
  }

  loseLife() {
    this.lives -= 1;
  }

  reset() {
    this.lives = 3;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`${this.lives}`, this.x, this.y);
  }
}
export default Lives;
