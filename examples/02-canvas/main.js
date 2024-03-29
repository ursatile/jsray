import { Renderer, Color } from './modules/renderer.js';
import * as Patterns from './modules/patterns.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function fillPixel(x, y, color) {
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

function render() {
  let shader = Patterns.Chessboard(20);
  switch (document.getElementById('shader').value) {
    //TODO: add your own pixel shader function here.
    case 'Gradiance': shader = Patterns.Gradiance; break;
    case 'Lasergrid': shader = Patterns.Lasergrid; break;
    case 'Supernova': shader = Patterns.Supernova; break;
  }
  // Clear the canvas before rendering.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)  
  renderer.render(shader, fillPixel);
}

document.getElementById("go-button").addEventListener("click", render);

render();