import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paint(x, y, width, height, color) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, width, height);
}

export function render() {
  let scene = ExampleScenes.ColoredSpheres();
  renderer.trace(scene, paint);
}

render();