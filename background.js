class Background {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, this.height);
    backgroundGradient.addColorStop(0, "green");
    backgroundGradient.addColorStop(1, "blue");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}
export default Background;