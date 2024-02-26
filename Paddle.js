import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width, height, color = '#2a9d8f', speed = 8) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.color = color;
  }
}
export default Paddle;
