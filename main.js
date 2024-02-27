// eslint-disable-next-line no-unused-vars, no-undef
import Game from "./Game.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const game = new Game(canvas, ctx);
game.draw();
// Your main JavaScript logic goes here

// recieving the following error when running index.html
// game.js:4 Uncaught ReferenceError: canvas is not defined
// at new Game (game.js:4:16)
// at main.js:2:14
