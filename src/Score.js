class Score {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  updateScore() {
    this.score += 1;
  }

  reset() {
    this.score = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`${this.score}`, this.x, this.y);
  }
}
export default Score;
